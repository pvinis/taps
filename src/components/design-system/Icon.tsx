import { icons } from "lucide-react-native"

type IconName = keyof typeof icons
export interface IconProps {
	name: IconName
	size?: number
	color?: string
}

export function Icon({ name, size, color }: IconProps) {
	return <GeneralIcon name={name} size={size} color={color} />
}

function GeneralIcon({
	name,
	...restProps
}: {
	name: IconName
	size?: number
	color?: string
}) {
	const LucideIcon = icons[name]
	return <LucideIcon {...restProps} />
}

// TODO: when nativewind styled/interop works again
// const StyledGeneralIcon = styled(GeneralIcon, { className: "style" })
// or
// return cssInterop(Icon, {
// 	className: {
// 		target: "style",
// 		nativeStyleToProp: {
// 			color: true,
// 			width: true,
// 			height: true,
// 		},
// 	},
// }
// or maybe we dont even need the Icon component, and we can use directly, like
// <History className="text-red-500 size-6" />
