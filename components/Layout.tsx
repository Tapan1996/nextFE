import React, {ReactNode} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({children, title = 'This is the default title'}: Props) => (
    <div>
        <Head>
            <link rel="icon" href="/favicon.ico"/>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <header>
            <nav>
                <Link href="/">Home</Link>{' '}
                <Link href="/categories">Categories</Link> {' '}
                <Link href="/products">Products</Link>
            </nav>
        </header>

        {children}
        <footer>
            {/*<hr/>*/}
            <span></span>
        </footer>

        <ToastContainer/>
    </div>
)

export default Layout
