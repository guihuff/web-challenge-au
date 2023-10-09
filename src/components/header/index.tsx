import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../../public/aumenu.svg'

export function Header() {

  return (
  <header className='container m-auto'>
    <div className=' bg-background-secundary flex h-16 m-3 rounded-xl items-center justify-start px-8 gap-5'>
      <button className='hidden sm:block'>
        <Image src={Logo} alt='logo principal AU menu' width={30}/>
      </button>
      <nav className='flex gap-2 text-white justify-center'>
        <Link href='/menu'>
          <span className=' sm:leading-8 px-1 hover:decoration-1 hover:underline transition-all ease-in-out'>menu</span>
        </Link>
        <Link href='/'>
          <span className=' sm:leading-8 px-1 hover:decoration-1 hover:underline transition-all ease-in-out'>produtos</span>
        </Link>
      </nav>
      
      <Link 
        href={"/register"}
        className='ml-auto bg-button-primary py-2 px-3 rounded-xl font-medium hover:text-color-secundary transition ease-in-out text-xs md:text-sm'>
        Formulários
      </Link>
    </div>
  </header>
  )
}