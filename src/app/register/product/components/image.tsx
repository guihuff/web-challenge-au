/* eslint-disable @next/next/no-img-element */
"use client"

import { Input } from "@/components/defaultInput";
import { Loader } from "@/components/loader";
import { api } from "@/services/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface ImageProps {
  id: string;
  onReturn: () => void;
}

export function SendImage ({ id, onReturn }: ImageProps) {
  const [imageFile, setImageFile] = useState<Blob>();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const removeImage = () => {
    setImageFile(undefined);
    setSelectedImage('');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(imageFile) {
      try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', imageFile);
        const response = await api.patch('/products/image', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
        if(response.status === 200){
          toast.success('Imagem enviada com sucesso!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          removeImage();
          onReturn();
        }
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
      toast.error('Adicione uma imagem!', {
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

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/products/${id}`)
      toast.success('Produto deletado com sucesso!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      removeImage();
      onReturn();
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
    setLoading(false);
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {

      const file = e.target.files[0];

      if (file) {
        setImageFile(file);
        const reader = new FileReader();

        reader.onload = (e) => {
          if(e && e.target && e.target.result) {
            setSelectedImage(e.target.result as string);
          }
          
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <button 
          type="button"
          onClick={handleDelete}
          className="w-24 mb-4 py-3 px-5 bg-red-400 rounded-xl hover:text-color-secundary hover:shadow-lg transition ease-in-out">
          {loading ? <Loader />: "Excluir"}
        </button>
        <h2 className="text-xl">Formulário Imagem</h2>
          <Input type="file" label="Imagem" onChange={handleImageChange} />
          {selectedImage && <img src={selectedImage} alt="Prévia da imagem" className="w-72 h-48 object-contain rounded-xl" />}
        <button type="submit" 
          className="flex w-full justify-center items-center h-12 mt-3 py-3 px-5 rounded-xl font-bold bg-button-primary hover:text-color-secundary hover:shadow-lg transition ease-in-out">
          {loading ? <Loader />: "Salvar"}
        </button>
    </form>
  )
}