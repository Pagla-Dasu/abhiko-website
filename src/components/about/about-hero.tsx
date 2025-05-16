"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ChevronDown } from "lucide-react";

export default function AboutHero() {
	const heroRef = useRef<HTMLElement | null>(null);
	const [showScrollDown, setShowScrollDown] = useState(true);

	// Scroll observer to show/hide indicator
	useEffect(() => {
		if (!heroRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setShowScrollDown(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.6,
			},
		);

		observer.observe(heroRef.current);

		return () => {
			if (heroRef.current) observer.unobserve(heroRef.current);
		};
	}, []);

	// Handle scroll to next section
	const handleScrollClick = () => {
		const nextSection = document.getElementById("about-mission");
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<AuroraBackground>
				<section
					ref={heroRef}
					className="w-full relative py-24 px-6 z-10 text-center min-h-screen flex flex-col items-center justify-center"
				>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7 }}
						className="text-4xl md:text-6xl font-extrabold text-black"
					>
						About Abhiko
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.7 }}
						className="mt-6 text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto"
					>
						Revolutionizing Food Delivery & In-House Dining
						Experience
					</motion.p>
				</section>
			</AuroraBackground>

			{/* Scroll down animation fixed at bottom of screen */}
			<AnimatePresence>
				{showScrollDown && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
						className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
						onClick={handleScrollClick}
					>
						<motion.div
							animate={{ y: [0, 12, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="flex flex-col items-center text-slate-500"
						>
							<ChevronDown className="w-6 h-6 animate-pulse" />
							<span className="text-xs mt-1">Scroll down</span>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
