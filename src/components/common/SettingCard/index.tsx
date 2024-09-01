import React from 'react'
import { ChevronRight } from 'react-feather'
import Toogle from '../Toggle'
import {
	Card,
	CardTitle,
	SettingContainer,
	SettingContent,
	SettingIcon,
	SettingName
} from './SettingCard.styled'

interface ISettingCard {
	title?: string
	children: React.ReactNode
}

interface ISetting {
	icon?: JSX.Element
	title?: string
	onClick?: () => void
	action?: () => void
	danger?: boolean
	isChecked?: boolean
}

export const Setting: React.FC<ISetting> = ({
	icon,
	title,
	onClick,
	action,
	danger = false,
	isChecked
}) => {
	return (
		<SettingContainer onClick={onClick}>
			<SettingIcon danger={danger}>{icon ? icon : <ChevronRight />}</SettingIcon>
			<SettingContent>
				<SettingName danger={danger}>{title}</SettingName>
				{action && <Toogle onClick={action} isChecked={isChecked} />}
			</SettingContent>
		</SettingContainer>
	)
}

const SettingCard: React.FC<ISettingCard> = ({ title, children }) => {
	return (
		<Card>
			<CardTitle>{title}</CardTitle>
			{children}
		</Card>
	)
}

export default SettingCard
