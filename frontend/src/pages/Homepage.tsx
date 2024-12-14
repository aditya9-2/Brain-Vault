import heroImage from "../assets/hero.png";
import Button from "../components/Buttons/Button";
import { motion } from "framer-motion";

const Homepage = () => {
    return (
        <div className="w-screen h-screen bg-slate-50 overflow-hidden p-6">
            <div className="flex flex-col items-center">

                <h1 className="text-3xl md:text-5xl font-bold text-center mt-4 md:mt-10 ">Hi, Wellcome to {" "}
                    <span className="text-purple-700">BrainVault</span>
                    <span className="text-pink-500">.</span>
                </h1>
                <h2 className="text-xl text-wrap p-4 text-center md:text-3xl mt-4 font-semibold">Your all in one second brain for keep your links safe</h2>

                <div className="mt-4 w-80 md:w-[30rem] flex justify-center">
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <img src={heroImage} alt="heroimage" />
                    </motion.div>
                </div>
                <div className="mt-14 md:mt-8">
                    <Button varient="primary" text="Get Started" width={true} />
                </div>
            </div>

        </div>
    )
}

export default Homepage
