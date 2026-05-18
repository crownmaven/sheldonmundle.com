// Edge handler for sheldonmundle.com on Cloudflare Workers (with static assets).
//
// Single job: redirect www.sheldonmundle.com → sheldonmundle.com so the apex
// is the only canonical URL Google indexes. Everything else falls through to
// the static assets in this repo.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.sheldonmundle.com") {
      url.hostname = "sheldonmundle.com";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
