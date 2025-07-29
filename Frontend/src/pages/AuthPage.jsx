import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false)
  return (
    <div>
      {isLogin ? <LoginForm state={setIsLogin} /> : <RegisterForm state={setIsLogin} />}
    </div>
  )
}

export default AuthPage
