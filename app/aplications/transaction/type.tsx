'use client'

type Type = {
    id: number;
    type_name: string;
}

const styles = {
    item: "py-1 px-4 bg-white text-amber-300 rounded-full cursor-pointer shadow-md font-bold hover:bg-amber-300 hover:text-white transition",
    active: "py-1 px-4 bg-amber-300 text-white rounded-full cursor-pointer shadow-md font-bold hover:bg-amber-300 hover:text-white transition"
}

const Types = ({ types, selectedType, handleSelectType }: { types: Type[], selectedType: string, handleSelectType: (category: string) => boolean }) => {
    const handleClick = (category: string) => {
        handleSelectType(category)

        return true
    }
    return (
        <div className="flex flex-wrap items-center justify-start gap-3 w-full py-4 space-x-4 mb-5">
            <div onClick={() => handleClick("Semua")} className={selectedType == 'Semua' ? styles.active : styles.item}>
                Semua
            </div>
            {types.map((item, index) => (
                <div key={index} onClick={() => handleClick(item.type_name)} className={selectedType == item.type_name ? styles.active : styles.item}>
                    {item.type_name}
                </div>
            ))}
        </div>
    )
}

export default Types