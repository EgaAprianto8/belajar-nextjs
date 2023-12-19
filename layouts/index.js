import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Layout({ children, metaTitle, metaDescription }) {
  return (
    <>
      <Head>
        <title>Belajar Nextjs - {metaTitle} </title>
        <meta name="description" content={metaDescription || "Belajar Nextjs"}/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
