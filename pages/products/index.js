import Layout from "@/layouts";

export default function Products({ products }) {
  return (
  <>
    <Layout>
      <p className="text-center text-4xl my-12">
        Product
      </p>
      <div className="flex flex-wrap flex-row gap-2 justify-center ">
      {products?.products?.map((item) => (
        <div key={item.id} className="flex-wrap gap-4 text-2xl flex py-4 border-2 rounded-3xl my-4 px-4 w-[300px] justify-center"
        >
          <p className="bg-gray-200 text-center text-gray-800 p-2 rounded-xl text-lg">
            {item.title}
          </p>
          <p className="p-2 text-sm text-center">{item.description}</p>
        </div>
      ))}
      </div>
    </Layout>
  </>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://dummyjson.com/products");
  const products = await res.json();
  return { props: { products } };
}
