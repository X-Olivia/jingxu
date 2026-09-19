# Decap CMS deployment setup

The public site remains static on GitHub Pages. Decap writes Markdown to
`X-Olivia/My_Website` through GitHub's API, and the existing deployment
workflow rebuilds the site after each commit.

## 1. Deploy the OAuth proxy

GitHub Pages cannot store an OAuth client secret. Use the community-maintained
[decap-proxy](https://github.com/sterlingwes/decap-proxy) Cloudflare Worker:

```sh
git clone https://github.com/sterlingwes/decap-proxy.git
cd decap-proxy
cp wrangler.toml.sample wrangler.toml
npx wrangler login
npx wrangler deploy
```

Keep the resulting URL, for example:

```text
https://jing-decap-oauth.<your-cloudflare-subdomain>.workers.dev
```

For a private GitHub repository, set `GITHUB_REPO_PRIVATE = 1` in the proxy's
`wrangler.toml` before deployment.

## 2. Create the GitHub OAuth app

Open [GitHub's new OAuth app page](https://github.com/settings/applications/new)
and configure:

- Application name: `Jing Decap CMS`
- Homepage URL: the Cloudflare Worker URL
- Authorization callback URL: `<WORKER_URL>/callback`

Copy the generated Client ID and Client Secret. Add both to the Worker as
encrypted secrets:

```sh
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
npx wrangler deploy
```

Never add either value to this repository or to `public/admin/config.yml`.

## 3. Connect Decap to the Worker

In `public/admin/config.yml`, replace:

```yaml
base_url: https://REPLACE-WITH-YOUR-WORKER.workers.dev
```

with the deployed Worker URL. Do not append `/auth`; `auth_endpoint: /auth`
already supplies that path.

Commit and push the change to the `main` branch of `X-Olivia/My_Website`.
After GitHub Pages finishes deploying, open:

```text
https://x-olivia.github.io/My_Website/admin/
```

Only GitHub users with write access to `X-Olivia/My_Website` can publish.

## 4. Optional local CMS

The configuration enables Decap's local backend. To edit without GitHub OAuth,
run the proxy in a second terminal:

```sh
npx decap-server
```

Then run the Astro development server and open:

```text
http://localhost:4321/admin/
```

Local publishing writes Markdown directly to `src/content/blog`. Images are
written to `public/uploads`.
