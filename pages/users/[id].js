import Layout from "@/layouts"
import { useRouter } from "next/router";

export default function UsersByName() {
  const router = useRouter()
  const { id } = router?.query

  return(
    <Layout>
      <p className="text-6xl p-32">Users By Name {id}</p>
    </Layout>
  );
}