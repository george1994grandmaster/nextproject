'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: {
    categorieQuery: any;
  };
}

interface DataItem {
  id: number;
  title: string;
  category: string;
  src: string;
  quantity?: number;
  price: string
}

export default function GetCategorieResult({ params }: Props) {
  const [cartFromLocalStorage, setCartFromLocalStorage] = useState<DataItem[]>([]);

  useEffect(() => {
    const cartFromLocalStorageString = localStorage.getItem('cart');
    const cartFromLocalStorage = cartFromLocalStorageString ? JSON.parse(cartFromLocalStorageString) as DataItem[] : [];
    setCartFromLocalStorage(cartFromLocalStorage);
    //localStorage.removeItem('cart')
  }, []);
  
  return (
    <>
      {cartFromLocalStorage && cartFromLocalStorage.map((item: DataItem) => (
        <div key = {item.id}>
          <span>Title: {item.title}</span>
          <Image
            src={item.src}
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <span>quantity: {item.quantity}</span>
          <span>Price: {item.price}</span>
        </div>
      ))}
    </>
  );
}