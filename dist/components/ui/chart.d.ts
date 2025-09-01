import * as React from "react";
import * as RechartsPrimitive from "recharts";
declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
declare function ChartContainer({ id, className, children, config, ...props }: React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}): import("react/jsx-runtime").JSX.Element;
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => import("react/jsx-runtime").JSX.Element;
declare const ChartTooltip: React.FC<any>;
type TooltipPayloadItem = {
    name?: string;
    dataKey?: string;
    value?: number | string;
    color?: string;
    payload: Record<string, any>;
    [key: string]: any;
};
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    className?: string;
    indicator?: "line" | "dot" | "dashed";
    hideLabel?: boolean;
    hideIndicator?: boolean;
    label?: any;
    labelFormatter?: (label: any, payload: TooltipPayloadItem[]) => React.ReactNode;
    labelClassName?: string;
    formatter?: (value: any, name: any, item: TooltipPayloadItem, index: number, payload: Record<string, any>) => React.ReactNode;
    color?: string;
    nameKey?: string;
    labelKey?: string;
} & React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare const ChartLegend: React.FC<any>;
type ChartLegendContentProps = React.ComponentProps<"div"> & {
    payload?: Array<any>;
    verticalAlign?: "top" | "bottom" | "middle";
    hideIcon?: boolean;
    nameKey?: string;
};
declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: ChartLegendContentProps): import("react/jsx-runtime").JSX.Element;
export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent };
