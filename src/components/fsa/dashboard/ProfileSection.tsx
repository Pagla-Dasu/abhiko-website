"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

// Mock data - replace with actual data from your API
const mockProfileData = {
	name: "John Doe",
	phone: "+91 9876543210",
	email: "john.doe@example.com",
	city: "Mumbai",
	zone: "South Mumbai",
	aadhar: "1234-5678-9012",
	bankAccount: "HDFC Bank - XXXX1234",
	joinedOn: "2024-01-01",
};

export function ProfileSection() {
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Personal Details</CardTitle>
						<Button variant="outline" size="sm">
							<Pencil className="mr-2 h-4 w-4" />
							Edit Profile
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-4 pb-6">
						<Avatar className="h-20 w-20">
							<AvatarImage
								src="/placeholder-avatar.jpg"
								alt={mockProfileData.name}
							/>
							<AvatarFallback>
								{mockProfileData.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-2xl font-bold">
								{mockProfileData.name}
							</h3>
							<p className="text-sm text-muted-foreground">
								Joined on {mockProfileData.joinedOn}
							</p>
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<Label>Phone Number</Label>
							<Input value={mockProfileData.phone} readOnly />
						</div>
						<div className="space-y-2">
							<Label>Email</Label>
							<Input value={mockProfileData.email} readOnly />
						</div>
						<div className="space-y-2">
							<Label>City / Zone</Label>
							<Input
								value={`${mockProfileData.city} - ${mockProfileData.zone}`}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label>Aadhar Number</Label>
							<Input value={mockProfileData.aadhar} readOnly />
						</div>
						<div className="space-y-2">
							<Label>Bank Account</Label>
							<Input
								value={mockProfileData.bankAccount}
								readOnly
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
