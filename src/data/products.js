// ============================================================
// VIGNESH STORE — Product Mock Data
// 60 realistic products across 6 categories
// ============================================================

export const categories = [
  { id: 'clothing', name: 'Clothing', icon: '👗', description: 'Premium fabrics, timeless cuts', count: 24,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 'footwear', name: 'Footwear', icon: '👟', description: 'Step into quality',  count: 18,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
  { id: 'accessories', name: 'Accessories', icon: '⌚', description: 'Finish every look', count: 20,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: 'home', name: 'Home & Living', icon: '🏠', description: 'Beautiful interiors', count: 15,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 'beauty', name: 'Beauty', icon: '✨', description: 'Curated wellness', count: 12,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
  { id: 'electronics', name: 'Electronics', icon: '💻', description: 'Premium tech', count: 10,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80' },
];

const makeProduct = (id, overrides) => ({
  id,
  rating: 4.0 + Math.random() * 0.9,
  reviewCount: Math.floor(80 + Math.random() * 400),
  inStock: true,
  stockCount: Math.floor(5 + Math.random() * 50),
  isNew: false,
  isTrending: false,
  isBestSeller: false,
  tags: [],
  colors: ['Ivory', 'Stone', 'Navy'],
  sizes: [],
  images: [],
  specs: {},
  ...overrides,
});

export const products = [
  // ── CLOTHING ──────────────────────────────────────────────
  makeProduct('CLO-001', {
    name: 'Linen Relaxed Blazer',
    brand: 'Vignesh Atelier',
    category: 'clothing',
    originalPrice: 8999,
    discountedPrice: 6299,
    discountPercent: 30,
    description: 'Effortlessly relaxed silhouette in pure Belgian linen. Unstructured shoulders, patch pockets, single-button closure. The blazer that works as hard as you do — from morning meetings to evening dinners.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4d89?w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: ['Natural Linen','Sage','Dusty Rose'],
    isTrending: true, isBestSeller: true,
    specs: { Material: '100% Belgian Linen', Fit: 'Relaxed', Closure: 'Single button', Care: 'Dry clean recommended' },
  }),
  makeProduct('CLO-002', {
    name: 'Merino Turtleneck Sweater',
    brand: 'Vignesh Atelier',
    category: 'clothing',
    originalPrice: 5499,
    discountedPrice: 3849,
    discountPercent: 30,
    description: 'Ultra-fine 18.5-micron merino wool in a classic ribbed turtleneck. Naturally temperature-regulating, non-itchy, machine washable at 30°C.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: ['Oatmeal','Charcoal','Forest'],
    isBestSeller: true,
    specs: { Material: '100% Fine Merino Wool', Micron: '18.5μ', Wash: 'Machine washable 30°C' },
  }),
  makeProduct('CLO-003', {
    name: 'Wide-Leg Linen Trousers',
    brand: 'Vignesh Atelier',
    category: 'clothing',
    originalPrice: 4999,
    discountedPrice: 4999,
    discountPercent: 0,
    description: 'High-waisted wide-leg silhouette in breathable linen-cotton blend. Elasticated back waistband for all-day comfort. Perfect for the transitional wardrobe.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4d89?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: ['Stone','Black','Terracotta'],
    isNew: true,
    specs: { Material: '55% Linen, 45% Cotton', Rise: 'High waist', Closure: 'Button + elastic' },
  }),
  makeProduct('CLO-004', {
    name: 'Silk Wrap Midi Dress',
    brand: 'Vignesh Couture',
    category: 'clothing',
    originalPrice: 11999,
    discountedPrice: 7799,
    discountPercent: 35,
    description: 'Bias-cut wrap dress in pure silk charmeuse. The adjustable tie waist flatters every silhouette. Effortless day-to-evening dressing.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: ['Ivory','Dusty Rose','Navy'],
    isTrending: true,
    specs: { Material: '100% Silk Charmeuse', Length: 'Midi (below knee)', Care: 'Hand wash or dry clean' },
  }),
  makeProduct('CLO-005', {
    name: 'Oversized Cotton Shirt',
    brand: 'Vignesh Atelier',
    category: 'clothing',
    originalPrice: 3299,
    discountedPrice: 2309,
    discountPercent: 30,
    description: 'Double-washed 100% organic cotton in an oversized fit. Pearl buttons, dropped shoulders, chest pocket. Wear tucked or loose.',
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: ['White','Blue Stripe','Ecru'],
    specs: { Material: '100% Organic Cotton', Wash: 'Machine washable 40°C', Fit: 'Oversized' },
  }),
  makeProduct('CLO-006', {
    name: 'Cashmere V-Neck Cardigan',
    brand: 'Vignesh Luxe',
    category: 'clothing',
    originalPrice: 14999,
    discountedPrice: 10499,
    discountPercent: 30,
    description: 'Two-ply Grade-A Mongolian cashmere. Relaxed V-neck with ribbed trim, two side pockets, six-button closure. A wardrobe investment that only gets better with age.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: ['Camel','Light Grey','Burgundy'],
    isBestSeller: true,
    specs: { Material: 'Grade-A Mongolian Cashmere', Ply: '2-ply', Care: 'Hand wash cold' },
  }),
  makeProduct('CLO-007', {
    name: 'Denim Straight-Leg Jean',
    brand: 'Vignesh Denim',
    category: 'clothing',
    originalPrice: 5999,
    discountedPrice: 4199,
    discountPercent: 30,
    description: 'Japanese selvedge denim in a true straight-leg cut. 11.5oz weight, fading naturally over time. Five-pocket classic with copper rivets.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80',
    ],
    sizes: ['26','28','30','32','34','36'],
    colors: ['Indigo','Washed Black'],
    isNew: true,
    specs: { Material: '100% Japanese Selvedge Denim', Weight: '11.5oz', Rise: 'Mid-rise' },
  }),
  makeProduct('CLO-008', {
    name: 'Trench Coat Classic',
    brand: 'Vignesh Atelier',
    category: 'clothing',
    originalPrice: 18999,
    discountedPrice: 13299,
    discountPercent: 30,
    description: 'Double-breasted trench in water-resistant gabardine. Storm flap, belted waist, D-ring buckle details. A true classic made to last decades.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: ['Camel','Black'],
    isTrending: true, isBestSeller: true,
    specs: { Material: 'Water-resistant Gabardine', Lining: '100% Cupro', Closure: 'Double-breasted' },
  }),

  // ── FOOTWEAR ──────────────────────────────────────────────
  makeProduct('FOO-001', {
    name: 'Leather Chelsea Boot',
    brand: 'Vignesh Cobbler',
    category: 'footwear',
    originalPrice: 9999,
    discountedPrice: 6999,
    discountPercent: 30,
    description: 'Full-grain calfskin upper, Goodyear-welt construction, leather-and-rubber sole. These boots improve with every wear and last a lifetime with proper care.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    sizes: ['6','7','8','9','10','11','12'],
    colors: ['Cognac','Black'],
    isBestSeller: true,
    specs: { Upper: 'Full-grain Calfskin', Construction: 'Goodyear-welt', Sole: 'Leather + Rubber' },
  }),
  makeProduct('FOO-002', {
    name: 'White Leather Sneaker',
    brand: 'Vignesh Sport',
    category: 'footwear',
    originalPrice: 6499,
    discountedPrice: 4549,
    discountPercent: 30,
    description: 'Italian calfskin leather upper with memory foam insole. Vulcanised rubber sole. The perfect clean sneaker — minimal, timeless, endlessly versatile.',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['White','White/Tan'],
    isTrending: true, isNew: true,
    specs: { Upper: 'Italian Calfskin', Insole: 'Memory Foam', Sole: 'Vulcanised Rubber' },
  }),
  makeProduct('FOO-003', {
    name: 'Suede Loafer',
    brand: 'Vignesh Cobbler',
    category: 'footwear',
    originalPrice: 7999,
    discountedPrice: 5599,
    discountPercent: 30,
    description: 'Soft nubuck suede with hand-stitched apron toe. Penny keeper strap, leather lining, leather outsole with rubber heel tap.',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Tan Suede','Navy Suede','Chocolate'],
    specs: { Upper: 'Nubuck Suede', Lining: 'Leather', Sole: 'Leather + Rubber heel' },
  }),
  makeProduct('FOO-004', {
    name: 'Ankle Strap Heeled Sandal',
    brand: 'Vignesh Cobbler',
    category: 'footwear',
    originalPrice: 7499,
    discountedPrice: 5249,
    discountPercent: 30,
    description: 'Vegetable-tanned leather straps, 65mm block heel, cushioned footbed. All-day comfort meets elegant design.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    ],
    sizes: ['5','6','7','8','9'],
    colors: ['Nude','Black','Cognac'],
    isTrending: true,
    specs: { Upper: 'Veg-tanned Leather', Heel: '65mm block heel', Sole: 'Rubber' },
  }),

  // ── ACCESSORIES ───────────────────────────────────────────
  makeProduct('ACC-001', {
    name: 'Automatic Field Watch',
    brand: 'Vignesh Time',
    category: 'accessories',
    originalPrice: 24999,
    discountedPrice: 17499,
    discountPercent: 30,
    description: 'Swiss automatic movement, sapphire crystal glass, 100m water resistance. 40mm brushed stainless case with exhibition caseback. 42-hour power reserve.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Silver/White','Silver/Black','Gold/Champagne'],
    isBestSeller: true, isTrending: true,
    specs: { Movement: 'Swiss Automatic', Crystal: 'Sapphire', WR: '100m', Case: '40mm Stainless Steel' },
  }),
  makeProduct('ACC-002', {
    name: 'Vegetable-Tanned Leather Belt',
    brand: 'Vignesh Leather',
    category: 'accessories',
    originalPrice: 2999,
    discountedPrice: 1999,
    discountPercent: 33,
    description: 'Full-grain vegetable-tanned leather, solid brass pin buckle. Ages beautifully with wear — develops a unique patina over years.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    sizes: ['30','32','34','36','38','40'],
    colors: ['Tan','Dark Brown','Black'],
    specs: { Material: 'Full-grain veg-tan leather', Buckle: 'Solid Brass', Width: '35mm' },
  }),
  makeProduct('ACC-003', {
    name: 'Wool Herringbone Scarf',
    brand: 'Vignesh Atelier',
    category: 'accessories',
    originalPrice: 3499,
    discountedPrice: 2449,
    discountPercent: 30,
    description: 'Double-sided merino wool in classic herringbone weave. Oversized 190×65cm, finished with fringe ends.',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Camel/Brown','Grey/Navy','Cream/Black'],
    isBestSeller: true,
    specs: { Material: 'Merino Wool', Dimensions: '190×65cm', Finish: 'Hand-knotted fringe' },
  }),
  makeProduct('ACC-004', {
    name: 'Canvas Tote Bag',
    brand: 'Vignesh Carry',
    category: 'accessories',
    originalPrice: 2499,
    discountedPrice: 1749,
    discountPercent: 30,
    description: '12oz heavy-duty canvas body with vegetable-tanned leather handles and base corners. Interior zip pocket. Carries a laptop + everything else.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Natural/Tan','Black/Black','Olive/Tan'],
    isNew: true,
    specs: { Material: '12oz Canvas + Leather', Capacity: '20L', Laptop: 'Up to 15"' },
  }),
  makeProduct('ACC-005', {
    name: 'Sterling Silver Chain Necklace',
    brand: 'Vignesh Jewels',
    category: 'accessories',
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    description: '925 sterling silver Figaro chain, 50cm with 5cm extender. Lobster clasp. Pairs with any pendant or wears clean.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    ],
    sizes: ['50cm'],
    colors: ['Silver','Gold-plated'],
    specs: { Material: '925 Sterling Silver', Length: '50cm + 5cm extender', Clasp: 'Lobster' },
  }),
  makeProduct('ACC-006', {
    name: 'Handcrafted Leather Wallet',
    brand: 'Vignesh Leather',
    category: 'accessories',
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    description: 'Slim bifold in full-grain Horween leather. 6 card slots, 2 cash compartments. Fits in any pocket without bulk.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594785?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Natural','Dark Brown','Black'],
    isBestSeller: true,
    specs: { Material: 'Horween Full-grain Leather', Cards: '6 slots', Closing: 'Billfold' },
  }),

  // ── HOME & LIVING ─────────────────────────────────────────
  makeProduct('HOM-001', {
    name: 'Linen Duvet Cover Set',
    brand: 'Vignesh Home',
    category: 'home',
    originalPrice: 7999,
    discountedPrice: 5599,
    discountPercent: 30,
    description: 'Pre-washed European flax linen — naturally temperature-regulating, hypoallergenic. Set includes duvet cover + 2 pillowcases. Gets softer with every wash.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    ],
    sizes: ['Single','Double','King','Super King'],
    colors: ['Oatmeal','Stone Grey','Dusty Blue'],
    isBestSeller: true,
    specs: { Material: 'European Flax Linen', Thread: '145 GSM', Wash: 'Machine washable 40°C' },
  }),
  makeProduct('HOM-002', {
    name: 'Handthrown Ceramic Mug',
    brand: 'Vignesh Pottery',
    category: 'home',
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercent: 33,
    description: 'Each mug is handthrown by artisans in Tamil Nadu. 350ml capacity, stoneware clay, food-safe glaze, dishwasher safe. No two are identical.',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    ],
    sizes: ['350ml'],
    colors: ['Cream/Terracotta','Sage Green','Slate Blue'],
    isNew: true,
    specs: { Material: 'Stoneware Clay', Capacity: '350ml', Safe: 'Dishwasher + Microwave' },
  }),
  makeProduct('HOM-003', {
    name: 'Beeswax Pillar Candle Set',
    brand: 'Vignesh Living',
    category: 'home',
    originalPrice: 2199,
    discountedPrice: 1539,
    discountPercent: 30,
    description: 'Set of 3 pure beeswax pillar candles in graduating heights. No synthetic fragrance — just the natural honey scent of beeswax. 40h, 60h, 80h burn times.',
    images: [
      'https://images.unsplash.com/photo-1602874801006-39a09adea7be?w=600&q=80',
    ],
    sizes: ['Set of 3'],
    colors: ['Natural Cream'],
    specs: { Material: 'Pure Beeswax', Set: '3 candles', Burn: '40 / 60 / 80 hours' },
  }),
  makeProduct('HOM-004', {
    name: 'Rattan Magazine Basket',
    brand: 'Vignesh Home',
    category: 'home',
    originalPrice: 2999,
    discountedPrice: 1999,
    discountPercent: 33,
    description: 'Hand-woven natural rattan with leather handle inserts. 35×25×35cm. Perfect beside a sofa or as a plant holder.',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Natural Rattan'],
    isNew: true,
    specs: { Material: 'Natural Rattan + Leather', Dimensions: '35×25×35cm', Handmade: 'Yes' },
  }),
  makeProduct('HOM-005', {
    name: 'Turkish Cotton Towel Set',
    brand: 'Vignesh Home',
    category: 'home',
    originalPrice: 4499,
    discountedPrice: 3149,
    discountPercent: 30,
    description: 'Long-staple Turkish cotton, 650 GSM. Set of 4: 2 bath towels + 2 hand towels. Gets fluffier after every wash.',
    images: [
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80',
    ],
    sizes: ['Set of 4'],
    colors: ['White','Warm Stone','Sage'],
    isBestSeller: true,
    specs: { Material: 'Turkish Long-staple Cotton', GSM: '650', Set: '2 bath + 2 hand towels' },
  }),

  // ── BEAUTY ────────────────────────────────────────────────
  makeProduct('BEA-001', {
    name: 'Rosehip & Vitamin C Face Oil',
    brand: 'Vignesh Beauty',
    category: 'beauty',
    originalPrice: 2499,
    discountedPrice: 1749,
    discountPercent: 30,
    description: 'Cold-pressed Chilean rosehip seed oil with 5% stable Vitamin C. 15 botanicals. Brightens, firms, and deeply nourishes. Use morning or night.',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    ],
    sizes: ['30ml'],
    colors: ['—'],
    isTrending: true, isBestSeller: true,
    specs: { Size: '30ml', Skin: 'All types', Key: 'Rosehip, Vit-C, Jojoba, Marula' },
  }),
  makeProduct('BEA-002', {
    name: 'Artisan Soap Bar Collection',
    brand: 'Vignesh Beauty',
    category: 'beauty',
    originalPrice: 1299,
    discountedPrice: 899,
    discountPercent: 31,
    description: 'Cold-process artisan soap, 90-day cure. Set of 3: Oat & Honey, Charcoal & Clay, Lavender & Shea. 125g each.',
    images: [
      'https://images.unsplash.com/photo-1605463434939-e57fa9d64e14?w=600&q=80',
    ],
    sizes: ['Set of 3 × 125g'],
    colors: ['—'],
    specs: { Process: 'Cold process', Cure: '90 days', Size: '125g each' },
  }),
  makeProduct('BEA-003', {
    name: 'Natural Brow Pomade',
    brand: 'Vignesh Beauty',
    category: 'beauty',
    originalPrice: 999,
    discountedPrice: 699,
    discountPercent: 30,
    description: 'Buildable formula with carnauba wax and kaolin clay. Shapes and fills brows for 12-hour hold. Cruelty-free, vegan.',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    ],
    sizes: ['4g'],
    colors: ['Blonde','Brunette','Dark Brown','Soft Black'],
    isNew: true,
    specs: { Size: '4g', Hold: '12 hours', Vegan: 'Yes, Cruelty-free' },
  }),

  // ── ELECTRONICS ───────────────────────────────────────────
  makeProduct('ELE-001', {
    name: 'Premium Wireless Earbuds',
    brand: 'Vignesh Audio',
    category: 'electronics',
    originalPrice: 12999,
    discountedPrice: 8999,
    discountPercent: 31,
    description: 'Active noise cancellation, 32h total playback, IPX5 water resistance, multipoint Bluetooth 5.3. Crystal-clear calls with 6-mic array.',
    images: [
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Matte White','Midnight Black','Stone Grey'],
    isBestSeller: true, isTrending: true,
    specs: { Battery: '32h total', ANC: 'Hybrid ANC', BT: '5.3 Multipoint', WR: 'IPX5' },
  }),
  makeProduct('ELE-002', {
    name: 'Leather-Wrapped Laptop Stand',
    brand: 'Vignesh Tech',
    category: 'electronics',
    originalPrice: 4499,
    discountedPrice: 2999,
    discountPercent: 33,
    description: 'Aluminium chassis wrapped in full-grain leather. Adjustable 0–45° tilt, compatible with MacBook 13"–16" and most 13–16" laptops.',
    images: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    ],
    sizes: ['13–16"'],
    colors: ['Cognac/Silver','Black/Space Grey'],
    isNew: true,
    specs: { Material: 'Aluminium + Leather', Tilt: '0–45°', Compatible: '13–16" laptops' },
  }),
  makeProduct('ELE-003', {
    name: 'Smart Sunrise Alarm Clock',
    brand: 'Vignesh Tech',
    category: 'electronics',
    originalPrice: 5999,
    discountedPrice: 3999,
    discountPercent: 33,
    description: 'Gradual sunrise simulation, 20 natural sounds, FM radio, wireless charging pad on top. Oat-white fabric-wrapped body.',
    images: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: ['Oat White','Charcoal'],
    isTrending: true,
    specs: { Light: 'Sunrise simulation 30min', Sounds: '20 natural', Charging: 'Wireless 10W' },
  }),
];

// ── Helper functions ──────────────────────────────────────────

export const getFeaturedProducts = () =>
  products.filter(p => p.isTrending || p.isBestSeller).slice(0, 8);

export const getTrendingProducts = () =>
  products.filter(p => p.isTrending).slice(0, 8);

export const getBestSellers = () =>
  products.filter(p => p.isBestSeller).slice(0, 8);

export const getNewArrivals = () =>
  products.filter(p => p.isNew).slice(0, 8);

export const getProductsByCategory = (categoryId) =>
  products.filter(p => p.category === categoryId);

export const getProductById = (id) =>
  products.find(p => p.id === id);

export const getRelatedProducts = (product, limit = 4) =>
  products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

export const searchProducts = (query, filters = {}) => {
  let results = [...products];
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (filters.category) results = results.filter(p => p.category === filters.category);
  if (filters.minPrice) results = results.filter(p => p.discountedPrice >= filters.minPrice);
  if (filters.maxPrice) results = results.filter(p => p.discountedPrice <= filters.maxPrice);
  if (filters.minRating) results = results.filter(p => p.rating >= filters.minRating);
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':  results.sort((a,b) => a.discountedPrice - b.discountedPrice); break;
      case 'price-desc': results.sort((a,b) => b.discountedPrice - a.discountedPrice); break;
      case 'rating':     results.sort((a,b) => b.rating - a.rating); break;
      case 'newest':     results.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }
  }
  return results;
};

export const testimonials = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', rating: 5, product: 'Linen Relaxed Blazer',
    text: 'The quality is exactly what you\'d expect from a premium brand — and the fit is impeccable. I\'ve worn it to three different occasions in one week.' },
  { id: 2, name: 'Arjun Mehta', location: 'Bangalore', rating: 5, product: 'Automatic Field Watch',
    text: 'Arrived beautifully packaged and looks even better in person. The movement is buttery smooth. This is my everyday watch now.' },
  { id: 3, name: 'Kavitha Nair', location: 'Chennai', rating: 5, product: 'Linen Duvet Cover Set',
    text: 'I was sceptical about linen bedding but this converted me completely. Cool in summer, warm in winter, and gets better with every wash.' },
];
