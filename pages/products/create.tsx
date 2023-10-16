import React from 'react';
import ProductForm from '../../components/ProductForm';
import Layout from "../../components/Layout";
import CategoryForm from "../../components/CategoryForm";

const ProductCreate = () => {
    return (
        <Layout>
            <div className="rounded overflow-hidden shadow-lg">
                <div className="bg-gray-200 text-gray-700 py-2 px-4 mt-5 font-semibold">
                    <h1>Create a New Product</h1>
                </div>
                <div className="px-6 py-4">
                    <ProductForm/>
                </div>
            </div>
        </Layout>
    );
};

export default ProductCreate;
