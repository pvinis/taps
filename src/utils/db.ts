import { init, i } from "@instantdb/react-native"
import { schema } from "@@/instant.schema.ts"

export const db = init({
	appId: process.env.EXPO_PUBLIC_INSTANT_APP_ID ?? "missing-app-id",
	schema,
})
