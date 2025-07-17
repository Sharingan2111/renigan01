import './globals.css'

export const metadata = {
  title: 'LudoGift | NFT Подарки & Кейсы',
  description: 'Telegram мини-приложение для открытия кейсов и получения NFT подарков',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className="bg-gray-900 text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
} 