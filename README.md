# Sreya Sunil Kumar - Personal Developer Portfolio

A modern, fast, accessible, and secure portfolio website designed for aspiring web developers. Built using semantic **HTML5**, modern **CSS3** (with custom properties for Dark/Light themes), and modular **Vanilla JavaScript**.

---

## 📁 Project Structure

```text
first website/
├── index.html         # Main semantic HTML5 markup
├── css/
│   └── style.css      # Responsive styles, design tokens & theme variables
├── js/
│   └── main.js        # Theme switcher, mobile nav, scroll spy, & form validation
├── assets/
│   └── images/        # Your profile picture, project screenshots, and icons
├── _headers           # Security headers for Netlify / Cloudflare Pages
├── vercel.json        # Security headers and clean routing for Vercel
├── .gitignore         # Prevents committing unwanted OS & temp files
└── README.md          # Project guide and deployment manual
```

---

## 🚀 Step 1: Previewing the Website Locally

You can run a local development server using Python (already installed on your Mac):

1. Open your terminal in this folder:
   ```bash
   cd "/Users/sreyasunilkumar/project/first website"
   ```
2. Start the local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```
4. Press `Ctrl + C` in the terminal whenever you want to stop the server.

---

## 🎨 Step 2: Personalizing Your Content

Open `index.html` in your editor and look for the following sections:
- **Hero Title & Bio** (`#hero`): Customize your headline, sub-headline, and quick intro.
- **Social Links**: Replace the GitHub and LinkedIn placeholders with your real profile URLs.
- **Skills** (`#skills`): Add any technologies or tools you are currently studying.
- **Projects** (`#projects`): Update project titles, descriptions, and code repository links.
- **Contact Details** (`#contact`): Update your email address and response timeframe.

---

## 🧪 Step 3: Testing Checklist

Before deploying, run through this quick quality check:

1. **Theme Switcher**: Click the sun/moon icon. Verify that the site toggles smoothly between dark and light modes, and refreshes with your saved choice preserved.
2. **Mobile Responsiveness**:
   - Right-click in Chrome/Safari -> **Inspect** -> Click the **Device Toggle** (phone/tablet icon).
   - Test screen widths of 375px (iPhone), 768px (iPad), and 1280px (Desktop).
   - Verify that the mobile hamburger menu opens and closes cleanly.
3. **Contact Form Validation**:
   - Try submitting with empty fields -> Error messages should appear.
   - Enter an invalid email (e.g. `test@`) -> Email error appears.
   - Fill valid info -> Success message confirms receipt.
4. **Lighthouse Audit**:
   - In Google Chrome DevTools, open the **Lighthouse** tab.
   - Click **Analyze page load**.
   - Aim for 95+ across Performance, Accessibility, Best Practices, and SEO.

---

## 🌐 Step 4: Free & Secure Deployment Options

### Option A: GitHub Pages (Recommended for Beginners)
1. Initialize and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit of developer portfolio"
   ```
2. Create a new public repository on [GitHub](https://github.com) named `portfolio` (or `<your-username>.github.io`).
3. Connect and push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings** -> **Pages** -> Select the `main` branch -> Save.
5. Your website will be live at `https://<your-username>.github.io/<repo-name>/` with free HTTPS!

### Option B: Netlify (Drag & Drop or Git CI/CD)
1. Sign up for free at [Netlify](https://www.netlify.com).
2. You can either connect your GitHub repo for automatic continuous deployment, or drag & drop the `first website` folder directly into the Netlify dashboard.
3. Netlify automatically reads the included `_headers` file to apply top-tier security protections.

### Option C: Vercel (Lightning-Fast Global CDN)
1. Sign up at [Vercel](https://vercel.com).
2. Import your GitHub repository or use `npx vercel`.
3. Vercel automatically applies the rules defined in `vercel.json`.

---

## 🔒 Step 5: Web Security Features Implemented

* **HTTPS Everywhere**: Free TLS/SSL certificate encryption provided by GitHub Pages, Netlify, or Vercel.
* **Content Security Policy (CSP)**: Blocks malicious scripts and unauthorized cross-site data exfiltration.
* **Clickjacking Protection (`X-Frame-Options: DENY`)**: Prevents other websites from embedding your site inside invisible frames.
* **MIME Sniffing Defense (`X-Content-Type-Options: nosniff`)**: Forces browsers to respect specified content types.
* **Anti-Spam Honeypot**: Hidden form field traps automated bots without annoying humans with captchas.
* **Zero Backend Attack Surface**: No server or database to be compromised or injected.
