import { ReactElement } from 'react'

interface SidebarItemsProps {
    icon: ReactElement,
    title: string
}
const SidebarItems = ({ icon, title }: SidebarItemsProps) => {
    return (
        <div className='flex items-center gap-2 text-xl text-gray-600 font-semibold cursor-pointer mb-5 hover:bg-gray-100 px-2 py-1 hover:rounded-md'>

            {icon} {title}

        </div>
    )
}

export default SidebarItems
