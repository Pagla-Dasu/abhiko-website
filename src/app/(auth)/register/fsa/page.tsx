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
import { PersonalDetails } from "@/components/fsa/registration/PersonalDetails";
import { AddressLocation } from "@/components/fsa/registration/AddressLocation";
import { WorkPreference } from "@/components/fsa/registration/WorkPreference";
import { DocumentUpload } from "@/components/fsa/registration/DocumentUpload";
import { Referral } from "@/components/fsa/registration/Referral";
import { BankDetails } from "@/components/fsa/registration/BankDetails";
import { Declaration } from "@/components/fsa/registration/Declaration";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface RegistrationData {
	personalDetails?: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		dateOfBirth: string;
		gender: string;
	};
	addressLocation?: {
		address: string;
		city: string;
		state: string;
		pincode: string;
		landmark: string;
	};
	workPreference?: {
		workType: string;
		experience: string;
		availability: string;
		preferredLocations: string[];
	};
	documents?: {
		aadharNumber: string;
		panNumber: string;
		education: string;
		experience: string;
	};
	referral?: {
		hasReferral: boolean;
		referralCode: string;
		referralName: string;
		referralPhone: string;
	};
	bankDetails?: {
		accountHolderName: string;
		accountNumber: string;
		ifscCode: string;
		bankName: string;
		branchName: string;
	};
	declaration?: {
		termsAccepted: boolean;
		privacyAccepted: boolean;
		declarationAccepted: boolean;
		additionalNotes: string;
	};
}

export default function FSARegistrationPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [registrationData, setRegistrationData] = useState<RegistrationData>(
		{},
	);

	useEffect(() => {
		// Load saved data from localStorage if available
		const savedData = localStorage.getItem("fsaRegistrationData");
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
			"personalDetails",
			"addressLocation",
			"workPreference",
			"documents",
			"referral",
			"bankDetails",
			"declaration",
		];
		return steps[currentStep];
	};

	const handleNext = (data: RegistrationData[keyof RegistrationData]) => {
		console.log("Current step:", currentStep);
		console.log("Step key:", getCurrentStepKey());
		console.log("Received data:", data);

		// Update registration data
		setRegistrationData((prev) => {
			const newData = {
				...prev,
				[getCurrentStepKey()]: data,
			};
			console.log("Updated registration data:", newData);
			return newData;
		});

		// Move to next step
		setCurrentStep((prev) => {
			const nextStep = prev + 1;
			console.log("Moving to step:", nextStep);
			return nextStep;
		});
	};

	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const handleSubmit = async (data: RegistrationData["declaration"]) => {
		try {
			console.log("Submitting final registration data");
			const finalData = {
				...registrationData,
				declaration: data,
			};

			// Validate that all required data is present
			const requiredFields = [
				"personalDetails",
				"addressLocation",
				"workPreference",
				"documents",
				"referral",
				"bankDetails",
				"declaration",
			];

			const missingFields = requiredFields.filter(
				(field) => !finalData[field as keyof RegistrationData],
			);

			if (missingFields.length > 0) {
				toast.error("Incomplete Registration", {
					description: `Please complete all steps: ${missingFields.join(", ")}`,
				});
				return;
			}

			// TODO: Implement API call to submit registration data
			console.log("Final registration data:", finalData);

			// Store the data in localStorage for future use
			localStorage.setItem(
				"fsaRegistrationData",
				JSON.stringify(finalData),
			);

			toast.success("Registration Successful", {
				description:
					"Your FSA registration has been submitted successfully",
			});

			// Redirect to login page after successful registration
			window.location.href = "/login/fsa";
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
					<PersonalDetails
						onNext={handleNext}
						initialData={registrationData.personalDetails}
					/>
				);
			case 1:
				return (
					<AddressLocation
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.addressLocation}
					/>
				);
			case 2:
				return (
					<WorkPreference
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.workPreference}
					/>
				);
			case 3:
				return (
					<DocumentUpload
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.documents}
					/>
				);
			case 4:
				return (
					<Referral
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.referral}
					/>
				);
			case 5:
				return (
					<BankDetails
						onNext={handleNext}
						onBack={handleBack}
						initialData={registrationData.bankDetails}
					/>
				);
			case 6:
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
				return "Personal Details";
			case 1:
				return "Address and Location";
			case 2:
				return "Work Preference";
			case 3:
				return "Document Upload";
			case 4:
				return "Referral";
			case 5:
				return "Bank Account Details";
			case 6:
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
							FSA Registration
						</CardTitle>
						<CardDescription className="text-center text-neutral-400">
							Step {currentStep + 1} of 7: {getStepTitle()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="mb-8">
							<div className="flex items-center justify-between">
								{Array.from({ length: 7 }, (_, i) => i + 1).map(
									(step) => (
										<div
											key={step}
											className={`h-2 w-full rounded-full transition-all duration-300 ${
												step <= currentStep
													? "bg-gradient-to-r from-orange-600 to-orange-500"
													: "bg-neutral-800"
											} ${step < 7 ? "mr-2" : ""}`}
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
