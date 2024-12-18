import { PageLayout } from '@/components/layouts/PageLayout'
import { HistoryList } from '@/features/history/HistoryList'

export const metadata = {
	title: 'History',
}

const HistoryPage = () => {
	return (
		<PageLayout>
			<HistoryList />
		</PageLayout>
	)
}

export default HistoryPage
