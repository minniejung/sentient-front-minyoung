import { cn } from '@/utils/helpers/cn'

interface ButtonIconProps {
	onClick: () => void
	className?: string
	icon: React.ReactNode
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({ onClick, className = '', icon }) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'flex-center hover:bg-gray-f1 h-[43.814px] w-[43.814px] rounded-full border border-stroke md:h-9 md:w-9',
				className,
			)}>
			{icon}
		</button>
	)
}
