'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, SVGProps, useEffect, useState } from 'react'

import { ReadonlyDeep } from 'type-fest'

import { IconGlobe } from '@/assets/icons/globe'
import { IconHome } from '@/assets/icons/home'
import { IconSandGlass } from '@/assets/icons/sandglass'
import { cn } from '@/utils/helpers/cn'

interface NavItem {
	label: string
	href: string
	Icon: (props: SVGProps<SVGSVGElement>) => ReactNode
}

export const navItems = [
	{
		label: 'Home',
		href: '/',
		Icon: IconHome,
	},
	{
		label: 'History',
		href: '/history',
		Icon: IconSandGlass,
	},
	{
		label: 'Discover',
		href: '/discover',
		Icon: IconGlobe,
	},
] as const satisfies ReadonlyDeep<NavItem[]>

export const NavMenu = ({ className }: { className?: string }) => {
	const path = usePathname()

	const [activeIndex, setActiveIndex] = useState<number>(0)

	useEffect(() => {
		const currentIndex = navItems.findIndex(item => item.href === path)
		if (currentIndex >= 0) setActiveIndex(currentIndex)
	}, [path])

	return (
		<nav className={className}>
			<ul className='flex-center relative h-[73px] flex-row gap-14 xs:gap-32 md:h-fit md:w-full md:flex-col md:gap-[22px] md:p-0'>
				{navItems.map(({ label, href, Icon }) => (
					<Link key={label} href={href} className='group md:h-[46px] md:pt-1'>
						<li className='flex-center w-[71px] cursor-pointer flex-col md:w-fit md:p-2'>
							<Icon
								className={cn(
									'h-6 w-6 transition-colors duration-100',
									path === href ? 'fill-secondary stroke-secondary' : 'fill-gray-a9 stroke-none',
								)}
							/>
							<span
								className={cn(
									'text-[16px] font-semibold capitalize tracking-[-0.32px] md:hidden',
									path === href ? 'text-secondary' : 'text-gray-a9',
								)}>
								{label}
							</span>
						</li>
					</Link>
				))}

				<HighlightBarMobile activeIndex={activeIndex} />
				<HighlightBarDesktop activeIndex={activeIndex} />
			</ul>
		</nav>
	)
}

const HighlightBarMobile = ({ activeIndex }: { activeIndex: number }) => {
	const calculateMovementsMobile = (index: number, total: number) => {
		const barWidth = 71

		if (index === 0) return `0px`
		if (index === total - 1) return `calc(100% - ${barWidth}px)`
		return `calc(50% - ${barWidth / 2}px)`
	}

	return (
		<div
			className='absolute left-0 top-0 h-[3px] w-[71px] rounded-b-[10px] bg-secondary transition-all duration-300 md:hidden'
			style={{
				left: calculateMovementsMobile(activeIndex, navItems.length),
			}}
		/>
	)
}

const HighlightBarDesktop = ({ activeIndex }: { activeIndex: number }) => {
	return (
		<div
			className='absolute right-[-1px] top-0 hidden h-[46px] w-[5.5px] rounded-l-full bg-secondary transition-all duration-300 md:flex'
			style={{
				top: `calc(${activeIndex * 68}px)`,
			}}
		/>
	)
}
