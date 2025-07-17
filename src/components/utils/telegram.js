export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp
    
    // Инициализация
    tg.ready()
    tg.expand()
    tg.enableClosingConfirmation()
    
    // Настройка темы
    tg.setHeaderColor('#111827') // bg-gray-900
    tg.setBackgroundColor('#111827')
    
    return tg
  }
  
  return null
}

export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const user = window.Telegram.WebApp.initDataUnsafe?.user
    
    if (user) {
      return {
        id: user.id,
        first_name: user.first_name || 'Игрок',
        last_name: user.last_name || '',
        username: user.username || 'player',
        language_code: user.language_code || 'ru'
      }
    }
  }
  
  return {
    id: 0,
    first_name: 'Игрок',
    last_name: '',
    username: 'player',
    language_code: 'ru'
  }
}

export const hapticFeedback = (type = 'light') => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
    const feedback = window.Telegram.WebApp.HapticFeedback
    
    switch (type) {
      case 'light':
        feedback.impactOccurred('light')
        break
      case 'medium':
        feedback.impactOccurred('medium')
        break
      case 'heavy':
        feedback.impactOccurred('heavy')
        break
      case 'success':
        feedback.notificationOccurred('success')
        break
      case 'warning':
        feedback.notificationOccurred('warning')
        break
      case 'error':
        feedback.notificationOccurred('error')
        break
      default:
        feedback.impactOccurred('light')
    }
  }
}

export const shareToTelegram = (text, url) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const shareText = encodeURIComponent(text)
    const shareUrl = encodeURIComponent(url)
    window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${shareUrl}&text=${shareText}`)
  }
} 