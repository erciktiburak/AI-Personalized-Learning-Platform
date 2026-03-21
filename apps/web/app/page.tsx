export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold">LearnPath AI</h1>
      <p className="mt-4 text-xl">
        Kişiselleştirilmiş öğrenme yolculuğuna hoş geldin.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/login"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Giriş Yap
        </a>
        <a
          href="/register"
          className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
        >
          Kayıt Ol
        </a>
      </div>
    </main>
  );
}
