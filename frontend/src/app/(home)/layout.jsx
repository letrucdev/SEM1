'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
    const pathName = usePathname()
    return (
        <div className="flex flex-col">
            <header className="flex gap-4 border-b p-4">
                
                <Link href={'/home'} className={`hover:underline ${pathName.startsWith( '/home') && 'underline'}`}>
                    Home
                </Link>
                <Link href={'/product'} className={`hover:underline ${pathName.startsWith('/product') && 'underline'}`}>
                    Product
                </Link>
                <Link href={'/research'} className={`hover:underline ${pathName.startsWith('/research') && 'underline'}`}>
                    Research
                </Link>
                <Link href={'/education'} className={`hover:underline ${pathName.startsWith('/education') && 'underline'}`}>
                    Education
                </Link>
                <div className="flex gap-4  p-4">
                    <Link href={''} className={'bg-white rounded-md'}>Sign in</Link>
                    <Link href={''} className={'bg-blue-500 rounded-md'}>Sign up</Link>
                </div>
            </header>
            <main>{children}</main>
        </div>

    );

}