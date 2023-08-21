import React from 'react'
import logo from '../../images/logo.png'
import cartIcon from "../../images/cartIcon.png";
import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { BiCaretDown } from "react-icons/bi";
import { StateProps } from '../../../type';

const Header = () => {
  const { productData, favoriteData } = useSelector((state: StateProps) => state.next)
  console.log(productData)
  console.log("this is favourit", favoriteData)
  return (
    <div className='w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50'>
      <div className='h-full w-full inline-flex items-center justify-between gap-1 
      mdl:gap-3 px-4'>
        {/*logo*/}
        <Link
          href={"/"}
          className='border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]'>
          <Image className='w-40 object-cover' src={logo} alt="logo" />
        </Link>
        {/* delivery */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">EGYPT</p>
          </div>
        </div>
        {/*searchbar*/}
        <div className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative'>
          <input type="text"
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"

            placeholder='Search in Planing Soultion' />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/*sign in*/}
        <div
          className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"

        >
          <p>Hello, sign in</p>
          <p className="text-white font-bold flex items-center">Account & Lists{" "}
            <span>
              <BiCaretDown />

            </span>
          </p>
        </div>
        {/*favourit*/}
        <Link href={"/favorite"}
          className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
          <p>Marked</p>
          <p className="text-white font-bold ">& favourit</p>
          {favoriteData.length > 0 && (
            <span className="absolute p-1 right-1 top-2 w-5 h-5 border-[1px]
             border-gray-400 flex items-center justify-center text-xs text-amazon_yellow bg-white rounded-sm">

              {favoriteData.length}</span>
          )}

        </Link>

        {/*cart*/}
        <Link href={'/cart'} className="text-xs text-gray-100 flex items-center px-2 border border-transparent hover:border-white 
        cursor-pointer duration-300 h-[70%] realtive"
        >
          <Image src={cartIcon} alt="cartimg" className='w-auto object-cover h-8' />
          <p className='text-xs text-white font-bold mt-3'>Cart</p>
          <span className='absolute text-amazon_yellow text-sm top-[14px] right-[60px] font-semibold bg-white rounded-sm px-1'>
            {productData ? productData.length : 0}
          </span>
        </Link>

      </div>
    </div>
  )
}

export default Header
