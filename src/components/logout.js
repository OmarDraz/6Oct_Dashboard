import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
	const history = useNavigate();

	useEffect(() => {
        Cookies.remove('name');
        Cookies.remove('role');
        history('/login')
	});
	return <div>Logout</div>;
}

export default Logout