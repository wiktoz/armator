import {ReactElement, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {VscChevronRight} from 'react-icons/vsc'

interface Props {
  title: string | ReactElement,
  children?: ReactElement
}

const Accordion = ({ title, children}:Props) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
          className="relative flex flex-row items-center justify-left text-xs hover:cursor-pointer transition-all z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <motion.div 
          animate={{
            rotate: isOpen ? 90 : 0
          }}
          className="text-xs"
          >
            <VscChevronRight></VscChevronRight>
          </motion.div>
        </motion.div>

        {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height:0, y:-30 }}
                        animate={{
                        opacity: 1,
                        height:"auto",
                        y:0,
                        transition: {
                            duration: 0.2,
                        },
                        }}
                        exit={{ opacity: 0, height:0, y:-30}}
                        className="my-2"
                    >
                        <div>
                          {children}
                        </div>
                    </motion.div>
                )
        }
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;