import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeliveryDetails() {
	return (
		<div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
					Delivery Details
				</h2>
				<Button variant="outline" size="sm">
					<Plus className="h-4 w-4 mr-2" />
					Add New Address
				</Button>
			</div>

			<div className="space-y-4">
				{/* This would be a list of saved addresses in a real app */}
				<div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 space-y-2">
					<div className="flex items-start gap-3">
						<MapPin className="h-5 w-5 text-blue-600 mt-1" />
						<div>
							<h3 className="font-medium">Home</h3>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								123 Main Street, Apartment 4B, City, State -
								123456
							</p>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">
						Delivery Instructions
					</label>
					<textarea
						className="w-full p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent"
						rows={3}
						placeholder="Add delivery instructions (optional)"
					/>
				</div>

				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						id="contactless"
						className="rounded"
					/>
					<label htmlFor="contactless" className="text-sm">
						Contactless Delivery
					</label>
				</div>
			</div>
		</div>
	);
}
