import React from 'react'

const Home = () => {
    return (
        <div className="border-b border-neutral-900 pb-4 lg:mb-35">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <h1 className=" pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
                            Pramith Kiran
                        </h1>
                        <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
                            Full Stack Developer
                        </span>
                        <p className='my-2 max-w-xl py-6 font-light tracking-tighter'>
                            The sun dipped below the horizon, casting a warm, golden hue across the landscape. The leaves rustled gently in the evening breeze, whispering secrets of the day gone by. In the distance, a river meandered lazily, its surface reflecting the fading light like a ribbon of molten gold. The air was filled with the scent of earth and pine, a reminder of the untamed beauty of nature. As twilight descended, the first stars began to twinkle in the sky, promising the serenity of a peaceful night ahead.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home