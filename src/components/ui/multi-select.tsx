"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

interface Option {
	label: string;
	value: string;
}

interface MultiSelectProps {
	options: Option[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	className?: string;
}

export function MultiSelect({
	options,
	selected,
	onChange,
	placeholder = "Select options",
	className,
}: MultiSelectProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState("");

	const handleUnselect = (option: string) => {
		onChange(selected.filter((s) => s !== option));
	};

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "" && selected.length > 0) {
						onChange(selected.slice(0, -1));
					}
				}
				if (e.key === "Escape") {
					input.blur();
				}
			}
		},
		[selected, onChange],
	);

	const selectables = options.filter(
		(option) => !selected.includes(option.value),
	);

	return (
		<Command
			onKeyDown={handleKeyDown}
			className={`overflow-visible bg-transparent ${className}`}
		>
			<div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
				<div className="flex flex-wrap gap-1">
					{selected.map((selectedValue) => {
						const option = options.find(
							(opt) => opt.value === selectedValue,
						);
						return (
							<Badge
								key={selectedValue}
								variant="secondary"
								className="hover:bg-secondary/80"
							>
								{option?.label}
								<button
									className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUnselect(selectedValue);
										}
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={() =>
										handleUnselect(selectedValue)
									}
								>
									<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
								</button>
							</Badge>
						);
					})}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder={
							selected.length === 0 ? placeholder : undefined
						}
						className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
					/>
				</div>
			</div>
			<div className="relative mt-2">
				{open && selectables.length > 0 ? (
					<div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
						<CommandGroup className="h-full overflow-auto">
							{selectables.map((option) => {
								return (
									<CommandItem
										key={option.value}
										onMouseDown={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onSelect={() => {
											setInputValue("");
											onChange([
												...selected,
												option.value,
											]);
										}}
										className={"cursor-pointer"}
									>
										{option.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</div>
				) : null}
			</div>
		</Command>
	);
}
