folder structure: 
src/
├── App.jsx
├── main.jsx
│
├── components/
│   ├── layout/       # Shared game screen and spacecraft visuals
│   ├── hud/          # Oxygen, water, food and power displays
│   ├── mission/      # Mission details and action buttons
│   └── feedback/     # Messages, pause menu and reset controls
│
├── missions/
│   ├── level-01/     # Level 1 mission
│   ├── level-02/     # Level 2 mission
│   ├── level-03/     # Level 3 mission
│   ├── level-04/     # Level 4 mission
│   ├── level-05/     # Level 5 mission
│   ├── level-06/     # Level 6 mission
│   └── level-07/     # Level 7 mission
│
├── features/
│   └── game/         # Shared game rules and state management
│
├── data/
│   └── missionRegistry.js
│
└── styles/
    ├── theme.css
    ├── global.css
    └── game-shell.css
