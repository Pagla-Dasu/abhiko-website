"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="relative w-full bg-gradient-to-br from-[#FFEDD5] to-[#FFF7ED] py-20 px-6 text-center">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
					Experience Food, Fast — Welcome to{" "}
					<span className="text-orange-600">Abhiko</span>
				</h1>
				<p className="mt-6 text-lg md:text-xl text-gray-700">
					Whether you’re hungry, managing a restaurant, or selling on
					the streets — we’ve built it all for you.
				</p>

				<div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
					<Link href="/login/customer">
						<Button size="lg">Order Now</Button>
					</Link>
					<Link href="/(restaurant)/dashboard">
						<Button variant="outline" size="lg">
							Restaurant Dashboard
						</Button>
					</Link>
					<Link href="/(fsa)/login">
						<Button variant="ghost" size="lg">
							FSA Login
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
