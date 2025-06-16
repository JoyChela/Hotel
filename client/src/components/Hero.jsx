import React from 'react'
import { Calendar, Search } from 'lucide-react'

const Hero = () => {
  const hotels = ['Nairobi Serena Hotel', 'Fairmont The Norfolk', 'Hemingways Nairobi', 'Villa Rosa Kempinski'];

  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const todayDate = getTodayDate()

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg-px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className='bg-[#49b9ff]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Hotel Experience</p>
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Discover Your Perfect Experience with us
      </h1>
      <p className='max-w-130 mt-2 text-sm md:text-base'>
        Book with us now
      </p>
      <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

        <div>
          <div className='flex items-center gap-2'>
            <Calendar className="w-5 h-5 text-blue-500" />
            <label htmlFor="hotelInput">Hotel</label>
          </div>
          <input list='hotels' id="hotelInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
          <datalist id='hotels'>
            {hotels.map((hotel, index) => (
              <option value={hotel} key={index}></option>
            ))}
          </datalist>
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <Calendar className="w-5 h-5 text-blue-500" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input id="checkIn" type="date" min={todayDate} className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <Calendar className="w-5 h-5 text-blue-500" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input id="checkOut" type="date" min={todayDate} className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests">Guests</label>
          <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
        </div>

        <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
          <Search className="w-4 h-4 text-white" />
          <span>Search</span>
        </button>
      </form>
    </div>
  )
}

export default Hero
