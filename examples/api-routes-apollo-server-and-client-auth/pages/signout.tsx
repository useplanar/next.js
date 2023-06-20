import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation, useApolloClient } from '@apollo/client'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

function SignOut() {
  const client = useApolloClient()
  const router = useRouter()

  const [signOut] = useMutation(SignOutMutation, {
    onCompleted: () => {
      client.resetStore().then(() => {
        router.push('/signin')
      })
    },
  })

  useEffect(() => {
    signOut()
  }, [signOut])

  return <p>Signing out...</p>
}

export default SignOut
