export default {
	plugins: [
		"prettier-plugin-tailwindcss", // must be last
	],

	semi: false,
	useTabs: true,
	singleQuote: false,

	tailwindAttributes: ["className", "/.*ClassName/"],
	tailwindFunctions: ["cn", "cva"],

	overrides: [
		{
			files: "*.json",
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
}
