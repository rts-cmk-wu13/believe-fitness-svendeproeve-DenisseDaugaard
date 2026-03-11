export function LoginHeader() {
    return(
        <header>
            <h1 className="text-4xl font-bold text-[var(--primary-color)] w-[50%] px-8">Believe Fitness</h1>
            <div className="flex items-center gap-2 mt-4">
               <div className="h-[2px] w-[20px] bg-black"></div> <span className="font-semibold">Train like a pro</span>
            </div>
        </header>
    )
}