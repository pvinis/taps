import { useDeviceId } from "@/hooks/useDeviceId.ts"
import { db } from "@/utils/db.ts"
import { Button, Text, View } from "react-native"

export function Chaos() {
	const deviceId = useDeviceId()

	const { isLoading, error, data } = db.useQuery({
		deviceTaps: {
			$: {
				where: {
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
				title="wow"
				onPress={() => {
					console.log("Tapped")
				}}
			/>
		</View>
	)
}
