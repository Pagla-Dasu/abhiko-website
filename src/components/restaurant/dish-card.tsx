import { MenuItem } from "@/types/restaurant";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RestaurantInfo {
	id: string;
	name: string;
	rating: number;
}

interface DishCardProps {
	dish: MenuItem;
	restaurant: RestaurantInfo;
}

export function DishCard({ dish, restaurant }: DishCardProps) {
	return (
		<div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors">
			<div className="relative h-48">
				<Image
					src={dish.image}
					alt={dish.name}
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-4 space-y-4">
				<div>
					<h3 className="text-lg font-semibold text-white">
						{dish.name}
					</h3>
					<p className="text-sm text-neutral-400 mt-1">
						{dish.description}
					</p>
					<p className="text-lg font-semibold text-white mt-2">
						₹{dish.price}
					</p>
				</div>

				<div className="flex items-center justify-between pt-2 border-t border-neutral-800">
					<Link
						href={`/restaurant/${restaurant.id}?dish=${dish.id}`}
						className="text-blue-500 hover:text-blue-400 text-sm font-medium"
					>
						View Dish
					</Link>
					<Link
						href={`/restaurant/${restaurant.id}`}
						className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-300"
					>
						<div className="flex items-center gap-1">
							<Star className="h-4 w-4 text-yellow-500" />
							<span>{restaurant.rating}</span>
						</div>
						<span>•</span>
						<span>{restaurant.name}</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
