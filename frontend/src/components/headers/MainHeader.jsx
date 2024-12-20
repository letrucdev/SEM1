import { AuthHeader } from './AuthHeader'
import { LogoHeader } from './LogoHeader'
import NavHeader from './NavHeader'

export const MainHeader = () => {
	return (
		<header className='flex justify-center border-b bg-background py-4 sticky top-0 z-50'>
			<div className='container flex justify-between items-center px-6'>
				<LogoHeader className={'lg:flex hidden'} />

				<NavHeader />

				<AuthHeader />
			</div>
		</header>
	)
}
