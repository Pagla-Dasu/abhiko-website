"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMission() {
	return (
		<section
			id="about-mission"
			className="relative w-full py-24 bg-black overflow-hidden"
		>
			{/* Background Glow */}
			<div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-orange-500/30 rounded-full blur-[160px] z-0" />

			<div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
				{/* Text */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.2 },
						},
					}}
					className="space-y-6"
				>
					<motion.h2
						variants={{
							hidden: { y: 40, opacity: 0 },
							visible: { y: 0, opacity: 1 },
						}}
						className="text-4xl font-bold text-white"
					>
						Our Mission
					</motion.h2>

					<motion.p
						variants={{
							hidden: { y: 40, opacity: 0 },
							visible: { y: 0, opacity: 1 },
						}}
						className="text-lg text-slate-300 leading-relaxed"
					>
						Abhiko is transforming how restaurants serve customers.
						Our zero-commission model and digital ordering platform
						help both dine-in and delivery experiences thrive.
					</motion.p>

					<motion.p
						variants={{
							hidden: { y: 40, opacity: 0 },
							visible: { y: 0, opacity: 1 },
						}}
						className="text-lg text-slate-300 leading-relaxed"
					>
						From QR-based menus to delivery integration, Abhiko
						empowers restaurant partners with seamless tech.
					</motion.p>
				</motion.div>

				{/* Logo or Visual */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
					className="flex justify-center"
				>
					<motion.div
						whileHover={{ scale: 1.05, rotate: 6 }}
						transition={{ duration: 0.3 }}
						className="relative w-64 h-64 md:w-80 md:h-80 bg-white/5 rounded-full border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
					>
						<Image
							src="/logo.png"
							alt="Abhiko Logo"
							fill
							className="object-contain p-8"
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
