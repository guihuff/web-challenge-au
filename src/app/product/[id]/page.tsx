import { BaseProductProps } from "@/interfaces/product";
import { api, baseURL } from "@/services/api";
import { numberInMoney } from "@/utils/numberInMoney";
import Image from "next/image";

interface ProductIdProps {
  params: {
    id: string;
  }
}

async function getProduct(id: string) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}



export default async function ProductId ({ params }: ProductIdProps) {
  const product: BaseProductProps = await getProduct(params.id);
  
  return (
    <main className="container mx-auto my-3 p-3 md:min-h-[83vh]">
      <section className="w-full flex flex-col bg-white rounded-xl p-4 min-h-[200px] items-center lg:flex-row lg:justify-around lg:gap-4">
        <article className="flex flex-col items-start gap-4">
          <h1 className="font-black uppercase text-3xl text-center text-color-primary">
            {product.name}
          </h1>
          <h4 className="text-base text-center text-zinc-800" >
            {product.description}
          </h4>          
        </article>
        <div className="flex flex-col justify-around gap-4 mt-2 items-center">
          {product.image && 
            <Image src={`${baseURL}/products/image/${product.image}`} width={400} height={300} alt="Imagem do produto" 
              className="rounded-xl object-cover"
            />
          }
          <h2 className="text-center w-80 text-zinc-800 bg-color-secundary leading-[55px] rounded-xl text-xl" >
            {product.category?.name}
          </h2>
          <h3 className="w-80 text-center leading-[60px] bg-background-secundary text-white text-2xl rounded-xl font-bold">R$ {numberInMoney(product.price)}</h3>
        </div>
      </section>
    </main>
  )
}