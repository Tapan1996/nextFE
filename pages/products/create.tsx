import React from 'react';
import ProductForm from '../../components/ProductForm';
import Layout from "../../components/Layout";

const ProductCreate = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div>
                <h1>Create a New Product</h1>
                <ProductForm  />
            </div>
        </Layout>
    );
};

export default ProductCreate;
