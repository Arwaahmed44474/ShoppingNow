import React from 'react'
import ResetPasswordBanner from '../components/forgetPassword/ResetPasswordBanner'
import ForgotPasswordForm from '../components/forgetPassword/ForgotPasswordForm'

export default function ForgetPassScreen() {
    return <>
        <div className='container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16'>
            <ResetPasswordBanner />
            <ForgotPasswordForm/>
    </div>
    </>
}
