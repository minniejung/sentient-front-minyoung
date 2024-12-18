import { cn } from '@/utils/helpers/cn'

interface ButtonProps {
	onClick?: () => void
	children: React.ReactNode
	className?: string
	variant?: 'primary' | 'secondary'
	disabled?: boolean
}

export const ButtonText = ({
	onClick,
	children,
	className = '',
	variant = 'primary',
	disabled = false,
}: ButtonProps) => {
	const variantStyles = {
		primary: 'bg-gray-f4',
		secondary: 'bg-white',
	}

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={cn(
				'rounded-lg border border-stroke py-2 text-sm font-semibold leading-[155%] tracking-[-0.215px] text-gray-80 transition-all duration-200',
				variantStyles[variant],
				className,
				disabled ? 'cursor-not-allowed opacity-50' : '',
			)}>
			{children}
		</button>
	)
}
