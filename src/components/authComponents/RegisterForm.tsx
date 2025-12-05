'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { 
  Card,
  CardContent,
} from '@/components/ui/card'  
import api from '@/lib/api'
import { Eye, EyeOff } from 'lucide-react'
import { registerSchema as formSchema } from '@/lib/schemas'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setMessage(null)
    setError(null)
    try {
      setLoading(true)
      const payload = {
        email: values.email.trim(),
        username: values.username.trim(),
        password: values.password.trim(),
      }
      console.debug('[Register] POST', payload)

      const res = await api.post('otp/send', payload)
      console.debug('[Register] response', res?.status, res?.data)

      if (res?.status && res.status >= 200 && res.status < 300) {
        setMessage('OTP berhasil dikirim. Periksa email Anda.')
        sessionStorage.setItem('registerEmail', payload.email)
        sessionStorage.setItem('registerUsername', payload.username)
        sessionStorage.setItem('registerPassword', payload.password)
        form.reset()
        // Redirect setelah 2 detik agar user bisa melihat success message
        setTimeout(() => {
          window.location.replace('/auth/verify-otp')
        }, 100)
      } else {
        setError(`Gagal mengirim OTP (status ${res?.status}).`)
      }
    } catch (err: any) {
      console.error('[Register] request error', err)

      const data = err?.response?.data
      const status = err?.response?.status

      let parsedError = 'Terjadi kesalahan'

      if (data) {
        try {
          parsedError = data.error || data.message || JSON.stringify(data)
        } catch {
          parsedError = JSON.stringify(data)
        }
      } else if (err?.message) {
        parsedError = err.message
      }

      setError(status ? `Error ${status}: ${parsedError}` : parsedError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-8">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-2xl">Buat Akun Baru</h1>
            <p className="text-muted-foreground text-sm">
              Masukkan data Anda untuk mendaftar.
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
              <AlertTitle>Pendaftaran Gagal</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="bg-background" placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
            {loading ? <Spinner /> : 'Daftar & Kirim OTP'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{' '}
            <a href="/auth/login" className="underline hover:text-primary">
              Masuk
            </a>
          </p>
        </form>
      </Form>
      </CardContent>
    </Card>
    
  )
}
