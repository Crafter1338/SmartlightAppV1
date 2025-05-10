import { Routes, Route, useNavigate } from 'react-router-dom'

import Dev from './pages/Dev'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import { useAuthentication } from './contexts/Authentication';
import { useEffect } from 'react';

export default function() {
	const { verify } = useAuthentication();
	const navigate = useNavigate();

	useEffect(() => {
		//verify().then((result: Boolean) => {
		//	if (result) { navigate('/dashboard') }
		//})
	}, [])

	return (
		<>
			<Routes>
				<Route path='/dev' element={<Dev />}/>

				<Route path='/sign-in' element={<SignIn />}/>
				<Route path='/sign-up' element={<SignUp />}/>

				<Route path='/dashboard' element={<Layout><Dashboard /></Layout>}/>
			</Routes>
		</>
	);
}