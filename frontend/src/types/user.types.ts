export interface User {
  id: string
  name: string
  role: 'employee' | 'manager' | 'accounts'
}