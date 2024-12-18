'use client'

import Link from 'next/link'

import { Logo } from '@/assets/logo'

import { ButtonNewChat } from './ButtonNewChat'
import { NavMenu } from './NavMenu'
import { ProfileArea } from './ProfileArea'

export const SideBar = () => {
	return (
		<>
			{/* Mobile */}
			<MobileTopArea />
			<MobileBottomNav />

			{/* Desktop */}
			<DesktopSideBar />
		</>
	)
}

const MobileTopArea = () => {
	return (
		<div className='flex-between fixed top-0 z-20 border-b border-stroke bg-white p-4 md:hidden'>
			<ButtonNewChat />
			<ProfileArea />
		</div>
	)
}

const MobileBottomNav = () => {
	return (
		<div className='fixed bottom-0 z-20 flex h-[73px] w-full border-t border-stroke bg-gray-f5 md:hidden'>
			<NavMenu className='flex w-full flex-row items-center justify-around' />
		</div>
	)
}

const DesktopSideBar = () => {
	return (
		<div className='md:flex-between fixed left-0 hidden h-screen min-w-[75px] max-w-[149.35px] flex-col border border-stroke bg-gray-f5 py-5 md:flex'>
			<Link href='/' className='flex-center md:mb-12 md:items-start'>
				<Logo className='h-9 w-9' />
			</Link>

			<NavMenu className='flex flex-grow flex-col justify-center' />

			<div className='flex-center flex-col space-y-8'>
				<ButtonNewChat />
				<ProfileArea />
			</div>
		</div>
	)
}
