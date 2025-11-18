import Link from 'next/link'
import { Trophy, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Magnix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu plataforma completa para deportes, torneos y comunidad.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tournaments" className="text-muted-foreground hover:text-primary transition-colors">
                  Torneos
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-muted-foreground hover:text-primary transition-colors">
                  Reservas
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  Comunidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Deportes</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/community?sport=FOOTBALL" className="text-muted-foreground hover:text-primary transition-colors">
                  Fútbol
                </Link>
              </li>
              <li>
                <Link href="/community?sport=BASKETBALL" className="text-muted-foreground hover:text-primary transition-colors">
                  Baloncesto
                </Link>
              </li>
              <li>
                <Link href="/community?sport=TENNIS" className="text-muted-foreground hover:text-primary transition-colors">
                  Tenis
                </Link>
              </li>
              <li>
                <Link href="/community?sport=VOLLEYBALL" className="text-muted-foreground hover:text-primary transition-colors">
                  Voleibol
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 Magnix. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
