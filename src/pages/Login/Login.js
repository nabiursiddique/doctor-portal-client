import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.form?.pathname || "/";

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setLoginError(error.message);
            });
    }
    return (
        <div className='my-14 flex justify-center items-center'>
            <div className=' p-7'>
                <h2 className='text-3xl text-center font-bold'>LOG IN</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full max-w-xs" />

                        {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} className="input input-bordered w-full max-w-xs" />

                        {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>

                        <label className="label"><span className="label-text">Forget Password</span></label>
                    </div>
                    <input type="submit" className='btn btn-accent w-full' value='Log In' />
                </form>
                <p>New to doctors portal? <Link to='/signup' className='text-secondary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;