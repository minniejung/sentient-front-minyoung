'use client'

import React, { useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import { Logo } from '@/assets/logo'
import { ChatInput } from '@/components/inputs/ChatInput'
import {
	ChatMessage,
	ChatSession as ChatSessionAtom,
	currentSessionAtom,
	inputValueAtom,
	isAnswerLoadingAtom,
	stopRequestedAtom,
} from '@/store/chat.atoms'
import { saveSession } from '@/utils/db'
import { DummyQna } from '@/utils/dummyQna'

import { CopyAndLikes } from './CopyAndLikes'

const ChatSession: React.FC = () => {
	const [session, setSession] = useAtom(currentSessionAtom)
	const [inputValue, setInputValue] = useAtom(inputValueAtom)
	const [isAnswerLoading, setAnswerLoading] = useAtom(isAnswerLoadingAtom)
	const [stopRequested, setStopRequested] = useAtom(stopRequestedAtom)

	const [currentAnswer, setCurrentAnswer] = useState<string>('')

	// const bottomRef = useRef<HTMLDivElement>(null)

	const updateLastChat = (newData: Partial<ChatMessage>) => {
		setSession(prev => ({
			...prev,
			chats: prev.chats.map((chat, index) => (index === prev.chats.length - 1 ? { ...chat, ...newData } : chat)),
		}))
	}

	const saveAndDispatchSession = (updatedSession: ChatSessionAtom) => {
		saveSession(updatedSession).then(() => {
			window.dispatchEvent(new Event('sessionUpdated'))
		})
	}

	const handleAnswerDisplay = (questionText: string) => {
		const fullAnswer = DummyQna[questionText.trim().toLowerCase()] || "I'm not sure about that."
		const delay = 2000
		setAnswerLoading(true)

		setTimeout(() => {
			if (typeof fullAnswer === 'string') {
				let i = 0
				setCurrentAnswer('')
				const displayInterval = setInterval(() => {
					if (stopRequested || i >= fullAnswer.length) {
						clearInterval(displayInterval)
						updateLastChat({ answer: fullAnswer, loading: false })
						setAnswerLoading(false)
						saveAndDispatchSession(session)
					} else {
						setCurrentAnswer(prev => prev + fullAnswer[i])
						i++
					}
				}, 50)
			} else {
				updateLastChat({ answer: fullAnswer, loading: false })
				setAnswerLoading(false)
			}
		}, delay)
	}

	const handleSubmit = async (customInput?: string) => {
		const questionText = (customInput || inputValue).trim()
		if (!questionText) return

		setStopRequested(false)
		setInputValue('')
		setCurrentAnswer('')

		setSession(prev => ({
			...prev,
			chats: [...prev.chats, { question: questionText, answer: '', loading: true }],
		}))
	}

	useEffect(() => {
		if (session.chats.length > 0) {
			const lastChat = session.chats[session.chats.length - 1]
			if (lastChat.loading && !isAnswerLoading) {
				handleAnswerDisplay(lastChat.question)
			}
		}
	}, [session.chats, isAnswerLoading])

	useEffect(() => {
		const handleSaveSession = () => saveSession(session)

		window.addEventListener('beforeunload', handleSaveSession)
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				handleSaveSession()
			}
		})

		return () => {
			window.removeEventListener('beforeunload', handleSaveSession)
			document.removeEventListener('visibilitychange', handleSaveSession)
		}
	}, [session])

	useEffect(() => {
		if (session.chats.length > 0) saveSession(session)
	}, [session])

	// useEffect(() => {
	// 	if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
	// }, [session.chats, currentAnswer])

	return (
		<>
			<div className='relative flex h-full w-full max-w-[800px] flex-col md:my-0 md:pt-0'>
				<div className='mb-32 h-full space-y-4 overflow-y-auto md:mt-0 md:h-full'>
					{session.chats.map((chat, index) => (
						<div key={index} className='flex flex-col space-y-2'>
							<div className='traking-[-0.32px] min-h-[50px] rounded-b-[20px] border border-stroke p-4 text-[16px] font-medium leading-[24px]'>
								{chat.question}
							</div>

							<div className='flex flex-row gap-3 px-4'>
								<figure className='h-full pt-[6px]'>
									<Logo className='h-[22.434px] w-[22.016px]' />
								</figure>
								<>
									{chat.loading && index === session.chats.length - 1 ? (
										<div className='pt-1 font-semibold text-black'>
											<span className='gradient-text-loading'>Searching for {chat.question}...</span>
										</div>
									) : (
										<div className='relative w-full pt-1'>
											<div>{chat.answer || (index === session.chats.length - 1 ? currentAnswer : '')}</div>
											<CopyAndLikes index={index} answer={chat.answer || currentAnswer} />
										</div>
									)}
								</>
								{/* <div ref={bottomRef} /> */}
							</div>
						</div>
					))}
				</div>

				<div className='absolute bottom-0 w-full md:hidden'>
					<ChatInput onClick={handleSubmit} />
				</div>
				<div className='hidden md:flex'>
					<ChatInput onClick={handleSubmit} isSimple hasBgColor className='mb-10' />
				</div>
			</div>
		</>
	)
}

export default ChatSession
