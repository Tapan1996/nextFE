import Link from 'next/link'
import Layout from '../../components/Layout'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useToastHook from "../../hooks/useToastHook";
import getConfig from "next/config";
import {toast} from "react-toastify";


export default function Category({category}) {
    useToastHook(category);
    const router = useRouter();
    const {id} = router.query;

    const handleDelete = async () => {
        try {
            const {publicRuntimeConfig} = getConfig();
            const apiUrl = publicRuntimeConfig.apiUrl;

            await fetch(apiUrl + `/api/categories/${id}`, {
                method: 'DELETE'
            }).then(response => response.json()).then((data) => {
                    if (data.success) {
                        router.push('/categories');
                    } else {
                        console.log(data);
                        toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
                    }
                }
            );

        } catch (error) {
            toast('Error', {hideProgressBar: true, autoClose: 2000, type: 'error'})
        }
    };
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1 key={category.data.id}>{category.data.name} </h1>

            <Link href={`/categories/update/${category.data.id}`} key={category.data.id}>Update</Link>{' '}
            <button onClick={handleDelete}>Delete Category</button>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    const {publicRuntimeConfig} = getConfig();
    const apiUrl = publicRuntimeConfig.apiUrl;


    // Fetch data from the API using the id parameter
    const response = await fetch(apiUrl + `/api/categories/${id}`);
    const category = await response.json();

    // Pass the fetched data as props
    return {
        props: {
            category,
        },
    };
}
