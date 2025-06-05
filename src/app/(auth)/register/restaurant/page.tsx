"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { RestaurantDetails } from "@/components/restaurant/registration/RestaurantDetails";
import { FSSAIDetails } from "@/components/restaurant/registration/FSSAIDetails";
import { GSTPANDetails } from "@/components/restaurant/registration/GSTPANDetails";
import { Declaration } from "@/components/restaurant/registration/Declaration";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface RegistrationData {
	restaurantDetails?: {
		city: string;
		ownerContactNumber: string;
		whatsappNumber: string;
		restaurantName: string;
		preferredLanguages: string[];
		otp: string;
	};
	fssaiDetails?: {
		fssaiExpirationDate: Date;
		fssaiRegistrationNumber: string;
		licenceType: string;
		fssaiFirmName: string;
		address: string;
	};
	gstPanDetails?: {
		gstCategory: string;
		panNumber: string;
		panDocument: File | null;
	};
	declaration?: {
		termsAccepted: boolean;
	};
}

export default function RestaurantRegistrationPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [registrationData, setRegistrationData] = useState<RegistrationData>(
		{},
	);

	useEffect(() => {
		// Load saved data from localStorage if available
		const savedData = localStorage.getItem("restaurantRegistrationData");
		if (savedData) {
			try {
				setRegistrationData(JSON.parse(savedData));
			} catch (error) {
				console.error("Error loading saved registration data:", error);
			}
		}
	}, []);

	const getCurrentStepKey = () => {
		const steps = [
			"restaurantDetails",
			"fssaiDetails",
			"gstPanDetails",
			"declaration",
		];
		return steps[currentStep];
	};

	const handleNext = (data: RegistrationData[keyof RegistrationData]) => {
		// Update registration data
		setRegistrationData((prev) => {
			const newData = {
				...prev,
				[getCurrentStepKey()]: data,
			};
			// Save to localStorage
			localStorage.setItem(
				"restaurantRegistrationData",
				JSON.stringify(newData),
			);
			return newData;
		});

		// Move to next step
		setCurrentStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const handleSubmit = async (data: RegistrationData["declaration"]) => {
		try {
			const finalData = {
				...registrationData,
				declaration: data,
			};

			// Validate that all required data is present
			const requiredFields = [
				"restaurantDetails",
				"fssaiDetails",
				"gstPanDetails",
				"declaration",
			];

			const missingFields = requiredFields.filter(
				(field) => !finalData[field as keyof RegistrationData],
			);

			if (missingFields.length > 0) {
				toast.error("Incomplete Registration", {
					description: `Please complete all steps: ${missingFields.join(
						", ",
					)}`,
				});
				return;
			}

			// TODO: Implement API call to submit registration data
			console.log("Final registration data:", finalData);

			// Clear localStorage after successful submission
			localStorage.removeItem("restaurantRegistrationData");

			toast.success("Registration Successful", {
				description:
					"Your restaurant registration has been submitted successfully",
			});

			// Redirect to login page after successful registration
			window.location.href = "/login/restaurant";
		} catch (error) {
			console.error("Registration error:", error);
			toast.error("Registration Failed", {
				description:
					"There was an error submitting your registration. Please try again.",
			});
		}
	};

	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<RestaurantDetails
						onNext={handleNext}
						initialData={registrationData.restaurantDetails}
					/>
				);
			case 1:
				return (
					<FSSAIDetails
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.fssaiDetails}
					/>
				);
			case 2:
				return (
					<GSTPANDetails
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.gstPanDetails}
					/>
				);
			case 3:
				return (
					<Declaration
						onSubmit={handleSubmit}
						onBack={handleBack}
						initialData={registrationData.declaration}
					/>
				);
			default:
				return null;
		}
	};

	const getStepTitle = () => {
		switch (currentStep) {
			case 0:
				return "Restaurant Details";
			case 1:
				return "FSSAI Details";
			case 2:
				return "GST & PAN Details";
			case 3:
				return "Declaration";
			default:
				return "";
		}
	};

	return (
		<div className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center px-4 py-24">
			{/* Animated Background */}
			<BackgroundBeams />

			{/* Content Wrapper */}
			<div className="relative z-10 w-full max-w-2xl">
				<Card className="w-full backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
							Restaurant Registration
						</CardTitle>
						<CardDescription className="text-center text-neutral-400">
							Step {currentStep + 1} of 4: {getStepTitle()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="mb-8">
							<div className="flex items-center justify-between">
								{Array.from({ length: 4 }, (_, i) => i + 1).map(
									(step) => (
										<div
											key={step}
											className={`h-2 w-full rounded-full transition-all duration-300 ${
												step <= currentStep
													? "bg-gradient-to-r from-orange-600 to-orange-500"
													: "bg-neutral-800"
											} ${step < 4 ? "mr-2" : ""}`}
										/>
									),
								)}
							</div>
						</div>
						{renderStep()}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
