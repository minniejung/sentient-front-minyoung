import { Logo } from '@/assets/logo'
import { ChatInput } from '@/components/inputs/ChatInput'

import { SuggestedQuestions } from './SuggestedQuestions'

interface NewChatProps {
	onStartChat: (input: string) => void
}

export const NewChat = ({ onStartChat }: NewChatProps) => {
	return (
		<>
			<Logo className='mb-6 h-[80.3px] w-[73.274px]' />
			<ChatInput hasBgColor onClick={onStartChat} />
			<SuggestedQuestions onSelectQuestion={onStartChat} />
		</>
	)
}
