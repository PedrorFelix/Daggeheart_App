import Link from "next/link";


export default function CardButton (name: string, ref: string, color: string, icon : string) {

    return(
        <Link
            key= {name}
            href = {ref}
            className="group relative rounded-4xl border border-solid transition-all duration-200 ease-in-out flex flex-col items-center justify-center bg-gradient-to-br backdrop-blur-sm hover:shadow-xl hover:shadow-black/15 dark:hover:shadow-white/15 hover scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full max-w-[1080px] h-[240px] sm:h-[280px] lg:h-[320px] hover:bg-white dark:hover:bg-white hover:border-opacity-75"
            style ={{
                backgroundImage: `linear-gradient(to bottom right, ${color}20, ${color}20)`,
                borderColor: color
            }}>

             <div className= "p-4 sm:p-6 lg:p-8 w-full h-full flex flex-col items-center justify-center">
                <div className= "flex-1 flex items-center justify-center mb-4 sm:mb-6 relative">
                    <div className= "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-lg group-hover:opacity-0 z-0"
                    style={{ mask: `url(${icon}) no-repeat center`,
                    maskSize: "contain",
                    WebkitMask: `url(${icon}) no-repeat center`,
                    WebkitMaskSize: "contain",
                    backgroundColor:"#ffffff",
                    transition: "all 0.2s ease-in-out"}}/>

                    <div className= "absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-175 group-hover:drop-shadow-lg z-5"
                    style={{ mask: `url(${icon}) no-repeat center`,
                    maskSize: "contain",
                    WebkitMask: `url(${icon}) no-repeat center`,
                    WebkitMaskSize: "contain",
                    backgroundColor: color,
                    transition: "all 0.2s ease-in-out"}}/>
                </div>
                <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-center
                             group-hover:text-gray-900 dark:group-hover:text-gray-900 
                             transition-colors">
                    {name}
                </h2>
            </div>
        </Link>
    )
}