import React from 'react'
import { Carousel } from '../components/Carousel'
import { PROJECTS } from '../constants'
import { motion } from "framer-motion"

const Projects = () => {
    return (
        <section id='project'>
            <div className="border-b border-neutral-900 pb-4">
                <motion.h2 initial={{ x: -100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0 }} className='my-20 text-center text-4xl'>Projects</motion.h2>
                <div>{PROJECTS.map((projects, index) => (
                    <div className="mb-12 flex flex-wrap lg:justify-around" key={index}>
                        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -100 }} transition={{ duration: 1 }} className="items-center justify-around flex lg:w-5/6">
                            <Carousel data = {projects.images} className="mb-6"/>
                        </motion.div>
                        {/* <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -100 }} transition={{ duration: 1 }} className="w-full lg:w-1/2">
                            <img src={projects.images[0]} alt={projects.title} className="mb-6 rounded w-full h-auto"/>
                        </motion.div> */}
                        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 100 }} transition={{ duration: 1 }} className="w-full mx-w-xl lg:w-1/6">
                            <h6 className="mb-2 font-semibold">{projects.title}</h6>
                            <p className="mb-4 text-neutral-400">{projects.description}</p>
                            {projects.technologies.map((tech, index) => (
                                <span key={index} className=" mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800">{tech}</span>
                            ))}
                        </motion.div>
                    </div>
                ))}</div>
            </div>
        </section>

    )
}

export default Projects