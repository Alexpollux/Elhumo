import { MapPin, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-humo-brown border-t border-white/10 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p className="font-display font-bold text-2xl text-white mb-3">
              El <span className="text-humo-orange">Humo</span>
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Cuisine mexicaine premium. Tacos, burritos et quesadillas artisanaux, préparés chaque jour avec des ingrédients frais.
            </p>
          </div>

          {/* Infos */}
          <div>
            <p className="text-white font-medium text-sm uppercase tracking-widest mb-4">Infos pratiques</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={15} className="text-humo-orange mt-0.5 shrink-0" />
                <span>42 Rue de la Fumée<br />75011 Paris</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={15} className="text-humo-orange shrink-0" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <Clock size={15} className="text-humo-orange mt-0.5 shrink-0" />
                <span>Lun–Dim : 12h–14h30<br />et 19h–22h30</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white font-medium text-sm uppercase tracking-widest mb-4">Navigation</p>
            <div className="space-y-2">
              {[
                { label: 'Notre carte', href: '#menu' },
                { label: 'Réserver', href: '#reservation' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="block text-white/50 text-sm hover:text-humo-orange transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} El Humo. Tous droits réservés.
          </p>
          <a
            href="https://meme-dev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            Site réalisé par meme-dev.com
          </a>
        </div>
      </div>
    </footer>
  )
}
