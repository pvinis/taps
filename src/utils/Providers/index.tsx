import { PropsWithChildren } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { combineProviders } from "@/utils/combineProviders.tsx"

export function Providers({ children }: PropsWithChildren) {
	return combineProviders([HighLevelProviders], children)
}

export function HighLevelProviders({ children }: PropsWithChildren) {
	return combineProviders([GestureHandlerRootView, SafeAreaProvider], children)
}
