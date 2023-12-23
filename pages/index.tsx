import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("err =>", err));
  }, []);

  return (
    <div>
      <LayoutComponent
        metaTitle="Home"
        metaDescription=" Semua Informasi ini mengenai fitur-fitur yang tersedia pada website"
      >
        <div className="flex flex-row">
          <p className="text-6xl p-32">Home</p>
          <Image
            src="/next.png" width={400} height={400} 
            alt="next image" className="object-cover"
          />
        </div>
      </LayoutComponent>
    </div>
  );
}
