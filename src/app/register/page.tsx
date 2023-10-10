import Image from "next/image";
import Link from "next/link";

import ImageProduct from '@/assets/hamburger-pana.svg';
import ImageCategory from '@/assets/shopping-amico.svg';
import ImagemMenu from '@/assets/food-pana.svg';

export default function Register () {
  return (
    <main className="container mx-auto p-3 min-h-[50vh] md:min-h-0">
      <h1 className="font-black text-2xl">
        Escolha o que deseja cadastrar
      </h1>
      <nav className="flex flex-col gap-4 my-4 md:flex-row md:gap-20">

        <Link href={"/register/product"} className="relative h-32 flex items-center w-52 p-4 rounded-xl bg-background-secundary transition ease-in-out text-xs hover:scale-105">
          <span className="text-2xl font-medium text-color-secundary">Produtos</span>
          <Image src={ImageProduct} alt="Imagem de produtos" className="w-36 h-28 absolute -right-16"/>
        </Link>
        <Link href={"/register/category"} className="relative h-32 flex items-center w-52 p-4 rounded-xl bg-color-secundary transition ease-in-out text-xs hover:scale-105">
        <span className="text-2xl font-medium text-color-primary">Categorias</span>
          <Image src={ImageCategory} alt="Imagem de produtos" className="w-36 h-28 absolute -right-16"/>
        </Link>
        <Link href={"/register/menu"} className="relative h-32 flex items-center w-52 p-4 rounded-xl bg-button-primary transition ease-in-out text-xs hover:scale-105">
        <span className="text-2xl font-medium text-color-primary">Menus</span>
          <Image src={ImagemMenu} alt="Imagem de produtos" className="w-36 h-28 absolute -right-12"/>
        </Link>
      </nav>
      
    </main>
  )
}