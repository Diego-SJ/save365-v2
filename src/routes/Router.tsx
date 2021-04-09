import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Routes } from './routes';

// views
import Home from '../components/pages/Home';
import Roulette from '../components/pages/Roulette';
import Activity from '../components/pages/Activity';
import Settings from '../components/pages/Settings';
import SignIn from '../components/pages/SignIn';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import { useEffect } from 'react';

const PrivateRoute = ({ path, component }: any) => {
	const { isLoggedIn } = useSelector(({ user }: RootState) => user);

	if (!isLoggedIn) return <Redirect to={Routes.root} />;
	return <Route path={path} component={component} />;
};

const Router = () => {
	const { location } = useHistory();
	const { setPageview } = useGoogleAnalytics();

	useEffect(() => {
		setPageview(location.pathname);
	}, [location.pathname, setPageview]);

	return (
		<Switch>
			<PrivateRoute path={Routes.settings} component={Settings} />
			<PrivateRoute path={Routes.activity} component={Activity} />
			<PrivateRoute path={Routes.roulette} component={Roulette} />
			<PrivateRoute path={Routes.home} component={Home} />
			<Route path={Routes.root} component={SignIn} />
		</Switch>
	);
};

export default Router;
