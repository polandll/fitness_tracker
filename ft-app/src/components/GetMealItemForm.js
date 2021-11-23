import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'

const GET_MEAL_ITEM = gql`
  query GetMealItem($item_id: Int! $name: String $serv_amt: String $macros: [Int], $calories: Int) {
    meal_item(
      value: {
        item_id: $item_id
        }
      }
    ) {
      values { item_id, name, serv_amt, macros, calories }
    }
  }
`

const GetMealItemForm = () => {
  const [item_id, getItemId] = useState('')
  const [getMealItem, { data }] = useMutation(GET_MEAL_ITEM)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(item_id)
    getMealItem({ variables: { item_id: item_id, name: $name, serv_amt: $serv_amt, macros: $macros, calories: $calories }})
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Item Id'
        value={item_id}
        onChange={e => getItemId(e.target.value)}
      />
      <TextField
        label='Item name'
        value={name}
        onChange={e => getName(e.target.value)}
      />
      <Button type='submit' variant='contained' color='primary'>Submit</Button>
    </form>
  )
}

export default GetMealItemForm