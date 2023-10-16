import React, {useState, ChangeEvent, FormEvent} from 'react';
import {toast} from "react-toastify";
import getConfig from "next/config";
import {useRouter} from "next/router";

const CategoryForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const router = useRouter();
    let clicked = false;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clicked = true;
        const {publicRuntimeConfig} = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;


        try {
            // Send a POST request to the API endpoint with the 'name' parameter
            const response = await fetch(apiUrl + '/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name}),
            }).then(response => response.json()).then((data) => {
                    if (data.success) {
                        router.push('/categories');
                    } else {
                        console.log(data);
                        toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
                    }
                }
            );
            // Clear the form after successful submission

        } catch (error) {
            toast('Error', {hideProgressBar: true, autoClose: 2000, type: 'error'})
        }
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="category_name" className="mb-1 text-sm font-semibold text-gray-600">
                Category Name:
            </label>
            <input
                id="category_name"
                required
                type="text"
                className="py-2 px-3 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                placeholder="Category name"
                value={name}
                onChange={handleNameChange}
            />

            <button type="submit"
                    className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"> Create
                category
            </button>
        </form>
    );
};

export default CategoryForm;
