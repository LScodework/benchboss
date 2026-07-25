# BenchBoss Development Log

## Day 1 — Project Setup and Navigation Foundation

### Project Setup
- Chose **BenchBoss** as the application name.
- Selected **React Native, Expo, and TypeScript** as the initial development stack.
- Installed Node.js and npm.
- Created a free Expo account.
- Installed Expo Go on an iPad Pro and iPhone.
- Created the BenchBoss Expo project inside the local `CodingProjects` folder.
- Opened the project in Cursor.
- Successfully ran the application on a physical iPad through Expo Go.
- Confirmed that Expo Fast Refresh immediately displays saved code changes on the testing device.

### Git and GitHub
- Created a public GitHub repository for BenchBoss.
- Connected the local project to the GitHub repository.
- Made and pushed the initial Expo project commit.
- Established the normal Git workflow for future development:
  - `git add .`
  - `git commit -m "Commit message"`
  - `git push`

### Starter Project Cleanup
- Removed unnecessary coding-assistant configuration files.
- Removed the Expo starter Explore screen.
- Removed the Expo starter modal screen.
- Removed the default tab-based navigation structure.
- Removed the remaining Expo tutorial content from the starter home screen.
- Simplified the `app` directory to contain only the current BenchBoss routes:
  - `_layout.tsx`
  - `index.tsx`
  - `create-team.tsx`
  - `my-teams.tsx`

### BenchBoss Home Screen
- Replaced the Expo starter screen with the first BenchBoss home screen.
- Added the application title:
  - **BenchBoss**
- Added the tagline:
  - **Track faster. Coach smarter.**
- Tested several early color combinations.
- Selected a temporary paper-inspired visual palette:
  - Warm cream background
  - Red primary accent
  - Dark charcoal text
- Chose the cream background partly to evoke the paper stat sheets and scorebooks coaches and managers already use.

### Navigation
- Created a dedicated **Create Team** screen.
- Added a working **Create Team** button to the home screen.
- Connected the button using Expo Router navigation.
- Created a dedicated **My Teams** screen.
- Added a matching **My Teams** button to the home screen.
- Connected the My Teams button using Expo Router.
- Removed the unnecessary bottom Home tab.
- Configured the project around a simpler stack-navigation structure.
- Began replacing route-based back labels such as `index` with clearer user-facing navigation labels such as **Home**.

### Product Decisions
- Established the home screen as the main launch point for the application.
- Decided that the two initial home-screen actions will be:
  - **Create Team**
  - **My Teams**
- Established the intended early workflow:
  - Home
  - Create Team
  - My Teams
  - Select a saved team
  - Open that team’s dashboard
- Decided that the Create Team screen should initially collect only essential team information.
- Planned to place roster management, games, seasons, coaches, settings, and long-term statistics inside each team’s dashboard rather than one oversized setup form.
- Decided to postpone detailed font and branding work until more of the core interface exists.
- Planned to centralize colors, fonts, and reusable components later so large visual changes can be applied throughout the app efficiently.

### What I Learned
- React Native applications are constructed from components such as `View`, `Text`, and `Pressable`.
- A `Pressable` component can respond visually while being tapped and can trigger navigation.
- React Native styles are written in TypeScript and resemble CSS, although the syntax and supported properties differ.
- Expo Router creates application routes from files inside the `app` directory.
- Files named `_layout.tsx` have special routing responsibilities and cannot be renamed freely.
- Route groups such as `(tabs)` can control navigation behavior without becoming normal screen names.
- Removing a route requires removing both the route file and any remaining references to it.
- Expo Go can occasionally retain an older development session, requiring the app to be fully closed and reopened.
- Restarting Expo or clearing its cache does not delete saved project files.
- Git tracks deleted, modified, and newly created files even if those changes have not yet been committed.

### Current Status
BenchBoss now has a clean React Native and Expo foundation, a simplified route structure, and a working home screen with navigation to Create Team and My Teams placeholder screens. The project runs on a physical iPad and is ready for the first functional team-creation form.