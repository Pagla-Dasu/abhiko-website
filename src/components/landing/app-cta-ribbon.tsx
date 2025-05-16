"use client";

import { Button } from "@/components/ui/button";

export default function AppCtaRibbon() {
	return (
		<footer className="sticky bottom-0 z-50 w-full bg-orange-600 py-3 px-4 flex flex-col sm:flex-row justify-between items-center text-white text-sm md:text-base">
			<span className="mb-2 sm:mb-0 text-center sm:text-left">
				Get the best experience on the Abhiko App
			</span>
			<div className="flex gap-2">
				<Button className="bg-white text-orange-600 hover:bg-gray-100 text-sm">
					Download App
				</Button>
			</div>
		</footer>
	);
}
