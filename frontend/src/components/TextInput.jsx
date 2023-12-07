import { forwardRef, useState } from "react"

const TextInput = forwardRef(
  function TextInput({ name, value }, ref) {
    const [newValue, setNewValue] = useState(value)

    return (
      <input
        type="text"
        id={name}
        name={name}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        ref={ref}
      />
    )
  }
)

export default TextInput