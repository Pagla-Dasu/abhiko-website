"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ReferralFormData {
	hasReferral: boolean;
	referralCode: string;
	referralName: string;
	referralPhone: string;
}

interface ReferralProps {
	onNext: (data: ReferralFormData) => void;
	onBack: () => void;
	initialData?: ReferralFormData;
}

export function Referral({ onNext, onBack, initialData }: ReferralProps) {
	const [formData, setFormData] = useState<ReferralFormData>({
		hasReferral: false,
		referralCode: "",
		referralName: "",
		referralPhone: "",
	});

	// Initialize form with initialData if available
	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="flex items-center space-x-2">
					<Checkbox
						id="hasReferral"
						checked={formData.hasReferral}
						onCheckedChange={(checked) =>
							setFormData({
								...formData,
								hasReferral: checked as boolean,
							})
						}
						className="border-neutral-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
					/>
					<Label
						htmlFor="hasReferral"
						className="text-sm font-normal text-neutral-200"
					>
						I have a referral code
					</Label>
				</div>

				{formData.hasReferral && (
					<>
						<div className="space-y-2">
							<Label htmlFor="referralCode">Referral Code</Label>
							<Input
								id="referralCode"
								value={formData.referralCode}
								onChange={(e) =>
									setFormData({
										...formData,
										referralCode: e.target.value,
									})
								}
								required
								className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="referralName">
								Referrer&apos;s Name
							</Label>
							<Input
								id="referralName"
								value={formData.referralName}
								onChange={(e) =>
									setFormData({
										...formData,
										referralName: e.target.value,
									})
								}
								required
								className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="referralPhone">
								Referrer&apos;s Phone Number
							</Label>
							<Input
								id="referralPhone"
								type="tel"
								value={formData.referralPhone}
								onChange={(e) =>
									setFormData({
										...formData,
										referralPhone: e.target.value,
									})
								}
								maxLength={10}
								required
								className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
							/>
						</div>
					</>
				)}
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
