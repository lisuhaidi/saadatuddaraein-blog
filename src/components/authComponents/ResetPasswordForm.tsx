'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import api from '@/lib/api'
import { resetPasswordSchema as formSchema } from '@/lib/schemas'

interface ResetPasswordFormProps {
  token: any
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setMessage(null)
    setError(null)
    setLoading(true)

    try {
      const payload = {
        token,
        newPassword: values.newPassword,
      }
      console.debug('[ResetPassword] POST', payload)
      const res = await api.post('public/password/reset', payload)

      const newAuthToken = res.data?.token
      if (newAuthToken) {
        localStorage.setItem('authToken', newAuthToken)
      }

      setMessage(res.data?.message || 'Password berhasil direset. Anda sekarang telah masuk.')
      form.reset()

      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 3000)
    } catch (err: any) {
      console.error('[ResetPassword] request error', err)
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        'Gagal mereset password. Token mungkin tidak valid atau telah kedaluwarsa.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <div className="w-full max-w-sm">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-2xl">Atur Ulang Password</h1>
            <p className="text-muted-foreground text-sm">
              Masukkan password baru Anda.
            </p>
          </div>

          {message && (
            <Alert>
              <AlertTitle>Berhasil</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Gagal</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-background"
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Spinner /> : 'Simpan Password Baru'}
          </Button>
           <p className="text-center text-sm text-muted-foreground">
            Kembali ke halaman{' '}
            <a href="/login" className="underline hover:text-primary">
              Masuk
            </a>
          </p>
        </form>
      </Form>
    </div>
      </CardContent>
    </Card>
  )
}
