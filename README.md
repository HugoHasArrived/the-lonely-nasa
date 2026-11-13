# Space Mission Design Game

A browser-based educational mission-design game built with React, Vite, and Three.js.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy to GitHub + Vercel

1. Create a new GitHub repository.
2. Extract this project ZIP and upload **the contents** of this folder to the repository root.
3. In Vercel, choose **Add New → Project** and import that GitHub repository.
4. Vercel should detect Vite automatically. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Click **Deploy**.

`vercel.json` includes a rewrite so the app can be refreshed on its main route.

## Game features

- Select a mission objective and destination.
- Configure spacecraft instruments and systems.
- Monitor estimated mass, power, budget, data rate, and science value.
- Select a launch vehicle and check payload compatibility.
- Run a mission simulation and receive a mission score and debrief.
- Save the current design in browser local storage.
- Responsive layout for desktop and mobile.

## Notes

This is an educational, simplified engineering model. Values are illustrative game parameters, not flight-certified engineering data or an operational trajectory solver.
