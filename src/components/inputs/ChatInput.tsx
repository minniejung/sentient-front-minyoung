import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

import { useAtom, useSetAtom } from 'jotai'

import { IconArrow } from '@/assets/icons/arrow'
import { IconStop } from '@/assets/icons/stop'
import { inputValueAtom, isAnswerLoadingAtom, stopRequestedAtom } from '@/store/chat.atoms'
import { cn } from '@/utils/helpers/cn'

import { ButtonAttach } from '../buttons/ButtonAttach'
import { ButtonIcon } from '../buttons/ButtonIcon'
import { ToggleTabs } from '../tabs/ToggleTabs'

interface ChatInputProps {
	onClick: (input: string) => void
	hasBgColor?: boolean
	isSimple?: boolean
	className?: string
}

export const ChatInput = ({ onClick, hasBgColor = false, isSimple = false, className = '' }: ChatInputProps) => {
	const [inputValue, setInputValue] = useAtom(inputValueAtom)

	const [showPicker, setShowPicker] = useState<boolean>(false)

	const handleEmojiClick = (emojiObject: { emoji: string }) => {
		setInputValue(prev => prev + emojiObject.emoji)
		setShowPicker(false)
	}

	const handleSubmit = () => {
		if (!inputValue.trim()) return
		onClick(inputValue)
		setInputValue('')
	}

	return (
		<div
			className={cn(
				'w-full md:mt-6',
				hasBgColor ? 'md:bg-gray-f1 md:p-2' : 'p-0',
				isSimple ? 'rounded-full md:h-fit' : 'rounded-2xl md:flex md:h-36',
				className,
			)}>
			<div
				className={cn(
					'h-[124px] w-full border border-stroke bg-white tracking-tight md:h-fit md:border-2',
					isSimple ? 'flex-between rounded-full py-2' : 'rounded-xl md:h-full',
				)}>
				<div className={cn('flex-between h-full w-full', isSimple ? 'flex-row px-4' : 'flex-col gap-2 p-[18px] pb-3')}>
					<div className={cn('flex w-full flex-row gap-1', isSimple ? 'items-center' : '')}>
						<ButtonAttach
							className={cn(
								'flex h-full items-start justify-start pt-[1.5px]',
								isSimple ? 'md:flex md:pt-0' : 'md:hidden',
							)}
						/>

						<div className={cn('relative flex w-full items-center')}>
							<textarea
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								placeholder={isSimple ? 'Ask a follow up...' : 'Ask me anything...'}
								rows={1}
								onKeyDown={e => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault()
										handleSubmit()
									}
								}}
								className='traking-[-0.32px] h-full w-full text-[16px] font-semibold leading-[155%] text-secondary md:font-nunito md:text-[18px] md:placeholder:text-[18px]'
							/>

							<div className='absolute bottom-1 right-1 md:bottom-[2px]'>
								<button onClick={() => setShowPicker(prev => !prev)}>🙂</button>
							</div>

							{showPicker && (
								<div className='absolute bottom-8 right-[-16px] z-10 md:right-0'>
									<EmojiPicker onEmojiClick={handleEmojiClick} height={280} searchDisabled />
								</div>
							)}
						</div>
					</div>

					<div className={cn('flex w-full flex-row', isSimple ? 'w-fit gap-4' : 'justify-between')}>
						<div className='flex flex-row items-center gap-2'>
							<div className='hidden md:flex'>
								<ButtonAttach hasLabel className={cn('flex-center space-x-2', isSimple ? 'md:hidden' : '')} />
							</div>

							<ToggleTabs tabs={['4s-mini', 's1-preview']} />
						</div>

						<SubmitButton handleSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	)
}

const SubmitButton = ({ handleSubmit }: { handleSubmit: () => void }) => {
	const [isAnswerLoading, setIsAnswerLoading] = useAtom(isAnswerLoadingAtom)

	const setStopRequested = useSetAtom(stopRequestedAtom)

	const handleStop = () => {
		setStopRequested(true)
		setIsAnswerLoading(false)
	}

	return (
		<>
			{isAnswerLoading ? (
				<ButtonIcon onClick={handleStop} icon={<IconStop className='h-[17.526px] w-[17.526px]' />} />
			) : (
				<ButtonIcon onClick={() => handleSubmit()} icon={<IconArrow className='h-[17.526px] w-[17.526px]' />} />
			)}
		</>
	)
}
