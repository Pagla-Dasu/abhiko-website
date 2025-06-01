"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";

type Restaurant = {
	id: string;
	name: string;
	cuisine: string[];
	location: string;
	image: string;
	rating: number;
	orderType: string;
};

export default function DiscoverRestaurantsPage() {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [search, setSearch] = useState("");
	const [orderType, setOrderType] = useState("");
	const [sortBy, setSortBy] = useState("");

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const query = new URLSearchParams();
				if (search) query.append("search", search);
				if (orderType) query.append("orderType", orderType);
				if (sortBy) query.append("sortBy", sortBy);

				const res = await fetch(
					`https://your-api.com/api/restaurants?${query.toString()}`,
				);
				const data = await res.json();
				setRestaurants(data.restaurants || []);
			} catch (err) {
				console.error("Error fetching restaurants:", err);
			}
		};

		fetchRestaurants();
	}, [search, orderType, sortBy]);

	return (
		<div className="min-h-screen w-full bg-white dark:bg-neutral-950 py-8 px-4 md:px-8">
			<div className="max-w-5xl mx-auto space-y-8">
				<h1 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 dark:text-white">
					Discover Restaurants
				</h1>

				<div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
					<Input
						placeholder="Search by name, cuisine, or location"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="flex-1"
					/>

					<select
						onChange={(e) => setOrderType(e.target.value)}
						value={orderType}
						className="p-2 rounded-md border bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
					>
						<option value="">All Order Types</option>
						<option value="delivery">Delivery</option>
						<option value="takeaway">Takeaway</option>
						<option value="dinein">Dine-in</option>
					</select>

					<select
						onChange={(e) => setSortBy(e.target.value)}
						value={sortBy}
						className="p-2 rounded-md border bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
					>
						<option value="">Sort by</option>
						<option value="nearest">Nearest</option>
						<option value="highestRated">Highest Rated</option>
						<option value="trending">Trending</option>
					</select>
				</div>

				<motion.div
					layout
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{restaurants.map((restaurant) => (
						<RestaurantCard
							key={restaurant.id}
							name={restaurant.name}
							cuisine={restaurant.cuisine}
							location={restaurant.location}
							image={restaurant.image}
							rating={restaurant.rating}
							orderType={restaurant.orderType}
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}
