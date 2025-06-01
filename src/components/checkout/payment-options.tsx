import { CreditCard, Wallet, Banknote } from "lucide-react";

export function PaymentOptions() {
	return (
		<div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 space-y-6">
			<h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
				Payment Options
			</h2>

			<div className="space-y-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">
						Select Payment Method
					</label>
					<div className="space-y-3">
						<label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
							<input
								type="radio"
								name="payment"
								className="text-blue-600"
							/>
							<CreditCard className="h-5 w-5" />
							<span>Credit/Debit Card</span>
						</label>

						<label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
							<input
								type="radio"
								name="payment"
								className="text-blue-600"
							/>
							<Wallet className="h-5 w-5" />
							<span>UPI</span>
						</label>

						<label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
							<input
								type="radio"
								name="payment"
								className="text-blue-600"
							/>
							<Banknote className="h-5 w-5" />
							<span>Cash on Delivery</span>
						</label>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">
						Apply Promo Code
					</label>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Enter promo code"
							className="flex-1 p-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent"
						/>
						<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
