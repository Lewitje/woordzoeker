# Docs

## Plan
- Create a quick design in Figma.
- Get the basic functions of the game working.
- Make the game fun.
- Write tests.
- Make it responsive.
- Make it pretty.

## Approach
- First I created a quick design for the game in Figma.
- Setup a git repo.
- I setup a NextJS project.
- Installed some helper libraries.
- Setup a store which persists in localstorage.
- Created a dictionary of words the user needs to find.
- Created a 2D grid that can fill words horizontally, vertically, (and backwards in hard mode).
- Created the logic to click on the start and end letter then check it against the words the user needs to find.
- Created the start and end gameplay logic.
  - Allow the user to choose a game mode.
  - Show a congratulations screen when the user finds all words.
- Get a gif from Giphy and setup the end game screen.
- Show toasts after a user performs an action.
- Store the positions of the words so user can see words they already found.
  
## Challenges
- Placing words:
  - Sometimes the algorithm couldn't find a place for the words due to other words being in the way, so had to limit the attempts to 10, if it couldn't find a position after that wipe the entire grid and start again.

## Gameplay
- The user can choose easy or difficult mode.
- The user should get a random list of words each time they start the game.
- If the user reloads the game will pick up where they left off.
- The user can get a small hint, showing the anagram for the given word.
- The user can reset the game.

## Testing
- I set up test for ensuring the correct word can be found in a 2d grid in horizontal and vertical.
- It also tests to ensure no diagonal words can be found (this version of the game doesn't support that).
- It tests to ensure the word can be found in the dictionary of words the player needs to find.
- It also tests if words are passed to it backwards, e.g. if the user selects the last letter first.

## If I had more time
- Add diagonal words.
- Add a timer.
- More animations.
- Better hints e.g.:
  - Highlighting the first letter of a word.
- Sanitize the grid so that there's no chance of duplicate words.
- Create a more robust design system.
- Add a queue to the toast system (now it breaks if there is more than 1 toast every 4 seconds).
- Add a store hydrating state
- Write tests for setting up the grid