"use client"
import { CategoryProps } from "@/interfaces/category";
import { MenuProps } from "@/interfaces/menu";
import { numberInMoney } from "@/utils/numberInMoney";
import { ChangeEvent, useEffect, useState } from "react";

interface ProductsMenuProps {
  menu: MenuProps;
  categories: CategoryProps[];
}

export function ProductsMenu({ menu, categories }: ProductsMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    setSelectedCategory(categories[0].id)
  }, [categories]);

  return (
    <div className="flex flex-col md:flex-row w-full p-3 gap-3">
      <aside className="w-full md:w-60 p-4 rounded-xl bg-white">
        {categories.map(item => {
          return (
            <label key={item.id} className='flex gap-3 font-semibold'>
              <input 
                type='radio' 
                name='category'
                value={item.id}
                checked={selectedCategory === item.id}
                onChange={handleRadioChange}
              />{item.name}
            </label>
          )
        })}
      </aside>
      <section className="w-full p-4 rounded-xl bg-white mt-3 md:mt-0" >
        <h1 className="font-bold uppercase mb-2">Produtos</h1>
        <ul className="w-full flex flex-col gap-3">
          {menu && menu.products ? menu.products.filter(item => item.product.category.id === selectedCategory).map(item => {
              return (
                <li key={item.product.id} className="flex flex-col md:flex-row gap-3 py-2 px-4 rounded-xl border md:items-center justify-between">
                  <div className="flex flex-col">
                    <span className="block text-lg">{item.product.name}</span>
                    <span className="block font-thin">{item.product.description}</span>
                  </div>
                  <span className="font-bold bg-button-primary flex justify-center items-center py-3 px-4 rounded-xl">R$ {numberInMoney(item.product.price)}</span>
                </li>
              )
          }) : 
            <li>O menu não foi carregado!</li>
          }
          
        </ul>
      </section>
    </div>
  )
}