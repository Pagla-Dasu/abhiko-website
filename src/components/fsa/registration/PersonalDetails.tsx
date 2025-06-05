"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PersonalDetailsFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	gender: string;
}

interface PersonalDetailsProps {
	onNext: (data: PersonalDetailsFormData) => void;
	initialData?: Partial<PersonalDetailsFormData>;
}

export function PersonalDetails({ onNext, initialData }: PersonalDetailsProps) {
	const [formData, setFormData] = useState<PersonalDetailsFormData>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		dateOfBirth: "",
		gender: "",
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

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error("Invalid Email", {
				description: "Please enter a valid email address",
			});
			return;
		}

		// Validate phone number
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(formData.phone)) {
			toast.error("Invalid Phone Number", {
				description: "Please enter a valid 10-digit phone number",
			});
			return;
		}

		// Validate required fields
		const requiredFields = {
			firstName: "First Name",
			lastName: "Last Name",
			email: "Email",
			phone: "Phone Number",
			dateOfBirth: "Date of Birth",
			gender: "Gender",
		};

		const missingFields = Object.entries(requiredFields)
			.filter(([key]) => !formData[key as keyof PersonalDetailsFormData])
			.map(([, label]) => label);

		if (missingFields.length > 0) {
			toast.error("Missing Information", {
				description: `Please fill in: ${missingFields.join(", ")}`,
			});
			return;
		}

		onNext(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							value={formData.firstName}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									firstName: e.target.value,
								}))
							}
							required
							className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							value={formData.lastName}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									lastName: e.target.value,
								}))
							}
							required
							className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">Email Address</Label>
					<Input
						id="email"
						type="email"
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone">Phone Number</Label>
					<Input
						id="phone"
						type="tel"
						value={formData.phone}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								phone: e.target.value.replace(/\D/g, ""),
							}))
						}
						maxLength={10}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label>Date of Birth</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full justify-start text-left font-normal bg-neutral-900/50 border-neutral-800 text-neutral-200 hover:bg-neutral-800/50",
									!formData.dateOfBirth && "text-neutral-500",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{formData.dateOfBirth
									? format(
											new Date(formData.dateOfBirth),
											"PPP",
										)
									: "Pick a date"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-800">
							<Calendar
								mode="single"
								selected={
									formData.dateOfBirth
										? new Date(formData.dateOfBirth)
										: undefined
								}
								onSelect={(date) =>
									setFormData((prev) => ({
										...prev,
										dateOfBirth: date
											? date.toISOString()
											: "",
									}))
								}
								disabled={(date) =>
									date > new Date() ||
									date < new Date("1900-01-01")
								}
								initialFocus
								className="bg-neutral-900 text-neutral-200"
							/>
						</PopoverContent>
					</Popover>
				</div>

				<div className="space-y-2">
					<Label htmlFor="gender">Gender</Label>
					<Select
						value={formData.gender}
						onValueChange={(value) =>
							setFormData((prev) => ({
								...prev,
								gender: value,
							}))
						}
						required
					>
						<SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
							<SelectValue placeholder="Select gender" />
						</SelectTrigger>
						<SelectContent className="bg-neutral-900 border-neutral-800">
							<SelectItem
								value="male"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Male
							</SelectItem>
							<SelectItem
								value="female"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Female
							</SelectItem>
							<SelectItem
								value="other"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Other
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Button
				type="submit"
				className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
			>
				Next
			</Button>
		</form>
	);
}
