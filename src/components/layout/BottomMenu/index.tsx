import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemContent, Menu, MenuItem } from './BottomMenu.styled'
import { Activity, Home, RefreshCcw, Settings } from 'react-feather'
import { Routes } from '../../../routes/routes'
import { useGoogleAnalytics } from '../../../hooks/useGoogleAnalytics'

//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../../redux/features/appSlice'
import { RootState } from '../../../redux/store'

const BottomMenu = () => {
	const history = useNavigate()
	const dispatch = useDispatch()
	const { currentPage } = useSelector(({ app }: RootState) => app)
	const { setPageview } = useGoogleAnalytics()

	const handleRoute = (path: string) => {
		history(path)
		dispatch(setCurrentPage(path))
		setPageview(path)
	}

	return (
		<Menu>
			<MenuItem>
				<ItemContent active={currentPage === Routes.home} onClick={() => handleRoute(Routes.home)}>
					<Home />
				</ItemContent>
			</MenuItem>
			<MenuItem>
				<ItemContent
					active={currentPage === Routes.roulette}
					onClick={() => handleRoute(Routes.roulette)}
				>
					<RefreshCcw />
				</ItemContent>
			</MenuItem>
			<MenuItem>
				<ItemContent
					active={currentPage === Routes.activity}
					onClick={() => handleRoute(Routes.activity)}
				>
					<Activity />
				</ItemContent>
			</MenuItem>
			<MenuItem>
				<ItemContent
					active={currentPage === Routes.settings}
					onClick={() => handleRoute(Routes.settings)}
				>
					<Settings />
				</ItemContent>
			</MenuItem>
		</Menu>
	)
}

export default BottomMenu
