'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { FaRegTrashAlt } from 'react-icons/fa'

import { ButtonText } from '@/components/buttons/ButtonText'
import { ChatSession } from '@/store/chat.atoms'
import { clearSessions, getSessions } from '@/utils/db'

export const HistoryList = () => {
	const router = useRouter()

	const [history, setHistory] = useState<ChatSession[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const handleClearAllHistory = async () => {
		try {
			await clearSessions()
			setHistory([])
		} catch (err) {
			console.error('Error clearing history:', err)
		}
	}

	const handleDeleteSession = async (sessionId: string) => {
		try {
			const dbRequest = indexedDB.open('chatDatabase', 1)

			dbRequest.onsuccess = () => {
				const db = dbRequest.result
				const transaction = db.transaction('chatSessions', 'readwrite')
				const objectStore = transaction.objectStore('chatSessions')

				const deleteRequest = objectStore.delete(sessionId)

				deleteRequest.onsuccess = () => {
					setHistory(prevHistory => prevHistory.filter(session => session.sessionId !== sessionId))
				}

				deleteRequest.onerror = (event: Event) => {
					console.error('Failed to delete session', event)
				}
			}

			dbRequest.onerror = (event: Event) => {
				console.error('Failed to open database', event)
			}
		} catch (err) {
			console.error('Error deleting session:', err)
		}
	}

	useEffect(() => {
		const fetchSessions = async () => {
			try {
				const sessions = await getSessions()

				const filteredSessions = sessions.filter(session => session.chats && session.chats.length > 0)

				setHistory(filteredSessions)
			} catch (err) {
				console.error('Error fetching chat history:', err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchSessions()
	}, [])

	return (
		<div className='flex h-full w-full flex-col items-start gap-4 md:py-6'>
			<div className='flex w-full flex-row gap-3 border-b p-4'>
				<h1 className='text-xl font-bold'>Chat History</h1>
				{history.length > 0 && (
					<ButtonText onClick={handleClearAllHistory} variant='secondary' className='w-fit px-2 py-0 text-[12px]'>
						Clear All History
					</ButtonText>
				)}
			</div>

			<div className='w-full space-y-4 px-4 pb-28 text-sm text-gray-80 md:pb-10'>
				{isLoading ? (
					<p className='px-2 italic'>Loading...</p>
				) : history.length > 0 ? (
					history
						.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
						.map(session => (
							<div key={session.sessionId} className='flex flex-row items-center gap-3'>
								<div
									onClick={() => router.push(`/history/${session.sessionId}`)}
									className='block w-full cursor-pointer rounded-lg border border-stroke bg-white p-4 text-left hover:bg-gray-f6'>
									<p className='text-xs'>{new Date(session.timestamp).toLocaleString()}</p>
									<p className='font-semibold text-secondary'>{session.chats[0]?.question || 'Empty Chat'}</p>
								</div>
								<FaRegTrashAlt
									onClick={() => handleDeleteSession(session.sessionId)}
									className='cursor-pointer text-xs'
								/>
							</div>
						))
				) : (
					<p className='px-2'>No chat history available.</p>
				)}
			</div>
		</div>
	)
}
