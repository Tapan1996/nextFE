import React, {ReactNode} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Navbar from "./Navbar";

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({children, title = 'This is the default title'}: Props) => (

    <div className=" text-slate-100 p-4 container mx-auto h-full w-full">
        <Head>
            <link rel="icon" href="/favicon.ico"/>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <Navbar/>
        {children}

        <footer>
            {/*<hr/>*/}
            <span></span>
        </footer>

        <ToastContainer/>
    </div>
)

export default Layout
