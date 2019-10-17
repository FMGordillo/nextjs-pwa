import Head from "next/head";

const Layout = props => (
  <>
    <Head>
      <title>{props.title || "PWA by FMG"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Testing PWA with style" />
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
    {props.children}
  </>
);

export default Layout;
