# BenchBoss Development Log

## Day 1 — Project Setup and Initial Navigation

### Completed
- Created a new Expo Router project for BenchBoss.
- Confirmed the app runs through Expo Go and the web preview.
- Connected the project to the GitHub repository.
- Removed unnecessary starter files and assets.
- Created a simplified app structure.
- Built the initial home screen.
- Added the BenchBoss title and tagline:
  - “Track faster. Coach smarter.”
- Added the initial cream background and red brand color.
- Added navigation buttons for:
  - Create Team
  - My Teams
- Created placeholder screens for:
  - Create Team
  - My Teams
- Confirmed navigation between the home screen and both placeholder screens works.

### Current Structure
- `app/_layout.tsx`
- `app/index.tsx`
- `app/create-team.tsx`
- `app/my-teams.tsx`

### Notes
- BenchBoss will initially focus only on basketball.
- The initial target users are high school, AAU, and travel basketball coaches and team managers.
- The main long-term goal is fast, simple in-game stat tracking on tablets and phones.
- Heavy styling and branding refinement will be handled later after the core app flow is working.

---

## Day 2a — Team Creation, Persistent Storage, Dashboards, and Rosters

### Completed

#### Create Team
- Replaced the Create Team placeholder with a functional team-creation form.
- Added a controlled team-name input using React state.
- Added a live team badge preview.
- Automatically generates up to two initials from the team name.
  - Example: `LA Eagles` displays `LE`.
  - Empty input displays `BB`.
- Added six preset team-color options.
- Added a visible selected-color indicator.
- Connected the badge background to the selected team color.
- Added a Create Team button.
- Added validation requiring a team name.
- Added success and error alerts.
- Resets the team name and color after successful creation.

#### Persistent Team Storage
- Installed `@react-native-async-storage/async-storage`.
- Added persistent local storage for created teams.
- Each team is saved with:
  - Unique ID
  - Team name
  - Team color
- Existing teams are loaded before new teams are added so previously saved data is preserved.

#### My Teams
- Replaced the My Teams placeholder with a saved-team list.
- Loads saved teams from Async Storage when the screen opens.
- Displays each saved team in a card.
- Added a colored badge using the team’s saved color.
- Automatically generates the team initials for each saved team.
- Displays the saved team name.
- Converted team cards into pressable components.

#### Team Dashboard
- Created the dynamic route:
  - `app/team/[id].tsx`
- Connected each team card to its unique dashboard route.
- Reads the selected team ID from the route.
- Loads the selected team from Async Storage.
- Displays the team-specific dashboard title.
  - Example: `LA Eagles Dashboard`
- Added a Manage Players button.

#### Manage Players
- Created:
  - `app/team/players.tsx`
- Connected the Manage Players button to the roster screen.
- Passes the selected team ID into the Manage Players route.
- Loads and displays the selected team name.
  - Example: `LA Eagles Players`
- Added an Add Player button.
- Added a show/hide player-entry form.

#### Player Entry Form
- Added fields for:
  - Player name
  - Jersey number
  - Position(s)
- Added visible placeholder text colors.
- Added a Save Player button.
- Added validation requiring:
  - Player name
  - Jersey number
- Added an alert when required player information is missing.

#### Persistent Player Storage
- Saves players in Async Storage under the selected team’s ID.
- Each player is saved with:
  - Unique ID
  - Name
  - Jersey number
  - Position(s)
- Clears and closes the form after a successful save.
- Loads the saved roster when the screen opens.
- Immediately updates the visible roster after saving a player.

#### Roster Display
- Added a simple player card for each saved player.
- Each card displays:
  - Jersey number
  - Player name
  - Position(s)
- Displays `No position listed` when the position field is left blank.

### Tested
- Confirmed team-name validation works.
- Confirmed team creation success alerts work.
- Created the test team:
  - `LA Eagles`
  - Purple team color
  - `LE` initials
- Confirmed the team remains saved after navigation.
- Confirmed LA Eagles appears under My Teams.
- Confirmed the LA Eagles card opens its correct dashboard.
- Confirmed the dashboard displays `LA Eagles Dashboard`.
- Confirmed Manage Players opens the correct roster screen.
- Confirmed player-entry fields accept input.
- Confirmed player validation works.
- Confirmed saved players appear in the visible roster.

### New Dependency
- `@react-native-async-storage/async-storage`

### New Files
- `app/team/[id].tsx`
- `app/team/players.tsx`

### Modified Files
- `app/create-team.tsx`
- `app/my-teams.tsx`
- `package.json`
- `package-lock.json`

### Learning Notes
- Learned that React Native styling uses JavaScript objects inside `StyleSheet.create()` instead of regular CSS files.
- Learned how controlled `TextInput` components use state, `value`, and `onChangeText`.
- Learned how React state can update a live badge preview.
- Learned how `.map()` can generate color choices and saved-team or player cards.
- Learned how Async Storage persists app data between screens and reloads.
- Learned that arrays and objects must be converted with `JSON.stringify()` before storage and restored with `JSON.parse()`.
- Learned how Expo Router dynamic routes use files such as `[id].tsx`.
- Learned how route parameters identify and load a specific saved team.
- Learned how conditional rendering can show or hide a form.
- Set `Ctrl + 0` as the Cursor shortcut for Format Document.

### Current Working Flow
1. Open BenchBoss.
2. Create a basketball team.
3. Enter a team name.
4. Choose a preset team color.
5. Create and save the team.
6. Open My Teams.
7. Select the saved team.
8. Open the team dashboard.
9. Open Manage Players.
10. Add and save players.
11. View the saved roster.

### Next Steps
- Continue Day 2b.
- Improve roster management.
- Consider player editing and deletion.
- Begin planning the game-creation and live-stat-tracking flow.
- Delay heavy visual styling until the main app structure and functionality are stable.