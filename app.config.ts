import { ExpoConfig } from "@expo/config-types"
import packageJson from "./package.json" with { type: "json" }

type AppConfig = {
	name: string
	slug: string
	scheme: string
	ios: { bundleIdentifier: string }
	android: { package: string }
}

type AppVariant = "development" | "staging" | "production"

const appConfigDevelopment: AppConfig = {
	name: "Taps Dev",
	slug: "taps",
	scheme: "taps",
	ios: { bundleIdentifier: "com.pvinis.taps.dev" },
	android: { package: "com.pvinis.taps.dev" },
}

const appConfigStaging: AppConfig = {
	name: "Taps Stg",
	slug: "taps",
	scheme: "taps",
	ios: { bundleIdentifier: "com.pvinis.taps.stag" },
	android: { package: "com.pvinis.taps.stag" },
}

const appConfigProduction: AppConfig = {
	name: "Taps",
	slug: "taps",
	scheme: "taps",
	ios: { bundleIdentifier: "com.pvinis.taps" },
	android: { package: "com.pvinis.taps" },
}

const configs: Record<AppVariant, AppConfig> = {
	development: appConfigDevelopment,
	staging: appConfigStaging,
	production: appConfigProduction,
}

const appVariant = (process.env.APP_VARIANT as AppVariant) ?? "development"
const appConfig = configs[appVariant]

export default (): ExpoConfig => {
	return {
		name: appConfig.name,
		slug: appConfig.slug,
		version: packageJson.version,
		scheme: appConfig.scheme,
		plugins: [
			"expo-router",
			["expo-dev-client", { launchMode: "most-recent" }],
			"expo-font",
			// [
			// 	"@sentry/react-native/expo",
			// 	{ organization: "XXX", project: "app" },
			// ],
		],
		experiments: {
			reactCanary: true,
			reactCompiler: true,
			buildCacheProvider: {
				plugin: "expo-build-disk-cache",
				options: {
					cacheDir: "node_modules/.expo-build-disk-cache",
					remotePlugin: "eas",
				},
			},
			tsconfigPaths: true,
			typedRoutes: true,
		},
		orientation: "portrait",
		userInterfaceStyle: "automatic",
		assetBundlePatterns: ["**/*"],
		ios: {
			bundleIdentifier: appConfig.ios.bundleIdentifier,
			icon: "./assets/app-icon.icon",
			supportsTablet: true,
			infoPlist: {
				ITSAppUsesNonExemptEncryption: false,
			},
		},
		android: {
			package: appConfig.android.package,
			adaptiveIcon: {
				foregroundImage: "./assets/app-icon.png",
				backgroundColor: "#002b47",
			},
			predictiveBackGestureEnabled: true,
		},
		extra: {
			eas: { projectId: "31d5e3d9-025d-4fff-9a0e-22105588a88a" },
		},
	}
}
