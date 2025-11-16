import { cn } from "@/utils/twHelpers.ts"
import type { ClassName } from "@/utils/types.ts"
import type { PropsWithChildren } from "react"
import { View } from "react-native"

interface ScreenRootProps extends ClassName {
	safeTop?: boolean
}

function ScreenRoot({
	className,
	children,
	safeTop,
	...restProps
}: PropsWithChildren<ScreenRootProps>) {
	return (
		<View
			className={cn("flex-1 px-6", safeTop && "pt-safeet", className)}
			{...restProps}
		>
			{children}
		</View>
	)
}

function ScreenOverflow({
	className,
	children,
}: PropsWithChildren & ClassName) {
	return <View className={cn("-mx-3", className)}>{children}</View>
}

export const Screen = Object.assign(ScreenRoot, {
	Overflow: ScreenOverflow,
})
