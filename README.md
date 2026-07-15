# Hegland's Creative Landscapes — Website

A single-page marketing site for Hegland's Creative Landscapes (Rochester, MN hardscaping & landscaping). Plain HTML/CSS/JS — no build step, no framework, works on any static host.

## Structure
```
index.html       All page content/sections
css/styles.css   All styling (earthy/natural palette, responsive)
js/main.js       Nav toggle, scroll reveal animations, form submission
```

## Before launch — 3 things to finish

1. **Estimate forms (there are TWO).** Both the hero card form and the main contact form post to Formspree and need a real form ID.
   - Create a free account at formspree.io, make a new form, copy the endpoint.
   - In `index.html`, replace **both** occurrences of `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with the real ID (one form ID works for both — the `_subject` hidden field tells you which form the lead came from).
   - Until this is done, submissions will show Formspree's setup message instead of delivering leads.

2. **Photos.** The site currently uses real project photos pulled from the client's existing site (hcl2003.com) — confirm with the client these are the shots she wants, and swap in higher-resolution originals if she has them (the six service-card images are only ~400px wide). All images live in `images/`.

3. **Social links.** Facebook and Houzz icons in the Contact section currently link to `#`. Update those `href` values once you confirm the exact profile URLs.

4. **Placeholder reviews.** Two of the three testimonials are marked "Placeholder review — swap in a real one." Replace them with real client quotes when available.

## Deploying
No build step is required — any static host works:
- **Netlify**: drag the project folder onto app.netlify.com/drop, or connect a repo.
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch.
- **Any shared host**: upload the files via FTP/cPanel to the domain's public root.

## Notes
- The two testimonials marked "Placeholder Review" are examples for layout purposes — swap in real client reviews when available.
- Colors, fonts, and spacing are controlled by CSS custom properties at the top of `css/styles.css` (`:root`) if the client wants to adjust the palette later.
