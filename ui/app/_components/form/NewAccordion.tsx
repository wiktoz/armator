import { motion, AnimatePresence } from "framer-motion";
import {ReactElement} from "react";

interface Props {
    expanded: boolean,
    setExpanded: (value: boolean) => void,
    children: ReactElement,
    header: ReactElement
}

const NewAccordion = ({ expanded, setExpanded, children, header }:Props) => {
    return (
        <>
            <motion.header
                initial={false}
                onClick={() => setExpanded(!expanded)}
            >
                {header}
            </motion.header>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                    >
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}

export default NewAccordion