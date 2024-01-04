import axios from 'axios'
import React from 'react'
import AddMenu from './addMenu';
import UpdateMenu from './updateMenu';
import DeleteMenu from './deleteMenu';

type Menu = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    type: {
        id: number,
        name: string
    }
    stock: {
        id: number,
        amount: number,
    }
}

type Type = {
    id: number,
    type_name: string
}



const getMenus = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`);

    return response.data.data;
}

const getTypes = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/types`);

    return response.data.data;
}


const Type = async () => {
    let types: Type[] = await getTypes();
    let menus: Menu[] = await getMenus();

    return (
        <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
            <h1 className='font-bold text-black mb-5 text-2xl'>Menu</h1>
            <AddMenu types={types} />
            <div className="rounded-md bg-white p-3 w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Menu</th>
                            <th className='text-base'>Harga</th>
                            <th className='text-base'>Gambar</th>
                            <th className='text-base'>tipe</th>
                            <th className='text-base'>stok</th>
                            <th className='text-base'>deskripsi</th>
                            <th className='text-center text-base'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu, index) => (
                            <tr key={menu.id}>
                                <td>{index + 1}</td>
                                <td>{menu.name}</td>
                                <td>{menu.price}</td>
                                <td>
                                    <img src={menu.image} alt="menu image" width={30} height={30} />
                                </td>
                                <td>{menu.type?.name ?? '-'}</td>
                                <td>{menu.stock?.amount ?? '-'}</td>
                                <td>{menu.description}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <UpdateMenu types={types} menu={menu} />
                                    <DeleteMenu {...menu} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Type