// Arquivo para sobrescrever os tipos que causam problemas na compilação

// Tipos para carousel
declare module '@/components/ui/carousel' {
    import * as React from 'react'

    type EmblaOptionsType = {
        axis?: 'x' | 'y'
        loop?: boolean
        dragFree?: boolean
        [key: string]: any
    }

    type CarouselApi = {
        canScrollNext: () => boolean
        canScrollPrev: () => boolean
        scrollNext: () => void
        scrollPrev: () => void
        [key: string]: any
    }

    interface CarouselProps {
        opts?: EmblaOptionsType
        plugins?: any[]
        orientation?: "horizontal" | "vertical"
        setApi?: (api: CarouselApi) => void
    }

    const Carousel: React.FC<CarouselProps> & {
        Content: React.FC<React.HTMLAttributes<HTMLDivElement>>
        Item: React.FC<React.HTMLAttributes<HTMLDivElement>>
        Previous: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
        Next: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
    }

    export { Carousel, type CarouselApi, type EmblaOptionsType }
}

// Tipos para form
declare module '@/components/ui/form' {
    import * as React from 'react'

    // Simplificação de tipos genéricos para compatibilidade
    type FieldValues = any
    type FieldPath = string
    type ControllerProps<TFieldValues = any, TName = string> = any

    type FormFieldContextValue<TName = string> = {
        name: TName
    }
    type FormItemContextValue = any

    interface FormProps extends React.ComponentPropsWithoutRef<'form'> {
        [key: string]: any
    }

    interface FormFieldProps {
        name: string
        [key: string]: any
    }

    interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
        [key: string]: any
    }

    interface FormLabelProps extends React.ComponentPropsWithoutRef<'label'> {
        [key: string]: any
    }

    interface FormControlProps extends React.ComponentPropsWithoutRef<'div'> {
        [key: string]: any
    }

    interface FormDescriptionProps extends React.ComponentPropsWithoutRef<'p'> {
        [key: string]: any
    }

    interface FormMessageProps extends React.ComponentPropsWithoutRef<'p'> {
        [key: string]: any
    }

    const Form: React.FC<FormProps>
    const FormField: React.FC<FormFieldProps>
    const FormItem: React.FC<FormItemProps>
    const FormLabel: React.FC<FormLabelProps>
    const FormControl: React.FC<FormControlProps>
    const FormDescription: React.FC<FormDescriptionProps>
    const FormMessage: React.FC<FormMessageProps>
    const useFormField: () => FormFieldContextValue

    export {
        useFormField,
        Form,
        FormItem,
        FormLabel,
        FormControl,
        FormDescription,
        FormMessage,
        FormField,
    }
}
