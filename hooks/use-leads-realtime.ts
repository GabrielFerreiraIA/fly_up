'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Lead } from '@/lib/types'

export function useLeadsRealtime(
  onInsert: (lead: Lead) => void,
  onUpdate?: (lead: Lead) => void
) {
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('leads-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
          onInsert(payload.new as Lead)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'leads' },
        (payload) => {
          onUpdate?.(payload.new as Lead)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [onInsert, onUpdate])
}
