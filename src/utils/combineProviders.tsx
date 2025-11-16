import {
	type ComponentClass,
	type ComponentType,
	type FC,
	type ForwardRefExoticComponent,
	type PropsWithChildren,
	type ReactNode,
} from "react"

type AllowedProvider =
	| FC<PropsWithChildren>
	| FC
	| ComponentClass<{ children: ReactNode }>
	| ComponentType
	| ForwardRefExoticComponent<any>

type FilteredOutProvider = false | undefined

type ProviderList = Array<AllowedProvider | FilteredOutProvider>

export const combineProviders = (list: ProviderList, children: ReactNode) =>
	(list.filter(Boolean) as Array<AllowedProvider>).reduceRight(
		(acc, Provider) => <Provider>{acc}</Provider>,
		<>{children}</>,
	)
