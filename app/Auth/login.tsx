"use client"

import { yupResolver } from '@hookform/resolvers/yup';
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
    const {setError, reset, register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    return (
        <>
            <form>
                <div className="form-control mb-5">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="text" className="input input-sm input-bordered w-full" id="email" />
                </div>
                <div className="form-control mb-5">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="password" className="input input-sm input-bordered w-full" id="password" />
                </div>
                <div className="w-full flex justify-end">
                    <button type="submit" className="btn btn-warning btn-sm">Login</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm