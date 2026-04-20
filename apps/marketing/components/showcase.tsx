import Image from "next/image"

import HeroLight from "@/assets/hero-light.png"
import HeroDark from "@/assets/hero-dark.png"

export default function Showcase() {
  return (
    <div className="relative pt-20 max-w-7xl mx-auto">
      <Image
        alt="Hero light"
        src={HeroLight}
        className="w-full dark:hidden"
      />
      <Image
        alt="Hero dark"
        src={HeroDark}
        className="w-full hidden dark:block"
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute size-60 sm:size-96 lg:size-[600px] bg-habit-red blur-3xl opacity-30 rounded-full top-10 left-10"></div>
        <div className="absolute size-60 sm:size-96 lg:size-[600px] bg-habit-blue blur-3xl opacity-30 rounded-full bottom-0 right-10"></div>
        <div className="absolute size-60 sm:size-96 lg:size-[600px] bg-habit-green blur-3xl opacity-30 rounded-full left-10 bottom-0"></div>
        <div className="absolute size-60 sm:size-96 lg:size-[600px] bg-habit-yellow blur-3xl opacity-30 rounded-full top-20 right-20"></div>
      </div>
    </div>
  )
}