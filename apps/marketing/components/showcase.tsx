import Image from "next/image"

import HeroLight from "@/assets/hero-light.png"
import HeroDark from "@/assets/hero-dark.png"

export default function Showcase() {
  return (
    <div className="pt-20 max-w-7xl mx-auto">
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
    </div>
  )
}