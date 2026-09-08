export function SectionLabel({
  index,
  label,
}: {
  index: string
  label: string
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px w-8 bg-border" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
