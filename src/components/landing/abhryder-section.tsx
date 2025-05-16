"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AbhryderSection() {
	return (
		<section className="bg-gray-50 py-16 px-6 text-center">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">
				Become an Abhryder
			</h2>
			<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
				Our delivery partners use a powerful app to deliver faster and
				earn more. Get started today and become part of the Abhiko
				ecosystem.
			</p>
			<Link href="/abhryder">
				<Button>Explore Abhryder</Button>
			</Link>
		</section>
	);
}
