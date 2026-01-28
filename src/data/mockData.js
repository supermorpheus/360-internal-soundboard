// Mock data for Gang 360 app

export const currentUser = {
  id: 'user-001',
  firstName: 'Yatin',
  lastName: 'Arora',
  email: 'y@supermorpheus.com',
  phone: '+919711493162',
  profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  currentOrganization: 'Supermorpheus',
  currentRole: 'Ops',
  livesIn: 'Delhi',
  city: 'Delhi',
  introduction: 'I am generally content person and a deep thinker. I feel that most of the things that bring us happiness and peace are non-material in nature. I enjoy working with numbers and enjoy analytical puzzles. Born and bought up in Delhi I have done my engineering from NSIT Delhi. I have experience across analytics, market research, B2B businesses. Various experiences in life have led me to a stage that I am more focused to seek answers to my never ending curiosity - why we are in this world and what is the true nature of our life.',
  inspiringQuote: "Cross that bridge when you get to it - I don't know",
  joyOutsideWork: 'Following soccer, spending time on my own or with fellow seekers! going to the gym',
  status: 'super',
  joinedDate: '2024-01-15',
  profileCompletion: 100,
  lifeStories: {
    earlyLife: {
      videoThumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop',
      videoDuration: '10:08',
      tags: ['Cricket', 'Video Games', 'Engineering', 'Mathematics', 'Science', 'Biotechnology', 'Life Purpose', 'PCM', 'Analytics', 'Numbers'],
      hometown: 'New Delhi',
      bornIn: 'New Delhi',
      schools: [{ name: 'New Era Public School, Mayapuri, Delhi' }],
      universities: [{ name: 'NSIT, Delhi' }],
      summary: 'Yatin grew up in a comfortable middle class family in Delhi, with a strong focus on education and values.'
    },
    professional: {
      videoThumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop',
      videoDuration: '17:01',
      tags: ['Biotech', 'Textiles', 'Market Research', 'Data Analytics', 'Tableau', 'Excel', 'Brand Launch', 'Procurement', 'Supply Chain', 'B2B Sales'],
      firstJob: { company: 'Mu Sigma', titles: ['Analyst'] },
      subsequentJobs: [
        { company: 'Grail Research', titles: ['Market Research Analyst'] },
        { company: 'Family Business (Industrial Parts Import & B2B Sales)', titles: ['Operations Manager', 'Procurement Manager', 'Branding Specialist'] },
        { company: 'Bain And Company', titles: ['Senior Specialist', 'Manager', 'Senior Manager'] }
      ],
      summary: 'With about 15 years in analytics-driven roles, Yatin has worked across consulting, market research, and family business.'
    },
    current: {
      videoThumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop',
      videoDuration: '9:22',
      tags: ['Inner Journey', 'Foundation', 'Self-Observation', 'Community Work', 'Spiritual Growth', 'Conscious Living', 'Dwarka'],
      currentCities: ['Dwarka'],
      organizations: [{ name: 'Supermorpheus', role: 'Full-Time Contributor; Fund, Community Management, Foundation Development' }],
      travelCities: ['Pondicherry', 'Chandigarh', 'Jaipur'],
      summary: 'Yatin lives in Dwaraka near the airport with his family, focusing on community building and inner growth.'
    }
  }
}

export const members = [
  {
    id: 'member-001',
    firstName: 'Sameer',
    lastName: 'Guglani',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'Oneness Foundation',
    currentRole: 'Curator',
    livesIn: 'Pondicherry',
    city: 'Pondicherry',
    email: 's@oneness.in',
    phone: '+919878450169',
    introduction: 'Spiritual seeker and community builder. Facilitating inner transformation through conscious living practices.',
    status: 'completed',
    tags: ['Spirituality', 'Community', 'Wellness'],
    joinedDate: '2024-06-15'
  },
  {
    id: 'member-002',
    firstName: 'Gaurav',
    lastName: 'Mittal',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'TechVentures',
    currentRole: 'Founder',
    livesIn: 'Bangalore',
    city: 'Bangalore',
    email: 'gaurav@techventures.in',
    phone: '+919876543210',
    introduction: 'Serial entrepreneur building solutions for emerging markets. Passionate about technology and impact.',
    status: 'completed',
    tags: ['Tech', 'Startup', 'Investing'],
    joinedDate: '2024-08-20'
  },
  {
    id: 'member-003',
    firstName: 'Shivam',
    lastName: 'Dikshit',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'InnovateCo',
    currentRole: 'Co-Founder / CRO',
    livesIn: 'Noida',
    city: 'Noida',
    email: 'shivam.dikshit1@gmail.com',
    phone: '+919997125911',
    introduction: 'I have been an entrepreneur since college. Previously built ventures in IT consulting and digital marketing. Now focusing on B2B SaaS.',
    status: 'active',
    tags: ['SaaS', 'Sales', 'Growth'],
    joinedDate: '2025-01-10'
  },
  {
    id: 'member-004',
    firstName: 'Arun',
    lastName: 'Goyat',
    profilePicture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'CodeQuotient',
    currentRole: 'Founder',
    livesIn: 'Panchkula',
    city: 'Panchkula',
    email: 'arun@codequotient.com',
    phone: '+919899662601',
    introduction: 'My entrepreneurial journey has always been about empowering the youth from tier 2 and tier 3 cities through quality tech education.',
    status: 'active',
    tags: ['EdTech', 'Coding', 'Youth'],
    joinedDate: '2025-01-12'
  },
  {
    id: 'member-005',
    firstName: 'Priya',
    lastName: 'Sharma',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'HealthFirst',
    currentRole: 'CEO',
    livesIn: 'Mumbai',
    city: 'Mumbai',
    email: 'priya@healthfirst.in',
    phone: '+919876543211',
    introduction: 'Healthcare technology leader focused on making quality healthcare accessible to all Indians.',
    status: 'completed',
    tags: ['HealthTech', 'Impact', 'Leadership'],
    joinedDate: '2024-03-10'
  },
  {
    id: 'member-006',
    firstName: 'Vikram',
    lastName: 'Singh',
    profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'GreenTech Solutions',
    currentRole: 'CTO',
    livesIn: 'Hyderabad',
    city: 'Hyderabad',
    email: 'vikram@greentech.co',
    phone: '+919876543212',
    introduction: 'Building sustainable technology solutions for a greener future. 15+ years in clean energy.',
    status: 'completed',
    tags: ['CleanTech', 'Sustainability', 'Engineering'],
    joinedDate: '2024-05-22'
  }
]

export const newMembers = members.filter(m => m.status === 'active')

export const stats = {
  totalMembers: 797,
  newMembersThisMonth: 23,
  newMembersThisWeek: 5,
  upcomingEvents: 1
}

export const events = [
  {
    id: 'event-001',
    title: 'Gurukul 2025',
    date: 'Mar 15-20',
    location: 'Pondicherry',
    attendees: 45
  },
  {
    id: 'event-002',
    title: 'Delhi Meetup',
    date: 'Feb 8',
    location: 'Delhi',
    attendees: 12
  }
]
