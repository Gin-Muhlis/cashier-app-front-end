'use client';

import { Icon } from '@iconify/react/dist/iconify.js'

const SearchMenu = () => {
    return (
        <div className='w-1/2 h-10 flex items-center justify-start bg-white rounded-lg px-2 py-1'>
            <input type="text" placeholder="Cari Menu" className="h-full bg-none outline-none flex-1 text-md" id='input-search-menu' />
            <Icon icon="iconoir:search" width="24" height="24" className='cursor-pointer' />
        </div>
    )
}

export default SearchMenu