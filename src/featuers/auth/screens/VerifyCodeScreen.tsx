import ResetPasswordBanner from '../components/forgetPassword/ResetPasswordBanner'
import VerifyCodeForm from '../components/forgetPassword/VerifyCodeForm'

export default function VerifyCodeScreen() {
    return <>
        <div className='container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16'>
            <ResetPasswordBanner />
            <VerifyCodeForm/>
    </div>
    </>
}

