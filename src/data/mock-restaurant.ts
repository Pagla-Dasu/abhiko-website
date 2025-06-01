import { Restaurant } from "@/types/restaurant";

export const mockRestaurant: Restaurant = {
	id: "1",
	name: "Tandoori Treats",
	description:
		"Authentic North Indian cuisine with a modern twist. Specializing in tandoori dishes and rich curries.",
	cuisine: ["North Indian", "Tandoori", "Mughlai"],
	rating: 4.5,
	totalRatings: 1234,
	image: "/images/tandoori.jpg",
	location: "Downtown",
	deliveryTime: "30-40 mins",
	deliveryFee: 40,
	minimumOrder: 200,
	openingHours: {
		open: "11:00 AM",
		close: "11:00 PM",
	},
	orderType: "Delivery",
	menu: [
		{
			id: "starters",
			name: "Starters",
			description: "Begin your meal with our delicious appetizers",
			items: [
				{
					id: "paneer-tikka",
					name: "Paneer Tikka",
					description:
						"Cottage cheese marinated in spices and grilled in tandoor",
					price: 220,
					image: "/images/paneer-tikka.jpg",
					category: "starters",
					isVegetarian: true,
					isSpicy: false,
					available: true,
					customizations: [
						{
							id: "spice-level",
							name: "Spice Level",
							required: true,
							multiple: false,
							options: [
								{ id: "mild", name: "Mild", price: 0 },
								{ id: "medium", name: "Medium", price: 0 },
								{ id: "spicy", name: "Spicy", price: 0 },
							],
						},
					],
				},
				{
					id: "chicken-tikka",
					name: "Chicken Tikka",
					description:
						"Tender chicken pieces marinated in spices and grilled",
					price: 280,
					image: "/images/chicken-tikka.jpg",
					category: "starters",
					isVegetarian: false,
					isSpicy: true,
					available: true,
				},
			],
		},
		{
			id: "main-course",
			name: "Main Course",
			description: "Our signature main dishes",
			items: [
				{
					id: "butter-chicken",
					name: "Butter Chicken",
					description:
						"Tender chicken in a rich, creamy tomato-based curry",
					price: 320,
					image: "/images/butter-chicken.jpg",
					category: "main-course",
					isVegetarian: false,
					isSpicy: false,
					available: true,
					customizations: [
						{
							id: "portion",
							name: "Portion Size",
							required: true,
							multiple: false,
							options: [
								{ id: "half", name: "Half", price: -80 },
								{ id: "full", name: "Full", price: 0 },
							],
						},
					],
				},
				{
					id: "paneer-butter-masala",
					name: "Paneer Butter Masala",
					description:
						"Cottage cheese in a rich, creamy tomato-based curry",
					price: 280,
					image: "/images/paneer-butter-masala.jpg",
					category: "main-course",
					isVegetarian: true,
					isSpicy: false,
					available: true,
				},
			],
		},
		{
			id: "breads",
			name: "Breads",
			description: "Freshly baked breads to complement your meal",
			items: [
				{
					id: "butter-naan",
					name: "Butter Naan",
					description: "Soft, fluffy bread brushed with butter",
					price: 40,
					image: "/images/butter-naan.jpg",
					category: "breads",
					isVegetarian: true,
					isSpicy: false,
					available: true,
				},
				{
					id: "garlic-naan",
					name: "Garlic Naan",
					description: "Naan bread topped with garlic and butter",
					price: 60,
					image: "/images/garlic-naan.jpg",
					category: "breads",
					isVegetarian: true,
					isSpicy: false,
					available: true,
				},
			],
		},
	],
};
