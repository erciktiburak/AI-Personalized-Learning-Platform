"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Link from "next/link";

const loginSchema = zod.object({
  email: zod.string().email("Geçerli bir e-posta adresi giriniz"),
  password: zod.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

type LoginFormValues = zod.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // TODO: implement login logic
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-xl border bg-white p-8 shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Giriş Yap</h2>
        <p className="mt-2 text-sm text-gray-600">
          Ya da{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            yeni hesap oluşturun
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="isim@örnek.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
