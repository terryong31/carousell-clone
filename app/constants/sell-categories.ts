export type SellCategory = {
  label: string
  value: string
  children?: SellCategory[]
}

export type SubCategory = SellCategory
export type LeafCategory = SellCategory

export const SELL_CATEGORIES: SellCategory[] = [
  { label: 'Announcements', value: 'announcements' },
  {
    label: 'Audio', value: 'audio', children: [
      { label: 'Earphones', value: 'earphones' },
      { label: 'Headphones & Headsets', value: 'headphones-headsets' },
      { label: 'Microphones', value: 'microphones' },
      { label: 'Other Audio Equipment', value: 'audio-other-equipment' },
      { label: 'Portable Audio Accessories', value: 'portable-audio-accessories' },
      { label: 'Portable Music Players', value: 'portable-music-players' },
      { label: 'Soundbars, Speakers & Amplifiers', value: 'soundbars-speakers-amplifiers' },
      { label: 'Voice Recorders', value: 'voice-recorders' }
    ]
  },
  { label: 'Auto Accessories', value: 'auto-accessories' },
  {
    label: 'Babies & Kids', value: 'babies-kids', children: [
      { label: 'Babies & Kids Fashion', value: 'babies-kids-fashion' },
      { label: 'Baby Monitors', value: 'baby-monitors' },
      {
        label: 'Baby Nursery & Kids Furniture', value: 'baby-nursery-kids-furniture', children: [
          { label: 'Bed Guards', value: 'bed-guards' },
          { label: 'Changing Tables & Stations', value: 'changing-tables-stations' },
          { label: 'Childrens\' Beds', value: 'childrens-beds' },
          { label: 'Cots & Cribs', value: 'cots-cribs' },
          { label: 'Kids\' Tables & Chairs', value: 'kids-tables-chairs' },
          { label: 'Kids\' Wardrobes & Storage', value: 'kids-wardrobes-storage' },
          { label: 'Nursery Lighting & Decor', value: 'nursery-lighting-decor' },
          { label: 'Other Kids Furniture', value: 'nursery-other' },
          { label: 'Safety Gates, Locks & Protectors', value: 'safety-gates-locks-protectors' }
        ]
      },
      {
        label: 'Bathing & Changing', value: 'bathing-changing', children: [
          { label: 'Baby Toiletries & Grooming', value: 'baby-toiletries-grooming' },
          { label: 'Bathtub & Bath Accessories', value: 'bathtub-bath-accessories' },
          { label: 'Changing Mats & Accessories', value: 'changing-mats-accessories' },
          { label: 'Diapers & Baby Wipes', value: 'diapers-baby-wipes' },
          { label: 'Other Baby Bathing & Changing Needs', value: 'bathing-other' },
          { label: 'Toilet Training', value: 'toilet-training' }
        ]
      },
      {
        label: 'Going Out', value: 'going-out', children: [
          { label: 'Car Seats', value: 'car-seats' },
          { label: 'Carriers & Slings', value: 'carriers-slings' },
          { label: 'Diaper Bags & Wetbags', value: 'diaper-bags-wetbags' },
          { label: 'Other Babies Going Out Needs', value: 'going-out-other' },
          { label: 'Strollers', value: 'strollers' }
        ]
      },
      { label: 'Infant Playtime', value: 'infant-playtime' },
      { label: 'Maternity Care', value: 'maternity-care' },
      {
        label: 'Nursing & Feeding', value: 'nursing-feeding', children: [
          { label: 'Baby High Chairs', value: 'baby-high-chairs' },
          { label: 'Breastfeeding & Bottle Feeding', value: 'breastfeeding-bottle-feeding' },
          { label: 'Soothers & Pacifiers', value: 'soothers-pacifiers' },
          { label: 'Weaning & Toddler Feeding', value: 'weaning-toddler-feeding' }
        ]
      }
    ]
  },
  {
    label: 'Beauty & Personal Care', value: 'beauty-personal-care', children: [
      {
        label: 'Bath & Body', value: 'bath-body', children: [
          { label: 'Bath', value: 'bath' },
          { label: 'Body Care', value: 'body-care' },
          { label: 'Hair Removal', value: 'hair-removal' }
        ]
      },
      { label: 'Ear Care', value: 'ear-care' },
      {
        label: 'Face', value: 'face', children: [
          { label: 'Face Care', value: 'face-care' },
          { label: 'Makeup', value: 'makeup' }
        ]
      },
      { label: 'Foot Care', value: 'foot-care' },
      { label: 'Fragrance & Deodorants', value: 'fragrance-deodorants' },
      { label: 'Hair', value: 'hair' },
      { label: 'Hands & Nails', value: 'hands-nails' },
      { label: 'Men\'s Grooming', value: 'mens-grooming' },
      { label: 'Oral Care', value: 'oral-care' },
      { label: 'Sanitary Hygiene', value: 'sanitary-hygiene' },
      { label: 'Sanitisers & Disinfectants', value: 'sanitisers-disinfectants' },
      { label: 'Vision Care', value: 'vision-care' }
    ]
  },
  {
    label: 'Cars', value: 'cars', children: [
      { label: 'Cars for Sale', value: 'cars-for-sale' },
      { label: 'Vehicle Rentals', value: 'vehicle-rentals' }
    ]
  },
  { label: 'Community', value: 'community' },
  {
    label: 'Computers & Tech', value: 'computers-tech', children: [
      { label: 'Desktops', value: 'desktops' },
      { label: 'Laptops & Notebooks', value: 'laptops-notebooks' },
      { label: 'Office & Business Technology', value: 'office-business-technology' },
      {
        label: 'Parts & Accessories', value: 'computers-tech-parts-accessories', children: [
          { label: 'Cables & Adaptors', value: 'cables-adaptors' },
          { label: 'Chargers', value: 'chargers' },
          { label: 'Computer Keyboard', value: 'computer-keyboard' },
          { label: 'Computer Parts', value: 'computer-parts' },
          { label: 'Hard Disks & Thumbdrives', value: 'hard-disks-thumbdrives' },
          { label: 'Laptop Bags & Sleeves', value: 'laptop-bags-sleeves' },
          { label: 'Monitor Screens', value: 'monitor-screens' },
          { label: 'Mouse & Mousepads', value: 'mouse-mousepads' },
          { label: 'Networking', value: 'networking' },
          { label: 'Other Accessories', value: 'computers-accessories-other' },
          { label: 'Software', value: 'software' },
          { label: 'Webcams', value: 'webcams' }
        ]
      },
      { label: 'Printers, Scanners & Copiers', value: 'printers-scanners-copiers' }
    ]
  },
  {
    label: 'Everything Else', value: 'everything-else', children: [
      { label: 'Others', value: 'others' }
    ]
  },
  {
    label: 'Food & Drinks', value: 'food-drinks', children: [
      { label: 'Beverages', value: 'beverages' },
      { label: 'Chilled & Frozen Food', value: 'chilled-frozen-food' },
      { label: 'Fresh Produce', value: 'fresh-produce' },
      { label: 'Gift Baskets & Hampers', value: 'gift-baskets-hampers' },
      { label: 'Homemade Bakes', value: 'homemade-bakes' },
      { label: 'Local Eats', value: 'local-eats' },
      { label: 'Other Food & Drinks', value: 'food-drinks-other' },
      { label: 'Packaged & Instant Food', value: 'packaged-instant-food' },
      { label: 'Rice & Noodles', value: 'rice-noodles' },
      { label: 'Spice & Seasoning', value: 'spice-seasoning' }
    ]
  },
  {
    label: 'Furniture & Home Living', value: 'furniture-home-living', children: [
      { label: 'Bathroom & Kitchen Fixtures', value: 'bathroom-kitchen-fixtures' },
      { label: 'Bedding & Towels', value: 'bedding-towels' },
      {
        label: 'Cleaning & Homecare Supplies', value: 'cleaning-homecare-supplies', children: [
          { label: 'Cleaning Tools & Supplies', value: 'cleaning-tools-supplies' },
          { label: 'Detergents', value: 'detergents' },
          { label: 'Ironing Boards', value: 'ironing-boards' },
          { label: 'Pest Control', value: 'pest-control' },
          { label: 'Waste Bins & Bags', value: 'waste-bins-bags' }
        ]
      },
      {
        label: 'Furniture', value: 'furniture', children: [
          { label: 'Bed Frames & Mattresses', value: 'bed-frames-mattresses' },
          { label: 'Chairs', value: 'chairs' },
          { label: 'Other Home Furniture', value: 'home-furniture-other' },
          { label: 'Shelves, Cabinets & Racks', value: 'shelves-cabinets-racks' },
          { label: 'Sofas', value: 'sofas' },
          { label: 'TV Consoles', value: 'tv-consoles' },
          { label: 'Tables & Sets', value: 'tables-sets' }
        ]
      },
      {
        label: 'Gardening', value: 'gardening', children: [
          { label: 'Garden Soil & Fertilisers', value: 'garden-soil-fertilisers' },
          { label: 'Gardening Tools & Ornaments', value: 'gardening-tools-ornaments' },
          { label: 'Grass Mowers & Trimmers', value: 'grass-mowers-trimmers' },
          { label: 'Hose and Watering Devices', value: 'hose-watering-devices' },
          { label: 'Plants & Seeds', value: 'plants-seeds' },
          { label: 'Pots & Planters', value: 'pots-planters' }
        ]
      },
      {
        label: 'Home Decor', value: 'home-decor', children: [
          { label: 'Artificial Plants & Flowers', value: 'artificial-plants-flowers' },
          { label: 'Carpets, Mats & Flooring', value: 'carpets-mats-flooring' },
          { label: 'Clocks', value: 'clocks' },
          { label: 'Curtains & Blinds', value: 'curtains-blinds' },
          { label: 'Cushions & Throws', value: 'cushions-throws' },
          { label: 'Frames & Pictures', value: 'frames-pictures' },
          { label: 'Mirrors', value: 'mirrors' },
          { label: 'Other Home Decor', value: 'home-decor-other' },
          { label: 'Vases & Decorative Bowls', value: 'vases-decorative-bowls' },
          { label: 'Wall Decor', value: 'wall-decor' }
        ]
      },
      { label: 'Home Fragrance', value: 'home-fragrance' },
      {
        label: 'Home Improvement & Organisation', value: 'home-improvement-organisation', children: [
          { label: 'Clothes Drying Rack', value: 'clothes-drying-rack' },
          { label: 'Home Improvement Tools & Accessories', value: 'home-improvement-tools-accessories' },
          { label: 'Hooks & Hangers', value: 'hooks-hangers' },
          { label: 'Ladders & Steps', value: 'ladders-steps' },
          { label: 'Laundry Baskets', value: 'laundry-baskets' },
          { label: 'Storage Boxes & Baskets', value: 'storage-boxes-baskets' }
        ]
      },
      {
        label: 'Kitchenware & Tableware', value: 'kitchenware-tableware', children: [
          { label: 'Bakeware', value: 'bakeware' },
          { label: 'Coffee & Tea Tableware', value: 'coffee-tea-tableware' },
          { label: 'Cookware & Accessories', value: 'cookware-accessories' },
          { label: 'Dinnerware & Cutlery', value: 'dinnerware-cutlery' },
          { label: 'Food Organisation & Storage', value: 'food-organisation-storage' },
          { label: 'Knives & Chopping Boards', value: 'knives-chopping-boards' },
          { label: 'Other Kitchenware & Tableware', value: 'kitchenware-other' },
          { label: 'Pitchers & Dispensers', value: 'pitchers-dispensers' },
          { label: 'Table Linen & Textiles', value: 'table-linen-textiles' },
          { label: 'Towels, Napkins & Holders', value: 'towels-napkins-holders' },
          { label: 'Water Bottles & Tumblers', value: 'water-bottles-tumblers' }
        ]
      },
      {
        label: 'Lighting & Fans', value: 'lighting-fans', children: [
          { label: 'Fans', value: 'fans' },
          { label: 'Lighting', value: 'lighting' }
        ]
      },
      { label: 'Outdoor Furniture', value: 'outdoor-furniture' },
      {
        label: 'Security & Locks', value: 'security-locks', children: [
          { label: 'Locks, Doors & Gates', value: 'locks-doors-gates' },
          { label: 'Other Security Devices', value: 'security-other' },
          { label: 'Peephole Viewers & Doorbells', value: 'peephole-viewers-doorbells' },
          { label: 'Safe', value: 'safe' },
          { label: 'Security Systems & CCTV Cameras', value: 'security-systems-cctv' }
        ]
      }
    ]
  },
  {
    label: 'Health & Nutrition', value: 'health-nutrition', children: [
      {
        label: 'Assistive & Rehabilatory Aids', value: 'assistive-rehabilatory-aids', children: [
          { label: 'Adult Incontinence', value: 'adult-incontinence' },
          { label: 'Other Assistive Aids', value: 'assistive-aids-other' },
          { label: 'Rehabilitative Devices', value: 'rehabilitative-devices' },
          { label: 'Visual & Hearing Aids', value: 'visual-hearing-aids' },
          { label: 'Wheelchairs', value: 'wheelchairs' }
        ]
      },
      { label: 'Braces, Support & Protection', value: 'braces-support-protection' },
      { label: 'Face Masks & Face Shields', value: 'face-masks-shields' },
      { label: 'Health Monitors & Weighing Scales', value: 'health-monitors-weighing-scales' },
      {
        label: 'Health Supplements', value: 'health-supplements', children: [
          { label: 'Health Food, Drinks & Tonics', value: 'health-food-drinks-tonics' },
          { label: 'Sports & Fitness Nutrition', value: 'sports-fitness-nutrition' },
          { label: 'Vitamins & Supplements', value: 'vitamins-supplements' }
        ]
      },
      { label: 'Insect Repellent', value: 'insect-repellent' },
      { label: 'Massage Devices', value: 'massage-devices' },
      { label: 'Medical Supplies & Tools', value: 'medical-supplies-tools' },
      { label: 'Thermometers', value: 'thermometers' }
    ]
  },
  {
    label: 'Hobbies & Toys', value: 'hobbies-toys', children: [
      {
        label: 'Books & Magazines', value: 'books-magazines', children: [
          { label: 'Assessment Books', value: 'assessment-books' },
          { label: 'Children\'s Books', value: 'childrens-books' },
          { label: 'Comics & Manga', value: 'comics-manga' },
          { label: 'Magazines', value: 'magazines' },
          { label: 'Religion Books', value: 'religion-books' },
          { label: 'Storybooks', value: 'storybooks' },
          { label: 'Textbooks', value: 'textbooks' },
          { label: 'Travel & Holiday Guides', value: 'travel-holiday-guides' }
        ]
      },
      {
        label: 'Collectibles & Memorabilia', value: 'collectibles-memorabilia', children: [
          { label: 'Currency', value: 'currency' },
          { label: 'Fan Merchandise', value: 'fan-merchandise' },
          { label: 'J-pop', value: 'j-pop' },
          { label: 'K-Wave', value: 'k-wave' },
          { label: 'Religious Items', value: 'religious-items' },
          { label: 'Stamps & Prints', value: 'stamps-prints' },
          { label: 'Vintage Collectibles', value: 'vintage-collectibles' }
        ]
      },
      {
        label: 'Music & Media', value: 'music-media', children: [
          { label: 'CDs & DVDs', value: 'cds-dvds' },
          { label: 'Music Accessories', value: 'music-accessories' },
          { label: 'Music Scores', value: 'music-scores' },
          { label: 'Musical Instruments', value: 'musical-instruments' },
          { label: 'Vinyls', value: 'vinyls' }
        ]
      },
      {
        label: 'Stationery & Craft', value: 'stationery-craft', children: [
          { label: 'Art & Prints', value: 'art-prints' },
          { label: 'Craft Supplies & Tools', value: 'craft-supplies-tools' },
          { label: 'Flowers & Bouquets', value: 'flowers-bouquets' },
          { label: 'Handmade Craft', value: 'handmade-craft' },
          { label: 'Occasions & Party Supplies', value: 'occasions-party-supplies' },
          { label: 'Other Stationery & Craft', value: 'stationery-craft-other' },
          { label: 'Stationery & School Supplies', value: 'stationery-school-supplies' }
        ]
      },
      { label: 'Toys & Games', value: 'toys-games' },
      {
        label: 'Travel', value: 'travel', children: [
          { label: 'Luggages', value: 'luggages' },
          { label: 'Travel Essentials & Accessories', value: 'travel-essentials-accessories' },
          { label: 'Umbrellas', value: 'umbrellas' }
        ]
      }
    ]
  },
  {
    label: 'Jobs', value: 'jobs', children: [
      {
        label: 'Full-time', value: 'full-time', children: [
          { label: 'Admin, Office & Finance', value: 'full-time-admin' },
          { label: 'Cleaning & Housekeeping', value: 'full-time-cleaning' },
          { label: 'Computer & IT', value: 'full-time-computer-it' },
          { label: 'Customer Service', value: 'full-time-customer-service' },
          { label: 'Drivers & Delivery', value: 'full-time-drivers' },
          { label: 'Events', value: 'full-time-events' },
          { label: 'Hospitality, F&B', value: 'full-time-hospitality' },
          { label: 'Others', value: 'full-time-others' },
          { label: 'Sales, Retail & Marketing', value: 'full-time-sales' },
          { label: 'Security', value: 'full-time-security' },
          { label: 'Warehouse & Logistics', value: 'full-time-warehouse' }
        ]
      },
      { label: 'Internships & Others', value: 'internships-others' },
      {
        label: 'Part-time', value: 'part-time', children: [
          { label: 'Admin, Office & Finance', value: 'part-time-admin' },
          { label: 'Cleaning & Housekeeping', value: 'part-time-cleaning' },
          { label: 'Computer & IT', value: 'part-time-computer-it' },
          { label: 'Customer Service', value: 'part-time-customer-service' },
          { label: 'Drivers & Delivery', value: 'part-time-drivers' },
          { label: 'Events', value: 'part-time-events' },
          { label: 'Hospitality, F&B', value: 'part-time-hospitality' },
          { label: 'Others', value: 'part-time-others' },
          { label: 'Sales, Retail & Marketing', value: 'part-time-sales' },
          { label: 'Security', value: 'part-time-security' },
          { label: 'Warehouse & Logistics', value: 'part-time-warehouse' }
        ]
      }
    ]
  },
  { label: 'Looking For', value: 'looking-for' },
  {
    label: 'Luxury', value: 'luxury', children: [
      { label: 'Accessories', value: 'luxury-accessories' },
      { label: 'Apparel', value: 'luxury-apparel' },
      { label: 'Bags & Wallets', value: 'luxury-bags-wallets' },
      { label: 'Sneakers & Footwear', value: 'luxury-sneakers-footwear' },
      { label: 'Watches', value: 'luxury-watches' }
    ]
  },
  {
    label: 'Men\'s Fashion', value: 'mens-fashion', children: [
      { label: 'Activewear', value: 'mens-activewear' },
      {
        label: 'Bags', value: 'mens-bags', children: [
          { label: 'Backpacks', value: 'mens-backpacks' },
          { label: 'Belt bags, Clutches and Pouches', value: 'mens-belt-bags' },
          { label: 'Briefcases', value: 'mens-briefcases' },
          { label: 'Sling Bags', value: 'mens-sling-bags' }
        ]
      },
      {
        label: 'Bottoms', value: 'mens-bottoms', children: [
          { label: 'Chinos', value: 'mens-chinos' },
          { label: 'Jeans', value: 'mens-jeans' },
          { label: 'Joggers', value: 'mens-joggers' },
          { label: 'New Underwear', value: 'mens-new-underwear' },
          { label: 'Shorts', value: 'mens-shorts' },
          { label: 'Sleep and Loungewear', value: 'mens-bottoms-sleep-loungewear' },
          { label: 'Swim Trunks & Board Shorts', value: 'mens-swim-trunks' },
          { label: 'Trousers', value: 'mens-trousers' }
        ]
      },
      { label: 'Coats, Jackets and Outerwear', value: 'mens-coats-jackets-outerwear' },
      {
        label: 'Footwear', value: 'mens-footwear', children: [
          { label: 'Boots', value: 'mens-boots' },
          { label: 'Casual shoes', value: 'mens-casual-shoes' },
          { label: 'Dress shoes', value: 'mens-dress-shoes' },
          { label: 'Flipflops and Slides', value: 'mens-flipflops-slides' },
          { label: 'Shoe inserts & accessories', value: 'mens-shoe-accessories' },
          { label: 'Sneakers', value: 'mens-sneakers' }
        ]
      },
      {
        label: 'Muslim Wear', value: 'mens-muslim-wear', children: [
          { label: 'Accessories', value: 'mens-muslim-accessories' },
          { label: 'Baju Melayu', value: 'baju-melayu' },
          { label: 'Jubahs', value: 'jubahs' },
          { label: 'Sarong', value: 'sarong' },
          { label: 'Tops', value: 'mens-muslim-tops' }
        ]
      },
      {
        label: 'Tops & Sets', value: 'mens-tops-sets', children: [
          { label: 'Formal Shirts', value: 'mens-formal-shirts' },
          { label: 'Hoodies', value: 'mens-hoodies' },
          { label: 'Sets & Coordinates', value: 'mens-sets-coordinates' },
          { label: 'Sleep and Loungewear', value: 'mens-tops-sleep-loungewear' },
          { label: 'Swim Top & Rash Guards', value: 'mens-swim-top-rash-guards' },
          { label: 'Tshirts & Polo Shirts', value: 'mens-tshirts-polo-shirts' },
          { label: 'Vests', value: 'mens-vests' }
        ]
      },
      {
        label: 'Watches & Accessories', value: 'mens-watches-accessories', children: [
          { label: 'Accessory holder, box & organisers', value: 'mens-accessory-holders' },
          { label: 'Beanie', value: 'mens-beanies' },
          { label: 'Belts', value: 'mens-belts' },
          { label: 'Cap & Hats', value: 'mens-caps-hats' },
          { label: 'Cuff Links', value: 'mens-cuff-links' },
          { label: 'Gloves', value: 'mens-gloves' },
          { label: 'Handkerchief & Pocket Squares', value: 'mens-handkerchiefs' },
          { label: 'Jewelry', value: 'mens-jewelry' },
          { label: 'Scarves', value: 'mens-scarves' },
          { label: 'Socks', value: 'mens-socks' },
          { label: 'Sunglasses & Eyewear', value: 'mens-sunglasses' },
          { label: 'Ties', value: 'mens-ties' },
          { label: 'Wallets & Card Holders', value: 'mens-wallets' },
          { label: 'Watches', value: 'mens-watches' }
        ]
      }
    ]
  },
  {
    label: 'Mobile Phones & Gadgets', value: 'mobile-phones-gadgets', children: [
      { label: 'E-Readers', value: 'e-readers' },
      {
        label: 'Mobile & Gadget Accessories', value: 'mobile-gadget-accessories', children: [
          { label: 'Batteries & Power Banks', value: 'batteries-power-banks' },
          { label: 'Cases & Covers', value: 'phone-cases-covers' },
          { label: 'Chargers & Cables', value: 'phone-chargers-cables' },
          { label: 'Memory & SD Cards', value: 'memory-sd-cards' },
          { label: 'Mounts & Holders', value: 'phone-mounts-holders' },
          { label: 'Other Mobile & Gadget Accessories', value: 'mobile-accessories-other' },
          { label: 'Sim Cards', value: 'sim-cards' }
        ]
      },
      {
        label: 'Mobile Phones', value: 'mobile-phones', children: [
          {
            label: 'Android Phones', value: 'android-phones', children: [
              { label: 'Android Others', value: 'android-others' },
              { label: 'Asus', value: 'asus' },
              { label: 'Google Pixel', value: 'google-pixel' },
              { label: 'Honor', value: 'honor' },
              { label: 'Huawei', value: 'huawei' },
              { label: 'Infinix', value: 'infinix' },
              { label: 'LG', value: 'lg' },
              { label: 'Motorola', value: 'motorola' },
              { label: 'Nothing', value: 'nothing-phone' },
              { label: 'OPPO', value: 'oppo' },
              { label: 'OnePlus', value: 'oneplus' },
              { label: 'Realme', value: 'realme' },
              { label: 'Samsung', value: 'samsung' },
              { label: 'Sony', value: 'sony' },
              { label: 'Vivo', value: 'vivo' },
              { label: 'Xiaomi', value: 'xiaomi' }
            ]
          },
          { label: 'Early Generation Mobile Phones', value: 'early-generation-phones' },
          {
            label: 'iPhone', value: 'iphone', children: [
              { label: 'iPhone 6 Series', value: 'iphone-6' },
              { label: 'iPhone 7 Series', value: 'iphone-7' },
              { label: 'iPhone 8 Series', value: 'iphone-8' },
              { label: 'iPhone SE Series', value: 'iphone-se' },
              { label: 'iPhone X Series', value: 'iphone-x' },
              { label: 'iPhone 11 Series', value: 'iphone-11' },
              { label: 'iPhone 12 Series', value: 'iphone-12' },
              { label: 'iPhone 13 Series', value: 'iphone-13' },
              { label: 'iPhone 14 Series', value: 'iphone-14' },
              { label: 'iPhone 15 Series', value: 'iphone-15' },
              { label: 'iPhone 16 Series', value: 'iphone-16' },
              { label: 'iPhone 17 Series', value: 'iphone-17' },
              { label: 'iPhone Air Series', value: 'iphone-air' },
              { label: 'iPhone Others', value: 'iphone-others' }
            ]
          }
        ]
      },
      { label: 'Other Gadgets', value: 'other-gadgets' },
      {
        label: 'Tablets', value: 'tablets', children: [
          { label: 'Android', value: 'tablets-android' },
          { label: 'Others', value: 'tablets-others' },
          { label: 'Windows', value: 'tablets-windows' },
          { label: 'iPad', value: 'ipad' }
        ]
      },
      { label: 'Walkie-Talkie', value: 'walkie-talkie' },
      { label: 'Wearables & Smart Watches', value: 'wearables-smart-watches' }
    ]
  },
  { label: 'Motorbikes', value: 'motorbikes' },
  {
    label: 'Pet Supplies', value: 'pet-supplies', children: [
      { label: 'Health & Grooming', value: 'pet-health-grooming' },
      { label: 'Homes & Other Pet Accessories', value: 'pet-homes-accessories' },
      { label: 'Pet Food', value: 'pet-food' }
    ]
  },
  {
    label: 'Photography', value: 'photography', children: [
      { label: 'Cameras', value: 'cameras' },
      { label: 'Drones', value: 'drones' },
      { label: 'Lens & Kits', value: 'lens-kits' },
      {
        label: 'Photography Accessories', value: 'photography-accessories', children: [
          { label: 'Batteries & Chargers', value: 'photo-batteries-chargers' },
          { label: 'Camera Bags & Carriers', value: 'camera-bags-carriers' },
          { label: 'Dry Boxes & Cabinets', value: 'dry-boxes-cabinets' },
          { label: 'Flashes', value: 'flashes' },
          { label: 'Gimbals & Stabilisers', value: 'gimbals-stabilisers' },
          { label: 'Lighting & Studio Equipment', value: 'lighting-studio-equipment' },
          { label: 'Other Photography Accessories', value: 'photo-accessories-other' },
          { label: 'Tripods & Monopods', value: 'tripods-monopods' }
        ]
      },
      { label: 'Video Cameras', value: 'video-cameras' }
    ]
  },
  {
    label: 'Property', value: 'property', children: [
      { label: 'For Sale', value: 'property-for-sale' },
      { label: 'Others', value: 'property-others' },
      { label: 'Rentals', value: 'property-rentals' }
    ]
  },
  {
    label: 'Services', value: 'services', children: [
      { label: 'Beauty Services', value: 'beauty-services' },
      { label: 'Electronics & Gadget Repairs', value: 'electronics-gadget-repairs' },
      {
        label: 'Home Services', value: 'home-services', children: [
          { label: 'Aircon Services', value: 'aircon-services' },
          { label: 'Cleaning', value: 'home-cleaning' },
          { label: 'Electrical, Lighting & Wiring', value: 'electrical-lighting-wiring' },
          { label: 'Home Repairs', value: 'home-repairs' },
          { label: 'Movers & Delivery', value: 'movers-delivery' },
          { label: 'Others', value: 'home-services-others' },
          { label: 'Renovations', value: 'renovations' }
        ]
      },
      { label: 'Others', value: 'services-others' }
    ]
  },
  {
    label: 'Sports Equipment', value: 'sports-equipment', children: [
      {
        label: 'Bicycles & Parts', value: 'bicycles-parts', children: [
          { label: 'Bicycles', value: 'bicycles' }
        ]
      },
      {
        label: 'Exercise & Fitness', value: 'exercise-fitness', children: [
          { label: 'Cardio & Fitness Machines', value: 'cardio-fitness-machines' },
          { label: 'Exercise Mats', value: 'exercise-mats' },
          { label: 'Toning & Stretching Accessories', value: 'toning-stretching-accessories' },
          { label: 'Weights & Dumbells', value: 'weights-dumbells' }
        ]
      },
      { label: 'Fishing', value: 'fishing' },
      { label: 'Hiking & Camping', value: 'hiking-camping' },
      { label: 'Other Sports Equipment and Supplies', value: 'sports-other' },
      {
        label: 'Sports & Games', value: 'sports-games', children: [
          { label: 'Billiards & Bowling', value: 'billiards-bowling' },
          { label: 'Golf', value: 'golf' },
          { label: 'Kites', value: 'kites' },
          { label: 'Racket & Ball Sports', value: 'racket-ball-sports' },
          { label: 'Skates, Rollerblades & Scooters', value: 'skates-rollerblades-scooters' },
          { label: 'Water Sports', value: 'water-sports' }
        ]
      }
    ]
  },
  {
    label: 'TV & Home Appliances', value: 'tv-home-appliances', children: [
      { label: 'Air Conditioners & Heating', value: 'air-conditioners-heating' },
      { label: 'Air Purifiers & Dehumidifiers', value: 'air-purifiers-dehumidifiers' },
      { label: 'Electrical, Adaptors & Sockets', value: 'electrical-adaptors-sockets' },
      { label: 'Irons & Steamers', value: 'irons-steamers' },
      {
        label: 'Kitchen Appliances', value: 'kitchen-appliances', children: [
          { label: 'BBQ, Grills & Hotpots', value: 'bbq-grills-hotpots' },
          { label: 'Breadmakers', value: 'breadmakers' },
          { label: 'Coffee Machines & Makers', value: 'coffee-machines-makers' },
          { label: 'Cookers', value: 'cookers' },
          { label: 'Dishwasher', value: 'dishwasher' },
          { label: 'Fryers', value: 'fryers' },
          { label: 'Hand & Stand Mixers', value: 'hand-stand-mixers' },
          { label: 'Hobs & Hoods', value: 'hobs-hoods' },
          { label: 'Ice-cream Makers', value: 'ice-cream-makers' },
          { label: 'Juicers, Blenders & Grinders', value: 'juicers-blenders-grinders' },
          { label: 'Kettles & Airpots', value: 'kettles-airpots' },
          { label: 'Other Kitchen Appliances', value: 'kitchen-appliances-other' },
          { label: 'Ovens & Toasters', value: 'ovens-toasters' },
          { label: 'Refrigerators & Freezers', value: 'refrigerators-freezers' },
          { label: 'Water Purifers & Dispensers', value: 'water-purifiers-dispensers' },
          { label: 'Wine Cellar & Storage', value: 'wine-cellar-storage' }
        ]
      },
      { label: 'Other Home Appliances', value: 'home-appliances-other' },
      {
        label: 'TV & Entertainment', value: 'tv-entertainment', children: [
          { label: 'Blu-Ray & Media Players', value: 'blu-ray-media-players' },
          { label: 'Entertainment Systems & Smart Home Devices', value: 'entertainment-smart-home' },
          { label: 'Media Streamers & Hubs', value: 'media-streamers-hubs' },
          { label: 'Projectors', value: 'projectors' },
          { label: 'TV', value: 'tv' },
          { label: 'TV Parts & Accessories', value: 'tv-parts-accessories' }
        ]
      },
      { label: 'Vacuum Cleaner & Housekeeping', value: 'vacuum-cleaner-housekeeping' },
      { label: 'Washing Machines and Dryers', value: 'washing-machines-dryers' },
      { label: 'Water Heater & Instant Showers', value: 'water-heater-instant-showers' }
    ]
  },
  {
    label: 'Tickets & Vouchers', value: 'tickets-vouchers', children: [
      { label: 'Event Tickets', value: 'event-tickets' },
      { label: 'Flights & Overseas Attractions', value: 'flights-overseas-attractions' },
      { label: 'Local Attractions and Transport', value: 'local-attractions-transport' },
      { label: 'Store Credits', value: 'store-credits' },
      { label: 'Vouchers', value: 'vouchers' }
    ]
  },
  {
    label: 'Video Gaming', value: 'video-gaming', children: [
      {
        label: 'Gaming Accessories', value: 'gaming-accessories', children: [
          { label: 'Cables & Chargers', value: 'gaming-cables-chargers' },
          { label: 'Cases & Covers', value: 'gaming-cases-covers' },
          { label: 'Controllers', value: 'controllers' },
          { label: 'Game Gift Cards & Accounts', value: 'game-gift-cards-accounts' },
          { label: 'In-Game Products', value: 'in-game-products' },
          { label: 'Interactive Gaming Figures', value: 'interactive-gaming-figures' },
          { label: 'Virtual Reality', value: 'virtual-reality' }
        ]
      },
      {
        label: 'Video Game Consoles', value: 'video-game-consoles', children: [
          { label: 'Nintendo', value: 'consoles-nintendo' },
          { label: 'Others', value: 'consoles-others' },
          { label: 'PlayStation', value: 'consoles-playstation' },
          { label: 'Xbox', value: 'consoles-xbox' }
        ]
      },
      {
        label: 'Video Games', value: 'video-games', children: [
          { label: 'Nintendo', value: 'games-nintendo' },
          { label: 'Others', value: 'games-others' },
          { label: 'PlayStation', value: 'games-playstation' },
          { label: 'Xbox', value: 'games-xbox' }
        ]
      }
    ]
  },
  {
    label: 'Women\'s Fashion', value: 'womens-fashion', children: [
      { label: 'Activewear', value: 'womens-activewear' },
      {
        label: 'Bags & Wallets', value: 'womens-bags-wallets', children: [
          { label: 'Backpacks', value: 'womens-backpacks' },
          { label: 'Beach Bags', value: 'womens-beach-bags' },
          { label: 'Clutches', value: 'womens-clutches' },
          { label: 'Cross-body Bags', value: 'womens-cross-body-bags' },
          { label: 'Purses & Pouches', value: 'womens-purses-pouches' },
          { label: 'Shoulder Bags', value: 'womens-shoulder-bags' },
          { label: 'Tote Bags', value: 'womens-tote-bags' },
          { label: 'Wallets & Card holders', value: 'womens-wallets' }
        ]
      },
      {
        label: 'Bottoms', value: 'womens-bottoms', children: [
          { label: 'Jeans & Leggings', value: 'womens-jeans-leggings' },
          { label: 'Other Bottoms', value: 'womens-other-bottoms' },
          { label: 'Shorts', value: 'womens-shorts' },
          { label: 'Skirts', value: 'womens-skirts' }
        ]
      },
      { label: 'Coats, Jackets and Outerwear', value: 'womens-coats-jackets-outerwear' },
      {
        label: 'Dresses & Sets', value: 'womens-dresses-sets', children: [
          { label: 'Dresses', value: 'womens-dresses' },
          { label: 'Evening Dresses & Gowns', value: 'evening-dresses-gowns' },
          { label: 'Jumpsuits', value: 'jumpsuits' },
          { label: 'Rompers', value: 'rompers' },
          { label: 'Sets or Coordinates', value: 'womens-sets-coordinates' },
          { label: 'Traditional & Ethnic wear', value: 'traditional-ethnic-wear' }
        ]
      },
      {
        label: 'Footwear', value: 'womens-footwear', children: [
          { label: 'Boots', value: 'womens-boots' },
          { label: 'Flats', value: 'flats' },
          { label: 'Flipflops and Slides', value: 'womens-flipflops-slides' },
          { label: 'Heels', value: 'heels' },
          { label: 'Loafers', value: 'loafers' },
          { label: 'Sandals', value: 'sandals' },
          { label: 'Shoe inserts', value: 'womens-shoe-inserts' },
          { label: 'Sneakers', value: 'womens-sneakers' },
          { label: 'Wedges', value: 'wedges' }
        ]
      },
      {
        label: 'Jewelry & Organisers', value: 'womens-jewelry-organisers', children: [
          { label: 'Accessory holder, box & organisers', value: 'womens-accessory-holders' },
          { label: 'Anklets', value: 'anklets' },
          { label: 'Body Jewelry', value: 'body-jewelry' },
          { label: 'Bracelets', value: 'bracelets' },
          { label: 'Brooches', value: 'brooches' },
          { label: 'Charms', value: 'charms' },
          { label: 'Earrings', value: 'earrings' },
          { label: 'Necklaces', value: 'necklaces' },
          { label: 'Precious Stones', value: 'precious-stones' },
          { label: 'Rings', value: 'rings' }
        ]
      },
      { label: 'Maternity wear', value: 'womens-maternity-wear' },
      {
        label: 'Muslimah Fashion', value: 'womens-muslimah-fashion', children: [
          { label: 'Accessories', value: 'muslimah-accessories' },
          { label: 'Baju Kurung & sets', value: 'baju-kurung-sets' },
          { label: 'Bottoms', value: 'muslimah-bottoms' },
          { label: 'Dresses', value: 'muslimah-dresses' },
          { label: 'Hijabs', value: 'hijabs' },
          { label: 'Kaftans & Jubahs', value: 'kaftans-jubahs' },
          { label: 'Prayer Sets', value: 'prayer-sets' },
          { label: 'Tops', value: 'muslimah-tops' }
        ]
      },
      { label: 'New Undergarments & Loungewear', value: 'womens-new-undergarments-loungewear' },
      {
        label: 'Swimwear', value: 'womens-swimwear', children: [
          { label: 'Bikinis & Swimsuits', value: 'bikinis-swimsuits' },
          { label: 'Muslimah Swimwear', value: 'muslimah-swimwear' },
          { label: 'Rash guard', value: 'rash-guard' }
        ]
      },
      {
        label: 'Tops', value: 'womens-tops', children: [
          { label: 'Blouses', value: 'blouses' },
          { label: 'Longsleeves', value: 'longsleeves' },
          { label: 'Other Tops', value: 'womens-other-tops' },
          { label: 'Shirts', value: 'womens-shirts' },
          { label: 'Sleeveless', value: 'sleeveless' }
        ]
      },
      {
        label: 'Watches & Accessories', value: 'womens-watches-accessories', children: [
          { label: 'Belts', value: 'womens-belts' },
          { label: 'Gloves', value: 'womens-gloves' },
          { label: 'Hair Accessories', value: 'hair-accessories' },
          { label: 'Hats & Beanies', value: 'womens-caps-hats' },
          { label: 'Other Accessories', value: 'womens-accessories-other' },
          { label: 'Scarves', value: 'womens-scarves' },
          { label: 'Socks & Tights', value: 'womens-socks-tights' },
          { label: 'Sunglasses & Eyewear', value: 'womens-sunglasses' },
          { label: 'Watches', value: 'womens-watches' }
        ]
      }
    ]
  }
]

// Top-level categories that are deal-only (no in-app checkout / "buy").
// Everything else is buy-enabled.
export const NON_BUY_CATEGORIES = new Set<string>([
  'announcements',
  'auto-accessories',
  'community',
  'looking-for'
])

// Maps every category slug (at any depth) to its top-level root slug + label.
const rootBySlug = new Map<string, string>()
const labelBySlug = new Map<string, string>()
function indexRoots(nodes: SellCategory[], root: string) {
  for (const node of nodes) {
    rootBySlug.set(node.value, root)
    labelBySlug.set(node.value, node.label)
    if (node.children?.length) indexRoots(node.children, root)
  }
}
for (const top of SELL_CATEGORIES) {
  indexRoots([top], top.value)
}

// Display label for any category slug, e.g. 'earphones' -> 'Earphones'.
export function categoryLabel(slug: string): string {
  return labelBySlug.get(slug) ?? slug
}

// True when the selected category supports in-app checkout ("buy").
export function isBuyCategory(slug: string): boolean {
  const root = rootBySlug.get(slug)
  return root ? !NON_BUY_CATEGORIES.has(root) : true
}

const topLevelLabel = new Map<string, string>(
  SELL_CATEGORIES.map(top => [top.value, top.label])
)

// Label of the selected category's top-level root, e.g. "Computers & Tech".
export function categoryRootLabel(slug: string): string {
  const root = rootBySlug.get(slug)
  return root ? topLevelLabel.get(root) ?? '' : ''
}
