"use client";

import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { DishCard } from "@/components/restaurant/dish-card";
import Link from "next/link";
import { Search, Utensils, Truck, Store } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { restaurants } from "@/data/restaurants";
import { MenuItem } from "@/types/restaurant";

type OrderType = "All" | "Delivery" | "Dine-in" | "Takeaway";

interface DishWithRestaurant {
	dish: MenuItem;
	restaurant: {
		id: string;
		name: string;
		rating: number;
	};
	score: number;
}

interface RestaurantWithScore {
	restaurant: (typeof restaurants)[string];
	score: number;
}

// Helper function to calculate search score
function calculateSearchScore(text: string, query: string): number {
	if (!query) return 0;

	const textLower = text.toLowerCase();
	const queryLower = query.toLowerCase();

	// Exact match gets highest score
	if (textLower === queryLower) return 100;

	// Starts with query gets high score
	if (textLower.startsWith(queryLower)) return 90;

	// Contains query as whole word gets medium-high score
	if (
		textLower.includes(` ${queryLower} `) ||
		textLower.includes(` ${queryLower}`) ||
		textLower.includes(`${queryLower} `)
	) {
		return 80;
	}

	// Contains query as substring gets medium score
	if (textLower.includes(queryLower)) return 70;

	// Check for word matches
	const textWords = textLower.split(/\s+/);
	const queryWords = queryLower.split(/\s+/);

	// Calculate word match score
	const wordMatchScore =
		queryWords.reduce((score, queryWord) => {
			const bestWordMatch = textWords.reduce((best, textWord) => {
				// Exact word match
				if (textWord === queryWord) return 60;
				// Word starts with query
				if (textWord.startsWith(queryWord)) return 50;
				// Word contains query
				if (textWord.includes(queryWord)) return 40;
				return best;
			}, 0);
			return score + bestWordMatch;
		}, 0) / queryWords.length;

	return wordMatchScore;
}

export default function CustomerHomePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrderType, setSelectedOrderType] =
		useState<OrderType>("All");

	const orderTypes: { type: OrderType; icon: React.ReactNode }[] = [
		{ type: "All", icon: <Utensils className="h-5 w-5" /> },
		{ type: "Delivery", icon: <Truck className="h-5 w-5" /> },
		{ type: "Dine-in", icon: <Utensils className="h-5 w-5" /> },
		{ type: "Takeaway", icon: <Store className="h-5 w-5" /> },
	];

	const { filteredRestaurants, filteredDishes } = useMemo(() => {
		const restaurantList = Object.values(restaurants);
		const dishes: DishWithRestaurant[] = [];
		const restaurantsWithScores: RestaurantWithScore[] = [];

		// Collect all dishes and calculate scores
		restaurantList.forEach((restaurant) => {
			// Calculate restaurant score
			const restaurantScore = searchQuery
				? Math.max(
						calculateSearchScore(restaurant.name, searchQuery),
						...restaurant.cuisine.map((cuisine) =>
							calculateSearchScore(cuisine, searchQuery),
						),
					)
				: 100; // If no search query, give full score to show all restaurants

			restaurantsWithScores.push({
				restaurant,
				score: restaurantScore,
			});

			// Collect dishes with scores
			restaurant.menu.forEach((category) => {
				category.items.forEach((dish) => {
					const dishScore = calculateSearchScore(
						dish.name,
						searchQuery,
					);
					if (dishScore > 0) {
						dishes.push({
							dish,
							restaurant: {
								id: restaurant.id,
								name: restaurant.name,
								rating: restaurant.rating,
							},
							score: dishScore,
						});
					}
				});
			});
		});

		// Filter and sort restaurants
		const filteredRestaurants = restaurantsWithScores
			.filter(({ restaurant, score }) => {
				const matchesOrderType =
					selectedOrderType === "All" ||
					restaurant.orderType === selectedOrderType;
				return score > 0 && matchesOrderType;
			})
			.sort((a, b) => b.score - a.score)
			.map(({ restaurant }) => restaurant);

		// Sort dishes by score
		const filteredDishes = dishes
			.sort((a, b) => b.score - a.score)
			.map(({ dish, restaurant }) => ({ dish, restaurant }));

		return { filteredRestaurants, filteredDishes };
	}, [searchQuery, selectedOrderType]);

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

				{/* Search and Filter Section */}
				<div className="space-y-6">
					{/* Search Bar */}
					<div className="relative max-w-2xl mx-auto">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
						<Input
							type="text"
							placeholder="Search for restaurants or dishes..."
							className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Order Type Filter */}
					<div className="flex justify-center gap-4">
						{orderTypes.map(({ type, icon }) => (
							<Button
								key={type}
								variant="outline"
								className={cn(
									"flex items-center gap-2 bg-neutral-900 border-neutral-800 hover:bg-neutral-800",
									selectedOrderType === type &&
										"bg-blue-600 border-blue-600 hover:bg-blue-700",
								)}
								onClick={() => setSelectedOrderType(type)}
							>
								{icon}
								{type}
							</Button>
						))}
					</div>
				</div>

				{/* Results Section */}
				{searchQuery && filteredDishes.length > 0 ? (
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold">Dishes</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredDishes.map(({ dish, restaurant }) => (
								<DishCard
									key={`${restaurant.id}-${dish.id}`}
									dish={dish}
									restaurant={restaurant}
								/>
							))}
						</div>
					</div>
				) : (
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold">Restaurants</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredRestaurants.map((restaurant) => (
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
				)}

				{/* No Results Message */}
				{filteredRestaurants.length === 0 &&
					filteredDishes.length === 0 && (
						<div className="text-center py-12">
							<p className="text-neutral-400 text-lg">
								No restaurants or dishes found matching your
								criteria.
							</p>
						</div>
					)}
			</div>
		</div>
	);
}
