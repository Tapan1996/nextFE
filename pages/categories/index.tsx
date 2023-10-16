import Link from 'next/link'
import Layout from '../../components/Layout'
import React, {useEffect} from 'react';
import getConfig from 'next/config';
import useToastHook from "../../hooks/useToastHook";


export default function Categories({categories}) {
    // useToastHook(categories);
    return (
        <Layout>
            <Link className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                  href="/categories/create">New category</Link> {' '}
            <table className="min-w-full bg-gray-600">
                <tbody>
                <tr>
                    <th className="px-6 py-3 text-left">Id</th>
                    <th className="px-6 py-3 text-left">Name</th>
                </tr>
                {categories.data.map((category, key) => {
                    return (
                        <tr key={key} className={key % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-gray-300 text-black'}>
                            <td>{category.id}</td>
                            <td>
                                <Link href={`/categories/${category.id}`}>{category.name}</Link>
                            </td>
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
    const req = await fetch(apiUrl + '/api/categories');
    const data = await req.json();
    return {props: {categories: data}}
}