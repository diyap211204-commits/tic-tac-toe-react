export default function Mark({ p, cls }) {
  const c = p === 'X' ? 'var(--x)' : 'var(--o)'
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      {p === 'X' ? (
        <path d="M20 20 L80 80 M80 20 L20 80" stroke={c} strokeWidth="20" strokeLinecap="round" fill="none" />
      ) : (
        <circle cx="50" cy="50" r="30" stroke={c} strokeWidth="18" fill="none" />
      )}
    </svg>
  )
}
