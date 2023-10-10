"use client"

import { CategoryProps } from '@/interfaces/category';
import { api } from '@/services/api';
import { numberInMoney } from '@/utils/numberInMoney';
import {motion} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface CategoryProductListProps {
  categories: CategoryProps[];
}

export function CategoryProductList({categories}: CategoryProductListProps) {
  const carosel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState<string>('');
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  
  useEffect(() => {
    setWidth(carosel.current!.scrollWidth - carosel.current!.offsetWidth);
  }, []);

  useEffect(() => {
    async function getProduct() {
      if (selected) {
        try{
          const response = await api.get(`/categories/${selected}`);
          setCategorySelected(response.data)
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
      }
    }
    getProduct();
  }, [selected])

  return (
    <div className='w-full overflow-hidden'>
      <motion.div ref={carosel} className='cursor-grab' 
        whileTap={{cursor: 'grabbing'}}
        drag="x"
        dragConstraints={{right:0, left: -width}}
        initial={{x: 100}}
        animate={{x: 0}}
        transition={{duration: 0.5}}
      >
        <motion.div className='flex gap-3'>
          {categories.map((category) => (
            <motion.div key={category.id}>
              <button onClick={() => setSelected(category.id)} 
                className="h-32 w-48 bg-white rounded-xl cursor-grab flex flex-col justify-start gap-3 items-start p-4 text-start ease-in-out duration-300 hover:scale-105">
                <p className='block font-bold text-lg capitalize'>
                  {category.name}
                </p>
                <p className='text-xs'>
                  {category.description}
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className='mt-4 min-h-[200px]'>
        <motion.h1 
          initial={{x: 100}}
          animate={{x: 0}}
          transition={{duration: 0.8}}
        className='font-bold text-color-primary '>{!selected ? "Selecione uma categoria" : "Produtos"}</motion.h1>
        <ul className='mt-2'>
          {selected && categorySelected?.products?.length === 0 ? <li>Não há produtos nessa categoria!</li> : 
            categorySelected && categorySelected.products &&
            categorySelected?.products.map(product => {
              return (
                <li key={product.id} className='flex flex-col sm:flex-row justify-between items-center min-h-14 bg-white rounded-xl py-3 px-6 my-3'>
                  <Link
                    href={`/product/${product.id}`}
                    className='flex flex-col items-center sm:items-start cursor-pointer ease-in-out duration-300 hover:scale-105'>
                    <h2 className='font-medium'>{product.name}</h2>
                    <p className='font-light'>{product.description}</p>
                  </Link>
                  <span className='block text-xl'>R$ {numberInMoney(product.price)}</span>
                </li>
              )
            })
          }
          
        </ul>
      </div>

    </div>
  )
}