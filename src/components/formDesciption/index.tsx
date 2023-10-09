import Image from "next/image";
import { ReactNode } from "react";

interface FormDescriptionProps{
  title: ReactNode;
  text: string;
  image: string;
}

export function FormDescription ({
  title,
  text,
  image
}: FormDescriptionProps) {
  return (
    <aside className="w-full min-w-[300px] max-w-[450px] flex flex-col items-center md:items-start mt-3 md:mt-0 ">
      <h1 className="text-3xl text-center font-black md:text-left">{title}</h1>
      <p className="text-base text-center mt-3 md:text-left">{text}</p>
      <Image src={image} alt="logo au menu" quality={100} className="w-60 hidden md:block mt-5 self-center" />
  </aside>
  )
}