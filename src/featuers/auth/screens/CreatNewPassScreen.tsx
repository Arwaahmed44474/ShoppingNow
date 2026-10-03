

import ResetPassForm from '../components/forgetPassword/ResetPassForm'
import ResetPasswordBanner from '../components/forgetPassword/ResetPasswordBanner'


export default function CreatNewPassScreen() {
    return <>
        <div className='container grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center py-16'>
            <ResetPasswordBanner />
            <ResetPassForm/>
    </div>
    </>
}

