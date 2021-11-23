import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'

const CREATE_MEAL = gql`
  mutation CreateMeal($meal_id: Int! $type: String  $items: [{Int: Int}]) {
    insertmeal(
      value: {
        meal_id: $meal_id
        type: $type
        items: $items
      }
    ) {
      value { meal_id, type, items {key, value} }
    }
  }
`
const CreateMealForm = () => {
  const [meal_id, setMealId] = useState('')
  const [type, setType] = useState('')
  const [items, setItems] = useState([])
  const [createMeal, { data }] = useMutation(CREATE_MEAL)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(meal_id, type, items)
    createMeal({ variables: { meal_id: meal_id, type: type, items: items }})
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Meal Id'
        value={meal_id}
        onChange={e => setMealId(e.target.value)}
      />
      <TextField
        label='Meal type'
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <TextField
        label='Items eaten'
        value={items}
        onChange={e => setItems(e.target.value)}
      />
      <Button type='submit' variant='contained' color='primary'>Submit</Button>
    </form>
  )
}

export default CreateMealForm