import { useNavigate } from "react-router-dom"
import Button from "../components/Buttons/Button"
import InputBox from "../components/Input/InputBox"

const SignIn = () => {
    const navigate = useNavigate();
    const gotoSignup = () => {

        navigate("/signup")
    }
    const toggleChange = () => {

    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">

            <div className="bg-white p-4 rounded-md w-80 shadow-lg ">

                <h1 className="px-3 font-bold text-xl mb-6">Signin here</h1>

                <div className="flex flex-col gap-2">

                    <InputBox onChange={toggleChange} placeholder="Enter username" type="text" />
                    <InputBox onChange={toggleChange} placeholder="Enter password" type="password" />
                </div>


                <div className="text-center mt-2">

                    <p>do not have account? <span className=" text-blue-600 cursor-pointer" onClick={gotoSignup}>Create account</span></p>
                </div>
                <div className="flex flex-col justify-center items-center mt-6">
                    <Button varient="primary" text="Signin" loading={false} />

                </div>


            </div>

        </div>
    )
}

export default SignIn
