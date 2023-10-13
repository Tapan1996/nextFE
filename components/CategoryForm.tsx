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
            <label>
                Category Name:
                <input
                    required
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
            </label>
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CategoryForm;
