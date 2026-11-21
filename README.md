# Ecclesia Cooperative website

The public website is built with Next.js 16, React and TypeScript. Its pages are written in `src/app`, with shared layout and visual components in `src/components`. Site copy is maintained as reviewed source code; there is no administrator content editor or PHP API.

## Run locally

- Install dependencies with `npm install`.
- Start the development server with `npm run dev` and open `http://localhost:3000`.
- Create a production build with `npm run build` and serve it with `npm start`.

Use Node.js 20.9 or later. Deploy to a Node.js host that supports Next.js. The published phone and email details are in `src/components/site-shell.tsx`.

Set `NEXT_PUBLIC_SITE_URL` to the production origin at build time so metadata and the generated sitemap use the correct domain.

## Content and enquiries

Keep public copy concise and edit the corresponding route under `src/app`. The website does not use a database. Membership applications are sent directly by email to the cooperative, with the applicant's profile photo attached.

Copy `.env.example` to `.env.local` and provide SMTP credentials for the cooperative's email account. Set `APPLICATION_EMAIL_TO` to the inbox that should receive applications. Use the account provider's SMTP app password or other approved SMTP credential; the secret belongs in the deployment environment, not source control.

Application fields include name, phone, email, community/state, occupation, agricultural interest, a short motivation, optional experience, consent and a JPEG, PNG or WebP photo up to 1,500,000 bytes. The photo is validated by its file signature and attached to the email; submitted data is not stored by the site.

## Motion and accessibility

Scroll reveals use a small blur and vertical offset, load once, and respect reduced-motion preferences. Navigation remains usable on mobile, and page content is available if JavaScript is disabled.
