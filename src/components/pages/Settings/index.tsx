import { useSnackbar } from 'notistack'
import { Moon, Power, UserX } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../../../redux/features/appSlice'
import { deleteAccountAction, signoutAction } from '../../../redux/features/userSlice'
import { RootState } from '../../../redux/store'
import SettingCard, { Setting } from '../../common/SettingCard'
import MainLayout from '../../layout/MainLayout'
import { Button, Container, Options } from './Settings.styled'

const SettingsPage = () => {
	const dispatch = useDispatch()
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const { darkMode } = useSelector(({ app }: RootState) => app)

	const onSignOut = () => {
		dispatch(signoutAction())
	}

	const handleThemeChange = () => {
		dispatch(setDarkMode())
	}

	const action = (key: any) => (
		<Options>
			<Button onClick={() => dispatch(deleteAccountAction())}>Aceptar</Button>
			<Button onClick={() => closeSnackbar(key)}>Cancelar</Button>
		</Options>
	)

	const onDeleteAccount = () => {
		enqueueSnackbar('Se borrarán tus datos, ¿Continuar?', {
			variant: 'error',
			persist: true,
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'center'
			},
			action
		})
	}

	return (
		<MainLayout title="Ajustes">
			<Container>
				<SettingCard title="Tema">
					<Setting
						icon={<Moon />}
						title="Cambiar tema"
						action={handleThemeChange}
						isChecked={darkMode}
					/>
				</SettingCard>
				<SettingCard title="Cuenta">
					<Setting onClick={onDeleteAccount} icon={<UserX />} title="Eliminar cuenta" />
					<Setting onClick={onSignOut} icon={<Power />} title="Cerrar sesión" danger />
				</SettingCard>
			</Container>
		</MainLayout>
	)
}

export default SettingsPage
