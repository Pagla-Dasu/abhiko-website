"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export interface NotificationsData {
	newOrders: boolean;
	orderUpdates: boolean;
	deliveryUpdates: boolean;
	promotions: boolean;
}

interface NotificationsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	notifications: NotificationsData;
	onNotificationChange: (
		key: keyof NotificationsData,
		value: boolean,
	) => void;
}

export function NotificationsDialog({
	open,
	onOpenChange,
	notifications,
	onNotificationChange,
}: NotificationsDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Notification Settings</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 py-4">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="new-orders">New Orders</Label>
							<Switch
								id="new-orders"
								checked={notifications.newOrders}
								onCheckedChange={(checked) =>
									onNotificationChange("newOrders", checked)
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label htmlFor="order-updates">Order Updates</Label>
							<Switch
								id="order-updates"
								checked={notifications.orderUpdates}
								onCheckedChange={(checked) =>
									onNotificationChange(
										"orderUpdates",
										checked,
									)
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label htmlFor="delivery-updates">
								Delivery Updates
							</Label>
							<Switch
								id="delivery-updates"
								checked={notifications.deliveryUpdates}
								onCheckedChange={(checked) =>
									onNotificationChange(
										"deliveryUpdates",
										checked,
									)
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label htmlFor="promotions">Promotions</Label>
							<Switch
								id="promotions"
								checked={notifications.promotions}
								onCheckedChange={(checked) =>
									onNotificationChange("promotions", checked)
								}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={() => onOpenChange(false)}>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
