import './globals.css'
import { Roboto } from 'next/font/google'
import { QueryProvider } from '@/contexts/QueryProvider'
import { AuthProvider } from '@/contexts/AuthProvider'
import { Toaster } from '@/components/ui/sonner'

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
})

export const metadata = {
	title: 'Benlleville Dental',
	description: 'Group 2 - eProject SEM 1 - Benlleville Dental',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} antialiased`}>
				<QueryProvider>
					<AuthProvider>
						{children}
						<Toaster richColors />
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
