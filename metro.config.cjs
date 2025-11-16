const { getSentryExpoConfig } = require("@sentry/react-native/metro")
const { withNativewind } = require("nativewind/metro")
const { createHash } = require("node:crypto")
const { existsSync, readFileSync } = require("node:fs")

const getCacheVersion = (values) =>
	values
		.filter(Boolean)
		.reduce(
			(hash, value) => hash.update("\0", "utf8").update(value || "", "utf8"),
			createHash("md5"),
		)
		.digest("hex")

let config = getSentryExpoConfig(__dirname)

const { transformer, resolver } = config

config.transformer = {
	...transformer,
	babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
}

config.resolver = {
	...resolver,
	assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
	sourceExts: [...config.resolver.sourceExts, "svg"],
}

config.cacheVersion = getCacheVersion([
	config.cacheVersion,
	readFileSync("./package.json", "utf8"),
	readFileSync("./bun.lock", "utf8"),
	existsSync("./.env") && readFileSync("./.env", "utf8"),
	existsSync("./.env.local") && readFileSync("./.env.local", "utf8"),
])

config = withNativewind(config)

module.exports = config
