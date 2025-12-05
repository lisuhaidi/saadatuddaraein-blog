import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: 'Username tidak boleh kosong.',
  }),
  password: z.string().min(1, {
    message: 'Password tidak boleh kosong.',
  }),
})

export const registerSchema = z.object({
  username: z.string().min(2, {
    message: 'Username harus memiliki setidaknya 2 karakter.',
  }),
  email: z.string().email({
    message: 'Silakan masukkan alamat email yang valid.',
  }),
  password: z.string().min(6, {
    message: 'Password harus memiliki setidaknya 6 karakter.',
  }),
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, {
    message: 'Password minimal 6 karakter.',
  }),
})

export const verifyOtpSchema = z.object({
  otp: z.string().min(6, {
    message: 'OTP harus terdiri dari 6 digit.',
  }),
})

export const forgetPasswordEmailSchema = z.object({
  email: z.string().email({
    message: 'Silakan masukkan alamat email yang valid.',
  }),
})

export const forgetPasswordUsernameSchema = z.object({
  selectedUsername: z.string().min(1, {
    message: 'Silakan pilih username.',
  }),
})
