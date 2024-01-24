"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByİd} from '../../redux/testSliceİd'; 
import { addToCart, decreaseFromCart } from '../../redux/testSliceİd'; 
import { displayTotalCount } from '../../redux/cartSlice';
import { addToBasket } from '../../redux/testSliceİd'; 
import { selectProductByİd } from '../../redux/testSliceİd';
import Link from 'next/link';
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
  quantity: number;
  category: string;
  price: any;
}

export default function Product({ params }: Props) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(selectProductByİd)
  const [currentProduct, setCurrentProduct] = useState<DataItem | undefined>(undefined);
 
  const product = "laptops"; 
  
  useEffect(() => {
    if(params.productİd) {
      const productİd = parseInt(params.productİd)
      dispatch(fetchProductByİd({product, productİd}) as any);
    }
  }, [dispatch]);


  useEffect(() => {
   if (selectedProducts) {
      const productId = parseInt(params.productİd); 
      const currentProduct = selectedProducts.find(item => item.id === productId);
      setCurrentProduct(currentProduct as DataItem | undefined); 
    }
  });


  const addProductHandler = (productİd: number) => {
    if (productİd) {
      dispatch(addToCart(productİd as number));
    }
  }

  const decreaseProductHandler = (productİd: number) => {
    if (productİd) {
      dispatch(decreaseFromCart(productİd as number));
    }
  }

  const addToBasketHandler = (product: DataItem) => {
    if (product) {
      dispatch(addToBasket(product as DataItem));
      dispatch(displayTotalCount());
    }
  }

  
  return (
    <>
      <Link href={`/cart`} >cart</Link>
        {currentProduct && (
        <div>
          <h1>
            {currentProduct.title}
          </h1>
          <Image
            src={currentProduct.src}
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <span>price: {currentProduct.price}</span>
          <h1>{currentProduct.quantity}</h1>
          <button onClick={() => addProductHandler(currentProduct?.id as number)}>+</button>
          <button onClick={() => decreaseProductHandler(currentProduct?.id as number)}>-</button>
          <button onClick={() => addToBasketHandler(currentProduct as DataItem)}>add to basket</button>
        </div>
        
      )}
      
    </>
  );
}