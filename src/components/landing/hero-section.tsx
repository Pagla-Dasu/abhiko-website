"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="relative w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 py-20 px-6 text-center">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
					Experience Food, Fast — Welcome to{" "}
					<span className="text-orange-600 dark:text-orange-400">
						Abhiko
					</span>
				</h1>
				<p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
					Whether you&apos;re hungry, managing a restaurant, or
					selling on the streets — we&apos;ve built it all for you.
				</p>

				<div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
					<Link href="/login/customer">
						<Button
							size="lg"
							className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
						>
							Order Now
						</Button>
					</Link>
					<Link href="/login/restaurant">
						<Button
							variant="outline"
							size="lg"
							className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950"
						>
							Restaurant Dashboard
						</Button>
					</Link>
					<Link href="/login/fsa">
						<Button
							variant="ghost"
							size="lg"
							className="text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950"
						>
							FSA Login
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
