import * as z from 'zod'

export type LoginSchema = z.output<typeof loginSchema>
export type RegisterSchema = z.output<typeof registerSchema>
export type ResetSchema = z.output<typeof resetSchema>
export type PasswordResetSchema = z.output<typeof passwordResetSchema>

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(1, 'Password cannot be empty!')
})

export const registerSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required')
    .min(8, 'Must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>_]/, 'Must contain at least one special character!')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter!'),
  name: z.string('Name is required')
    .min(3, 'Must be at least 3 characters')
})

export const resetSchema = z.object({
  email: z.email('Invalid email')
})

export const passwordResetSchema = z.object({
  password: z.string('Password is required')
    .min(8, 'Must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>_]/, 'Must contain at least one special character!')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter!')
})
