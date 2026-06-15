"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CodesMaster {
  _id: string;
  ccType: string;
  ccCode: string;
  ccName: string;
  ccCodeCatg: string;
}

export default function CodesMasterPage() {
  const [codes, setCodes] = useState<CodesMaster[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ccType: "", ccCode: "", ccName: "", ccCodeCatg: "" });

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const res = await fetch("/api/codesmaster");
      const data = await res.json();
      setCodes(data);
    } catch (error) {
      console.error("Failed to fetch codes master", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/codesmaster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ ccType: "", ccCode: "", ccName: "", ccCodeCatg: "" });
        fetchCodes();
      }
    } catch (error) {
      console.error("Failed to create code master", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Codes Master</CardTitle>
            <CardDescription>Manage core master codes and classifications.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Code</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Code</DialogTitle>
                <DialogDescription>Enter the details for the new master code.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ccType">Type</Label>
                  <Input id="ccType" required value={formData.ccType} onChange={(e) => setFormData({ ...formData, ccType: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ccCode">Code</Label>
                  <Input id="ccCode" required value={formData.ccCode} onChange={(e) => setFormData({ ...formData, ccCode: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ccName">Name</Label>
                  <Input id="ccName" required value={formData.ccName} onChange={(e) => setFormData({ ...formData, ccName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ccCodeCatg">Category</Label>
                  <Input id="ccCodeCatg" value={formData.ccCodeCatg} onChange={(e) => setFormData({ ...formData, ccCodeCatg: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Create Code</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((code) => (
                <TableRow key={code._id}>
                  <TableCell>{code.ccType}</TableCell>
                  <TableCell>{code.ccCode}</TableCell>
                  <TableCell>{code.ccName}</TableCell>
                  <TableCell>{code.ccCodeCatg}</TableCell>
                </TableRow>
              ))}
              {codes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No codes found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
