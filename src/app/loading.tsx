"use client";

import { motion } from "framer-motion";

/**
 * Global Loading Component
 * Shown while Next.js is loading server components
 */
export default function Loading() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
			{/* Glowing pulse effect behind spinner */}
			<motion.div
				className="absolute w-28 h-28 bg-blue-400 rounded-full blur-3xl opacity-30"
				animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Spinner + Text */}
			<div className="relative flex flex-col items-center z-10">
				{/* Spinner */}
				<motion.div
					className="w-24 h-24 rounded-full border-4 border-blue-200 border-t-blue-500 border-l-blue-500"
					animate={{ rotate: 360 }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "linear",
					}}
				/>

				{/* Dots animation */}
				<div className="flex space-x-3 mt-8">
					{[0, 1, 2].map((dot) => (
						<motion.div
							key={dot}
							className="w-3 h-3 bg-blue-300 rounded-full"
							animate={{
								scale: [1, 1.3, 1],
								opacity: [0.6, 1, 0.6],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: dot * 0.3,
								ease: "easeInOut",
							}}
						/>
					))}
				</div>

				{/* Heading */}
				<motion.h2
					className="mt-6 text-xl font-medium text-white"
					animate={{ opacity: [0.7, 1, 0.7] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					Loading Abhiko...
				</motion.h2>

				{/* Subtext */}
				<motion.p
					className="mt-4 text-blue-200 text-center max-w-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2 }}
				>
					Preparing your delicious experience
				</motion.p>
			</div>

			{/* Horizontal shimmer line */}
			<motion.div
				className="absolute bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
				animate={{ x: ["-100%", "100%"] }}
				transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
			/>
		</div>
	);
}
