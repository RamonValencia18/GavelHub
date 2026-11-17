import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useLogin } from '../hooks/useLogin';
import '../css/LoginPage.css';

export const LoginPage: React.FC = () => {
    const { avisoSesion } = useAuth();
    const { cargando, errorServidor, rutaDestino, ejecutarLogin, limpiarError } = useLogin();

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mantenerActiva, setMantenerActiva] = useState(false);

    const [errores, setErrores] = useState<{ correo?: string; contrasena?: string }>({});

    const validar = (): boolean => {
        const nuevosErrores: { correo?: string; contrasena?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!correo.trim()) {
            nuevosErrores.correo = 'Ingresa tu correo electrónico de participante.';
        } else if (!emailRegex.test(correo)) {
            nuevosErrores.correo = 'Ingresa un formato de correo válido (ejemplo@coleccionista.mx).';
        }

        if (!contrasena) {
            nuevosErrores.contrasena = 'Debes ingresar tu contraseña para continuar.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        limpiarError();

        if (!validar()) return;

        await ejecutarLogin({
            correo: correo.trim(),
            password: contrasena,
        });
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-split-card">
                {/* COLUMNA IZQUIERDA: PANEL INSTITUCIONAL */}
                <aside className="auth-brand-panel">
                    <div>
                        <div className="auth-brand__top">
                            <div className="auth-brand__logo-box">GH</div>
                            <div>
                                <span className="auth-brand__name">GAVELHUB</span>
                                <span className="auth-brand__sub">SUBASTAS PATRIMONIALES • MÉXICO</span>
                            </div>
                        </div>

                        <span className="auth-brand__kicker">CATÁLOGO OFICIAL &amp; SALA EN LÍNEA</span>
                        <h1 className="auth-brand__headline">
                            Subastas transparentes para coleccionistas rigurosos.
                        </h1>
                        <p className="auth-brand__description">
                            La transición digital de la casa de subastas más respetada de México, con
                            registro cronometrado al milisegundo y garantía absoluta de procedencia.
                        </p>

                        <div className="auth-feature-cards">
                            <div className="auth-feature-card">
                                <div className="auth-feature-card__icon">01</div>
                                <div>
                                    <h3 className="auth-feature-card__title">
                                        Historial de ofertas 100% auditable y público
                                    </h3>
                                    <p className="auth-feature-card__text">
                                        Todas las pujas quedan registradas con marca temporal del servidor
                                        central inmutable.
                                    </p>
                                </div>
                            </div>

                            <div className="auth-feature-card">
                                <div className="auth-feature-card__icon">02</div>
                                <div>
                                    <h3 className="auth-feature-card__title">
                                        Garantía de procedencia certificada
                                    </h3>
                                    <p className="auth-feature-card__text">
                                        Cada lote cuenta con informe de condición físico y certificación
                                        pericial.
                                    </p>
                                </div>
                            </div>

                            <div className="auth-feature-card">
                                <div className="auth-feature-card__icon">03</div>
                                <div>
                                    <h3 className="auth-feature-card__title">
                                        Cierre estricto por servidor central
                                    </h3>
                                    <p className="auth-feature-card__text">
                                        La hora oficial de cierre la decide el servidor y una oferta posterior
                                        al cierre no es válida.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="auth-brand__footer">
                        <span>[UTC-6]</span>
                        <span>
                            Sincronizado con CENAM • Lunes 16 de noviembre de 2026, 14:32:05
                        </span>
                    </div>
                </aside>

                {/* COLUMNA DERECHA: FORMULARIO DE INICIO DE SESIÓN */}
                <section className="auth-form-panel">
                    <div>
                        <div className="auth-form__top-bar">
                            <span className="auth-verified-badge">Acceso Verificado a Subastas</span>
                        </div>

                        <h2 className="auth-form__title">Bienvenido de vuelta</h2>
                        <p className="auth-form__subtitle">
                            Ingresa a tu cuenta de participante para gestionar tus lotes y posturas en
                            tiempo real.
                        </p>

                        {avisoSesion && (
                            <div className="auth-field-error-box" style={{ marginBottom: '16px', padding: '12px' }}>
                                <span>[!]</span>
                                <span>{avisoSesion}</span>
                            </div>
                        )}

                        {errorServidor && (
                            <div className="auth-field-error-box" style={{ marginBottom: '16px', padding: '12px' }}>
                                <span>[!]</span>
                                <span>{errorServidor}</span>
                            </div>
                        )}

                        <form className="auth-form-body" onSubmit={handleSubmit} noValidate>
                            {/* Campo: Correo Electrónico */}
                            <div>
                                <div className="auth-field__header">
                                    <label
                                        htmlFor="login-correo"
                                        className={`auth-field__label ${errores.correo ? 'auth-field__label--error' : ''
                                            }`}
                                    >
                                        Correo electrónico
                                    </label>
                                </div>
                                <div
                                    className={`auth-input-box ${errores.correo ? 'auth-input-box--error' : ''
                                        }`}
                                >
                                    <span className="auth-input-box__icon">@</span>
                                    <input
                                        id="login-correo"
                                        type="email"
                                        className="auth-input-box__input"
                                        placeholder="ejemplo@coleccionista.mx"
                                        value={correo}
                                        disabled={cargando}
                                        onChange={(e) => {
                                            setCorreo(e.target.value);
                                            if (errores.correo) setErrores({ ...errores, correo: undefined });
                                        }}
                                    />
                                </div>
                                {errores.correo ? (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>{errores.correo}</span>
                                    </div>
                                ) : (
                                    <div className="auth-field__helper-mono">
                                        Cuenta autorizada con firma electrónica o KYC.
                                    </div>
                                )}
                            </div>

                            {/* Campo: Contraseña */}
                            <div>
                                <div className="auth-field__header">
                                    <label
                                        htmlFor="login-password"
                                        className={`auth-field__label ${errores.contrasena ? 'auth-field__label--error' : ''
                                            }`}
                                    >
                                        Contraseña
                                    </label>
                                    <span className="auth-field__hint-right auth-field__hint-right--link">
                                        ¿Olvidaste tu contraseña?
                                    </span>
                                </div>
                                <div
                                    className={`auth-input-box ${errores.contrasena ? 'auth-input-box--error' : ''
                                        }`}
                                >
                                    <span className="auth-input-box__icon">*</span>
                                    <input
                                        id="login-password"
                                        type={mostrarContrasena ? 'text' : 'password'}
                                        className="auth-input-box__input"
                                        placeholder="••••••••••••"
                                        value={contrasena}
                                        disabled={cargando}
                                        onChange={(e) => {
                                            setContrasena(e.target.value);
                                            if (errores.contrasena)
                                                setErrores({ ...errores, contrasena: undefined });
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="auth-input-box__action"
                                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                    >
                                        {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                                {errores.contrasena && (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>{errores.contrasena}</span>
                                    </div>
                                )}
                            </div>

                            {/* Checkbox recordar sesión */}
                            <label className="auth-checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={mantenerActiva}
                                    disabled={cargando}
                                    onChange={(e) => setMantenerActiva(e.target.checked)}
                                />
                                <span>Mantener activa la consola de postor en este dispositivo</span>
                            </label>

                            {/* Botón Entrar */}
                            <button type="submit" className="auth-btn-gold" disabled={cargando}>
                                <span>
                                    {cargando ? 'Verificando credenciales...' : 'Entrar a mi cuenta'}
                                </span>
                                <span>→</span>
                            </button>

                            <div className="auth-divider">
                                <span>¿Eres nuevo en GavelHub?</span>
                            </div>

                            <Link
                                to="/registro"
                                state={{ from: rutaDestino }}
                                className="auth-btn-secondary"
                            >
                                <span>Crear una cuenta de participante</span>
                            </Link>
                        </form>
                    </div>

                    <div className="auth-form__bottom">
                        <div className="auth-security-note">
                            <span>Conexión cifrada de extremo a extremo de 256 bits</span>
                        </div>
                        <p className="auth-legal-note">
                            GavelHub México • Regulado conforme a las normativas de corretaje
                            <br />y subastas de arte aplicables.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};