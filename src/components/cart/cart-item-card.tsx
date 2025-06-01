"use client";

import { useCartStore } from "@/store/cart-store";
import { IndianRupee } from "lucide-react";

export const CartItemCard = ({
	id,
	name,
	price,
	quantity,
	customizations,
}: {
	id: string;
	name: string;
	price: number;
	quantity: number;
	customizations?: string[];
}) => {
	const { increaseQty, decreaseQty, removeItem } = useCartStore();

	return (
		<div className="flex justify-between items-start py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white">
			<div className="flex-1">
				<p className="font-semibold">{name}</p>
				{customizations && customizations.length > 0 && (
					<p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
						{customizations.join(", ")}
					</p>
				)}
				<p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center">
					<IndianRupee className="h-3 w-3 mr-1" />
					{price} x {quantity}
				</p>
			</div>
			<div className="flex gap-2 items-center">
				<button
					onClick={() => decreaseQty(id)}
					className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
				>
					-
				</button>
				<span>{quantity}</span>
				<button
					onClick={() => increaseQty(id)}
					className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
				>
					+
				</button>
				<button
					onClick={() => removeItem(id)}
					className="ml-2 text-red-500 hover:text-red-400 text-sm"
				>
					×
				</button>
			</div>
		</div>
	);
};
