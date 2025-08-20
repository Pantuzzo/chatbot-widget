import * as ToastPrimitives from "@radix-ui/react-toast";
import * as React from "react";
declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Pick<Pick<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, string | number>, string | number> & React.RefAttributes<never>>;
declare const Toast: React.ForwardRefExoticComponent<Pick<Pick<ToastPrimitives.ToastProps & React.RefAttributes<HTMLLIElement>, string | number> & Pick<({
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
}), "variant">, string | number> & React.RefAttributes<never>>;
declare const ToastAction: React.ForwardRefExoticComponent<Pick<Pick<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, string | number>, string | number> & React.RefAttributes<never>>;
declare const ToastClose: React.ForwardRefExoticComponent<Pick<Pick<ToastPrimitives.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, string | number>, string | number> & React.RefAttributes<never>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Pick<Pick<ToastPrimitives.ToastTitleProps & React.RefAttributes<HTMLDivElement>, string | number>, string | number> & React.RefAttributes<never>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Pick<Pick<ToastPrimitives.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, string | number>, string | number> & React.RefAttributes<never>>;
declare type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
declare type ToastActionElement = React.ReactElement<typeof ToastAction>;
export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, type, ToastActionElement, type, ToastProps };
