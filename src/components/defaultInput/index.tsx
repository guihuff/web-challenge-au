import { CategoryProps } from '@/interfaces/category';
import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  isRequired?: boolean;
}

export function Input({ name, isRequired, ...rest }: InputProps) {
  return (
    <label className='flex flex-col text-sm my-1'>{isRequired ? `${name} *`: name} 
      <input {...rest} className='h-10 rounded-xl px-3 placeholder:text-zinc-600 focus:outline-none focus-within:shadow-lg' />
    </label>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  isRequired?: boolean;
  options: CategoryProps[];
}
export function Select({ name, isRequired, options, ...rest }: SelectProps) {
  return (
    <label className='flex flex-col text-sm my-1'>{isRequired ? `${name} *`: name} 
      <div className='h-10 rounded-xl px-3 w-full bg-white pr-4'>
        <select {...rest} className='h-full w-full bg-white focus:outline-none' >
          <option value={""}>Selecione uma categoria</option>
          {options.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
          })}
        </select>
      </div>
      
    </label>
  )
}
