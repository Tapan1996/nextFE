import {useRouter} from 'next/router';
import CategoryUpdateForm from '../../../components/CategoryUpdateForm';
import Layout from "../../../components/Layout";
import CategoryForm from "../../../components/CategoryForm";
import React from "react";
import internal from "stream";

const UpdateCategoryPage = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <Layout title="Home | Next.js + TypeScript Example">

            <div className="rounded overflow-hidden shadow-lg">
                <div className="bg-gray-200 text-gray-700 py-2 px-4 mt-5 font-semibold">
                    <h1>Edit category</h1>
                </div>
                <div className="px-6 py-4">
                    <CategoryUpdateForm categoryId={id as string}/>
                </div>
            </div>

        </Layout>
    );
};

export default UpdateCategoryPage;