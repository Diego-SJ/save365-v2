// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import ReactGA from 'react-ga';

// const DEFAULT_CONFIG: any = {
// 	trackingId: process.env.REACT_APP_GA_ID,
// 	debug: true,
// 	gaOptions: {
// 		cookieDomain: 'none'
// 	}
// };

export const useGoogleAnalytics = () => {
	// const [rgaConfig] = useState('G-P4FSEZX565');
	const [gaInitialised, setGaInitialised] = useState(false);

	const initReactGA = () => {
		ReactGA.initialize('UA-194279754-1');
		ReactGA.pageview('test-init-pageview');
		setGaInitialised(true);
	};

	const setDimension = (object: any) => {
		ReactGA.set(object);
	};

	const setPageview = (route: string) => {
		ReactGA.pageview(route);
	};

	const setModalview = (modalName: string) => {
		ReactGA.pageview(modalName);
	};

	const setEvent = (
		category: string,
		action: string,
		value?: number,
		label?: string,
		nonInteraction?: boolean
	) => {
		ReactGA.event({
			category,
			action,
			value,
			label,
			nonInteraction
		});
	};

	return {
		initReactGA,
		setDimension,
		setPageview,
		setModalview,
		setEvent,
		gaInitialised
	};
};
