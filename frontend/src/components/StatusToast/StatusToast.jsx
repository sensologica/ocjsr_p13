import "./StatusToast.css"

const StatusToast = ({ status }) => {
  return (
    <div className={"status-toast" + ` ${status.type}`}>
      {status.message}
    </div>
  )
}

export default StatusToast