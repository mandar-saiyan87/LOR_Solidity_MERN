import React from 'react'
import Link from 'next/link'

function LoginPage() {
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center sm:h-screen p-4">
                <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <p className='text-xl text-blue-600 font-semibold'>LOR Portal</p>
                    </div>

                    <form>
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
                                <input name="email" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                                <input name="password" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                            </div>

                        </div>

                        <div className="mt-12">
                            <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                                Login
                            </button>
                        </div>
                        <p className="text-slate-600 text-sm mt-6 text-center">Don't have an account? <Link href="/auth/register" className="text-blue-600 font-medium hover:underline ml-1">Register Here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage