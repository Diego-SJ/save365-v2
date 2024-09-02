import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import { RootState } from '../../redux/store'
import Router from '../../routes/Router'
import Theme from '../../theme'
import BottomMenu from '../layout/BottomMenu'
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics'

function App() {
	const { isLoggedIn } = useSelector(({ user }: RootState) => user)
	const { initReactGA } = useGoogleAnalytics()
	useEffect(() => {
		initReactGA()
	}, [initReactGA])

	return (
		<>
			<Toaster position="top-center" richColors />
			<Theme>
				<Router />
				{isLoggedIn && <BottomMenu />}
			</Theme>
		</>
	)
}

export default App
