import {LogoutAction} from "./logOutAction";

export default function LogOutBtn() {
     return(
        <form className="flex justify-center mt-6" action={LogoutAction}>
           <button className="p-2" type="submit">Log out</button>
        </form>
    )

}