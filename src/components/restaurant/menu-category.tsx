"use client";

import { MenuCategory as MenuCategoryType, MenuItem } from "@/types/restaurant";
import { MenuItemCard } from "./menu-item-card";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface MenuCategoryProps {
	category: MenuCategoryType;
	onAddToCart: (
		item: MenuItem,
		customizations: Record<string, string>,
	) => void;
}

export function MenuCategory({ category, onAddToCart }: MenuCategoryProps) {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="space-y-4"
		>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
			>
				<div>
					<h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
						{category.name}
					</h2>
					{category.description && (
						<p className="text-sm text-neutral-600 dark:text-neutral-400">
							{category.description}
						</p>
					)}
				</div>
				<ChevronDown
					className={`h-6 w-6 text-neutral-600 dark:text-neutral-400 transition-transform ${
						isExpanded ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isExpanded && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					{category.items.map((item) => (
						<MenuItemCard
							key={item.id}
							item={item}
							onAddToCart={onAddToCart}
						/>
					))}
				</motion.div>
			)}
		</motion.div>
	);
}
