import { ReactElement } from 'react';

interface ButtonProps {
    varient: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    loading?: boolean;
    width?: boolean;

}

const varientClasses = {
    "primary": "text-white bg-purple-900 hover:opacity-90",
    "secondary": "text-purple-600 bg-purple-100 hover:opacity-90"
};

const Button = ({ varient, text, startIcon, onClick, loading, width, }: ButtonProps) => {
    return (
        <button
            className={`
                ${varientClasses[varient]}
                md:px-4 p-2 text-nowrap md:py-2 rounded-md md:font-semibold flex justify-center items-center gap-2 
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}
                ${width ? "w-60" : ""}
                
            `}
            disabled={loading}
            onClick={onClick}

        >


            {loading ? (
                <>
                    <span className="loader mr-2"></span> {/* Add a loader if desired */}
                    Loading...
                </>
            ) : (
                <>
                    {startIcon}
                    {text}
                </>
            )}


        </button>
    );
};

export default Button;
