export const vendors = [
  {
    id: "v1",
    name: "Cola Corner",
    distance: "0.3 mi",
    rating: 4.8,
    primaryCategory: "Soda",
    location: { lat: 39.9526, lng: -75.1652 },
    description: "Refreshing Coca-Cola products served ice cold.",
    address: "123 Market St, Philadelphia, PA",
    hours: "Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm",
    menu: [
      { id: "m1", name: "Coca-Cola Classic", description: "The original and iconic cola", price: "1 Credit" },
      { id: "m2", name: "Diet Coke", description: "Zero calories with classic taste", price: "1 Credit" },
      { id: "m3", name: "Coca-Cola Zero Sugar", description: "Zero sugar with full flavor", price: "1 Credit" },
      { id: "m4", name: "Cherry Coca-Cola", description: "Classic cola with cherry flavor", price: "1 Credit" }
    ]
  },
  {
    id: "v2",
    name: "Sprite Spot",
    distance: "0.5 mi",
    rating: 4.5,
    primaryCategory: "Soda",
    location: { lat: 39.9550, lng: -75.1670 },
    description: "Crisp, refreshing lemon-lime drinks to quench your thirst.",
    address: "456 Arch St, Philadelphia, PA",
    hours: "Mon-Sun: 11am-9pm",
    menu: [
      { id: "m5", name: "Sprite", description: "Crisp, refreshing lemon-lime taste", price: "1 Credit" },
      { id: "m6", name: "Sprite Zero Sugar", description: "Zero sugar with classic sprite taste", price: "1 Credit" },
      { id: "m7", name: "Sprite Cherry", description: "Lemon-lime with a hint of cherry", price: "1 Credit" },
      { id: "m8", name: "Sprite Tropical Mix", description: "Tropical fruit flavors mixed with sprite", price: "1 Credit" }
    ]
  },
  {
    id: "v3",
    name: "Fanta Factory",
    distance: "0.8 mi",
    rating: 4.3,
    primaryCategory: "Soda",
    location: { lat: 39.9510, lng: -75.1630 },
    description: "Colorful, fruit-flavored sodas that bring the fun.",
    address: "789 Walnut St, Philadelphia, PA",
    hours: "Mon-Fri: 8am-6pm, Sat-Sun: 9am-5pm",
    menu: [
      { id: "m9", name: "Fanta Orange", description: "Classic orange flavor with a fruity taste", price: "1 Credit" },
      { id: "m10", name: "Fanta Grape", description: "Bold grape flavor with a sweet finish", price: "1 Credit" },
      { id: "m11", name: "Fanta Strawberry", description: "Sweet strawberry taste with a fruity aroma", price: "1 Credit" },
      { id: "m12", name: "Fanta Pineapple", description: "Tropical pineapple flavor that's refreshing", price: "1 Credit" }
    ]
  },
  {
    id: "v4",
    name: "Minute Maid Station",
    distance: "1.0 mi",
    rating: 4.6,
    primaryCategory: "Juice",
    location: { lat: 39.9540, lng: -75.1610 },
    description: "Refreshing fruit juices that taste like they're fresh-squeezed.",
    address: "101 Chestnut St, Philadelphia, PA",
    hours: "Mon-Sun: 7am-8pm",
    menu: [
      { id: "m13", name: "Minute Maid Lemonade", description: "Classic lemonade with the perfect balance of sweet and tart", price: "1 Credit" },
      { id: "m14", name: "Minute Maid Orange Juice", description: "100% orange juice with a bright, fresh taste", price: "1 Credit" },
      { id: "m15", name: "Minute Maid Fruit Punch", description: "Blend of fruit flavors for a sweet, tropical taste", price: "1 Credit" },
      { id: "m16", name: "Minute Maid Apple Juice", description: "Crisp apple flavor made from concentrate", price: "1 Credit" }
    ]
  },
  {
    id: "v5",
    name: "Dasani Refreshment",
    distance: "1.2 mi",
    rating: 4.2,
    primaryCategory: "Water",
    location: { lat: 39.9570, lng: -75.1690 },
    description: "Pure, refreshing water and flavored water options.",
    address: "202 Pine St, Philadelphia, PA",
    hours: "Tue-Sun: 10am-6pm, Closed Mon",
    menu: [
      { id: "m17", name: "Dasani Purified Water", description: "Clean, fresh tasting water enhanced with minerals", price: "1 Credit" },
      { id: "m18", name: "Dasani Lemon", description: "Purified water with a hint of lemon flavor", price: "1 Credit" },
      { id: "m19", name: "Dasani Strawberry", description: "Light strawberry flavor with zero calories", price: "1 Credit" },
      { id: "m20", name: "Dasani Lime", description: "Refreshing lime-infused water", price: "1 Credit" }
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
  { id: "soda", name: "Soda", icon: "🥤" },
  { id: "diet-soda", name: "Diet Soda", icon: "🥤" },
  { id: "juice", name: "Juice", icon: "🧃" },
  { id: "water", name: "Water", icon: "💧" },
  { id: "flavored-water", name: "Flavored Water", icon: "💦" }
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
