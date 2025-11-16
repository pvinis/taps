import { cn } from "@/utils/twHelpers.ts"
import * as Slot from "@rn-primitives/slot"
import { cva, type VariantProps } from "class-variance-authority"
import {
	createContext,
	useContext,
	type ComponentProps,
	type RefAttributes,
} from "react"
import { Text as RNText } from "react-native"

const textVariants = cva(cn("text-foreground text-base"), {
	variants: {
		variant: {
			default: "",
			h1: cn("text-center text-4xl font-extrabold tracking-tight"),
			h2: cn(
				"border-border border-b pb-2 text-3xl font-semibold tracking-tight",
			),
			h3: cn("text-2xl font-semibold tracking-tight"),
			h4: cn("text-xl font-semibold tracking-tight"),
			p: "mt-3 leading-7 sm:mt-6",
			blockquote: "mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6",
			code: cn(
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
			),
			lead: "text-muted-foreground text-xl",
			large: "text-lg font-semibold",
			small: "text-sm leading-none font-medium",
			muted: "text-muted-foreground text-sm",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

type TextVariantProps = VariantProps<typeof textVariants>

export const TextClassContext = createContext<string | undefined>(undefined)

export function Text({
	className,
	asChild = false,
	variant = "default",
	...props
}: ComponentProps<typeof RNText> &
	TextVariantProps &
	RefAttributes<RNText> & { asChild?: boolean }) {
	const textClass = useContext(TextClassContext)
	const Component = asChild ? Slot.Text : RNText
	return (
		<Component
			className={cn(textVariants({ variant }), textClass, className)}
			{...props}
		/>
	)
}
