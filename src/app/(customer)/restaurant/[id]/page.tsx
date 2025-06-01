"use client";

import { useCartStore } from "@/store/cart-store";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { mockRestaurant } from "@/data/mock-restaurant";
import { RestaurantHeader } from "@/components/restaurant/restaurant-header";
import { MenuCategory } from "@/components/restaurant/menu-category";
import { MenuItem } from "@/types/restaurant";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RestaurantPage() {
	const { items, addItem, clearCart } = useCartStore();
	const router = useRouter();

	const handleAddToCart = (
		item: MenuItem,
		customizations: Record<string, string>,
	) => {
		// Calculate final price with customizations
		let finalPrice = item.price;
		const customizationDetails: string[] = [];

		if (item.customizations) {
			item.customizations.forEach((customization) => {
				const selectedOption = customization.options.find(
					(opt) => opt.id === customizations[customization.id],
				);
				if (selectedOption) {
					finalPrice += selectedOption.price;
					customizationDetails.push(
						`${customization.name}: ${selectedOption.name}`,
					);
				}
			});
		}

		addItem({
			...item,
			price: finalPrice,
			quantity: 1,
			customizations: customizationDetails,
		});
	};

	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	const handleCheckout = () => {
		router.push("/checkout");
	};

	return (
		<div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
			{/* Restaurant Header */}
			<RestaurantHeader restaurant={mockRestaurant} />

			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Menu Section */}
					<div className="lg:col-span-2 space-y-8">
						{mockRestaurant.menu.map((category) => (
							<MenuCategory
								key={category.id}
								category={category}
								onAddToCart={handleAddToCart}
							/>
						))}
					</div>

					{/* Cart Section */}
					<div className="lg:col-span-1">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							className="sticky top-4 bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 space-y-4"
						>
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
									Your Cart
								</h2>
								{items.length > 0 && (
									<button
										onClick={clearCart}
										className="text-sm text-red-500 hover:text-red-400"
									>
										Clear Cart
									</button>
								)}
							</div>

							{items.length === 0 ? (
								<p className="text-neutral-500 text-center py-8">
									Your cart is empty
								</p>
							) : (
								<>
									<div className="space-y-4 max-h-[400px] overflow-y-auto">
										{items.map((item) => (
											<CartItemCard
												key={item.id}
												{...item}
											/>
										))}
									</div>

									<div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-4">
										<div className="flex justify-between text-sm">
											<span className="text-neutral-600 dark:text-neutral-400">
												Delivery Fee
											</span>
											<span className="flex items-center">
												<IndianRupee className="h-3 w-3" />
												{mockRestaurant.deliveryFee}
											</span>
										</div>
										<div className="flex justify-between font-semibold">
											<span>Total</span>
											<span className="flex items-center">
												<IndianRupee className="h-4 w-4" />
												{total +
													mockRestaurant.deliveryFee}
											</span>
										</div>

										<Button
											className="w-full bg-blue-600 hover:bg-blue-700 text-white"
											disabled={
												total <
												mockRestaurant.minimumOrder
											}
											onClick={handleCheckout}
										>
											{total < mockRestaurant.minimumOrder
												? `Add ₹${mockRestaurant.minimumOrder - total} more`
												: "Proceed to Checkout"}
										</Button>
									</div>
								</>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
