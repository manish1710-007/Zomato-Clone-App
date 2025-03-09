import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", stock: "" });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
    setNewProduct({ name: "", price: "", category: "", stock: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="p-4">
        <h2 className="text-xl mb-2">Add New Product</h2>
        <form onSubmit={handleProductSubmit} className="space-y-2">
          <Input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          <Input placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
          <Button type="submit">Add Product</Button>
        </form>
      </Card>
    </div>
  );
};

export default Product;
