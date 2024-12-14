import Button from "../components/Buttons/Button"
import InputBox from "../components/Input/InputBox"

const Signup = () => {
    const toggleChange = () => {

    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">

            <div className="bg-white p-4 rounded-md w-80 shadow-lg ">

                <h1 className="px-3 font-bold text-xl mb-6">Signup here</h1>

                <div className="flex flex-col gap-2">

                    <InputBox onChange={toggleChange} placeholder="Create username" type="text" />
                    <InputBox onChange={toggleChange} placeholder="Create password" type="password" />
                </div>


                <div className="flex justify-center items-center mt-6">
                    <Button varient="primary" text="Signup" loading={false} />

                </div>


            </div>

        </div>
    )
}

export default Signup
