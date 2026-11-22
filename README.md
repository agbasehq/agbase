# AGBase dashboard

The Next.js dashboard manages apps and features and serves the existing chat API. The NestJS API handles Better Auth and dashboard profile and app listing requests. Use Node.js 22 for the local workspace.

Run `npm ci` and `npm run dev`. Start the NestJS API first. The default dashboard and API origins are `http://localhost:3000` and `http://localhost:3001`. Use the same hostname in the browser and both server configs.

## Local environment

Set these values in `.env.local`. The frontend and API need to use the same application MongoDB database and Qdrant collection.

```dotenv
MONGO_URL=
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION=
GEMINI_API_KEY=
GEMINI_GENERATION_MODEL=gemini-3.5-flash-lite
APP_KEY_SECRET=
DATA_ENCRYPTION_KEY=
AGBASE_API_ORIGIN=http://localhost:3001
NEXT_PUBLIC_AGBASE_APP_KEY=
```

`GEMINI_API_KEY` powers embeddings. Each app supplies its own Gemini key for generation. Set GEMINI_GENERATION_MODEL if your project uses a different Gemini model with text and image input support. Use a stable secret for `APP_KEY_SECRET` and a stable 32-byte hexadecimal value for `DATA_ENCRYPTION_KEY`. Existing keys and encrypted data depend on those values. `NEXT_PUBLIC_AGBASE_APP_KEY` is the embeddable key for the dashboard widget.

The legacy NextAuth route also reads `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, and `GITHUB_SECRET`. Legacy profile image uploads use the Cloudinary settings listed in the API README.

## Auth origins

Set `AGBASE_WEB_ORIGIN` on the API to the dashboard origin. For direct Better Auth, set `BETTER_AUTH_URL` on the API to its public origin. Set `NEXT_PUBLIC_AGBASE_AUTH_URL` in the dashboard at build time if the direct auth URL differs from `http://localhost:3001/api/auth`. The auth cookie must be available to the dashboard host.

For distinct hosts, set `NEXT_PUBLIC_AGBASE_PROXY_AUTH=true` at build time. Register the dashboard callback URLs with paths `/api/dashboard/auth/callback/google` and `/api/dashboard/auth/callback/github`. The same-origin rewrites use `AGBASE_API_ORIGIN`.

## Linked SDK development

Build the SDK before starting the dashboard with `npm run dev:linked`. This uses Next.js Webpack development mode so an SDK linked outside the dashboard directory resolves correctly. Use the SDK's `npm run dev` watcher while Next.js is running. A clean SDK build temporarily removes `dist`.

## Local checks

- `npm run lint` and `npx tsc --noEmit` check the dashboard.
- `npm run build` builds a normal install. With a linked SDK use `npm run build -- --webpack`.
- Test email and OAuth sign-in and sign-out. Check the dashboard at phone and desktop widths.
- Use two test accounts and a disposable app to verify create, list, detail, edit, delete confirmation and ownership isolation. Edit features without replacing the Gemini key, then verify the widget still responds.
- Check text and image-only chat, interruption and error recovery. Verify the React, Next.js and script-tag examples with the SDK build being tested.
