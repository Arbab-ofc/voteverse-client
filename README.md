# VoteVerse Client v2

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?logo=framer&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Client-010101?logo=socket.io&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)

> VoteVerse Client v2 (second version) delivers the full user experience for online elections: onboarding, verification, voting, analytics, and admin flows.

## What this app does

- Authentication UI (email + OTP, Google sign-in)
- Election creation and management
- Candidate and ballot views
- Voting flow with confirmation and feedback
- Real-time updates via Socket.IO
- Dashboard charts and analytics
- Responsive, animated UI with consistent styling

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- Framer Motion
- React Router
- Axios
- Firebase (Google auth)
- Socket.IO Client
- Chart.js + ApexCharts

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create `client/.env`:

```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## Scripts

```
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```
client/
  public/
  src/
    components/
    context/
    lib/
    pages/
    styles/
    App.jsx
    main.jsx
```

## Key Pages

- Home
- Login / Register
- OTP verification / resend
- Dashboard
- Elections
- Candidates
- Voting
- My Profile
- Change Password

## Notes

- API base is set via `VITE_API_URL`.
- Socket updates use `VITE_SOCKET_URL`.
