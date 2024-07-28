'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordAgainVisibility = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  const evaluatePasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength('');
      return;
    }
    const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})');
    if (strongPasswordRegex.test(password)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://media.licdn.com/dms/image/D4E0BAQG29IuY1C_Xeg/company-logo_200_200/0/1718187842184/teddlo_logo?e=1730332800&v=beta&t=iI3QtwaTRXMxygpA5zxOivRAZO_JBWyHOSMRr87h9wI"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div onClick={togglePasswordVisibility} className="cursor-pointer">
                  {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    evaluatePasswordStrength(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                <div className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                </div>
              </div>
              <div className="mt-2 text-sm text-white">{passwordStrength && `Password Strength: ${passwordStrength}`}</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="passwordAgain" className="block text-sm font-medium leading-6 text-white">
                  Password Again
                </label>
                <div onClick={togglePasswordAgainVisibility} className="cursor-pointer">
                  {showPasswordAgain ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type={showPasswordAgain ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                <div className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordAgainVisibility}>
                  {showPasswordAgain ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                onClick={() => signup()}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
