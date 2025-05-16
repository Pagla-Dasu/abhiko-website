"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function AbhryderPage() {
	return (
		<main className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black min-h-screen text-white">
			{/* ✅ ContainerScroll animation replaces parallax here */}
			<div className="flex flex-col overflow-hidden pt-20">
				<ContainerScroll
					titleComponent={
						<>
							<h1 className="text-4xl font-semibold text-white dark:text-white">
								Deliver. Earn. <br />
								<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-orange-500">
									Become an Abhryder
								</span>
							</h1>
						</>
					}
				>
					<Image
						src="/assets/images/bike-parallax.png"
						alt="Abhryder Hero"
						height={720}
						width={1400}
						className="mx-auto rounded-2xl object-cover h-full object-left-top"
						draggable={false}
					/>
				</ContainerScroll>
			</div>

			{/* Static CTA & Info Section */}
			<div className="relative z-20 px-6 pt-16 pb-32 max-w-4xl mx-auto text-center">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="mt-6 text-xl text-slate-300"
				>
					Deliver faster, earn more, and take control of your time
					with the Abhryder app.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					<Link
						href="https://play.google.com/store/apps/details?id=com.abhryder"
						target="_blank"
						className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 transition px-6 py-3 rounded-xl text-white font-semibold text-lg shadow-lg"
					>
						<Download className="w-5 h-5" />
						Get it on Play Store
					</Link>

					<Link
						href="https://apps.apple.com"
						target="_blank"
						className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-xl text-white font-semibold text-lg border border-white/20 shadow-lg"
					>
						<Smartphone className="w-5 h-5" />
						Download on App Store
					</Link>
				</motion.div>
			</div>

			{/* Feature Highlights */}
			<section className="bg-black py-20 px-6 relative z-10">
				<div className="max-w-5xl mx-auto text-center space-y-12">
					<h2 className="text-3xl font-bold text-white">
						Everything You Need — At Your Fingertips
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
						{[
							"Accept or reject orders in real-time.",
							"View daily and weekly earnings.",
							"Navigate easily using in-app Google Maps.",
							"Toggle availability whenever you want.",
							"Track COD and online payments securely.",
							"Contact customers with masked calls.",
						].map((text, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="bg-white/5 border border-white/10 p-6 rounded-xl text-slate-200 shadow hover:shadow-lg"
							>
								{text}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Footer CTA */}
			<footer className="bg-gradient-to-r from-orange-500 to-yellow-400 py-8 px-6 text-center text-black font-semibold text-lg">
				Ready to ride? Download the Abhryder app and start delivering
				today.
			</footer>
		</main>
	);
}
