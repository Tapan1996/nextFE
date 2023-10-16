import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/"> Home </Link>
                <div className="space-x-4">
                    <Link href="/categories">categories </Link>
                    <Link href="/products">products </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;