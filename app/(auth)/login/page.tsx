"use client"

import Link from "next/link"
import { FaSpotify, FaGoogle, FaFacebook, FaApple } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSpotifyLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Cambiamos a redirección directa para evitar problemas con la redirección
      await signIn("spotify", {
        callbackUrl: "/",
      })
      // No necesitamos manejar la redirección aquí ya que signIn con redirect: true
      // (valor por defecto) manejará la redirección automáticamente
    } catch (error) {
      console.error("Error al iniciar sesión con Spotify:", error)
      setError("Error al iniciar sesión con Spotify")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-neutral-900 rounded-lg">
        <div className="flex justify-center mb-6 md:mb-8">
          <FaSpotify className="text-5xl md:text-7xl" color="white" />
        </div>

        <h1 className="text-white text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Inicia sesión en Spotify</h1>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-4">{error}</div>}

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-neutral-700 text-white hover:bg-neutral-800 flex items-center justify-center gap-2 py-5"
            onClick={handleSpotifyLogin}
            disabled={isLoading}
          >
            <FaSpotify className="text-lg" />
            <span>Continuar con Spotify</span>
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent border border-neutral-700 text-white hover:bg-neutral-800 flex items-center justify-center gap-2 py-5"
            disabled={isLoading}
          >
            <FaGoogle className="text-lg" />
            <span>Continuar con Google</span>
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent border border-neutral-700 text-white hover:bg-neutral-800 flex items-center justify-center gap-2 py-5"
            disabled={isLoading}
          >
            <FaFacebook className="text-lg" />
            <span>Continuar con Facebook</span>
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent border border-neutral-700 text-white hover:bg-neutral-800 flex items-center justify-center gap-2 py-5"
            disabled={isLoading}
          >
            <FaApple className="text-lg" />
            <span>Continuar con Apple</span>
          </Button>
        </div>

        <div className="relative flex justify-center text-xs mb-4">
          <span className="px-2 bg-neutral-900 text-neutral-400">o</span>
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-700"></span>
          </div>
        </div>

        <form
          className="space-y-3 md:space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: Here would be the logic to log in with credentials HandleLogin()
          }}
        >
          <div className="space-y-1 md:space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email o nombre de usuario
            </label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email o nombre de usuario"
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus-visible:ring-green-500 py-5"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus-visible:ring-green-500 py-5"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-5"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>

        <div className="mt-4 md:mt-6 text-center">
          <Link href="/forgot-password" className="text-white hover:underline text-sm">
            ¿Has olvidado tu contraseña?
          </Link>
        </div>

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-neutral-700 text-center">
          <p className="text-neutral-400 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="text-white hover:underline">
              Regístrate en Spotify
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

