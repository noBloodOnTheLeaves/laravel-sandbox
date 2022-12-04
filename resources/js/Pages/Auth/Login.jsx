import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import SecondaryButton from "@/Components/SecondaryButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="w-screen px-6 -mt-16 space-y-8 md:mt-0 md:px-2 max-w-md">
                <div className="p-8 space-y-4 bg-white/50 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl relative dark:bg-gray-900/50 dark:border-gray-700">
                    <div className="flex justify-center w-full">
                        <div className="filament-brand text-xl font-bold tracking-tight dark:text-white">
                            Larasand
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-center">
                        Авторизоваться
                    </h2>
                    <form onSubmit={submit} className="mt-6">
                        <div className="mb-2">
                            <InputLabel forInput="email" value="Email" />
                            <TextInput
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mb-2">
                            <InputLabel forInput="password" value="Password" />

                            <TextInput
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 mr-6">Remember me</span>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </label>
                        </div>

                        <div className="flex flex-row items-middle justify-center mt-6">
                            <div className="basis-1/4">
                                <PrimaryButton
                                    processing={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                            <div className="basis-1/4">
                                <SecondaryButton
                                    disabled={processing}
                                    onClick={()=>{
                                        window.location.href = '/register';
                                    }}
                                >
                                    Sign Up
                                </SecondaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>

    );
}
