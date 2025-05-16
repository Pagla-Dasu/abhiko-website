"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";

/**
 * Global 404 Not Found Page
 * Rendered when route does not match any available page
 */
export default function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-2xl text-center space-y-8"
			>
				{/* Icon with glow */}
				<div className="relative flex justify-center">
					<motion.div
						className="text-white"
						animate={{
							scale: [1, 1.1, 1],
							rotate: [0, 10, -10, 0],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					>
						<Search className="h-20 w-20 text-white" />
					</motion.div>

					<motion.div
						className="absolute inset-0 bg-purple-400 rounded-full blur-3xl opacity-20"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					/>
				</div>

				{/* Message Card */}
				<div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
					<h1 className="text-4xl font-bold text-white mb-4">
						Page not found
					</h1>

					<p className="text-xl text-indigo-100 mb-6 max-w-lg mx-auto">
						We&apos;ve searched high and low, but couldn&apos;t find
						the page you&apos;re looking for.
					</p>

					{/* Decorative Separator */}
					<div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent my-8 opacity-20" />

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href="/"
								className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 px-8 rounded-xl font-medium shadow-lg shadow-purple-600/30 transition-all"
							>
								<Home size={18} />
								Go to Homepage
							</Link>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<button
								onClick={() => window.history.back()}
								className="flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-6 rounded-xl font-medium shadow-lg transition-all"
							>
								<ArrowLeft size={18} />
								Go Back
							</button>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
