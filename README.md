# VoteVerse Client v2

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?logo=framer&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Client-010101?logo=socket.io&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)

> VoteVerse Client v2 (second version) is the modern, animated frontend for secure online elections.

---

## Highlights

- Polished, responsive UI with bold card layouts and motion
- Email + OTP onboarding and Google sign-in
- Election creation, management, and live participation
- Real-time updates via Socket.IO
- Analytics visuals and admin tooling

---

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- Framer Motion
- React Router DOM
- Axios
- Firebase (Google auth)
- Socket.IO Client
- Chart.js + ApexCharts

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Environment Variables

Create `client/.env`:

```
VITE_API_URL=https://api.voteverse.pw
VITE_SOCKET_URL=https://api.voteverse.pw
```

---

## Scripts

```
npm run dev
npm run build
npm run preview
npm run lint
```

---

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

---

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
- Admin Portal

---

## Notes

- `VITE_API_URL` controls the REST API base.
- `VITE_SOCKET_URL` controls the Socket.IO connection.
- Keep Firebase client config in `src/lib/firebase.js`.
