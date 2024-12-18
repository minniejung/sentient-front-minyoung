import { SideBar } from '../sidebar/SideBar'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='relative flex'>
			<SideBar />
			<div className='flex-center h-screen w-screen md:pl-[75px] md:pt-0'>{children}</div>
		</main>
	)
}
