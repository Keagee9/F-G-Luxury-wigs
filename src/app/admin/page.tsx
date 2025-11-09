'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { wigs as initialWigs } from '@/lib/data';
import type { Wig } from '@/lib/types';
import { PlusCircle, Edit, Trash2, DollarSign, Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function AdminPage() {
  const [wigs, setWigs] = useState<Wig[]>(initialWigs);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWig, setCurrentWig] = useState<Wig | null>(null);
  
  const [newWigImages, setNewWigImages] = useState<string[]>([]);
  const [editingImages, setEditingImages] = useState<string[]>([]);

  useEffect(() => {
    if (currentWig) {
      // For simplicity, we'll just use the first imageId if it exists
      // In a real app, you'd fetch the full image objects
      const imageUrl = currentWig.imageIds[0] ? `https://picsum.photos/seed/${currentWig.imageIds[0]}/600/600` : '';
      setEditingImages(imageUrl ? [imageUrl] : []);
    } else {
      setEditingImages([]);
    }
  }, [currentWig]);


  const handleEditClick = (wig: Wig) => {
    setCurrentWig({ ...wig });
    setIsEditing(true);
  };

  const handleUpdateWig = () => {
    if (!currentWig) return;
    setWigs(wigs.map((wig) => (wig.id === currentWig.id ? currentWig : wig)));
    setIsEditing(false);
    setCurrentWig(null);
  };
  
  const handleDeleteWig = (wigId: string) => {
    setWigs(wigs.filter((wig) => wig.id !== wigId));
  }

  const handleNewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setNewWigImages(prev => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveNewImage = (imageUrl: string) => {
    setNewWigImages(prev => prev.filter(url => url !== imageUrl));
    URL.revokeObjectURL(imageUrl);
  };

  const handleEditingImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && currentWig) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setEditingImages(prev => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveEditingImage = (imageUrl: string) => {
    setEditingImages(prev => prev.filter(url => url !== imageUrl));
    if (imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Add New Wig Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2" />
                Add New Wig
              </CardTitle>
              <CardDescription>
                Fill out the details to add a new product to your catalog.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Wig Name</Label>
                <Input id="name" placeholder="e.g., Classic Sleek Bob" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="299.99"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A timeless classic..."
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="images">Product Images</Label>
                 <div className="relative flex justify-center items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary transition-colors" onClick={() => document.getElementById('images-upload')?.click()}>
                    <Input id="images-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleNewImageUpload}/>
                    <div className="text-center text-muted-foreground">
                      <Upload className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm">Click or drag to upload</p>
                    </div>
                </div>
                 {newWigImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {newWigImages.map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image src={url} alt={`New wig image ${index + 1}`} fill className="object-cover rounded-md" />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => handleRemoveNewImage(url)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button className="w-full">
                <PlusCircle className="mr-2" /> Add Product
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Manage Wigs Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Manage Wigs</CardTitle>
              <CardDescription>
                View and update existing wigs in your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wigs.map((wig) => (
                      <TableRow key={wig.id}>
                        <TableCell className="font-medium">{wig.name}</TableCell>
                        <TableCell>${wig.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                           <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditClick(wig)}
                                >
                                  <Edit className="mr-2 h-3 w-3" /> Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteWig(wig.id)}
                                >
                                  <Trash2 className="mr-2 h-3 w-3" /> Delete
                                </Button>
                            </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Wig</DialogTitle>
            <DialogDescription>
              Make changes to the product details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentWig && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentWig.name}
                  onChange={(e) => setCurrentWig({ ...currentWig, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price
                </Label>
                <div className="relative col-span-3">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentWig.price}
                    onChange={(e) => setCurrentWig({ ...currentWig, price: Number(e.target.value) })}
                    className="pl-8"
                  />
                </div>
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Images
                </Label>
                <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-2">
                    {editingImages.map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image src={url} alt={`Editing image ${index + 1}`} fill className="object-cover rounded-md" />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => handleRemoveEditingImage(url)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                     <div 
                       className="relative flex justify-center items-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary transition-colors" 
                       onClick={() => document.getElementById('editing-images-upload')?.click()}
                      >
                        <Input id="editing-images-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleEditingImageUpload}/>
                        <div className="text-center text-muted-foreground p-2">
                          <Upload className="mx-auto h-6 w-6" />
                          <p className="mt-1 text-xs">Add more</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleUpdateWig}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
