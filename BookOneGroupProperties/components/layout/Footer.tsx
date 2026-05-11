import { MapPin, Mail, Phone } from "lucide-react";
import { footerData } from "@/data/footer";
import { siteContact } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-20 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-3xl font-bold mb-6 font-serif italic">{footerData.brand.title}</h3>
            <p className="text-primary-foreground/80 leading-relaxed text-sm max-w-sm">
              {footerData.brand.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest border-b border-primary-foreground/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-primary-foreground/80 text-sm font-medium">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}><a href={link.href} className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> {link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest border-b border-primary-foreground/20 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-primary-foreground/80 text-sm">
              <li className="flex items-center gap-3 break-all sm:break-normal">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${footerData.contact.email}`} className="hover:text-white transition-colors">{footerData.contact.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <a href={siteContact.phoneHref} className="hover:text-white transition-colors">{footerData.contact.phone}</a>
              </li>
              <li className="mt-6">
                <p className="font-bold uppercase tracking-wide text-xs mb-2 text-white/60">Follow Us</p>
                <div className="flex gap-4">
                  {footerData.contact.socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.label} href={link.href} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" aria-label={link.label}>
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest border-b border-primary-foreground/20 pb-2 inline-block">Reach Us</h4>
            <ul className="space-y-6 text-primary-foreground/80 text-sm">
              {footerData.locations.map((location) => (
                <li key={location} className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <p className="text-xs text-primary-foreground/50 uppercase tracking-wider">
            Designed and Developed by <a href="https://www.credencesoft.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">CredenceSoft</a> and Powered By <a href="https://bookonepms.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">BookOne</a>
          </p>
          <div className="bg-[#2D3A45] px-4 py-2 rounded text-white flex items-center gap-2 text-xs font-bold cursor-pointer hover:bg-black transition-colors">
            {footerData.legal.locale}
          </div>
        </div>
      </div>
    </footer>
  );
}
