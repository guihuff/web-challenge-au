'use client'

import { Input, Select } from '@/components/defaultInput'
import { Loader } from '@/components/loader';
import { CategoryProps } from '@/interfaces/category';
import { CreateMenuProps } from '@/interfaces/menu';
import { api } from '@/services/api';
import { numberInMoney } from '@/utils/numberInMoney';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FormProps {
  categories: CategoryProps[];
}

interface ProductsProps {
  id: string;
  name: string;
}

export function Form({ categories }: FormProps) {
  
  const [name, setName] = useState('');
  const [time, setTime] = useState<string>('');
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(!validate ()) {
      try {
        const menu: CreateMenuProps = {
          name,
          time,
          isActive: true,
          products: products.map(item => { return { id_product: item.id } as { id_product: string }})
        }
        const response = await api.post('/menus', menu);
        if(response.status === 201){
          toast.success('Produto cadastrada com sucesso!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          clearForms();
        }
      } catch (err) {
        toast.error('Algo deu errado!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      toast.error('Preencha todos os campos!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    setLoading(false);
  };

  const clearForms = () => {
    setName('');
    setTime('');
    setProducts([]);
    setCategoryId('');
    setCategorySelected(undefined);
  }

  const validadeName = () => {
    return name.length > 4 ? true : false;
  };

  const validadeTime = () => {
    return time ? true : false;
  };

  const validadeProducts = () => {
    return products.length > 0 ? true : false;
  };

  const validate = () => {
    const result: boolean[] = [validadeName(), validadeTime(), validadeProducts()];
    return result.indexOf(false) === -1 ? false : true;
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    async function getProduct() {
      if (categoryId) {
        try{
          const response = await api.get(`/categories/${categoryId}`);
          setCategorySelected(response.data)
        } catch (err) {
          toast.error('Algo deu errado!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }
    }
    getProduct();
  }, [categoryId]);

  const handleAddProduct = (product: ProductsProps) => {
    const alreadyExists = products.some((item) => item.id === product.id);
    if (alreadyExists){
      return;
    }
    setProducts([...products, product]);
  }

  const handleRemoveProduct = (id: string) => {
    const newList = products.filter((item) => item.id !== id);
    setProducts(newList);
  }

  return (
      <div className='flex flex-col gap-3 px-3 py-6 shadow-lg rounded-xl'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-xl'>Formulário</h2>
            <Input label={'Nome'} 
              placeholder='nome do menu' 
              type='text' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />
            <div className='flex flex-col justify-start gap-2 items-start'>
              <span>Período *</span>
              <label className='flex gap-3'>
                <input 
                  type='radio' 
                  name='time'
                  value='DAY'
                  checked={time === 'DAY'}
                  onChange={handleRadioChange}
                />Dia
              </label>
              <label className='flex gap-3'>
              <input 
                type='radio' 
                name='time'
                value='NIGHT'
                checked={time === 'NIGHT'}
                onChange={handleRadioChange}
              />
              Noite
              </label>
            </div>
            <Select 
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              options={categories}
              name={'Selecione uma categoria de produtos'}
            />
            <ul className='h-56 mt-3 bg-white rounded-xl py-3 px-2 flex flex-col gap-3 overflow-y-auto'>
            {
              categorySelected && categorySelected.products && categorySelected.products?.length > 0 ?
                categorySelected.products.map(item => {
                  return (
                  <li key={item.id} className='w-full flex justify-between px-3 py-2 bg-color-secundary items-center rounded-xl'>
                  <div className='flex flex-col'>
                    <span className='text-xs font-bold'>{item.name}</span>
                    <span className='text-xs'>{item.description}</span>
                  </div>
                  <span className='block ml-auto mr-4'>R$ {numberInMoney(item.price)}</span>
                  <button
                    className='w-7 h-7 rounded-xl flex items-center justify-center bg-button-primary hover:text-color-secundary hover:scale-105 transition ease-in-out'
                    type='button'
                    onClick={() => handleAddProduct({ id: item.id, name: item.name})}
                  >
                    +
                  </button>
                </li>
                )})
              :
              !categoryId ? <li>Selecione uma categoria</li> : <li>Não há produtos nessa categoria</li>
            }
            </ul> 
            <ul className='h-52 mt-3 bg-white rounded-xl py-3 px-2 flex flex-col gap-3 overflow-y-auto'>
              <li>Produtos adicionados</li>
              {products.map(item => {
                  return (
                  <li key={item.id} className='w-full flex justify-between px-3 py-2 bg-color-secundary items-center rounded-xl'>
                  <span className='block text-xs font-bold'>{item.name}</span>
                  <button
                    className='w-7 h-7 rounded-xl flex items-center justify-center bg-red-400 hover:text-color-secundary hover:scale-105 transition ease-in-out'
                    type='button'
                    onClick={() => handleRemoveProduct(item.id)}
                  >
                    -
                  </button>
                </li>
                )})}
            </ul>
            
            <button type='submit' 
              className='flex w-full justify-center items-center h-12 mt-3 py-3 px-5 rounded-xl font-bold bg-button-primary hover:text-color-secundary hover:shadow-lg transition ease-in-out'>
              {loading ? <Loader />: 'Cadastrar'}
            </button>
          </form>
      </div>
  )
}