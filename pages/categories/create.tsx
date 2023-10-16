import React from 'react';
import CategoryForm from '../../components/CategoryForm';
import Layout from "../../components/Layout";
import Link from "next/link";

const CategoryCreate = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div>

                <div className="rounded overflow-hidden shadow-lg">
                    <div className="bg-gray-200 text-gray-700 py-2 px-4 mt-5 font-semibold">
                        <h1>Create a New Category</h1>
                    </div>
                    <div className="px-6 py-4">
                        <CategoryForm/>
                    </div>
                </div>


            </div>
        </Layout>
    );
};

export default CategoryCreate;