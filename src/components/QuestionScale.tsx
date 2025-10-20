import React, { useEffect } from "react"

export type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio"

export const DEFAULT_SCALE = [
  { v: 1, t: "Nunca" },
  { v: 2, t: "Raramente" },
  { v: 3, t: "Às vezes" },
  { v: 4, t: "Frequente" },
  { v: 5, t: "Sempre" },
] as const

type QuestionScaleProps = {
  id: QuestionId
  label: string
  value?: number
  onChange: (id: QuestionId, value: number) => void
  scale?: ReadonlyArray<{ v: number; t: string }>
  autoFocusOption?: number
  className?: {
    fieldset?: string
    group?: string
    option?: string
    dot?: string
    text?: string
  }
}

/** Escala acessível 1..5, com foco inicial e validação obrigatória */
export const QuestionScale: React.FC<QuestionScaleProps> = ({
  id,
  label,
  value,
  onChange,
  scale = DEFAULT_SCALE,
  autoFocusOption = 3,
  className,
}) => {
  useEffect(() => {
    const el = document.querySelector<HTMLInputElement>(
      `input[name="${id}"][value="${autoFocusOption}"]`
    )
    el?.focus()
  }, [id, autoFocusOption])

  return (
    <fieldset className={className?.fieldset ?? "question progressive"}>
      <legend className="q-title">{label}</legend>
      <div className={className?.group ?? "scale-group"} role="radiogroup" aria-label={label}>
        {scale.map((s) => (
          <label key={s.v} className={className?.option ?? "scale-option scale-pill"}>
            <input
              type="radio"
              name={id}
              value={s.v}
              checked={value === s.v}
              onChange={(e) => onChange(id, Number(e.currentTarget.value))}
              required
            />
            <span className={className?.dot ?? "scale-dot"} aria-hidden />
            <span className={className?.text ?? "scale-text"}>{s.t}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
