import { useState } from "react";
import Button from "../components/Buttons/Button";
import { FaPlus } from "react-icons/fa6";
import { IoMdShare, IoMdClose } from "react-icons/io";
import Card from "../components/Cards/Card";
import CreateContentModal from "../components/modals/CreateContentModal";
import Sidebar from "../components/Sidebar/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">

            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 md:z-0`}
            >
                <Sidebar onClose={toggleSidebar} />
            </div>


            <div className="flex-1 flex flex-col overflow-hidden">

                <div className="sticky top-0 bg-gray-100 z-10">
                    <div className="flex items-center justify-between p-4 md:px-8">
                        <div className="flex items-center gap-4">
                            <button onClick={toggleSidebar} className="text-2xl md:hidden">
                                {sidebarOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                            </button>
                            <h1 className="text-black text-xl md:text-3xl font-bold">Notes</h1>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <Button
                                text="Share Brain"
                                varient="secondary"
                                startIcon={<IoMdShare />}

                            />

                            <Button
                                text="Add content"
                                varient="primary"
                                startIcon={<FaPlus />}
                                onClick={() => setModalOpen(true)}
                            />

                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <CreateContentModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                    />

                    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 p-4">
                        <Card type="twitter" link="https://x.com/aadityaa027/status/1827434697942552638" title="First tweet" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                        <Card type="youtube" link="https://www.youtube.com/watch?v=vzg90tY3uM0" title="First youtube" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

