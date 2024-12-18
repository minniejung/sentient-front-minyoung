import { useRef, useState } from 'react'

import { IconCopy } from '@/assets/icons/copy'
import { IconThumbsUp } from '@/assets/icons/thumbsUp'
import { cn } from '@/utils/helpers/cn'
import { copyToClipboard } from '@/utils/helpers/copyToClipboard'

interface ChatFeedback {
	like: boolean
	dislike: boolean
}

export const CopyAndLikes = ({ index, answer }: { index: number; answer: string | React.ReactNode }) => {
	const answerRef = useRef<HTMLDivElement>(null)

	const handleCopy = () => {
		if (typeof answer === 'string') {
			copyToClipboard(answer)
		} else if (answerRef.current) {
			copyToClipboard(answerRef.current)
		}
	}

	return (
		<div className='flex-between my-6'>
			<button onClick={handleCopy} className='flex flex-row items-center gap-1'>
				<IconCopy className='h-5 w-5' />
				<div className='text-gray-a9 text-xs'>Copy</div>
			</button>

			<div ref={answerRef} className='hidden'>
				{answer}
			</div>

			<LikeButtons index={index} />
		</div>
	)
}

const LikeButtons = ({ index }: { index: number }) => {
	const [feedbacks, setFeedbacks] = useState<{ [key: number]: ChatFeedback }>({})

	const handleFeedback = (index: number, type: 'like' | 'dislike') => {
		setFeedbacks(prev => ({
			...prev,
			[index]: {
				like: type === 'like' ? !prev[index]?.like : false,
				dislike: type === 'dislike' ? !prev[index]?.dislike : false,
			},
		}))
	}

	return (
		<div className='space-x-4'>
			<button onClick={() => handleFeedback(index, 'like')}>
				<IconThumbsUp
					className={cn('h-5 w-5 hover:fill-green-800', feedbacks[index]?.like ? 'fill-green-800' : 'fill-gray-a9')}
				/>
			</button>
			<button onClick={() => handleFeedback(index, 'dislike')}>
				<IconThumbsUp
					className={cn(
						'h-5 w-5 rotate-180 hover:fill-red-800',
						feedbacks[index]?.dislike ? 'fill-red-800' : 'fill-gray-a9',
					)}
				/>
			</button>
		</div>
	)
}
