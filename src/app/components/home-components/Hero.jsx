import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return(
         <section className="hero">
          <figure className="relative w-full h-[300px]">
            <Image
              src="/app-images/welcome.jpg"
              alt="Welcome"
              width={1400}
              height={738}
              loading="eager"
              className="brightness-50 image"
            />
          </figure>
          <div className="absolute flex flex-col justify-center font-semibold text-2xl top-[150px] left-[20px]">
            <span className="text-2xl text-[var(--primary-color)]">Welcome to</span>
            <span className="text-2xl text-[var(--primary-color)]">Believe Fitness</span>
            <div className="flex gap-4 mt-4">
              <Link href="/popular" className="btn text-sm font-semibold text-black">CLASSES</Link>
              <Link href="/login" className="btn text-sm font-semibold text-black">LOG IN</Link>
            </div>
          </div>
        </section>
    )
}