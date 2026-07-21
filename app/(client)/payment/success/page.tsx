interface Props {
  searchParams: Promise<{
    tran_id?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: Props) {
  const { tran_id } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-4">
          Thank you for your order.
        </p>

        <p className="mt-2">
          Transaction ID:
          <strong>{tran_id}</strong>
        </p>
      </div>
    </main>
  );
}