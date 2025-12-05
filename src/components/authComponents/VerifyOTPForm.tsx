'use client'

import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Card, CardContent } from '@/components/ui/card'
import api from '@/lib/api'
import { Spinner } from '@/components/ui/spinner'
import { verifyOtpSchema as formSchema } from '@/lib/schemas'

export default function VerifyOTPForm() {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(300) // 5 menit = 300 detik

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('registerEmail')
    const storedUsername = sessionStorage.getItem('registerUsername')
    const storedPassword = sessionStorage.getItem('registerPassword')

    if (storedEmail && storedUsername && storedPassword) {
      setEmail(storedEmail)
      setUsername(storedUsername)
      setPassword(storedPassword)
      setCountdown(300) // Mulai hitung mundur saat komponen dimuat
    } else {
      console.warn(
        '[VerifyOTP] Data registrasi tidak lengkap di localStorage. Redirect ke /auth/register',
      )
      window.location.replace('/auth/register')
    }
  }, [])

  // Efek untuk timer hitung mundur
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer) // Cleanup timeout
    }
  }, [countdown])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setMessage(null)
    setError(null)

    if (!email || !username || !password) {
      setError('Data registrasi tidak lengkap. Silakan daftar kembali.')
      return
    }

    try {
      setLoading(true)
      // Step 1: Verify OTP
      const otpPayload = { email, submittedOtp: values.otp }
      console.debug('[VerifyOTP] POST otp/verify', otpPayload)
      const otpRes = await api.post('otp/verify', otpPayload)
      console.debug('[VerifyOTP] response', otpRes?.status, otpRes?.data)

      if (otpRes?.status && otpRes.status >= 200 && otpRes.status < 300) {
        setMessage('OTP terverifikasi. Mendaftarkan akun...')

        // Step 2: Register the user
        const registerPayload = { username, email, password }
        console.debug('[VerifyOTP] POST public/register', registerPayload)
        const registerRes = await api.post('public/register', registerPayload)

        const token = registerRes.data?.token
        if (!token) {
          throw new Error('Token tidak diterima dari server setelah registrasi.')
        }

        // Simpan token, hapus data sementara, dan redirect
        localStorage.setItem('authToken', token)
        sessionStorage.removeItem('registerEmail')
        sessionStorage.removeItem('registerUsername')
        sessionStorage.removeItem('registerPassword')

        setMessage('Registrasi berhasil! Anda akan diarahkan ke dashboard...')
        setTimeout(() => {
          window.location.replace('/dashboard')
        }, 2000)
      } else {
        setError(`Gagal verifikasi OTP (status ${otpRes?.status}).`)
      }
    } catch (err: any) {
      console.error('[VerifyOTP] request error', err)
      const status = err?.response?.status
      const data = err?.response?.data
      // Prioritaskan error dari server (data.error, data.message, data.errors)
      if (data?.error) {
        setError(data.error)
      } else if (data && (data?.message || data?.errors)) {
        const msg = data.message || JSON.stringify(data.errors || data)
        setError(msg)
      } else if (status) {
        setError(`Request failed with status code ${status}`)
      } else {
        setError(err?.message || 'Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0 || resending) return

    setMessage(null)
    setError(null)
    setResending(true)

    try {
      const payload = { email, username }
      console.debug('[ResendOTP] POST otp/send', payload)
      const res = await api.post('otp/send', payload)

      if (res?.status && res.status >= 200 && res.status < 300) {
        setMessage('OTP baru telah berhasil dikirim.')
        setCountdown(300) // Mulai hitung mundur 5 menit
      } else {
        setError(`Gagal mengirim ulang OTP (status ${res?.status}).`)
      }
    } catch (err: any) {
      console.error('[ResendOTP] request error', err)
      const errorMessage = err?.response?.data?.error || err?.response?.data?.message || err.message || 'Gagal mengirim ulang OTP.'
      setError(errorMessage)
    } finally {
      setResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <div className="w-full max-w-sm">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-2xl">Verifikasi Akun Anda</h1>
            {email && (
              <p className="text-muted-foreground text-sm">
                Masukkan kode 6 digit yang dikirim ke <strong>{email}</strong>
              </p>
            )}
          </div>

          {message && (
            <Alert>
              <AlertTitle>Informasi</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Verifikasi Gagal</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Kode OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="text-center text-sm">
            <button type="button" onClick={handleResendOtp} disabled={countdown > 0 || resending || loading} className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed">
              {resending ? 'Mengirim...' : countdown > 0 && email ? `Kirim ulang dalam ${formatTime(countdown)}` : 'Tidak menerima kode? Kirim ulang'}
            </button>
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Spinner /> : 'Verifikasi & Daftar'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Salah memasukkan data?{' '}
            <a href="/auth/register" className="underline hover:text-primary">
              Kembali ke pendaftaran
            </a>
          </p>
        </form>
      </Form>
    </div>
      </CardContent>
    </Card>
    
  )
}
