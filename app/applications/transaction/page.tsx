import axios from 'axios'
import Content from './Content'

type Type = {
    id: number;
    type_name: string;
}

type PaymentMethod = {
    id: number;
    icon: string;
    name: string;
}

type Menu = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    isEntrusted?: boolean
    type: {
        id: number;
        name: string
    }
}

type EntrustedProduct = {
    id: number;
    product_name: string;
    supplier_name: string;
    purchase_price: number;
    sell_price: number;
    stock: number;
    description: string;
}


const getTypes = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/types`);

    return response.data.data;
}

const getPaymentMethods = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment_methods`);

    return response.data.data;
}

const getMenus = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`);

    return response.data.data;
}

const getEntrustedProducts = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/entrusted-products`);

    return response.data.data;
}


const Transaction = async () => {
    const types: Type[] = await getTypes();
    const paymentMethods: PaymentMethod[] = await getPaymentMethods();
    let menus: Menu[] = await getMenus();
    let entrustedProducts: EntrustedProduct[] = await getEntrustedProducts();

    return (
        <Content products={entrustedProducts} types={types} menus={menus} paymentMethods={paymentMethods} />
    )
}

export default Transaction