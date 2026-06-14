"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  _id: string;
  productCode: string;
  productName: string;
  finalRiskScore: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ productCode: "", productName: "", finalRiskScore: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ productCode: "", productName: "", finalRiskScore: "" });
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage products and their risk scores.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription>Enter the details for the new product.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productCode">Product Code</Label>
                  <Input id="productCode" required value={formData.productCode} onChange={(e) => setFormData({ ...formData, productCode: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" required value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalRiskScore">Final Risk Score</Label>
                  <Input id="finalRiskScore" value={formData.finalRiskScore} onChange={(e) => setFormData({ ...formData, finalRiskScore: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Create Product</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Final Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.productCode}</TableCell>
                  <TableCell>{p.productName}</TableCell>
                  <TableCell>{p.finalRiskScore}</TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No products found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
