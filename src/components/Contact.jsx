import React from 'react'
import { CONTACT } from '../constants'
import { motion } from "framer-motion"
import emailicon from '../assets/mail.png'
import phoneicon from '../assets/contact.png'
import locationicon from '../assets/location.png'

const Contact = () => {
    return (
        <section id='contact'>
            <div className="gap-10 items-center text-center justify-around pb-4 my-4">
                <motion.h2 initial={{ x: -100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0 }} className='my-10 text-center text-4xl'>
                    Contact
                </motion.h2>
                <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0 }} className="lg:flex lg:flex-row lg:justify-around flex flex-col items-center gap-2 py-2 h-full tracking-tighter">
                    <div className='flex gap-2 py-2 h-full items-center'>
                        <img src={locationicon} alt="Phone Icon" className='h-12' />
                        <p className="my-4">{CONTACT.location}</p>
                    </div>
                    <div className='flex gap-2 py-2  h-full items-center'>
                        <img src={phoneicon} alt="Phone Icon" className='h-10' />
                        <p className="my-4">{CONTACT.phoneNo}</p>
                    </div>
                    <div className='flex gap-2 py-2  h-full items-center'>
                        <img src={emailicon} alt="Phone Icon" className='h-10' />
                        <p className="my-4">{CONTACT.email}</p>
                    </div>
                    {/* <a href="#" className="border-b my-10">{CONTACT.email}</a> */}
                </motion.div>
            </div>

        </section>

    )
}

export default Contact