/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import { FaPlus } from "react-icons/fa6";
import { IoMdShare, IoMdClose } from "react-icons/io";
import Card from "../components/Cards/Card";
import CreateContentModal from "../components/modals/CreateContentModal";
import Sidebar from "../components/Sidebar/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import useFetchContent from "../hooks/useFetchContent";
import axios from "axios";
import { BACKEND_URL } from "../config";



const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { contents, reFetchContent } = useFetchContent();

    useEffect(() => {
        reFetchContent();
    }, [modalOpen])

    const handleShareContent = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                shareLink: true
            }, {
                headers: {

                    "Authorization": localStorage.getItem("token")

                }
            });

            const shareUrl = `http://localhost:5173/share/${response.data.shareId}`

            // Modern clipboard API method
            await navigator.clipboard.writeText(shareUrl);

            console.log(`url: ${shareUrl}`)

            // Alert the user that the link was copied
            alert("Share link copied to clipboard!");

        } catch (error) {
            console.log(error);
            return;
        }
    }


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

                <div className="sticky top-0 z-10">
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
                                onClick={handleShareContent}

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

                    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 p-4 max-h-56">

                        {contents.map((content) => (
                            <Card

                                type={content.type}
                                title={content.title}
                                link={content.link}
                            />
                        ))}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

