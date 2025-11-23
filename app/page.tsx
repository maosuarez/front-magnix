'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Magnix</h1>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Ingresar</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90">Registrarse</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Gestión Completa de Torneos y Reservas
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
          Magnix es tu plataforma integral para gestionar torneos, reservar espacios deportivos y conectar con tu comunidad.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Comenzar Ahora
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Conocer Más
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-12 text-center">Características</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Torneos',
                description: 'Crea, gestiona y participa en torneos de múltiples deportes',
              },
              {
                title: 'Reservas',
                description: 'Reserva espacios deportivos de forma rápida y sencilla',
              },
              {
                title: 'Comunidad',
                description: 'Conecta con otros deportistas y comparte tu pasión',
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-lg border border-border p-6 bg-background">
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
