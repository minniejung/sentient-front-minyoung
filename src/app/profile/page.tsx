import { PageLayout } from '@/components/layouts/PageLayout'
import { cn } from '@/utils/helpers/cn'

export const metadata = {
	title: 'Profile',
}

const ProfilePage = () => {
	return (
		<PageLayout>
			<div className='flex h-full w-full flex-col items-start gap-6 overflow-y-auto md:py-6'>
				<div className='flex w-full flex-row gap-3 border-b p-4'>
					<h1 className='text-xl font-bold'>Profile</h1>
				</div>

				<div className='flex items-center space-x-6 px-4'>
					<div className='flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-300'>
						<span className='text-sm'>No Photo</span>
					</div>

					<div>
						<h2 className='text-lg font-semibold'>Minyoung Jung</h2>

						<a href='mailto:jungmignonne@gmail.com' className='text-xs text-secondary underline'>
							jungmignonne@gmail.com
						</a>
					</div>
				</div>

				<div className='w-full px-4 pb-20'>
					<h2 className='my-4 font-semibold'>Our Plan</h2>

					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<PlanCard
							title='Free Plan'
							description='Enjoy basic features for personal use.'
							features={['Limited Storage', 'Basic Support']}
							price={0}
							selected
						/>

						<PlanCard
							title='Premium Plan'
							description='Upgrade for advanced features and unlimited access.'
							features={['Unlimited Storage', 'Priority Support', 'Advanced Analytics']}
							price={29}
						/>
					</div>
				</div>
			</div>
		</PageLayout>
	)
}

export default ProfilePage

interface PlanCardProps {
	title: string
	description: string
	features: string[]
	price: number
	selected?: boolean
}

const PlanCard = ({ title, description, features, price, selected = false }: PlanCardProps) => (
	<div
		className={cn(
			'relative flex flex-col justify-between rounded-lg border p-4',
			selected ? 'border-secondary' : 'border-stroke',
		)}>
		{selected && (
			<div className='absolute right-4 top-3 w-fit rounded-lg border-gray-eb bg-gray-f6 px-2 py-1 text-xs'>current</div>
		)}

		<div>
			<h3 className='text-lg font-bold'>{title}</h3>
			<p className='mt-2 text-sm text-gray-80'>{description}</p>
			<ul className='mt-4 space-y-2 text-sm text-gray-80'>
				{features.map((feature, index) => (
					<li key={index}>✔ {feature}</li>
				))}
			</ul>
		</div>

		<div className='mt-4 text-sm font-medium'>
			<span className='text-lg font-bold'>${price}</span> / month
		</div>
	</div>
)
