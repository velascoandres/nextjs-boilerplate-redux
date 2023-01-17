'use client'

import { useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'

import { Button } from '@/common/components/Button'
import { TextField } from '@/common/components/TextField'
import { ISetAuthPayload, setAuth } from '@/common/slices/authSlice'
import { AnimationWrapper } from '@/common/wrappers/AnimationWrapper'
import { ROUTES_MENU } from '@/constants/routes'
import { useAppDispatch } from '@/store/hooks'

export default function SignIn() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const signInUser = () => {
    dispatch(setAuth({
      user: {
        id: 1,
        email: 'user@mail.com',
        firstname: 'John',
        lastname: 'Doe',
      },
      accessToken: 'jwt',
    } as ISetAuthPayload))
  }
  
  const handleChange = console.log
  const navigateToSignUpPage = () => {
    router.push(ROUTES_MENU.signUp.pathname)
  }
  
  const navigateToForgotPage = () => {
    router.push(ROUTES_MENU.forgotPassword.pathname)
  }
  
  return (
    <AnimationWrapper className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md sm:w-80 shadow-xl shadow-gray-500">
        <h1 className="font-bold text-3xl mb-8">
                Sign in
        </h1>
        <form action="">
          <div className="flex flex-col justify-center gap-3">
            <TextField
              label="Email"
              placeholder="Enter your email"
              type="email"
              valid
              validText="Email is valid"
              onChange={handleChange}
              endAdornment={
                <Icon icon="ic:round-alternate-email" fontSize={20} />
              }
            />
            <TextField
              label="Password"
              placeholder="Enter your password"
              type="password"
              valid={false}
              onChange={handleChange}
              errorText="invalid password"
              endAdornment={<Icon icon="mdi:password" fontSize={20} />}
            />
  
            <div className="flex flex-col mt-4">
              <Button
                colorType="secondary"
                onClick={signInUser}
              >
                  Sign in
              </Button>
              <Button 
                colorType="secondary" 
                variant="outline"
                onClick={navigateToSignUpPage}
              >
                  Sign up
              </Button>
            </div>
  
            <div className="flex flex-row justify-center">
              <Button 
                colorType="secondary" 
                variant="default"
                onClick={navigateToForgotPage}
              >
                  Forgot password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  )
}
