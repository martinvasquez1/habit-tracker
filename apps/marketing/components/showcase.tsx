import Image from "next/image"

import WhiteImage from "@/assets/showcase-white.png"

export default function Showcase() {
  return (
    <div className="pt-20 max-w-7xl mx-auto">
      <Image
        alt=""
        src={WhiteImage}
        className="w-full"
      />
    </div>
  )
}