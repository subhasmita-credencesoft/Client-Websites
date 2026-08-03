'use client';

interface NavDropdownProps {
  open: boolean;
  items: { label: string; href: string }[];
}

export default function NavDropdown({ open, items }: NavDropdownProps) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl transition-all duration-200 dark:border-neutral-800 dark:bg-earth-900 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      role="menu"
    >
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              role="menuitem"
              className="block whitespace-nowrap font-sans text-sm text-neutral-700 transition-colors duration-200 ease-out hover:text-brand-600 dark:text-neutral-200 dark:hover:text-brand-400"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
