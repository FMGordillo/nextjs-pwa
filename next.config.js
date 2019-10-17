const withSass = require("@zeit/next-sass");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const NextWorkboxPlugin = require("next-workbox-webpack-plugin");

module.exports = withSass({
  webpack(config, { isServer, buildId, dev }) {
    if (!isServer && !dev) {
      // TODO: Change
      const workboxOptions = {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: [".next/static/*", ".next/static/commons/*"],
        modifyUrlPrefix: {
          ".next": "/_next"
        },
        runtimeCaching: [
          {
            urlPattern: "/",
            handler: "networkFirst",
            options: {
              cacheName: "html-cache"
            }
          },
          {
            urlPattern: /[^3]\/movie\//,
            handler: "networkFirst",
            options: {
              cacheName: "html-cache"
            }
          },
          {
            urlPattern: new RegExp("^https://api.hackerwebapp.com/news"),
            handler: "staleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: "cacheFirst",
            options: {
              cacheName: "image-cache",
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      };

      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions
        }),
        new WebpackPwaManifest({
          filename: "static/manifest.json",
          name: "Next PWA",
          short_name: "Next-PWA",
          description: "A Movie browsing PWA using Next.js and Google Workbox",
          background_color: "#ffffff",
          theme_color: "#5755d9",
          display: "standalone",
          orientation: "portrait",
          fingerprints: false,
          inject: false,
          start_url: "/",
          ios: {
            "apple-mobile-web-app-title": "Next-PWA",
            "apple-mobile-web-app-status-bar-style": "#5755d9"
          },
          includeDirectory: true,
          publicPath: ".."
        })
      );
    }
    return config;
  }
});
