import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
// import { ReactComponent as ExIconEye } from './ex-icon-eye.svg'; // Assuming this is the icon used for the password field

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loginId, setLoginID] = useState('');
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
            const res = await login({ email,loginId}).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <section className="vh-100 gradient-custom d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card  text-white" style={{ borderRadius: "1rem", backgroundColor: '#49266C' }}>
                            <div className="card-body p-4 text-center">
                                <h2 className="fw-bold mb-2 text-uppercase">Forgot Password?</h2>
                                <p className="text-white-50 mb-4">Dont  worry. We  can  help</p>
                                <form onSubmit={submitHandler}>
                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="email"
                                            id="typeEmailX"
                                            className="form-control form-control-lg"
                                            placeholder="Please fill in your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>
<div className="form-outline form-white mb-3">
                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg"
                      placeholder="Please fill in your Login ID"
                      value={loginId}
                      onChange={(e) =>setLoginID(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="name">LoginID</label>
                  </div>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                        {isLoading ? 'Loading...' : 'Continue'}
                                    </button>
                                </form>

                                <div className="d-flex justify-content-center text-center mt-3">
                                    <a href="#!" className="text-white mx-2">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                    </a>
                                    <a href="#!" className="text-white mx-2">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </a>
                                    <a href="#!" className="text-white mx-2">
                                        <i className="fab fa-instagram fa-lg"></i>
                                    </a>
                                </div>

                                <div className="mt-3">
                                    <p className="mb-0">
                                    Remember your password? <Link to="/login" className="text-white-50 fw-bold">Back to login</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ForgotPassword ;
