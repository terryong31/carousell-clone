import type { NavigationMenuItem } from '@nuxt/ui'

export const categories = [
  {
    label: 'Fashion',
    icon: 'i-lucide-shirt',
    children: [
      {
        label: 'Women Fashion',
        icon: 'i-lucide-user',
        to: '/shop?category=womens'
      },
      {
        label: 'Men\'s Fashion',
        icon: 'i-lucide-user-round',
        to: '/shop?category=mens'
      },
      {
        label: 'Beauty & Personal Care',
        icon: 'i-lucide-sparkles',
        to: '/shop?category=beauty'
      },
      {
        label: 'Luxury',
        icon: 'i-lucide-gem',
        to: '/shop?category=luxury'
      }
    ]
  },
  {
    label: 'Hobbies & Toys',
    icon: 'i-lucide-gamepad-2',
    children: [
      {
        label: 'Collectibles',
        icon: 'i-lucide-archive',
        to: '/shop?category=collectibles'
      },
      {
        label: 'Toys & Games',
        icon: 'i-lucide-puzzle',
        to: '/shop?category=toys'
      },
      {
        label: 'Sports Equipment',
        icon: 'i-lucide-dumbbell',
        to: '/shop?category=sports'
      },
      {
        label: 'Books & Magazines',
        icon: 'i-lucide-book-open',
        to: '/shop?category=books'
      }
    ]
  },
  {
    label: 'Electronics',
    icon: 'i-lucide-cpu',
    children: [
      {
        label: 'Mobile Phones',
        icon: 'i-lucide-smartphone',
        to: '/shop?category=mobile'
      },
      {
        label: 'Computers & Tech',
        icon: 'i-lucide-monitor',
        to: '/shop?category=computers'
      },
      {
        label: 'Video Gaming',
        icon: 'i-lucide-gamepad',
        to: '/shop?category=gaming'
      },
      {
        label: 'Audio',
        icon: 'i-lucide-headphones',
        to: '/shop?category=audio'
      }
    ]
  },
  {
    label: 'Living',
    icon: 'i-lucide-home',
    children: [
      {
        label: 'Furniture',
        icon: 'i-lucide-sofa',
        to: '/shop?category=furniture'
      },
      {
        label: 'Babies & Kids',
        icon: 'i-lucide-baby',
        to: '/shop?category=babies'
      },
      {
        label: 'Pet Supplies',
        icon: 'i-lucide-cat',
        to: '/shop?category=pets'
      }
    ]
  },
  {
    label: 'Cars & Property',
    icon: 'i-lucide-car',
    children: [
      {
        label: 'Property',
        icon: 'i-lucide-building',
        to: '/shop?category=property'
      },
      {
        label: 'Cars',
        icon: 'i-lucide-car-front',
        to: '/shop?category=cars'
      },
      {
        label: 'Motorbikes',
        icon: 'i-lucide-bike',
        to: '/shop?category=motorbikes'
      }
    ]
  }
] satisfies Array<NavigationMenuItem>
