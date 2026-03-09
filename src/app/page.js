import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <article>
        <section className="hero">
          <figure className="relative w-[376px] h-[275px]">
            <Image
              src="/app-images/welcome.jpg"
              alt="Welcome"
              width={1400}
              height={738}
              className="relative image drop-shadow-green-800"
            />
          </figure>
          <div className="absolute flex flex-col justify-center font-semibold text-2xl top-[150px] left-[20px]">
            <span className="text-2xl text-[var(--primary-color)]">Welcome to</span>
            <span className="text-2xl text-[var(--primary-color)]">Believe Fitness</span>
            <div className="flex gap-4 mt-4">
              <Link href="/classes" className="btn text-sm font-semibold text-black">CLASSES</Link>
              <Link href="/login" className="btn text-sm font-semibold text-black">LOG IN</Link>
            </div>
          </div>
        </section>

        <section className="p-4 my-8">

        </section>
      </article>
  );
}
