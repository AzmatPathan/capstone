import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import '../assets/styles/LoginScreen.css';  // Correct import path for CSS
import logo from '../assets/styles/Telus-Logo-768x432.png'; // Correct import path for logo

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [login, { isLoading }] = useLoginMutation();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ username, password, role }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center login-container">
            <div className="login-form">
                <div className="logo text-center mb-4">
                    <img src={logo} alt="TELUS Logo" />
                </div>
                <h1 className="text-center mb-4">Login</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type=""
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-between" controlId="rememberMe">
                        <Form.Check
                            type="checkbox"
                            label="Remember me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        ></Form.Check>
                        
                    </Form.Group>
                    <Button disabled={isLoading} type="submit" variant="primary" className="w-100 login-button">
                        Login
                    </Button>
                    {isLoading && <Loader />}
                </Form>
                <div className="text-center mt-3">
                    Not registered? <Link to="/register" className="signup-link">Sign up for My TELUS</Link>
                </div>
            </div>
        </Container>
    );
};

export default LoginScreen;
