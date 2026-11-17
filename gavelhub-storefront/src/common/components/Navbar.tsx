import { Gavel } from 'lucide-react'
import { formatServerTime } from '../utils/formatters'
import '../css/Navbar.css'

type NavbarProps = {
  activePath?: string
  userName?: string
  userRole?: string
  avatarUrl?: string
}

export function Navbar({
  activePath = 'explorar',
  userName,
  userRole = 'Participante verificado',
  avatarUrl,
}: NavbarProps) {
  return (
    <header className="navbar">
      <a className="navbar-brand" href="/">
        <span className="navbar-mark">
          <Gavel size={17} />
        </span>
        <span>
          <strong>GavelHub</strong>
          <small>CASA DE SUBASTAS</small>
        </span>
      </a>

      <nav className="navbar-links" aria-label="Navegación principal">
        <a className={activePath === 'explorar' ? 'active' : ''} href="#catalogo">
          Explorar
        </a>
        <a className={activePath === 'seguidos' ? 'active' : ''} href="#seguidos">
          Mis seguidos
        </a>
        <a className={activePath === 'ganados' ? 'active' : ''} href="#ganados">
          Mis ganados
        </a>
      </nav>

      <div className="navbar-session">
        <div className="navbar-server-time">
          <span>
            <i />
            Hora oficial del servidor
          </span>
          <strong>{formatServerTime()}</strong>
        </div>

        <div className="navbar-divider" />

        <div className="navbar-user">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName ?? 'Usuario'} />
          ) : (
            <span className="navbar-avatar">
              {(userName?.[0] ?? 'U').toUpperCase()}
            </span>
          )}
          <span>
            <strong>{userName ?? 'Usuario'}</strong>
            <small>{userRole}</small>
          </span>
        </div>
      </div>
    </header>
  )
}
