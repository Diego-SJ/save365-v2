import React from 'react'
import { AlertCircle, AlertTriangle, Star } from 'react-feather'
import { useDispatch } from 'react-redux'
import { updateSavingAction } from '../../../redux/features/userSlice'
import { addCommas } from '../../../tools/formatters'
import { ISavingDay } from '../../../typings/types'
import {
	Card,
	CardAmount,
	CardContent,
	CardDate,
	CardIcon,
	CardInfo,
	CardStatus
} from './ActivityCard.styled'

interface IProps {
	item: ISavingDay
}

const ActivityCard: React.FC<IProps> = ({ item }) => {
	const dispatch = useDispatch()
	const { status, date, day, amount } = item
	const getIcon = () => {
		switch (status) {
			case 'complete':
				return <Star />
			case 'pending':
				return <AlertCircle />
			default:
				return <AlertTriangle />
		}
	}

	const handleStatus = () => {
		dispatch(updateSavingAction(day))
	}

	return (
		<Card onClick={handleStatus}>
			<CardIcon state={status}>{getIcon()}</CardIcon>
			<CardContent>
				<CardDate>{date}</CardDate>
				<CardInfo>
					<CardAmount>{`$${addCommas((amount || 0).toString())}`}</CardAmount>
					<CardStatus>{`${day} / 365`}</CardStatus>
				</CardInfo>
			</CardContent>
		</Card>
	)
}

export default ActivityCard
