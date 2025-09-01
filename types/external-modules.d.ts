// Declaração para next-themes
declare module 'next-themes' {
    export interface ThemeProviderProps {
        attribute?: string
        defaultTheme?: string
        enableSystem?: boolean
        storageKey?: string
        forcedTheme?: string
        disableTransitionOnChange?: boolean
        enableColorScheme?: boolean
        children?: React.ReactNode
    }

    export function ThemeProvider(props: ThemeProviderProps): JSX.Element

    export function useTheme(): {
        theme: string | undefined
        setTheme: (theme: string) => void
        resolvedTheme: string | undefined
        themes: string[]
        systemTheme: string | undefined
    }
}

// Declaração para react-day-picker
declare module 'react-day-picker' {
    export interface DayPickerProps {
        [key: string]: any;
    }

    export function DayPicker(props: DayPickerProps): JSX.Element
    export function DayButton(props: any): JSX.Element
    export function getDefaultClassNames(): any
}

// Declaração para embla-carousel-react
declare module 'embla-carousel-react' {
    import { ComponentType } from 'react'

    export interface EmblaOptionsType {
        axis?: 'x' | 'y'
        [key: string]: any
    }

    export type CarouselApi = {
        canScrollNext: () => boolean
        canScrollPrev: () => boolean
        scrollNext: () => void
        scrollPrev: () => void
        scrollTo: (index: number) => void
        slidesInView: () => number[]
        slidesNotInView: () => number[]
        [key: string]: any
    }

    export type UseEmblaCarouselType = [(instance: HTMLElement | null) => void, CarouselApi]

    // Versão do useEmblaCarousel como valor/função
    function useEmblaCarousel(options?: EmblaOptionsType, plugins?: any[]): UseEmblaCarouselType

    // Necessário para acessar como propriedade
    export default useEmblaCarousel
}

// Declaração para recharts
declare module 'recharts' {
    export const LineChart: React.FC<any>;
    export const Line: React.FC<any>;
    export const BarChart: React.FC<any>;
    export const Bar: React.FC<any>;
    export const XAxis: React.FC<any>;
    export const YAxis: React.FC<any>;
    export const CartesianGrid: React.FC<any>;
    export const Tooltip: React.FC<any>;
    export const Legend: React.FC<any>;
    export const ResponsiveContainer: React.FC<any>;
    export const PieChart: React.FC<any>;
    export const Pie: React.FC<any>;
    export const Cell: React.FC<any>;
    export const AreaChart: React.FC<any>;
    export const Area: React.FC<any>;
}

// Declaração para cmdk
declare module 'cmdk' {
    export const Command: React.FC<any> & {
        Input: React.FC<any>;
        List: React.FC<any>;
        Empty: React.FC<any>;
        Group: React.FC<any>;
        Item: React.FC<any>;
        Separator: React.FC<any>;
        Dialog: React.FC<any>;
    };
}

// Declaração para vaul
declare module 'vaul' {
    export const Drawer: {
        Root: React.FC<any>;
        Trigger: React.FC<any>;
        Portal: React.FC<any>;
        Content: React.FC<any>;
        Overlay: React.FC<any>;
        Close: React.FC<any>;
        Title: React.FC<any>;
        Description: React.FC<any>;
    };
}

// Declaração para react-hook-form
declare module 'react-hook-form' {
    export function useForm<TFieldValues extends FieldValues = FieldValues>(config?: any): any;
    export function useFormContext<TFieldValues extends FieldValues = FieldValues>(): any;
    export function FormProvider<TFieldValues extends FieldValues = FieldValues>(props: any): JSX.Element;
    export const Controller: React.FC<any>;
    export interface ControllerProps<TFieldValues extends FieldValues = FieldValues, TName = string> {
        name: TName;
        control?: any;
        [key: string]: any;
    }
    export type FieldValues = Record<string, any>;
    export type FieldPath<TFieldValues> = string;
    export function useFormState<TFieldValues extends FieldValues = FieldValues>(props?: any): any;
    export function useController<TFieldValues extends FieldValues = FieldValues, TName = string>(props: any): any;
    export function useFieldArray<TFieldValues extends FieldValues = FieldValues>(config: any): any;
    export function useWatch<TFieldValues extends FieldValues = FieldValues>(config?: any): any;
}// Declaração para input-otp
declare module 'input-otp' {
    export const OTPInput: React.FC<any>;
    export const OTPInputContext: React.Context<any>;
}

// Declaração para react-resizable-panels
declare module 'react-resizable-panels' {
    export const Panel: React.FC<any>;
    export const PanelGroup: React.FC<any>;
    export const PanelResizeHandle: React.FC<any>;
    export function usePanelContext(): any;
}

// Declaração para sonner
declare module 'sonner' {
    export interface ToasterProps {
        [key: string]: any;
    }
    export const Toaster: React.FC<ToasterProps>;
    export const ToastProps: any;
}

// Declaração para todos os componentes @radix-ui
declare module '@radix-ui/react-accordion' {
    export const Root: React.FC<any>;
    export const Item: React.FC<any>;
    export const Header: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Content: React.FC<any>;
} declare module '@radix-ui/react-alert-dialog' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Overlay: React.FC<any>;
    export const Content: React.FC<any>;
    export const Title: React.FC<any>;
    export const Description: React.FC<any>;
    export const Action: React.FC<any>;
    export const Cancel: React.FC<any>;
}

declare module '@radix-ui/react-aspect-ratio' {
    export const Root: React.FC<any>;
}

declare module '@radix-ui/react-checkbox' {
    export const Root: React.FC<any>;
    export const Indicator: React.FC<any>;
}

declare module '@radix-ui/react-collapsible' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Content: React.FC<any>;
    export const CollapsibleTrigger: React.FC<any>;
    export const CollapsibleContent: React.FC<any>;
} declare module '@radix-ui/react-context-menu' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
    export const Item: React.FC<any>;
    export const Group: React.FC<any>;
    export const Label: React.FC<any>;
    export const CheckboxItem: React.FC<any>;
    export const RadioItem: React.FC<any>;
    export const RadioGroup: React.FC<any>;
    export const ItemIndicator: React.FC<any>;
    export const Separator: React.FC<any>;
    export const Sub: React.FC<any>;
    export const SubTrigger: React.FC<any>;
    export const SubContent: React.FC<any>;
}

declare module '@radix-ui/react-dialog' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Overlay: React.FC<any>;
    export const Content: React.FC<any>;
    export const Title: React.FC<any>;
    export const Description: React.FC<any>;
    export const Close: React.FC<any>;
}

declare module '@radix-ui/react-dropdown-menu' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
    export const Item: React.FC<any>;
    export const Group: React.FC<any>;
    export const Label: React.FC<any>;
    export const CheckboxItem: React.FC<any>;
    export const RadioItem: React.FC<any>;
    export const RadioGroup: React.FC<any>;
    export const ItemIndicator: React.FC<any>;
    export const Separator: React.FC<any>;
    export const Sub: React.FC<any>;
    export const SubTrigger: React.FC<any>;
    export const SubContent: React.FC<any>;
}

declare module '@radix-ui/react-label' {
    export const Root: React.FC<any>;
}

declare module '@radix-ui/react-hover-card' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
}

declare module '@radix-ui/react-menubar' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
    export const Item: React.FC<any>;
    export const Group: React.FC<any>;
    export const Label: React.FC<any>;
    export const CheckboxItem: React.FC<any>;
    export const RadioItem: React.FC<any>;
    export const RadioGroup: React.FC<any>;
    export const ItemIndicator: React.FC<any>;
    export const Separator: React.FC<any>;
    export const Sub: React.FC<any>;
    export const SubTrigger: React.FC<any>;
    export const SubContent: React.FC<any>;
    export const Menu: React.FC<any>;
}

declare module '@radix-ui/react-navigation-menu' {
    export const Root: React.FC<any>;
    export const List: React.FC<any>;
    export const Item: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Content: React.FC<any>;
    export const Link: React.FC<any>;
    export const Indicator: React.FC<any>;
    export const Viewport: React.FC<any>;
}

declare module '@radix-ui/react-popover' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
    export const Anchor: React.FC<any>;
    export const Close: React.FC<any>;
    export const Arrow: React.FC<any>;
}

declare module '@radix-ui/react-progress' {
    export const Root: React.FC<any>;
    export const Indicator: React.FC<any>;
}

declare module '@radix-ui/react-radio-group' {
    export const Root: React.FC<any>;
    export const Item: React.FC<any>;
    export const Indicator: React.FC<any>;
}

declare module '@radix-ui/react-select' {
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Value: React.FC<any>;
    export const Icon: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
    export const Viewport: React.FC<any>;
    export const Item: React.FC<any>;
    export const ItemText: React.FC<any>;
    export const ItemIndicator: React.FC<any>;
    export const Group: React.FC<any>;
    export const Label: React.FC<any>;
    export const Separator: React.FC<any>;
    export const ScrollUpButton: React.FC<any>;
    export const ScrollDownButton: React.FC<any>;
}

declare module '@radix-ui/react-separator' {
    export const Root: React.FC<any>;
}

declare module '@radix-ui/react-slider' {
    export const Root: React.FC<any>;
    export const Track: React.FC<any>;
    export const Range: React.FC<any>;
    export const Thumb: React.FC<any>;
}

declare module '@radix-ui/react-switch' {
    export const Root: React.FC<any>;
    export const Thumb: React.FC<any>;
}

declare module '@radix-ui/react-tabs' {
    export const Root: React.FC<any>;
    export const List: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Content: React.FC<any>;
}

declare module '@radix-ui/react-toast' {
    export const Provider: React.FC<any>;
    export const Root: React.FC<any>;
    export const Title: React.FC<any>;
    export const Description: React.FC<any>;
    export const Action: React.FC<any>;
    export const Close: React.FC<any>;
    export const Viewport: React.FC<any>;
}

declare module '@radix-ui/react-tooltip' {
    export const Provider: React.FC<any>;
    export const Root: React.FC<any>;
    export const Trigger: React.FC<any>;
    export const Portal: React.FC<any>;
    export const Content: React.FC<any>;
    export const Arrow: React.FC<any>;
}
