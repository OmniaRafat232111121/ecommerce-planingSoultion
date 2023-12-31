import React, { useState } from 'react';
import { ProductProps } from '../../type';
import Image from 'next/image';
import Link from 'next/link';
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from './FormattedPrice';
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from '@/store/nextSlice';

const Products = ({ productData }: any) => {
    const dispatch = useDispatch()
    const handleCart = ({
        _id,
        brand,
        category,
        description,
        image,
        isNew,
        oldPrice,
        price,
        title,
    }: ProductProps) => {
        dispatch(addToCart({
            _id: _id,
            brand: brand,
            category: category,
            description: description,
            image: image,
            isNew: isNew,
            oldPrice: oldPrice,
            price: price,
            title: title,
            quantity: 1,

        }))
    }
    const handleFavourit = ({
        _id,
        brand,
        category,
        description,
        image,
        isNew,
        oldPrice,
        price,
        title,
    }: ProductProps) => {
        dispatch(
            addToFavorite({
                _id: _id,
                brand: brand,
                category: category,
                description: description,
                image: image,
                isNew: isNew,
                oldPrice: oldPrice,
                price: price,
                title: title,
                quantity: 1,
            })
        )

    }
    const productsPerPage = 12; // Number of products to show per page
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(productData.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {currentProducts.map(
                    ({
                        _id,
                        title,
                        brand,
                        category,
                        description,
                        image,
                        isNew,
                        oldPrice,
                        price,
                    }: ProductProps) => (
                        <div
                            key={_id}
                            className="w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden"
                        >
                            <div className="w-full h-[260px] relative flex items-center justify-center">
                                <Link
                                    href={{
                                        pathname: `/${_id}`,
                                        query: {
                                            _id: _id,
                                            brand: brand,
                                            category: category,
                                            description: description,
                                            image: image,
                                            isNew: isNew,
                                            oldPrice: oldPrice,
                                            price: price,
                                            title: title,
                                        },
                                    }}>
                                    <Image

                                        width={300} height={300} src={image} alt="productImage" />


                                </Link>
                                <div className="w-12 h-24 absolute bottom-15 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                                    <span className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"> <HiShoppingCart /></span>
                                    <span
                                        onClick={() => {
                                            handleFavourit({

                                                _id,
                                                brand,
                                                category,
                                                description,
                                                image,
                                                isNew,
                                                oldPrice,
                                                price,
                                                title,

                                            })
                                        }}
                                        className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"

                                    > <FaHeart /> </span>
                                </div>
                                {isNew && (
                                    <>
                                        <p className='absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce' >
                                            !save <FormattedPrice amount={oldPrice - price} />

                                        </p>
                                    </>
                                )}
                            </div>
                            <hr />
                            <div className="px-4 py-3 flex flex-col gap-1">
                                <p className="text-xs text-gray-500 tracking-wide">{category}</p>
                                <p className="text-base font-medium">{title}</p>

                                <p className="flex items-center gap-2">
                                    <span className="text-sm line-through">
                                        <FormattedPrice amount={oldPrice} />
                                    </span>
                                    <span className="text-amazon_blue font-semibold">
                                        <FormattedPrice amount={price} />
                                    </span>
                                </p>
                                <p className="text-xs text-gray-600 text-justify">
                                    {description.substring(0, 120)}
                                </p>

                                <button
                                    onClick={() =>
                                        handleCart({
                                            _id,
                                            brand,
                                            category,
                                            description,
                                            image,
                                            isNew,
                                            oldPrice,
                                            price,
                                            title,
                                        })
                                    }


                                    className="h-10 font-medium bg-amazon_blue text-white rounded-md
                             hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
                                    add to cart
                                </button>

                            </div>

                        </div>
                    )
                )}
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Products;
