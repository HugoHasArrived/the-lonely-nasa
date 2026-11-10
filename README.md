# Apollo 11 — The Journey (2D Junior Mission Trainer)

A browser-playable, story-led 2D Apollo 11 experience built with Vite. It is designed for GitHub and Vercel deployment and requires no API keys.

## Experience

- **Real homepage and mission briefing** with historical timeline, crew, controls, objectives and pre-flight checklist.
- **Earth / apartment story:** a fictionalized apartment-style setting introduces Neil Armstrong's childhood in Wapakoneta, Ohio, and his early fascination with flight.
- **NASA chapter:** Armstrong's 1962 astronaut selection, test-pilot background and Gemini 8 emergency are presented as historical learning scenes. The player's registration story is fictionalized.
- **Junior astronaut training:** interactive quiz stations for spacecraft systems, lunar geology, closed-loop communication and emergency decision-making.
- **2D Saturn V launch control:** ignition, throttle, pitch, yaw, S-IC and S-II staging milestones, Earth parking orbit and translunar injection.
- **Lunar landing practice:** toggle the descent engine thrust pulse with **E** or **Space** to manage the descent rate and aim for a gentle touchdown.
- **Moonwalk and lunar operations:** first steps, science instruments, sample collection, lunar ascent and rendezvous with Columbia.
- **Artemis-inspired lunar outpost survival lab:** manage oxygen, electrical power, food and radiation shielding across five lunar sols. Every action has a resource cost; a simulated solar particle event tests shelter planning. Rover science adds rewards with operational risk. This is a clearly labeled educational model, not live NASA telemetry or an actual habitat design.\n- **Earth return:** service-module jettison, drogue and main parachute deployment, Pacific splashdown and USS Hornet recovery.
- **Mission systems panel:** educational checklists and illustrative resource indicators.
- **Animated 2D canvas scenes** with moving rover, EVA astronaut, lunar dust, rocket exhaust, orbital hero art and habitat details; responsive layout for desktop and touch-sized displays.\n- **NASA learning references:** Apollo 11 mission history, Artemis program, NASA Space Weather and the NASA Open Science Data Repository (OSDR). The current prototype links to these sources but does not claim to fetch live DONKI/OSDR data.

## Run locally

Install Node.js LTS, then:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production site to `dist/`.

## Deploy to GitHub + Vercel

1. Extract this ZIP.
2. Create a GitHub repository and upload the **contents** of this folder to its root. `package.json`, `index.html`, `main.js`, `style.css`, and `vercel.json` should be at the top level.
3. In Vercel, select **Add New → Project** and import the repository.
4. Select **Vite** as the framework preset.
5. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
6. Deploy. No environment variables are required.

## Controls

### Story and training scenes

| Action | Control |
|---|---|
| Move | W / A / S / D or arrow keys |
| Interact | E |
| Move faster | Shift |
| Select an object | Click near the object, then press E |

### Saturn V launch

| Action | Control |
|---|---|
| Ignition / liftoff | Ignition button |
| Throttle | Slider or W / S |
| Pitch | Slider or Up / Down |
| Yaw | Slider or Left / Right |
| Stage separation | Stage button when enabled |
| Confirm Earth orbit | Earth orbit button |
| Trans-lunar injection | TLI button or E when orbit is ready |

### Lunar landing

Press **E** or **Space** to toggle the descent-thrust pulse on and off. Use short pulses to slow the descent and target a low touchdown rate. If the landing is too hard, the approach resets for another try.

### Earth return

Complete the recovery sequence in order: jettison the service module, deploy drogue chutes, deploy main chutes, then confirm splashdown.

## Historical reference points

- Apollo 11 launched July 16, 1969 at 13:32 UTC from Kennedy Space Center, Launch Complex 39A.
- Crew: Neil Armstrong, Buzz Aldrin and Michael Collins.
- Eagle landed in the Sea of Tranquility on July 20, 1969.
- Columbia splashed down in the Pacific Ocean on July 24, 1969.
- Total mission duration: 8 days, 3 hours, 18 minutes and 35 seconds.

The apartment and the player's role are dramatized. The 2D flight, attitude, resource and landing models are simplified educational gameplay, not physically validated spacecraft simulation, real NASA telemetry, official NASA procedures or NASA-certified training. The historical story is not presented as a verbatim reconstruction.

## Official NASA sources

- [Apollo 11 Mission Overview](https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/)
- [Neil A. Armstrong — NASA biography](https://www.nasa.gov/humans-in-space/astronauts/former-astronauts/former-astronaut-neil-a-armstrong/)
- [Apollo 11 Lunar Surface Journal](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html)
- [NASA Apollo 11 mission data](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11info.html)

## Science and data integrity

The historical Apollo 11 timeline is based on NASA mission-history material. The new lunar outpost is an Artemis-inspired teaching scenario: its resource percentages and solar-weather event are deliberately simplified gameplay values, not real habitat engineering specifications, current radiation readings, or live NASA data. The homepage links to NASA Space Weather, Artemis, and OSDR so learners can continue exploring primary sources.

