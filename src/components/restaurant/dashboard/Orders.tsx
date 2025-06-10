"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order, OrderStatus, OrderType } from "@/types/restaurant-dashboard";
import { OrderCard } from "./OrderCard";
import { Badge } from "@/components/ui/badge";

interface OrdersProps {
	orders: Order[];
}

export function Orders({ orders }: OrdersProps) {
	const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("New");
	const [selectedType, setSelectedType] = useState<OrderType>("Dine-in");

	// Get all available order types
	const orderTypes: OrderType[] = ["Dine-in", "Takeout", "Delivery"];

	// Get all available statuses
	const statuses: OrderStatus[] = [
		"New",
		"Preparing",
		"Delivered",
		"Cancelled",
	];

	// Get orders for the current status and type
	const filteredOrders = orders.filter(
		(order) =>
			order.status === selectedStatus && order.type === selectedType,
	);

	// Get count of orders for each status
	const getStatusCounts = (type: OrderType) => {
		return statuses.reduce(
			(acc, status) => {
				acc[status] = orders.filter(
					(order) => order.status === status && order.type === type,
				).length;
				return acc;
			},
			{} as Record<OrderStatus, number>,
		);
	};

	// Get count of orders for each type in current status
	const getOrderTypeCounts = () => {
		return orderTypes.reduce(
			(acc, type) => {
				acc[type] = orders.filter(
					(order) =>
						order.status === selectedStatus && order.type === type,
				).length;
				return acc;
			},
			{} as Record<OrderType, number>,
		);
	};

	// Handle status tab change
	const handleStatusChange = (status: OrderStatus) => {
		setSelectedStatus(status);
		// Check if current type has orders in new status
		const typeCounts = getOrderTypeCounts();
		if (typeCounts[selectedType] === 0) {
			// Find first type that has orders in this status
			const availableType = orderTypes.find(
				(type) => typeCounts[type] > 0,
			);
			if (availableType) {
				setSelectedType(availableType);
			}
		}
	};

	// Handle type tab change
	const handleTypeChange = (type: OrderType) => {
		setSelectedType(type);
		// Check if current status has orders in new type
		const statusCounts = getStatusCounts(type);
		if (statusCounts[selectedStatus] === 0) {
			// Find first status that has orders in this type
			const availableStatus = statuses.find(
				(status) => statusCounts[status] > 0,
			);
			if (availableStatus) {
				setSelectedStatus(availableStatus);
			}
		}
	};

	// Get counts for current type
	const currentTypeCounts = getStatusCounts(selectedType);

	// Get counts for current status
	const currentStatusCounts = getOrderTypeCounts();

	return (
		<div className="space-y-6">
			{/* Status Tabs */}
			<Tabs
				value={selectedStatus}
				onValueChange={(value) =>
					handleStatusChange(value as OrderStatus)
				}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-4 h-11 bg-muted/50">
					{statuses.map((status) => (
						<TabsTrigger
							key={status}
							value={status}
							className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
						>
							{status}
							{currentTypeCounts[status] > 0 && (
								<Badge
									variant="secondary"
									className="ml-2 bg-primary/10 text-primary hover:bg-primary/20"
								>
									{currentTypeCounts[status]}
								</Badge>
							)}
						</TabsTrigger>
					))}
				</TabsList>

				{/* Order Type Tabs */}
				<div className="mt-4">
					<Tabs
						value={selectedType}
						onValueChange={(value) =>
							handleTypeChange(value as OrderType)
						}
						className="w-full"
					>
						<TabsList className="grid w-full grid-cols-3 h-11 bg-muted/50">
							{orderTypes.map((type) => (
								<TabsTrigger
									key={type}
									value={type}
									className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
								>
									{type}
									{currentStatusCounts[type] > 0 && (
										<Badge
											variant="secondary"
											className="ml-2 bg-primary/10 text-primary hover:bg-primary/20"
										>
											{currentStatusCounts[type]}
										</Badge>
									)}
								</TabsTrigger>
							))}
						</TabsList>

						{/* Order Cards */}
						<div className="mt-6 space-y-4">
							{filteredOrders.length > 0 ? (
								filteredOrders.map((order) => (
									<OrderCard key={order.id} order={order} />
								))
							) : (
								<div className="text-center py-8 text-muted-foreground">
									No {selectedType.toLowerCase()} orders found
									in {selectedStatus.toLowerCase()} status
								</div>
							)}
						</div>
					</Tabs>
				</div>
			</Tabs>
		</div>
	);
}
