import type { NavigationMenuItem } from '@nuxt/ui'

export const categories = [
  {
    label: 'Fashion',
    icon: 'i-lucide-shirt',
    children: [
      {
        label: 'Women Fashion',
        avatar: { src: '/explore/women_fashion.png' },
        icon: 'i-lucide-user',
        to: '/shop?category=womens'
      },
      {
        label: 'Men\'s Fashion',
        avatar: { src: '/explore/men_fashion.png' },
        icon: 'i-lucide-user-round',
        to: '/shop?category=mens'
      },
      {
        label: 'Beauty & Personal Care',
        avatar: { src: '/explore/beauty_personal_care.png' },
        icon: 'i-lucide-sparkles',
        to: '/shop?category=beauty'
      },
      {
        label: 'Luxury',
        avatar: { src: '/explore/luxury.png' },
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
        avatar: { src: '/explore/everything_else.png' },
        icon: 'i-lucide-archive',
        to: '/shop?category=collectibles'
      },
      {
        label: 'Toys & Games',
        avatar: { src: '/explore/hobbies_toys.png' },
        icon: 'i-lucide-puzzle',
        to: '/shop?category=toys'
      },
      {
        label: 'Sports Equipment',
        avatar: { src: '/explore/sports_equipment.png' },
        icon: 'i-lucide-dumbbell',
        to: '/shop?category=sports'
      },
      {
        label: 'Books & Magazines',
        avatar: { src: '/explore/everything_else.png' },
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
        avatar: { src: '/explore/mobile_phone_gadgets.png' },
        icon: 'i-lucide-smartphone',
        to: '/shop?category=mobile'
      },
      {
        label: 'Computers & Tech',
        avatar: { src: '/explore/computers_tech.png' },
        icon: 'i-lucide-monitor',
        to: '/shop?category=computers'
      },
      {
        label: 'Video Gaming',
        avatar: { src: '/explore/video_gaming.png' },
        icon: 'i-lucide-gamepad',
        to: '/shop?category=gaming'
      },
      {
        label: 'Audio',
        avatar: { src: '/explore/music.png' },
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
        avatar: { src: '/explore/furniture_home_living.png' },
        icon: 'i-lucide-sofa',
        to: '/shop?category=furniture'
      },
      {
        label: 'Babies & Kids',
        avatar: { src: '/explore/babies_kids.png' },
        icon: 'i-lucide-baby',
        to: '/shop?category=babies'
      },
      {
        label: 'Pet Supplies',
        avatar: { src: '/explore/pet_supplies.png' },
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
        avatar: { src: '/explore/property.png' },
        icon: 'i-lucide-building',
        to: '/shop?category=property'
      },
      {
        label: 'Cars',
        avatar: { src: '/explore/cars.png' },
        icon: 'i-lucide-car-front',
        to: '/shop?category=cars'
      },
      {
        label: 'Motorbikes',
        avatar: { src: '/explore/motorbikes.png' },
        icon: 'i-lucide-bike',
        to: '/shop?category=motorbikes'
      }
    ]
  }
] satisfies Array<NavigationMenuItem>
