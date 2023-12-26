import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/layouts"));

export default function NotesDetail({ note }) {
  // console.log("notes data => ", note);
  return (
    <div>
      <LayoutComponent metaTitle="Notes" metaDescription="Notes">
        <div className="flex-col gap-4 text-2xl flex py-4 border my-2 mx-0">
          <p className="bg-gray-200 text-gray-800 p-2 rounded-xl">
            Judul : {note?.data?.title}
          </p>
          <p className="p-2">Deskripsi : {note?.data?.description}</p>
        </div>
      </LayoutComponent>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch("https://simpeg-be.vercel.app/api/v2/notes");
    const notes = await res.json();
    const paths = notes?.data?.map((item) => ({
      params: {
        id: item.id,
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return { paths: [] };
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch(`https://simpeg-be.vercel.app/api/v2/notes/${id}`);
    const note = await res.json();
    return { props: { note }, revalidate: 10 };
  } catch (error) {
    return { props: { notes: null } };
  }
}
