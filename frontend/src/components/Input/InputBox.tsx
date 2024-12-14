
const InputBox = ({ onChange, placeholder, type }: { onChange: () => void; placeholder: string; type: string }) => {
    return (
        <div className='px-4 py-2 border rounded-md m-2'>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full outline-none"
            />
        </div>
    );
};

export default InputBox;
