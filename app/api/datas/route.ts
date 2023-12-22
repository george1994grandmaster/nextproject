import { NextResponse } from "next/server";
import { posts } from "./posts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryName = searchParams.get('category');
  const dataCount = searchParams.get('dataCount');
  const productİd = searchParams.get('productİd');
  
  if (categoryName) {
    const categoryPosts = posts.find((post: any) => categoryName in post) as any;
    if (categoryPosts && categoryPosts[categoryName]) {
      let categoryArray = categoryPosts[categoryName];
      if (dataCount && categoryName === 'laptops') {
        categoryArray = categoryPosts[categoryName].slice(0, parseInt(dataCount))
      } 
     if(productİd) {
      categoryArray = categoryPosts[categoryName][parseInt(productİd) - 1];
     }
      
      return NextResponse.json(categoryArray);
    }
  }
}