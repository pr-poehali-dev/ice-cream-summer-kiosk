CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image_url TEXT,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, image_url, popular) VALUES
('Клубничный рожон', 'Нежное клубничное мороженое в хрустящем вафельном рожке', 150, 'https://cdn.poehali.dev/projects/47d6713c-82b0-4e8b-bf61-58c73c244bba/files/4b7ba8db-f3cf-45f7-8bb5-50b6edfcd18e.jpg', true),
('Шоколадный сундей', 'Три шарика шоколадного мороженого с топпингом и вишенкой', 250, 'https://cdn.poehali.dev/projects/47d6713c-82b0-4e8b-bf61-58c73c244bba/files/4175730e-5820-45d9-9013-0a00f0cde714.jpg', false),
('Фруктовый лёд', 'Освежающее эскимо из натуральных фруктов', 100, 'https://cdn.poehali.dev/projects/47d6713c-82b0-4e8b-bf61-58c73c244bba/files/d5e5a70d-1a94-4023-9781-554b06a1e6a2.jpg', true),
('Ванильный пломбир', 'Классическое сливочное мороженое с натуральной ванилью', 120, 'https://cdn.poehali.dev/projects/47d6713c-82b0-4e8b-bf61-58c73c244bba/files/4b7ba8db-f3cf-45f7-8bb5-50b6edfcd18e.jpg', false),
('Манго-маракуйя', 'Экзотическое сочетание тропических фруктов', 180, 'https://cdn.poehali.dev/projects/47d6713c-82b0-4e8b-bf61-58c73c244bba/files/d5e5a70d-1a94-4023-9781-554b06a1e6a2.jpg', true),
('Мятное облако', 'Освежающее мятное мороженое с шоколадной крошкой', 160, 'https://cdn.poehali.dev/projects/47d6713c-82b0-4e8b-bf61-58c73c244bba/files/4175730e-5820-45d9-9013-0a00f0cde714.jpg', false);
