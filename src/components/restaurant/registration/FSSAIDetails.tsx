"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FSSAIDetailsData } from "@/types/restaurant";

interface FSSAIDetailsProps {
	onNext: (data: FSSAIDetailsData) => void;
	onBack: () => void;
	initialData?: Partial<FSSAIDetailsData>;
}

export function FSSAIDetails({
	onNext,
	onBack,
	initialData,
}: FSSAIDetailsProps) {
	const [formData, setFormData] = useState<FSSAIDetailsData>({
		fssaiExpirationDate: initialData?.fssaiExpirationDate || new Date(),
		fssaiRegistrationNumber: initialData?.fssaiRegistrationNumber || "",
		licenceType: initialData?.licenceType || "",
		fssaiFirmName: initialData?.fssaiFirmName || "",
		address: initialData?.address || "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		if (
			!formData.fssaiExpirationDate ||
			!formData.fssaiRegistrationNumber ||
			!formData.licenceType ||
			!formData.fssaiFirmName ||
			!formData.address
		) {
			return;
		}

		onNext(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="fssaiRegistrationNumber">
						FSSAI Registration Number
					</Label>
					<Input
						id="fssaiRegistrationNumber"
						value={formData.fssaiRegistrationNumber}
						onChange={(e) =>
							setFormData({
								...formData,
								fssaiRegistrationNumber: e.target.value,
							})
						}
						placeholder="Enter FSSAI registration number"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="licenceType">Licence Type</Label>
					<Input
						id="licenceType"
						value={formData.licenceType}
						onChange={(e) =>
							setFormData({
								...formData,
								licenceType: e.target.value,
							})
						}
						placeholder="Enter licence type"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="fssaiFirmName">FSSAI Firm Name</Label>
					<Input
						id="fssaiFirmName"
						value={formData.fssaiFirmName}
						onChange={(e) =>
							setFormData({
								...formData,
								fssaiFirmName: e.target.value,
							})
						}
						placeholder="Enter FSSAI firm name"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="address">Address</Label>
					<Textarea
						id="address"
						value={formData.address}
						onChange={(e) =>
							setFormData({
								...formData,
								address: e.target.value,
							})
						}
						placeholder="Enter complete address"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label>FSSAI Expiration Date</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full justify-start text-left font-normal",
									!formData.fssaiExpirationDate &&
										"text-muted-foreground",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{formData.fssaiExpirationDate ? (
									format(formData.fssaiExpirationDate, "PPP")
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={formData.fssaiExpirationDate}
								onSelect={(date) =>
									setFormData({
										...formData,
										fssaiExpirationDate: date || new Date(),
									})
								}
								disabled={
									(date) => date < new Date() // Disable past dates
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			<div className="flex gap-4">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					className="flex-1"
				>
					Back
				</Button>
				<Button
					type="submit"
					className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
				>
					Next
				</Button>
			</div>
		</form>
	);
}
