import type { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const alertVariants: (props?: {
    variant?: "default" | "destructive";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>): import("react/jsx-runtime").JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Alert, AlertDescription, AlertTitle };
