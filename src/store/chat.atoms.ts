import { atom } from 'jotai'

export interface ChatMessage {
	question: string
	answer: React.ReactNode | null
	loading: boolean
}

export interface ChatSession {
	sessionId: string
	chats: ChatMessage[]
	timestamp: string
}

export const currentSessionAtom = atom<ChatSession>({
	sessionId: crypto.randomUUID(),
	chats: [],
	timestamp: new Date().toISOString(),
})

export const inputValueAtom = atom<string>('')
export const stopRequestedAtom = atom<boolean>(false)
export const isAnswerLoadingAtom = atom<boolean>(false)
