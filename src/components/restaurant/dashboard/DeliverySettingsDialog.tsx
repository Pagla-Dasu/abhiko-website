"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface DeliverySettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	maxDistance: number;
	onMaxDistanceChange: (value: number) => void;
}

export function DeliverySettingsDialog({
	open,
	onOpenChange,
	maxDistance,
	onMaxDistanceChange,
}: DeliverySettingsDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delivery Settings</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 py-4">
					<div className="space-y-2">
						<Label>Maximum Delivery Distance (km)</Label>
						<div className="flex items-center space-x-4">
							<Slider
								value={[maxDistance]}
								onValueChange={(value) =>
									onMaxDistanceChange(value[0])
								}
								max={50}
								step={1}
								className="flex-1"
							/>
							<span className="w-12 text-right">
								{maxDistance} km
							</span>
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
