import {useRouter} from 'next/router';
import ProductUpdateForm from '../../../components/ProductUpdateForm';
import Layout from "../../../components/Layout";
import React, {useEffect} from "react";
import getConfig from "next/config";
import {toast} from "react-toastify";
import productUpdateForm from "../../../components/ProductUpdateForm";
import CategoryUpdateForm from "../../../components/CategoryUpdateForm";

const UpdateProductPage = () => {
    const router = useRouter();
    const {id} = router.query;


    return (


        <Layout title="Home | Next.js + TypeScript Example">

            <div className="rounded overflow-hidden shadow-lg">
                <div className="bg-gray-200 text-gray-700 py-2 px-4 mt-5 font-semibold">
                    <h1>Edit Product</h1>
                </div>
                <div className="px-6 py-4">
                    <ProductUpdateForm productId={id as string}/>
                </div>
            </div>

        </Layout>

    );
};

export default UpdateProductPage;