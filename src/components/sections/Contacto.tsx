import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, CheckCircleIcon, EnvelopeSimpleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { CONTACT_EMAIL } from '@/lib/contact'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
// A real visitor reads the form and types into it; anything submitted
// faster than this is almost certainly a script filling every field at once.
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
    errors.name = 'Ingresa tu nombre.'
  } else if (values.name.length > NAME_MAX) {
    errors.name = `Máximo ${NAME_MAX} caracteres.`
  }

  if (!values.email.trim()) {
    errors.email = 'Ingresa tu correo.'
  } else if (values.email.length > EMAIL_MAX) {
    errors.email = `Máximo ${EMAIL_MAX} caracteres.`
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Ingresa un correo válido.'
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Ingresa un teléfono válido (solo números, espacios, +, - y paréntesis).'
  }

  if (!values.message.trim()) {
    errors.message = 'Cuéntanos en qué podemos ayudarte.'
  } else if (values.message.length > MESSAGE_MAX) {
    errors.message = `Máximo ${MESSAGE_MAX} caracteres.`
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
      <label htmlFor={id} className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-sm text-navy-900" role="alert">
          <WarningCircleIcon size={16} weight="fill" className="shrink-0" />
          {error}
        </p>
      )}
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
    `border-b bg-transparent py-2 text-base text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600 ${
      hasError ? 'border-navy-900' : 'border-navy-200'
    }`

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Honeypot: real visitors never see this field, so a filled-in value
    // means a bot submitted the form. Pretend success without sending.
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
    <section id="contacto" className="bg-white">
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-navy-100">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 2xl:px-24 2xl:py-32"
        >
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-base">
              Contacto
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl 2xl:text-5xl">
              Hablemos de tu próximo proyecto
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
              Escríbenos y te contactamos a la brevedad, o hazlo directo por correo.
            </p>

            <div className="mt-10 flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
                Correo
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-navy-900 transition-colors hover:text-cyan-700 2xl:text-xl"
              >
                <EnvelopeSimpleIcon size={20} weight="regular" className="shrink-0 text-cyan-600" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 2xl:px-24 2xl:py-32"
        >
          {sent ? (
            <div role="status" className="max-w-md">
              <CheckCircleIcon size={40} weight="regular" className="text-cyan-600" />
              <h3 className="mt-5 text-xl font-bold text-navy-900 2xl:text-2xl">Mensaje recibido</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
                Gracias por escribirnos. Te responderemos a la brevedad a tu correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-md flex-col gap-7">
              {/* Honeypot: hidden from real visitors (off-screen, unfocusable,
                  hidden from assistive tech), but visible in the raw HTML a
                  bot reads -- if it comes back filled, the submission is spam. */}
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
                  className={inputClasses(Boolean(errors.phone))}
                />
              </FormField>

              <FormField id={`${formId}-message`} label="Mensaje" error={errors.message}>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  maxLength={MESSAGE_MAX}
                  value={values.message}
                  onChange={setField('message')}
                  placeholder="Cuéntanos sobre tu proyecto o consulta"
                  className={`resize-none ${inputClasses(Boolean(errors.message))}`}
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
                <p className="max-w-sm text-xs leading-relaxed text-slate-500">
                  Al enviar este formulario, aceptas que usemos tus datos solo para responder tu consulta.
                </p>
                {submitError && (
                  <p className="flex items-center gap-1.5 text-sm text-navy-900" role="alert">
                    <WarningCircleIcon size={16} weight="fill" className="shrink-0" />
                    {submitError}
                  </p>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
