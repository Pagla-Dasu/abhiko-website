"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Menu, User, Store, History, Wallet } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationsPanel } from "@/components/fsa/dashboard/NotificationsPanel";
import { logoutRestaurant } from "@/lib/restaurant/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RestaurantNavbarProps {
	restaurantId: string;
	onProfileClick?: () => void;
}

export function RestaurantNavbar({
	restaurantId,
	onProfileClick,
}: RestaurantNavbarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [unreadCount, setUnreadCount] = useState(2); // Initial unread count
	const router = useRouter();

	const handleLogout = async () => {
		console.log("Logout clicked");
		try {
			await logoutRestaurant();
			localStorage.removeItem("restaurant_jwt");
			toast.success("Logged out successfully");
			router.push("/login/restaurant");
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			toast.error("Logout failed", { description: message });
		}
	};

	return (
		<>
			{/* Top Bar */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden hover:bg-muted/50"
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
						>
							<Menu className="h-5 w-5" />
						</Button>
						<h1 className="text-2xl font-bold tracking-tight">
							Restaurant Dashboard
						</h1>
					</div>
					<div className="flex items-center gap-2 md:gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="relative hover:bg-muted/50"
								>
									<Bell className="h-5 w-5" />
									{unreadCount > 0 && (
										<span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium">
											{unreadCount}
										</span>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-[350px] p-0"
							>
								<NotificationsPanel
									onUnreadCountChange={setUnreadCount}
								/>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="hover:bg-muted/50"
								>
									<Avatar className="h-8 w-8 border-2 border-muted">
										<AvatarImage
											src="/placeholder-avatar.jpg"
											alt="User"
										/>
										<AvatarFallback className="bg-primary/10 text-primary">
											RS
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem
									onClick={onProfileClick}
									className="cursor-pointer"
								>
									<User className="mr-2 h-4 w-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={handleLogout}
									className="cursor-pointer text-red-500 focus:text-red-500"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			{/* Mobile Navigation */}
			<Card
				className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} shadow-sm max-w-2xl mx-auto mt-2`}
			>
				<ScrollArea className="h-[calc(100vh-8rem)]">
					<nav className="p-4 space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start h-10"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<Store className="mr-2 h-4 w-4" />
							Overview
						</Button>
						<Button
							variant="ghost"
							className="w-full justify-start h-10"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<History className="mr-2 h-4 w-4" />
							Orders
						</Button>
						<Button
							variant="ghost"
							className="w-full justify-start h-10"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<Wallet className="mr-2 h-4 w-4" />
							Earnings
						</Button>
						<Button
							variant="ghost"
							className="w-full justify-start h-10"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<User className="mr-2 h-4 w-4" />
							Profile
						</Button>
					</nav>
				</ScrollArea>
			</Card>
		</>
	);
}
