import React from 'react'
import Link from 'next/link'

function UnauthorizedPage() {
    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-lg font-semibold text-indigo-400">401</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Unauthorized</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, You are not authorized to access this page and content.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/auth/login" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Go to Login</Link>
                    <Link href="#" className="text-sm font-semibold text-white">Contact support <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </main>
    )
}

export default UnauthorizedPage