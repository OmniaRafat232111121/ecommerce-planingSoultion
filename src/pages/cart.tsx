import React from 'react'
import { useSelector } from 'react-redux';
import { StoreProduct, StateProps } from '../../type'
import Link from 'next/link';
import CartProduct from '@/components/CartProduct';
import ResetCart from '@/components/ResetCart';
import CartPayemenet from '@/components/CartPayemenet';
import Head from 'next/head';
const Cart = () => {
  const { productData } = useSelector((state: StateProps) => state.next);

  return (
    <>
      <Head>
        <title>Cart Details</title>
        <meta name="description" content="This is details of product" />
      </Head>
      <div className="max-w-screen-xl 
            mx-auto xl:px-6 gap-10 xl:py-4 md:px-1 grid xl:grid-cols-2 md:grid-cols-3
            ">
        {productData.length > 0 ? (
          <>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">

                <p className="text-2xl font-semibold text-amazon_blue">
                  shopping Items
                </p>
                <p className="text-lg font-semibold text-amazon_blue">Action</p>
              </div>
              <div className="pt-2 
              flex flex-col gap-2">
                {productData.map((item: StoreProduct) => (
                  <div key={item._id}>
                    <CartProduct item={item} />
                  </div>
                ))}
                <ResetCart />
              </div>
            </div>
            <div className="bg-white xl:w-full md:w-[600px] sm:w-[400px]
             h-64 col-span-1 p-4 rounded-lg flex items-center justify-center">
              <CartPayemenet />
            </div>
          </>

        ) : (
          <div className="bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
            <h1 className="text-lg font-medium">Your cart is empty!</h1>
            <Link href={"/"}>
              <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black">
                go to shopping
              </button>
            </Link>
          </div>

        )}

      </div>
    </>
  )
}

export default Cart