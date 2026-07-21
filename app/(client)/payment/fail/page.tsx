export default function PaymentFailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed ❌
        </h1>

        <p>Please try again.</p>
      </div>
    </main>
  );
}