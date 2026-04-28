'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface SelectOption {
  value: string
  label: React.ReactNode
  searchValue?: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

export function CustomSelect({ value, onChange, options, placeholder = 'Selecione...', className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="relative w-full text-sm" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full bg-background border rounded-lg px-3 py-2 transition-colors focus:outline-none text-left",
          isOpen ? "border-neon shadow-[0_0_10px_rgba(57,255,20,0.2)]" : "border-white/10 hover:border-white/30",
          !selectedOption ? "text-zinc-500" : "text-white",
          className
        )}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={16} className={cn("text-zinc-400 transition-transform duration-300", isOpen && "rotate-180 text-neon")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#09090b] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden crm-fade-in">
          <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2",
                  value === opt.value
                    ? "bg-neon/10 text-neon font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {opt.label}
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-3 py-4 text-center text-zinc-500 text-xs">
                Nenhuma opção
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
