import ImageBanner from '@/assets/banner-pizza.svg'
import Image from 'next/image'

export default async function Home() {

  return (
    <main>
      <section className='w-full px-3 min-h-[400px] md:h-full'>
        <div className='w-full bg-background-secundary h-full rounded-xl flex flex-col md:flex-row justify-center items-center gap-3 py-4'>
          <div className='text-color-secundary flex flex-col gap-3 items-center md:items-start px-4 lg:px-0'>
            <h1 className='text-white text-xl lg:text-3xl lg:w-96 font-medium self-start'>VEJA O MENU ATIVO AGORA MESMO</h1>
            <p className='text-md lg:w-[450px]'>Trabalhamos com dois menus, um para o dia e um para a noite, veja o menu clicando no botão!!</p>
            <button
              className='
                text-color-primary w-36 h-10 flex items-center justify-center rounded-xl font-bold bg-button-primary
                hover:text-white transition ease-in-out
              '
            >VER MAIS</button>
          </div>
          <Image src={ImageBanner} alt="Imagem de Pizza" className='md:w-[400px] w-60' />
        </div>
      </section>

    </main>
  )
}