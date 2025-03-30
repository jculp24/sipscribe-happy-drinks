
export const vendors = [
  {
    id: "v1",
    name: "Urban Brew Coffee",
    distance: "0.3 mi",
    rating: 4.8,
    primaryCategory: "Coffee",
    location: { lat: 39.9526, lng: -75.1652 },
    description: "Artisanal coffee shop specializing in pour-overs and espresso drinks.",
    address: "123 Market St, Philadelphia, PA",
    hours: "Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm",
    menu: [
      { id: "m1", name: "Espresso", description: "Double shot of our house blend", price: "1 Credit" },
      { id: "m2", name: "Cappuccino", description: "Espresso with steamed milk and foam", price: "1 Credit" },
      { id: "m3", name: "Cold Brew", description: "Smooth, 24-hour steeped coffee", price: "1 Credit" },
      { id: "m4", name: "Pour Over", description: "Hand-crafted, single origin coffee", price: "2 Credits" }
    ]
  },
  {
    id: "v2",
    name: "Bubble Tea House",
    distance: "0.5 mi",
    rating: 4.5,
    primaryCategory: "Bubble Tea",
    location: { lat: 39.9550, lng: -75.1670 },
    description: "Authentic bubble tea with homemade boba and fresh ingredients.",
    address: "456 Arch St, Philadelphia, PA",
    hours: "Mon-Sun: 11am-9pm",
    menu: [
      { id: "m5", name: "Classic Milk Tea", description: "Black tea with milk and tapioca pearls", price: "1 Credit" },
      { id: "m6", name: "Taro Milk Tea", description: "Creamy taro flavor with tapioca pearls", price: "1 Credit" },
      { id: "m7", name: "Mango Green Tea", description: "Green tea with fresh mango and jellies", price: "1 Credit" },
      { id: "m8", name: "Brown Sugar Boba", description: "Fresh milk with brown sugar syrup and boba", price: "2 Credits" }
    ]
  },
  {
    id: "v3",
    name: "Juice Bar",
    distance: "0.8 mi",
    rating: 4.3,
    primaryCategory: "Juice",
    location: { lat: 39.9510, lng: -75.1630 },
    description: "Cold-pressed juices and smoothies made from organic produce.",
    address: "789 Walnut St, Philadelphia, PA",
    hours: "Mon-Fri: 8am-6pm, Sat-Sun: 9am-5pm",
    menu: [
      { id: "m9", name: "Green Machine", description: "Kale, spinach, apple, cucumber, celery", price: "1 Credit" },
      { id: "m10", name: "Tropical Blast", description: "Pineapple, mango, banana, coconut water", price: "1 Credit" },
      { id: "m11", name: "Berry Bliss", description: "Strawberry, blueberry, raspberry, yogurt", price: "1 Credit" },
      { id: "m12", name: "Detox Elixir", description: "Lemon, ginger, cayenne, apple, activated charcoal", price: "2 Credits" }
    ]
  },
  {
    id: "v4",
    name: "Smoothie Station",
    distance: "1.0 mi",
    rating: 4.6,
    primaryCategory: "Smoothie",
    location: { lat: 39.9540, lng: -75.1610 },
    description: "Protein-packed smoothies and acai bowls for the health-conscious.",
    address: "101 Chestnut St, Philadelphia, PA",
    hours: "Mon-Sun: 7am-8pm",
    menu: [
      { id: "m13", name: "Protein Power", description: "Banana, peanut butter, chocolate protein, almond milk", price: "1 Credit" },
      { id: "m14", name: "Acai Bowl", description: "Acai blend topped with granola, fruit, and honey", price: "2 Credits" },
      { id: "m15", name: "Green Goddess", description: "Spinach, avocado, pineapple, coconut water", price: "1 Credit" },
      { id: "m16", name: "Berry Blast", description: "Mixed berries, banana, almond milk", price: "1 Credit" }
    ]
  },
  {
    id: "v5",
    name: "Craft Kombucha",
    distance: "1.2 mi",
    rating: 4.2,
    primaryCategory: "Kombucha",
    location: { lat: 39.9570, lng: -75.1690 },
    description: "Small-batch, locally brewed kombucha in a variety of flavors.",
    address: "202 Pine St, Philadelphia, PA",
    hours: "Tue-Sun: 10am-6pm, Closed Mon",
    menu: [
      { id: "m17", name: "Original Brew", description: "Classic fermented tea with a tangy finish", price: "1 Credit" },
      { id: "m18", name: "Ginger Lemon", description: "Spicy ginger with bright citrus notes", price: "1 Credit" },
      { id: "m19", name: "Berry Hibiscus", description: "Mixed berries and floral hibiscus", price: "1 Credit" },
      { id: "m20", name: "Seasonal Special", description: "Rotating seasonal flavor", price: "2 Credits" }
    ]
  }
];

export const subscriptionPlans = [
  {
    id: "monthly-basic",
    name: "Basic",
    description: "Perfect for casual visits",
    price: "$19.99/month",
    features: [
      "8 drink credits per month",
      "Standard drinks only",
      "No rollover credits"
    ]
  },
  {
    id: "monthly-premium",
    name: "Premium",
    description: "Our most popular plan",
    price: "$39.99/month",
    features: [
      "20 drink credits per month",
      "Premium drinks included",
      "Rollover up to 5 credits",
      "Bring a friend feature (1x/month)"
    ]
  },
  {
    id: "annual-unlimited",
    name: "Unlimited",
    description: "For the true enthusiast",
    price: "$89.99/month",
    features: [
      "Unlimited standard drinks",
      "Premium drinks included",
      "Priority pickup",
      "Exclusive tastings and events"
    ]
  }
];

export const categories = [
  { id: "coffee", name: "Coffee", icon: "☕" },
  { id: "bubble-tea", name: "Bubble Tea", icon: "🧋" },
  { id: "juice", name: "Juice", icon: "🧃" },
  { id: "smoothie", name: "Smoothie", icon: "🥤" },
  { id: "kombucha", name: "Kombucha", icon: "🍵" }
];

export const user = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex@example.com",
  subscriptionTier: "Premium",
  remainingCredits: 8,
  renewalDate: "2023-05-15",
  favorites: ["v1", "v3"],
  orders: [
    {
      id: "o1",
      date: "2023-04-10",
      vendor: "Urban Brew Coffee",
      item: "Cold Brew",
      status: "completed"
    },
    {
      id: "o2",
      date: "2023-04-08",
      vendor: "Juice Bar",
      item: "Green Machine",
      status: "completed"
    },
    {
      id: "o3",
      date: "2023-04-05",
      vendor: "Bubble Tea House",
      item: "Taro Milk Tea",
      status: "completed"
    }
  ]
};
