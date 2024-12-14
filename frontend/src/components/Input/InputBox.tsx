import { forwardRef } from "react";

interface InputProps {
    placeholder: string;
    type: string;
}

const InputBox = forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder, type }, ref) => {
        return (
            <div className="px-4 py-2 border rounded-md m-2">
                <input
                    ref={ref} // Forward the ref to the input element
                    type={type}
                    placeholder={placeholder}
                    className="w-full outline-none"
                />
            </div>
        );
    }
);

export default InputBox;
