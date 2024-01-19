import {ReactElement} from "react";

interface Props {
    text: string
    children: ReactElement
}

const Tooltip = ({text, children}:Props) => {
    return(
        <div>
            <div className="group relative duration-300 cursor-pointer">
                {children}
                <span
                    className="absolute hidden group-hover:flex -left-full -top-2 -translate-y-full px-2 py-1 bg-primary rounded-lg text-center text-white text-xs
                    after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-4 after:border-x-transparent after:border-b-transparent after:border-t-primary">
                    {text}
                </span>
            </div>
        </div>
    )
}

export default Tooltip