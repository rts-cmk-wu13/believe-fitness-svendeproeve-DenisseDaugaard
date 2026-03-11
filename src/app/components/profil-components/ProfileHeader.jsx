import Image from "next/image";

export default function ProfileHeader({ firstname, lastname, role }) {
    return(
        <section className="py-8 flex gap-8 items-center">
            <figure>
                <Image 
                src="/app-images/user.svg" 
                alt="Profile Picture" 
                width={60} 
                height={60} 
                className="rounded-full" />
            </figure>
                <div>
                    <h2 className="text-xl font-semibold">{firstname} {lastname}</h2>
                    <p className="text-gray-600">{role}</p>
                </div>
        </section>
    )
}