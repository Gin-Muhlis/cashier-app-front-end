'use client'

type Menu = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const handleDescription = (string: string) => {
    const limit = 15
    const words = string.split(' ')
    const truncated = words.slice(0, limit).join(' ')

    return words.length > limit ? `${truncated}...` : truncated
}

const handleFormatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}


const Menus = ({ menus, type }: { menus: Menu[], type: string }) => {
    return (
        <div className='border border-solid'>
            <h2 className='text-black text-2xl font-bold mb-5'>{type} Menu</h2>
            <div className="w-full flex gap-6 md:gap-10 flex-wrap items-start justify-start">
                {menus.map((item, index) => (
                    <div key={index} className="card card-compact basis-2/5 bg-base-100 shadow-xl">
                        <figure className="shadow h-44"><img className="w-full h-full object-cover" src={item.image} alt="Menu Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{item.name}</h2>
                            <p className='mb-2 h-16'>{handleDescription(item.description)}</p>
                            <span className='italic text-lg text-amber-400 font-semibold mb-3'>{handleFormatPrice(item.price)}</span>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm bg-amber-300 capitalize">Pilih Menu</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menus