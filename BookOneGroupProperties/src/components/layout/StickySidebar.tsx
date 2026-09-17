import { Phone, MessageCircle, Mail } from "lucide-react";
import { stickySidebarData } from "@/data/navigation";

const iconMap = {
  mail: Mail,
  message: MessageCircle,
  phone: Phone,
} as const;

export function StickySidebar() {
  return (
    <div className="fixed left-0 top-1/3 z-50 flex flex-col gap-1 hidden md:flex">
      {stickySidebarData.map((item) => {
        const Icon = iconMap[item.type];

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.type === "message" ? "_blank" : undefined}
            rel={item.type === "message" ? "noreferrer" : undefined}
            className={`${item.colorClass} text-white p-3 transition-all rounded-r-md group flex items-center gap-2 w-10 hover:w-32 overflow-hidden whitespace-nowrap`}
          >
            <div className="min-w-[1.25rem]"><Icon className="w-5 h-5" /></div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}
