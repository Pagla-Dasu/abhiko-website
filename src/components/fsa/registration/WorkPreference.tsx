"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface WorkPreferenceFormData {
	workType: string;
	experience: string;
	availability: string;
	preferredLocations: string[];
}

interface WorkPreferenceProps {
	onNext: (data: WorkPreferenceFormData) => void;
	onBack: () => void;
	initialData?: Partial<WorkPreferenceFormData>;
}

export function WorkPreference({
	onNext,
	onBack,
	initialData,
}: WorkPreferenceProps) {
	const [formData, setFormData] = useState<WorkPreferenceFormData>({
		workType: "",
		experience: "",
		availability: "",
		preferredLocations: [],
	});

	// Initialize form with initialData if available
	useEffect(() => {
		if (initialData) {
			setFormData((prev) => ({
				...prev,
				...initialData,
			}));
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate required fields
		const requiredFields = {
			workType: "Work Type",
			experience: "Experience",
			availability: "Availability",
			preferredLocations: "Preferred Locations",
		};

		const missingFields = Object.entries(requiredFields)
			.filter(([key]) => {
				const value = formData[key as keyof WorkPreferenceFormData];
				return !value || (Array.isArray(value) && value.length === 0);
			})
			.map(([, label]) => label);

		if (missingFields.length > 0) {
			toast.error("Missing Information", {
				description: `Please fill in: ${missingFields.join(", ")}`,
			});
			return;
		}

		onNext(formData);
	};

	const locations = [
		"Bangalore",
		"Mumbai",
		"Delhi",
		"Chennai",
		"Hyderabad",
		"Kolkata",
		"Pune",
		"Ahmedabad",
	];

	const handleLocationChange = (location: string) => {
		setFormData((prev) => {
			const locations = prev.preferredLocations;
			if (locations.includes(location)) {
				return {
					...prev,
					preferredLocations: locations.filter((l) => l !== location),
				};
			} else {
				return {
					...prev,
					preferredLocations: [...locations, location],
				};
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="workType">Work Type</Label>
					<Select
						value={formData.workType}
						onValueChange={(value) =>
							setFormData((prev) => ({
								...prev,
								workType: value,
							}))
						}
						required
					>
						<SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
							<SelectValue placeholder="Select work type" />
						</SelectTrigger>
						<SelectContent className="bg-neutral-900 border-neutral-800">
							<SelectItem
								value="full-time"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Full Time
							</SelectItem>
							<SelectItem
								value="part-time"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Part Time
							</SelectItem>
							<SelectItem
								value="flexible"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Flexible Hours
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="experience">Experience</Label>
					<Select
						value={formData.experience}
						onValueChange={(value) =>
							setFormData((prev) => ({
								...prev,
								experience: value,
							}))
						}
						required
					>
						<SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
							<SelectValue placeholder="Select experience" />
						</SelectTrigger>
						<SelectContent className="bg-neutral-900 border-neutral-800">
							<SelectItem
								value="0-1"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								0-1 years
							</SelectItem>
							<SelectItem
								value="1-3"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								1-3 years
							</SelectItem>
							<SelectItem
								value="3-5"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								3-5 years
							</SelectItem>
							<SelectItem
								value="5+"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								5+ years
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="availability">Availability</Label>
					<Select
						value={formData.availability}
						onValueChange={(value) =>
							setFormData((prev) => ({
								...prev,
								availability: value,
							}))
						}
						required
					>
						<SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
							<SelectValue placeholder="Select availability" />
						</SelectTrigger>
						<SelectContent className="bg-neutral-900 border-neutral-800">
							<SelectItem
								value="immediate"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Immediate
							</SelectItem>
							<SelectItem
								value="1-week"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Within 1 week
							</SelectItem>
							<SelectItem
								value="2-weeks"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Within 2 weeks
							</SelectItem>
							<SelectItem
								value="1-month"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Within 1 month
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label>Preferred Locations</Label>
					<div className="grid grid-cols-2 gap-2">
						{locations.map((location) => (
							<div
								key={location}
								className="flex items-center space-x-2"
							>
								<Checkbox
									id={location}
									checked={formData.preferredLocations.includes(
										location,
									)}
									onCheckedChange={() =>
										handleLocationChange(location)
									}
									className="border-neutral-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
								/>
								<Label
									htmlFor={location}
									className="text-sm font-normal text-neutral-200"
								>
									{location}
								</Label>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex gap-4">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					className="flex-1 bg-neutral-900/50 border-neutral-800 text-neutral-200 hover:bg-neutral-800/50"
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
