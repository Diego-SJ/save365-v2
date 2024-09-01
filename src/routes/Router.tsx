import { Route, Navigate, Routes } from 'react-router-dom'
import { Routes as ROUTES } from './routes'

// views
import Home from '../components/pages/Home'
import Roulette from '../components/pages/Roulette'
import Activity from '../components/pages/Activity'
import Settings from '../components/pages/Settings'
import SignIn from '../components/pages/SignIn'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Router = () => {
	const { isLoggedIn } = useSelector(({ user }: RootState) => user)
	return (
		<Routes>
			{isLoggedIn && (
				<>
					<Route path={ROUTES.home} element={<Home />} />
					<Route path={ROUTES.roulette} element={<Roulette />} />
					<Route path={ROUTES.activity} element={<Activity />} />
					<Route path={ROUTES.settings} element={<Settings />} />
				</>
			)}

			<Route path={ROUTES.root} element={<SignIn />} />

			<Route path="*" element={<Navigate to={ROUTES.root} replace />} />
		</Routes>
	)
}

export default Router
