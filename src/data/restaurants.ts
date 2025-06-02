import { Restaurant } from "@/types/restaurant";

export const restaurants: Record<string, Restaurant> = {
	"1": {
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
				],
			},
		],
	},
	"2": {
		id: "2",
		name: "Curry Kingdom",
		description:
			"Experience the authentic flavors of South India with our traditional recipes and modern presentation.",
		cuisine: ["South Indian", "Kerala"],
		rating: 4.2,
		totalRatings: 856,
		image: "/images/curry.jpg",
		location: "Westside",
		deliveryTime: "25-35 mins",
		deliveryFee: 35,
		minimumOrder: 150,
		openingHours: {
			open: "10:00 AM",
			close: "10:00 PM",
		},
		orderType: "Dine-in",
		menu: [
			{
				id: "breakfast",
				name: "Breakfast",
				description:
					"Start your day with our traditional South Indian breakfast",
				items: [
					{
						id: "masala-dosa",
						name: "Masala Dosa",
						description:
							"Crispy dosa filled with spiced potato filling",
						price: 120,
						image: "/images/masala-dosa.jpg",
						category: "breakfast",
						isVegetarian: true,
						isSpicy: false,
						available: true,
					},
					{
						id: "idli-sambhar",
						name: "Idli Sambhar",
						description: "Soft idlis served with flavorful sambhar",
						price: 80,
						image: "/images/idli-sambhar.jpg",
						category: "breakfast",
						isVegetarian: true,
						isSpicy: false,
						available: true,
					},
				],
			},
		],
	},
	"3": {
		id: "3",
		name: "Biryani Express",
		description:
			"Serving the most authentic and flavorful biryanis in town. Each biryani is prepared with premium ingredients and traditional spices.",
		cuisine: ["Hyderabadi", "Mughlai"],
		rating: 4.7,
		totalRatings: 2103,
		image: "/images/biryani.jpg",
		location: "Eastside",
		deliveryTime: "20-30 mins",
		deliveryFee: 45,
		minimumOrder: 250,
		openingHours: {
			open: "11:30 AM",
			close: "11:00 PM",
		},
		orderType: "Takeaway",
		menu: [
			{
				id: "biryani",
				name: "Biryani",
				description: "Our signature biryani collection",
				items: [
					{
						id: "chicken-biryani",
						name: "Chicken Biryani",
						description:
							"Fragrant basmati rice cooked with tender chicken and aromatic spices",
						price: 280,
						image: "/images/chicken-biryani.jpg",
						category: "biryani",
						isVegetarian: false,
						isSpicy: true,
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
				],
			},
		],
	},
	"4": {
		id: "4",
		name: "Veggie Delight",
		description:
			"A paradise for vegetarian food lovers. We serve authentic Gujarati cuisine with a healthy twist.",
		cuisine: ["Gujarati", "Vegetarian"],
		rating: 4.3,
		totalRatings: 945,
		image: "/images/gujarati.jpg",
		location: "Northside",
		deliveryTime: "35-45 mins",
		deliveryFee: 30,
		minimumOrder: 180,
		openingHours: {
			open: "10:30 AM",
			close: "10:30 PM",
		},
		orderType: "Delivery",
		menu: [
			{
				id: "snacks",
				name: "Snacks",
				description: "Traditional Gujarati snacks",
				items: [
					{
						id: "dhokla",
						name: "Dhokla",
						description:
							"Steamed savory cake made from fermented batter",
						price: 100,
						image: "/images/dhokla.jpg",
						category: "snacks",
						isVegetarian: true,
						isSpicy: false,
						available: true,
					},
					{
						id: "khandvi",
						name: "Khandvi",
						description: "Rolled savory snack made from gram flour",
						price: 120,
						image: "/images/khandvi.jpg",
						category: "snacks",
						isVegetarian: true,
						isSpicy: false,
						available: true,
					},
				],
			},
		],
	},
};
