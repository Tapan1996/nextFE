import Link from 'next/link'
import Layout from '../../components/Layout'
import React, {useEffect} from 'react';
import getConfig from 'next/config';
import useToastHook from "../../hooks/useToastHook";


export default function Products({products}) {
    // useToastHook(products);
    return (
        <Layout>
            <Link className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                  href="/products/create">New product</Link> {' '}
            <table className="min-w-full bg-gray-600">
                <tbody>
                <tr>
                    <th className="px-6 py-3 text-left">Id</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Category</th>
                </tr>
                {products.data.map((product, key) => {
                    return (
                        <tr key={key} className={key % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-gray-300 text-black'}>
                            <td>{product.id}</td>
                            <td>
                                <Link href={`/products/${product.id}`}>{product.name}</Link>
                            </td>
                            <td>{product.price}</td>
                            <td>{product.category.name}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Layout>
    )
}

export async function getServerSideProps({}) {
    const {publicRuntimeConfig} = getConfig();
    const apiUrl = publicRuntimeConfig.apiUrl;
    const req = await fetch(apiUrl + '/api/products');
    const data = await req.json()
    return {props: {products: data}}
}