"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function RestaurantLoginPage() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");
	const [showOtpInput, setShowOtpInput] = useState(false);

	const handleSendOtp = async () => {
		if (!phoneNumber || phoneNumber.length !== 10) {
			toast.error("Invalid Phone Number", {
				description: "Please enter a valid 10-digit phone number",
			});
			return;
		}
		// TODO: Implement OTP sending logic
		setShowOtpInput(true);
		toast.success("OTP Sent", {
			description: "Please check your phone for the OTP",
		});
	};

	const handleVerifyOtp = async () => {
		if (!otp || otp.length !== 6) {
			toast.error("Invalid OTP", {
				description: "Please enter a valid 6-digit OTP",
			});
			return;
		}
		// TODO: Implement OTP verification logic
		toast.success("Login Successful", {
			description: "Welcome back!",
		});
	};

	return (
		<div className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center px-4 py-24">
			{/* Animated Background */}
			<BackgroundBeams />

			{/* Content Wrapper */}
			<div className="relative z-10 w-full max-w-md">
				<Card className="w-full backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
							Restaurant Login
						</CardTitle>
						<CardDescription className="text-center text-neutral-400">
							Login to your restaurant account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="login" className="w-full">
							<TabsList className="grid w-full grid-cols-2 bg-neutral-900/50">
								<TabsTrigger
									value="login"
									className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
								>
									Login
								</TabsTrigger>
								<TabsTrigger
									value="register"
									className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
								>
									Register
								</TabsTrigger>
							</TabsList>
							<TabsContent value="login">
								<div className="space-y-4 pt-4">
									<div className="space-y-2">
										<Label
											htmlFor="phone"
											className="text-neutral-200"
										>
											Phone Number
										</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="Enter your phone number"
											value={phoneNumber}
											onChange={(e) =>
												setPhoneNumber(e.target.value)
											}
											maxLength={10}
											className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
										/>
									</div>
									{showOtpInput && (
										<div className="space-y-2">
											<Label
												htmlFor="otp"
												className="text-neutral-200"
											>
												OTP
											</Label>
											<Input
												id="otp"
												type="text"
												placeholder="Enter OTP"
												value={otp}
												onChange={(e) =>
													setOtp(e.target.value)
												}
												maxLength={6}
												className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
											/>
										</div>
									)}
									<Button
										className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
										onClick={
											showOtpInput
												? handleVerifyOtp
												: handleSendOtp
										}
									>
										{showOtpInput
											? "Verify OTP"
											: "Send OTP"}
									</Button>
								</div>
							</TabsContent>
							<TabsContent value="register">
								<div className="text-center py-4">
									<p className="text-sm text-neutral-400 mb-6">
										Please complete the registration process
										to list your restaurant
									</p>
									<Button
										className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
										onClick={() =>
											(window.location.href =
												"/register/restaurant")
										}
									>
										Start Registration
									</Button>
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
