import type { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & {
    class: import("clsx").ClassValue;
    className?: undefined;
}) | ({
    variant?: "default" | "destructive" | null | undefined;
} & {
    class?: undefined;
    className: import("clsx").ClassValue;
}) | ({
    variant?: "default" | "destructive" | null | undefined;
} & {
    class?: undefined;
    className?: undefined;
}) | undefined) => string;
declare function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>): React.JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
export { Alert, AlertDescription, AlertTitle };
