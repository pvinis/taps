import { id } from "@instantdb/react-native"
import { useDeviceId } from "@/hooks/useDeviceId.ts"
import { db } from "@/utils/db.ts"
import { Button, Text, Screen } from "@/components/design-system/index.ts"

export function Chaos() {
	const deviceId = useDeviceId()

	const { isLoading, data } = db.useQuery({
		deviceTaps: { $: { where: { name: deviceId } } },
	})

	const deviceTaps = data?.deviceTaps[0]

	const { data: dataGlobal } = db.useQuery({
		globalTaps: { $: { where: { name: "global" } } },
	})

	return (
		<Screen safeTop>
			<Text className="bg-red-400 text-center italic">
				Moern, sensible defaults, fast.
			</Text>
			<Text className="bg-red-400 text-center italic">
				Device ID: {deviceId}
			</Text>
			<Text className="bg-red-400 text-center italic">
				{isLoading ? "Loading..." : "loaded"}
			</Text>
			<Text className="bg-red-400 text-center">
				Your taps: {data?.deviceTaps[0]?.count ?? "N/A"}
			</Text>
			<Text className="bg-red-400 text-center italic">
				Global taps: {dataGlobal?.globalTaps[0]?.count ?? "N/A"}
			</Text>
			<Button
				onPress={() => {
					console.log("Tapped")
					if (!deviceTaps) {
						db.transact(
							db.tx.deviceTaps[id()]!.create({ name: deviceId, count: 1 }),
						)
					} else {
						db.transact(
							db.tx.deviceTaps[deviceTaps.id]!.update({
								count: deviceTaps.count + 1,
							}),
						)
					}

					//update global?
				}}
			>
				<Text>Tap me!</Text>
			</Button>
		</Screen>
	)
}
