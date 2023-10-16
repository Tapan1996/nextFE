import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {toast} from "react-toastify";
import getConfig from "next/config";
import {useRouter} from "next/router";

const ProductForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [category_id, setCategoryId] = useState<string>('');
    const [categories, setCategories] = useState([''])
    const router = useRouter();


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories');
                const data = await response.json();
                console.log(data);
                setCategories(data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {publicRuntimeConfig} = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;
        try {
            // Send a POST request to the API endpoint with the 'name' parameter
            const response = await fetch(apiUrl + '/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, category_id, price}),
            }).then(response => response.json())
                .then((data) => {
                        if (data.success) {
                            router.push('/products');
                        } else {
                            toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
                            console.log(data);
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
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="product_name" className="mb-1 text-sm font-semibold text-gray-600">
                Product Name:
            </label>
            <input
                id="product_name"
                required
                type="text"
                className="py-2 px-3 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                placeholder="Product name"
                value={name}
                onChange={handleNameChange}
            />


            <label htmlFor="product_price" className="mb-1 text-sm font-semibold text-gray-600">
                Price:
            </label>
            <input
                id="product_price"
                required
                type="number"
                step="0.01"
                className="py-2 px-3 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                value={price}
                onChange={handlePriceChange}
            />


            <label htmlFor="category_id" className="mb-1 text-sm font-semibold text-gray-600">
                Category:
            </label>

            <select id="category_id"
                    className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    name="category_id"
                    onChange={(e) => setCategoryId(e.target.value)}
                    required>
                <option value="">Select a category</option>
                {categories.map((category, key) => (
                    <option key={'create_product' + key} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>


            <button type="submit"
                    className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"> Create
                Product
            </button>
        </form>
    );
};

export default ProductForm;
