import Image from "next/image";
import { NavbarDemo } from "./Components/NavbarDemo";
import { ImagesSliderDemo } from "./Components/ImagesSliderDemo";
import { ContainerTextFlipDemo } from "./Components/ContainerTextFlipDemo";
import { LayoutGridDemo } from "./Components/LayoutGridDemo";
import { AppleCardsCarouselDemo } from "./Components/AppleCardsCarouselDemo";
export default function Home() {
  return (
    <main className="relative">
        <NavbarDemo />
        <ImagesSliderDemo />
        <section className="absolute top-1/2 left-1/4 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative ">
            <ContainerTextFlipDemo />
          </div>
        </section>
      
        <section className="absolute top-[37rem] left-[5rem] sm:left-[5rem] md:left-[5rem] lg:left-[5rem] bg-white w-[90%] sm:w-[78%] md:w-[84%] lg:w-[90%] rounded-2xl">  
          <LayoutGridDemo />
          <h2 className="px-11 text-slate-700 text-3xl font-bold capitalize">UNMISSABLE EXPERIENCES</h2>
          <AppleCardsCarouselDemo />
        </section>
    </main>
  );
} 
