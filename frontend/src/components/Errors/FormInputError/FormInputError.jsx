import "./FormInputError.css"

const FormInputError = ({ errorMessage, isVisible }) => {
  let visibility
  isVisible ? visibility = "formInputError" : visibility = "formInputError hidden"

  return (
    <p className={visibility}>{errorMessage}</p>
  )
}

export default FormInputError