import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import dentistAvatar from '@/public/member-03.png'

export const DentistCard = ({ dentist }) => {
	return (
		<Card className='hover:bg-primary-foreground cursor-pointer transition-all'>
			<CardHeader>
				<div className='mb-3'>
					<Image
						src={dentistAvatar} // Replace with your actual image path
						alt='About Dental'
						className='w-full h-full object-contain'
					/>
				</div>
				<CardTitle>{dentist.name}</CardTitle>
				<CardDescription>{dentist.qualification}</CardDescription>
			</CardHeader>
		</Card>
	)
}
