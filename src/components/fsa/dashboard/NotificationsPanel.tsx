"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - replace with actual data from your API
const mockNotifications = [
	{
		id: 1,
		type: "admin",
		title: "New Incentive Program",
		message: "Earn 20% extra on premium plan signups this month!",
		date: "2024-03-15",
		read: false,
	},
	{
		id: 2,
		type: "system",
		title: "Payout Scheduled",
		message: "Next payout is scheduled for 7th June",
		date: "2024-03-14",
		read: true,
	},
	{
		id: 3,
		type: "admin",
		title: "QR Code Shortage",
		message: "Limited QR codes available. Order soon!",
		date: "2024-03-13",
		read: false,
	},
	// Add more notifications as needed
];

interface NotificationsPanelProps {
	onUnreadCountChange?: (count: number) => void;
}

export function NotificationsPanel({
	onUnreadCountChange,
}: NotificationsPanelProps) {
	const [notifications, setNotifications] = useState(mockNotifications);

	const unreadCount = notifications.filter((n) => !n.read).length;

	useEffect(() => {
		onUnreadCountChange?.(unreadCount);
	}, [unreadCount, onUnreadCountChange]);

	const markAsRead = (id: number) => {
		setNotifications((prev) =>
			prev.map((notification) =>
				notification.id === id
					? { ...notification, read: true }
					: notification,
			),
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notification) => ({ ...notification, read: true })),
		);
	};

	return (
		<div className="w-full max-w-[350px]">
			<div className="p-4 border-b">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Notifications</h3>
					<div className="flex items-center gap-2">
						{unreadCount > 0 && (
							<>
								<Badge variant="secondary">
									{unreadCount} new
								</Badge>
								<Button
									variant="ghost"
									size="sm"
									className="h-7 px-2 text-xs"
									onClick={markAllAsRead}
								>
									Mark all as read
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
			<ScrollArea className="h-[400px]">
				<div className="p-4 space-y-4">
					{notifications.map((notification) => (
						<div
							key={notification.id}
							className={`group relative rounded-lg border p-4 transition-colors ${
								!notification.read
									? "bg-muted/50 hover:bg-muted/70"
									: "hover:bg-muted/30"
							}`}
						>
							<div className="flex items-start gap-3">
								<div className="mt-1">
									{notification.type === "admin" ? (
										<Info className="h-4 w-4 text-blue-500" />
									) : (
										<AlertCircle className="h-4 w-4 text-yellow-500" />
									)}
								</div>
								<div className="space-y-1 flex-1">
									<div className="flex items-center justify-between">
										<p className="font-medium">
											{notification.title}
										</p>
										<span className="text-xs text-muted-foreground">
											{notification.date}
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{notification.message}
									</p>
								</div>
							</div>
							{!notification.read && (
								<Button
									variant="ghost"
									size="sm"
									className="absolute right-2 top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
									onClick={() => markAsRead(notification.id)}
								>
									<Check className="h-4 w-4" />
								</Button>
							)}
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
