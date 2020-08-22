/**
 * The first step in SAML login is https://github.com/.../saml/initiate?return_to=...
 * The "return_to" is the URL of the previous page, but it's missing the fragment.  All
 * we do is intercept that request (via an onBeforeRequest listener) and modify "return_to"
 * to include the fragment.
 *
 * I couldn't figure out how to easily determine the previous URL in onBeforeRequest,
 * so we keep track of the last seen URL (with a fragment) in lastUrlByTabId.
 */

const SAML_REDIRECT_PATH_RE = new RegExp('^/orgs/[^/]+/saml/initiate$');

type UrlWithFragment = {beforeFragment: string, fragment: string};
const lastUrlByTabId: Map<number, UrlWithFragment> = new Map();

chrome.webRequest.onBeforeRequest.addListener(details => {
    const lastUrl = lastUrlByTabId.get(details.tabId) ?? null;
    lastUrlByTabId.delete(details.tabId);

    const url = new URL(details.url);

    // If we see a SAML redirect, fix the "return_to" query parameter to include the fragment.
    if (SAML_REDIRECT_PATH_RE.test(url.pathname)) {
        console.debug("/saml/initiate", {details, lastUrl});
        if (lastUrl === null) {
            console.debug("- no lastUrl");
            return;
        }
        const returnTo = url.searchParams.get('return_to');
        if (returnTo !== lastUrl.beforeFragment) {
            console.debug("- return_to doesn't match lastUrl", {returnTo, lastUrl});
            return;
        }
        url.searchParams.set('return_to', returnTo + lastUrl.fragment);
        return {redirectUrl: url.toString()};
    }
    // If there's a URL fragment, save the URL in lastUrlByTabId in case we see /saml/initiate.
    // Arguably, this should be in onComplete instead of onBeforeRequest, but one listener is
    // less wasteful.
    else if (url.hash !== '') {
        const splitUrl = {
            beforeFragment: details.url.substring(0, details.url.length - url.hash.length),
            fragment: url.hash,
        };
        console.debug("Got URL with fragment; saving.", {tabId: details.tabId, splitUrl});
        lastUrlByTabId.set(details.tabId, splitUrl);
    }
}, {urls: ["https://github.com/*"], types: ['main_frame']}, ['blocking']);

// If a tab is removed, remove its 'lastUrlByTabId' entry so we don't leak memory.
chrome.tabs.onRemoved.addListener((tabId) => {
    lastUrlByTabId.delete(tabId);
});
