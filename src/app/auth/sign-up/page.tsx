'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'

import { Button } from '@/common/components/Button'
import { TextField } from '@/common/components/TextField'
import { ISetAuthPayload, setAuth } from '@/common/slices/authSlice'
import { AnimationWrapper } from '@/common/wrappers/AnimationWrapper'
import { ROUTES_MENU } from '@/constants/routes'

const schema = yup.object().shape({
  email: yup.string().required('🙏 please type your email address').email('🙃 please type a valid email'),
  firstname: yup.string().required('🙏 please provide your firstname'),
  lastname: yup.string().required('🙏 your lastname is mandatory'),
  password: yup.string().required('🙏 your password is required'),
  rePassword: yup.string().required('🙏 please retype your password')
  .oneOf([yup.ref('password')], '🙏 please ensure that your passwords match!'),
})

interface IRegisterForm{
  firstname: string
  lastname: string
  email: string
  password: string
  rePassword: string
}

export default function SignUp() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { touchedFields, errors } } = useForm<IRegisterForm>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    delayError:  0
  })


  const signUpser = (loginData: IRegisterForm) => {
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
  
  const navigateToSignInPage = () => {
    router.push(ROUTES_MENU.signIn.pathname)
  }
  
  
  return (
    <AnimationWrapper className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-md sm:w-96 shadow-xl shadow-gray-500">
        <h1 className="font-bold text-3xl mb-8">
                Sign up
        </h1>
          
        <form onSubmit={handleSubmit(signUpser)}>
          <div className="flex flex-col justify-center gap-3">
            <TextField
              {...register('email')}
              valid={touchedFields.email ? !Boolean(errors.email?.message) : undefined}
              validText={!errors.email?.message ? 'Email is valid 👍!' : undefined}
              errorText={errors.email?.message}
              label="Email"
              placeholder="Enter your email"
              type="email"
              endAdornment={
                <Icon icon="ic:round-alternate-email" fontSize={20} />
              }
            />
            <TextField
              {...register('firstname')}
              valid={touchedFields.firstname ? !Boolean(errors.firstname?.message) : undefined}
              validText={!errors.firstname?.message ? 'Firstname looks nice! 👍' : undefined}
              errorText={errors.firstname?.message}
              label="Firstname"
              placeholder="Provide a firstname"
              type="text"
              endAdornment={
                <Icon icon="openmoji:european-name-badge" fontSize={20} />
              }
            />
            <TextField
              {...register('lastname')}
              valid={touchedFields.lastname ? !Boolean(errors.lastname?.message) : undefined}
              validText={!errors.lastname?.message ? 'Lastname looks good! 👍' : undefined}
              errorText={errors.lastname?.message}
              label="Lastname"
              placeholder="Provide a lastname"
              type="text"
              endAdornment={
                <Icon icon="openmoji:european-name-badge" fontSize={20} />
              }
            />
            <TextField
              {...register('password')}
              valid={touchedFields.password ? !Boolean(errors.password?.message) : undefined}
              validText={!errors.password?.message ? 'Password looks valid! 👍' : undefined}
              errorText={errors.password?.message}
              label="Password"
              placeholder="Write a password"
              type="password"
              endAdornment={<Icon icon="mdi:password" fontSize={20} />}
            />
            <TextField
              {...register('rePassword')}
              valid={touchedFields.rePassword ? !Boolean(errors.rePassword?.message) : undefined}
              validText={!errors.rePassword?.message ? 'Both passwords are equal! 👍' : undefined}
              errorText={errors.rePassword?.message}
              label="Confirm password"
              placeholder="Confirm the password"
              type="password"
              endAdornment={<Icon icon="mdi:password" fontSize={20} />}
            />
  
            <div className="flex flex-col mt-4">
              <Button colorType="secondary">Sign up</Button>
            </div>
  
            <div className="flex flex-row justify-center">
              <Button 
                colorType="secondary" 
                variant="default"
                onClick={navigateToSignInPage}
              >
                  Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  )
}
