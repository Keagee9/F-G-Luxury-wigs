import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
      {children}
    </Link>
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
                Luxe Locks Boutique
                </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Elevating confidence with premium human hair wigs.
            </p>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Wigs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/booking" className="text-muted-foreground hover:text-primary">Book a Consultation</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Style Guide</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
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
          <p>&copy; {new Date().getFullYear()} Luxe Locks Boutique. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <SocialIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </SocialIcon>
            <SocialIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </SocialIcon>
            <SocialIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-2.7-1.7-5.5-2.5-8.3-2.6.7-3.6-1-6.6-4.2-7.8-2.5-1-5.1.3-6.8 2.8.1-.1.3-.2.4-.3 1.1-1 2.5-1.5 4-1.3s2.8 1.1 3.5 2.5c.2.4.3.8.4 1.2.2 1.5.1 3-1.2 4.1-1.3 1.1-3 1.5-4.5 1.1-.3-.1-.6-.2-.8-.3C1.2 14 1 15.1 1 16.3c0 2.5 1 4.8 2.5 6.5C4.9 24.3 6.7 25 8.5 25c4.7 0 8.5-3.8 8.5-8.5 0-.6 0-1.2-.1-1.8 1.5-.9 2.9-2.1 4.1-3.6.3-.4.6-.8.8-1.2.2-1 .1-2.1-.5-3-.4-.7-1-1.3-1.7-1.8zm-5.7 6.1c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
