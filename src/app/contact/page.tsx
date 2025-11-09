import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        content: "(323) 471-8770",
        href: "tel:13234718770",
    },
    {
        icon: Mail,
        title: "Email",
        content: "goodnessabengowe8@gmail.com",
        href: "mailto:goodnessabengowe8@gmail.com",
    },
    {
        icon: MapPin,
        title: "Address",
        content: "13130 Doty Ave apt 9 Hawthorn ca 90250",
    },
     {
        icon: Clock,
        title: "Hours",
        content: "Mon-Sat: 9AM - 7PM",
    }
];

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    We're here to help! Whether you have questions about our products, need styling advice, or want to book a consultation, please don't hesitate to reach out.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 items-start">
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                            {item.content}
                                        </a>
                                    ) : (
                                        <p className="text-muted-foreground">{item.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <div className="relative h-80 lg:h-full w-full rounded-lg overflow-hidden shadow-xl">
                    <Image
                        src="https://picsum.photos/seed/contact/800/1000"
                        alt="Customer service"
                        fill
                        className="object-cover"
                        data-ai-hint="customer service woman"
                    />
                </div>
            </div>
        </div>
    );
}
