"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DashboardSummary,
	Abhryder,
	RecentOrder,
	PerformanceMetrics,
} from "@/types/restaurant-dashboard";
import { Phone, MessageSquare, UserX } from "lucide-react";
import Image from "next/image";

interface DashboardHomeProps {
	summary: DashboardSummary;
	abhryders: Abhryder[];
	recentOrders: RecentOrder[];
	performance: PerformanceMetrics;
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
						{abhryders.slice(0, 3).map((abhryder) => (
							<Card
								key={abhryder.id}
								className="cursor-pointer"
								onClick={() => setSelectedAbhryder(abhryder)}
							>
								<CardContent className="p-4">
									<div className="flex items-center space-x-4">
										<Image
											src={abhryder.avatar}
											alt={abhryder.name}
											width={48}
											height={48}
											className="rounded-full"
										/>
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
						{recentOrders.map((order) => (
							<div
								key={order.id}
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
										<Image
											src={order.abhryderAvatar}
											alt={order.abhryderName}
											width={32}
											height={32}
											className="rounded-full"
										/>
										<span className="text-sm">
											{order.abhryderName}
										</span>
									</div>
									<span className="text-sm text-gray-500">
										{order.timeAgo}
									</span>
									<span
										className={`rounded-full px-2 py-1 text-xs ${
											order.status === "Delivered"
												? "bg-green-100 text-green-800"
												: order.status === "Preparing"
													? "bg-yellow-100 text-yellow-800"
													: order.status ===
														  "Cancelled"
														? "bg-red-100 text-red-800"
														: "bg-blue-100 text-blue-800"
										}`}
									>
										{order.status}
									</span>
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
								{performance.averageRating.toFixed(1)}
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
								<DialogTitle>
									{selectedAbhryder.name}
								</DialogTitle>
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
												variant="outline"
												className="flex-1"
											>
												Today&apos;s Summary
											</Button>
											<Button
												variant="outline"
												className="flex-1"
											>
												Last 30 Days
											</Button>
										</div>
										<div className="grid gap-4">
											<Card>
												<CardContent className="p-4">
													<h3 className="font-semibold">
														COD Collected
													</h3>
													<p className="text-2xl font-bold">
														₹
														{
															selectedAbhryder.totalAmount
														}
													</p>
												</CardContent>
											</Card>
											<Card>
												<CardContent className="p-4">
													<h3 className="font-semibold">
														Orders Completed
													</h3>
													<p className="text-2xl font-bold">
														{
															selectedAbhryder.totalOrders
														}
													</p>
												</CardContent>
											</Card>
										</div>
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
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															Aadhar Card
														</h4>
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
													</CardContent>
												</Card>
												<Card>
													<CardContent className="p-4">
														<h4 className="text-sm font-medium">
															PAN Card
														</h4>
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
