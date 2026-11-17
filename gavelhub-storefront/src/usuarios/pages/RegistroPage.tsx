import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegistro } from '../hooks/useRegistro';
import '../css/RegistroPage.css';

export const RegistroPage: React.FC = () => {
    const { cargando, errorServidor, rutaDestino, ejecutarRegistro, limpiarError } = useRegistro();

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [aceptaTerminos, setAceptaTerminos] = useState(true);

    const [errores, setErrores] = useState<{
        nombre?: string;
        correo?: string;
        contrasena?: string;
        confirmarContrasena?: string;
        terminos?: string;
    }>({});

    const tieneMinimo8 = contrasena.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneNumero = /[0-9]/.test(contrasena);
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    const noCoinciden =
        confirmarContrasena.length > 0 && contrasena !== confirmarContrasena;

    const validarFormulario = (): boolean => {
        const nuevosErrores: typeof errores = {};

        if (!nombre.trim()) {
            nuevosErrores.nombre = 'Ingresa tu nombre completo como aparece en tu identificación.';
        }

        if (!correo.trim()) {
            nuevosErrores.correo = 'El correo electrónico es obligatorio.';
        } else if (!correoValido) {
            nuevosErrores.correo = 'Ingresa un correo electrónico válido.';
        }

        if (!tieneMinimo8 || !tieneMayuscula || !tieneNumero) {
            nuevosErrores.contrasena =
                'La contraseña debe cumplir con al menos 8 caracteres, 1 mayúscula y 1 número.';
        }

        if (!confirmarContrasena || contrasena !== confirmarContrasena) {
            nuevosErrores.confirmarContrasena =
                'Las contraseñas no coinciden. Asegúrate de escribir exactamente la misma contraseña que ingresaste arriba.';
        }

        if (!aceptaTerminos) {
            nuevosErrores.terminos =
                'Debes aceptar el compromiso de ofertas vinculantes para habilitar tu paleta.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        limpiarError();

        if (!validarFormulario()) return;

        await ejecutarRegistro({
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
                            <div className="auth-brand__logo-box auth-brand__logo-box--dark">GH</div>
                            <div>
                                <span className="auth-brand__name">GAVELHUB</span>
                                <span className="auth-brand__sub">CASA DE SUBASTAS DE MÉXICO</span>
                            </div>
                        </div>

                        <div className="auth-brand__pill-badge">
                            <span className="auth-brand__pill-dot"></span>
                            <span>Convocatoria Pública Vigente</span>
                        </div>

                        <h1 className="auth-brand__headline">
                            Únete a la comunidad de subastas más confiable de México.
                        </h1>
                        <p className="auth-brand__description">
                            Participa en pujas en tiempo real por piezas históricas, numismática, alta
                            relojería y arte de colección.
                        </p>

                        <div className="auth-check-list">
                            <div className="auth-check-item">
                                <div className="auth-check-item__icon">OK</div>
                                <div>
                                    <h3 className="auth-feature-card__title">
                                        Participación anónima garantizada
                                    </h3>
                                    <p className="auth-feature-card__text">
                                        Tu identidad real solo la conoce la casa de subastas; en sala pública
                                        operas con un identificador de postor anónimo (ej. Postor #8412).
                                    </p>
                                </div>
                            </div>

                            <div className="auth-check-item">
                                <div className="auth-check-item__icon">OK</div>
                                <div>
                                    <h3 className="auth-feature-card__title">
                                        Lotes verificados por especialistas
                                    </h3>
                                    <p className="auth-feature-card__text">
                                        Inspección física, informe de condición detallado y fotografía macro de
                                        alta resolución.
                                    </p>
                                </div>
                            </div>

                            <div className="auth-check-item">
                                <div className="auth-check-item__icon">OK</div>
                                <div>
                                    <h3 className="auth-feature-card__title">
                                        Entregas aseguradas y custodia en bóveda
                                    </h3>
                                    <p className="auth-feature-card__text">
                                        Envío blindado con cobertura total a toda la República Mexicana o
                                        retiro en sala.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="auth-brand__footer">
                        <span>[Fideicomiso]</span>
                        <span>Custodia fiduciaria certificada</span>
                    </div>
                </aside>

                {/* COLUMNA DERECHA: FORMULARIO DE REGISTRO */}
                <section className="auth-form-panel">
                    <div>
                        <div className="auth-form__top-bar">
                            <span className="auth-form__step-label">PASO ÚNICO DE ACREDITACIÓN</span>
                            <span className="auth-verified-badge">Paleta Digital #0000</span>
                        </div>

                        <h2 className="auth-form__title">Registro de participante</h2>
                        <p className="auth-form__subtitle">
                            Completa tus datos para habilitar tu paleta digital de postor.
                        </p>

                        {errorServidor && (
                            <div className="auth-field-error-box" style={{ marginBottom: '16px', padding: '12px' }}>
                                <span>[!]</span>
                                <span>{errorServidor}</span>
                            </div>
                        )}

                        <form className="auth-form-body" onSubmit={handleSubmit} noValidate>
                            {/* Campo: Nombre Completo */}
                            <div>
                                <div className="auth-field__header">
                                    <label
                                        htmlFor="reg-nombre"
                                        className={`auth-field__label ${errores.nombre ? 'auth-field__label--error' : ''
                                            }`}
                                    >
                                        Nombre completo
                                    </label>
                                    <span className="auth-field__hint-right">
                                        Conforme a INE o Pasaporte
                                    </span>
                                </div>
                                <div
                                    className={`auth-input-box auth-input-box--white ${errores.nombre ? 'auth-input-box--error' : ''
                                        }`}
                                >
                                    <span className="auth-input-box__icon">ID</span>
                                    <input
                                        id="reg-nombre"
                                        type="text"
                                        className="auth-input-box__input"
                                        placeholder="Nombre y apellidos como en tu identificación oficial"
                                        value={nombre}
                                        disabled={cargando}
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                            if (errores.nombre) setErrores({ ...errores, nombre: undefined });
                                        }}
                                    />
                                </div>
                                {errores.nombre && (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>{errores.nombre}</span>
                                    </div>
                                )}
                            </div>

                            {/* Campo: Correo Electrónico */}
                            <div>
                                <div className="auth-field__header">
                                    <label
                                        htmlFor="reg-correo"
                                        className={`auth-field__label ${errores.correo ? 'auth-field__label--error' : ''
                                            }`}
                                    >
                                        Correo electrónico
                                    </label>
                                </div>
                                <div
                                    className={`auth-input-box auth-input-box--white ${errores.correo ? 'auth-input-box--error' : ''
                                        }`}
                                >
                                    <span className="auth-input-box__icon">@</span>
                                    <input
                                        id="reg-correo"
                                        type="email"
                                        className="auth-input-box__input"
                                        placeholder="carlos.mendoza@arte.mx"
                                        value={correo}
                                        disabled={cargando}
                                        onChange={(e) => {
                                            setCorreo(e.target.value);
                                            if (errores.correo) setErrores({ ...errores, correo: undefined });
                                        }}
                                    />
                                    {correoValido && (
                                        <span style={{ color: '#c99a2e', fontWeight: 700 }}>[V]</span>
                                    )}
                                </div>
                                {errores.correo && (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>{errores.correo}</span>
                                    </div>
                                )}
                            </div>

                            {/* Campo: Contraseña */}
                            <div>
                                <div className="auth-field__header">
                                    <label
                                        htmlFor="reg-contrasena"
                                        className={`auth-field__label ${errores.contrasena ? 'auth-field__label--error' : ''
                                            }`}
                                    >
                                        Contraseña
                                    </label>
                                </div>
                                <div
                                    className={`auth-input-box auth-input-box--white ${errores.contrasena ? 'auth-input-box--error' : ''
                                        }`}
                                >
                                    <span className="auth-input-box__icon">*</span>
                                    <input
                                        id="reg-contrasena"
                                        type={mostrarContrasena ? 'text' : 'password'}
                                        className="auth-input-box__input"
                                        placeholder="••••••••••••••"
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
                                        Ver
                                    </button>
                                </div>

                                {/* Píldoras de validación en tiempo real */}
                                <div className="password-rules-row">
                                    <span
                                        className={`password-rule ${tieneMinimo8 ? 'password-rule--met' : ''
                                            }`}
                                    >
                                        <span className="password-rule__dot">•</span> 8+ caracteres
                                    </span>
                                    <span
                                        className={`password-rule ${tieneMayuscula ? 'password-rule--met' : ''
                                            }`}
                                    >
                                        <span className="password-rule__dot">•</span> 1 mayúscula
                                    </span>
                                    <span
                                        className={`password-rule ${tieneNumero ? 'password-rule--met' : ''
                                            }`}
                                    >
                                        <span className="password-rule__dot">•</span> 1 número
                                    </span>
                                </div>

                                {errores.contrasena && (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>{errores.contrasena}</span>
                                    </div>
                                )}
                            </div>

                            {/* Campo: Confirmar Contraseña */}
                            <div>
                                <div className="auth-field__header">
                                    <label
                                        htmlFor="reg-confirmar"
                                        className={`auth-field__label ${noCoinciden || errores.confirmarContrasena
                                                ? 'auth-field__label--error'
                                                : ''
                                            }`}
                                    >
                                        Confirmar contraseña
                                    </label>
                                    {(noCoinciden || errores.confirmarContrasena) && (
                                        <span className="auth-field__hint-right auth-field__hint-right--error">
                                            [No coincide]
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={`auth-input-box auth-input-box--white ${noCoinciden || errores.confirmarContrasena
                                            ? 'auth-input-box--error'
                                            : ''
                                        }`}
                                >
                                    <span className="auth-input-box__icon">*</span>
                                    <input
                                        id="reg-confirmar"
                                        type={mostrarContrasena ? 'text' : 'password'}
                                        className="auth-input-box__input"
                                        placeholder="••••••••••••••"
                                        value={confirmarContrasena}
                                        disabled={cargando}
                                        onChange={(e) => {
                                            setConfirmarContrasena(e.target.value);
                                            if (errores.confirmarContrasena)
                                                setErrores({ ...errores, confirmarContrasena: undefined });
                                        }}
                                    />
                                </div>

                                {(noCoinciden || errores.confirmarContrasena) && (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>
                                            {errores.confirmarContrasena ||
                                                'Las contraseñas no coinciden. Asegúrate de escribir exactamente la misma contraseña que ingresaste arriba.'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Aceptación de términos vinculantes */}
                            <div>
                                <label className="auth-terms-box">
                                    <input
                                        type="checkbox"
                                        checked={aceptaTerminos}
                                        disabled={cargando}
                                        onChange={(e) => {
                                            setAceptaTerminos(e.target.checked);
                                            if (errores.terminos)
                                                setErrores({ ...errores, terminos: undefined });
                                        }}
                                    />
                                    <span>
                                        Entiendo y acepto que las ofertas son vinculantes y que incumplir el
                                        pago puede causar el bloqueo definitivo de la cuenta.
                                    </span>
                                </label>
                                {errores.terminos && (
                                    <div className="auth-field-error-box">
                                        <span>[!]</span>
                                        <span>{errores.terminos}</span>
                                    </div>
                                )}
                            </div>

                            {/* Botón de envío */}
                            <button type="submit" className="auth-btn-gold" disabled={cargando}>
                                <span>
                                    {cargando
                                        ? 'Habilitando paleta digital...'
                                        : 'Crear cuenta y habilitar paleta'}
                                </span>
                            </button>

                            <div className="auth-switch-text">
                                ¿Ya tienes cuenta?
                                <Link
                                    to="/login"
                                    state={{ from: rutaDestino }}
                                    className="auth-switch-link"
                                >
                                    Inicia sesión aquí
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="auth-form__bottom">
                        <div className="auth-security-note">
                            <span>Cifrado TLS 1.3 de extremo a extremo • Datos protegidos por INAI</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};