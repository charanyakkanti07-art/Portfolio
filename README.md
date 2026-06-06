# 🎬 Charan Reddy Yakkanti — Portfolio

A modern, highly immersive, and interactive developer portfolio showcasing Charan's expertise in **Computer Science, Artificial Intelligence, and Data Science**. 

Built with React 19, TanStack Start (TS), TypeScript, Vite, TailwindCSS, Framer Motion, GSAP, and Three.js.

---

## ✨ Key Features

### 1. 🌌 Cinematic Hero Stage & WebGL Hologram
- **Interactive 3D Particle Hologram**: A custom WebGL-rendered rotating particle sphere on the right side of the hero section that responds dynamically to mouse coordinates, creating a high-tech connection web.
- **Sci-Fi Terminal UI**: A glassmorphic overlay containing live-updating system diagnostics, neural network status registers, and local environment parameters.
- **Blurred Ambient Layers**: Large Three.js background bokeh particle oscillations and blurred ambient video effects for high visual immersion.

### 2. 🧭 Scroll-Adaptive Navigation Bar
- **Smart Header Layout**: Clean navigation anchors (`About`, `Projects`, `Contact`) on the left, and a dedicated glassmorphic `Mail` option on the right.
- **Auto-Hide on Scroll**: The navbar slides vertically out of view when scrolling down (offering distraction-free reading) and slides back down into view instantly when scrolling up.
- **Mobile Responsive Drawer**: Collapses into a touch-friendly slide-out hamburger menu panel on mobile screens.

### 3. 🏷️ Magnetic Technical Skills Tag Cloud
- **Interactive Tag Clouds**: Skills grouped dynamically in glassmorphic blocks (Languages, Web, CS Fundamentals, AI).
- **Magnetic Mouse Pull**: Hovering over tags pulls them gently toward the cursor (utilizing a GPU-friendly spring physics effect).
- **Color-Coded Status Bullets**: Glowing status indicators matching the tint of each individual skill category.

### 4. 📂 Featured Projects Showcase
- **HostelMate**: Smart Hostel Discovery & Management Platform leveraging AI review summarization, real-time demand-based pricing models, and secure role-based dashboard metrics.
- **IHEA**: Intelligent Health & Engagement Assistant rendering personalized recommendations through ML models and custom React data visualizations.

---

## 🛠️ Technology Stack

| Layer | Technologies & Tools |
|---|---|
| **Core Architecture** | React 19, TanStack Start (Router & Query), TypeScript, Vite |
| **Styling & Theme** | CSS Variables, TailwindCSS v4, Glassmorphic Easing |
| **Animations & WebGL** | Three.js (Bokeh & WebGL Renderer), Framer Motion, GSAP |
| **Linting & Code Quality** | ESLint, Prettier |
| **Asset Pipeline** | Lovable Asset Manager, custom proxy models |

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### Installation
1. Clone this repository locally.
2. Navigate into the workspace directory:
   ```bash
   cd "New folder"
   ```
3. Install the dependencies using npm (including legacy peer dependencies to resolve specific plugin versions):
   ```bash
   npm install --legacy-peer-deps
   ```

### Running the Development Server
Launch the local development server:
```bash
npm run dev
```
The application will spin up at **`http://localhost:8080/`**. Open it in your browser to see the live site.

### Production Build
To generate a static build of the application:
```bash
npm run build
```

---

## ⚙️ Configuration & Asset Customization

### Local Media / Videos
By default, the intro talking-head and ambient background video assets are referenced through Lovable's proxy URLs (`/__l5e/assets-v1/...`) stored in `src/assets/charan-intro.mp4.asset.json`. 

When running outside the Lovable cloud sandboxes:
1. Place your custom `.mp4` video file (e.g. `charan-intro.mp4`) in the `/public` folder or the `src/assets` folder.
2. Update the video source inside [VideoIntro.tsx](file:///c:/Projects/Portfolio/New%20folder/src/components/portfolio/VideoIntro.tsx) (e.g., using `"/charan-intro.mp4"` as the direct `src` value).

---

## 👤 Author
**Charan Reddy Yakkanti**
* Computer Science & AI Undergraduate
* Specialization: AI, Machine Learning, Data Science, & Full-Stack Development
* Location: Andhra Pradesh, India
* Contact Email: [yakkanticharanreddy@gmail.com](mailto:yakkanticharanreddy@gmail.com)
"# Portfolio" 
