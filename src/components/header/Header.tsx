import React, { useState, useEffect } from 'react'
import logo from '../../images/logo.png'
import cartIcon from "../../images/cartIcon.png";
import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { StateProps, StoreProduct } from '../../../type';
import { MdOutlineFavorite } from "react-icons/md";
import SearchProducts from '../SearchProducts';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"
import { BiCaretDown } from 'react-icons/bi'
import { addUser } from '@/store/nextSlice';
import { useTranslation } from 'next-i18next';
import LanguageToggle from '../LanaguageToggle';

const Header = () => {
  const { t } = useTranslation();

  const { data: session, status } = useSession()
  console.log(session)

  const { productData, favoriteData, userInfo } = useSelector((state: StateProps) => state.next
  );
  const dispatch = useDispatch()
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          image: session?.user?.image,
          email: session?.user?.email,

        })
      )
    }
  }, [session])
  //serach bar
  const [searchQuery, setSearchQuery] = useState(""); // User input for search
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
  const [allData, setAllData] = useState([]); // All products data
  useEffect(() => {
    // Fetch data from the provided URL
    axios.get('https://fakestoreapiserver.reactbd.com/tech')
      .then(response => {
        // Once data is fetched, update the allData state
        setAllData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Filtered data:", filtered);
    console.log("Search query:", searchQuery);
    console.log("All data:", allData);

    setFilteredProducts(filtered);
  }, [searchQuery, allData]);
  return (
    <div className='
    
     h-20 bg-amazon_blue text-lightText sticky top-0 z-50'>
      <div className='h-full w-full inline-flex items-center justify-between  gap-1 
      mdl:gap-4 px-4 '>
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
            <p>{t('deliverTo')}</p>
            <p className="text-white font-bold uppercase">EGYPT</p>
          </div>
        </div>
        {/*searchbar*/}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search Planing soultion products"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
          {/* ========== Searchfield ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `${item._id}`,
                          query: {
                            _id: item._id,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            title: item.title,
                          },
                        }}
                        onClick={() => setSearchQuery("")}
                      >
                        <SearchProducts key={item._id} item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {/*favourit*/}
        <Link href={"/favorite"}
          className="text-xs text-gray-100 flex flex-col justify-center px-3 border
           border-transparent hover:border-white cursor-pointer duration-300 h-[70%]
            relative">

          <MdOutlineFavorite size={26} />
          {favoriteData.length > 0 && (
            <span className="absolute p-1 left-[20px] top-1 w-5 h-5 bg-white rounded-md 
             flex items-center 
             justify-center text-xs  text-amazon_yellow">

              {favoriteData.length}</span>
          )}

        </Link>
        {userInfo ? (
          <>
            <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
              <Image
                src={userInfo.image}
                alt="userImage"
                className="w-8 h-8 rounded-full object-cover"
                width={50}
                height={50}

              />
              <div className="text-xs text-gray-100 flex flex-col justify-between">
                <p className="text-white font-bold">{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        <LanguageToggle />
        {/*cart*/}
        <Link href={'/cart'} className="text-xs text-gray-100 flex items-center px-3 border border-transparent
         hover:border-white 
        cursor-pointer duration-300 h-[70%] realtive"
        >
          <Image src={cartIcon} alt="cartimg" className='w-auto object-cover h-8' />
          <span className='absolute
           text-amazon_yellow text-sm top-[18px] right-[40px] 
            bg-white rounded-md px-1'>
            {productData ? productData.length : 0}
          </span>
        </Link>

      </div>
    </div>
  )
}

export default Header
