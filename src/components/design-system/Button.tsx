import { TextClassContext } from "@/components/design-system/Text.tsx"
import { cn } from "@/utils/twHelpers.ts"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"
import { Pressable } from "react-native"

export const buttonVariants = cva(
	cn(
		"group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none",
	),
	{
		variants: {
			variant: {
				default: cn("bg-primary active:bg-primary/90 shadow-sm shadow-black/5"),
				destructive: cn(
					"bg-destructive active:bg-destructive/90 shadow-sm shadow-black/5",
				),
				outline: cn(
					"border-border bg-background active:bg-accent border shadow-sm shadow-black/5",
				),
				secondary: cn(
					"bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5",
				),
				ghost: cn("active:bg-accent"),
				link: "",
			},
			size: {
				default: cn("h-10 px-4 py-2 sm:h-9"),
				sm: cn("h-9 gap-1.5 rounded-md px-3 sm:h-8"),
				lg: cn("h-11 rounded-md px-6 sm:h-10"),
				icon: "h-10 w-10 sm:h-9 sm:w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

export const buttonTextVariants = cva(
	cn("text-foreground text-sm font-medium"),
	{
		variants: {
			variant: {
				default: "text-primary-foreground",
				destructive: "text-white",
				outline: cn("group-active:text-accent-foreground"),
				secondary: "text-secondary-foreground",
				ghost: "group-active:text-accent-foreground",
				link: cn("text-primary group-active:underline"),
			},
			size: {
				default: "",
				sm: "",
				lg: "",
				icon: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

export type ButtonProps = ComponentProps<typeof Pressable> &
	RefAttributes<typeof Pressable> &
	VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
			<Pressable
				className={cn(
					props.disabled && "opacity-50",
					buttonVariants({ variant, size }),
					className,
				)}
				role="button"
				{...props}
			/>
		</TextClassContext.Provider>
	)
}
