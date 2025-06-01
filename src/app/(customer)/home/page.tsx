"use client";

import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import Link from "next/link";

const restaurants = [
	{
		id: "1",
		name: "Tandoori Treats",
		cuisine: ["North Indian", "Tandoori"],
		rating: 4.5,
		image: "/images/tandoori.jpg",
		deliveryTime: "30 mins",
		location: "Downtown",
		orderType: "Delivery",
	},
	{
		id: "2",
		name: "Curry Kingdom",
		cuisine: ["South Indian", "Kerala"],
		rating: 4.2,
		image: "/images/curry.jpg",
		deliveryTime: "25 mins",
		location: "Westside",
		orderType: "Dine-in",
	},
	{
		id: "3",
		name: "Biryani Express",
		cuisine: ["Hyderabadi", "Mughlai"],
		rating: 4.7,
		image: "/images/biryani.jpg",
		deliveryTime: "20 mins",
		location: "Eastside",
		orderType: "Takeaway",
	},
	{
		id: "4",
		name: "Veggie Delight",
		cuisine: ["Gujarati", "Vegetarian"],
		rating: 4.3,
		image: "/images/gujarati.jpg",
		deliveryTime: "35 mins",
		location: "Northside",
		orderType: "Delivery",
	},
];

export default function CustomerHomePage() {
	return (
		<div className="min-h-screen bg-neutral-950 text-white px-4 py-10">
			<div className="max-w-7xl mx-auto space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">
						Discover Delicious Food Near You
					</h1>
					<p className="text-neutral-400 max-w-xl mx-auto">
						Explore top-rated restaurants, mouth-watering dishes,
						and exclusive offers. Choose from delivery, takeaway, or
						dine-in.
					</p>
				</div>

				{/* Restaurant Grid */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{restaurants.map((restaurant) => (
						<Link
							key={restaurant.id}
							href={`/restaurant/${restaurant.id}`}
							className="transition duration-300 transform hover:scale-[1.02]"
						>
							<RestaurantCard {...restaurant} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
