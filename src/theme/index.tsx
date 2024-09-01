import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { RootState } from '../redux/store'
import { GlobalStyles } from './Theme.styled'

export const lightTheme = {
	text: '#425C6C',
	textLight: '#86A2B5',
	title: '#5465ff',
	primary: '#F2F5F7',
	secondary: '#ffffff',
	asset: '#5465ff',
	bgBottomMenu: 'linear-gradient(to left top, #5465ff, #5465ff)',
	blueToPink: '#5465ff',
	pinkToBlue: 'linear-gradient(to right, rgba(169, 53, 236, 1), rgb(0, 102, 255))',
	blue: '#5465ff',
	pink: '#5158bb',
	success: '#58D68D',
	warning: '#F4D03F',
	danger: '#EC7063',
	white: '#ffffff',
	black: '#000000',
	borderRadius: {
		sm: '1rem',
		md: '2rem',
		lg: '11px',
		xlg: '14px',
		xxlg: '50rem'
	},
	boxShadow: {
		sm: '0 0 1rem 1rem #000000'
	},
	shadowNeon: {
		start: 'transparent',
		end: 'transparent'
	}
}

export const darkTheme = {
	...lightTheme,
	text: '#ffffff',
	textLight: '#7E80C3',
	title: '#5465ff',
	primary: '#161730',
	secondary: '#212244',
	asset: '#7E80C3',
	bgBottomMenu: 'linear-gradient(to left top, #a935ec, #0066ff)',
	blueToPink: 'linear-gradient(to left, #a935ec, #0066ff)',
	pinkToBlue: 'linear-gradient(to right, rgba(169, 53, 236, 1), rgb(0, 102, 255))',
	blue: '#0066ff',
	pink: '#a935ec',
	success: '#58D68D',
	warning: '#F4D03F',
	danger: '#EC7063',
	white: '#FFFFFF',
	black: '#000000',
	shadowNeon: {
		start: '#0066ff',
		end: '#a935ec'
	}
}

export const addOpacity = (color: string, opacity: number): string => {
	const opacityHex = Math.round(opacity * 255).toString(16)
	return `${color}${opacityHex}`
}

export type ITheme = typeof lightTheme

type ThemeProps = {
	children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({ children }) => {
	const { darkMode } = useSelector(({ app }: RootState) => app)

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<>
				<GlobalStyles />
				{children}
			</>
		</ThemeProvider>
	)
}

export default Theme
