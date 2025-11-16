import { atomWithStorage } from "@/utils/atomWithStorage.ts"

export const deviceIdAtom = atomWithStorage<string | null>("deviceId", null)
