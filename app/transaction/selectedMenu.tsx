import React from 'react'

const SelectedMenu = () => {
    return (
        <div className="flex flex-col gap-4 w-full h-2/5 overflow-y-scroll selected-menus pr-2 mb-4">
            <div className="flex items-start justify-start gap-2 w-full">
                <div className="w-12 h-12 bg-amber-300 rounded-sm"></div>
                <div className='flex-1'>
                    <h4 className='text-md font-bold'>Jus Jeruk</h4>
                    <div className="flex items-center justify-between w-full text-md">
                        <span>x2</span>
                        <span className="text-slate-400">Rp. 30.000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedMenu