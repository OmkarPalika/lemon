"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IdentityType {
  _id: string;
  code: string;
  name: string;
  description: string;
  isActive: number;
}

export default function IdentityTypesPage() {
  const [identityTypes, setIdentityTypes] = useState<IdentityType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ code: "", name: "", description: "" });

  useEffect(() => {
    fetchIdentityTypes();
  }, []);

  const fetchIdentityTypes = async () => {
    try {
      const res = await fetch("/api/identitytypes");
      const data = await res.json();
      setIdentityTypes(data);
    } catch (error) {
      console.error("Failed to fetch identity types", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/identitytypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ code: "", name: "", description: "" });
        fetchIdentityTypes();
      }
    } catch (error) {
      console.error("Failed to create identity type", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Identity Types</CardTitle>
            <CardDescription>Manage acceptable identification types.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Identity Type</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Identity Type</DialogTitle>
                <DialogDescription>Enter the details for the new identity type.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Input id="code" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Create Identity Type</Button>
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
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {identityTypes.map((type) => (
                <TableRow key={type._id}>
                  <TableCell>{type.code}</TableCell>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>{type.description}</TableCell>
                  <TableCell>{type.isActive === 1 ? "Active" : "Inactive"}</TableCell>
                </TableRow>
              ))}
              {identityTypes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No identity types found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
