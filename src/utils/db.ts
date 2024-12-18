import React from 'react'

import parse from 'html-react-parser'
import { openDB } from 'idb'
import ReactDOMServer from 'react-dom/server'

import { ChatSession } from '@/store/chat.atoms'

const DB_NAME = 'chatDatabase'
const STORE_NAME = 'chatSessions'

function serializeAnswer(answer: string | React.ReactNode | null): string {
	if (typeof answer === 'string') return answer
	if (answer === null || answer === undefined) return ''

	if (React.isValidElement(answer)) {
		return ReactDOMServer.renderToStaticMarkup(answer)
	}

	return ''
}

function deserializeAnswer(answer: string): React.ReactNode {
	if (!answer) return ''
	return parse(answer)
}

export async function getDB() {
	return openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: 'sessionId' })
			}
		},
	})
}

export async function saveSession(session: ChatSession) {
	const db = await getDB()
	const serializedSession = {
		...session,
		chats: session.chats.map(chat => ({
			...chat,
			answer: serializeAnswer(chat.answer),
		})),
	}
	try {
		await db.put(STORE_NAME, serializedSession)
	} catch (err) {
		console.error('Failed to save session:', err)
	}
}

export async function getSessions(): Promise<ChatSession[]> {
	const db = await getDB()
	try {
		const sessions = await db.getAll(STORE_NAME)
		return sessions.map(session => ({
			...session,
			chats: session.chats.map((chat: { answer: string }) => ({
				...chat,
				answer: deserializeAnswer(chat.answer),
			})),
		}))
	} catch (err) {
		console.error('Failed to fetch sessions:', err)
		return []
	}
}

export async function clearSessions() {
	const db = await getDB()
	try {
		await db.clear(STORE_NAME)
	} catch (err) {
		console.error('Failed to clear sessions:', err)
	}
}
