import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteAccount, getAllDays, loginWithGoogle, saveNewDay } from '../../firebase/api'
import { Routes } from '../../routes/routes'
import { ISavingDay, IUser } from '../../typings/types'
import { setCurrentPage } from './appSlice'

interface IUserState {
	user: IUser | null
	savingDays: ISavingDay[]
	totalSaving: number
	isLoggedIn: boolean
	loading: boolean
	error: string | null
}

const initialState = {
	user: null,
	savingDays: [],
	totalSaving: 0,
	isLoggedIn: false,
	loading: false,
	error: null
} as IUserState

const orderBase = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		signinSuccess(state, action: PayloadAction<IUser | null>) {
			state.user = action.payload
			state.loading = false
			state.error = null
			state.isLoggedIn = true
		},
		signinError(state) {
			state.loading = false
			state.error = 'No se pudo iniciar sesión'
			state.isLoggedIn = false
		},
		signinOut(state) {
			state.user = null
			state.loading = false
			state.error = null
			state.isLoggedIn = false
			state.savingDays = []
			state.totalSaving = 0
		},
		setSavingDays(state, action: PayloadAction<ISavingDay[]>) {
			state.savingDays = action.payload
		},
		setTotalSaving(state, action: PayloadAction<number>) {
			state.totalSaving = action.payload
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload
		}
	}
})

export const {
	setLoading,
	signinSuccess,
	signinError,
	signinOut,
	setSavingDays,
	setTotalSaving,
	setError
} = orderBase.actions

export default orderBase.reducer

// Actions
export const getCompletedDaysAction = () => async (dispatch: any, getState: any) => {
	try {
		const { user } = getState().user

		const allDays = await getAllDays(user.uid)
		dispatch(setSavingDays(allDays))

		const total = allDays.reduce((total: number, day: ISavingDay) => (day?.amount ?? 0) + total, 0)
		dispatch(setTotalSaving(total))
	} catch (error: any) {
		dispatch(setError(error.toString()))
	}
}

export const siginAction = () => async (dispatch: any) => {
	try {
		dispatch(setLoading(true))
		const userData = await loginWithGoogle()
		dispatch(signinSuccess(userData))
		dispatch(setCurrentPage(Routes.home))
		dispatch(await getCompletedDaysAction())
	} catch (error) {
		dispatch(signinError())
	}
}

export const signoutAction = () => async (dispatch: any) => {
	dispatch(setCurrentPage(Routes.root))
	dispatch(signinOut())
}

export const recordNewSavingAction =
	(newSave: ISavingDay) => async (dispatch: any, getState: any) => {
		try {
			const { user, savingDays } = getState().user
			const savesUpdated = [...savingDays, newSave]
			await saveNewDay(savesUpdated, user.uid)
			dispatch(getCompletedDaysAction())
		} catch (error: any) {
			dispatch(setError(error.toString()))
		}
	}

export const updateSavingAction = (dayId: number) => async (dispatch: any, getState: any) => {
	try {
		const { user, savingDays } = getState().user
		let savesAux = [...savingDays]

		const index = savesAux.findIndex((save) => save.day === dayId)
		const status = savesAux[index].status === 'pending' ? 'complete' : 'pending'
		savesAux[index] = { ...savesAux[index], status }

		await saveNewDay(savesAux, user.uid)
		dispatch(getCompletedDaysAction())
	} catch (error: any) {
		dispatch(setError(error.toString()))
	}
}

export const deleteAccountAction = () => async (dispatch: any, getState: any) => {
	try {
		const { user } = getState().user
		const result = await deleteAccount(user.uid)
		if (result) dispatch(signinOut())
	} catch (error: any) {
		dispatch(setError(error.toString()))
	}
}
