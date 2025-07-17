"use client";

import { useState, useRef, useEffect } from "react";
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
import {
	loginRestaurant,
	verifyRestaurantLoginOtp,
} from "@/lib/restaurant/api";
import { useRouter } from "next/navigation";

export default function RestaurantLoginPage() {
	const [step, setStep] = useState<"phone" | "otp">("phone");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");
	const [session, setSession] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const otpInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (step === "otp" && otpInputRef.current) {
			otpInputRef.current.focus();
		}
	}, [step]);

	return (
		<div className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center px-4 py-24">
			<BackgroundBeams />
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
									{step === "phone" && (
										<>
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
														setPhoneNumber(
															e.target.value
																.replace(
																	/[^0-9]/g,
																	"",
																)
																.slice(0, 10),
														)
													}
													maxLength={10}
													className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
													disabled={loading}
												/>
											</div>
											<Button
												className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
												onClick={async () => {
													setLoading(true);
													try {
														const res =
															await loginRestaurant(
																phoneNumber,
															);
														if (res.session) {
															setSession(
																res.session,
															);
															setStep("otp");
															toast.success(
																"OTP Sent",
																{
																	description:
																		"Please check your phone for the OTP",
																},
															);
														} else {
															toast.error(
																"No session returned",
															);
														}
													} catch (err: unknown) {
														const message =
															err instanceof Error
																? err.message
																: String(err);
														toast.error(
															"Failed to send OTP",
															{
																description:
																	message ||
																	"An error occurred. Please try again.",
															},
														);
													} finally {
														setLoading(false);
													}
												}}
												disabled={
													loading ||
													phoneNumber.length !== 10
												}
											>
												{loading
													? "Sending..."
													: "Send OTP"}
											</Button>
										</>
									)}
									{step === "otp" && (
										<>
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
														setOtp(
															e.target.value
																.replace(
																	/[^0-9]/g,
																	"",
																)
																.slice(0, 6),
														)
													}
													maxLength={6}
													className="bg-neutral-900/50 border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
													ref={otpInputRef}
													disabled={loading}
												/>
											</div>
											<div className="flex gap-2">
												<Button
													className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25"
													onClick={async () => {
														setLoading(true);
														try {
															const res =
																await verifyRestaurantLoginOtp(
																	phoneNumber,
																	otp,
																	session,
																);
															if (res.token) {
																localStorage.setItem(
																	"restaurant_jwt",
																	res.token,
																);
																toast.success(
																	"Login Successful",
																	{
																		description:
																			"Welcome back! Redirecting...",
																	},
																);
																router.push(
																	"/restaurant/dashboard",
																);
															} else {
																toast.error(
																	"No token returned",
																);
															}
														} catch (err: unknown) {
															const message =
																err instanceof
																Error
																	? err.message
																	: String(
																			err,
																		);
															toast.error(
																"Failed to verify OTP",
																{
																	description:
																		message ||
																		"An error occurred. Please try again.",
																},
															);
														} finally {
															setLoading(false);
														}
													}}
													disabled={
														loading ||
														otp.length !== 6
													}
												>
													{loading
														? "Verifying..."
														: "Submit OTP"}
												</Button>
												<Button
													variant="outline"
													onClick={() => {
														setStep("phone");
														setOtp("");
														setSession("");
													}}
													disabled={loading}
												>
													Back
												</Button>
											</div>
										</>
									)}
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
