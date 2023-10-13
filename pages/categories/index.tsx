import Link from 'next/link'
import Layout from '../../components/Layout'
import React, {useEffect} from 'react';
import getConfig from 'next/config';
import useToastHook from "../../hooks/useToastHook";


export default function Categories({categories}) {
    useToastHook(categories);
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <Link href="/categories/create">New category</Link> {' '}

            {categories.data.map((category, key) => {
                return (
                    <Link href={`/categories/${category.id}`} key={key}>{category.name}</Link>

                )
            })}
        </Layout>
    )
}


export async function getServerSideProps({}) {
    const {publicRuntimeConfig} = getConfig();
    const apiUrl = publicRuntimeConfig.apiUrl;
    const req = await fetch(apiUrl + '/api/categories');
    const data = await req.json();
    return {props: {categories: data}}
}