import React from 'react'
import { Main, MainHeader, Title } from './MainLayout.styled'

interface IProps {
	title?: string
	children: React.ReactNode
}

const MainLayout: React.FC<IProps> = ({ title, children }) => {
	return (
		<Main>
			<MainHeader>
				<Title>{title}</Title>
			</MainHeader>
			{children}
		</Main>
	)
}

export default MainLayout
