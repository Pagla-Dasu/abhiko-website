"use client";

import { useCartStore } from "@/store/cart-store";
import { CheckoutLayout } from "@/components/checkout/checkout-layout";
import { OrderSummary } from "@/components/checkout/order-summary";
import { DeliveryDetails } from "@/components/checkout/delivery-details";
import { PaymentOptions } from "@/components/checkout/payment-options";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
	const { items, total } = useCartStore();
	const router = useRouter();

	// Redirect if cart is empty
	useEffect(() => {
		if (items.length === 0) {
			router.push("/");
		}
	}, [items, router]);

	if (items.length === 0) {
		return null;
	}

	return (
		<div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-8">
			<div className="max-w-7xl mx-auto px-4">
				<CheckoutLayout>
					<div className="space-y-8">
						<DeliveryDetails />
						<PaymentOptions />
					</div>
					<OrderSummary />
				</CheckoutLayout>
			</div>
		</div>
	);
}
