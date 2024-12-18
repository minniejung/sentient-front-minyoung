import { SideBar } from '../sidebar/SideBar'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='relative flex h-screen w-screen'>
			<SideBar />
			<div className='flex-center mb-[88px] mt-[68px] w-full justify-end md:my-0 md:pl-[75px]'>{children}</div>
		</main>
	)
}
