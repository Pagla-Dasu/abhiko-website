"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DeclarationData } from "@/types/restaurant";

interface DeclarationProps {
	onSubmit: (data: DeclarationData) => void;
	onBack: () => void;
	initialData?: Partial<DeclarationData>;
}

export function Declaration({
	onSubmit,
	onBack,
	initialData,
}: DeclarationProps) {
	const [formData, setFormData] = useState<DeclarationData>({
		termsAccepted: initialData?.termsAccepted || false,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.termsAccepted) {
			return;
		}

		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-start space-x-2">
						<Checkbox
							id="terms"
							checked={formData.termsAccepted}
							onCheckedChange={(checked) =>
								setFormData({
									...formData,
									termsAccepted: checked as boolean,
								})
							}
						/>
						<div className="grid gap-1.5 leading-none">
							<Label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Terms and Conditions
							</Label>
							<p className="text-sm text-muted-foreground">
								I declare that all the information provided
								above is true and correct to the best of my
								knowledge. I understand that any false or
								misleading information may result in the
								rejection of my application or termination of my
								account.
							</p>
						</div>
					</div>
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
					Submit
				</Button>
			</div>
		</form>
	);
}
