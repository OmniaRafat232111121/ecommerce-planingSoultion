import React from 'react'
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from './FormattedPrice';
import { StoreProduct, stateProps } from '../../type';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
const CartPayemenet = () => {
    const { productData } = useSelector(
        (state: stateProps) => state.next
    );
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let amt = 0;
        productData.map((item: StoreProduct) => {
            amt += item.price * item.quantity;
            return;
        });
        setTotalAmount(amt);
    }, [productData]);
    return (
        <div className='flex flex-col gap-1'>
            <div className='flex gap-2'>
                <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
                    <SiMediamarkt />
                </span>
                <p className="text-sm">
                    Your order qualifies for FREE Shipping by Choosing this option at
                    checkout. See details....
                </p>
            </div>
            <p className="flex items-center justify-between px-2 font-semibold">
                Total:{" "}
                <span className="font-bold text-xl">
                    <FormattedPrice amount={totalAmount} />
                </span>
            </p>
        </div>
    )
}

export default CartPayemenet