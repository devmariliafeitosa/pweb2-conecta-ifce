import { AuthProvider } from '@/features/auth/contexts/AuthContext'
import { router } from '@/routes/router'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App