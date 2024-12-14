import { LuBrain } from "react-icons/lu";
import SidebarItems from "./SidebarItems";
import { FiTwitter } from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
    return (
        <div className="h-full bg-white w-72 flex flex-col relative ">

            <div className="flex items-center gap-4 text-3xl font-bold p-4 hover:cursor-pointe">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-1 text-3xl md:hidden "
                    aria-label="Close sidebar"
                >
                    <IoMdClose />
                </button>
                <div className="text-purple-999">
                    <LuBrain />
                </div>
                <h1>Second Brain</h1>
            </div>

            <div className="px-3 py-8 flex-grow">
                <SidebarItems icon={<FiTwitter />} title="Twitter" />
                <SidebarItems icon={<CiYoutube />} title="Youtube" />
            </div>
        </div>
    );
};

export default Sidebar;

