import Link from "next/link";
import { ReactNode } from "react";
import { Armchair, Banknote, ClipboardList, CreditCard, LayoutDashboard, Package, Truck } from "lucide-react";

const nav = [
  { href: "/owner", label: "Owner", icon: LayoutDashboard },
  { href: "/sales", label: "Sales", icon: Armchair },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/credit", label: "Credit", icon: CreditCard },
  { href: "/collections", label: "Collections", icon: ClipboardList },
  { href: "/delivery", label: "Delivery", icon: Truck },
  { href: "/finance", label: "Finance Close", icon: Banknote },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">ChaChaCha Ops</h1>
            <p className="text-xs text-muted-foreground">Furniture retail operations</p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-muted-foreground">Internal MVP</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border bg-white p-3 md:sticky md:top-20 md:h-[calc(100vh-6rem)]">
          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
