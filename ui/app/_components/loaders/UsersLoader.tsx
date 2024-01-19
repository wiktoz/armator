import {motion} from "framer-motion";

const UsersLoader = () => {
    return(
        <div className={"flex flex-col gap-1"}>
            <motion.div className={"bg-gray-300 h-4 w-64 rounded"}></motion.div>
            <div className={"bg-gray-300 h-4 w-32 rounded"}></div>
            <div className={"bg-gray-300 h-4 w-48 rounded"}></div>
            <div className={"bg-gray-300 h-4 w-72 rounded"}></div>
        </div>
    )
}

export default UsersLoader