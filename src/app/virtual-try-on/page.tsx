// Note: This is a UI-only implementation. The GenAI flow is not fully wired up.
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, Loader2 } from 'lucide-react';

export default function VirtualTryOnPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [stylePreference, setStylePreference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResultImage(null);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !stylePreference) {
      alert("Please upload a photo and enter a style preference.");
      return;
    }
    setIsLoading(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResultImage('https://picsum.photos/seed/tryon/800/800'); // Placeholder for AI result
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Virtual Try-On</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload a clear, front-facing photo of yourself to see how our luxurious wigs look on you. Discover your perfect style in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-start">
        <Card className="shadow-lg">
          <form onSubmit={handleGenerate}>
            <CardHeader>
              <CardTitle>Create Your Look</CardTitle>
              <CardDescription>Upload a photo and describe your desired style.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="photo-upload">1. Upload Your Photo</Label>
                <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                     onClick={() => document.getElementById('photo-upload')?.click()}>
                  <Input id="photo-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Photo preview" fill className="object-contain rounded-lg p-2" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Upload className="mx-auto h-12 w-12" />
                      <p className="mt-2">Click to upload or drag and drop</p>
                      <p className="text-xs">PNG, JPG, or WEBP</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="style-preference">2. Describe Your Desired Style</Label>
                <Input 
                  id="style-preference" 
                  placeholder="e.g., 'long wavy blonde', 'chic short bob', 'bohemian'"
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading || !photo || !stylePreference}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate My Try-On
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="shadow-lg min-h-[400px]">
          <CardHeader>
            <CardTitle>Your New Look</CardTitle>
            <CardDescription>The generated image with your virtual try-on will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-full">
            <div className="relative w-full aspect-square max-w-md rounded-lg bg-secondary flex items-center justify-center">
              {isLoading && (
                  <div className="text-center text-muted-foreground">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary"/>
                      <p className="mt-4 font-medium">Our AI is working its magic...</p>
                  </div>
              )}
              {!isLoading && resultImage && (
                <Image src={resultImage} alt="Virtual try-on result" fill className="object-cover rounded-lg" data-ai-hint="woman virtual"/>
              )}
               {!isLoading && !resultImage && (
                  <div className="text-center text-muted-foreground p-8">
                      <Sparkles className="mx-auto h-12 w-12"/>
                      <p className="mt-4 font-medium">Your stunning transformation awaits.</p>
                  </div>
              )}
            </div>
          </CardContent>
          {resultImage && !isLoading && (
            <CardFooter>
                 <Button className="w-full" variant="outline">Shop Recommended Wigs</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
