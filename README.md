# Moonbase One — Junior Astronaut Mission Trainer

A Vite-powered browser game for learning about the systems, trade-offs and science involved in operating a lunar research outpost. The project is designed for a junior audience and uses an Artemis-inspired lunar setting.

## What's included

- A 10-day lunar outpost management mission.
- Three difficulty settings: Cadet, Explorer and Commander.
- Five resource meters: oxygen, water, electrical power, food and radiation protection.
- Crew wellbeing, crew health, communications status and science points.
- Eight mission actions: recycle air/water, tune solar arrays, care for a greenhouse, improve shelter planning, conduct science, maintain habitat systems, rest/exercise and send a science report.
- Randomized mission events with choices and a science explanation.
- A mission log and end-of-mission reflection.
- Eight illustrated-in-text science lessons, a searchable space glossary and a six-question knowledge check.
- Links to NASA science and exploration resources.
- Responsive layout for desktop, tablet and mobile.

## Run locally

1. Install Node.js LTS.
2. Open this project folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.

## Deploy to GitHub and Vercel

1. Create a new GitHub repository.
2. Extract this ZIP and upload the **contents** of this folder to the repository root. Do not upload the ZIP as a single file.
3. In Vercel, choose **Add New → Project** and import the GitHub repository.
4. Use these settings:
   - Framework preset: **Vite**
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `./`
5. Deploy.

Keep `package.json`, `index.html`, `main.js`, `style.css` and `vercel.json` together at the repository root.

## Learning goals

Players practise systems thinking: improving one system can use resources needed by another. They encounter simplified concepts involving life support, water recovery, solar energy, lunar dust, radiation protection, plant growth, crew wellbeing, science operations and communication delay. The lessons include short explanations, mission connections, reflection prompts and sample answers.

## Important science note

This is an educational game, not a spacecraft simulator, medical tool or operational mission planner. All resource meters, costs, event outcomes and mission thresholds are invented gameplay values. They are **not** real spacecraft limits, NASA telemetry, live space-weather data or verified safety guidance. Real lunar mission design is much more complex and depends on detailed engineering, environmental measurements, materials, procedures and expert review.

## Explore real NASA resources

- NASA Moon: https://science.nasa.gov/moon/
- NASA Humans in Space: https://www.nasa.gov/humans-in-space/
- NASA DONKI space-weather data: https://ccmc.gsfc.nasa.gov/tools/DONKI/
- NASA Open Science Data Repository: https://osdr.nasa.gov/
- NASA Moon to Mars: https://www.nasa.gov/humans-in-space/

This is an independent educational project and is not affiliated with or endorsed by NASA.
