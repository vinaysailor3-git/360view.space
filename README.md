# 360 View

This repository is a static multi-site project. Cloudflare Workers deploys the generated `dist/` folder, and each folder with an `index.html` becomes a separate site path.

| Folder | Public URL |
| --- | --- |
| `alpha/` | `https://YOUR-DOMAIN/alpha/` |
| `beta/` | `https://YOUR-DOMAIN/beta/` |
| `gamma/` | `https://YOUR-DOMAIN/gamma/` |

## Add another site

1. Create a new folder at the repository root, for example `client-name/`.
2. Put that site's `index.html` and all of its assets inside the same folder.
3. Use relative paths for assets, for example `img/logo.png` rather than `/img/logo.png`.
4. Commit and push. It will be available at `/client-name/` after Cloudflare deploys, and the homepage will add it automatically.

## Cloudflare Workers setup

Connect this GitHub repository in Cloudflare Workers Builds and use these settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

No dependencies are needed. The build script copies only public site files to `dist/`, detects each top-level folder containing an `index.html`, and generates the homepage links. This prevents Git metadata from being uploaded. Connect your custom domain in the Worker's **Settings > Domains & Routes** after the first deployment.
