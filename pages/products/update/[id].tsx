import {useRouter} from 'next/router';
import ProductUpdateForm from '../../../components/ProductUpdateForm';
import Layout from "../../../components/Layout";
import {useEffect} from "react";
import getConfig from "next/config";
import {toast} from "react-toastify";
import productUpdateForm from "../../../components/ProductUpdateForm";

const UpdateProductPage = () => {
    const router = useRouter();
    const {id} = router.query;


    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div>
                <h1>Edit Product</h1>
                <ProductUpdateForm productId={id as string}/>
            </div>
        </Layout>
    );
};

export default UpdateProductPage;