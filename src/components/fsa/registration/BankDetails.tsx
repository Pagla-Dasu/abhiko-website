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
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface BankDetailsFormData {
	accountHolderName: string;
	accountNumber: string;
	confirmAccountNumber: string;
	bankName: string;
	ifscCode: string;
	branchName: string;
	passbookOrCheque: File | null;
}

interface BankDetailsProps {
	onNext: (data: BankDetailsFormData) => void;
	onBack: () => void;
	initialData?: Partial<BankDetailsFormData>;
}

export function BankDetails({ onNext, onBack, initialData }: BankDetailsProps) {
	const [formData, setFormData] = useState<BankDetailsFormData>({
		accountHolderName: "",
		accountNumber: "",
		confirmAccountNumber: "",
		bankName: "",
		ifscCode: "",
		branchName: "",
		passbookOrCheque: null,
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
			setFormData((prev) => ({
				...prev,
				passbookOrCheque: acceptedFiles[0],
			}));
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate account numbers match
		if (formData.accountNumber !== formData.confirmAccountNumber) {
			toast.error("Account Numbers Don't Match", {
				description:
					"Please make sure both account numbers are the same",
			});
			return;
		}

		// Validate all required fields
		const requiredFields = {
			accountHolderName: "Account Holder Name",
			accountNumber: "Account Number",
			bankName: "Bank Name",
			ifscCode: "IFSC Code",
			branchName: "Branch Name",
			passbookOrCheque: "Passbook/Cheque",
		};

		const missingFields = Object.entries(requiredFields)
			.filter(([key]) => !formData[key as keyof BankDetailsFormData])
			.map(([, label]) => label);

		if (missingFields.length > 0) {
			toast.error("Missing Information", {
				description: `Please fill in: ${missingFields.join(", ")}`,
			});
			return;
		}

		// Validate IFSC code format
		const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
		if (!ifscRegex.test(formData.ifscCode)) {
			toast.error("Invalid IFSC Code", {
				description: "Please enter a valid IFSC code",
			});
			return;
		}

		// Validate account number length
		if (
			formData.accountNumber.length < 9 ||
			formData.accountNumber.length > 18
		) {
			toast.error("Invalid Account Number", {
				description: "Account number should be between 9 and 18 digits",
			});
			return;
		}

		// Submit form data
		onNext({
			...formData,
			accountNumber: formData.accountNumber.trim(),
			confirmAccountNumber: formData.confirmAccountNumber.trim(),
			ifscCode: formData.ifscCode.trim(),
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="accountHolderName">
						Account Holder Name
					</Label>
					<Input
						id="accountHolderName"
						value={formData.accountHolderName}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								accountHolderName: e.target.value,
							}))
						}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="accountNumber">Account Number</Label>
					<Input
						id="accountNumber"
						value={formData.accountNumber}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								accountNumber: e.target.value.replace(
									/\D/g,
									"",
								),
							}))
						}
						maxLength={18}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="confirmAccountNumber">
						Confirm Account Number
					</Label>
					<Input
						id="confirmAccountNumber"
						value={formData.confirmAccountNumber}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								confirmAccountNumber: e.target.value.replace(
									/\D/g,
									"",
								),
							}))
						}
						maxLength={18}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="bankName">Bank Name</Label>
					<Select
						value={formData.bankName}
						onValueChange={(value) =>
							setFormData((prev) => ({
								...prev,
								bankName: value,
							}))
						}
						required
					>
						<SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
							<SelectValue placeholder="Select bank" />
						</SelectTrigger>
						<SelectContent className="bg-neutral-900 border-neutral-800">
							<SelectItem
								value="sbi"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								State Bank of India
							</SelectItem>
							<SelectItem
								value="hdfc"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								HDFC Bank
							</SelectItem>
							<SelectItem
								value="icici"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								ICICI Bank
							</SelectItem>
							<SelectItem
								value="axis"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Axis Bank
							</SelectItem>
							<SelectItem
								value="kotak"
								className="text-neutral-200 hover:bg-neutral-800"
							>
								Kotak Mahindra Bank
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

				<div className="space-y-2">
					<Label htmlFor="ifscCode">IFSC Code</Label>
					<Input
						id="ifscCode"
						value={formData.ifscCode}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								ifscCode: e.target.value.toUpperCase(),
							}))
						}
						maxLength={11}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="branchName">Branch Name</Label>
					<Input
						id="branchName"
						value={formData.branchName}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								branchName: e.target.value,
							}))
						}
						required
						className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
					/>
				</div>

				<div className="space-y-2">
					<Label>Upload Passbook / Cancelled Cheque</Label>
					<div
						{...getRootProps()}
						className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
							isDragActive ? "border-primary" : "border-gray-300"
						}`}
					>
						<input {...getInputProps()} />
						{formData.passbookOrCheque ? (
							<p className="text-sm text-gray-600">
								{formData.passbookOrCheque.name}
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
