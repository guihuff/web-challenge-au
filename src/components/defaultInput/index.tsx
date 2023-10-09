import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

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
