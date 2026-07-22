export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Payment Cancelled
        </h1>

        <p>You cancelled the payment.</p>
      </div>
    </main>
  );
}