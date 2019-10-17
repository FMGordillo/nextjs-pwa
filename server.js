const express = require("express");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// const ssrCache = new cache({
//   max: 20, // not more than 20 results will be cached
//   maxAge: 1000 * 60 * 5 // 5 mins
// });

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/", (req, res) => {
      renderAndCache(req, res, "/");
    });

    server.get("/story/:id", (req, res) => {
      const queryParams = { id: req.params.id };
      renderAndCache(req, res, "/story", queryParams);
    });

    server.get("*", (req, res) => {
      if (req.url.includes("/sw")) {
        const filePath = join(__dirname, "static", "workbox", "sw.js");
        app.serveStatic(req, res, filePath);
      } else if (req.url.startsWith("static/workbox/")) {
        app.serveStatic(req, res, join(__dirname, req.url));
      } else {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`Server working on ${port}`);
    });
  })
  .catch();

async function renderAndCache(req, res, pagePath, queryParams) {
  const { url } = req;

  // if page is in cache, server from cache
  // if (ssrCache.has(url)) {
  //   res.setHeader("x-cache", "HIT");
  //   res.send(ssrCache.get(url));
  //   return;
  // }

  try {
    // if not in cache, render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // if something wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // ssrCache.set(url, html);

    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
