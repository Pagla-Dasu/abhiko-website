"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { indianStates } from "@/data/indian-states";

interface AddressLocationFormData {
	address: string;
	city: string;
	state: string;
	pincode: string;
	landmark: string;
	workZone: string;
	addressProof: File | null;
}

interface AddressLocationProps {
	onNext: (data: AddressLocationFormData) => void;
	onBack: () => void;
	initialData?: Partial<AddressLocationFormData>;
}

export function AddressLocation({
	onNext,
	onBack,
	initialData,
}: AddressLocationProps) {
	const [formData, setFormData] = useState<AddressLocationFormData>({
		address: "",
		city: "",
		state: "",
		pincode: "",
		landmark: "",
		workZone: "",
		addressProof: null,
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

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
		},
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			setFormData({ ...formData, addressProof: acceptedFiles[0] });
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="address">Full Address</Label>
					<Textarea
						id="address"
						value={formData.address}
						onChange={(e) =>
							setFormData({
								...formData,
								address: e.target.value,
							})
						}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700 min-h-[100px]"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="city">City</Label>
					<Input
						id="city"
						value={formData.city}
						onChange={(e) =>
							setFormData({
								...formData,
								city: e.target.value,
							})
						}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="state">State</Label>
					<Select
						value={formData.state}
						onValueChange={(value) =>
							setFormData({ ...formData, state: value })
						}
						required
					>
						<SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
							<SelectValue placeholder="Select state" />
						</SelectTrigger>
						<SelectContent className="bg-neutral-900 border-neutral-800">
							{indianStates.map((state) => (
								<SelectItem
									key={state}
									value={state}
									className="text-neutral-200 hover:bg-neutral-800"
								>
									{state}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="pincode">Pincode</Label>
					<Input
						id="pincode"
						value={formData.pincode}
						onChange={(e) =>
							setFormData({
								...formData,
								pincode: e.target.value,
							})
						}
						maxLength={6}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="landmark">Landmark (Optional)</Label>
					<Input
						id="landmark"
						value={formData.landmark}
						onChange={(e) =>
							setFormData({
								...formData,
								landmark: e.target.value,
							})
						}
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label>Upload Current Address Proof</Label>
					<div
						{...getRootProps()}
						className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
							isDragActive ? "border-primary" : "border-gray-300"
						}`}
					>
						<input {...getInputProps()} />
						{formData.addressProof ? (
							<p className="text-sm text-gray-600">
								{formData.addressProof.name}
							</p>
						) : (
							<p className="text-sm text-gray-600">
								{isDragActive
									? "Drop the file here"
									: "Drag and drop a PDF or image file here, or click to select"}
							</p>
						)}
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
