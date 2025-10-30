import Link from 'next/link';

export default function NotFound() {
    return(
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold text-white mb-4'>404</h1>
                <p className='text-2xl text-gray-300 mb-8'>Page Not Found</p>
                <Link
                    href="/"
                    className='inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors'
                    >Return Home
                </Link>
            </div>
        </div>
    );
}