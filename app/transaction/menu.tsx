import React from 'react'

const Menus = () => {
    return (
        <div className='border border-solid'>
            <h2 className='text-black text-2xl font-bold mb-5'>Kopi Menu</h2>
            <div className="w-full flex gap-6 md:gap-10 flex-wrap items-start justify-start">

                <div className="card card-compact basis-2/5 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">Jus Jeruk</h2>
                        <p className='mb-2'>Minuman yang sangat segar diminum dengan jeruk yang sangat orange</p>
                        <span className='italic text-lg text-amber-400 font-semibold mb-3'>Rp. 15.000</span>
                        <div className="card-actions justify-end">
                            <button className="btn btn-sm bg-amber-300 capitalize">Pilih Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menus