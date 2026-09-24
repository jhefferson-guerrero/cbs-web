import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, CheckCircleIcon, EnvelopeSimpleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'

const CONTACT_EMAIL = 'contacto@cbsperu.com'

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const initialValues: FormValues = { name: '', email: '', phone: '', message: '' }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Ingresa tu nombre.'
  if (!values.email.trim()) {
    errors.email = 'Ingresa tu correo.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Ingresa un correo válido.'
  }
  if (!values.message.trim()) errors.message = 'Contanos en qué podemos ayudarte.'
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

  const setField =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const inputClasses = (hasError: boolean) =>
    `border-b bg-transparent py-2 text-base text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600 ${
      hasError ? 'border-navy-900' : 'border-navy-200'
    }`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Destino del formulario pendiente de definir (mailto, servicio de
    // formularios o funcion serverless). Por ahora solo valida y muestra la
    // confirmacion; no envia datos a ningun lado todavia.
    setSent(true)
  }

  return (
    <section id="contacto" className="border-t border-navy-100 bg-white">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center bg-navy-950 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24 2xl:px-24 2xl:py-32"
        >
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-base">
              Contacto
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl 2xl:text-5xl">
              Hablemos de tu próximo proyecto
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-navy-200 2xl:text-lg">
              Escribinos y te contactamos a la brevedad, o hacelo directo por correo.
            </p>

            <div className="mt-10 flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
                Correo
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-cyan-300 2xl:text-xl"
              >
                <EnvelopeSimpleIcon size={20} weight="regular" className="shrink-0 text-cyan-400" />
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
          className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 2xl:px-24 2xl:py-32"
        >
          {sent ? (
            <div className="max-w-md">
              <CheckCircleIcon size={40} weight="regular" className="text-cyan-600" />
              <h3 className="mt-5 text-xl font-bold text-navy-900 2xl:text-2xl">Mensaje recibido</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
                Gracias por escribirnos. Te responderemos a la brevedad a tu correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-md flex-col gap-7">
              <FormField id={`${formId}-name`} label="Nombre completo" error={errors.name}>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={setField('name')}
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
                  value={values.email}
                  onChange={setField('email')}
                  placeholder="tu@correo.com"
                  className={inputClasses(Boolean(errors.email))}
                />
              </FormField>

              <FormField id={`${formId}-phone`} label="Teléfono (opcional)">
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={setField('phone')}
                  placeholder="+51 999 999 999"
                  className={inputClasses(false)}
                />
              </FormField>

              <FormField id={`${formId}-message`} label="Mensaje" error={errors.message}>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={setField('message')}
                  placeholder="Contanos sobre tu proyecto o consulta"
                  className={`resize-none ${inputClasses(Boolean(errors.message))}`}
                />
              </FormField>

              <Button type="submit" variant="solid" icon={<ArrowRightIcon size={18} weight="regular" />} className="mt-2 self-start">
                Enviar
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
