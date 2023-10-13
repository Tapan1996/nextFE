import Link from 'next/link'
import Layout from '../../components/Layout'
import React from 'react';
import getConfig from 'next/config';
import useToastHook from "../../hooks/useToastHook";


export default function Products({products}) {
    useToastHook(products);
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <Link href="/products/create">New product</Link> {' '}

            {products.data.map((product, key) => {
                return (
                    <Link href={`/products/${product.id}`} key={key}>{product.name}</Link>

                )
            })}
        </Layout>
    )
}


export async function getServerSideProps({}) {
    const {publicRuntimeConfig} = getConfig();
    const apiUrl = publicRuntimeConfig.apiUrl;
    const req = await fetch(apiUrl + '/api/products');
    const data = await req.json();

    return {props: {products: data}}

}