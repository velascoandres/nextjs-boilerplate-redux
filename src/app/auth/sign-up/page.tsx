'use client'

import { useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'

import { Button } from '@/common/components/Button'
import { TextField } from '@/common/components/TextField'
import { AnimationWrapper } from '@/common/wrappers/AnimationWrapper'
import { ROUTES_MENU } from '@/constants/routes'

export default function SignUp() {
  const router = useRouter()

  const handleChange = console.log
  
  const navigateToSignInPage = () => {
    router.push(ROUTES_MENU.signIn.pathname)
  }
  
  
  return (
    <AnimationWrapper className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-md sm:w-96 shadow-xl shadow-gray-500">
        <h1 className="font-bold text-3xl mb-8">
                Sign up
        </h1>
          
        <form action="">
          <div className="flex flex-col justify-center gap-1">
            <TextField
              label="Email"
              name="email"
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
              valid
              label="Firstname"
              name="firstname"
              placeholder="Provide a firstname"
              type="text"
              onChange={handleChange}
              validText="firstname looks good"
              endAdornment={
                <Icon icon="openmoji:european-name-badge" fontSize={20} />
              }
            />
            <TextField
              valid
              label="Lastname"
              placeholder="Provide a lastname"
              type="text"
              name="lastname"
              validText="lastname looks good"
              onChange={handleChange}
              endAdornment={
                <Icon icon="openmoji:european-name-badge" fontSize={20} />
              }
            />
            <TextField
              label="Password"
              placeholder="Write a password"
              type="password"
              name="password"
              valid={false}
              onChange={handleChange}
              errorText="invalid password"
              endAdornment={<Icon icon="mdi:password" fontSize={20} />}
            />
            <TextField
              label="Confirm password"
              placeholder="Confirm the password"
              type="password"
              name="repassword"
              valid={false}
              onChange={handleChange}
              errorText="invalid password"
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
