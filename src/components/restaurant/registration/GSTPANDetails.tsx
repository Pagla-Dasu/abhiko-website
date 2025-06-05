"use client";

import { useState } from "react";
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
import { GSTPANDetailsData } from "@/types/restaurant";

interface GSTPANDetailsProps {
	onNext: (data: GSTPANDetailsData) => void;
	onBack: () => void;
	initialData?: Partial<GSTPANDetailsData>;
}

export function GSTPANDetails({
	onNext,
	onBack,
	initialData,
}: GSTPANDetailsProps) {
	const [formData, setFormData] = useState<GSTPANDetailsData>({
		gstCategory: initialData?.gstCategory || "",
		panNumber: initialData?.panNumber || "",
		panDocument: initialData?.panDocument || null,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		if (
			!formData.gstCategory ||
			!formData.panNumber ||
			!formData.panDocument
		) {
			return;
		}

		onNext(formData);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData({ ...formData, panDocument: file });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="gstCategory">GST Category</Label>
					<Select
						value={formData.gstCategory}
						onValueChange={(value) =>
							setFormData({ ...formData, gstCategory: value })
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select GST category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="registered">
								Registered
							</SelectItem>
							<SelectItem value="unregistered">
								Unregistered
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="panNumber">PAN Number</Label>
					<Input
						id="panNumber"
						value={formData.panNumber}
						onChange={(e) =>
							setFormData({
								...formData,
								panNumber: e.target.value,
							})
						}
						placeholder="Enter PAN number"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="panDocument">PAN Document</Label>
					<Input
						id="panDocument"
						type="file"
						accept=".pdf,.jpg,.jpeg,.png"
						onChange={handleFileChange}
						required
					/>
					{formData.panDocument && (
						<p className="text-sm text-muted-foreground">
							Selected file: {formData.panDocument.name}
						</p>
					)}
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
