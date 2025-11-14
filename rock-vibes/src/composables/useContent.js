import gearImage from '@/assets/images/news/gear.jpg'
import routesImage from '@/assets/images/news/routes.jpg'
import trainingImage from '@/assets/images/news/training.jpg'
import climb1Image from '@/assets/images/climbing/climb-1.jpg'
import climb2Image from '@/assets/images/climbing/climb-2.jpg'
import climb3Image from '@/assets/images/climbing/clim-3.jpg'
import boulderImage from '@/assets/images/climbing/boulder.jpg'
import trainingGymImage from '@/assets/images/climbing/training.jpg'
import instructorImage from '@/assets/images/climbing/instructor.jpg'
import classesImage from '@/assets/images/climbing/StockCake-climbers_classes_Images_and_Photos_1763130252.jpg'

export function useContent() {

  
  const navigation = [
    { name: 'CLIMBING GYM', href: '#climbing-gym' },
    // { name: 'NEW HERE?', href: '#new-here' },
    { name: 'OFFERINGS', href: '#offerings' },
    { name: 'SERVICE', href: '#service' },
    // { name: 'EVENTS', href: '#events' },
    // { name: 'BISTRO', href: '#bistro' },
    { name: 'CONTACT', href: '#contact' }
  ]

  const hero = {
    title: '',
    tagline: 'Indoor climbing. Outdoor spirit.',
    cta: 'START TODAY',
    images: [
      '/images/ropes-pink.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782861.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782894.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782911.jpg'
    ]
  }

  const news = {
    title: 'NEWS',
    subtitle: 'AT THE ROCKVIBES CLIMBING CENTER',
    items: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop',
        date: 'November 5, 2024',
        title: 'Winter Season Opening',
        excerpt: 'Join us for the official winter season opening with special climbing events and competitions.',
        link: '#'
      },
      {
        id: 2,
        image: routesImage,
        date: 'November 1, 2024',
        title: 'New Boulder Routes',
        excerpt: 'Explore our newly designed boulder routes created by world-class route setters.',
        link: '#'
      },
      {
        id: 3,
        image: trainingImage,
        date: 'October 28, 2024',
        title: 'Professional Training Program',
        excerpt: 'Sign up for our advanced training program designed for competitive climbers.',
        link: '#'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop',
        date: 'October 25, 2024',
        title: 'Kids Climbing Camp',
        excerpt: 'Special climbing camp for children during the holiday season. Limited spots available.',
        link: '#'
      },
      {
        id: 5,
        image:gearImage,
        date: 'October 20, 2024',
        title: 'Equipment Sale',
        excerpt: 'Get up to 30% off on selected climbing equipment and gear at our pro shop.',
        link: '#'
      },
      {
        id: 6,
        image:routesImage,
        date: 'October 15, 2024',
        title: 'Bistro Menu Update',
        excerpt: 'New seasonal menu items now available at the KI Bistro. Fresh, healthy options for climbers.',
        link: '#'
      }
    ]
  }

  const climbingCenter = {
    title: 'CLIMBING CENTER',
    subtitle: 'WE CLIMB FOR YOUR MOUNTAIN LIFE',
    description: 'Experience one of the world\'s largest and most modern climbing facilities. With over 2,000 square meters of climbing and bouldering space, we offer routes for all skill levels.',
    services: [
      {
        id: 1,
        image: climb1Image,
        name: 'CLIMBING',
        description: 'Over 200 routes from beginner to expert level'
      },
      {
        id: 2,
        image: boulderImage,
        name: 'BOULDERING',
        description: 'World-class bouldering area with dynamic routes'
      },
      {
        id: 3,
        image: trainingGymImage,
        name: 'TRAINING',
        description: 'Dedicated training area with campus boards and hangboards'
      },
      {
        id: 4,
        image: instructorImage,
        name: 'COURSES',
        description: 'Professional instruction for all levels'
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
        name: 'BISTRO',
        description: 'Healthy food and refreshments for climbers'
      }
    ]
  }

  const offerings = {
    title: 'OFFERINGS',
    subtitle: 'WHAT\'S IN IT FOR YOU?',
    items: [
      {
        id: 1,
        icon: 'memberships',
        image: climb1Image,
        name: 'MEMBERSHIPS',
        description: 'Flexible membership options for all climbers',
        link: '#'
      },
      {
        id: 2,
        icon: 'day-passes',
        image: boulderImage,
        name: 'DAY PASSES',
        description: 'Single day access to all facilities',
        link: '#'
      },
      {
        id: 3,
        icon: 'equipment',
        image: gearImage,
        name: 'EQUIPMENT',
        description: 'Rental equipment and pro shop',
        link: '#'
      },
      {
        id: 4,
        icon: 'personal-training',
        image: instructorImage,
        name: 'PERSONAL TRAINING',
        description: 'One-on-one coaching with certified instructors',
        link: '#'
      },
      {
        id: 5,
        icon: 'private-events',
        image: classesImage,
        name: 'PRIVATE EVENTS',
        description: 'Book the facility for corporate events and parties',
        link: '#'
      }
    ]
  }

  const service = {
    title: 'SERVICE',
    subtitle: 'HOW CAN WE HELP YOU?',
    items: [
      {
        id: 1,
        icon: 'beginner',
        name: 'BEGINNER FRIENDLY',
        description: 'Introduction courses and easy routes for first-timers',
        link: '#'
      },
      {
        id: 2,
        icon: 'pro-training',
        name: 'PRO TRAINING',
        description: 'Advanced training programs for competitive climbers',
        link: '#'
      },
      {
        id: 3,
        icon: 'kids',
        name: 'KIDS PROGRAMS',
        description: 'Safe and fun climbing activities for children',
        link: '#'
      },
      {
        id: 4,
        icon: 'groups',
        name: 'GROUP BOOKINGS',
        description: 'Special rates for groups and team building',
        link: '#'
      },
      {
        id: 5,
        icon: 'shop',
        name: 'PRO SHOP',
        description: 'Premium climbing gear and equipment',
        link: '#'
      },
      {
        id: 6,
        icon: 'events',
        name: 'SPECIAL EVENTS',
        description: 'Competitions, workshops, and community gatherings',
        link: '#'
      }
    ]
  }

  const gallery = {
    title: 'GALLERY',
    subtitle: 'EXPERIENCE KI CLIMBING CENTER',
    images: [
      { id: 1, src: '/images/gallery-1.jpg', alt: 'Main climbing wall' },
      { id: 2, src: '/images/gallery-2.jpg', alt: 'Bouldering area' },
      { id: 3, src: '/images/gallery-3.jpg', alt: 'Training zone' },
      { id: 4, src: '/images/gallery-4.jpg', alt: 'Kids climbing' },
      { id: 5, src: '/images/gallery-5.jpg', alt: 'Bistro area' },
      { id: 6, src: '/images/gallery-6.jpg', alt: 'Competition wall' },
      { id: 7, src: '/images/gallery-7.jpg', alt: 'Outdoor terrace' },
      { id: 8, src: '/images/gallery-8.jpg', alt: 'Equipment rental' }
    ]
  }

  const contact = {
    title: 'CONTACT',
    subtitle: 'GET IN TOUCH',
    info: {
      address: {
        street: 'Matthias-Schmid-Straße 12c',
        city: '6020 Innsbruck',
        country: 'Austria'
      },
      phone: '+43 512 39 73 40',
      email: 'info@ki-climbing.at',
      hours: {
        weekdays: 'Mon-Fri: 9:00 - 23:00',
        weekend: 'Sat-Sun: 9:00 - 22:00'
      }
    },
    map: {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.234567890123!2d11.123456789!3d47.234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE0JzA0LjQiTiAxMcKwMDcnMjQuNCJF!5e0!3m2!1sen!2sat!4v1234567890123!5m2!1sen!2sat'
    }
  }

  const footer = {
    columns: {
      hours: {
        title: 'OPENING HOURS',
        items: [
          'Mon-Fri: 10:00 - 22:00',
          'Sat-Sun: 9:00 - 21:00',
          '',
          'Public Holidays: 10:00 - 19:00'
        ]
      },
      contact: {
        title: 'CONTACT',
        items: [
          'Calle Licenciado Poza, 45',
          '48013 Bilbao, Spain',
          '',
          '+34 944 123 456',
          'info@rockvibes-bilbao.com'
        ]
      },
      links: {
        title: 'QUICK LINKS',
        items: [
          { name: 'About Us', href: '#' },
          { name: 'Pricing', href: '#' },
          { name: 'Schedule', href: '#' },
          { name: 'Safety Rules', href: '#' },
          { name: 'FAQ', href: '#' },
          { name: 'Newsletter', href: '#' }
        ]
      },
      social: {
        title: 'FOLLOW US',
        items: [
          { name: 'Facebook', href: '#', icon: 'facebook' },
          { name: 'Instagram', href: '#', icon: 'instagram' },
          { name: 'YouTube', href: '#', icon: 'youtube' },
          { name: 'Twitter', href: '#', icon: 'twitter' }
        ]
      }
    },
    partners: [
      { name: 'Partner 1', logo: '/images/partner-1.png' },
      { name: 'Partner 2', logo: '/images/partner-2.png' },
      { name: 'Partner 3', logo: '/images/partner-3.png' }
    ],
    copyright: '© 2024 Rock Vibes Climbing Center. All rights reserved.',
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' }
    ]
  }

  return {
    navigation,
    hero,
    news,
    climbingCenter,
    offerings,
    service,
    gallery,
    contact,
    footer
  }
}
