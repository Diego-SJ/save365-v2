import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addOpacity } from '../../../theme'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 5rem;
	left: 0;
	padding: 2rem 1rem 5rem 1rem;
	transition: all 0.3s;
	overflow: auto;
`

export const Paragraph = styled.p`
	margin: 0.2rem 0;
	text-align: center;
	color: ${({ theme }) => addOpacity(theme.textLight, 0.5)};
	font-weight: 200;
`

export const ParagraphLink = styled(Link)`
	margin-left: 0.5rem;
	text-decoration: underline;
`

export const Options = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 1rem;
`

export const Button = styled.button`
	background: white;
	color: #000000;
	border: 1px solid gray;
	outside: none;
	font-size: 1rem;
	border-radius: 0.5rem;
	padding: 0.9rem 0.5rem;
	cursor: pointer;

	&:hover {
		background: #f5f5f5;
	}

	&.danger {
		background: ${({ theme }) => theme.danger};
		border-color: ${({ theme }) => theme.danger};
		color: white;

		&:hover {
			background: ${({ theme }) => addOpacity(theme.danger, 0.9)};
		}
	}
`

export const ModalMask = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
`

export const ModalContent = styled.div`
	width: 100%;
	max-width: 400px;
	background: #ffffff;
	border-radius: 0.5rem;
	padding: 2rem 2rem;
	box-shadow: 0 0 10px ${({ theme }) => addOpacity(theme.text, 0.1)};
	position: relative;
	z-index: 20;
`

export const ModalRoot = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000000;
`
