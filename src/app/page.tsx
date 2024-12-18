'use client'

import { useAtom } from 'jotai'

import { PageLayout } from '@/components/layouts/PageLayout'
import ChatSession from '@/features/chat/ChatSession'
import { NewChat } from '@/features/chat/NewChat'
import { currentSessionAtom } from '@/store/chat.atoms'

const Home: React.FC = () => {
	const [session, setSession] = useAtom(currentSessionAtom)

	const handleStartChat = (question: string) => {
		setSession({
			sessionId: crypto.randomUUID(),
			chats: [{ question, answer: '', loading: true }],
			timestamp: new Date().toISOString(),
		})
	}

	return (
		<PageLayout>{session.chats.length === 0 ? <NewChat onStartChat={handleStartChat} /> : <ChatSession />}</PageLayout>
	)
}

export default Home
