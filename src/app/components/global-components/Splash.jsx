import ProfileHeader from "../profil-components/ProfileHeader"

export default function Splash() {
    return(
        <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center h-screen"
        style={{ backgroundImage: "url('/images/splash-1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <ProfileHeader />
           <button className="btn flex justify-self-end mt-auto">START TRAINING</button>
        </div>
    )
}