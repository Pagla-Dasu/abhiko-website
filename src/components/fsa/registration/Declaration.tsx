"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface DeclarationFormData {
	termsAccepted: boolean;
	privacyAccepted: boolean;
	declarationAccepted: boolean;
	additionalNotes: string;
}

interface DeclarationProps {
	onSubmit: (data: DeclarationFormData) => void;
	onBack: () => void;
	initialData?: Partial<DeclarationFormData>;
}

export function Declaration({
	onSubmit,
	onBack,
	initialData,
}: DeclarationProps) {
	const [formData, setFormData] = useState<DeclarationFormData>({
		termsAccepted: false,
		privacyAccepted: false,
		declarationAccepted: false,
		additionalNotes: "",
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

		// Validate all checkboxes are checked
		if (
			!formData.termsAccepted ||
			!formData.privacyAccepted ||
			!formData.declarationAccepted
		) {
			toast.error("Please Accept All Terms", {
				description:
					"You must accept all terms and conditions to proceed",
			});
			return;
		}

		try {
			// Submit form data
			onSubmit({
				...formData,
				additionalNotes: formData.additionalNotes.trim(),
			});
		} catch (error) {
			console.error("Error submitting declaration:", error);
			toast.error("Error", {
				description:
					"There was an error submitting your declaration. Please try again.",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-4">
					<div className="flex items-start space-x-2">
						<Checkbox
							id="termsAccepted"
							checked={formData.termsAccepted}
							onCheckedChange={(checked) =>
								setFormData((prev) => ({
									...prev,
									termsAccepted: checked as boolean,
								}))
							}
							className="mt-1 border-neutral-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
						/>
						<Label
							htmlFor="termsAccepted"
							className="text-sm font-normal text-neutral-200"
						>
							I accept the Terms and Conditions of Abhiko. I
							understand that my registration is subject to
							verification and approval by Abhiko.
						</Label>
					</div>

					<div className="flex items-start space-x-2">
						<Checkbox
							id="privacyAccepted"
							checked={formData.privacyAccepted}
							onCheckedChange={(checked) =>
								setFormData((prev) => ({
									...prev,
									privacyAccepted: checked as boolean,
								}))
							}
							className="mt-1 border-neutral-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
						/>
						<Label
							htmlFor="privacyAccepted"
							className="text-sm font-normal text-neutral-200"
						>
							I accept the Privacy Policy and consent to the
							processing of my personal data for the purposes of
							registration and verification.
						</Label>
					</div>

					<div className="flex items-start space-x-2">
						<Checkbox
							id="declarationAccepted"
							checked={formData.declarationAccepted}
							onCheckedChange={(checked) =>
								setFormData((prev) => ({
									...prev,
									declarationAccepted: checked as boolean,
								}))
							}
							className="mt-1 border-neutral-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
						/>
						<Label
							htmlFor="declarationAccepted"
							className="text-sm font-normal text-neutral-200"
						>
							I declare that all the information provided by me is
							true and accurate to the best of my knowledge. I
							understand that any false or misleading information
							may result in the rejection of my application or
							termination of my association with Abhiko.
						</Label>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="additionalNotes">
						Additional Notes (Optional)
					</Label>
					<Textarea
						id="additionalNotes"
						value={formData.additionalNotes}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								additionalNotes: e.target.value,
							}))
						}
						placeholder="Any additional information you would like to share..."
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700 min-h-[100px]"
					/>
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
					disabled={
						!formData.termsAccepted ||
						!formData.privacyAccepted ||
						!formData.declarationAccepted
					}
					className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Submit Registration
				</Button>
			</div>
		</form>
	);
}
