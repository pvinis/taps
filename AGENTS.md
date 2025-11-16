# Agent Guidelines for Taps App

## Commands

- **Type check**: `bun typecheck`
- **Format code**: `bun format`
- **Check formatting**: `bun lint:format`
- **Dev server**: `bun dev`
- **Build**: `bun build:dev:ios` / `bun build:dev:and` (platform-specific)
- **Clean**: `bun clean`

## Code Style

- **Imports**: Use `@/` for src/, `@@/` for root; include `.ts`/`.tsx` extensions
- **Formatting**: Tabs, no semicolons, double quotes, Prettier with Tailwind plugin
- **Types**: Strict TypeScript; avoid `!` assertions when possible; use ESLint disable comments if needed
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Files**: Always add newlines at end; replicate existing patterns
- **Comments**: Avoid generic/self-explanatory comments; focus on complex logic
- **Error handling**: Use try/catch for async operations; prefer early returns
- **Performance**: Select specific fields in queries when possible (`fields: ['field']`)

## Project Structure

- React Native/Expo app with TypeScript
- InstantDB for backend, Jotai for state, NativeWind for styling
- Component library in `src/components/design-system/`
- Utils in `src/utils/`, hooks in `src/hooks/`</content>
  <parameter name="filePath">AGENTS.md
