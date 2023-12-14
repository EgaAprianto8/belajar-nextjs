import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout() {
 return (
  <div>
   <Head>
    <title>Belajar Nextjs</title>
    <meta
     name="description"
     content="belajarnextjs"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Header />
   <div className="text-6xl p-32 ">
   <p>Content</p>
   </div>
   <Footer />
  </div>
 );
}