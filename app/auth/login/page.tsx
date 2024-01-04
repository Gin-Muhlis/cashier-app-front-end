"use client"

import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

let validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

const LoginForm = () => {
    const router = useRouter()
    const { setError, reset, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleFormSubmit = async (data: {email: string, password: string}) => {
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: '/'
        }).then((res) => {
            if (res?.error) {
                setError('email', { message: "Something went wrong.", type: "error" })
                console.log(res.error)
            } else {
                router.push('/');
            }
        })
    }

    return (
        <div className="p-10 min-h-[90vh] flex justify-center items-center">
            <div className="rounded w-2/5 overflow-hidden shadow-lg">
                <div className="text-xl text-center font-bold bg-amber-400 p-3 text-white">
                    LOGIN
                </div>
                <div className="px-5 py-9 bg-white">
                    <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
                        <div className="form-control mb-5">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="text" className="input input-sm input-bordered w-full" id="email" {...register('email')} />
                            {errors['email'] ? (
                            <div className='text-sm text-red-500'>{errors['email'].message}</div>
                        ) : null}
                        </div>
                        <div className="form-control mb-5">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="password" className="input input-sm input-bordered w-full" id="password"   {...register('password')} />
                            {errors['password'] ? (
                            <div className='text-sm text-red-500'>{errors['password'].message}</div>
                        ) : null}
                        </div>
                        <div className="w-full flex justify-end">
                            <button type="submit" className="btn btn-warning btn-sm">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm