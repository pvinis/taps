import { i } from "@instantdb/react-native"

const _schema = i.schema({
	entities: {
		deviceTaps: i.entity({
			name: i.string().indexed(),
			count: i.number(),
		}),
		globalTaps: i.entity({
			name: i.string().indexed(),
			count: i.number(),
		}),
	},
})

// This helps Typescript display better intellisense
type _AppSchema = typeof _schema
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema

export type { AppSchema }
export { schema }
export default schema
