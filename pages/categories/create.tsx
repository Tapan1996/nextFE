import React from 'react';
import CategoryForm from '../../components/CategoryForm';
import Layout from "../../components/Layout";

const CategoryCreate = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div>
                <h1>Create a New Category</h1>
                <CategoryForm/>
            </div>
        </Layout>
    );
};

export default CategoryCreate;