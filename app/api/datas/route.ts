import { NextResponse } from "next/server";
import { posts } from "./posts";

interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity?: number,
  category: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryName = searchParams.get('category');
  const dataCount = searchParams.get('dataCount');
  const productİd = searchParams.get('productİd');
  const productQuery = searchParams.get('productQuery');
  const categorieQuery = searchParams.get('categorieQuery');
  
  
  if (categoryName) {
    const categoryPosts = posts.find((post: any) => categoryName in post) as any;
    let categoryArray = categoryPosts[categoryName];
    if (categoryName === 'laptops') {
      if(dataCount) {
        categoryArray = categoryPosts[categoryName].slice(0, parseInt(dataCount))
      }
      if(productİd) {
        categoryArray = categoryPosts[categoryName][parseInt(productİd) - 1];
      }
      if (productQuery) {
        categoryArray = categoryPosts[categoryName].filter((searchİtem: DataItem) =>
        searchİtem.title.toLowerCase().includes(productQuery)
        );
      }
      if (categorieQuery) {
        categoryArray = categoryPosts[categoryName].filter((item: any) =>
        item.category === categorieQuery)
      }
    } 
    return NextResponse.json(categoryArray);
  }
}