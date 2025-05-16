"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Global Error Boundary Fallback UI
 * Handles unexpected runtime errors in Next.js App Router
 */
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to an external service if needed
		console.error("Abhiko App Error:", error);
	}, [error]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20"
			>
				<div className="flex flex-col items-center text-center">
					{/* Animated icon with glow */}
					<div className="relative mb-6">
						<motion.div
							animate={{
								scale: [1, 1.1, 1],
								rotate: [0, 5, -5, 0],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								repeatType: "reverse",
							}}
							className="text-red-500"
						>
							<AlertCircle size={64} />
						</motion.div>

						<motion.div
							className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20"
							animate={{ scale: [1, 1.2, 1] }}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						/>
					</div>

					{/* Error Title & Message */}
					<h1 className="text-3xl font-bold text-white mb-2">
						Something went wrong
					</h1>
					<p className="text-slate-300 mb-6">
						We&apos;ve encountered an unexpected error. Our team has
						been notified.
					</p>

					{/* Separator */}
					<div className="w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent my-6 opacity-30" />

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 w-full">
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							onClick={reset}
							className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg shadow-blue-600/30 transition"
						>
							<RefreshCw size={18} />
							Try again
						</motion.button>

						<motion.div
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
						>
							<Link
								href="/"
								className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg transition"
							>
								<Home size={18} />
								Go home
							</Link>
						</motion.div>
					</div>

					{/* Optional Error Digest for debugging */}
					{error.digest && (
						<p className="mt-6 text-slate-400 text-sm">
							Error ID: {error.digest}
						</p>
					)}
				</div>
			</motion.div>
		</div>
	);
}
