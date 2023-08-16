import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { addCommas } from '../../../tools/formatters'
import MainLayout from '../../layout/MainLayout'
import { Chart, ChartAmount, ChartTitle } from './Home.styled'
import { getCompletedDaysAction } from '../../../redux/features/userSlice'

const Home = () => {
	const dispatch = useDispatch()
	const { totalSaving = 0 } = useSelector(({ user }: RootState) => user)
	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			dispatch(getCompletedDaysAction())
			return
		}
	}, [dispatch])

	return (
		<MainLayout title="Inicio">
			<Chart>
				<ChartTitle>Ahorro total</ChartTitle>
				<ChartAmount>{`$${addCommas((totalSaving || 0)?.toString())}`}</ChartAmount>
			</Chart>
		</MainLayout>
	)
}

export default Home
