'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper styles
import 'swiper/css';

import slideImg from '../../assets/images/home-slider-1.png'

// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';


export default function SliderHome() {
    return <>
    <section className='relative'>
            <Swiper slidesPerView={1} loop={true} modules={[Navigation, Pagination]}
                navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
                pagination={{
                    clickable: true
                }}>
                <SwiperSlide style={{
                    backgroundImage: `linear-gradient(to right bottom, #4ade80aa, #16a34aaa), url('${slideImg.src}')`,
                    backgroundPosition: 'center', backgroundSize:'cover'
                }}>
                    <div className='container py-16 px-2 md:px-30 text-white'>
                        <h1 className='text-3xl font-bold'>Fresh Products <br/> Delivered to your Door</h1>
                        <p className='py-3 font-medium '>Get 20% off your first order</p>
                        <div className='*:hover:scale-105 *:transition-all *:duration-200 *:mx-2'>
                            <button className='btn bg-white text-green-500 '>Shop Now</button>
                            <button className='btn bg-transparent border border-gray-100 text-white px-5' >View Deals</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{
                    backgroundImage: `linear-gradient(to right bottom, #4ade80aa, #16a34aaa), url('${slideImg.src}')`,
                    backgroundPosition: 'center', backgroundSize:'cover'
                }}>
                    <div className='container py-16 px-2 md:px-30 text-white'>
                        <h1 className='text-3xl font-bold'>Fresh Products <br/> Delivered to your Door</h1>
                        <p className='py-3 font-medium '>Get 20% off your first order</p>
                        <div className='*:hover:scale-105 *:transition-all *:duration-200 *:mx-2'>
                            <button className='btn bg-white text-green-500 '>Shop Now</button>
                            <button className='btn bg-transparent border border-gray-100 text-white px-5' >View Deals</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{
                    backgroundImage: `linear-gradient(to right bottom, #4ade80aa, #16a34aaa), url('${slideImg.src}')`,
                    backgroundPosition: 'center', backgroundSize:'cover'
                }}>
                    <div className='container py-16 px-2 md:px-30 text-white'>
                        <h1 className='text-3xl font-bold'>Fresh Products <br/> Delivered to your Door</h1>
                        <p className='py-3 font-medium '>Get 20% off your first order</p>
                        <div className='*:hover:scale-105 *:transition-all *:duration-200 *:mx-2'>
                            <button className='btn bg-white text-green-500 '>Shop Now</button>
                            <button className='btn bg-transparent border border-gray-100 text-white px-5' >View Deals</button>
                        </div>
                    </div>
                </SwiperSlide>
                

            </Swiper>

            <button className=' prev-btn absolute top-1/2 -translate-y-1/2 left-5 z-50 bg-white text-green-500 w-10 h-10 rounded-full shadow-2xl flex justify-center items-center'>
                <IconChevronLeft/>
            </button>
            <button className='next-btn absolute top-1/2 -translate-y-1/2 right-5 z-50 bg-white text-green-500 w-10 h-10 rounded-full shadow-2xl flex justify-center items-center'>
                <IconChevronRight/>
            </button>
        </section>
    </>
}
