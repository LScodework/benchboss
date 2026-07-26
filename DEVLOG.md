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

## Day 2b — Account Home Flow

### Goal

Pause feature development briefly to map out the larger BenchBoss navigation flow and begin restructuring the current app around a coach or manager account.

### Planning and User Flow Decisions

- Began mapping the BenchBoss app flow in FigJam.
- Decided the app will eventually open with a login or account creation screen.
- Established two versions of the Account Home screen:
  - First-time users with no teams see only a button prompting them to create their first team.
  - Returning users with at least one team see Start Game, My Teams, Recent Games, and an Account/Profile button.
- Decided that after a user creates their first team, they return to the normal Account Home.
- Decided that additional teams will later be created from the My Teams screen.
- Confirmed that Start Game will eventually be accessible from both Account Home and an individual Team Dashboard.
- Confirmed that both Start Game entry points will lead into the same game setup flow.
- Chose to keep the initial live stat-tracking concept focused on the user’s own team rather than requiring full opponent roster entry.
- Decided to postpone detailed game-screen planning until the account, team, dashboard, and roster flows are functional.

### Account Home Updates

- Reworked `app/index.tsx` into an Account Home screen.
- Added an AsyncStorage check that runs whenever the Home screen receives focus.
- The app now checks whether at least one saved team exists.
- Users with no saved teams see:
  - Create your first team to get started
- Users with at least one saved team see:
  - Start Game
  - My Teams
  - Recent Games
- Added a profile icon button in the upper-right corner.
- Preserved the existing BenchBoss title, tagline, cream background, and red button styling.

### Create Team Flow Update

- Updated `app/create-team.tsx` to use Expo Router.
- After a team is successfully saved, the user is now returned to the normal Account Home.
- The Account Home automatically recognizes the newly created team and changes from the first-time layout to the returning-user layout.

### Account Screen

- Added `app/account.tsx`.
- Connected the Account Home profile icon to the new Account screen.
- Added placeholder text for future profile and account settings.
- Added a Back to Home button.
- Confirmed that navigation to and from the Account screen works correctly.

### Current Working Flow

- Account Home checks for saved teams.
- Existing users see Start Game, My Teams, Recent Games, and Profile.
- First-time users will see only the first-team creation prompt.
- Create Team saves the team and returns to Account Home.
- My Teams continues to open the existing saved-team list.
- The profile icon opens the Account screen.
- Start Game and Recent Games still use temporary placeholder behavior and will receive dedicated screens next.

### Next Steps

- Add dedicated placeholder screens for Start Game and Recent Games.
- Add a Create Team button inside My Teams for additional teams.
- Restructure the Team Dashboard around Roster, Start Game, Games, Stats, and Team Settings.
- Convert the current player-management flow into a proper roster experience.
- Continue mapping the app flow as each section becomes functional.

## Day 3 – Dashboard Navigation, Team Dashboard, Roster, and Player Dashboard

### Goals
- Complete the main BenchBoss dashboard navigation.
- Begin building the My Teams branch from the app map.
- Create functional team, roster, and player dashboard navigation.
- Establish placeholder layouts for future team and player data.

### Completed

#### Main Dashboard
- Connected the Start Game button to the existing Start Game screen.
- Created a dedicated Recent Games placeholder screen.
- Connected the Recent Games button to the new screen.
- Replaced the small profile icon with a full Account Settings dashboard button.
- The main dashboard now includes four matching buttons:
  - Start Game
  - My Teams
  - Recent Games
  - Account Settings

#### Future Dashboard Design Notes
- Plan to create a custom BenchBoss logo during the styling phase.
- Plan to display the four main dashboard buttons horizontally for the tablet-first layout.
- Current vertical layout remains in place while functionality is developed.

#### My Teams Screen
- Added a Create New Team button.
- Positioned the Create New Team button in the upper-right corner.
- Existing saved teams remain selectable from the Teams Dashboard.

#### Selected Team Dashboard
- Redesigned the selected-team screen into a tablet-focused dashboard layout.
- Added a left-side action menu containing:
  - Manage Players
  - Team Settings placeholder
  - Team Stats placeholder
- Added a roster preview section.
- Added Recent Games and Upcoming Games placeholder panels.
- Added a Team Goals / Notes placeholder panel.
- Connected both Manage Players and the Roster heading to the full roster screen.
- Loaded and displayed the selected team’s saved players in the roster preview.
- Made roster preview player cards selectable.
- Player selections now open the individual Player Dashboard.

#### File and Route Cleanup
- Renamed the full roster screen from:
  - `app/team/players.tsx`
- To:
  - `app/team/roster.tsx`
- Updated team dashboard routes from `/team/players` to `/team/roster`.
- Created:
  - `app/team/player.tsx`
- Final routes are now:
  - `/team/roster` for the full team roster
  - `/team/player` for an individual player dashboard

#### Player Dashboard
- Created a functional individual Player Dashboard.
- Loaded the selected player using the team ID and player ID.
- Displayed the saved player name, jersey number, and position.
- Redesigned the Player Dashboard based on the new layout map.
- Added a player information panel containing:
  - Player Bio placeholder
  - Position display
  - Current Status placeholder
- Added a Season Stat Averages section containing:
  - Current Season placeholder
  - Previous Season placeholder
  - Earlier Season placeholder
- Added a Recent Game Stats section with multiple game performance placeholders.
- Added a Player Notes / Goals section.
- Added a Back to Team button.

#### Roster Screen
- Updated the screen heading from Players / Manage Players to Team Roster.
- Positioned the Add Player button in the upper-right corner.
- Made each player card selectable.
- Player cards on the full roster screen now open the same individual Player Dashboard.

### Current App Flow

Login / Welcome
→ BenchBoss Dashboard
→ My Teams
→ Selected Team Dashboard
→ Team Roster
→ Player Dashboard

The Player Dashboard can also be opened directly from the roster preview on the Selected Team Dashboard.

### Notes
- Current layouts prioritize structure and navigation over final visual styling.
- Team Settings, Team Stats, game history, upcoming games, notes, and player statistics currently use placeholders.
- The app is being developed tablet-first, with responsive and visual polish planned after the primary screen structure is functional.