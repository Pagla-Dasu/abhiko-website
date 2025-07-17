"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantNavbar } from "./RestaurantNavbar";
import { DashboardHome } from "./DashboardHome";
import { Orders } from "./Orders";
import { Menu } from "./Menu";
import { Profile } from "./Profile";
import {
	DashboardSummary,
	Abhryder,
	RecentOrder,
	PerformanceMetrics,
	OrderStatus,
} from "@/types/restaurant-dashboard";
import {
	fetchDashboardSummary,
	fetchAssignedAbhryders,
	fetchAllOrders,
} from "@/lib/restaurant/api";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { getS3ImageUrl } from "../../../utils/s3";

// Add a type for backend order
interface BackendOrderItem {
	dishId?: string | { $oid: string };
	quantity: number;
	_id?: string | { $oid: string };
}
interface BackendOrder {
	displayOrderId?: string;
	_id?: string | { $oid: string };
	Amount?: number;
	items?: BackendOrderItem[];
	orderType?: string;
	CustomerAddress?: string;
	OrderStatus?: string;
	DeliveryTimestamp?: string | { $date: string };
	createdAt?: string | { $date: string };
}

// Keep the original tab structure and layout
export function Dashboard() {
	const [activeTab, setActiveTab] = useState("home");
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState<DashboardSummary | null>(null);
	const [abhryders, setAbhryders] = useState<Abhryder[]>([]);
	const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
	const [performance, setPerformance] = useState<PerformanceMetrics | null>(
		null,
	);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				const summaryData = await fetchDashboardSummary();
				setSummary({
					totalOrders: summaryData.totalOrders ?? 0,
					totalRevenue: summaryData.totalRevenue ?? 0,
					pendingOrders: summaryData.pendingOrders ?? 0,
					canceledOrders:
						summaryData.cancelledOrders ??
						summaryData.canceledOrders ??
						0,
				});
				setPerformance({
					averageRating: summaryData.averageRating ?? 0,
					deliveryTime:
						summaryData.avgDeliveryTime ??
						summaryData.averageDeliveryTime ??
						0,
					customerRetention: summaryData.retentionPercentage ?? 0,
				});
				try {
					const abhrydersData = await fetchAssignedAbhryders();
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const mappedAbhryders: Abhryder[] = (
						abhrydersData || []
					).map((a: any, idx: number) => ({
						id:
							a.PartnerID ||
							a.partnerId ||
							a._id ||
							a.id ||
							String(idx),
						name: a.personalInfo?.name || a.Name || a.name || "",
						avatar:
							a.PhotoURL ||
							(a.photoKey ? getS3ImageUrl(a.photoKey) : "") ||
							"",
						phoneNumber: a.phone || "",
						isAvailable:
							typeof a.isAvailable === "boolean"
								? a.isAvailable
								: false,
						totalOrders: a.todayOrdersCount ?? 0,
						totalAmount: a.todayCOD ?? 0,
						performance: {
							deliveriesPerHour: a.deliveriesPerHour ?? 0,
							rating: a.averageRating ?? 0,
							onTimeRate: 0, // Not available in backend, set to 0 or null
						},
						documents: {
							driverLicense: a.DrivingLicense || "",
							aadharCard: a.Aadhar || "",
							panCard: a.PAN || "",
						},
						city: a.personalInfo?.city || a.city || undefined,
						languages:
							a.personalInfo?.languages ||
							a.languages ||
							undefined,
					}));
					setAbhryders(mappedAbhryders);
				} catch {
					toast.error("Failed to fetch Abhryders");
				}
				let allOrdersData: BackendOrder[] = [];
				try {
					allOrdersData = await fetchAllOrders();
					// Do not call setOrders here, as the types do not match
				} catch {
					toast.error("Failed to fetch orders");
				}
				// Map to RecentOrder type for dashboard home (latest 10)
				const validOrders = (
					(allOrdersData || []) as BackendOrder[]
				).filter(
					(order) =>
						(order.displayOrderId || order._id) &&
						(order.displayOrderId || order._id) !== "-" &&
						(order.displayOrderId || order._id) !== "",
				);
				if (validOrders.length < (allOrdersData || []).length) {
					console.warn(
						"Some orders were skipped due to missing or invalid id",
					);
				}
				const sortedOrders = validOrders.slice().sort((a, b) => {
					const aDateRaw = a.DeliveryTimestamp || a.createdAt;
					const bDateRaw = b.DeliveryTimestamp || b.createdAt;
					const aDate = aDateRaw
						? new Date(
								(typeof aDateRaw === "object"
									? aDateRaw.$date
									: aDateRaw) || 0,
							)
						: new Date(0);
					const bDate = bDateRaw
						? new Date(
								(typeof bDateRaw === "object"
									? bDateRaw.$date
									: bDateRaw) || 0,
							)
						: new Date(0);
					return bDate.getTime() - aDate.getTime();
				});
				const recentOrdersMapped = sortedOrders
					.slice(0, 10)
					.map((order, idx) => {
						const id =
							order.displayOrderId ||
							(order._id &&
								(typeof order._id === "object"
									? order._id.$oid
									: order._id)) ||
							String(idx);
						const items = order.items || [];
						const numberOfItems = items.reduce(
							(sum, item) => sum + (item.quantity || 0),
							0,
						);
						const totalAmount = order.Amount || 0;
						// Normalize and map OrderStatus
						let rawStatus = order.OrderStatus || "New";
						console.log("Backend OrderStatus:", rawStatus);
						if (typeof rawStatus === "string") {
							rawStatus = rawStatus.trim().toLowerCase();
						}
						let status: OrderStatus = "New";
						switch (rawStatus) {
							case "new":
							case "placed":
							case "available":
								status = "New";
								break;
							case "preparing":
								status = "Preparing";
								break;
							case "picked_up":
							case "delivered":
								status = "Delivered";
								break;
							case "cancelled":
							case "canceled":
								status = "Cancelled";
								break;
							default:
								status = "New";
						}
						const timeRaw =
							order.DeliveryTimestamp || order.createdAt;
						const timeAgo = timeRaw
							? formatDistanceToNow(
									new Date(
										typeof timeRaw === "object"
											? timeRaw.$date
											: timeRaw,
									),
									{ addSuffix: true },
								)
							: "";
						return {
							id,
							abhryderId: "",
							abhryderName: "", // Not available in this schema
							abhryderAvatar: "", // Not available in this schema
							numberOfItems,
							totalAmount,
							timeAgo,
							status,
						};
					});
				setRecentOrders(recentOrdersMapped);
			} catch (err: unknown) {
				let message = "Failed to load dashboard data";
				if (err instanceof Error) message = err.message;
				setError(message);
			}
			setLoading(false);
		}
		fetchData();
	}, []);

	// Use fallback empty data if not loaded yet, to keep UI structure
	const summaryData = summary || {
		totalOrders: 0,
		totalRevenue: 0,
		pendingOrders: 0,
		canceledOrders: 0,
	};
	const performanceData = performance || {
		averageRating: 0,
		deliveryTime: 0,
		customerRetention: 0,
	};

	// Only show error overlay if summary or performance failed to load
	if (error) {
		return <div className="p-8 text-center text-red-500">{error}</div>;
	}

	return (
		<div className="min-h-screen bg-background">
			<RestaurantNavbar
				restaurantId="1"
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
							summary={summaryData}
							abhryders={abhryders}
							recentOrders={recentOrders}
							performance={performanceData}
						/>
					</TabsContent>
					<TabsContent value="orders">
						<Orders orders={[]} />
					</TabsContent>
					<TabsContent value="menu">
						<Menu />
					</TabsContent>
					<TabsContent value="profile">
						<Profile />
					</TabsContent>
				</Tabs>
				{/* Loading and error overlays, non-destructive */}
				{loading && (
					<div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
						<div className="p-6 bg-white rounded shadow text-lg">
							Loading dashboard...
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
