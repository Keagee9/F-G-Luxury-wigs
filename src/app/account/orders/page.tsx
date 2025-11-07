import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const orders = [
  { id: 'ORD-001', date: '2023-10-20', status: 'Delivered', total: 379.99 },
  { id: 'ORD-002', date: '2023-09-05', status: 'Delivered', total: 299.99 },
  { id: 'ORD-003', date: '2023-08-12', status: 'Delivered', total: 349.99 },
];

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/account"><ArrowLeft/></Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">My Orders</h1>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="bg-green-100 text-green-800">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                 <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
