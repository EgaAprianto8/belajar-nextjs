import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/layouts"));
import Link from "next/link";

export default function Notes({ notes }) {
  console.log("notes data => ", notes);
  return (
    <div>
      <LayoutComponent metaTitle="Notes" metaDescription="Notes">
        {notes?.data?.map((item) => (
          <Link key={item.id} href={`/notes/${item.id}`}>
          <div
            className="flex-row gap-4 text-2xl flex py-4 border my-2 mx-0"
          >
            <p className="bg-gray-200 text-gray-800 p-2 rounded-xl">
              {item.title}
            </p>
            <p className="p-2">{item.description}</p>
          </div>
          </Link>
        ))}
      </LayoutComponent>
    </div>
  );
}

export async function getStaticProps() {
try{
  const res = await fetch("https://simpeg-be.vercel.app/api/v2/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
} catch (error) {
  return { props: {notes:null}}
}

}
