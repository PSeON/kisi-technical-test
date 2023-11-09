# Kisi Technical Test

Great challenge to solve!

General information I provide in the README, but there are many comments in
the code, which give even more details.

## How to run

Building and launching apps is as simple as cloning the repo and doing:

```bash
npm install
npm run build
npm run run
```

The navigate to http://localhost:3000/ to see it.

I also added Docker configuration to build apps and prepare them for
deployment to Docker-based environments, but they are not used at the moment.

## Project structure

I use npm workspaces to manage multiple packages in a single repo.

Project consists of three parts:

### Client app

This one is located in `client` folder.

For this app I use Nuxt v3 in SSR mode (the most complicated mode, but giving
a noticeable performance boost). Styles are written in SCSS language.

I put some effort to make UX comfortable:

- Layout is responsive to better use available space on different screens.
- Layout doesn't "jump" during page loading.
- Fullscreen loading indicator is used when page data is loading.
- Progress bar helps understand how image uploading is going.
- Images are loaded in background and appear smoothly when loaded. This
  behavior works even when app JS is **not yet loaded**, check `app.vue` for
  details.
- When data loading fails, "Network error" message is shown in the corner, and
  app periodically retries to load the data.
- Same for image upload errors, but no retries are done in this case.
- Custom error pages created instead of using default ones, to keep same
  theme.

### Server app

Server app is located in `server` folder.

I use Express library to handle HTTP requests, and Multer library to handle
file uploads.

The app is built using Rollup as well. Even that building server apps is not a
common thing, I still prefer to do it because it has some very good benefints:

- Validating all the code at build time, including `node_modules`. Helping to
  catch many errors early.
- Removing unused code with tree shaking.
- All the code is bundled into a single file, which means we don't need to do
  `npm install` during deployment. Deployment is as simple as copying one
  final file, `node_modules` are not needed.

For the backend apps I prefer following MVC approach (or MC for API-only
apps). You can see it by checking folder structure of the app.

Every controller functions is wrapped to have a common place to catch errors.

I use a simple implementation of cache mechanism for articles and list of images, because reading files on every request looks wasteful. Cache lifetime is 5 seconds, which is enough to avoid file system bottleneck and still have
everything up to date.

### Shared library

In `shared` folder you can find code which is used by both server and client
applications. The code includes data models and utility functions.

I use Rollup and TypeScript to build it, and Jest to test it.
