"use client"

import { Input } from "@/components/defaultInput"
import { Loader } from "@/components/loader";
import { api } from "@/services/api";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export function Form() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(!validate ()) {
      try {
        api.post("/categories", { name, description })
        toast.success('Categoria cadastrada com sucesso!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setName("");
        setDescription("");
      } catch (err) {
        toast.error('Algo deu errado!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error('Preencha todos os campos com no minimo 5 letras!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false);
  };

  const validadeName = () => {
    return name.length > 4 ? true : false;
  };

  const validateDescription = () => {
    return description.length > 4 ? true : false
  };

  const validate = () => {
    const result: boolean[] = [validadeName(), validateDescription()];
    return result.indexOf(false) === -1 ? false : true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 px-3 py-6 shadow-lg rounded-xl">
        <h2 className="text-xl">Formulário</h2>
        <Input name={"Nome"} 
          placeholder="nome da categoria" 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <Input name={"Descrição"} 
          placeholder="descrição da categoria" 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isRequired
        />
        <button type="submit" 
          className="flex justify-center items-center h-12 mt-3 py-3 px-5 rounded-xl font-bold bg-button-primary hover:text-color-secundary hover:shadow-lg transition ease-in-out">
          {loading ? <Loader />: "Cadastrar"}
        </button>
      </div>
    </form>
  )
}