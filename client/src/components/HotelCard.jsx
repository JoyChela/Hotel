import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'

const HotelCard = ({room, index}) => {
  return (
    <Link to={'/rooms/' + room._id} onClick={()=> scrollTo(0,0)} key={room._id}>
        <img src={room.imgages[0]} alt="" />
        <p>Best Seller</p>
        <div>
            <div>
                <p>{room.hotel.name}</p>
                <div>
                    <img src={assets.starIconFilled} alt="start-icon" /> 4.5
                </div>
            </div>
        </div>
    </Link>
  )
}

export default HotelCard