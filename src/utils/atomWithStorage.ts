import { storage } from "@/utils/storage.ts"
import {
	atomWithStorage as atomWithStorageOrig,
	createJSONStorage,
} from "jotai/utils"
import type { SyncStringStorage } from "jotai/vanilla/utils/atomWithStorage"

export const atomWithStorage = <T>(key: string, initialValue: T) =>
	atomWithStorageOrig<T>(
		key,
		initialValue,
		createJSONStorage<T>(() => MMKVStorage),
		{ getOnInit: true },
	)

const MMKVStorage: SyncStringStorage = {
	getItem: (key: string) => storage.getString(key) ?? null,
	setItem: (key: string, value: string) => storage.set(key, value),
	removeItem: (key: string) => storage.remove(key),
}
