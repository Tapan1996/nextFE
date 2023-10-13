import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import getConfig from "next/config";
import {useRouter} from "next/router";

interface CategoryUpdateFormProps {
    categoryId: string;
}

const CategoryUpdateForm: React.FC<CategoryUpdateFormProps> = ({categoryId}) => {
    const [name, setName] = useState('');
    const router = useRouter();


    useEffect(() => {
        const {publicRuntimeConfig} = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;
        const fetchData = async () => {
            try {
                // Fetch data from the API using the id parameter
                const response = await fetch(apiUrl + `/api/categories/${categoryId}`);
                const data = await response.json();
                setName(data.data.name);
                console.log(data.data.category_id);
            } catch (error) {
                // toast('error', {hideProgressBar: true, autoClose: 2000, type: 'error'})
            }
        }
        fetchData();
    })





    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {publicRuntimeConfig} = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;

        try {
            // Send a PATCH request to update the category with the 'name' parameter
            const response = await fetch(apiUrl + `/api/categories/${categoryId}`, {
                method: 'PATCH', // or 'PUT' if your API endpoint uses PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name}), // Update data (in this case, the name property)
            }).then(response => response.json()).then((data) => {
                    if (data.success) {
                        router.push(`/categories/${categoryId}`);
                    } else {
                        console.log(data);
                        toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
                    }
                }
            );

        } catch (error) {
            toast('Error', {hideProgressBar: true, autoClose: 2000, type: 'error'})
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Category Name:
                <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type="submit">Update Category</button>
        </form>
    );
};

export default CategoryUpdateForm;