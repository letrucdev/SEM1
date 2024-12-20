import { MainFooter } from '@/components/footers/MainFooter'
import { MainHeader } from '@/components/headers/MainHeader'

export default function HomeLayout({ children }) {
	return (
		<div className='flex flex-col min-h-screen'>
			{/* Header */}
			<MainHeader />

			{/* Main Content */}
			<main className='flex-grow bg-background flex w-full justify-center'>{children}</main>

			{/* Footer */}
			<MainFooter />
		</div>
	)
}
