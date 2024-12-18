import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import Image from 'next/image'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'
import { Button } from '../ui/button'
import Link from 'next/link'

export const CourseCard = ({ course }) => {
	return (
		<Card className='hover:bg-primary-foreground hover:-translate-y-1 cursor-pointer transition-all flex flex-col overflow-hidden min-h-[434px]'>
			<div className='flex w-full mb-4 min-h-52 max-h-52 overflow-hidden grow'>
				<Image
					width={512}
					height={512}
					quality={50}
					src={makeResourcePublicUrlFromPath(course.thumbnail_path)} // Replace with your actual image path
					alt={course.title}
					className='w-full h-full object-cover mt-auto'
				/>
			</div>
			<CardHeader className='pt-0 h-full'>
				<CardTitle className='text-xl line-clamp-2 h-14 max-h-14'>
					{course.title}
				</CardTitle>
				<CardDescription className='flex items-center'>
					<span className='line-clamp-3'>{course.description}</span>
				</CardDescription>
			</CardHeader>
			<CardContent className='mt-auto'>
				<Button asChild>
					<Link href={`/education/courses/${course.id}`}>Learn Now</Link>
				</Button>
			</CardContent>
		</Card>
	)
}
