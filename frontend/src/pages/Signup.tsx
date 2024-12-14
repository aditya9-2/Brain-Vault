import { useRef } from "react";
import Button from "../components/Buttons/Button";
import InputBox from "../components/Input/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSignup = async () => {

        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                alert("Please fill in all fields");
                return;
            }

            await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
            alert("Signup successful!");
            navigate("/signin")
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-300">
            <div className="bg-white p-4 rounded-md w-80 shadow-lg">
                <h1 className="px-3 font-bold text-xl mb-6">Signup here</h1>
                <div className="flex flex-col gap-2">
                    <InputBox ref={usernameRef} placeholder="Create username" type="text" />
                    <InputBox ref={passwordRef} placeholder="Create password" type="password" />
                </div>
                <div className="flex justify-center items-center mt-6">
                    <Button varient="primary" text="Signup" loading={false} onClick={handleSignup} />
                </div>
            </div>
        </div>
    );
};

export default Signup;
