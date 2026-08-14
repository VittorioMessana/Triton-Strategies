# Triton Strategies — Website

Static site: `index.html`, `contact.html`, `styles.css`, `script.js`, `images/`.
No build step, no server, no dependencies — it runs by uploading these files as-is.

## 1. Before you deploy — swap the team photos

- `images/malek.jpg` — already set, cropped from the graduation photo you uploaded (the one holding the certificate).
- `images/vittorio.jpg` — currently a **placeholder** ("VM" monogram). Replace it with the close-up smiling photo:
  1. Rename that photo to exactly `vittorio.jpg`.
  2. Drop it into the `images/` folder, overwriting the placeholder.
  3. Keep it roughly portrait-oriented (about 3:4, e.g. 720×960px) so it frames the same way as Malek's photo.

Everything else (copy, layout, disclosures, nav) is already final per the brief.

## 2. Push to GitHub

If you don't have a repository yet:

```bash
cd triton-strategies
git init
git add .
git commit -m "Initial Triton Strategies site"
git branch -M main
git remote add origin https://github.com/<your-username>/triton-strategies.git
git push -u origin main
```

If you already have the repo, just copy these files in (overwriting old ones) and:

```bash
git add .
git commit -m "Update site"
git push
```

## 3. Turn on GitHub Pages

1. On GitHub, open your repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Click **Save**.
4. GitHub will give you a URL like `https://<your-username>.github.io/triton-strategies/` — the site is now live there.

## 4. Connect www.tritonstrategies.com

**A. In this repository (already done for you):**
The file `CNAME` at the repo root contains `www.tritonstrategies.com`. GitHub Pages reads this file automatically. Do not delete it.

**B. At your domain registrar (wherever you bought tritonstrategies.com):**
Add these DNS records:

| Type  | Host / Name | Value |
|-------|-------------|-------|
| CNAME | `www`       | `<your-username>.github.io` |
| A     | `@`         | `185.199.108.153` |
| A     | `@`         | `185.199.109.153` |
| A     | `@`         | `185.199.110.153` |
| A     | `@`         | `185.199.111.153` |

- The four **A** records point the bare domain (`tritonstrategies.com`) at GitHub Pages, so it works with or without `www`.
- The **CNAME** record points `www.tritonstrategies.com` at your GitHub Pages URL.
- DNS changes can take anywhere from a few minutes to ~24 hours to propagate.

**C. Back in GitHub → Settings → Pages:**
1. Under **Custom domain**, enter `www.tritonstrategies.com` and click **Save** (GitHub will re-detect the `CNAME` file — this step re-confirms it against DNS).
2. Once DNS has propagated, tick **Enforce HTTPS**. GitHub issues a free SSL certificate automatically — this can take a little while to become available.

## 5. Make the contact form actually deliver mail

GitHub Pages is static and can't run a server, so `contact.html` currently opens the visitor's email client with the message pre-filled (no setup needed — it works immediately).

To have submissions land directly in an inbox instead:

1. Go to [formspree.io](https://formspree.io) and create a free form. You'll get an endpoint that looks like `https://formspree.io/f/xxxxxxx`.
2. Open `script.js` and set:
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```
3. Also update `CONTACT_EMAIL` near the top of `script.js` to your real inbox address (used for the mailto fallback and Formspree's reply-to).
4. Commit and push — no other changes needed.

## 6. File structure

```
triton-strategies/
├── index.html
├── contact.html
├── styles.css
├── script.js
├── CNAME
└── images/
    ├── vittorio.jpg   ← replace with the close-up smiling photo
    ├── malek.jpg      ← already set (certificate photo, cropped)
    └── favicon.svg
```

## 7. What's already handled, per the brief

- Nav limited to Strategies / About / Team / Contact.
- Only Vittorio Messana and Malek Chams-Eddine appear anywhere in the site (no other names in code, metadata, or footer).
- $10M is labelled "simulated / notional capital," never "AUM."
- A dedicated disclosure states no external capital is currently managed.
- The 1.5% / 15% fee structure is framed explicitly as a *prospective* future structure, not a current fee.
- All portfolio charts are hand-built inline SVG, each flagged "Illustrative — Simulated," with no fabricated performance claims.
- Relative paths throughout, so the site works identically on GitHub Pages and on the custom domain.
