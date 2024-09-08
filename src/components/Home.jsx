import React from 'react'
import { motion } from "framer-motion"
import githubIcon from '../assets/githubicon.png'
import linkedinIcon from '../assets/linkedinicon.png'
import resume from '../assets/resume.pdf'
import { BIO } from '../constants/index.js'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {
    return (
        <section id='home'>
            <div className="border-b border-neutral-900 pb-4 lg:mb-35">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-col items-center lg:items-start">
                            <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0 }} className="pb-16 text-6xl font-thin tracking-tight lg:mt-20 lg:pt-10 lg:text-8xl">
                                Pramith Kiran
                            </motion.h1>
                            <motion.span initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
                                <TypeAnimation repeat={Infinity} sequence={[
                                    'Full Stack Developer', 2000,
                                    'Cyber Security Enthusiast', 2000,
                                    'Gamer', 2000,
                                ]} />
                            </motion.span>
                            <motion.p initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className='my-2 max-w-xl py-6 font-light tracking-tighter'>
                                {BIO}
                            </motion.p>
                            <motion.div className="flex pb-6 flex-wrap gap-2">
                                <motion.a initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1 }} href="https://github.com/Pramith08">
                                    <img src={githubIcon} alt="" />
                                </motion.a>
                                <motion.a initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.75 }} href="https://www.linkedin.com/in/pramithkiran/">
                                    <img src={linkedinIcon} alt="" />
                                </motion.a>
                            </motion.div >
                            {/* <motion.button type="button" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Download Resume</motion.button> */}
                            <motion.a href={resume}
                                download="Pramith_Kiran_Resume.pdf"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.25 }}
                                className="text-white pb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 lg:mb-10"
                            >
                                Download Resume
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home