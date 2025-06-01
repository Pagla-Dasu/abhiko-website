export type MenuCategory = {
	id: string;
	name: string;
	description?: string;
	items: MenuItem[];
};

export type MenuItem = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	isVegetarian: boolean;
	isSpicy: boolean;
	customizations?: MenuItemCustomization[];
	available: boolean;
};

export type MenuItemCustomization = {
	id: string;
	name: string;
	options: {
		id: string;
		name: string;
		price: number;
	}[];
	required: boolean;
	multiple: boolean;
};

export type Restaurant = {
	id: string;
	name: string;
	description: string;
	cuisine: string[];
	rating: number;
	totalRatings: number;
	image: string;
	location: string;
	deliveryTime: string;
	deliveryFee: number;
	minimumOrder: number;
	openingHours: {
		open: string;
		close: string;
	};
	orderType: "Delivery" | "Takeaway" | "Dine-in";
	menu: MenuCategory[];
};
