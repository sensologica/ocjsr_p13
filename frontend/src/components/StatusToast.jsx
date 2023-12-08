import "./StatusToast.css"

const StatusToast = ({ type, message }) => {
  return (
    <div className={`status-toast${" " + type}`}>
      {message}
    </div>
  )
}

export default StatusToast