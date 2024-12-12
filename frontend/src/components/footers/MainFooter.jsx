import { LogoHeader } from '../headers/LogoHeader'

export const MainFooter = () => {
	return (
		<footer className='bg-blue-900 text-white py-8'>
			<div className='container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-14 md:gap-16 xl:gap-20'>
				{/* Column 1: Logo and Description */}
				<div className='flex flex-col'>
					<div className='flex items-center mb-4'>
						<LogoHeader className={'text-white'} />
					</div>
					<p className='text-gray-300'>
						Exceptional dental care for all ages. Your great smile begins with a
						great dentist.
					</p>
				</div>

				{/* Column 2: Support Links */}
				<div>
					<h3 className='text-lg font-semibold mb-4'>Support</h3>
					<ul className='space-y-2'>
						<li>
							<a href='#' className='hover:underline'>
								About
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Contact us
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Help center
							</a>
						</li>
					</ul>
				</div>

				{/* Column 3: Navigation Links */}
				<div>
					<h3 className='text-lg font-semibold mb-4'>Navigation</h3>
					<ul className='space-y-2'>
						<li>
							<a href='#' className='hover:underline'>
								Product
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Research
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Professional education
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Patient education
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Gallery
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Sitemap
							</a>
						</li>
					</ul>
				</div>

				{/* Column 4: Opening Hours */}
				<div className='flex flex-col shrink-0'>
					<h3 className='text-lg font-semibold mb-4'>Opening Hours</h3>
					<ul className='space-y-2'>
						<li>
							<span className='flex justify-between'>
								<span>Monday</span>
								<span>9:00am - 6:00pm</span>
							</span>
						</li>
						<li>
							<span className='flex justify-between'>
								<span className='text-gray-400'>Tuesday</span>
								<span className='text-gray-400'>CLOSED</span>
							</span>
						</li>
						<li>
							<span className='flex justify-between'>
								<span>Wednesday</span>
								<span>9:00am - 6:00pm</span>
							</span>
						</li>
						<li>
							<span className='flex justify-between'>
								<span className='text-gray-400'>Thursday</span>
								<span className='text-gray-400'>CLOSED</span>
							</span>
						</li>
						<li>
							<span className='flex justify-between'>
								<span>Friday</span>
								<span>9:00am - 6:00pm</span>
							</span>
						</li>
						<li>
							<span className='flex justify-between'>
								<span>Saturday</span>
								<span>9:00am - 2:00pm</span>
							</span>
						</li>
						<li>
							<span className='flex justify-between'>
								<span>Sunday</span>
								<span>9:00am - 2:00pm</span>
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className='border-t border-black mt-8 pt-4 text-center text-gray-400'>
				© {new Date().getFullYear()} BELLEVILLE DENTAL.
			</div>
		</footer>
	)
}
