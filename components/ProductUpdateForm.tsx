import React, {ChangeEvent, useEffect, useState} from 'react';
import {toast} from "react-toastify";
import getConfig from "next/config";
import {useRouter} from "next/router";

interface ProductUpdateFormProps {
    productId: string;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({productId}) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [category_id, setCategoryId] = useState<string>('');
    const [categories, setCategories] = useState([''])
    const router = useRouter();


    useEffect(() => {
        const {publicRuntimeConfig} = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;
        const fetchData = async () => {
            try {
                if (productId) {
                    // Fetch data from the API using the id parameter
                    const response = await fetch(apiUrl + `/api/products/${productId}`);
                    const data = await response.json();
                    setName(data.data.name);
                    setPrice(data.data.price);
                    setCategoryId(data.data.category_id);
                    console.log(data.data.category_id);
                }
            } catch (error) {
                // toast('error', {hideProgressBar: true, autoClose: 2000, type: 'error'})
            }
        }
        fetchData();
    }, [categories])


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories');
                const data = await response.json();
                setCategories(data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {publicRuntimeConfig} = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;

        try {
            // Send a PATCH request to update the product with the 'name' parameter
            const response = await fetch(apiUrl + `/api/products/${productId}`, {
                method: 'PATCH', // or 'PUT' if your API endpoint uses PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, category_id, price}), // Update data (in this case, the name property)
            }).then(response => response.json()).then((data) => {
                    if (data.success) {
                        router.push(`/products/${productId}`);
                    } else {
                        console.log(data);
                        toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
                    }
                }
            );
        } catch (error) {
            toast(JSON.stringify(error), {hideProgressBar: true, autoClose: 2000, type: 'error'})
        }
    };
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };
    const handleCategoryChange = (e) => {
        // Update the categoryId state when the selection changes
        setCategoryId(e.target.value);
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
                type="text"
                className="py-2 px-3 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                value={price}
                onChange={handlePriceChange}
            />

            <label htmlFor="category_id" className="mb-1 text-sm font-semibold text-gray-600">
                Category:
            </label>


            <select
                id="category_id"
                className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                value={category_id}
                name="category_id"// Set the selected value using the state variable
                onChange={(e) => setCategoryId(e.target.value)} // Handle selection changes
                required>

                <option value="">Select a category</option>

                {categories.map((category, key) => (
                    <option key={'update_product' + key} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>


            <button type="submit"
                    className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"> Update
                Product
            </button>
        </form>
    );
};

export default ProductUpdateForm;