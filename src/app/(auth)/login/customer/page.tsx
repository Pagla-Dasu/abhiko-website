"use client";

import React, { useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Enter a valid email"),
	phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

const otpSchema = z.object({
	otp: z.string().length(6, "OTP must be 6 digits"),
});

const loginSchema = z.object({
	phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

type RegisterFormData = z.infer<typeof registerSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export default function CustomerAuthPage() {
	const [isLogin, setIsLogin] = useState(false);
	const [showOtp, setShowOtp] = useState(false);

	const transition = {
		type: "spring",
		stiffness: 300,
		damping: 30,
	};

	// Register form
	const {
		register: registerRegister,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerErrors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	// OTP form
	const {
		register: registerOtp,
		handleSubmit: handleOtpSubmit,
		formState: { errors: otpErrors },
	} = useForm<OtpFormData>({
		resolver: zodResolver(otpSchema),
	});

	// Login form
	const {
		register: registerLogin,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginErrors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const handleRegister = (data: RegisterFormData) => {
		console.log("Registering user:", data);
		// Here you'd send OTP via backend
		setShowOtp(true);
	};

	const handleOtpVerify = (data: OtpFormData) => {
		console.log("Verifying OTP:", data);
		// Complete registration
		setIsLogin(true);
		setShowOtp(false);
	};

	const handleLogin = (data: LoginFormData) => {
		console.log("Logging in:", data);
	};

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 flex items-center justify-center px-4">
			<Boxes />
			<div className="relative z-10 w-full max-w-md">
				<div className="shadow-input rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black backdrop-blur-lg border border-white/10 relative overflow-hidden">
					<AnimatePresence mode="wait" initial={false}>
						{!isLogin ? (
							showOtp ? (
								<motion.div
									key="otp"
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -50 }}
									transition={transition}
								>
									<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
										Enter OTP
									</h2>
									<p className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
										We’ve sent a 6-digit OTP to your phone
									</p>
									<form
										className="my-8 space-y-6"
										onSubmit={handleOtpSubmit(
											handleOtpVerify,
										)}
									>
										<LabelInputContainer>
											<Label htmlFor="otp">
												6-digit OTP
											</Label>
											<Input
												id="otp"
												placeholder="123456"
												{...registerOtp("otp")}
											/>
											{otpErrors.otp && (
												<p className="text-red-500 text-sm">
													{otpErrors.otp.message}
												</p>
											)}
										</LabelInputContainer>
										<SubmitButton>Register</SubmitButton>
									</form>
									<p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
										Entered wrong number?{" "}
										<button
											onClick={() => setShowOtp(false)}
											className="text-cyan-500 hover:underline font-medium cursor-pointer"
										>
											Go back
										</button>
									</p>
								</motion.div>
							) : (
								<motion.div
									key="register"
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -50 }}
									transition={transition}
								>
									<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
										Create your account
									</h2>
									<p className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
										Register to access your dashboard
									</p>
									<form
										className="my-8 space-y-6"
										onSubmit={handleRegisterSubmit(
											handleRegister,
										)}
									>
										<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
											<LabelInputContainer>
												<Label htmlFor="firstname">
													First Name
												</Label>
												<Input
													id="firstname"
													placeholder="John"
													type="text"
													{...registerRegister(
														"firstName",
													)}
												/>
												{registerErrors.firstName && (
													<p className="text-red-500 text-sm">
														{
															registerErrors
																.firstName
																.message
														}
													</p>
												)}
											</LabelInputContainer>
											<LabelInputContainer>
												<Label htmlFor="lastname">
													Last Name
												</Label>
												<Input
													id="lastname"
													placeholder="Doe"
													type="text"
													{...registerRegister(
														"lastName",
													)}
												/>
												{registerErrors.lastName && (
													<p className="text-red-500 text-sm">
														{
															registerErrors
																.lastName
																.message
														}
													</p>
												)}
											</LabelInputContainer>
										</div>
										<LabelInputContainer>
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												placeholder="you@example.com"
												type="email"
												{...registerRegister("email")}
											/>
											{registerErrors.email && (
												<p className="text-red-500 text-sm">
													{
														registerErrors.email
															.message
													}
												</p>
											)}
										</LabelInputContainer>
										<LabelInputContainer>
											<Label htmlFor="phone">
												Phone Number
											</Label>
											<Input
												id="phone"
												placeholder="9876543210"
												type="tel"
												{...registerRegister("phone")}
											/>
											{registerErrors.phone && (
												<p className="text-red-500 text-sm">
													{
														registerErrors.phone
															.message
													}
												</p>
											)}
										</LabelInputContainer>
										<SubmitButton>Send OTP</SubmitButton>
									</form>
									<p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
										Already have an account?{" "}
										<button
											className="text-cyan-500 hover:underline font-medium"
											onClick={() => setIsLogin(true)}
										>
											Log In
										</button>
									</p>
								</motion.div>
							)
						) : (
							<motion.div
								key="login"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={transition}
							>
								<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
									Welcome Back
								</h2>
								<p className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
									Log in using your registered phone number
								</p>
								<form
									className="my-8 space-y-6"
									onSubmit={handleLoginSubmit(handleLogin)}
								>
									<LabelInputContainer>
										<Label htmlFor="loginPhone">
											Phone Number
										</Label>
										<Input
											id="loginPhone"
											placeholder="9876543210"
											type="tel"
											{...registerLogin("phone")}
										/>
										{loginErrors.phone && (
											<p className="text-red-500 text-sm">
												{loginErrors.phone.message}
											</p>
										)}
									</LabelInputContainer>
									<SubmitButton>Send OTP</SubmitButton>
								</form>
								<p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
									New here?{" "}
									<button
										className="text-cyan-500 hover:underline font-medium"
										onClick={() => {
											setIsLogin(false);
											setShowOtp(false);
										}}
									>
										Register
									</button>
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

// 💫 Shared UI
const SubmitButton = ({ children }: { children: React.ReactNode }) => (
	<button
		type="submit"
		className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-cyan-500 to-indigo-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.98]"
	>
		{children}
		<BottomGradient />
	</button>
);

const BottomGradient = () => (
	<>
		<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
		<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
	</>
);

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={cn("flex w-full flex-col space-y-2", className)}>
		{children}
	</div>
);
