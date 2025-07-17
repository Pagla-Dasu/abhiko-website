export type OrderStatus = "New" | "Preparing" | "Delivered" | "Cancelled";
export type OrderType = "Dine-in" | "Takeout" | "Delivery";
export type CancellationReason =
	| "Out of stock"
	| "Kitchen closed"
	| "Technical issues"
	| "Other";

export interface DashboardSummary {
	totalOrders: number;
	totalRevenue: number;
	pendingOrders: number;
	canceledOrders: number;
}

export interface Abhryder {
	id: string;
	name: string;
	avatar: string;
	phoneNumber: string;
	city?: string;
	languages?: string[];
	totalOrders: number;
	totalAmount: number;
	performance: {
		deliveriesPerHour: number;
		rating: number;
		onTimeRate: number;
	};
	documents: {
		driverLicense: string;
		aadharCard: string;
		panCard: string;
	};
	isAvailable: boolean;
}

export interface RecentOrder {
	id: string;
	abhryderId: string;
	abhryderName: string;
	abhryderAvatar: string;
	numberOfItems: number;
	totalAmount: number;
	timeAgo: string;
	status: OrderStatus;
}

export interface PerformanceMetrics {
	averageRating: number;
	deliveryTime: number; // in minutes
	customerRetention: number; // percentage
}

export interface Order {
	id: string;
	type: OrderType;
	status: OrderStatus;
	customer: {
		name: string;
		phone: string;
		avatar: string;
	};
	tableNumber?: string;
	deliveryAddress?: string;
	items: {
		id: string;
		name: string;
		quantity: number;
		price: number;
	}[];
	totalAmount: number;
	timeOrdered: Date;
	cancelledBy?: "restaurant" | "customer";
	cancellationReason?: CancellationReason;
}
