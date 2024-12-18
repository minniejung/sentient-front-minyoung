'use client'

import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { IconPlus } from '@/assets/icons/plus'
import { currentSessionAtom } from '@/store/chat.atoms'
import { saveSession } from '@/utils/db'

export const ButtonNewChat = () => {
	const router = useRouter()

	const [session, setSession] = useAtom(currentSessionAtom)

	const handleNewChat = async () => {
		await saveSession(session)
		setSession({
			sessionId: crypto.randomUUID(),
			chats: [],
			timestamp: new Date().toISOString(),
		})
		router.push('/')
	}

	return (
		<button onClick={handleNewChat}>
			<IconPlus className='h-6 w-6 fill-secondary' />
		</button>
	)
}
