import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
             <div className="flex space-x-4 mt-4">
              <SocialIcon href="https://www.facebook.com/goodnessoluchi.abengowe?mibextid=wwXIfr&mibextid=wwXIfr">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@fgluxuryhairs?_t=ZP-8xvqz1gkcwg&_r=1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" /><path d="M12 15.5V3" /><path d="m16 3 3 3" /><path d="M9 11.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" /></svg>
              </SocialIcon>
              <SocialIcon href="https://wa.me/13234718770">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="m16 2-3 3 3 3"></path><path d="m20 10-3 3 3 3"></path></svg>
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
          <p>&copy; {new Date().getFullYear()} F&G Luxury wigs. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             {/* Icons moved to under the brand info */}
          </div>
        </div>
      </div>
    </footer>
  );
}
