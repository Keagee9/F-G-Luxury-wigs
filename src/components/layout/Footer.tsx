import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

function SocialIcon({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Logo />
                <span className="font-bold font-headline text-lg">
                F&G Luxury wigs
                </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Elevating confidence with premium human hair wigs.
            </p>
             <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0"/>
                    <span>13130 Doty Ave apt 9 Hawthorn ca 90250</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0"/>
                    <a href="tel:13234718770" className="hover:text-primary">(323) 471-8770</a>
                </div>
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0"/>
                    <a href="mailto:goodnessabengowe8@gmail.com" className="hover:text-primary">goodnessabengowe8@gmail.com</a>
                </div>
             </div>
             <div className="flex space-x-4 mt-4">
              <SocialIcon href="https://www.facebook.com/goodnessoluchi.abengowe?mibextid=wwXIfr&mibextid=wwXIfr">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@fgluxuryhairs?_t=ZP-8xvqz1gkcwg&_r=1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2"><circle cx="8" cy="18" r="4"/><path d="M12 18V2l4 4"/></svg>
              </SocialIcon>
               <SocialIcon href="https://www.instagram.com/fgluxuryhair12/?igsh=MW1xZjFoamlrNjkzMw%3D%3D&utm_source=ig_contact_invite#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </SocialIcon>
              <SocialIcon href="https://wa.me/13234718770">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.93 15.61a10.06 10.06 0 0 0-3.23-2.13c-.4-.14-.87.05-1.1.4l-1.3 1.31a8.21 8.21 0 0 1-4.22-4.22l1.3-1.3c.4-.25.55-.73.42-1.14a10.06 10.06 0 0 0-2.12-3.23c-.4-.4-.98-.5-1.45-.17L5.2 6.3C4.2 6.78 4 8.13 4.8 9.5a16.5 16.5 0 0 0 7.7 7.7c1.37.8 2.7.6 3.2-.4l1.2-1.95c.33-.47.24-1.05-.17-1.44Z"/></svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Wigs</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/booking" className="text-muted-foreground hover:text-primary">Book a Consultation</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Style Guide</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Stay Connected</h3>
            <p className="text-muted-foreground text-sm mb-4">Get exclusive offers and style tips delivered to your inbox.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your Email" className="bg-background"/>
              <Button type="submit" className="bg-primary text-primary-foreground">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} F&G Luxury wigs. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             {/* Icons moved to under the brand info */}
          </div>
        </div>
      </div>
    </footer>
  );
}
