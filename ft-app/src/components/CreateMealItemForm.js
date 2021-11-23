import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'

const CREATE_MEAL_ITEM = gql`
  mutation CreateMealItem($item_id: Int! $name: String $serv_amt: String $macros: [Int], $calories: Int) {
    insertmeal_item(
      value: {
        item_id: $item_id
        name: $name
        serv_amt: $serv_amt
      }
    ) {
      value { item_id, name }
    }
  }
`

const CreateMealItemForm = () => {
  const [item_id, setItemId] = useState('')
  const [name, setName] = useState('')
  const [serv_amt, setServAmt] = useState('')
  const [macros, setMacros] = useState('')
  const [calories, setCalories] = useState('')
  const [createMealItem, { data }] = useMutation(CREATE_MEAL_ITEM)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(item_id, name, serv_amt, macros,calories)
    createMealItem({ variables: { item_id: item_id, name: name, serv_amt: serv_amt, macros: macros, calories: calories }})
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Item Id'
        value={item_id}
        onChange={e => setItemId(e.target.value)}
      />
      <TextField
        label='Item name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label='Item serving amount'
        value={serv_amt}
        onChange={e => setServAmt(e.target.value)}
      />
      <TextField
        label='Item macros (protein, carb, fat)'
        value={macros}
        onChange={e => setMacros(e.target.value)}
      />
      <TextField
        label='Item calories'
        value={calories}
        onChange={e => setCalories(e.target.value)}
      />
      <Button type='submit' variant='contained' color='primary'>Submit</Button>
    </form>
  )
}

export default CreateMealItemForm