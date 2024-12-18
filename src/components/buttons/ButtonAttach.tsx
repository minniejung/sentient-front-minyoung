import React, { useRef } from 'react'

import { IconAttach } from '@/assets/icons/attach'
import { cn } from '@/utils/helpers/cn'

interface ButtonAttachProps {
	hasLabel?: boolean
	className?: string
	onFileSelect?: (file: File | null) => void
}

export const ButtonAttach = ({ hasLabel = false, className = '', onFileSelect }: ButtonAttachProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null
		if (onFileSelect) {
			onFileSelect(file)
		}
	}

	return (
		<>
			<button type='button' onClick={handleButtonClick} className={cn('mr-2 flex items-center space-x-1', className)}>
				<IconAttach className='h-[24.112px] w-[24.112px]' />
				{hasLabel && (
					<span className='font-nunito text-gray-9c text-xs font-semibold tracking-[-0.655px] md:text-[16px] md:leading-[155%]'>
						Attach
					</span>
				)}
			</button>

			<input type='file' ref={fileInputRef} onChange={handleFileChange} className='hidden' />
		</>
	)
}
