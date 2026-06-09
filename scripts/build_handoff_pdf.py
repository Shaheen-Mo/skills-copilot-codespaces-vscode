from pathlib import Path
import textwrap

ROOT = Path(__file__).resolve().parents[1]
SOURCE_FILES = [
    ROOT / "codex-handoff" / "COPY_THIS_TO_CODEX.md",
    ROOT / "codex-handoff" / "PROJECT_BRIEF.md",
    ROOT / "codex-handoff" / "IMPLEMENTATION_PLAN.md",
    ROOT / "codex-handoff" / "DATABASE_BLUEPRINT.md",
    ROOT / "codex-handoff" / "APP_STRUCTURE.md",
    ROOT / "codex-handoff" / "ACCEPTANCE_CHECKLIST.md",
]
OUT = ROOT / "codex-handoff" / "chachacha-ops-codex-handoff.pdf"

PAGE_W = 612
PAGE_H = 792
MARGIN = 54
LINE_H = 12
FONT_SIZE = 9
MAX_CHARS = 92


def escape_pdf_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def collect_lines() -> list[str]:
    lines: list[str] = []
    for file in SOURCE_FILES:
        lines.append(file.name)
        lines.append("=" * len(file.name))
        for raw in file.read_text(encoding="utf-8").splitlines():
            if not raw.strip():
                lines.append("")
                continue
            wrapped = textwrap.wrap(raw, width=MAX_CHARS, replace_whitespace=False, drop_whitespace=False)
            lines.extend(wrapped or [""])
        lines.extend(["", ""])
    return lines


def paginate(lines: list[str]) -> list[list[str]]:
    lines_per_page = int((PAGE_H - (2 * MARGIN)) / LINE_H)
    return [lines[i : i + lines_per_page] for i in range(0, len(lines), lines_per_page)]


def build_pdf(pages: list[list[str]]) -> bytes:
    objects: list[bytes] = []

    def add(obj: str | bytes) -> int:
        if isinstance(obj, str):
            obj = obj.encode("latin-1", "replace")
        objects.append(obj)
        return len(objects)

    catalog_id = add("<< /Type /Catalog /Pages 2 0 R >>")
    pages_id = add(b"")
    font_id = add("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>")
    page_ids: list[int] = []

    for page_no, page_lines in enumerate(pages, start=1):
        content_lines = ["BT", f"/F1 {FONT_SIZE} Tf", f"1 0 0 1 {MARGIN} {PAGE_H - MARGIN} Tm"]
        for index, line in enumerate(page_lines):
            if index:
                content_lines.append(f"0 -{LINE_H} Td")
            content_lines.append(f"({escape_pdf_text(line)}) Tj")
        content_lines.append(f"0 -{LINE_H * 2} Td")
        content_lines.append(f"(Page {page_no} of {len(pages)}) Tj")
        content_lines.append("ET")
        stream = "\n".join(content_lines).encode("latin-1", "replace")
        content_id = add(b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"\nendstream")
        page_id = add(f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] /Resources << /Font << /F1 {font_id} 0 R >> >> /Contents {content_id} 0 R >>")
        page_ids.append(page_id)

    kids = " ".join(f"{page_id} 0 R" for page_id in page_ids)
    objects[pages_id - 1] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>".encode("latin-1")

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for obj_no, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{obj_no} 0 obj\n".encode())
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode())
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode())
    pdf.extend(f"trailer\n<< /Size {len(objects) + 1} /Root {catalog_id} 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode())
    return bytes(pdf)


def main() -> None:
    lines = collect_lines()
    pages = paginate(lines)
    OUT.write_bytes(build_pdf(pages))
    print(f"Wrote {OUT.relative_to(ROOT)} ({len(pages)} pages)")


if __name__ == "__main__":
    main()
