"use client"
import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/actions/auth";
import { RegisterState } from "@/types/type";

const initialState: RegisterState = {
    errors: {}
}

const Register = () => {
    const [state, action, isPending] = useActionState(register, initialState);

    return (
        <div className="h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Register</h1>

                <form action={action} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-700"
                            placeholder="Enter your email"
                        />
                        {state?.errors?.email && (
                            <p className="error text-red-400 text-sm">{state.errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-700"
                            placeholder="Enter your name"
                        />
                        {state?.errors?.name && (
                            <p className="error text-red-400 text-sm">{state.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-700"
                            placeholder="Enter password"
                        />
                        {state?.errors?.password && (
                            <div className="error text-red-400 text-sm">
                                <p>Password must:</p>
                                <ul className="list-disc list-inside ml-4">
                                    {state.errors.password.map((err) => (
                                        <li key={err}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-700"
                            placeholder="Confirm password"
                        />
                        {state?.errors?.confirmPassword && (
                            <p className="error text-red-400 text-sm">{state.errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isPending ? "Loading..." : "Register"}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/login" className="text-sm text-blue-400 hover:text-blue-500">
                            Already have an account? Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
