import type { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
} & {
    class: import("clsx").ClassValue;
    className?: undefined;
}) | ({
    variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
} & {
    class?: undefined;
    className: import("clsx").ClassValue;
}) | ({
    variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
} & {
    class?: undefined;
    className?: undefined;
}) | undefined) => string;
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): React.JSX.Element;
export { Badge, badgeVariants };
