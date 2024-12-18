import { useState } from 'react'

import { cn } from '@/utils/helpers/cn'

interface ToggleTabsProps {
	tabs: string[]
	onTabChange?: (activeTab: string) => void
	className?: string
}

export const ToggleTabs = ({ tabs, onTabChange, className }: ToggleTabsProps) => {
	const [activeTab, setActiveTab] = useState<string>(tabs[0])

	const activeIndex = tabs.indexOf(activeTab)

	const handleTabClick = (tab: string) => {
		setActiveTab(tab)
		if (onTabChange) {
			onTabChange(tab)
		}
	}

	return (
		<div
			className={cn(
				'flex-center bg-gray-f6 relative h-[35.288px] w-[235.99px] overflow-hidden rounded-full md:h-8',
				className,
			)}>
			<div
				className={cn(
					'border-gray-eb absolute top-[4.5px] h-[26.466px] rounded-full border bg-white transition-transform duration-300 ease-in-out md:h-6',
					activeIndex === 0 ? 'left-1' : '-left-1',
				)}
				style={{
					width: `${100 / tabs.length}%`,
					transform: `translateX(${activeIndex * 100}%)`,
				}}
			/>

			{tabs.map(tab => (
				<button
					key={tab}
					onClick={() => handleTabClick(tab)}
					className={cn(
						'duration-400 md:font-nunito z-10 h-full flex-1 text-center text-xs font-semibold transition-colors md:text-sm',
						activeTab === tab ? 'text-secondary' : 'text-gray-ae',
					)}>
					{tab}
				</button>
			))}
		</div>
	)
}
