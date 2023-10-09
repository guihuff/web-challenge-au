"use client"

import { Input, Select } from "@/components/defaultInput"
import { Loader } from "@/components/loader";
import { CategoryProps } from "@/interfaces/category";
import { api } from "@/services/api";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface FormProps {
  categories: CategoryProps[];
}

export function Form({ categories }: FormProps) {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceInput, setPriceInput] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>('');


  const [loading, setLoading] = useState(false);


  const handleInputPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = e.target.value.replace(/[^0-9,]/g, '');

    const dotCount = sanitizedValue.split(',').length - 1;
    if (dotCount > 1) {
      sanitizedValue = sanitizedValue.slice(0, sanitizedValue.lastIndexOf(','));
    }

    const parts = sanitizedValue.split(',');
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].slice(0, 2);
    }
    setPrice(parseFloat(parts.join('.')));
    setPriceInput(parts.join(','));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(!validate ()) {
      try {
        const response = await api.post("/products", { name, description, price, id_category: categoryId })
        if(response.status === 201){
          toast.success('Produto cadastrada com sucesso!', {
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
    return description.length > 4 ? true : false;
  };

  const validatePrice = () => {
    return price > 0 ? true : false;
  }

  const validateCategory = () => {
    return categoryId.length > 0 ? true : false;
  }

  const validate = () => {
    const result: boolean[] = [validadeName(), validateDescription(), validatePrice(), validateCategory()];
    return result.indexOf(false) === -1 ? false : true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 px-3 py-6 shadow-lg rounded-xl">
        <h2 className="text-xl">Formulário</h2>
        <Input name={"Nome"} 
          placeholder="nome do produto" 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <Input name={"Descrição"} 
          placeholder="descrição do produto" 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isRequired
        />
        <Input name={"Preço"} 
          placeholder="preço do produto" 
          type="text"
          value={priceInput}
          onChange={handleInputPriceInput}
          isRequired
        />
        <Select 
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          options={categories}
          name={"Categoria"}
          required
        />

        <button type="submit" 
          className="flex justify-center items-center h-12 mt-3 py-3 px-5 rounded-xl font-bold bg-button-primary hover:text-color-secundary hover:shadow-lg transition ease-in-out">
          {loading ? <Loader />: "Cadastrar"}
        </button>
      </div>
    </form>
  )
}