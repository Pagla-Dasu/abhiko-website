"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WobbleCard } from "@/components/ui/wobble-card"; // Aceternity hover effect
import { BackgroundBeams } from "@/components/ui/background-beams"; // ✅ Your visual background
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ------------------------------
// Types for login cards
// ------------------------------
interface LoginCardProps {
	title: string;
	description: string;
	href: string;
	icon?: ReactNode;
}

// ------------------------------
// Available login roles
// ------------------------------
const loginOptions: LoginCardProps[] = [
	{
		title: "Customer Login",
		description: "Order food, track your cart, and view orders easily.",
		href: "/login/customer",
	},
	{
		title: "Restaurant Login",
		description: "Manage your menu, track orders, and view insights.",
		href: "/login/restaurant",
	},
	{
		title: "FSA Login",
		description: "Track your commission, onboard restaurants and perform.",
		href: "/login/fsa",
	},
];

// ------------------------------
// Main Login Page
// ------------------------------
export default function LoginPage() {
	return (
		<div className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center px-4 py-24">
			{/* Animated Background */}
			<BackgroundBeams />

			{/* Content Wrapper */}
			<div className="relative z-10 max-w-6xl w-full text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-12"
				>
					<h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
						Choose Your Role
					</h1>
					<p className="mt-4 text-lg text-neutral-400">
						Continue as a customer, restaurant, or field agent.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{loginOptions.map((card, index) => (
						<RoleLoginCard key={index} {...card} />
					))}
				</div>
			</div>
		</div>
	);
}

// ------------------------------
// Login Role Card Component
// ------------------------------
const RoleLoginCard = ({ title, description, href }: LoginCardProps) => {
	return (
		<Link href={href} passHref>
			<WobbleCard className="group h-full w-full cursor-pointer">
				<div
					className={cn(
						"flex flex-col justify-between items-start h-full p-6 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-md",
						"text-left transition-all duration-300 group-hover:shadow-xl",
					)}
				>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-2xl font-semibold text-black dark:text-white"
					>
						{title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="text-sm text-gray-700 dark:text-slate-300 mt-2"
					>
						{description}
					</motion.p>
					<motion.span
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mt-4 inline-block text-sm font-medium text-orange-500 group-hover:underline"
					>
						Continue →
					</motion.span>
				</div>
			</WobbleCard>
		</Link>
	);
};
