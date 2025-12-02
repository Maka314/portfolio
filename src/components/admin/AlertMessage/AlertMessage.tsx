interface AlertMessageProps {
  type: 'error' | 'success'
  message: string
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
  const styles = type === 'error'
    ? 'bg-red-900/50 border-red-700 text-red-200'
    : 'bg-green-900/50 border-green-700 text-green-200'

  return (
    <div className={`mb-4 p-3 border rounded ${styles}`}>
      {message}
    </div>
  )
}
