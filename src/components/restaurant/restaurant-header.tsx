"use client";

import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, IndianRupee, MapPin, Star } from "lucide-react";

interface RestaurantHeaderProps {
	restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative"
		>
			{/* Hero Image */}
			<div className="relative h-[300px] w-full">
				<Image
					src={restaurant.image}
					alt={restaurant.name}
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
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
			</div>

			{/* Restaurant Info */}
			<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold mb-2">
						{restaurant.name}
					</h1>
					<p className="text-neutral-200 mb-4">
						{restaurant.description}
					</p>

					<div className="flex flex-wrap gap-4 text-sm">
						<div className="flex items-center gap-1">
							<Star className="h-4 w-4 text-yellow-400" />
							<span>
								{restaurant.rating} ({restaurant.totalRatings})
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							<span>{restaurant.deliveryTime}</span>
						</div>
						<div className="flex items-center gap-1">
							<MapPin className="h-4 w-4" />
							<span>{restaurant.location}</span>
						</div>
						<div className="flex items-center gap-1">
							<IndianRupee className="h-4 w-4" />
							<span>{restaurant.deliveryFee} delivery fee</span>
						</div>
					</div>

					<div className="mt-4 flex flex-wrap gap-2">
						{restaurant.cuisine.map((cuisine) => (
							<span
								key={cuisine}
								className="px-2 py-1 bg-white/20 rounded-full text-sm"
							>
								{cuisine}
							</span>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
