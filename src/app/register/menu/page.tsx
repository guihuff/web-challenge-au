import { FormDescription } from "@/components/formDesciption";
import Logo from "@/assets/aumenu.svg";
import { Form } from "./components/form";
import { api } from "@/services/api";

async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

export default async function Product(){
  const categories = await getCategories();


  return (
    <main className="min-h-[50vh] md:min-h-[83vh] container mx-auto p-3 flex flex-col md:flex-row md:items-center gap-4 items-center md:justify-around">
      <FormDescription 
        title={<>Cadastre um novo <span className="text-color-primary">menu</span> agora!</>}
        text="Use esse formulário para cadastrar novos produtos, você pode cadastrar uma imagem após enviar as informações básicas!"
        image={Logo}
      />
      <section className="w-full min-w-[300px] max-w-[700px]">
        <Form 
          categories={categories}
        />
      </section>
    </main>
  )

}