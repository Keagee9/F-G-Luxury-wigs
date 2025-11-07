// Note: This is a UI-only implementation. The GenAI flow is not fully wired up.
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Upload } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import { wigs } from '@/lib/data';

export default function RecommendationsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<typeof wigs>([]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setRecommendations([]);
        // Simulate AI generation
        await new Promise(resolve => setTimeout(resolve, 3000));
        setRecommendations(wigs.slice(0, 3)); // Placeholder for AI result
        setIsLoading(false);
    };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Your Personal Stylist</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let our AI help you discover the perfect wig. Tell us your preferences, and we'll provide recommendations tailored just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-24">
            <form onSubmit={handleGenerate}>
              <CardHeader>
                <CardTitle>Find Your Match</CardTitle>
                <CardDescription>Fill out your preferences below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="photo-upload">Upload a Photo (Optional)</Label>
                    <Input id="photo-upload" type="file" accept="image/*"/>
                    <p className="text-xs text-muted-foreground">For better face shape and skin tone analysis.</p>
                </div>
                <div className="space-y-2">
                  <Label>Face Shape</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your face shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oval">Oval</SelectItem>
                      <SelectItem value="round">Round</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="heart">Heart</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Length</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (Pixie, Bob)</SelectItem>
                      <SelectItem value="medium">Medium (Shoulder-length)</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="style-keywords">Style Keywords</Label>
                  <Input id="style-keywords" placeholder="e.g., 'professional', 'glamorous', 'natural'" />
                </div>
              </CardContent>
              <CardFooter>
                 <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-headline font-bold mb-6">Our Top Picks For You</h2>
            {isLoading && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i} className="h-full overflow-hidden">
                            <CardContent className="p-0">
                                <div className="animate-pulse bg-secondary aspect-square w-full"></div>
                                <div className="p-4 space-y-2">
                                    <div className="animate-pulse bg-secondary h-6 w-3/4 rounded-md"></div>
                                    <div className="flex justify-between items-center">
                                         <div className="animate-pulse bg-secondary h-8 w-1/4 rounded-md"></div>
                                         <div className="animate-pulse bg-secondary h-6 w-1/4 rounded-md"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            )}
            {!isLoading && recommendations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {recommendations.map(wig => (
                        <ProductCard key={wig.id} wig={wig} />
                    ))}
                </div>
            )}
            {!isLoading && recommendations.length === 0 && (
                <div className="border-2 border-dashed rounded-lg p-12 text-center h-[50vh] flex flex-col justify-center items-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold font-headline">Your personalized recommendations will appear here.</h3>
                    <p className="text-muted-foreground mt-2">Fill out the form to get started!</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
