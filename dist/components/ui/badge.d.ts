import type { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const badgeVariants: (props?: {
    variant?: "default" | "destructive" | "outline" | "secondary";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
