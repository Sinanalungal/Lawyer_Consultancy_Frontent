import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import toast from 'react-hot-toast';

const ResetPasswordPage: React.FC = () => {
    const {token}=useParams()
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post<{ message: string }>(`${BASE_URL}api/resetpassword/`, {
                token:token,
                password:password,
            });
            toast.success(response.data.message);
            navigate('/')
        } catch (error) {
            setMessage('Unable to reset password');
        }
    };

    return (
        <>
           <section className="bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center font-serif mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                    Logo
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {message && <p className='text-xs mt-1 text-red-400'>{message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-gray-900 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Password</button>
                    </form>
                </div>
            </div>
        </section>  
        </>
    );
};

export default ResetPasswordPage;
