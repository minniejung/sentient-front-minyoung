import { ButtonText } from '@/components/buttons/ButtonText'
import { cn } from '@/utils/helpers/cn'

interface SuggestedQuestionsProps {
	onSelectQuestion: (question: string) => void
}

const questions = [
	'What is Sentient?',
	'What’s the meaning of life?',
	'How do you define love?',
	'What’s the meaning of AI?',
]

export const SuggestedQuestions = ({ onSelectQuestion }: SuggestedQuestionsProps) => {
	return (
		<div className='mt-3 grid w-full grid-cols-2 gap-[10px] sm:grid-cols-3 md:mt-4'>
			{questions.map((question, index) => (
				<ButtonText
					key={index}
					onClick={() => onSelectQuestion(question)}
					variant='primary'
					className={cn(
						'min-h-10 text-[10.75px] xs:text-[12px] md:h-14 md:font-nunito md:text-[16px]',
						index === 3 ? 'sm:hidden' : '',
					)}>
					{question}
				</ButtonText>
			))}
		</div>
	)
}
