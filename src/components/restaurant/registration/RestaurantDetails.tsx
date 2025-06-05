"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";

interface RestaurantDetailsData {
	city: string;
	ownerContactNumber: string;
	whatsappNumber: string;
	restaurantName: string;
	preferredLanguages: string[];
	otp: string;
}

interface RestaurantDetailsProps {
	onNext: (data: RestaurantDetailsData) => void;
	initialData?: Partial<RestaurantDetailsData>;
}

const languageOptions = [
	{ label: "English", value: "en" },
	{ label: "Hindi", value: "hi" },
	{ label: "Bengali", value: "bn" },
	{ label: "Marathi", value: "mr" },
	{ label: "Gujarati", value: "gu" },
	{ label: "Odia", value: "or" },
	{ label: "Tamil", value: "ta" },
	{ label: "Telugu", value: "te" },
	{ label: "Kannada", value: "kn" },
	{ label: "Malayalam", value: "ml" },
];

export function RestaurantDetails({
	onNext,
	initialData,
}: RestaurantDetailsProps) {
	const [formData, setFormData] = useState<RestaurantDetailsData>({
		city: initialData?.city || "",
		ownerContactNumber: initialData?.ownerContactNumber || "",
		whatsappNumber: initialData?.whatsappNumber || "",
		restaurantName: initialData?.restaurantName || "",
		preferredLanguages: initialData?.preferredLanguages || [],
		otp: "",
	});

	const [showOtpInput, setShowOtpInput] = useState(false);

	const handleSendOtp = async () => {
		if (
			!formData.ownerContactNumber ||
			formData.ownerContactNumber.length !== 10
		) {
			toast.error("Invalid Phone Number", {
				description: "Please enter a valid 10-digit phone number",
			});
			return;
		}
		// TODO: Implement OTP sending logic
		setShowOtpInput(true);
		toast.success("OTP Sent", {
			description: "Please check your phone for the OTP",
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!showOtpInput) {
			handleSendOtp();
			return;
		}

		if (!formData.otp || formData.otp.length !== 6) {
			toast.error("Invalid OTP", {
				description: "Please enter a valid 6-digit OTP",
			});
			return;
		}

		// Validate all fields
		if (
			!formData.city ||
			!formData.restaurantName ||
			formData.preferredLanguages.length === 0
		) {
			toast.error("Missing Information", {
				description: "Please fill in all required fields",
			});
			return;
		}

		onNext(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="restaurantName">Restaurant Name</Label>
					<Input
						id="restaurantName"
						value={formData.restaurantName}
						onChange={(e) =>
							setFormData({
								...formData,
								restaurantName: e.target.value,
							})
						}
						placeholder="Enter your restaurant name"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="city">City</Label>
					<Input
						id="city"
						value={formData.city}
						onChange={(e) =>
							setFormData({ ...formData, city: e.target.value })
						}
						placeholder="Enter your city"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="ownerContactNumber">
						Owner Contact Number
					</Label>
					<Input
						id="ownerContactNumber"
						type="tel"
						value={formData.ownerContactNumber}
						onChange={(e) =>
							setFormData({
								...formData,
								ownerContactNumber: e.target.value,
							})
						}
						placeholder="Enter owner's contact number"
						maxLength={10}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="whatsappNumber">WhatsApp Number</Label>
					<Input
						id="whatsappNumber"
						type="tel"
						value={formData.whatsappNumber}
						onChange={(e) =>
							setFormData({
								...formData,
								whatsappNumber: e.target.value,
							})
						}
						placeholder="Enter WhatsApp number"
						maxLength={10}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label>Preferred Languages</Label>
					<MultiSelect
						options={languageOptions}
						selected={formData.preferredLanguages}
						onChange={(selected: string[]) =>
							setFormData({
								...formData,
								preferredLanguages: selected,
							})
						}
						placeholder="Select preferred languages"
					/>
				</div>

				{showOtpInput && (
					<div className="space-y-2">
						<Label htmlFor="otp">Verify OTP</Label>
						<Input
							id="otp"
							type="text"
							value={formData.otp}
							onChange={(e) =>
								setFormData({
									...formData,
									otp: e.target.value,
								})
							}
							placeholder="Enter 6-digit OTP"
							maxLength={6}
							required
						/>
					</div>
				)}
			</div>

			<Button
				type="submit"
				className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
			>
				{showOtpInput ? "Verify & Continue" : "Send OTP"}
			</Button>
		</form>
	);
}
