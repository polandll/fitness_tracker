import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'
import { v4 as uuid } from 'uuid'

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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [createUser, { data }] = useMutation(CREATE_USER)

  const handleSubmit = e => {
    e.preventDefault()
    const userId = uuid()
    console.log(firstName, lastName)
    createUser({ variables: { firstName: firstName, lastName: lastName, userId: userId }})
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
