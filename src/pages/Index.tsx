import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/4f749033-06de-4e79-9f49-aab1f375c4ad';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  popular: boolean;
}

const reviews = [
  {
    id: 1,
    name: 'Алина К.',
    text: 'Лучшее мороженое на пляже! Особенно люблю фруктовый лёд в жаркий день',
    rating: 5
  },
  {
    id: 2,
    name: 'Дмитрий П.',
    text: 'Удобная доставка прямо на пляж. Цены адекватные, качество отличное',
    rating: 5
  },
  {
    id: 3,
    name: 'Мария С.',
    text: 'Дети в восторге от разнообразия вкусов! Приходим сюда каждый день',
    rating: 5
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('catalog');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-background to-secondary">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-4xl">🍦</span>
              <span className="text-2xl font-bold text-primary">Пляжное мороженое</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['catalog', 'about', 'delivery', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О нас'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Phone" size={18} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Самое вкусное мороженое на пляже! 🏖️
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Охлаждаемся с 2020 года. Натуральные ингредиенты, яркие вкусы и доставка прямо к вашему лежаку
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('catalog')}>
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('delivery')}>
                <Icon name="Truck" size={20} className="mr-2" />
                Доставка
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Наш каталог 🍨</h2>
            <p className="text-lg text-foreground/70">Каждый день свежее мороженое от лучших производителей</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-foreground/70">Загрузка каталога...</p>
              </div>
            ) : products.map((product, index) => (
              <Card 
                key={product.id} 
                className="hover-lift overflow-hidden border-2 border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.popular && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      <Icon name="Star" size={14} className="mr-1" />
                      Хит продаж
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-foreground/70 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">{product.price} ₽</span>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">О нас 👋</h2>
            <p className="text-lg text-foreground/70 mb-6">
              Мы работаем на пляже с 2020 года и знаем толк в настоящем летнем удовольствии. 
              Наш ларёк расположен в самом сердце пляжной зоны, где каждый день мы радуем гостей 
              свежим мороженым от проверенных производителей.
            </p>
            <p className="text-lg text-foreground/70">
              Мы отбираем только лучшие вкусы, следим за качеством и с любовью подходим к каждому заказу. 
              Наша миссия — сделать ваш пляжный отдых ещё вкуснее! 🌊
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Доставка и самовывоз 🚗</h2>
            <p className="text-lg text-foreground/70">Два удобных способа получить ваше мороженое</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover-lift border-2 border-border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Icon name="Store" size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Самовывоз из ларька</h3>
                  <p className="text-foreground/70 mb-4">
                    Приходите к нам на пляж! Наш ларёк работает с 10:00 до 21:00 каждый день
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Icon name="MapPin" size={18} />
                    <span>Центральный пляж, ларёк №7</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-lift border-2 border-border">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/30 p-4 rounded-full">
                  <Icon name="Bike" size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Доставка на пляж</h3>
                  <p className="text-foreground/70 mb-4">
                    Доставим прямо к вашему лежаку за 15-20 минут. Минимальный заказ — 300 ₽
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Icon name="Clock" size={18} />
                    <span>15-20 минут</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы 💬</h2>
            <p className="text-lg text-foreground/70">Что говорят наши гости</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 hover-lift border-2 border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">"{review.text}"</p>
                <p className="font-semibold text-primary">— {review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Контакты 📞</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Phone" size={24} className="text-primary" />
                <span className="text-2xl font-semibold">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="MapPin" size={24} className="text-primary" />
                <span className="text-lg">Центральный пляж, ларёк №7</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Clock" size={24} className="text-primary" />
                <span className="text-lg">Ежедневно с 10:00 до 21:00</span>
              </div>
              <Button size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Написать в WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground/5 py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p className="text-sm">© 2024 Пляжное мороженое. Самое вкусное лето! 🍦</p>
        </div>
      </footer>
    </div>
  );
}