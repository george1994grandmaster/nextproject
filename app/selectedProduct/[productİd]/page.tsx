"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByİd} from '../../redux/testSliceİd'; 
import { addToCart } from '../../redux/testSliceİd'; 
import { selectProductByİd } from '../../redux/testSliceİd';
import Image from 'next/image'

interface Props {
  params: {
    productİd: any;
  };
}

interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number
}

export default function Product({ params }: Props) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(selectProductByİd)
  
 
  const product = "laptops"; 
  
  useEffect(() => {
    if(params.productİd) {
      const productİd = params.productİd
      dispatch(fetchProductByİd({product, productİd}) as any);
    }
  }, [dispatch]);



  const addProductHandler = (productİd: number) => {
    if (productİd) {
      dispatch(addToCart(productİd as number));
    }
  }

  let currentProduct: DataItem | undefined;

  if (selectedProducts) {
    const productId = parseInt(params.productİd); // Ensure it's a number
    currentProduct = selectedProducts.find(item => item.id === productId);
    console.log(currentProduct);
  }
  return (
    <>
      {currentProduct && (
        <div>
          <span>ID: {currentProduct.id}</span>
          <h1>
            {currentProduct.title}
          </h1>
          <Image
            src={currentProduct.src}
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <h1>{currentProduct.quantity}</h1>
          <button onClick={() => addProductHandler(currentProduct?.id as number)}>+</button>
        </div>
        
      )}
    </>
  );
}