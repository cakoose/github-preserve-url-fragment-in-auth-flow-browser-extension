# GitHub: Preserve URL fragment in auth flow (browser extension)

When you visit a GitHub URL, GitHub might first send you through an auth flow, then redirect back to your original URL.

The problem: if your URL includes a URL fragment (e.g. "#L104"), that part gets lost.

This is a tiny browser extension that fixes that problem.

I have tested on Chrome.  Apparently Firefox supports the same browser extension APIs, so this might work on Firefox unmodified.

## To build

```
yarn install --frozen-lockfile
yarn run build
```

(You can do `yarn run watch` to keep rebuilding as files change.)

The browser extension is built into the "dist" folder.

## To run in Chrome

1. Go to "chrome://extensions"
2. Enable "Developer mode" (top right)
3. Click "Load unpacked".
4. Select this project's "dist" subfolder.

To view the extension's JS console output, click on the extension's "Inspect views background page" link.
