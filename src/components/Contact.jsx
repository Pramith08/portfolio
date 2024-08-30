import React from 'react'
import { CONTACT } from '../constants'
import { motion } from "framer-motion"

const Contact = () => {
    return (
        <div className="border-b border-neutral-900 pb-4">
            <motion.h2 initial={{ x: -100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0 }} className='my-10 text-center text-4xl'>
                Contact
            </motion.h2>
            <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0 }}className="text-center tracking-tighter">
                <p className="my-4">{CONTACT.phoneNo}</p>
                <a href="#" className="border-b my-10">{CONTACT.email}</a>
            </motion.div>
        </div>
    )
}

export default Contact