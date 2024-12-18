'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { IconArrow } from '@/assets/icons/arrow'
import { ButtonText } from '@/components/buttons/ButtonText'
import { PageLayout } from '@/components/layouts/PageLayout'
import { ChatMessage, ChatSession } from '@/store/chat.atoms'
import { getDB } from '@/utils/db'

interface PageProps {
	params: { id: string }
}

const SingleChatPage = ({ params }: PageProps) => {
	const [session, setSession] = useState<ChatSession | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const fetchSessionById = async (sessionId: string) => {
		try {
			const db = await getDB()
			const storedSession = await db.get('chatSessions', sessionId)

			if (storedSession) {
				setSession({
					...storedSession,
					chats: storedSession.chats.map((chat: ChatMessage) => ({
						...chat,
						answer: chat.answer,
					})),
				})
			} else {
				console.error('Session not found.')
			}
		} catch (error) {
			console.error('Error fetching session:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (params.id) {
			fetchSessionById(params.id)
		}
	}, [params.id])

	return (
		<PageLayout>
			{loading ? (
				<p>Loading session...</p>
			) : session ? (
				<div className='h-full w-full items-start overflow-y-auto md:pt-4'>
					<BackButton />

					<p className='text-xs'>Date: {session.timestamp}</p>

					<div className='space-y-2 py-8'>
						{session.chats.map((chat, index) => (
							<div key={index} className='flex w-full flex-col gap-6'>
								<p className='bg-gray-f6 w-fit self-end rounded-lg border border-stroke px-4 py-2 text-sm font-semibold transition-all duration-200'>
									{chat.question}
								</p>
								<ConvertAnswerdiv answer={chat.answer} />
							</div>
						))}
					</div>
				</div>
			) : (
				<p>Session not found.</p>
			)}
		</PageLayout>
	)
}

export default SingleChatPage

const BackButton = () => {
	const router = useRouter()

	return (
		<ButtonText
			onClick={() => {
				router.push('/history')
			}}
			variant='secondary'
			className='mb-4 flex flex-row items-center gap-2 border-none pl-0'>
			<IconArrow className='mt-1 h-4 w-4 rotate-180' />
			Back
		</ButtonText>
	)
}
const ConvertAnswerdiv = ({ answer }: { answer: React.ReactNode }) => {
	return (
		<div className='w-[80%] rounded-lg border border-stroke px-4 py-2 text-sm'>
			{typeof answer === 'string' ? (
				<div className='answer-style' dangerouslySetInnerHTML={{ __html: answer }} />
			) : (
				<div className='answer-style'>{answer}</div>
			)}
		</div>
	)
}
