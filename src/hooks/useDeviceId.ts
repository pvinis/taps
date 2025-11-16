import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { deviceIdAtom } from "@/storage/persist.ts"
import { useAtom } from "jotai"
import invariant from "tiny-invariant"

export function useDeviceId() {
	const [deviceId, setDeviceId] = useAtom(deviceIdAtom)

	if (deviceId === null) setDeviceId(generateDeviceId())
	invariant(deviceId, "Device ID should be set")

	return deviceId
}

function generateDeviceId() {
	return uuidv4()
}
