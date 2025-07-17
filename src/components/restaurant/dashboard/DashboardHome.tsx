"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
	DashboardSummary,
	Abhryder,
	RecentOrder,
	PerformanceMetrics,
} from "@/types/restaurant-dashboard";
import { Phone, MessageSquare, UserX } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { fetchAbhryderOrderSummary } from "@/lib/restaurant/api";

interface DashboardHomeProps {
	summary: DashboardSummary;
	abhryders: Abhryder[];
	recentOrders: RecentOrder[];
	performance: PerformanceMetrics;
}

// Add types for Abhryder order summary
interface AbhryderOrder {
	orderId: string;
	deliveredAt: string;
	amount: number;
}
interface AbhryderOrderSummary {
	totalDeliveries: number;
	totalRevenue: number;
	deliveriesPerHour: string;
	orders: AbhryderOrder[];
}

export function DashboardHome({
	summary,
	abhryders,
	recentOrders,
	performance,
}: DashboardHomeProps) {
	const [numberOfTables, setNumberOfTables] = useState("");
	const [selectedAbhryder, setSelectedAbhryder] = useState<Abhryder | null>(
		null,
	);
	const [orderSummary, setOrderSummary] =
		useState<AbhryderOrderSummary | null>(null);
	const [orderSummaryRange, setOrderSummaryRange] = useState<
		"today" | "30days"
	>("today");
	const [orderSummaryLoading, setOrderSummaryLoading] = useState(false);

	useEffect(() => {
		if (!selectedAbhryder) return;
		setOrderSummaryLoading(true);
		fetchAbhryderOrderSummary(selectedAbhryder.id, orderSummaryRange)
			.then((data) => setOrderSummary(data))
			.catch(() => setOrderSummary(null))
			.finally(() => setOrderSummaryLoading(false));
	}, [selectedAbhryder, orderSummaryRange]);

	return (
		<div className="space-y-6 p-6">
			{/* Summary Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Orders
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{summary.totalOrders}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₹{summary.totalRevenue}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Orders
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{summary.pendingOrders}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Canceled Orders
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{summary.canceledOrders}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Table QR Codes */}
			<Card>
				<CardHeader>
					<CardTitle>Table QR Codes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-4">
						<Input
							type="number"
							placeholder="Number of tables"
							value={numberOfTables}
							onChange={(e) => setNumberOfTables(e.target.value)}
							className="max-w-[200px]"
						/>
						<Button>Generate QR Codes</Button>
					</div>
				</CardContent>
			</Card>

			{/* Abhryders List */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Abhryders</CardTitle>
					<Button variant="outline">View All</Button>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{abhryders.slice(0, 3).map((abhryder, idx) => (
							<Card
								key={abhryder.id || abhryder.phoneNumber || idx}
								className="cursor-pointer"
								onClick={() => setSelectedAbhryder(abhryder)}
							>
								<CardContent className="p-4">
									<div className="flex items-center space-x-4">
										{abhryder.avatar ? (
											<Image
												src={abhryder.avatar}
												alt={abhryder.name}
												width={48}
												height={48}
												className="rounded-full"
											/>
										) : null}
										<div>
											<h3 className="font-semibold">
												{abhryder.name}
											</h3>
											<p className="text-sm text-gray-500">
												{abhryder.totalOrders} orders •
												₹{abhryder.totalAmount}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Recent Orders */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Orders</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentOrders.map((order, idx) => (
							<div
								key={order.id || idx}
								className="flex items-center justify-between border-b pb-4"
							>
								<div className="flex items-center space-x-4">
									<div>
										<p className="font-semibold">
											Order #{order.id}
										</p>
										<p className="text-sm text-gray-500">
											{order.numberOfItems} items • ₹
											{order.totalAmount}
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-2">
										{order.abhryderAvatar ? (
											<Image
												src={order.abhryderAvatar}
												alt={order.abhryderName}
												width={32}
												height={32}
												className="rounded-full"
											/>
										) : null}
										<span className="text-sm">
											{order.abhryderName}
										</span>
									</div>
									<span className="text-sm text-gray-500">
										{order.timeAgo}
									</span>
									<Badge
										className={
											order.status === "Delivered"
												? "bg-green-100 text-green-800"
												: order.status === "Preparing"
													? "bg-yellow-100 text-yellow-800"
													: order.status ===
														  "Cancelled"
														? "bg-red-100 text-red-800"
														: "bg-blue-100 text-blue-800"
										}
									>
										{order.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Performance Summary */}
			<Card>
				<CardHeader>
					<CardTitle>Performance Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<div>
							<h3 className="text-sm font-medium">
								Average Rating
							</h3>
							<p className="text-2xl font-bold">
								{typeof performance.averageRating === "number"
									? performance.averageRating.toFixed(1)
									: "0.0"}
							</p>
						</div>
						<div>
							<h3 className="text-sm font-medium">
								Delivery Time
							</h3>
							<p className="text-2xl font-bold">
								{performance.deliveryTime} min
							</p>
						</div>
						<div>
							<h3 className="text-sm font-medium">
								Customer Retention
							</h3>
							<p className="text-2xl font-bold">
								{performance.customerRetention}%
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Abhryder Modal */}
			<Dialog
				open={!!selectedAbhryder}
				onOpenChange={() => setSelectedAbhryder(null)}
			>
				<DialogContent className="max-w-2xl">
					{selectedAbhryder && (
						<>
							<DialogHeader>
								<div className="flex items-center space-x-4 mb-4">
									{selectedAbhryder.avatar && (
										<Image
											src={selectedAbhryder.avatar}
											alt={selectedAbhryder.name}
											width={80}
											height={80}
											className="rounded-full border"
										/>
									)}
									<div>
										<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
											{selectedAbhryder.name}
										</h2>
										{selectedAbhryder.phoneNumber && (
											<p className="text-gray-600 dark:text-gray-400">
												{selectedAbhryder.phoneNumber}
											</p>
										)}
										{selectedAbhryder.city && (
											<p className="text-gray-500 dark:text-gray-400">
												{selectedAbhryder.city}
											</p>
										)}
										{selectedAbhryder.languages &&
											selectedAbhryder.languages.length >
												0 && (
												<p className="text-gray-500 dark:text-gray-400">
													Languages:{" "}
													{selectedAbhryder.languages.join(
														", ",
													)}
												</p>
											)}
									</div>
								</div>
							</DialogHeader>
							<Tabs defaultValue="orders">
								<TabsList>
									<TabsTrigger value="orders">
										Orders
									</TabsTrigger>
									<TabsTrigger value="profile">
										Profile
									</TabsTrigger>
								</TabsList>
								<TabsContent value="orders">
									<div className="space-y-4">
										<div className="flex space-x-4">
											<Button
												variant={
													orderSummaryRange ===
													"today"
														? "default"
														: "outline"
												}
												className="flex-1"
												onClick={() =>
													setOrderSummaryRange(
														"today",
													)
												}
											>
												Today&apos;s Summary
											</Button>
											<Button
												variant={
													orderSummaryRange ===
													"30days"
														? "default"
														: "outline"
												}
												className="flex-1"
												onClick={() =>
													setOrderSummaryRange(
														"30days",
													)
												}
											>
												Last 30 Days
											</Button>
										</div>
										{orderSummaryLoading ? (
											<div className="text-center py-4 text-gray-500">
												Loading...
											</div>
										) : orderSummary ? (
											<div className="grid gap-4 md:grid-cols-3">
												<Card>
													<CardContent className="p-4">
														<h3 className="font-semibold">
															Total Deliveries
														</h3>
														<p className="text-2xl font-bold">
															{
																orderSummary.totalDeliveries
															}
														</p>
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h3 className="font-semibold">
															Total Revenue
														</h3>
														<p className="text-2xl font-bold">
															₹
															{
																orderSummary.totalRevenue
															}
														</p>
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h3 className="font-semibold">
															Deliveries/Hour
														</h3>
														<p className="text-2xl font-bold">
															{
																orderSummary.deliveriesPerHour
															}
														</p>
													</CardContent>
												</Card>
											</div>
										) : (
											<div className="text-center py-4 text-gray-500">
												No summary available.
											</div>
										)}
										{orderSummary &&
											orderSummary.orders &&
											orderSummary.orders.length > 0 && (
												<div>
													<h3 className="font-semibold mb-2">
														Delivered Orders
													</h3>
													<div className="space-y-2 max-h-64 overflow-y-auto">
														{orderSummary.orders.map(
															(
																order: AbhryderOrder,
															) => (
																<div
																	key={
																		order.orderId
																	}
																	className="flex justify-between items-center border rounded p-2"
																>
																	<div>
																		<div className="font-medium">
																			{
																				order.orderId
																			}
																		</div>
																		<div className="text-xs text-gray-500">
																			{order.deliveredAt
																				? new Date(
																						order.deliveredAt,
																					).toLocaleString()
																				: ""}
																		</div>
																	</div>
																	<div className="font-bold">
																		₹
																		{
																			order.amount
																		}
																	</div>
																</div>
															),
														)}
													</div>
												</div>
											)}
									</div>
								</TabsContent>
								<TabsContent value="profile">
									<div className="space-y-6">
										<div>
											<h3 className="font-semibold mb-2">
												Performance Metrics
											</h3>
											<div className="grid gap-4 md:grid-cols-3">
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															Deliveries/Hour
														</h4>
														<p className="text-xl font-bold">
															{
																selectedAbhryder
																	.performance
																	.deliveriesPerHour
															}
														</p>
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															Rating
														</h4>
														<p className="text-xl font-bold">
															{
																selectedAbhryder
																	.performance
																	.rating
															}
														</p>
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															On Time Rate
														</h4>
														<p className="text-xl font-bold">
															{
																selectedAbhryder
																	.performance
																	.onTimeRate
															}
															%
														</p>
													</CardContent>
												</Card>
											</div>
										</div>
										<div>
											<h3 className="font-semibold mb-2">
												Verified Documents
											</h3>
											<div className="grid gap-4 md:grid-cols-3">
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															Driver&apos;s
															License
														</h4>
														{selectedAbhryder
															?.documents
															.driverLicense ? (
															<Image
																src={
																	selectedAbhryder
																		.documents
																		.driverLicense
																}
																alt="Driver's License"
																width={200}
																height={150}
																className="mt-2 rounded"
															/>
														) : null}
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															Aadhar Card
														</h4>
														{selectedAbhryder
															?.documents
															.aadharCard ? (
															<Image
																src={
																	selectedAbhryder
																		.documents
																		.aadharCard
																}
																alt="Aadhar Card"
																width={200}
																height={150}
																className="mt-2 rounded"
															/>
														) : null}
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															PAN Card
														</h4>
														{selectedAbhryder
															?.documents
															.panCard ? (
															<Image
																src={
																	selectedAbhryder
																		.documents
																		.panCard
																}
																alt="PAN Card"
																width={200}
																height={150}
																className="mt-2 rounded"
															/>
														) : null}
													</CardContent>
												</Card>
											</div>
										</div>
										<div className="flex space-x-4">
											<Button className="flex-1">
												<Phone className="mr-2 h-4 w-4" />
												Call
											</Button>
											<Button className="flex-1">
												<MessageSquare className="mr-2 h-4 w-4" />
												Message
											</Button>
											<Button
												variant="outline"
												className="flex-1"
											>
												<UserX className="mr-2 h-4 w-4" />
												Mark as Unavailable
											</Button>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
