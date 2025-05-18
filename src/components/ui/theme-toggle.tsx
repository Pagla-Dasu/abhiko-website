"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// This useEffect runs only on the client side
	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Render a placeholder with the same dimensions during server-side rendering
	// to prevent layout shift
	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="icon"
				className="text-neutral-400 dark:text-neutral-400 z-[60] relative"
			>
				<div className="h-5 w-5" />
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="text-slate-700 dark:text-slate-200 hover:bg-slate-200/20 dark:hover:bg-neutral-800 z-[60] relative block"
				>
					{resolvedTheme === "dark" ? (
						<Moon className="h-5 w-5" />
					) : (
						<Sun className="h-5 w-5" />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="z-[70]">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
