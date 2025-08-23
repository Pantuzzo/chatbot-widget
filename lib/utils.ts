import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | false | undefined)[]) {
  return twMerge(clsx(inputs.filter(Boolean))); // Filter out falsy values
}