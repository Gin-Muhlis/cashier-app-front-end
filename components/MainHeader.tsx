import Link from 'next/link'
import React from 'react'

const MainHeader = () => {
    return (
        <>
            <div className="navbar bg-red-600 text-white">
                <div className="flex-1">
                    <Link href="/" className="text-xl font-bold italic">Techno Cafe</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li>
                            <details>
                                <summary>
                                    Data Master
                                </summary>
                                <ul className="p-2 bg-base-100 text-black">
                                    <li><Link href="/category">Category</Link></li>
                                    <li><Link href="/product">Product</Link></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default MainHeader