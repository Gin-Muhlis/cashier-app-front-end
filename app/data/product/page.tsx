import axios from 'axios'
import React from 'react'
import ContentProduct from './content';

type EntrustedProduct = {
  id: number;
  product_name: string;
  supplier_name: string;
  purchase_price: number;
  sell_price: number;
  stock: number;
  description: string;
}
 
const getEntrustedProducts = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/entrusted-products`);

  return response.data.data;
}

const EntrustedProduct = async () => {
  let entrustedProducts: EntrustedProduct[] = await getEntrustedProducts();
  
  return (
    <>
      <ContentProduct entrustedProducts={entrustedProducts} />
    </>
  )
}

export default EntrustedProduct