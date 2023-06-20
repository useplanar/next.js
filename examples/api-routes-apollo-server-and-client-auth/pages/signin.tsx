import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from '../components/field'

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignIn() {
  const client = useApolloClient()
  const router = useRouter()

  const [signIn] = useMutation(SignInMutation, {
    onError: (error) => {
      setErrorMsg(getErrorMessage(error))
    },
    onCompleted: (data) => {
      if (data.signIn.user) {
        router.push('/')
      }
    },
  })

  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = event.target.elements

    try {
      await client.resetStore()
      await signIn({
        variables: {
          email: email.value,
          password: password.value,
        },
      })
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="current-password"
          required
          label="Password"
        />
        <button type="submit">Sign in</button> or{' '}
        <Link href="/signup">Sign up</Link>
      </form>
    </>
  )
}

export default SignIn
