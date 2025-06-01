"use client";

import { MenuItem } from "@/types/restaurant";
import Image from "next/image";
import { motion } from "framer-motion";
import { IndianRupee, Leaf, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MenuItemCardProps {
	item: MenuItem;
	onAddToCart: (
		item: MenuItem,
		customizations: Record<string, string>,
	) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
	const [selectedCustomizations, setSelectedCustomizations] = useState<
		Record<string, string>
	>({});
	const [isExpanded, setIsExpanded] = useState(false);

	const handleCustomizationChange = (
		customizationId: string,
		optionId: string,
	) => {
		setSelectedCustomizations((prev) => ({
			...prev,
			[customizationId]: optionId,
		}));
	};

	const handleAddToCart = () => {
		onAddToCart(item, selectedCustomizations);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-neutral-200 dark:border-neutral-800"
		>
			<div className="relative h-48 w-full">
				<Image
					src={item.image}
					alt={item.name}
					fill
					className="object-cover"
					unoptimized
					priority
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.onerror = null;
						target.src = "/images/placeholder-food.svg";
					}}
				/>
				<div className="absolute top-2 right-2 flex gap-2">
					{item.isVegetarian && (
						<div className="bg-green-500 text-white p-1 rounded-full">
							<Leaf className="h-4 w-4" />
						</div>
					)}
					{item.isSpicy && (
						<div className="bg-red-500 text-white p-1 rounded-full">
							<Flame className="h-4 w-4" />
						</div>
					)}
				</div>
			</div>

			<div className="p-4 space-y-3">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
							{item.name}
						</h3>
						<p className="text-sm text-neutral-600 dark:text-neutral-300">
							{item.description}
						</p>
					</div>
					<div className="flex items-center text-neutral-800 dark:text-white">
						<IndianRupee className="h-4 w-4" />
						<span className="font-semibold">{item.price}</span>
					</div>
				</div>

				{item.customizations && item.customizations.length > 0 && (
					<div className="space-y-2">
						<button
							onClick={() => setIsExpanded(!isExpanded)}
							className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
						>
							{isExpanded ? "Hide Options" : "Customize"}
						</button>

						{isExpanded && (
							<div className="space-y-4 pt-2">
								{item.customizations.map((customization) => (
									<div
										key={customization.id}
										className="space-y-2"
									>
										<Label className="text-sm font-medium">
											{customization.name}
											{customization.required && (
												<span className="text-red-500 ml-1">
													*
												</span>
											)}
										</Label>
										<RadioGroup
											value={
												selectedCustomizations[
													customization.id
												]
											}
											onValueChange={(value) =>
												handleCustomizationChange(
													customization.id,
													value,
												)
											}
											className="flex flex-col space-y-2"
										>
											{customization.options.map(
												(option) => (
													<div
														key={option.id}
														className="flex items-center space-x-2"
													>
														<RadioGroupItem
															value={option.id}
															id={`${customization.id}-${option.id}`}
														/>
														<Label
															htmlFor={`${customization.id}-${option.id}`}
															className="text-sm"
														>
															{option.name}
															{option.price !==
																0 && (
																<span className="ml-1 text-neutral-500">
																	(
																	{option.price >
																	0
																		? "+"
																		: ""}
																	<IndianRupee className="h-3 w-3 inline" />
																	{Math.abs(
																		option.price,
																	)}
																	)
																</span>
															)}
														</Label>
													</div>
												),
											)}
										</RadioGroup>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				<Button
					onClick={handleAddToCart}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white"
				>
					Add to Cart
				</Button>
			</div>
		</motion.div>
	);
}
