
import SignupForm from '../components/signup/SignupForm'
import SignupHero from '../components/signup/SignupHero'

export default function SignUpScreen() {
    return <>
        <div className='container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16'>
            <SignupHero />
            
            <SignupForm />
            
        </div>

        
    </>
}
