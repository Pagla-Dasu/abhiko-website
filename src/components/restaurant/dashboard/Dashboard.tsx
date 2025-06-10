"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantNavbar } from "./RestaurantNavbar";
import { DashboardHome } from "./DashboardHome";
import { Orders } from "./Orders";
import { Menu } from "./Menu";
import { Profile } from "./Profile";
import {
	OrderStatus,
	OrderType,
	Order,
	DashboardSummary,
	Abhryder,
	RecentOrder,
	PerformanceMetrics,
	CancellationReason,
} from "@/types/restaurant-dashboard";

// TODO: Replace with actual data fetching
const mockData: {
	summary: DashboardSummary;
	abhryders: Abhryder[];
	recentOrders: RecentOrder[];
	performance: PerformanceMetrics;
	orders: Order[];
} = {
	summary: {
		totalOrders: 150,
		totalRevenue: 45000,
		pendingOrders: 5,
		canceledOrders: 3,
	},
	abhryders: [
		{
			id: "1",
			name: "John Doe",
			avatar: "/avatars/john.jpg",
			phoneNumber: "+91 9876543210",
			totalOrders: 45,
			totalAmount: 15000,
			performance: {
				deliveriesPerHour: 3.5,
				rating: 4.8,
				onTimeRate: 95,
			},
			documents: {
				driverLicense: "/documents/driver-license.jpg",
				aadharCard: "/documents/aadhar.jpg",
				panCard: "/documents/pan.jpg",
			},
			isAvailable: true,
		},
		// Add more mock abhryders...
	],
	recentOrders: [
		{
			id: "ORD001",
			abhryderId: "1",
			abhryderName: "John Doe",
			abhryderAvatar: "/avatars/john.jpg",
			numberOfItems: 3,
			totalAmount: 450,
			timeAgo: "5 minutes ago",
			status: "Preparing" as OrderStatus,
		},
		// Add more mock orders...
	],
	performance: {
		averageRating: 4.5,
		deliveryTime: 25,
		customerRetention: 85,
	},
	orders: [
		// New Orders
		{
			id: "ORD001",
			type: "Dine-in" as OrderType,
			status: "New" as OrderStatus,
			customer: {
				name: "Alice Smith",
				phone: "+91 9876543211",
				avatar: "/avatars/alice.jpg",
			},
			tableNumber: "12",
			items: [
				{
					id: "1",
					name: "Butter Chicken",
					quantity: 2,
					price: 250,
				},
				{
					id: "2",
					name: "Naan",
					quantity: 4,
					price: 30,
				},
			],
			totalAmount: 620,
			timeOrdered: new Date(),
		},
		{
			id: "ORD002",
			type: "Delivery" as OrderType,
			status: "New" as OrderStatus,
			customer: {
				name: "Bob Johnson",
				phone: "+91 9876543212",
				avatar: "/avatars/bob.jpg",
			},
			deliveryAddress: "123 Main St, City Center",
			items: [
				{
					id: "3",
					name: "Veg Biryani",
					quantity: 1,
					price: 180,
				},
				{
					id: "4",
					name: "Raita",
					quantity: 1,
					price: 40,
				},
			],
			totalAmount: 220,
			timeOrdered: new Date(),
		},
		{
			id: "ORD003",
			type: "Takeout" as OrderType,
			status: "New" as OrderStatus,
			customer: {
				name: "Carol White",
				phone: "+91 9876543213",
				avatar: "/avatars/carol.jpg",
			},
			items: [
				{
					id: "5",
					name: "Chicken Tikka",
					quantity: 2,
					price: 200,
				},
				{
					id: "6",
					name: "Garlic Naan",
					quantity: 2,
					price: 40,
				},
			],
			totalAmount: 480,
			timeOrdered: new Date(),
		},
		// Preparing Orders
		{
			id: "ORD004",
			type: "Dine-in" as OrderType,
			status: "Preparing" as OrderStatus,
			customer: {
				name: "David Brown",
				phone: "+91 9876543214",
				avatar: "/avatars/david.jpg",
			},
			tableNumber: "8",
			items: [
				{
					id: "7",
					name: "Paneer Butter Masala",
					quantity: 1,
					price: 220,
				},
				{
					id: "8",
					name: "Jeera Rice",
					quantity: 1,
					price: 100,
				},
			],
			totalAmount: 320,
			timeOrdered: new Date(Date.now() - 15 * 60000), // 15 minutes ago
		},
		{
			id: "ORD005",
			type: "Delivery" as OrderType,
			status: "Preparing" as OrderStatus,
			customer: {
				name: "Eva Green",
				phone: "+91 9876543215",
				avatar: "/avatars/eva.jpg",
			},
			deliveryAddress: "456 Park Avenue, Downtown",
			items: [
				{
					id: "9",
					name: "Chicken Curry",
					quantity: 2,
					price: 180,
				},
				{
					id: "10",
					name: "Steamed Rice",
					quantity: 2,
					price: 80,
				},
			],
			totalAmount: 520,
			timeOrdered: new Date(Date.now() - 10 * 60000), // 10 minutes ago
		},
		// Delivered Orders
		{
			id: "ORD006",
			type: "Takeout" as OrderType,
			status: "Delivered" as OrderStatus,
			customer: {
				name: "Frank Miller",
				phone: "+91 9876543216",
				avatar: "/avatars/frank.jpg",
			},
			items: [
				{
					id: "11",
					name: "Veg Fried Rice",
					quantity: 1,
					price: 150,
				},
				{
					id: "12",
					name: "Veg Noodles",
					quantity: 1,
					price: 150,
				},
			],
			totalAmount: 300,
			timeOrdered: new Date(Date.now() - 45 * 60000), // 45 minutes ago
		},
		{
			id: "ORD007",
			type: "Dine-in" as OrderType,
			status: "Delivered" as OrderStatus,
			customer: {
				name: "Grace Lee",
				phone: "+91 9876543217",
				avatar: "/avatars/grace.jpg",
			},
			tableNumber: "15",
			items: [
				{
					id: "13",
					name: "Chicken Biryani",
					quantity: 2,
					price: 200,
				},
				{
					id: "14",
					name: "Coke",
					quantity: 2,
					price: 40,
				},
			],
			totalAmount: 480,
			timeOrdered: new Date(Date.now() - 30 * 60000), // 30 minutes ago
		},
		// Cancelled Orders
		{
			id: "ORD008",
			type: "Delivery" as OrderType,
			status: "Cancelled" as OrderStatus,
			customer: {
				name: "Henry Wilson",
				phone: "+91 9876543218",
				avatar: "/avatars/henry.jpg",
			},
			deliveryAddress: "789 Oak Street, Uptown",
			items: [
				{
					id: "15",
					name: "Butter Chicken",
					quantity: 1,
					price: 250,
				},
				{
					id: "16",
					name: "Butter Naan",
					quantity: 2,
					price: 40,
				},
			],
			totalAmount: 330,
			timeOrdered: new Date(Date.now() - 20 * 60000), // 20 minutes ago
			cancelledBy: "restaurant" as const,
			cancellationReason: "Out of stock" as CancellationReason,
		},
		{
			id: "ORD009",
			type: "Takeout" as OrderType,
			status: "Cancelled" as OrderStatus,
			customer: {
				name: "Ivy Chen",
				phone: "+91 9876543219",
				avatar: "/avatars/ivy.jpg",
			},
			items: [
				{
					id: "17",
					name: "Veg Biryani",
					quantity: 1,
					price: 180,
				},
				{
					id: "18",
					name: "Raita",
					quantity: 1,
					price: 40,
				},
			],
			totalAmount: 220,
			timeOrdered: new Date(Date.now() - 5 * 60000), // 5 minutes ago
			cancelledBy: "customer" as const,
			cancellationReason: "Customer request" as CancellationReason,
		},
	],
};

interface DashboardProps {
	restaurantId: string;
}

export function Dashboard({ restaurantId }: DashboardProps) {
	const [activeTab, setActiveTab] = useState("home");

	console.log("Restaurant ID:", restaurantId);

	return (
		<div className="min-h-screen bg-background">
			<RestaurantNavbar
				restaurantId={restaurantId}
				onProfileClick={() => setActiveTab("profile")}
			/>
			<div className="mx-auto max-w-7xl px-4 md:px-6 pt-4">
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="home">Home</TabsTrigger>
						<TabsTrigger value="orders">Orders</TabsTrigger>
						<TabsTrigger value="menu">Menu</TabsTrigger>
						<TabsTrigger value="profile">Profile</TabsTrigger>
					</TabsList>
					<TabsContent value="home">
						<DashboardHome
							summary={mockData.summary}
							abhryders={mockData.abhryders}
							recentOrders={mockData.recentOrders}
							performance={mockData.performance}
						/>
					</TabsContent>
					<TabsContent value="orders">
						<Orders orders={mockData.orders} />
					</TabsContent>
					<TabsContent value="menu">
						<Menu />
					</TabsContent>
					<TabsContent value="profile">
						<Profile />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
