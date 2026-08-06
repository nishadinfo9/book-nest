'use client' // Error boundaries must be Client Components
 
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void,
  message: string
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}