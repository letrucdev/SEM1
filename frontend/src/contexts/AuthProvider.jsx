'use client'
import { useLogout } from '@/hooks/auth/useLogout'
import { useGetMe } from '@/hooks/user/useGetMe'
import React, { useEffect } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export const AuthStatus = {
	Authenticating: 'authenticating',
	Authenticated: 'authenticated',
	Unauthenticated: 'unauthenticated',
}

const defaultAuthValues = {
	authStatus: AuthStatus.Authenticating,
	user: null,
	setUser: () => {},
	logout: () => {},
}

const AuthContext = React.createContext(defaultAuthValues)

export const AuthProvider = ({ children }) => {
	const [authStatus, setAuthStatus] = React.useState(AuthStatus.Authenticating)
	const [user, setUser] = React.useState(null)

	const { me } = useGetMe({
		enabled: authStatus === AuthStatus.Authenticated,
	})

	const { logoutMutate } = useLogout()

	useEffect(() => {
		const user = localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: null

		if (!user) {
			setAuthStatus(AuthStatus.Unauthenticated)

			return
		}

		setUser(user)
	}, [])

	useEffect(() => {
		if (!user) return

		setAuthStatus(AuthStatus.Authenticated)
		localStorage.setItem('user', JSON.stringify(user))
	}, [user])

	useEffect(() => {
		if (me) setUser(me)
	}, [me])

	const logout = () => {
		localStorage.removeItem('user')
		logoutMutate()
	}

	return (
		<AuthContext.Provider value={{ authStatus, user, setUser, logout }}>
			{authStatus !== AuthStatus.Authenticating && children}
			<ProgressBar
				color='hsl(var(--primary))'
				options={{ showSpinner: false }}
				height='4px'
				shallowRouting
			/>
		</AuthContext.Provider>
	)
}

export const useAuth = () => React.useContext(AuthContext)
