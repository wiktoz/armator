'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {usePathname} from "next/navigation"
import {ReactElement} from "react";

const Transition = ({ children }: {children:ReactElement}) => {
    const pathname = usePathname()

    return (
        <AnimatePresence
            initial={false}
            mode='wait'
        >
            <motion.div
                key={pathname}
                animate={{ opacity: 1 }}
                transition={{
                    type: "spring", stiffness: 100,
                    duration: 2000,
                }}
                className={"opacity-0"}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default Transition