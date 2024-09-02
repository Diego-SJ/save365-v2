import { toast } from 'sonner'
import { Moon, Power, UserX } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../../../redux/features/appSlice'
import { deleteAccountAction, signoutAction } from '../../../redux/features/userSlice'
import { RootState } from '../../../redux/store'
import SettingCard, { Setting } from '../../common/SettingCard'
import MainLayout from '../../layout/MainLayout'
import { Button, Container, ModalContent, ModalMask, ModalRoot, Options } from './Settings.styled'
import { useState } from 'react'

const SettingsPage = () => {
	const dispatch = useDispatch()
	const { darkMode } = useSelector(({ app }: RootState) => app)
	const [openModal, setOpenModal] = useState(false)

	const onSignOut = () => {
		dispatch(signoutAction())
	}

	const handleThemeChange = () => {
		dispatch(setDarkMode())
	}

	const onDeleteAccount = () => {
		setOpenModal(true)
	}

	const confirmDeleteAccount = () => {
		dispatch(deleteAccountAction())
		setOpenModal(false)
		toast.success('Cuenta eliminada')
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
			{openModal && (
				<ModalRoot>
					<ModalMask />
					<ModalContent>
						<h2 style={{ margin: 0 }}>¿Estás seguro?</h2>
						<p>Esta acción eliminará tu cuenta de forma permanente.</p>
						<p>Esta acción no se puede deshacer.</p>
						<p>¿Estás seguro de que deseas continuar?</p>
						<Options>
							<Button onClick={() => setOpenModal(false)}>Cancelar</Button>
							<Button onClick={confirmDeleteAccount} className="danger">
								Eliminar cuenta
							</Button>
						</Options>
					</ModalContent>
				</ModalRoot>
			)}
		</MainLayout>
	)
}

export default SettingsPage
