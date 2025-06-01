import { ReactNode } from "react";

interface CheckoutLayoutProps {
	children: ReactNode;
	orderSummary: ReactNode;
}

export function CheckoutLayout({
	children,
	orderSummary,
}: CheckoutLayoutProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<div className="lg:col-span-2 space-y-8">{children}</div>
			<div className="lg:col-span-1">{orderSummary}</div>
		</div>
	);
}
