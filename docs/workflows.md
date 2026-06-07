# MVP Workflows

## Sale with deposit

1. Salesperson creates a draft sale.
2. Cashier captures deposit or full payment.
3. Reservation is allowed only after payment.
4. System posts `reserve_out` inventory movements.

## Delivery completion

1. Delivery coordinator marks delivery complete.
2. System posts `sold_out_delivery` movements.
3. Reserved quantity decreases and sold quantity increases.

## Credit account

1. Salesperson creates credit sale request.
2. Credit officer reviews application.
3. Approved application creates a credit account and installment schedule.
4. Collections officer logs actions and payments.
