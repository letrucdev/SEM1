import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { makeImageUrlFromPath } from '@/lib/utils'
import Image from 'next/image'

export const DentistCard = ({ dentist }) => {
	return (
		<Card className='hover:bg-primary-foreground cursor-pointer transition-all'>
			<CardHeader className='h-full justify-center'>
				<div className='flex w-full mb-4 h-full'>
					<Image
						width={540}
						height={580}
						src={makeImageUrlFromPath(dentist.avatar_path)} // Replace with your actual image path
						alt='About Dental'
						className='w-full h-full object-cover mt-auto'
					/>
				</div>
				<CardTitle>
					{dentist.first_name} {dentist.last_name}
				</CardTitle>
				<CardDescription>{dentist.education}</CardDescription>
			</CardHeader>
		</Card>
	)
}
