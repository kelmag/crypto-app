# Crypto App

A mobile application for tracking cryptocurrency prices and market data.

## Setup

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm start -cc
```

## Usage

- `pnpm start -cc`: Start the development server
- `pnpm ios`: Build for iOS
- `pnpm android`: Build for Android

## Stack

- [Expo](https://expo.io/) - React Native framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Nativewind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [Expo Router](https://expo.github.io/router/docs) - File-based routing
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Victory Native](https://formidable.com/open-source/victory/docs/native/) - Data visualization

## Folder Structure

```
src
  ├── api              # API related code, axios and react query
  ├── app              # Expo Router screens
  │   ├── (app)        # Main app screens
  │   └── (auth)       # Authentication screens
  ├── components       # Shared components
  │   ├── market       # Market related components
  │   └── ui           # Core UI components
  ├── lib              # Shared utilities
  └── types            # TypeScript types
```
