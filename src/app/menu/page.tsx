import { api } from "@/services/api";
import { ProductsMenu } from "./components/productsMenu";
import { MenuProps } from "@/interfaces/menu";


async function getMenu() {
  const response = await api.get('/menus');
  return response.data;
}

async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

export default async function Menu() {
  const menu = await getMenu() as MenuProps;
  const categories = await getCategories();

  return (
    <main className="container mx-auto my-3 md:min-h-[83vh]">
      <h1 className="px-3 my-4 text-2xl uppercase font-bold text-center text-color-primary">{`${menu.name}`}</h1>
      <ProductsMenu
        menu={menu}
        categories={categories}
      />
    </main>
  )
}
