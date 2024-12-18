'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@/utils/helpers/cn'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	const path = usePathname()

	return (
		<div
			className={cn(
				'flex h-full w-full max-w-[800px] flex-col items-center px-4 md:justify-center md:py-0',
				path.includes('discover') || path.includes('profile') ? 'justify-center' : '',
			)}>
			{children}
		</div>
	)
}
