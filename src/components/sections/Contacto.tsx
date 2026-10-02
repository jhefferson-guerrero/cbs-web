import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, CheckCircleIcon, EnvelopeSimpleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { CONTACT_EMAIL } from '@/lib/contact'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
// Una persona real lee el formulario y escribe en él; cualquier envío más
// rápido que esto es casi seguro un script llenando todos los campos de una
// sola vez.
const MIN_SUBMIT_MS = 2000
const GENERIC_SEND_ERROR = 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por correo.'

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const initialValues: FormValues = { name: '', email: '', phone: '', message: '' }

const NAME_MAX = 100
const EMAIL_MAX = 254
const PHONE_MAX = 20
const MESSAGE_MAX = 1000
const PHONE_PATTERN = /^[0-9+\-\s()]{6,20}$/
const NAME_ALLOWED_CHARS = /[^\p{L}\s'-]/gu

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Requerido'
  } else if (values.name.length > NAME_MAX) {
    errors.name = `Máx. ${NAME_MAX} caracteres`
  }

  if (!values.email.trim()) {
    errors.email = 'Requerido'
  } else if (values.email.length > EMAIL_MAX) {
    errors.email = `Máx. ${EMAIL_MAX} caracteres`
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Correo no válido'
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Teléfono no válido'
  }

  if (!values.message.trim()) {
    errors.message = 'Requerido'
  } else if (values.message.length > MESSAGE_MAX) {
    errors.message = `Máx. ${MESSAGE_MAX} caracteres`
  }

  return errors
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* El error va en la misma fila que la etiqueta, a la derecha: esa fila ya
          existe, así que no hace falta reservar una línea vacía debajo del campo
          y el formulario tampoco salta cuando aparece un error. */}
      <div className="flex min-h-5 items-center justify-between gap-x-4">
        <label htmlFor={id} className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 lg:text-[clamp(12px,1.5vh,16px)]">
          {label}
        </label>
        {error && (
          <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold leading-5 text-navy-900 lg:text-[clamp(14px,1.6vh,17px)]">
            <WarningCircleIcon size={15} weight="fill" className="shrink-0" />
            {error}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

export function Contacto() {
  const reduceMotion = useReducedMotion()
  const formId = useId()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string>()
  const [mountedAt] = useState(() => Date.now())

  const setField =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      setSubmitError(undefined)
    }

  const setName = (event: ChangeEvent<HTMLInputElement>) => {
    const filtered = event.target.value.replace(NAME_ALLOWED_CHARS, '')
    setValues((prev) => ({ ...prev, name: filtered }))
    setErrors((prev) => ({ ...prev, name: undefined }))
    setSubmitError(undefined)
  }

  const setPhone = (event: ChangeEvent<HTMLInputElement>) => {
    const filtered = event.target.value.replace(/[^0-9+\-\s()]/g, '')
    setValues((prev) => ({ ...prev, phone: filtered }))
    setErrors((prev) => ({ ...prev, phone: undefined }))
    setSubmitError(undefined)
  }

  const inputClasses = (hasError: boolean) =>
    `border-b bg-transparent pb-1 pt-2 text-base text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600 lg:pb-[clamp(0.25rem,0.7vh,0.625rem)] lg:pt-[clamp(0.5rem,1.3vh,1.125rem)] lg:text-[clamp(16px,2.25vh,23px)] ${
      hasError ? 'border-navy-900' : 'border-navy-200'
    }`

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (['name', 'email', 'phone', 'message'] as const).find((field) => nextErrors[field])
      if (firstInvalid) document.getElementById(`${formId}-${firstInvalid}`)?.focus()
      return
    }

    // Honeypot: los visitantes reales nunca ven este campo, así que si llega
    // con un valor es porque lo llenó un bot. Simulamos que se envió sin
    // mandar nada en realidad.
    const honeypot = new FormData(event.currentTarget).get('botcheck')
    const submittedTooFast = Date.now() - mountedAt < MIN_SUBMIT_MS
    if (honeypot || submittedTooFast) {
      setSent(true)
      return
    }

    setSubmitError(undefined)
    setSending(true)

    const name = values.name.trim()
    const email = values.email.trim()
    const phone = values.phone.trim()

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nuevo mensaje de contacto -- ${name}`,
          from_name: name,
          replyto: email,
          name,
          email,
          phone: phone || undefined,
          message: values.message.trim(),
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSent(true)
      } else {
        setSubmitError(GENERIC_SEND_ERROR)
      }
    } catch {
      setSubmitError(GENERIC_SEND_ERROR)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-white">
      {/* Espacio blanco de respiro arriba y abajo, fuera del ancla (#contacto está en
          el bloque del medio): al pulsar "Contáctanos" no se ve, solo al hacer scroll. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div id="contacto" className="grid divide-y divide-navy-100 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col px-6 py-16 sm:px-10 sm:py-20 lg:justify-center lg:px-16 lg:py-[clamp(1.5rem,5vh,6rem)] 2xl:px-24"
        >
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 lg:text-[clamp(14px,1.5vh,17px)]">
              Contacto
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(1rem,2.2vh,2rem)] lg:text-[clamp(2.25rem,6vh,4.5rem)]">
              Hablemos de tu próximo proyecto
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(1.25rem,2.8vh,2.5rem)] lg:max-w-[min(100%,clamp(28rem,66vh,40rem))] lg:text-[clamp(15.5px,2.25vh,24px)]">
              Escríbenos y te contactamos a la brevedad, o hazlo directo por correo.
            </p>

            <div className="mt-10 flex flex-col gap-1 lg:mt-[clamp(2.5rem,6vh,5.5rem)]">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 lg:text-[clamp(12px,1.4vh,15px)]">
                Correo
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-navy-900 transition-colors hover:text-cyan-700 lg:text-[clamp(1.125rem,2.4vh,1.75rem)]"
              >
                <EnvelopeSimpleIcon size={20} weight="regular" className="shrink-0 text-cyan-600" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          layout={!reduceMotion}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex px-6 py-16 sm:px-10 sm:py-20 lg:items-center lg:px-16 lg:py-[clamp(1.5rem,5vh,6rem)] 2xl:px-24"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                role="status"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="max-w-md"
              >
                <CheckCircleIcon size={40} weight="regular" className="text-cyan-600" />
                <h3 className="mt-5 text-xl font-bold text-navy-900 2xl:text-2xl">Mensaje recibido</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
                  Gracias por escribirnos. Te responderemos a la brevedad a tu correo.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="flex w-full max-w-md flex-col gap-5 lg:max-w-[min(100%,clamp(28rem,74vh,46rem))] lg:gap-[clamp(1.25rem,3.4vh,3rem)]"
              >
                {/* Honeypot: oculto para visitantes reales (fuera de pantalla,
                  no enfocable, oculto para tecnología de asistencia), pero
                  visible en el HTML crudo que lee un bot -- si vuelve lleno,
                  el envío es spam. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <FormField id={`${formId}-name`} label="Nombre completo" error={errors.name}>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={NAME_MAX}
                  value={values.name}
                  onChange={setName}
                  placeholder="Tu nombre completo"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                  className={inputClasses(Boolean(errors.name))}
                />
              </FormField>

              <FormField id={`${formId}-email`} label="Correo" error={errors.email}>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={EMAIL_MAX}
                  value={values.email}
                  onChange={setField('email')}
                  placeholder="tu@correo.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                  className={inputClasses(Boolean(errors.email))}
                />
              </FormField>

              <FormField id={`${formId}-phone`} label="Teléfono (opcional)" error={errors.phone}>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={PHONE_MAX}
                  value={values.phone}
                  onChange={setPhone}
                  placeholder="+51 999 999 999"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                  className={inputClasses(Boolean(errors.phone))}
                />
              </FormField>

              <FormField id={`${formId}-message`} label="Mensaje" error={errors.message}>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={2}
                  maxLength={MESSAGE_MAX}
                  value={values.message}
                  onChange={setField('message')}
                  placeholder="Cuéntanos sobre tu proyecto o consulta"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                  data-lenis-prevent
                  className={`scrollbar-thin resize-none overflow-y-auto ${inputClasses(Boolean(errors.message))}`}
                />
              </FormField>

              <div className="mt-2 flex flex-col gap-3">
                <Button
                  type="submit"
                  variant="solid"
                  disabled={sending}
                  icon={<ArrowRightIcon size={18} weight="regular" />}
                  className="self-start disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? 'Enviando...' : 'Enviar'}
                </Button>
                <p className="max-w-sm text-xs leading-relaxed text-slate-500 lg:max-w-[clamp(24rem,62vh,36rem)] lg:text-[clamp(12px,1.5vh,15px)]">
                  Al enviar este formulario, aceptas que usemos tus datos solo para responder tu consulta.
                </p>
                {submitError && (
                  <p className="flex items-center gap-1.5 text-sm text-navy-900 2xl:text-base" role="alert">
                    <WarningCircleIcon size={16} weight="fill" className="shrink-0" />
                    {submitError}
                  </p>
                )}
              </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
