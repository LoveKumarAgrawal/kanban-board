"use client"
import { login } from "@/actions/auth";
import { RegisterState } from "@/types/type";
import Link from "next/link";
import { useActionState } from "react";

const initialState: RegisterState = {
    errors: {}
}

const Login = () => {
    const [state, action, isPending] = useActionState(login, initialState);
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>

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
                            <p className="text-red-400">{state.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-700"
                            placeholder="Enter your password"
                        />
                        {state?.errors?.password && (
                            <p className="text-red-400">{state.errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isPending ? "Loading..." : "Login"}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/register" className="text-sm text-blue-400 hover:text-blue-500">
                            Don't have an account? Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
