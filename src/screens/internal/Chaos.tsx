import { useDeviceId } from "@/hooks/useDeviceId.ts"
import { db } from "@/utils/db.ts"
import { View } from "react-native"
import { Button, Text } from "@/components/design-system/index.ts"

export function Chaos() {
	const deviceId = useDeviceId()

	const { isLoading, error, data } = db.useQuery({
		deviceTaps: {
			$: {
				where: {
					id: "3d0e09f4-4a5a-4571-845c-455ab985b0c2", // use name
				},
			},
		},
	})

	return (
		<View className="flex-1 bg-yellow-600 pt-20">
			<Text className="bg-red-400 text-center italic">
				Moern, sensible defaults, fast.
			</Text>
			<Text className="bg-red-400 text-center italic">
				Device ID: {deviceId}
			</Text>
			<Text className="bg-red-400 text-center italic">
				{isLoading ? "Loading..." : "loaded"}
			</Text>
			<Text className="bg-red-400 text-center italic">
				Your taps: {data?.deviceTaps[0]?.count ?? "N/A"}
			</Text>
			<Text className="bg-red-400 text-center italic">Global taps: tbg</Text>
			<Button
				onPress={() => {
					console.log("Tapped")
				}}
			>
				<Text>Tap me!</Text>
			</Button>
		</View>
	)
}
