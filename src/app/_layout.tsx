import "@@/global.css"

import { Stack, router, type ErrorBoundaryProps } from "expo-router"
import { Providers } from "src/utils/Providers/index.tsx"
import { useEffect } from "react"
import { registerDevMenuItems } from "expo-dev-menu"
// import * as Sentry from "@sentry/react-native"
import { View, Text, Button } from "react-native"

// initErrorReporting()

function Layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
		</Stack>
	)
}

function RootLayout() {
	useEffect(() => {
		if (__DEV__) {
			registerDevMenuItems([
				{ name: "-> Home", callback: () => router.navigate("/") },
				{
					name: "-> Chaos",
					callback: () => router.navigate("/chaos"),
				},
			])
		}
	}, [])

	return (
		<Providers>
			<Layout />
		</Providers>
	)
}

// export default Sentry.wrap(RootLayout)
export default RootLayout

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
	return (
		<View className="flex-1 items-center justify-center gap-4 bg-red-300">
			<Text>An error occurred:</Text>
			<Text>{error.message}</Text>
			<Button title="Try Again?" onPress={retry} />
		</View>
	)
}
