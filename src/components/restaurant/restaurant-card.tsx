"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type RestaurantCardProps = {
	name: string;
	cuisine: string[];
	location: string;
	image: string;
	rating: number;
	orderType: string;
};

export function RestaurantCard({
	name,
	cuisine,
	location,
	image,
	rating,
	orderType,
}: RestaurantCardProps) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300 }}
			className={cn(
				"bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-neutral-200 dark:border-neutral-800",
			)}
		>
			<div className="relative h-48 w-full">
				<Image
					src={image}
					alt={name}
					fill
					className="object-cover"
					unoptimized
					priority
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.onerror = null;
						target.src = "/images/placeholder-restaurant.svg";
					}}
				/>
			</div>
			<div className="p-4 space-y-2">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
						{name}
					</h3>
					<span className="flex items-center text-sm text-yellow-500">
						<Star className="h-4 w-4 mr-1 fill-yellow-500" />
						{rating.toFixed(1)}
					</span>
				</div>
				<p className="text-sm text-neutral-600 dark:text-neutral-300">
					{cuisine.join(", ")}
				</p>
				<p className="text-xs text-neutral-400">{location}</p>
				<span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
					{orderType}
				</span>
			</div>
		</motion.div>
	);
}
