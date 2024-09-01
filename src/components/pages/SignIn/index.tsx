import { DollarSign } from 'react-feather'
import Button from '../../common/Button'
import { Container, Logo, Title } from './SignIn.styled'
import Google from '../../common/icons/Google'
import { useDispatch, useSelector } from 'react-redux'
import { siginAction } from '../../../redux/features/userSlice'
import { RootState } from '../../../redux/store'
import { Navigate } from 'react-router-dom'
import { Routes } from '../../../routes/routes'

const SignInPage = () => {
	const dispatch = useDispatch()
	const { isLoggedIn } = useSelector(({ user }: RootState) => user)

	const onSignIn = async () => {
		await dispatch(siginAction())
	}

	if (isLoggedIn) return <Navigate to={Routes.home} replace />

	return (
		<Container>
			<Logo>
				<DollarSign />
			</Logo>
			<Title>Inicia sesión</Title>
			<Button text="Iniciar con Google" primary onClick={onSignIn} icon={<Google />} />
		</Container>
	)
}

export default SignInPage
