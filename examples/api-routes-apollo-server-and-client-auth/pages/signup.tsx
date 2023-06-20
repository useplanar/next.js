import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from '../components/field'

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignUp() {
  const [errorMsg, setErrorMsg] = useState(null)
  const router = useRouter()

  const [signUp] = useMutation(SignUpMutation, {
    onError: (error) => {
      setErrorMsg(getErrorMessage(error))
    },
    onCompleted: () => {
      router.push('/signin')
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = event.target.elements

    try {
      await signUp({
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
      <h1>Sign Up</h1>
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
          autoComplete="new-password"
          required
          label="Password"
        />
        <button type="submit">Sign up</button> or{' '}
        <Link href="/signin">Sign in</Link>
      </form>
    </>
  )
}

export default SignUp
