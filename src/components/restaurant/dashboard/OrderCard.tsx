"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Order, CancellationReason } from "@/types/restaurant-dashboard";
import Image from "next/image";

interface OrderCardProps {
	order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
	const handleAcceptOrder = (orderId: string) => {
		// TODO: Implement accept order logic
		console.log("Accept order:", orderId);
	};

	const handleRejectOrder = (orderId: string, reason: CancellationReason) => {
		// TODO: Implement reject order logic
		console.log("Reject order:", orderId, reason);
	};

	const handleMarkAsDelivered = (orderId: string) => {
		// TODO: Implement mark as delivered logic
		console.log("Mark as delivered:", orderId);
	};

	const renderOrderActions = (order: Order) => {
		switch (order.status) {
			case "New":
				return (
					<div className="flex space-x-2">
						<Button
							onClick={() => handleAcceptOrder(order.id)}
							className="bg-green-600 hover:bg-green-700"
						>
							Accept Order
						</Button>
						<Select
							onValueChange={(value: CancellationReason) =>
								handleRejectOrder(order.id, value)
							}
						>
							<SelectTrigger className="w-[180px] border-red-200 text-red-600 hover:text-red-700 hover:border-red-300">
								<SelectValue placeholder="Reject Order" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Out of stock">
									Out of stock
								</SelectItem>
								<SelectItem value="Kitchen closed">
									Kitchen closed
								</SelectItem>
								<SelectItem value="Technical issues">
									Technical issues
								</SelectItem>
								<SelectItem value="Other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
				);
			case "Preparing":
				return (
					<Button
						onClick={() => handleMarkAsDelivered(order.id)}
						className="bg-blue-600 hover:bg-blue-700"
					>
						Mark as Delivered
					</Button>
				);
			default:
				return null;
		}
	};

	return (
		<Card className="overflow-hidden">
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold text-lg">
								Order #{order.id}
							</h3>
							<p className="text-sm text-muted-foreground">
								{new Date(
									order.timeOrdered,
								).toLocaleTimeString()}
							</p>
						</div>

						<div className="flex items-center space-x-4">
							<Image
								src={order.customer.avatar}
								alt={order.customer.name}
								width={40}
								height={40}
								className="rounded-full"
							/>
							<div>
								<p className="font-medium">
									{order.customer.name}
								</p>
								<p className="text-sm text-muted-foreground">
									{order.customer.phone}
								</p>
							</div>
						</div>

						{order.type === "Dine-in" && (
							<p className="text-sm">
								<span className="font-medium">
									Table Number:
								</span>{" "}
								{order.tableNumber}
							</p>
						)}

						{order.type === "Delivery" && (
							<p className="text-sm">
								<span className="font-medium">
									Delivery Address:
								</span>{" "}
								{order.deliveryAddress}
							</p>
						)}

						<div className="space-y-2">
							<p className="font-medium">Items:</p>
							{order.items.map((item) => (
								<div
									key={item.id}
									className="flex justify-between text-sm"
								>
									<span>
										{item.quantity}x {item.name}
									</span>
									<span>₹{item.price * item.quantity}</span>
								</div>
							))}
							<div className="border-t pt-2">
								<div className="flex justify-between font-medium">
									<span>Total</span>
									<span>₹{order.totalAmount}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-end space-y-4">
						{renderOrderActions(order)}
						{order.status === "Cancelled" && (
							<p className="text-sm text-red-500">
								Cancelled by: {order.cancelledBy}
								{order.cancellationReason &&
									` - ${order.cancellationReason}`}
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
