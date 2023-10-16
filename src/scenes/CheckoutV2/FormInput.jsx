import React from 'react'
import { TextField, Grid } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = ({name, label, value}) => {
  const {control} = useFormContext()

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <TextField
            fullWidth
            name={name}
            defaultValue={value}
            label={label}
            // value={value}
            required
            {...field}
          />
        )}
      />
    </Grid>
  )
}

export default FormInput
