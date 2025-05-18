"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface AnimatedFloatingModalProps {
	open: boolean;
	message: string;
	onClose: () => void;
}

/**
 * An animated floating modal for showing brief messages
 * (like login errors, confirmations, etc).
 */
export const AnimatedFloatingModal: React.FC<AnimatedFloatingModalProps> = ({
	open,
	message,
	onClose,
}) => {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 30 }}
					transition={{ duration: 0.4 }}
					className="fixed bottom-6 right-6 z-[100] max-w-xs w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-lg px-4 py-3 flex items-start gap-3"
				>
					<div className="flex-1 text-sm text-neutral-800 dark:text-white">
						{message}
					</div>
					<button
						onClick={onClose}
						className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition"
					>
						<X className="h-4 w-4" />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
