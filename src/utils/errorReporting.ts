import * as Sentry from "@sentry/react-native"

export function initErrorReporting() {
	Sentry.init({
		dsn: "XXXX",

		sendDefaultPii: true,
		enableLogs: true,

		// Configure Session Replay
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1,
		integrations: [Sentry.mobileReplayIntegration()],
	})
}

export const captureMessage = Sentry.captureMessage
export const captureException = Sentry.captureException
