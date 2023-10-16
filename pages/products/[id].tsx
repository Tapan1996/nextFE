import Link from 'next/link'
import Layout from '../../components/Layout'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useToastHook from "../../hooks/useToastHook";
import getConfig from "next/config";
import {toast} from "react-toastify";


export default function Product({product}) {
    // useToastHook(product);
    const router = useRouter();
    const {id} = router.query;

    const handleDelete = async () => {

        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const {publicRuntimeConfig} = getConfig();
                const apiUrl = publicRuntimeConfig.apiUrl;

                await fetch(apiUrl + `/api/products/${id}`, {
                    method: 'DELETE'
                }).then(response => response.json()).then((data) => {
                        if (data.success) {
                            router.push(`/products`);
                        } else {
                            console.log(data);
                            toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
                        }
                    }
                );
            } catch (error) {
                toast('Error', {hideProgressBar: true, autoClose: 2000, type: 'error'})
            }
        }
    };
    return (

        <Layout>
            <div className="rounded overflow-hidden shadow-lg">
                <div className="bg-gray-200 text-gray-700 py-2 px-4 mt-5 font-semibold">
                    <h1 key={product.data.id}>{product.data.name} </h1>
                </div>
                <div className="px-6 py-4">
                    <button onClick={handleDelete}
                            className="float-right bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Delete
                        Product
                    </button>
                    <Link
                        className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                        href={`/products/update/${product.data.id}`}>Update</Link> {' '}

                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    const {publicRuntimeConfig} = getConfig();
    const apiUrl = publicRuntimeConfig.apiUrl;

    // Fetch data from the API using the id parameter
    const response = await fetch(apiUrl + `/api/products/${id}`);
    const product = await response.json();
    // Pass the fetched data as props
    return {
        props: {
            product,
        },
    };
}
