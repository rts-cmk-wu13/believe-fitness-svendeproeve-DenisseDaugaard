import Link from "next/link";
import ErrorMessage from "@/app/components/errors/ErrorMesage";

export default function NoAccessPage() {
    return(
        <ErrorMessage 
            title="No Access" 
            message="To access this content, you must log in" 
            href="/login" 
            linkText="Go to login page" 
        />
    )
}
