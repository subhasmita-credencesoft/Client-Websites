export interface Review {
  id: string;
  author: string;
  avatar?: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  stayType: string;
  source: 'Google Reviews' | 'MakeMyTrip' | 'Agoda';
  verified: boolean;
}

export const REVIEWS_SUMMARY = {
  overallScore: 4.7,
  totalReviews: 161,
  starsBreakdown: {
    5: 82,
    4: 12,
    3: 3,
    2: 2,
    1: 1,
  },
  categories: {
    cleanliness: 4.8,
    foodAndDining: 4.9,
    hospitality: 4.9,
    swimmingPool: 4.7,
    valueForMoney: 4.6,
  },
};

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Sakshi Londhe',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '2 weeks ago',
    title: 'Service is very nice. Staff and owner are very cooperative',
    comment:
      'Service is very nice. Staff and owner are very cooperative. The swimming pool was crystal clear and well maintained. Food was authentic Konkani style — especially the seafood thali which was fresh and mouth watering. Rooms are spacious cottage style with good AC.',
    stayType: 'Family Vacation',
    source: 'Google Reviews',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Girish Dalvi',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: '1 month ago',
    title: 'Peaceful stay & wonderful wellness services',
    comment:
      'The massage services are offered by professionals identified by the owners, which made our weekend truly rejuvenating. Very quiet location away from traffic noise, surrounded by greenery. Highly recommended for couples and families.',
    stayType: 'Weekend Getaway',
    source: 'Google Reviews',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Rohit Kulkarni',
    location: 'Thane, Maharashtra',
    rating: 5,
    date: '3 months ago',
    title: 'Best Maharashtrian Seafood & Pool in Nagaon',
    comment:
      'We stayed here for 2 nights. The highlight was definitely the Surmai fry and Solkadhi served hot at night by the poolside. The rooms are clean, geysers work properly, and the kids enjoyed the pool thoroughly. Nagaon beach is just a quick drive away.',
    stayType: 'Family with Kids',
    source: 'Google Reviews',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Pooja Naik',
    location: 'Navi Mumbai',
    rating: 5,
    date: '4 months ago',
    title: 'Lush green ambiance and pet friendly!',
    comment:
      'It is so difficult to find good pet-friendly resorts in Alibaug. Tarangan Resort welcomed our Golden Retriever with open arms! Big open garden lawns for pets to run around, very helpful team, and calm atmosphere. Will visit again soon.',
    stayType: 'Pet Vacation',
    source: 'Google Reviews',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Aniket Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: '5 months ago',
    title: 'Perfect for group of friends',
    comment:
      'We booked multiple cottages for a friend birthday celebration. The resort arranged an evening bonfire with music, and the staff assisted us with everything. Excellent value for money and peaceful vibe.',
    stayType: 'Friends Getaway',
    source: 'Google Reviews',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Meera Chitalia',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '6 months ago',
    title: 'Clean cottages, pool and delicious veg food',
    comment:
      'Being pure vegetarian we were slightly skeptical, but the resort kitchen prepared authentic Maharashtrian Pithla Bhakri and fresh chapati sabzi that tasted just like home! The swimming pool is sparkling and garden has beautiful flowers.',
    stayType: 'Couple Escape',
    source: 'MakeMyTrip',
    verified: true,
  },
];
