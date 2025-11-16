import { atomWithStorage } from "@/utils/atomWithStorage.ts"

export const authTokenAtom = atomWithStorage<string | null>("authToken", null)
