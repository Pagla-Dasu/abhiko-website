"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface DocumentUploadProps {
	onNext: (data: any) => void;
	onBack: () => void;
	initialData?: any;
}

export function DocumentUpload({
	onNext,
	onBack,
	initialData,
}: DocumentUploadProps) {
	const [formData, setFormData] = useState({
		aadhaarCard: null as File | null,
		panCard: null as File | null,
		addressProof: null as File | null,
		profilePhoto: null as File | null,
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

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			"image/*": [".jpeg", ".jpg", ".png"],
			"application/pdf": [".pdf"],
		},
		maxSize: 5242880, // 5MB
		onDrop: (acceptedFiles) => {
			if (acceptedFiles.length > 0) {
				setFormData((prev) => ({
					...prev,
					[getCurrentDocumentType()]: acceptedFiles[0],
				}));
			}
		},
	});

	const getCurrentDocumentType = () => {
		if (!formData.aadhaarCard) return "aadhaarCard";
		if (!formData.panCard) return "panCard";
		if (!formData.addressProof) return "addressProof";
		if (!formData.profilePhoto) return "profilePhoto";
		return "";
	};

	const removeDocument = (type: keyof typeof formData) => {
		setFormData((prev) => ({
			...prev,
			[type]: null,
		}));
	};

	const renderDocumentUpload = (
		type: keyof typeof formData,
		label: string,
	) => {
		const file = formData[type];
		return (
			<div className="space-y-2">
				<Label>{label}</Label>
				{file ? (
					<div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
						<span className="text-sm text-neutral-200 truncate">
							{file.name}
						</span>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => removeDocument(type)}
							className="h-8 w-8 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				) : (
					<div
						{...getRootProps()}
						className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
							isDragActive
								? "border-orange-500 bg-orange-500/10"
								: "border-neutral-700 hover:border-neutral-600"
						}`}
					>
						<input {...getInputProps()} />
						<Upload className="h-8 w-8 mx-auto mb-2 text-neutral-400" />
						<p className="text-sm text-neutral-400">
							Drag & drop or click to upload
						</p>
						<p className="text-xs text-neutral-500 mt-1">
							Max file size: 5MB
						</p>
					</div>
				)}
			</div>
		);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				{renderDocumentUpload("aadhaarCard", "Aadhaar Card")}
				{renderDocumentUpload("panCard", "PAN Card")}
				{renderDocumentUpload("addressProof", "Address Proof")}
				{renderDocumentUpload("profilePhoto", "Profile Photo")}
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
