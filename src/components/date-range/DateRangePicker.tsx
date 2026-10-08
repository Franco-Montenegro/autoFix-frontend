import { useState, type FormEvent } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type { DateRange } from './useDateRange'

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

/** Selector "Desde"–"Hasta" (ambos días incluidos). Aplica el rango al pulsar "Consultar". */
export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [from, setFrom] = useState(value.from)
  const [to, setTo] = useState(value.to)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    // Solo se exigen ambas fechas; el orden lo valida la API (400).
    if (from !== '' && to !== '') {
      onChange({ from, to })
    }
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 2, mb: 3 }}
    >
      <TextField
        size="small"
        type="date"
        label="Desde"
        value={from}
        onChange={(event) => setFrom(event.target.value)}
        required
        error={submitted && from === ''}
        helperText={submitted && from === '' ? 'Campo obligatorio' : undefined}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        size="small"
        type="date"
        label="Hasta"
        value={to}
        onChange={(event) => setTo(event.target.value)}
        required
        error={submitted && to === ''}
        helperText={submitted && to === '' ? 'Campo obligatorio' : undefined}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
        Consultar
      </Button>
    </Box>
  )
}
