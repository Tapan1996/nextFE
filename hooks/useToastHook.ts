import {useEffect} from 'react';
import {toast} from "react-toastify";

function useToastHook(data) {
    useEffect(() => {
        async function useToast() {
            if (data.success) {
                toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'success'})
            } else {
                toast(data.message, {hideProgressBar: true, autoClose: 2000, type: 'error'})
            }
        }
        useToast();
    }),[];
    return data;
}

export default useToastHook;
