'use client'
import Image from 'next/image'
/* import banner1 from '../../public/banner1.png' */
/* import banner2 from '../../public/banner2.png' */
/* import serviceBanner from '../../public/service.jpg' */
/* import dentistGroup from '../../public/dentist_group.jpg' */
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { DentistCard } from '@/components/cards/DentistCard'
import { PostCard } from '@/components/cards/PostCard'
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors'
import Link from 'next/link'
import { DentistCardSkeleton } from '@/components/cards/DentistCardSkeleton'

export default function HomePage() {
	const { doctors, isPendingGetDoctors } = useGetDoctors()
	return (
		<div className='flex flex-col min-h-screen gap-11'>
			{/* Hero Section */}
			<div className='relative flex items-center justify-center overflow-hidden w-full h-[600px] mt-6 px-6'>
				<div className='container w-full h-full flex items-center z-20 relative rounded-md overflow-hidden'>
					<div className='absolute w-full h-full from-black/90 bg-gradient-to-r z-10 flex items-center px-6 md:px-24'>
						<div className='md:max-w-[580px] max-w-full text-background'>
							<h1 className='text-4xl md:text-6xl font-bold leading-tight mb-3'>
								Exceptional dental care for all ages.
							</h1>
							<p className='text-sm md:text-lg'>
								Exceptional dental care for all ages. <br /> Your great smile
								begins with a great dentist.
							</p>
						</div>
					</div>
					<Image
						src={'/banner1.png'} // Replace with your actual image path
						width={1080}
						height={380}
						alt='Banner Home'
						className='w-full h-full object-cover absolute'
						priority
					/>
				</div>
			</div>

			{/* Welcome Section */}
			<div className='flex flex-col xl:flex-row justify-between pt-12 container mx-auto gap-3 md:gap-8 px-6'>
				{/* Left Section */}
				<div className='mb-4 md:mb-0 basis-1/2 max-w-[600px] xl:self-center'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4'>
						Welcome to Belleville Dental Care
					</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						Come to us for the personalized dental care you need and deserve.
						Our dental team looks forward to meeting you. Visit our Belleville
						dental office. We can&apos;t wait to welcome you to our dental
						family.
					</p>
				</div>

				{/* Right Section */}
				<div className='rounded-lg basis-1/2 shrink-0 h-full'>
					<Image
						src={'/banner2.png'} // Replace with your actual image path
						alt='Dental Office'
						width={480}
						height={287}
						className='rounded-md w-full object-cover shrink-0'
					/>
				</div>
			</div>

			{/* Services Section */}
			<div className='container mx-auto px-6 pt-12'>
				<div className='xl:text-center mb-8'>
					<h3 className='text-2xl md:text-4xl font-bold'>Our Services</h3>
					<p className='text-secondary-foreground max-w-2xl xl:mx-auto text-sm md:text-lg'>
						Exceptional dental care for all ages. Your great smile begins with a
						great dentist.
					</p>
				</div>

				<div className='flex flex-col md:flex-row gap-16 h-max md:items-center'>
					{/* Image Section */}
					<div className='basis-full xl:basis-1/2 h-full xl:block hidden shrink-0'>
						<Image
							src={'/service.jpg'} // Replace with your actual image path
							alt='Dental Patient'
							width={620}
							height={427}
							className='rounded-lg shadow-md h-full object-cover w-full'
						/>
					</div>

					{/* Services List */}
					<div className='basis-full xl:basis-1/2 flex flex-col h-full justify-between grow'>
						<div className='flex flex-col mb-auto h-full gap-6'>
							{[
								{
									title: 'Wisdom Teeth Removal',
									description:
										'Everything you expect and then some. Cleanings, fillings, and x-rays.',
								},
								{
									title: 'Preventative Dentistry',
									description:
										'Everything you expect and then some. Cleanings, fillings, and x-rays.',
								},
								{
									title: 'Oral Surgery',
									description:
										'Everything you expect and then some. Cleanings, fillings, and x-rays.',
								},
							].map((service, index) => (
								<Card key={index}>
									<div className='flex items-center pl-6'>
										<div className='w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shrink-0'>
											<svg
												width='22'
												height='25'
												viewBox='0 0 22 25'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M20.3598 2.8295C17.9505 -0.347847 14.2771 -0.35978 11.2481 1.30552C11.001 1.44446 10.7218 1.51162 10.4405 1.49979C10.1592 1.48797 9.88627 1.39762 9.65099 1.2384C8.49546 0.449379 7.2903 -0.109574 5.13898 0.411345C0.623347 1.50464 -6.10352e-05 5.0806 -6.10352e-05 9.15138C0.0796743 12.2952 0.500796 15.42 1.25545 18.4675C2.11829 22.0949 3.90376 24.0667 5.43348 24.0667C6.9632 24.0667 7.00957 22.2974 7.00957 20.8868C7.00957 19.2953 7.39499 14.9206 10.8641 14.9206C13.5316 14.9206 14.3333 18.5003 14.3333 20.8868C14.3329 23.167 15.1722 24.0667 16.6628 24.0667C19.5266 24.0667 20.9796 15.5102 21.3719 13.2531C21.7642 10.996 22.9882 6.29546 20.3598 2.8295Z'
													fill='#10375C'
												/>
											</svg>
										</div>
										<CardHeader>
											<CardTitle>{service.title}</CardTitle>
											<CardDescription>{service.description}</CardDescription>
										</CardHeader>
									</div>
								</Card>
							))}
						</div>
						<Button className='font-semibold mt-4'>All Services</Button>
					</div>
				</div>
			</div>

			{/* About US */}
			<div className='flex flex-col xl:flex-row items-center justify-between pt-16 container mx-auto px-6'>
				{/* Left Section */}
				<div className='xl:w-1/2 mb-4 xl:mb-0'>
					<h3 className='text-2xl md:text-4xl font-bold mb-4 text-black'>
						About Us
					</h3>
					<p className='text-gray-600 md:w-3/4 text-sm md:text-lg'>
						At Dentist, we’re more than just a dental practice—we’re a
						compassionate team committed to helping you achieve lifelong oral
						health and a smile you’re proud of. With a focus on personalized,
						patient-centered care, we strive to make each visit a comfortable
						and positive experience
					</p>
					<ul className='my-6 ml-6 list-disc [&>li]:mt-2 text-sm md:text-lg'>
						<li>Email: dental@mail.com</li>
						<li>Phone: (613) 689-9908</li>
						<li>Address: 135 Victoria Ave, Belleville, ON K8N 2B1 CA</li>
					</ul>
				</div>

				{/* Right Section */}
				<div className='xl:w-1/2'>
					<Image
						src={'/dentist_group.jpg'} // Replace with your actual image path
						alt='Dental Patient'
						width={1080}
						height={675}
						className='rounded-lg shadow-md'
					/>
				</div>
			</div>

			{/* Our dentist */}
			<div className='bg-white pt-16 container mx-auto px-6'>
				<div className='text-center mb-8'>
					<h3 className='text-2xl md:text-4xl font-bold text-gray-800 mb-2'>
						Our Dentist
					</h3>
					<Button className='px-10 py-2 font-semibold' asChild>
						<Link href={'/dentists'}>Meet More</Link>
					</Button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
					{!doctors &&
						isPendingGetDoctors &&
						Array(4)
							.fill(0)
							.map((_, i) => {
								return <DentistCardSkeleton key={i} />
							})}

					{doctors &&
						!isPendingGetDoctors &&
						doctors.map((dentist, index) => {
							return <DentistCard dentist={dentist} key={index} />
						})}
				</div>
			</div>

			{/* Latest Documents & Research Section */}
			<div className='container mx-auto py-16 px-6'>
				<h3 className='text-4xl font-bold text-gray-800 mb-8'>
					Read Latest Document & Research
				</h3>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{[
						{
							title: 'What is Population Health Management?',
							description:
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus pariatur voluptas suscipit corporis molestias natus! Quibusdam, deserunt! In, sunt maiores accusamus asperiores totam ea aliquam laboriosam at. Corrupti, eius!',
							image: '/images/research-placeholder1.jpg', // Replace with the actual image path
						},
						{
							title: 'What is Population Health Management?',
							description:
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus pariatur voluptas suscipit corporis molestias natus! Quibusdam, deserunt! In, sunt maiores accusamus asperiores totam ea aliquam laboriosam at. Corrupti, eius!',
							image: '/images/research-placeholder2.jpg', // Replace with the actual image path
						},
						{
							title: 'What is Population Health Management?',
							description:
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus pariatur voluptas suscipit corporis molestias natus! Quibusdam, deserunt! In, sunt maiores accusamus asperiores totam ea aliquam laboriosam at. Corrupti, eius!',
							image: '/images/research-placeholder1.jpg', // Replace with the actual image path
						},
					].map((post, index) => (
						<PostCard key={index} post={post} />
					))}
				</div>
				<div className='text-right mt-4'>
					<a href='#' className='text-blue-500 hover:underline font-medium'>
						Read more
					</a>
				</div>
			</div>
		</div>
	)
}
