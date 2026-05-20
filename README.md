# dwgoodwi.github.io

Personal portfolio for **Dwonn Goodwin** — QA, AI test automation, and platform quality engineering.

Live site (after setup): **https://dwonng.github.io/** (if your GitHub user is `DwonnG`)

## Setup on GitHub

1. Create a repository named **`DwonnG.github.io`** (must match your GitHub username).
2. Push this folder:

```bash
cd /Users/dwgoodwi/Code/playground/dwgoodwi.github.io
git init
git add .
git commit -m "Modern portfolio site for GitHub Pages"
git branch -M main
git remote add origin git@github.com:DwonnG/DwonnG.github.io.git
git push -u origin main
```

3. **Settings → Pages →** deploy from **`main`** / **root**.
4. Open https://dwonng.github.io/

## Add your resume PDF

Copy your latest resume into this folder as `resume.pdf` so **Download Resume** works:

```bash
cp ~/Desktop/Resumes/Nice/Dwonn_Goodwin_Resume.pdf resume.pdf
git add resume.pdf
git commit -m "Add resume PDF"
git push
```

## Customize links

Edit `index.html` if your URLs differ:

- LinkedIn: `https://www.linkedin.com/in/dwonngoodwin/`
- GitHub: `https://github.com/DwonnG`
- Email: `DwonnGoodwin@gmail.com`

## Local preview

```bash
cd /Users/dwgoodwi/Code/playground/dwgoodwi.github.io
python3 -m http.server 8080
```

Open http://localhost:8080/

## Job applications

Use **https://dwonng.github.io/** in the website field on job applications.
