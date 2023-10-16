import Layout from '../components/Layout'
import React from "react";
import CategoryUpdateForm from "../components/CategoryUpdateForm";

export default function Home({categories}) {

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div className="rounded overflow-hidden shadow-lg">
                <div className="bg-gray-200 text-gray-700 py-2 px-4 mt-5 font-semibold">
                    <h1>Categories and Products CRUD</h1>
                </div>

            </div>
        </Layout>
    )
}
