# Moonbase One — Junior Astronaut Mission Trainer

A browser-based lunar outpost management game designed around the NASA Space Apps Challenge: **Build a Junior Astronaut Mission Trainer**.

## Run locally
1. Install Node.js (LTS).
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.

## Deploy to GitHub + Vercel
1. Create a new GitHub repository.
2. Upload the contents of this folder (not the ZIP itself).
3. In Vercel, choose **Add New → Project**, import the GitHub repository.
4. Vercel should detect Vite automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click **Deploy**.

## Gameplay
Manage oxygen, power, food, and habitat integrity across a 10-sol mission. Each action has a cost. Solar weather events can increase radiation risk, and communications have a delay. Try different strategies and learn from the mission debrief.

## Science notes
This prototype uses **illustrative gameplay values**, not live spacecraft telemetry or operational mission limits. The solar-weather event cards are educational scenarios, not current forecasts. The game links to NASA's public resources so players can explore real data:
- NASA DONKI: https://ccmc.gsfc.nasa.gov/tools/DONKI/
- NASA Open Science Data Repository: https://osdr.nasa.gov/
- NASA RadLab: https://visualization.osdr.nasa.gov/radlab/gui/data-api/
- NASA Moon to Mars: https://www.nasa.gov/humans-in-space/

This is an independent educational project and is not endorsed by NASA.
