"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface SignUpFormProps {
  role: string
  onBack: () => void
}

export default function SignUpForm({ role, onBack }: SignUpFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert("Sign-up form submitted!")
  }

  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1)

  return (
    <Card className="bg-zinc-800 border-zinc-700 text-white">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-zinc-400 hover:text-white mr-2">
            <ArrowLeft size={18} />
          </Button>
          <div>
            <CardTitle className="text-xl">{roleTitle} Sign Up</CardTitle>
            <CardDescription className="text-zinc-400">Create your account as a {role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              required
              className="bg-zinc-700 border-zinc-600 text-white"
            />
          </div>

          {role === "student" && (
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                placeholder="Enter your roll number"
                required
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              required
              className="bg-zinc-700 border-zinc-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className="bg-zinc-700 border-zinc-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              className="bg-zinc-700 border-zinc-600 text-white"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-zinc-600 hover:bg-zinc-500">
            Create Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

