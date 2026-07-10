# Saifuddin Yasir — GitHub Pages Portfolio

A responsive personal portfolio built with plain HTML, CSS, and JavaScript. No framework or build step is required.

## Project structure

```text
saifuddin-portfolio/
├── index.html
├── style.css
├── script.js
├── .nojekyll
├── README.md
└── assets/
    ├── favicon.svg
    └── hero.webp
```

## Run locally

You can double-click `index.html`, or use a small local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish as your main GitHub Pages website

1. Sign in to GitHub.
2. Create a **public** repository named exactly `saifuddin-yasir.github.io`.
3. Upload everything inside this folder to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch `main`, folder `/ (root)`, then click **Save**.
7. After deployment, open `https://saifuddin-yasir.github.io/`.

Repository naming is case-insensitive in the browser, but using all lowercase is recommended.

## Publish as a project website instead

You may name the repository `portfolio`. The published URL will normally be:

`https://saifuddin-yasir.github.io/portfolio/`

This project uses relative file paths, so either option works.

## Edit content

- Text and links: `index.html`
- Colors, layout, and animations: `style.css`
- Typing text, scroll effects, particles, and interactions: `script.js`
- Main photograph: replace `assets/hero.webp` and keep the same filename

## Update the website later using GitHub's website

1. Open the repository.
2. Open the file you want to edit.
3. Click the pencil icon.
4. Make the change.
5. Click **Commit changes**.
6. GitHub Pages will redeploy automatically.

## Optional local Git workflow

```bash
git init
git add .
git commit -m "Create animated portfolio"
git branch -M main
git remote add origin https://github.com/Saifuddin-Yasir/saifuddin-yasir.github.io.git
git push -u origin main
```
