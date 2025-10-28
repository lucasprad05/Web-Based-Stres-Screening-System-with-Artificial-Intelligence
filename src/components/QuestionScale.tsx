import React, { useEffect } from "react"

// Define os possíveis IDs de pergunta
export type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio"

// Escala padrão 1–5 com texto descritivo
export const DEFAULT_SCALE = [
  { v: 1, t: "Nunca" },
  { v: 2, t: "Raramente" },
  { v: 3, t: "Às vezes" },
  { v: 4, t: "Frequente" },
  { v: 5, t: "Sempre" },
] as const

// Tipos de props do componente
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

/** 
 * Componente de escala acessível 1..5 para perguntas.
 * - Suporta foco automático em uma opção
 * - Permite passar classes CSS customizadas
 * - Garante que a seleção seja obrigatória
 */
export const QuestionScale: React.FC<QuestionScaleProps> = ({
  id,
  label,
  value,
  onChange,
  scale = DEFAULT_SCALE,
  autoFocusOption = 3,
  className,
}) => {
  // Aplica foco automático na opção definida pelo autoFocusOption
  useEffect(() => {
    const el = document.querySelector<HTMLInputElement>(
      `input[name="${id}"][value="${autoFocusOption}"]`
    )
    el?.focus()
  }, [id, autoFocusOption])

  return (
    <fieldset className={className?.fieldset ?? "question progressive"}>
      <legend className="q-title">{label}</legend>

      <div
        className={className?.group ?? "scale-group"}
        role="radiogroup"
        aria-label={label}
      >
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
