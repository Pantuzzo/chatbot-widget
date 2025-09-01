import type { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const ToastProvider: React.FC<any>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<Omit<any, "ref">, "ref"> & React.RefAttributes<unknown>>;
declare const Toast: React.ForwardRefExoticComponent<Omit<Omit<any, "ref"> & VariantProps<(props?: {
    variant?: "default" | "destructive";
} & import("class-variance-authority/dist/types").ClassProp) => string>, "ref"> & React.RefAttributes<unknown>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<Omit<any, "ref">, "ref"> & React.RefAttributes<unknown>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<Omit<any, "ref">, "ref"> & React.RefAttributes<unknown>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<Omit<any, "ref">, "ref"> & React.RefAttributes<unknown>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<Omit<any, "ref">, "ref"> & React.RefAttributes<unknown>>;
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;
export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, type ToastActionElement, type ToastProps };
