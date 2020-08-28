# GitHub: Preserve URL fragment in auth flow (browser extension)

When GitHub redirects you to auth, it'll eventually return you to your original URL, but will lose the fragment part of the URL (e.g. "#L104").  This extension preserves the URL fragment across the redirect.

Install:
- [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/github-preserve-url-fragment/)
- [Chrome Extension](https://chrome.google.com/webstore/detail/github-preserve-url-fragm/hnnmkldalhgoloejmgppbbhgbflpeknh)

## Development

### To build

```
yarn install --frozen-lockfile
yarn run build
```

(You can do `yarn run watch` to keep rebuilding as files change.)

The browser extension is built into the "dist" folder.

### To run in Firefox

1. Navigate to: about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on..."
3. Select the "manifest.json" file in this project's "dist" subfolder.

To view the extension's JS console output, click the extension's "Inspect" button.

### To run in Chrome

1. Navigate to: chrome://extensions
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select this project's "dist" subfolder.

To view the extension's JS console output, click the extension's "Inspect views background page" link.
