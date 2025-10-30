export default function LoadingAnimation({ message = "Loading ..."}: {message?: string}){
    return(
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-gray-300 text-lg">{message}</p>
        </div>
    );
}