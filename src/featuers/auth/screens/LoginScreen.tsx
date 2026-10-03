import LoginForm from '../components/login/LoginForm'
import LoginHero from '../components/login/LoginHero'

export default function LoginScreen() {
    return <>
        <div className='container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16'>
            <LoginHero/>
            <LoginForm />
       </div>
    </>
}
