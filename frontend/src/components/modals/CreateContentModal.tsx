/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RxCross2 } from "react-icons/rx";
import InputBox from "../Input/InputBox";
import Button from "../Buttons/Button";


interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}


const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {


    return (
        <div>
            {open && <div className="w-screen h-screen bg-gray-600 fixed top-0 left-0 bg-opacity-60 flex justify-center items-center">

                <div className="bg-white shadow-md h-96 w-96 rounded-lg opacity-100 p-4">
                    <div className="flex justify-end text-2xl cursor-pointer" onClick={onClose}>
                        <RxCross2 />
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold pl-4">Add Content</h2>
                        {/* @ts-ignore */}
                        <InputBox placeholder={"Enter title"} />
                        {/* @ts-ignore */}
                        <InputBox placeholder={"Enter link"} />
                    </div>

                    <div className="flex justify-center items-center m-4">
                        <Button varient="primary" text="Submit" />
                    </div>

                </div>


            </div>
            }
        </div>
    )
}

export default CreateContentModal
