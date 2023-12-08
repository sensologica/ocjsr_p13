import { forwardRef, useState } from "react"
import "./TextInput.css"

const TextInput = forwardRef(
  function TextInput({ name, value, className }, ref) {
    const [newValue, setNewValue] = useState(value)

    return (
      <input
        type="text"
        id={name}
        name={name}
        value={newValue}
        className={className}
        onChange={(e) => setNewValue(e.target.value)}
        ref={ref}
      />
    )
  }
)

export default TextInput