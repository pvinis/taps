/// <reference types="nativewind/types.d.ts" />
/// <reference types="react-native-css/types" />

declare module "*.svg" {
	import { FC } from "react"
	import { SvgProps } from "react-native-svg"

	const content: FC<SvgProps & { currentColor?: string }>
	export default content
}
