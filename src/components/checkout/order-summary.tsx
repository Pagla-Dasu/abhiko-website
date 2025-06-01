import { useCartStore } from "@/store/cart-store";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderSummary() {
	const { items } = useCartStore();
	const deliveryFee = 40; // This should come from the restaurant data
	const platformFee = 5;

	// Calculate total from items
	const itemTotal = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	const finalTotal = itemTotal + deliveryFee + platformFee;

	return (
		<div className="sticky top-4 bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 space-y-4">
			<h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
				Order Summary
			</h2>

			<div className="space-y-4 max-h-[400px] overflow-y-auto">
				{items.map((item) => (
					<CartItemCard key={item.id} {...item} />
				))}
			</div>

			<div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-4">
				<div className="flex justify-between text-sm">
					<span className="text-neutral-600 dark:text-neutral-400">
						Item Total
					</span>
					<span className="flex items-center">
						<IndianRupee className="h-3 w-3" />
						{itemTotal}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-neutral-600 dark:text-neutral-400">
						Delivery Fee
					</span>
					<span className="flex items-center">
						<IndianRupee className="h-3 w-3" />
						{deliveryFee}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-neutral-600 dark:text-neutral-400">
						Platform Fee
					</span>
					<span className="flex items-center">
						<IndianRupee className="h-3 w-3" />
						{platformFee}
					</span>
				</div>
				<div className="flex justify-between font-semibold">
					<span>To Pay</span>
					<span className="flex items-center">
						<IndianRupee className="h-4 w-4" />
						{finalTotal}
					</span>
				</div>

				<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
					Place Order
				</Button>
			</div>
		</div>
	);
}
