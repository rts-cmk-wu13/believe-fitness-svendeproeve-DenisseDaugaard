export default function DataErrorMessage({message, title}){
    return(
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p>{message}</p>
        </div>
    )
}