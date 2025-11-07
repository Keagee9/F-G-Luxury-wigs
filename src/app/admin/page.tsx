'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { PlusCircle, Edit, DollarSign, Upload } from 'lucide-react';

export default function AdminPage() {
  const [wigs, setWigs] = useState<Wig[]>(initialWigs);
  const [editingWig, setEditingWig] = useState<Wig | null>(null);

  const handleUpdatePrice = (wigId: string, newPrice: number) => {
    setWigs(
      wigs.map((wig) =>
        wig.id === wigId ? { ...wig, price: newPrice } : wig
      )
    );
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
                 <div className="relative flex justify-center items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                    <Input id="images" type="file" className="sr-only" multiple accept="image/*"/>
                    <div className="text-center text-muted-foreground">
                      <Upload className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm">Click or drag to upload</p>
                    </div>
                </div>
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
                        <TableCell>
                          {editingWig?.id === wig.id ? (
                            <div className="relative">
                               <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    value={editingWig.price}
                                    className="pl-8 h-8"
                                    onChange={(e) =>
                                    setEditingWig({
                                        ...editingWig,
                                        price: Number(e.target.value),
                                    })
                                    }
                                />
                            </div>
                          ) : (
                            `$${wig.price.toFixed(2)}`
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingWig?.id === wig.id ? (
                            <div className="flex gap-2 justify-end">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        handleUpdatePrice(wig.id, editingWig.price);
                                        setEditingWig(null);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingWig(null)}
                                >
                                    Cancel
                                </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingWig(wig)}
                            >
                              <Edit className="mr-2 h-3 w-3" /> Edit Price
                            </Button>
                          )}
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
    </div>
  );
}