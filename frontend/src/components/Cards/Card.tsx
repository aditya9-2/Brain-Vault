import { IoMdShare } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube";

}

const Card = ({ title, link, type }: CardProps) => {
    return (
        <div className={`
            bg-white  
            max-w-72 
            min-h-40 
            border 
            border-gray-200 
            rounded 
            p-4 `}>


            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-2 text-gray-500 font-semibold">

                    <IoMdShare />
                    <h2>{title}</h2>
                </div>
                <div className="flex items-center gap-4 text-gray-500 ">

                    <a href={link} target="_blank">
                        <IoMdShare />
                    </a>

                    <RiDeleteBin6Line />
                </div>
            </div>

            <div className="object-cover overflow-hidden rounded-md mt-3 ">

                {type === "youtube" && <iframe width="254" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                {
                    type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>

                }

            </div>
        </div>

    )
}

export default Card






