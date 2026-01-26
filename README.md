# PixTag FRONTEND 

PixTag is an interactive “Find the Characters” game built with React on the frontend and Node.js/Express with a Prisma/PostgreSQL backend.

Users select a picture, click on areas to find hidden characters, and try to complete the image as fast as possible. Times are recorded in a leaderboard for each image.  
The frontend also integrates **AI-powered hints** and a **global footer** to improve gameplay and UI consistency.

---

## Table of Contents
- Demo
- Features
- Tech Stack
- Installation
- Usage
- Project Structure
- Frontend Components
- CSS & Responsiveness
- License

---

## Demo
https://pixtag.netlify.app/

---

## Features

- Select a picture and search for hidden characters.
- Click on the picture to mark potential character locations.
- Real-time feedback for correct and incorrect guesses.
- **AI-powered hints** to help players locate characters without revealing exact positions.
- Time tracking with minutes and seconds.
- Add your name to the leaderboard when you finish.
- **Reusable footer** displayed across the application for consistent navigation and layout.
- Responsive design for mobile and desktop screens.
- Replay or return to the main menu at the end of a game.

---

## Tech Stack

- **Frontend**: React, React Router, CSS Modules
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Other Libraries**: Fetch API for HTTP requests

---

## Installation

1. Clone the repository:

```
git clone <your-repo-url>
cd <repo-folder>
```

2. Install frontend dependencies:

```
cd frontend
npm install
```

3. Install backend dependencies:

```
cd ../backend
npm install
```

4. Set up the `.env` file in the backend:

```
DATABASE_URL="postgresql://user:password@host:port/dbname"
PORT=3000
```

5. Run Prisma migrations to set up the database:

```
npx prisma migrate dev --name init
```

6. Seed the database with initial images and characters:

```
node prisma/seed.js
```

---

## Usage

1. Start the backend server:

```
cd backend
npm run dev
```

2. Start the frontend development server:

```
cd frontend
npm run dev
```

3. Open your browser and navigate to:

```
http://localhost:5173
```

4. Select a picture, click to find characters, request AI hints if needed, and complete the game.

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Index.jsx
│   │   ├── Picture.jsx
│   │   ├── PlayerForm.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Input.jsx
|   |	  ├── Hint.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   ├── Index.module.css
│   │   ├── Picture.module.css
│   │   ├── Leaderboard.module.css
│   │   ├── Form.module.css
│   │   ├── Input.module.css
│   │   └── Footer.module.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## Frontend Components

- **`Index.jsx`**: Displays the home page with all available pictures.
- **`Picture.jsx`**: Main gameplay component; handles clicks, markers, character selection, and AI hint requests.
- **`PlayerForm.jsx`**: Form to submit the player name and store completion time.
- **`Leaderboard.jsx`**: Displays the leaderboard sorted by fastest completion time.
- **`Input.jsx`**: Custom input and checkbox components.
- **`Hint.jsx`**: Reusable hook, handle the AI hint requests.
- **`Footer.jsx`**: Reusable footer component shared across pages.

---

## CSS & Responsiveness

- Uses CSS Modules for scoped styling.
- Responsive design :
  - `.mainContainer` adapts width based on screen size.
  - Click markers and found markers adjust size dynamically.
  - Character cards and images scale for mobile screens.
  - Footer layout adapts for smaller viewports.

---

## License

This project is open-source. Feel free to modify and use it under the MIT License.



