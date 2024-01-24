"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorieDatas } from '../../../redux/categorieSlice'; 
import { selectProductByİd } from '../../../redux/testSliceİd';
import { selectCategorieİtems } from '../../../redux/categorieSlice';
import Link from 'next/link';
import Image from 'next/image'

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
  quantity: number
}

export default function GetCategorieResult({ params }: Props) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(selectProductByİd)
  const selectedCategorieProducts = useSelector(selectCategorieİtems)
  console.log(selectedCategorieProducts)
 
  const product = "laptops"; 
  
  useEffect(() => {
    if(params.categorieQuery) {
      const categorieQuery = params.categorieQuery
      dispatch(fetchCategorieDatas({product, categorieQuery }) as any);
    }
  },[dispatch]);

  return (
    <>
      {selectedCategorieProducts.map((item) => (
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