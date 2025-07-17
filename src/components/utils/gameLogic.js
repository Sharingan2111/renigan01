import { GIFT_TYPES } from './constants'

export const generateSpinItems = (winningItem, totalItems = 50, winningPosition = 47) => {
  const spinItems = []
  
  for (let i = 0; i < totalItems; i++) {
    if (i === winningPosition) {
      spinItems.push(winningItem)
    } else {
      const randomItem = GIFT_TYPES[Math.floor(Math.random() * GIFT_TYPES.length)]
      spinItems.push(randomItem)
    }
  }
  
  return spinItems
}

export const getRandomGift = (allowedRarities) => {
  const filteredGifts = GIFT_TYPES.filter(gift => allowedRarities.includes(gift.rarity))
  return filteredGifts[Math.floor(Math.random() * filteredGifts.length)]
}

export const calculateWinRate = (wins, totalGames) => {
  if (totalGames === 0) return 0
  return +((wins / totalGames) * 100).toFixed(1)
}

export const formatBalance = (balance) => {
  return balance.toFixed(3)
} 