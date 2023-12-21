import Layout from "@/layouts";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
    .then(res => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("err =>", err));
  }, []);

  return (
    <div>
      <Layout
        metaTitle="Home"
        metaDescription=" Semua Informasi ini mengenai fitur-fitur yang tersedia pada website"
      >
        <p className="text-6xl p-32">Home</p>
      </Layout>
    </div>
  );
}
