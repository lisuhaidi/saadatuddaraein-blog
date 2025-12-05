'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent } from '@/components/ui/card'
import api from '@/lib/api'
import { forgetPasswordEmailSchema, forgetPasswordUsernameSchema } from '@/lib/schemas'

// Definisikan tipe untuk user object
type User = {
  id: string
  username: string
  email: string
}

export default function ForgetPasswordForm() {
  const [foundUsers, setFoundUsers] = useState<User[]>([])
  const [step, setStep] = useState<"email" | "username" | "done">("email")

  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const emailForm = useForm<z.infer<typeof forgetPasswordEmailSchema>>({
    resolver: zodResolver(forgetPasswordEmailSchema),
  })

  const usernameForm = useForm<z.infer<typeof forgetPasswordUsernameSchema>>({
    resolver: zodResolver(forgetPasswordUsernameSchema),
  })

  // ---------- UTILITY FUNCTIONS ----------

  const extractUsers = (res: any): User[] => {
    return res.data?.data ?? res.data ?? []
  }

  const showError = (err: any) => {
    const msg = err?.response?.data?.message || err?.message || "Terjadi kesalahan, coba lagi."
    setError(msg)
  }

  // ---------- STEP 1: SUBMIT EMAIL ----------
  const handleEmailSubmit = async (values: z.infer<typeof forgetPasswordEmailSchema>) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      console.debug('[ForgetPassword] POST public/password/find-email', values)
      const res = await api.post("public/password/find-email", values)
      const users = extractUsers(res)
      setFoundUsers(users)

      if (users.length === 0) {
        setError("Email tidak ditemukan.")
        return
      }

      if (users.length === 1) {
        await sendReset(users[0].id, users[0].email)
        return
      }

      setStep("username")
    } catch (err) {
      showError(err)
    } finally {
      setIsLoading(false)
    }
  }

  // ---------- STEP 2: SUBMIT USERNAME ----------
  const handleUsernameSubmit = async (values: z.infer<typeof forgetPasswordUsernameSchema>) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const selected = foundUsers.find((u) => u.username === values.selectedUsername)

      if (!selected) {
        setError("Username tidak cocok dengan email tersebut.")
        return
      }

      await sendReset(selected.id, selected.email)
    } catch (err) {
      showError(err)
    } finally {
      setIsLoading(false)
    }
  }

  // ---------- INTERNAL FUNCTION: SEND RESET LINK ----------
  const sendReset = async (userId: string, email: string) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      console.debug("[ForgetPassword] send-link payload:", { userId, email })
      const res = await api.post("public/password/send-link", { userId, email })

      setMessage(res.data?.message || "Link reset berhasil dikirim.")
      setStep("done")
    } catch (err: any) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Gagal mengirim email reset."
      setError(apiMsg)
    } finally {
      setIsLoading(false)
    }
  }

  // =======================================================
  // RENDER
  // =======================================================
  return (
    <Card>
          <CardContent className="flex flex-col items-center gap-4 py-8">
             <div className="w-full max-w-sm">
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-2xl">Lupa Password</h1>
        <p className="text-muted-foreground text-sm">
          Masukkan email Anda untuk mencari akun.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      )}

      {message && (
        <Alert className="mt-4">
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Gagal</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form untuk memasukkan email */}
      {step === "email" && (
        <Form {...emailForm}>
          <form className="space-y-4 mt-4" onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      placeholder="email@contoh.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Lanjut'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Ingat password Anda?{' '}
              <a href="/auth/login" className="underline hover:text-primary">
                Masuk
              </a>
            </p>
          </form>
        </Form>
      )}

      {/* Form untuk memilih username */}
      {step === "username" && (
        <Form {...usernameForm}>
          <form className="space-y-4 mt-4" onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)}>
            <FormField
              control={usernameForm.control}
              name="selectedUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Username</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">-- pilih salah satu --</option>
                      {foundUsers.map((u) => (
                        <option key={u.id} value={u.username}>
                          {u.username}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Kirim Reset Password'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Ingat password Anda?{' '}
              <a href="/auth/login" className="underline hover:text-primary">
                Masuk
              </a>
            </p>
          </form>
        </Form>
      )}

      {/* Tampilan setelah link reset berhasil dikirim */}
      {step === "done" && (
        <div className="text-center mt-4">
          <p className="text-green-700 font-semibold">{message}</p>
          <p>
            Kembali ke halaman{' '}
            <a href="/auth/login" className="underline hover:text-primary">
              Login
            </a>
          </p>
        </div>
      )}
    </div>
        </CardContent>
    </Card>
    
  )
}
