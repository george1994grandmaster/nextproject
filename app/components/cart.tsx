"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cartSlice';
import { displayTotalCount } from '../redux/cartSlice';


interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number
  category: string,
}

interface CartItem {
  quantity: number;
}


export default function Cart() {
  const cartCount = useSelector(selectCart)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayTotalCount());
  }, [dispatch]);

  
  return (
    <div>
      product count {cartCount}
    </div>
  );
}