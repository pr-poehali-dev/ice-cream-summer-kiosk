import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/4f749033-06de-4e79-9f49-aab1f375c4ad';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  popular: boolean;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    popular: false
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить товары',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseInt(formData.price)
    };

    try {
      if (editingId) {
        await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...productData, id: editingId })
        });
        toast({
          title: 'Успешно',
          description: 'Товар обновлён'
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        toast({
          title: 'Успешно',
          description: 'Товар добавлен'
        });
      }
      
      setFormData({ name: '', description: '', price: '', image_url: '', popular: false });
      setEditingId(null);
      loadProducts();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить товар',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      popular: product.popular
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот товар?')) return;
    
    try {
      await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
      });
      toast({
        title: 'Успешно',
        description: 'Товар удалён'
      });
      loadProducts();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить товар',
        variant: 'destructive'
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', image_url: '', popular: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-background to-secondary py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-primary hover:underline mb-4">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться на сайт
          </a>
          <h1 className="text-4xl font-bold mb-2">Админ-панель 🍦</h1>
          <p className="text-foreground/70">Управление каталогом мороженого</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{editingId ? 'Редактировать товар' : 'Добавить товар'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Клубничный рожон"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Нежное клубничное мороженое..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Цена (₽) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="150"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image_url">URL изображения</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                  />
                  <Label htmlFor="popular">Хит продаж</Label>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground">
                    {editingId ? 'Обновить' : 'Добавить'}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Текущие товары ({products.length})</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {products.map((product) => (
                <Card key={product.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-sm text-foreground/70 line-clamp-2">{product.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-primary font-bold">{product.price} ₽</span>
                              {product.popular && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  Хит продаж
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                            >
                              <Icon name="Pencil" size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
