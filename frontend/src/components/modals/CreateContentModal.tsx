
import { RxCross2 } from "react-icons/rx";
import InputBox from "../Input/InputBox";
import Button from "../Buttons/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";


interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

enum ContentTypes {
    Youtube = "youtube",
    Twitter = "twitter"
}


const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {

    const [contentType, setContentType] = useState(ContentTypes.Youtube);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const handleAddContent = async () => {
        const title = titleRef.current?.value
        const link = linkRef.current?.value

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title,
                link,
                type: contentType
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })

            // Close the modal and show success message
            onClose();
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content");
        }
    }


    return (
        <div>
            {open && <div className="w-screen h-screen bg-gray-600 fixed top-0 left-0 bg-opacity-60 flex justify-center items-center">

                <div className="bg-white shadow-md  w-96 rounded-lg opacity-100 p-4">
                    <div className="flex justify-end text-2xl cursor-pointer" onClick={onClose}>
                        <RxCross2 />
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold pl-4">Add Content</h2>

                        <InputBox ref={titleRef} type="text" placeholder={"Enter title"} />
                        <InputBox ref={linkRef} type="text" placeholder={"Enter link"} />
                    </div>

                    <div className="px-4 font-semibold mt-3 mb-4">
                        <h2>Select Type:</h2>
                        <div className="flex items-center gap-2 justify-center mt-2 ">
                            <Button text={"Youtube"} varient={contentType === ContentTypes.Youtube ? "primary" : "secondary"} onClick={() => setContentType(ContentTypes.Youtube)} />
                            <Button text={"Twitter"} varient={contentType === ContentTypes.Twitter ? "primary" : "secondary"} onClick={() => setContentType(ContentTypes.Twitter)} />
                        </div>
                    </div >

                    <div className="flex justify-center items-center mt-8">
                        <Button varient="primary" text="Submit" width={true} onClick={handleAddContent} />
                    </div>

                </div>


            </div>
            }
        </div>
    )
}

export default CreateContentModal
