import { Logo } from '@/assets/logo'
import { ChatInput } from '@/components/inputs/ChatInput'

import { SuggestedQuestions } from './SuggestedQuestions'

interface NewChatProps {
	onStartChat: (input: string) => void
}

export const NewChat = ({ onStartChat }: NewChatProps) => {
	return (
		<div className='relative h-full flex-center w-full max-w-[800px] px-4'>
			<div className='flex-center md:relative flex-col absolute bottom-0 left-0 w-full'>
				<Logo className='mb-6 h-[80.3px] w-[73.274px]' />
				<ChatInput hasBgColor onClick={onStartChat} />
				<SuggestedQuestions onSelectQuestion={onStartChat} />
			</div>
		</div>
	)
}
