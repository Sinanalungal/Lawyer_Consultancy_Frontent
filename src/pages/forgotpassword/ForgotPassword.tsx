import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate =useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<{ message: string }>(`${BASE_URL}api/forgotpassword/`, { email });
            toast.success(response.data.message);
            navigate('/')
        } catch (error) {
            setMessage('give proper credentials')
        }
    };

    return (
        <>
            <section className="bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-4xl font-serif font-semibold text-gray-900 dark:text-white">
                    Logo 
                </a>
                <div className="w-full p-6 bg-white shadow-md rounded-lg  dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Forgot Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@gmail.com"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value);
                                    setMessage('')
                                }}
                                required
                                />
                                {message && <p className='text-xs mt-1 text-red-400'>{message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-gray-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
                    </form>
                    
                </div>
            </div>
        </section>
        </>
    );
};

export default ForgotPasswordForm;
