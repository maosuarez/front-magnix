import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Trophy, Calendar, Users, Target, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Tu plataforma deportiva todo en uno
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance">
              Organiza torneos, reserva espacios deportivos y conecta con tu comunidad. 
              Todo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/login">Comenzar ahora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-background text-foreground">
                <Link href="#features">Ver características</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Una plataforma completa diseñada para deportistas y organizadores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Torneos</h3>
                  <p className="text-muted-foreground text-balance">
                    Crea y gestiona torneos con sistemas de brackets, inscripciones y seguimiento de resultados.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Reservas</h3>
                  <p className="text-muted-foreground text-balance">
                    Sistema de reservas inteligente con calendario, confirmaciones automáticas y gestión de espacios.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Comunidad</h3>
                  <p className="text-muted-foreground text-balance">
                    Conecta con otros deportistas, comparte experiencias y organiza partidos por deporte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Deportes disponibles
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Encuentra tu deporte favorito y únete a la comunidad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'Fútbol', image: '/classic-soccer-ball.png' },
              { name: 'Baloncesto', image: '/basketball-action.png' },
              { name: 'Tenis', image: '/tennis-racket.png' },
              { name: 'Voleibol', image: '/volleyball-game.png' },
            ].map((sport) => (
              <Card key={sport.name} className="group hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <img src={sport.image || "/placeholder.svg"} alt={sport.name} className="w-12 h-12" />
                    </div>
                    <h3 className="font-semibold">{sport.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">
                  ¿Por qué elegir Magnix?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Fácil de usar</h3>
                      <p className="text-sm text-muted-foreground">
                        Interfaz intuitiva diseñada para deportistas de todos los niveles
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Rápido y confiable</h3>
                      <p className="text-sm text-muted-foreground">
                        Sistema optimizado para respuestas instantáneas y sin interrupciones
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Seguro y privado</h3>
                      <p className="text-sm text-muted-foreground">
                        Tus datos están protegidos con los más altos estándares de seguridad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Comienza tu experiencia deportiva hoy
            </h2>
            <p className="text-lg text-primary-foreground/90 text-balance">
              Únete a miles de deportistas que ya están usando Magnix para mejorar su experiencia deportiva
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/login">Crear cuenta gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
