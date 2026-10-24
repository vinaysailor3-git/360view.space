# 360 View

This repository is a static multi-site project. Cloudflare Pages serves the repository root, and each folder with an `index.html` becomes a separate site path.

| Folder | Public URL |
| --- | --- |
| `alpha/` | `https://YOUR-DOMAIN/alpha/` |
| `beta/` | `https://YOUR-DOMAIN/beta/` |

## Add another site

1. Create a new folder at the repository root, for example `client-name/`.
2. Put that site's `index.html` and all of its assets inside the same folder.
3. Use relative paths for assets, for example `img/logo.png` rather than `/img/logo.png`.
4. Add a card for it in the root `index.html`.
5. Commit and push. It will be available at `/client-name/` after Cloudflare deploys.

## Cloudflare Pages setup

Create a Cloudflare Pages project from this GitHub repository and use these settings:

- Framework preset: **None**
- Build command: `exit 0`
- Build output directory: `.`

No Node.js dependencies or build step are needed. Connect your custom domain in the Pages project's **Custom domains** settings after the first deployment.
