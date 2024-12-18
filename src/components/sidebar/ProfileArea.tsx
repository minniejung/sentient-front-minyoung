import Link from 'next/link'

export const ProfileArea = () => {
	return (
		<Link href='/profile'>
			<div className='flex-center bg-gray-f5 h-9 w-9 overflow-hidden rounded-full border-2 border-secondary text-center md:h-8 md:w-8 md:border-[1px]'>
				<span className='font-bold md:text-sm'>S</span>
			</div>
		</Link>
	)
}
