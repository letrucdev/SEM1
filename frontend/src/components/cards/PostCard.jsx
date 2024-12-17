import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
/* import blog2Banner from '@/public/blog2.png' */
import Image from 'next/image'

export const PostCard = ({ post }) => {
	return (
		<Card className='hover:bg-primary-foreground cursor-pointer transition-all overflow-hidden'>
			<Image
				src={'/blog2.png'} // Replace with your actual image path
				alt='Post thumbnail'
				width={60}
				height={60}
				className='h-60 object-cover w-full'
			/>
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<CardDescription>{post.description}</CardDescription>
			</CardHeader>
		</Card>
	)
}
