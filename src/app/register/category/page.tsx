import { FormDescription } from "@/components/formDesciption";
import Logo from "@/assets/aumenu.svg";
import { Form } from "./components/form";


export default function Category(){
  return (
    <main className="min-h-[50vh] md:min-h-[83vh] container mx-auto p-3 flex flex-col md:flex-row md:items-center gap-4 items-center md:justify-around">
      <FormDescription 
        title={<>Cadastre uma nova <span className="text-color-primary">categoria</span> agora</>}
        text="Use esse formulário para cadastrar novas categorias"
        image={Logo}
      />
      <section className="w-full min-w-[300px] max-w-[700px]">
        <Form />
      </section>
    </main>
  )

}