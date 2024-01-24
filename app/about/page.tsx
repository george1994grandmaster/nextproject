"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatas } from '../redux/testSlice'; 
import { selectAllProducts } from '../redux/testSlice'; 
import { fetchSidebarDatas, selectSidebarDatas } from '../redux/sidebarSlice'; 
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image'


export default function About() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllProducts);
  const sidebarDatas = useSelector(selectSidebarDatas);
  const router = useRouter()


  const product = "laptops"; 
  const sidebarİtems = 'productsMenu';
  const dataCount = 2;
  

  useEffect(() => {
    dispatch(fetchDatas({product}) as any);
    dispatch(fetchSidebarDatas({sidebarİtems}) as any);
  }, [dispatch]);

  

  return (
    <>
      <ul>
        {sidebarDatas.map((item) => (
          <div key={item.id}>
            <button onClick={() => router.push(`/searchProduct/categories/${item.title}`)} >{item.title}</button>
          </div>
        ))}
      </ul>
      {data.map((item) => (
        <div className='mb-standart'>
          <Link href={`/selectedProduct/${item.id}`} key={item.id}>
            <span>ID: {item.id}</span>
            <span>Title: {item.title}</span>
            <Image
              src={item.src}
              width={500}
              height={500}
              alt="Picture of the author"
            />
            <span>Title: {item.price}</span>
          </Link>
        </div>
      ))}
    </>
  );
}