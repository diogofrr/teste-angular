import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

/**
 * Adiciona 50 produtos de exemplo ao sistema
 */
export function addSampleProducts(productService: ProductService): void {
  const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Notebook Dell Inspiron 15',
      description:
        'Notebook Dell Inspiron 15 com processador Intel Core i5, 8GB RAM, SSD 256GB, tela 15.6" Full HD, Windows 11 Home',
      price: 2499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smartphone Samsung Galaxy S23',
      description:
        'Smartphone Samsung Galaxy S23 com tela AMOLED de 6.1", 8GB RAM, 128GB de armazenamento, câmera de 50MP, Android 13',
      price: 3299.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Tablet Apple iPad Air',
      description:
        'Tablet Apple iPad Air com chip M1, tela Liquid Retina de 10.9", 64GB de armazenamento, suporte para Apple Pencil',
      price: 4499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Fone de Ouvido Sony WH-1000XM4',
      description:
        'Fone de ouvido over-ear Sony WH-1000XM4 com cancelamento de ruído ativo, Bluetooth 5.0, bateria de 30 horas',
      price: 1299.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Logitech MX Master 3',
      description:
        'Mouse sem fio Logitech MX Master 3 com sensor óptico de alta precisão, 7 botões programáveis, bateria recarregável',
      price: 399.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Teclado Mecânico Corsair K70',
      description:
        'Teclado mecânico Corsair K70 com switches Cherry MX Red, iluminação RGB, descanso para pulsos, cabo USB-C',
      price: 899.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Monitor LG UltraWide 34"',
      description:
        'Monitor LG UltraWide de 34" com resolução 3440x1440, HDR10, FreeSync, porta USB-C, altura ajustável',
      price: 2499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Câmera Canon EOS R6',
      description:
        'Câmera mirrorless Canon EOS R6 com sensor Full Frame de 20.1MP, estabilização de imagem, gravação 4K, Wi-Fi',
      price: 8999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smart TV Samsung 55" QLED',
      description:
        'Smart TV Samsung 55" QLED com resolução 4K UHD, HDR10+, Tizen OS, Wi-Fi, Bluetooth, 3x HDMI, 2x USB',
      price: 3499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Notebook HP Pavilion 15',
      description:
        'Notebook HP Pavilion 15 com processador AMD Ryzen 5, 8GB RAM, SSD 256GB, tela 15.6" Full HD, Windows 11 Home',
      price: 2199.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smartphone iPhone 14',
      description:
        'Smartphone Apple iPhone 14 com tela Super Retina XDR de 6.1", chip A15 Bionic, 128GB de armazenamento, iOS 16',
      price: 4999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Tablet Samsung Galaxy Tab S8',
      description:
        'Tablet Samsung Galaxy Tab S8 com tela Super AMOLED de 11", 8GB RAM, 128GB de armazenamento, S Pen incluído, Android 12',
      price: 3499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Fone de Ouvido Apple AirPods Pro',
      description:
        'Fone de ouvido Apple AirPods Pro com cancelamento de ruído ativo, modo transparency, spatial audio, bateria de 6 horas',
      price: 1799.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Microsoft Surface Precision',
      description:
        'Mouse Microsoft Surface Precision com sensor óptico de alta precisão, 5 botões programáveis, Bluetooth, bateria recarregável',
      price: 499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Teclado Logitech MX Keys',
      description:
        'Teclado sem fio Logitech MX Keys com teclas baixas, iluminação de fundo, compatibilidade multi-dispositivo, bateria recarregável',
      price: 699.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Monitor ASUS ROG Swift PG279Q',
      description:
        'Monitor ASUS ROG Swift PG279Q com tela IPS de 27", resolução 2560x1440, G-SYNC, 165Hz, HDR10, altura ajustável',
      price: 2999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Câmera Sony Alpha A7 III',
      description:
        'Câmera mirrorless Sony Alpha A7 III com sensor Full Frame de 24.2MP, estabilização de imagem, gravação 4K, Wi-Fi',
      price: 7999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smart TV LG OLED 55"',
      description:
        'Smart TV LG OLED de 55" com resolução 4K UHD, HDR10 Pro, webOS, Magic Remote, Wi-Fi, Bluetooth, 4x HDMI, 3x USB',
      price: 3999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Notebook ASUS ROG Strix G15',
      description:
        'Notebook ASUS ROG Strix G15 com processador AMD Ryzen 9, 16GB RAM, SSD 512GB, tela 15.6" Full HD 144Hz, Windows 11 Home',
      price: 4999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smartphone Xiaomi Mi 13',
      description:
        'Smartphone Xiaomi Mi 13 com tela AMOLED de 6.36", 8GB RAM, 128GB de armazenamento, câmera de 50MP, MIUI 14',
      price: 2499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Tablet Microsoft Surface Pro 9',
      description:
        'Tablet Microsoft Surface Pro 9 com tela PixelSense de 13", chip Intel Core i5, 8GB RAM, 128GB de armazenamento, Windows 11 Home',
      price: 5999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Fone de Ouvido Bose QuietComfort 45',
      description:
        'Fone de ouvido Bose QuietComfort 45 com cancelamento de ruído ativo, Bluetooth 5.0, bateria de 24 horas, microfone com cancelamento de ruído',
      price: 1499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Razer DeathAdder V3',
      description:
        'Mouse sem fio Razer DeathAdder V3 com sensor óptico de 30K DPI, 8 botões programáveis, iluminação RGB, bateria recarregável',
      price: 599.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Teclado Razer BlackWidow V3',
      description:
        'Teclado mecânico Razer BlackWidow V3 com switches Razer Green, iluminação RGB, teclas macro, cabo USB-C',
      price: 799.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Monitor Dell UltraSharp U2720Q',
      description:
        'Monitor Dell UltraSharp U2720Q com tela IPS de 27", resolução 3840x2160, USB-C, altura ajustável, HDR400',
      price: 3499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Câmera Nikon Z6 II',
      description:
        'Câmera mirrorless Nikon Z6 II com sensor Full Frame de 24.5MP, estabilização de imagem, gravação 4K, Wi-Fi, Bluetooth',
      price: 8499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smart TV Sony Bravia XR A80J',
      description:
        'Smart TV Sony Bravia XR A80J com tela OLED de 55", resolução 4K HDR, Google TV, Wi-Fi, Bluetooth, 4x HDMI, 2x USB',
      price: 4499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Notebook Lenovo ThinkPad X1 Carbon',
      description:
        'Notebook Lenovo ThinkPad X1 Carbon com processador Intel Core i7, 16GB RAM, SSD 512GB, tela 14" Full HD, Windows 11 Pro',
      price: 5999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smartphone Google Pixel 7',
      description:
        'Smartphone Google Pixel 7 com tela OLED de 6.3", 8GB RAM, 128GB de armazenamento, câmera de 50MP, Android 13',
      price: 2799.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Tablet Apple iPad Pro 12.9"',
      description:
        'Tablet Apple iPad Pro 12.9" com chip M2, 8GB RAM, 128GB de armazenamento, tela Liquid Retina XDR, suporte para Apple Pencil',
      price: 6999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Fone de Ouvido SteelSeries Arctis 7',
      description:
        'Fone de ouvido SteelSeries Arctis 7 com cancelamento de ruído ativo, áudio surround 7.1, microfone retrátil, bateria de 24 horas',
      price: 899.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Logitech G Pro X Superlight',
      description:
        'Mouse sem fio Logitech G Pro X Superlight com sensor HERO 25K, 5 botões programáveis, iluminação RGB, bateria recarregável',
      price: 799.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Teclado Corsair K95 RGB Platinum',
      description:
        'Teclado mecânico Corsair K95 RGB Platinum com switches Cherry MX Speed Silver, teclas macro, iluminação RGB, descanso para pulsos',
      price: 1199.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Monitor Alienware AW3423DW',
      description:
        'Monitor Alienware AW3423DW com tela QD-OLED de 34", resolução 3440x1440, G-SYNC Ultimate, HDR True Black, altura ajustável',
      price: 3999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Câmera Fujifilm X-T5',
      description:
        'Câmera mirrorless Fujifilm X-T5 com sensor APS-C de 40.2MP, estabilização de imagem, gravação 6.2K, Wi-Fi, Bluetooth',
      price: 7499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smart TV TCL 6-Series 65"',
      description:
        'Smart TV TCL 6-Series de 65" com resolução 4K QLED, HDR10+, Google TV, Wi-Fi, Bluetooth, 4x HDMI, 2x USB',
      price: 4999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Notebook Apple MacBook Pro 16"',
      description:
        'Notebook Apple MacBook Pro 16" com chip M2 Pro, 16GB RAM, SSD 512GB, tela Liquid Retina XDR, macOS Ventura',
      price: 8999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smartphone OnePlus 11',
      description:
        'Smartphone OnePlus 11 com tela LTPO AMOLED de 6.7", 16GB RAM, 256GB de armazenamento, câmera de 50MP, OxygenOS 13',
      price: 3499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Tablet Samsung Galaxy Tab S9 Ultra',
      description:
        'Tablet Samsung Galaxy Tab S9 Ultra com tela Dynamic AMOLED 2X de 14.6", 12GB RAM, 256GB de armazenamento, S Pen incluído, Android 13',
      price: 7999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Fone de Ouvido Sennheiser Momentum 4',
      description:
        'Fone de ouvido Sennheiser Momentum 4 com cancelamento de ruído ativo, áudio Hi-Res, bateria de 30 horas, microfone com cancelamento de ruído',
      price: 1699.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Logitech G502 X Plus',
      description:
        'Mouse sem fio Logitech G502 X Plus com sensor HERO 25K, 11 botões programáveis, iluminação RGB, bateria recarregável',
      price: 899.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Teclado Keychron K8 Pro',
      description:
        'Teclado mecânico Keychron K8 Pro com switches Gateron Brown, iluminação RGB, teclas macro, compatibilidade com Mac e Windows',
      price: 699.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Monitor LG 27GP850-B',
      description:
        'Monitor LG 27GP850-B com tela Nano IPS de 27", resolução 2560x1440, G-SYNC Compatible, HDR10, altura ajustável',
      price: 2799.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Câmera Canon EOS R5',
      description:
        'Câmera mirrorless Canon EOS R5 com sensor Full Frame de 45MP, estabilização de imagem, gravação 8K, Wi-Fi, Bluetooth',
      price: 11999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smart TV Samsung The Frame 55"',
      description:
        'Smart TV Samsung The Frame de 55" com resolução 4K QLED, HDR10+, Tizen OS, Wi-Fi, Bluetooth, 4x HDMI, 2x USB',
      price: 5499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Notebook ASUS ZenBook Pro Duo',
      description:
        'Notebook ASUS ZenBook Pro Duo com processador Intel Core i9, 32GB RAM, SSD 1TB, tela 15.6" OLED 4K, Windows 11 Pro',
      price: 7999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smartphone Samsung Galaxy Z Fold 5',
      description:
        'Smartphone Samsung Galaxy Z Fold 5 com tela Dynamic AMOLED 2X de 7.6", 12GB RAM, 512GB de armazenamento, câmera de 50MP, Android 13',
      price: 8999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Tablet Microsoft Surface Pro 9',
      description:
        'Tablet Microsoft Surface Pro 9 com tela PixelSense de 13", chip Intel Core i7, 16GB RAM, 256GB de armazenamento, Windows 11 Pro',
      price: 7999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Fone de Ouvido Audio-Technica ATH-M50xBT2',
      description:
        'Fone de ouvido Audio-Technica ATH-M50xBT2 com cancelamento de ruído ativo, áudio Hi-Res, bateria de 50 horas, microfone com cancelamento de ruído',
      price: 1299.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Finalmouse Starlight-12',
      description:
        'Mouse sem fio Finalmouse Starlight-12 com sensor PixArt PMW3360, 6 botões programáveis, bateria recarregável',
      price: 999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Teclado Razer Huntsman V3',
      description:
        'Teclado mecânico Razer Huntsman V3 com switches Razer Red, iluminação RGB, teclas macro, cabo USB-C',
      price: 899.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Monitor ASUS ROG Swift PG32UQ',
      description:
        'Monitor ASUS ROG Swift PG32UQ com tela IPS de 32", resolução 3840x2160, G-SYNC Ultimate, HDR10, altura ajustável',
      price: 4499.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Câmera Sony Alpha A7R V',
      description:
        'Câmera mirrorless Sony Alpha A7R V com sensor Full Frame de 61MP, estabilização de imagem, gravação 8K, Wi-Fi, Bluetooth',
      price: 13999.99,
      category: 'Eletrônicos',
    },
    {
      name: 'Smart TV LG OLED G3 77"',
      description:
        'Smart TV LG OLED G3 de 77" com resolução 4K HDR, webOS, Magic Remote, Wi-Fi, Bluetooth, 4x HDMI, 3x USB',
      price: 9999.99,
      category: 'Eletrônicos',
    },
  ];

  sampleProducts.forEach((product) => {
    productService.createProduct(product);
  });

  console.log(`✅ 50 produtos adicionados com sucesso!`);
}
