'use client'

import { useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'

import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { ROUTES_MENU } from '@/constants/routes'
import { AnimationWrapper } from '@/wrappers/AnimationWrapper'

export default function ForgotPassword() {
  const router = useRouter()

  const navigateToSignUpPage = () => {
    void router.push(ROUTES_MENU.signIn.pathname)
  }

  const handleChange = console.log

  return (
    <AnimationWrapper className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md sm:w-80 shadow-xl shadow-gray-500">
        <h1 className="font-bold text-3xl mb-8">
              Forgot password
        </h1>

        <p className="font-regular text-md mb-8">
            Please enter your email in order to send you a link to restore your password
        </p>
        <form action="">
          <div className="flex flex-col justify-center gap-3">
            <TextField
              label="Email"
              placeholder="Enter your account email"
              type="email"
              valid
              validText="Email is valid"
              endAdornment={
                <Icon icon="ic:round-alternate-email" fontSize={20} />
              }
              onChange={handleChange}
            />

            <div className="flex flex-col mt-4">
              <Button 
                colorType="secondary" 
              >
                Send email
              </Button>
            </div>

            <div className="flex flex-row justify-center">
              <Button  
                colorType="secondary" 
                variant="default"
                onClick={navigateToSignUpPage}
              >
                Back to sign in page
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  )
}
