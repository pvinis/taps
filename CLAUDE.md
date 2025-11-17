# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Taps** is a React Native mobile app built with Expo SDK 54 featuring real-time counter synchronization across devices using InstantDB.

## Development Commands

```bash
# Development
bun dev              # Start Expo dev server
bun ios              # Run on iOS device
bun android          # Run on Android device

# Type checking
bun typecheck        # Run TypeScript compiler

# Code formatting
bun format:all       # Format all files
bun lint:format      # Check formatting

# Building (EAS)
bun build:dev:ios    # Development iOS build
bun build:dev:and    # Development Android build
bun build:stag:ios   # Staging iOS build
bun build:stag:and   # Staging Android build
bun build:prod:ios   # Production iOS build (auto-submit)
bun build:prod:and   # Production Android build (auto-submit)

# Run builds
bun run:ios          # Run latest development-simulator iOS build
bun run:and          # Run latest development Android build

# Maintenance
bun clean            # Remove ios/android folders
bun prebuild         # Regenerate native folders
```

## Architecture Overview

### Technology Stack

- **Framework**: React Native 0.81.5 with React 19.1.0, Expo SDK 54
- **Routing**: Expo Router v6 (file-based, typed routes)
- **State Management**: Jotai (client state) + InstantDB (real-time sync)
- **Storage**: MMKV (fast persistent storage)
- **Styling**: NativeWind 5 (Tailwind CSS v4 for React Native)
- **Components**: class-variance-authority for variants
- **Performance**: React Compiler enabled, Reanimated, Worklets

### Project Structure

```
src/
├── app/                      # Expo Router file-based routes
│   ├── _layout.tsx          # Root layout with providers & error boundary
│   └── index.tsx            # Home route
├── components/
│   └── design-system/       # Reusable UI components (Button, Text, Screen, Icon)
├── screens/                 # Screen components (non-route)
│   ├── internal/            # Dev/internal screens
│   └── public/              # Public screens
├── hooks/                   # Custom React hooks
├── storage/
│   ├── session.ts          # Volatile Jotai atoms
│   └── persist.ts          # Persisted Jotai atoms (MMKV)
└── utils/
    ├── Providers/          # Provider composition
    ├── db.ts               # InstantDB initialization
    └── storage.ts          # MMKV instance

instant.schema.ts           # InstantDB schema definition
instant.perms.ts           # InstantDB permissions
global.css                 # Tailwind theme configuration
app.config.ts              # Expo config with build variants
eas.json                   # EAS Build configuration
```

### Import Aliases

- `@/` → `src/`
- `@assets/` → `assets/`
- `@@/` → root directory

### Routing (Expo Router)

Routes are defined by the file structure in `src/app/`:
- `/` → `app/index.tsx`
- Route groups use `(groupName)/` syntax
- Layouts nest via `_layout.tsx` files
- Typed routes enabled for autocomplete

### Provider Architecture

Providers are composed using a custom `combineProviders` utility in `src/utils/Providers/index.tsx`:

```tsx
<GestureHandlerRootView>
  <SafeAreaProvider>
    {/* App content */}
  </SafeAreaProvider>
</GestureHandlerRootView>
```

### State Management

**Two-layer state architecture:**

1. **Session State** (`src/storage/session.ts`): Volatile Jotai atoms for runtime state
2. **Persistent State** (`src/storage/persist.ts`): Jotai atoms with MMKV storage
   - Uses custom `atomWithStorage` wrapper (`src/utils/atomWithStorage.ts`)
   - Example: `deviceIdAtom` stores UUID across app restarts

**Real-time State**: InstantDB hooks (`db.useQuery`, `db.transact`) for server-synced data

### Database (InstantDB)

**Configuration:**
- Initialized in `src/utils/db.ts`
- Schema defined in `instant.schema.ts`
- App ID from `EXPO_PUBLIC_INSTANT_APP_ID` env var

**Current Schema:**
```typescript
{
  deviceTaps: { name: string, count: number }
  globalTaps: { name: string, count: number }
}
```

**Usage Pattern:**
```typescript
// Query with filters
const { isLoading, data } = db.useQuery({
  deviceTaps: {
    $: { where: { name: deviceId } }
  }
})

// Mutations
db.transact([
  db.tx.deviceTaps[id()].create({ name: deviceId, count: 1 })
])
```

### Design System

**Component Patterns:**
- Variant-based components using `class-variance-authority`
- NativeWind utility classes
- Context-based text styling (Button provides `TextClassContext` to nested Text)
- `cn()` helper (`src/utils/twHelpers.ts`) combines `clsx` + `tailwind-merge`

**Key Components:**
- `Button`: CVA variants (default, destructive, outline, secondary, ghost, link), sizes (default, sm, lg, icon)
- `Text`: Variants (h1-h4, p, blockquote, code, lead, large, small, muted), consumes parent text context
- `Screen`: Root wrapper with `safeTop` prop for safe area spacing
- `Icon`: Lucide React Native wrapper with type-safe icon names

**Theme:**
- Defined in `global.css`
- Custom spacing: `safeet`, `safeeb` (safe area insets)
- Dark mode via `prefers-color-scheme`

### Build Configuration

**EAS Build Variants:**
- `development`: Dev builds with dev client, internal distribution
- `development-simulator`: iOS simulator builds
- `staging`: Preview builds for testing
- `appstore`: Production builds with auto-submit

**Environment Variables:**
- Template: `.env.local.example`
- Required: `EXPO_PUBLIC_INSTANT_APP_ID`
- Also configure in EAS dashboard for builds

### Key Conventions

1. **Styling**: Always use `cn()` for conditional class merging
2. **State**: Use Jotai atoms in `storage/`, InstantDB for server state
3. **Components**: Design system components in `components/design-system/`, screens in `screens/`
4. **Routes**: File-based in `app/`, screen components in `screens/`
5. **Storage**: MMKV for client persistence, InstantDB for sync

### Configuration Files

- **TypeScript**: Strict mode, path aliases, `nodenext` module resolution
- **Babel**: Module resolver, React Native Worklets plugin
- **Metro**: SVG transformer, NativeWind integration, Sentry config base
- **Expo**: Multi-variant setup, React Compiler enabled, typed routes
- **Prettier**: Tabs, no semicolons, Tailwind plugin (must be last)

### Special Notes

- React Compiler is enabled (experimental optimization)
- MMKV is preferred over AsyncStorage (faster, synchronous)
- InstantDB transactions require arrays: `db.transact([...])` not `db.transact(...)`
- Device IDs are generated with `uuid` + `react-native-get-random-values` polyfill
