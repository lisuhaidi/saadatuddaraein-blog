import { defineMiddleware } from 'astro:middleware'
import jwt from 'jsonwebtoken'

const JWT_SECRET = import.meta.env.JWT_SECRET

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context

  // 👉 hanya proteksi /admin/*
  if (!url.pathname.startsWith('/admin')) {
    return next()
  }

  const token = cookies.get('access_token')?.value

  // ❌ belum login
  if (!token) {
    return redirect('/auth/login')
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any

    // ❌ bukan admin
    if (payload.role !== 'ADMIN') {
      return new Response('Forbidden', { status: 403 })
    }

    // ✅ lolos → lanjut render halaman
    context.locals.user = payload
    return next()

  } catch (err) {
    // ❌ token invalid / expired
    return redirect('/auth/login')
  }
})
