'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'

import { Button } from '@/common/components/Button'
import { TextField } from '@/common/components/TextField'
import { ISetAuthPayload, setAuth } from '@/common/slices/authSlice'
import { AnimationWrapper } from '@/common/wrappers/AnimationWrapper'
import { ROUTES_MENU } from '@/constants/routes'
import { useAppDispatch } from '@/store/hooks'


interface ILoginForm{
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required('🙏 please provide your email address').email('🙃 email is not valid'),
  password: yup.string().required('🙏 please type your password'),
}).required()

const ERROR_DELAY = 500

export default function SignIn() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ILoginForm>({ 
    resolver: yupResolver(schema), 
    values: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    mode: 'onBlur',
    delayError: ERROR_DELAY
  })
  
  const signInUser = (loginData: ILoginForm) => {
    dispatch(setAuth({
      user: {
        id: 1,
        email: loginData.email,
        firstname: 'John',
        lastname: 'Doe',
      },
      accessToken: 'jwt',
    } as ISetAuthPayload))
  }
  
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
        <form onSubmit={handleSubmit(signInUser)}>
          <div className="flex flex-col justify-center gap-3">
            <TextField
              {...register('email')}
              label="Email"
              placeholder="Enter your email"
              type="email"
              valid={touchedFields.email ? !Boolean(errors.email?.message) : undefined}
              validText={!errors.email?.message ? 'Email looks nice! 👍' : undefined}
              errorText={errors.email?.message}
              endAdornment={
                <Icon icon="ic:round-alternate-email" fontSize={20} />
              }
            />
            <TextField
              {...register('password')}
              label="Password"
              placeholder="Enter your password"
              type="password"
              valid={touchedFields.password ? !Boolean(errors.password?.message) : undefined}
              validText={!errors.password?.message ? 'Password has been provided! 👍' : undefined}
              errorText={errors.password?.message}
              endAdornment={<Icon icon="mdi:password" fontSize={20} />}
            />
  
            <div className="flex flex-col mt-4">
              <Button
                type="submit" 
                colorType="secondary"
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
