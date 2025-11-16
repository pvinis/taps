import { init, i, InstaQLEntity } from "@instantdb/react-native"

const APP_ID = "0e7f30e3-95b3-4822-979e-ff495355978d"

// const schema = i.schema({
// 	entities: {
// 		colors:
// 	}
// })

export const db = init({
	appId: APP_ID,
	// schema,
})
