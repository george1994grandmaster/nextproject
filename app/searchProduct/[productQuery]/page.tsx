"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByLetter } from '../../redux/testSliceİd'; 
import { selectProductByİd } from '../../redux/testSliceİd';
import Link from 'next/link';
import Image from 'next/image'

interface Props {
  params: {
    productQuery: any;
  };
}

interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number
}

export default function GetQuery({ params }: Props) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(selectProductByİd)
  
 console.log(selectedProducts)
  const product = "laptops"; 
  
  useEffect(() => {
    if(params.productQuery) {
      const productQuery = params.productQuery
      dispatch(fetchProductByLetter({product, productQuery}) as any);
    }
  },[dispatch]);

  return (
    <>
      {selectedProducts && selectedProducts.map((item) => (
        <Link href={`/selectedProduct/${item.id}`} key={item.id}>
          <span>ID: {item.id}</span>
          <span>Title: {item.title}</span>
          <Image
            src={item.src}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </Link>
      ))}
    </>
  );
}