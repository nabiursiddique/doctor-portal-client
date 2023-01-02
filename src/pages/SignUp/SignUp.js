import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.form?.pathname || '/';

    const handleSignup = data => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User created successfully');

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        navigate("/");
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error);
                setSignUpError(error.message)
            })
    }

    // Google sign up 
    const googleProvider = new GoogleAuthProvider()
    const googleProviderSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                toast.success('Signup Successful');
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='my-14 flex justify-center items-center'>
            <div className=' p-7'>
                <h2 className='text-3xl text-center font-bold'>SIGN UP</h2>
                <form onSubmit={handleSubmit(handleSignup)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />

                        {errors.name && <p role="alert" className='text-red-600'>{errors.name?.message}</p>}

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full max-w-xs" />

                        {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be strong' }
                        })} className="input input-bordered w-full max-w-xs" />

                        {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label"><span className="label-text">Forget Password</span></label>
                    </div>
                    <input type="submit" className='btn btn-accent w-full' value='SIGN UP' />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link to='/login' className='text-secondary'>Please LogIn</Link></p>
                <div className="divider">OR</div>
                <button onClick={googleProviderSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;