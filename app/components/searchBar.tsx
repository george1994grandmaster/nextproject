"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cartSlice';
import { displayTotalCount } from '../redux/cartSlice';
import { useRouter } from 'next/navigation'



interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
}

interface CartItem {
  quantity: number;
}


export default function Searchbar() {
  const cartCount = useSelector(selectCart)
  const dispatch = useDispatch();
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>("")

  //useEffect(() => {
   // dispatch(displayTotalCount());
  //}, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchProductItem = event.target.value;
    setSearchValue(searchProductItem)
  };

  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/searchProduct/${searchValue}`)
      setSearchValue("");
    }
  };

  return (
    <div>
      <input type="search" 
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}/>
    </div>
  );
}