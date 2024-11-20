import React, {useState}from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

export const Carousel = ({data}) => {
    const [slide, setSlide] = useState(0);

    const nextSlide=()  => {
      setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };
    const previousSlide=()  => {
      setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

  return (
    <div className='mb-6 relative flex justify-center items-center w-4/6 h-auto'>
      <BsArrowLeftCircleFill className='absolute left-0 w-7 h-7 fill-neutral-300 bg-transparent hover:cursor-pointer' onClick={previousSlide}/>
      {data.map((item,idx)=> {
        return <img src={item} alt="" key={idx} className={slide === idx ? "w-auto h-full" : "hidden"}/>
       })
      }
      <BsArrowRightCircleFill className='absolute right-0 w-7 h-7 fill-neutral-300 bg-transparent hover:cursor-pointer'  onClick={nextSlide}/>
      <span className='flex absolute -bottom-5'>{data.map((_,idx)=> {
        return <button key={idx} onClick={null} className={slide === idx ? 'bg-neutral-300 rounded m-1 h-2 w-2 border-none outline-none cursor-pointer' : 'bg-gray-700 rounded m-1 h-2 w-2 border-none outline-none cursor-pointer' }></button>
      })}</span>
    </div>
  )
}
