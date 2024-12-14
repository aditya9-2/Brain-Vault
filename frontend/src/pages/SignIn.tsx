import { useNavigate } from "react-router-dom"
import Button from "../components/Buttons/Button"
import InputBox from "../components/Input/InputBox"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignIn = () => {
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const gotoSignup = async () => {

        navigate("/signup")
    }

    const handleSignIn = async () => {

        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                alert("Please fill in all fields");
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });
            const tokenData = response.data.token;
            localStorage.setItem("token", tokenData)

            if (tokenData) {
                navigate("/dashboard")
            }


        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">

            <div className="bg-white p-4 rounded-md w-80 shadow-lg ">

                <h1 className="px-3 font-bold text-xl mb-6">Signin here</h1>

                <div className="flex flex-col gap-2">

                    <InputBox ref={usernameRef} placeholder="Enter username" type="text" />
                    <InputBox ref={passwordRef} placeholder="Enter password" type="password" />
                </div>


                <div className="text-center mt-2">

                    <p>do not have account? <span className=" text-blue-600 cursor-pointer" onClick={gotoSignup}>Create account</span></p>
                </div>
                <div className="flex flex-col justify-center items-center mt-6">
                    <Button varient="primary" text="Signin" loading={false} onClick={handleSignIn} />

                </div>


            </div>

        </div>
    )
}

export default SignIn
