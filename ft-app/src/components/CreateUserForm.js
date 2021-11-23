import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { gql, useApolloClient, useLazyQuery } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import { useLocation } from 'wouter'

const GET_USER = gql`
  query GetUser($firstName: String! $lastName: String!) {
    user(
      value: {
        firstname: $firstName
        lastname: $lastName
      }
    ) {
      values { 
        firstname
      	lastname
        user_id
      }
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($firstName: String! $lastName: String! $userId: Uuid!) {
    insertuser(
      value: {
        firstname: $firstName
        lastname: $lastName
        user_id: $userId
      }
    ) {
      value { lastname }
    }
  }
`

const CreateUserForm = () => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [, setLocation] = useLocation();
  const [getUser, { data, error, loading }] = useLazyQuery(GET_USER)
  const client = useApolloClient()

  useEffect(() => {
    if (isSubmitted && data?.user.values.length) {
      setLocation(`/${data.user.values[0].user_id}`)
    }
    else if (isSubmitted) {
      const userId = uuid()
      client.mutate({
        mutation: CREATE_USER,
        variables: { firstName: firstName, lastName: lastName, userId: userId }
      })
    }
  }, [client, data, firstName, isSubmitted, lastName, setLocation])

  if (loading) return <p>Loading ...</p>

  if (error) return <p>Error!</p>

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    getUser({ variables: { firstName: firstName, lastName: lastName }})
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='First Name'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label='Last Name'
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <Button type='submit' variant='contained' color='primary'>Submit</Button>
    </form>
  )
}

export default CreateUserForm
