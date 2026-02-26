export interface Claim {
  id: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
}