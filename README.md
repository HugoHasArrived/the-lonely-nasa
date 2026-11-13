# Junior Astronaut Mission Trainer — Lunar Outpost Command

A browser-playable, animated 2D educational simulation inspired by the 2026 NASA Space Apps Challenge: **Build a Junior Astronaut Mission Trainer**. The main learning objective is to train young players to make mission decisions while operating a lunar research outpost.

## Core experience

- **Astronaut foundations:** explore a 2D training environment and learn from historical spaceflight examples.
- **Mission-control skills:** understand crew roles, checklists, communication discipline and why crews must be able to act autonomously.
- **Six practical training stations:** spacecraft systems, life support, lunar geology, closed-loop communication, EVA preparation and emergency response.
- **Spacecraft operations:** simplified launch and lunar landing exercises provide context for getting a crew and equipment to the surface.
- **Lunar outpost command:** operate a research habitat for five lunar sols. Each sol, choose one priority while baseline demand drains resources.
- **Meaningful trade-offs:** service life support, run the greenhouse, reinforce shelter, send a rover or conserve energy. Every action changes more than one system.
- **Solar particle event:** a simulated event on Sol 3 demonstrates why shelter preparation matters. This is a scenario, not a live forecast.
- **Communication delay:** the outpost briefing explains that radio messages between Earth and the Moon are not instant, so crews need procedures and local decision-making authority.
- **Animated 2D lunar environment:** habitat modules, greenhouse, solar array, astronaut EVA activity, rover, lunar dust and Earth in the sky.
- **Mission debrief:** survive the five-sol scenario, complete science objectives and review the consequences of resource decisions.

## Learning goals

By playing, students should be able to explain:

1. Why oxygen and life-support systems must be protected.
2. Why electrical power has to be budgeted across competing systems.
3. Why food production takes energy and planning.
4. Why radiation shelter must be prepared before a solar event.
5. Why exploration and science have operational costs.
6. Why communication delay means a crew cannot wait for Earth to make every decision.

## Data integrity

The game currently uses **illustrative simulation values**, not live NASA telemetry, real habitat specifications, medical guidance, or a validated engineering model. The solar particle event is a scripted teaching scenario, not a current DONKI event. The communication-delay explanation is based on the finite speed of radio signals and the average Earth–Moon distance; the displayed round-trip estimate is illustrative.

NASA references for future data integration:

- [NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI)](https://ccmc.gsfc.nasa.gov/tools/DONKI/) — solar events and space-weather context.
- [NASA Open Science Data Repository (OSDR)](https://osdr.nasa.gov/) — astronaut biology and health research datasets.
- [NASA Artemis](https://www.nasa.gov/humans-in-space/artemis/) — lunar exploration program context.
- [NASA Apollo 11 mission overview](https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/) — historical case study.

The project is an independent educational prototype and is not affiliated with or endorsed by NASA.

## Run locally

Requires Node.js LTS.

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy to GitHub + Vercel

1. Extract this ZIP.
2. Upload the **contents** of this folder to the root of your GitHub repository.
3. Import the repository in Vercel.
4. Use the Vite framework preset, build command `npm run build`, and output directory `dist`.
5. Deploy. No environment variables are required.

## Controls

- **W / A / S / D** or arrow keys: move.
- **E**: interact.
- **Shift**: move faster.
- **Space / E** during lunar descent: toggle the simplified thrust pulse.
- Flight controls are provided on-screen.

## Important limitations

This is a learning game, not official NASA training, a certified simulator, or an operational habitat design. The resource model is intentionally simplified for ages 7–12. For a stronger science-data submission, a future iteration should add a clearly labeled NASA DONKI data panel with timestamped source attribution and a curated OSDR research finding. Static or simulated values must never be described as live.

## Playable rover expedition

The lunar outpost now includes a hands-on rover mini-game. Launch the rover, steer around rocks with WASD or the arrow keys (or the on-screen direction pad), collect three glowing science samples, and return to the habitat before the battery runs out. Completing the expedition advances the outpost's science objective and applies its resource costs.
