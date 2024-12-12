import Image from 'next/image'
import logoImage from '../../public/logo.svg'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
export const LogoHeader = ({ className, ...props }) => {
	return (
		<Link
			href={'/'}
			aria-label='Header logo'
			className={twMerge`flex items-center max-w-36 gap-2 text-black ${className}`}
			{...props}
		>
			<Image alt='logo' title='Logo' src={logoImage} />
			<p
				className='uppercase leading-5 font-bold'
				aria-label='Belleville Dental'
			>
				Belleville Dental
			</p>
		</Link>
	)
}
