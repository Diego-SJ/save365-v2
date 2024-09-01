import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { ISavingDay } from '../../../typings/types'
import ActivityCard from '../../common/ActivityCard'
import MainLayout from '../../layout/MainLayout'
import { Container } from './Activity.styled'

const ActivityPage = () => {
	const { savingDays, isLoggedIn } = useSelector(({ user }: RootState) => user)
	const [activityList, setActivityList] = useState<ISavingDay[]>([])

	useEffect(() => {
		const array = [...savingDays].sort((a, b) => b.day - a.day)
		setActivityList(array)
	}, [savingDays])

	return (
		<MainLayout title={isLoggedIn ? 'Actividad' : 'hola'}>
			<Container>
				{activityList.map((item, index) => (
					<ActivityCard key={index} item={item} />
				))}
			</Container>
		</MainLayout>
	)
}

export default ActivityPage
