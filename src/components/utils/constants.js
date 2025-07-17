export const GIFT_TYPES = [
  { id: 1, name: 'Jester Hat', emoji: '🃏', rarity: 'common', value: 150 },
  { id: 2, name: 'Lunar Snake', emoji: '🐍', rarity: 'rare', value: 200 },
  { id: 3, name: 'B-Day Candle', emoji: '🎂', rarity: 'common', value: 50 },
  { id: 4, name: 'Pepe FOMO', emoji: '🐸', rarity: 'epic', value: 150 },
  { id: 5, name: 'Locket Love', emoji: '💝', rarity: 'epic', value: 100 },
  { id: 6, name: 'Cap Craze', emoji: '🧢', rarity: 'rare', value: 50 },
  { id: 7, name: 'Peach Treat', emoji: '🍑', rarity: 'common', value: 30 },
  { id: 8, name: 'Bag Burst', emoji: '👜', rarity: 'rare', value: 10 },
  { id: 9, name: 'Watch windfall', emoji: '⌚', rarity: 'common', value: 5 },
  { id: 10, name: 'Bear Bash', emoji: '🧸', rarity: 'common', value: 2 }
]

export const CASE_TYPES = [
  { 
    id: 1, 
    name: 'Starter Box', 
    price: 5, 
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
    emoji: '📦',
    description: 'Обычные подарки',
    drops: ['common']
  },
  { 
    id: 2, 
    name: 'Premium Case', 
    price: 15, 
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    emoji: '💎',
    description: 'Редкие предметы',
    drops: ['rare']
  },
  { 
    id: 3, 
    name: 'Golden Chest', 
    price: 35, 
    color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    emoji: '🏆',
    description: 'Эпические подарки',
    drops: ['epic']
  }
]

export const RARITY_COLORS = {
  common: 'border-gray-400',
  uncommon: 'border-green-400',
  rare: 'border-blue-400',
  epic: 'border-purple-400',
  legendary: 'border-yellow-400'
} 