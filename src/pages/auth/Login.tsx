const Login = () => {
  const handleLogin = () => {
    localStorage.setItem('token', 'dummy-token')
    window.location.href = '/employee'
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  )
}

export default Login