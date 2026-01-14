import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Upload, 
  Plus, 
  X, 
  IndianRupee,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Link, useLocation } from 'wouter';
import { toast } from 'sonner';

export default function AddMenuItem() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
    image: ''
  });

  const categories = [
    'Starters',
    'Main Course',
    'Desserts',
    'Beverages',
    'Breads',
    'Salads'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Menu item added successfully!');
    setIsSubmitting(false);
    setLocation('/restaurant/menu');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <Link href="/restaurant/menu">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add New Menu Item</h1>
            <p className="text-slate-500 text-sm">Create a new dish for your restaurant menu</p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Basic information about the dish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Item Name</label>
                  <Input 
                    required 
                    placeholder="e.g. Special Paneer Tikka"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <Textarea 
                    required 
                    placeholder="Describe the ingredients, taste, and serving size..."
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Price (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        required 
                        type="number" 
                        placeholder="299"
                        className="pl-10"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Category</label>
                    <Select 
                      required
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media & Availability</CardTitle>
                <CardDescription>Visuals and status of the item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Item Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max. 5MB)</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <label className="text-sm font-semibold text-slate-900">Available for Order</label>
                    <p className="text-xs text-slate-500">Switch off if the item is out of stock</p>
                  </div>
                  <Switch 
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) => setFormData({...formData, isAvailable: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-4 pt-4">
              <Link href="/restaurant/menu" className="flex-1">
                <Button variant="outline" className="w-full">Cancel</Button>
              </Link>
              <Button 
                type="submit" 
                className="flex-[2] bg-orange-600 hover:bg-orange-700 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                Save Menu Item
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
