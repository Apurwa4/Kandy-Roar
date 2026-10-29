export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="pointer-events-none mx-auto flex max-w-6xl items-center gap-4 px-8 py-2 sm:gap-6 sm:px-12">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" className="shrink-0 text-[#d4af37]/70">
        <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 4C32 10 32 18 40 25C48 18 48 10 40 4Z" />
          <path d="M40 25C29 25 23 17 25 10C34 11 39 17 40 25ZM40 25C51 25 57 17 55 10C46 11 41 17 40 25Z" />
          <path d="M33 24C24 27 16 23 16 18C16 14 22 14 22 18M47 24C56 27 64 23 64 18C64 14 58 14 58 18M8 25H28M52 25H72M34 29H46" />
        </g>
        <circle cx="4" cy="25" r="1.5" fill="currentColor" /><circle cx="76" cy="25" r="1.5" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
    </div>
  );
}
