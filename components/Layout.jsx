import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

const Layout = props => {
  const [back, setBack] = useState(false);
  Router.events.on("routeChangeComplete", url => {
    if (url === "/") setBack(false);
    else setBack(true);
  });
  return (
    <>
      <Head>
        <title>{props.title || "PWA by FMG"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Testing PWA with style" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <>
        {back && <button onClick={() => Router.back()}>Back</button>}
        {props.children}
      </>
    </>
  );
};

export default Layout;
