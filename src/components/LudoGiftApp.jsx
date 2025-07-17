import React, { useState, useEffect } from 'react'
import { Settings, User, Gift, TrendingUp, Trophy, Package, Send, Gamepad2, Star, RotateCcw, Clock } from 'lucide-react'
import TonWalletNoSSR from './TonWalletNoSSR'

const LudoGiftApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [showModal, setShowModal] = useState(null)
  const [inventory, setInventory] = useState([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinningItems, setSpinningItems] = useState([])
  const [selectedGift, setSelectedGift] = useState(null)
  const [pvpSpinning, setPvpSpinning] = useState(false)

  // PVP вкладки
  const [pvpTab, setPvpTab] = useState('roulette')
  const [coinflipSide, setCoinflipSide] = useState('heads')
  const [coinflipBet, setCoinflipBet] = useState(1)
  const [coinflipResult, setCoinflipResult] = useState(null)
  const [coinflipHistory, setCoinflipHistory] = useState([])
  const [coinflipFlipping, setCoinflipFlipping] = useState(false)

  const [userStats, setUserStats] = useState({
    name: 'Игрок',
    username: '@player',
    balance: 100,
    stars: 0,
    activity: 0,
    earned: 0,
    level: 'Новичок',
    gamesPlayed: 0,
    wins: 0,
    winRate: 0,
    streak: 0,
    totalValue: 0
  })

  const [pvpGames, setPvpGames] = useState([
    {
      id: 418,
      status: 'waiting',
      players: 1,
      totalBank: 1.27,
      yourStake: 0.07,
      date: '08.07.2025, 17:09',
      participants: [
        { name: 'Вы', stake: 0.07, chance: 5.9, avatar: '💝', gift: 'Heart' }
      ]
    }
  ])

  // Получение данных пользователя Telegram
  const [telegramUser, setTelegramUser] = useState({
    first_name: 'Игрок',
    username: 'player'
  })

  useEffect(() => {
    // Получение данных от Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      const user = tg.initDataUnsafe?.user
      
      if (user) {
        setTelegramUser({
          first_name: user.first_name || 'Игрок',
          username: user.username || 'player'
        })
        setUserStats(prev => ({
          ...prev,
          name: user.first_name || 'Игрок',
          username: '@' + (user.username || 'player')
        }))
      }
    }

    // Симуляция реального времени
    const interval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        activity: +(prev.activity + Math.random() * 0.1).toFixed(1),
        earned: +(prev.earned + Math.random() * 0.01).toFixed(3)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const giftTypes = [
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

  const caseTypes = [
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

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400'
      case 'rare': return 'border-blue-400'
      case 'epic': return 'border-purple-400'
      default: return 'border-gray-400'
    }
  }

  const openCase = (caseType) => {
    if (userStats.balance < caseType.price) {
      alert('Недостаточно средств!')
      return
    }

    // Вибрация при открытии кейса
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')
    }

    setIsSpinning(true)
    setUserStats(prev => ({ 
      ...prev, 
      balance: +(prev.balance - caseType.price).toFixed(3),
      gamesPlayed: prev.gamesPlayed + 1 
    }))

    const filteredGifts = giftTypes.filter(gift => caseType.drops.includes(gift.rarity))
    const randomGift = filteredGifts[Math.floor(Math.random() * filteredGifts.length)]
    
    const spinItems = []
    for (let i = 0; i < 50; i++) {
      if (i === 47) {
        spinItems.push(randomGift)
      } else {
        const randomItem = giftTypes[Math.floor(Math.random() * giftTypes.length)]
        spinItems.push(randomItem)
      }
    }
    
    setSpinningItems(spinItems)

    setTimeout(() => {
      const newItem = { ...randomGift, id: Date.now() }
      
      setInventory(prev => [...prev, newItem])
      setUserStats(prev => ({ 
        ...prev, 
        earned: +(prev.earned + randomGift.value * 0.001).toFixed(3),
        wins: prev.wins + 1,
        winRate: +((prev.wins + 1) / (prev.gamesPlayed) * 100).toFixed(1),
        streak: prev.streak + 1,
        totalValue: +(prev.totalValue + randomGift.value).toFixed(2)
      }))
      
      // Успешная вибрация
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success')
      }
      
      setIsSpinning(false)
      setShowModal({ type: 'reward', gift: randomGift })
    }, 4000)
  }

  const addBalance = (amount) => {
    setUserStats(prev => ({ 
      ...prev, 
      balance: +(prev.balance + amount).toFixed(3) 
    }))
    
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }
  }

  const startPvpGame = () => {
    if (!selectedGift) {
      alert('Выберите подарок для ставки!')
      return
    }

    setPvpSpinning(true)
    
    setTimeout(() => {
      const newGame = {
        id: Date.now(),
        status: 'finished',
        players: 2,
        totalBank: selectedGift.value + Math.random() * 10,
        yourStake: selectedGift.value,
        date: new Date().toLocaleString('ru-RU'),
        winner: Math.random() > 0.5 ? 'Вы' : 'Opponent',
        participants: [
          { name: 'Вы', stake: selectedGift.value, chance: 50, avatar: selectedGift.emoji, gift: selectedGift.name }
        ]
      }

      setPvpGames(prev => [newGame, ...prev])
      setSelectedGift(null)
      setPvpSpinning(false)
      
      if (newGame.winner === 'Вы') {
        setUserStats(prev => ({ 
          ...prev, 
          wins: prev.wins + 1,
          totalValue: +(prev.totalValue + newGame.totalBank).toFixed(2)
        }))
      }
    }, 3000)
  }

  // Coinflip логика
  const handleCoinflip = () => {
    if (userStats.balance < coinflipBet) {
      alert('Недостаточно средств!')
      return
    }
    setCoinflipFlipping(true)
    setUserStats(prev => ({ ...prev, balance: +(prev.balance - coinflipBet).toFixed(3) }))
    setTimeout(() => {
      const win = Math.random() < 0.5 ? 'heads' : 'tails'
      const isWin = win === coinflipSide
      if (isWin) {
        setUserStats(prev => ({ ...prev, balance: +(prev.balance + coinflipBet * 1.95).toFixed(3) }))
      }
      setCoinflipResult({ win, isWin, bet: coinflipBet, side: coinflipSide, ts: Date.now() })
      setCoinflipHistory(prev => [
        { win, isWin, bet: coinflipBet, side: coinflipSide, ts: Date.now() },
        ...prev.slice(0, 19)
      ])
      setCoinflipFlipping(false)
    }, 1800)
  }

  // Coinflip UI
  const CoinflipScreen = () => {
    const [showingSide, setShowingSide] = useState(coinflipSide)
    useEffect(() => {
      if (coinflipFlipping) {
        setTimeout(() => {
          setShowingSide(coinflipResult ? coinflipResult.win : (Math.random() < 0.5 ? 'heads' : 'tails'))
        }, 600)
      } else {
        setShowingSide(coinflipSide)
      }
    }, [coinflipFlipping, coinflipSide, coinflipResult])

    return (
      <div className="flex flex-col items-center py-2 px-2">
        <div className="w-full sticky top-0 z-10 bg-gray-900 pb-2">
          <h2 className="text-xl font-bold text-center text-white py-2">Орел и Решка</h2>
        </div>
        <div className="flex gap-2 mb-2 w-full justify-center">
          <button
            className={`flex-1 px-0 py-3 rounded-lg font-bold border-2 text-lg transition-all ${coinflipSide === 'heads' ? 'bg-blue-500 text-white border-blue-600 shadow-md' : 'bg-gray-800 text-gray-200 border-gray-700'}`}
            onClick={() => setCoinflipSide('heads')}
            disabled={coinflipFlipping}
          >ОРЁЛ</button>
          <button
            className={`flex-1 px-0 py-3 rounded-lg font-bold border-2 text-lg transition-all ${coinflipSide === 'tails' ? 'bg-pink-500 text-white border-pink-600 shadow-md' : 'bg-gray-800 text-gray-200 border-gray-700'}`}
            onClick={() => setCoinflipSide('tails')}
            disabled={coinflipFlipping}
          >РЕШКА</button>
        </div>
        <div className="mb-2 w-full max-w-xs">
          <input
            type="range"
            min={1}
            max={Math.max(1, Math.floor(userStats.balance))}
            value={coinflipBet}
            onChange={e => setCoinflipBet(Number(e.target.value))}
            disabled={coinflipFlipping}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1 TON</span>
            <span>{Math.floor(userStats.balance)} TON</span>
          </div>
          <div className="text-center mt-1 text-base font-bold text-blue-500">Ставка: {coinflipBet} TON</div>
        </div>
        <div className="my-2 flex flex-col items-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl shadow border-2 border-blue-400 coinflip-anim ${coinflipFlipping ? '' : ''}`}
              style={{fontFamily: 'system-ui, sans-serif'}}>
              {showingSide === 'heads' ? '🦅' : '💰'}
            </div>
          </div>
          <button
            className="mt-4 w-full max-w-xs py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold text-lg shadow-md disabled:opacity-60"
            onClick={handleCoinflip}
            disabled={coinflipFlipping || userStats.balance < coinflipBet}
          >{coinflipFlipping ? 'Бросаем...' : 'Бросить монетку'}</button>
          {coinflipResult && !coinflipFlipping && (
            <div className="mt-2 text-lg font-bold text-center">
              {coinflipResult.isWin
                ? <span className="text-green-500">Победа! +{(coinflipResult.bet * 1.95).toFixed(2)} TON</span>
                : <span className="text-red-400">Поражение</span>
              }
              <div className="text-gray-400 text-xs mt-1">Выпало: {coinflipResult.win === 'heads' ? 'ОРЁЛ' : 'РЕШКА'}</div>
            </div>
          )}
        </div>
        <div className="w-full max-w-md mt-2">
          <h4 className="text-white text-base font-bold mb-1">История игр</h4>
          <div className="bg-gray-800 rounded-xl p-2 max-h-32 overflow-y-auto text-sm">
            {coinflipHistory.length === 0 && <div className="text-gray-400 text-center">Нет игр</div>}
            {coinflipHistory.map((h, i) => (
              <div key={h.ts + i} className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
                <span>{h.side === 'heads' ? 'ОРЁЛ' : 'РЕШКА'}</span>
                <span>{h.bet} TON</span>
                <span>{h.win === 'heads' ? '🦅' : '💰'}</span>
                <span className={h.isWin ? 'text-green-500' : 'text-red-400'}>{h.isWin ? '+WIN' : 'LOSE'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // PVP экран с табами
  const PvpScreen = () => (
    <div className="flex-1 bg-gray-900 p-4">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setPvpTab('roulette')} className={`px-4 py-2 rounded-lg font-bold ${pvpTab === 'roulette' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}>Рулетка</button>
        <button onClick={() => setPvpTab('coinflip')} className={`px-4 py-2 rounded-lg font-bold ${pvpTab === 'coinflip' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}>Орел и Решка</button>
        <button onClick={() => setPvpTab('history')} className={`px-4 py-2 rounded-lg font-bold ${pvpTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}>История</button>
      </div>
      {pvpTab === 'roulette' && <div className="text-white text-center py-12">PVP рулетка (заглушка)</div>}
      {pvpTab === 'coinflip' && <CoinflipScreen />}
      {pvpTab === 'history' && (
        <div className="bg-gray-800 rounded-xl p-4 text-white">
          <h4 className="text-lg font-bold mb-2">История PVP</h4>
          <div className="text-gray-400">(Здесь будет история всех PVP игр)</div>
        </div>
      )}
    </div>
  )

  // Компоненты экранов (сокращенные версии для экономии места)
  const TelegramHeader = () => (
    <div className="bg-gray-900 p-4 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Gift size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-white text-lg font-bold">LudoGift</h1>
          <p className="text-gray-400 text-xs">NFT подарки & кейсы</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => addBalance(100)}
          className="bg-yellow-500 px-3 py-1 rounded-full text-black text-xs font-bold"
        >
          🎁 +100 TON
        </button>
        <button className="text-gray-400">
          <Settings size={20} />
        </button>
      </div>
    </div>
  )

  const HomeScreen = () => (
    <div className="flex-1 bg-gray-900">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 m-4 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{telegramUser.first_name}</h2>
            <p className="text-blue-100">@{telegramUser.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs text-white">
                {userStats.level}
              </span>
              <span className="text-yellow-300">🔥 {userStats.streak}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-white text-xl font-bold">{userStats.gamesPlayed}</div>
            <div className="text-blue-100 text-xs">Кейсов</div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl font-bold">{userStats.totalValue}</div>
            <div className="text-blue-100 text-xs">TON получено</div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl font-bold">{inventory.length}</div>
            <div className="text-blue-100 text-xs">Предметов</div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <h3 className="text-white text-lg font-bold mb-3">🚀 Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setCurrentScreen('cases')}
            className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 rounded-xl flex items-center gap-3"
          >
            <Gift size={24} className="text-white" />
            <div className="text-left">
              <div className="text-white font-bold">Открыть кейс</div>
              <div className="text-blue-100 text-xs">Получи подарки</div>
            </div>
          </button>
          
          <button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl flex items-center gap-3"
          >
            <Send size={24} className="text-white" />
            <div className="text-left">
              <div className="text-white font-bold">Поделиться</div>
              <div className="text-purple-100 text-xs">Пригласи друзей</div>
            </div>
          </button>
        </div>
      </div>

      {inventory.length > 0 && (
        <div className="px-4">
          <h3 className="text-white text-lg font-bold mb-3">🎁 Недавние находки</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {inventory.slice(-5).reverse().map((item, index) => (
              <div key={index} className={`min-w-24 bg-gray-800 rounded-xl p-3 text-center border ${getRarityColor(item.rarity)}`}>
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-white text-xs font-medium">{item.name}</div>
                <div className="text-teal-400 text-xs">💎{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const CasesScreen = () => (
    <div className="flex-1 bg-gray-900 p-4">
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl font-bold mb-2">🎁 Магазин кейсов</h2>
        <p className="text-gray-400">Открывай кейсы и собирай редкие NFT подарки!</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {caseTypes.map(caseType => (
          <div key={caseType.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${caseType.color} rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
                <div className="absolute top-1 left-1 w-4 h-4 bg-white opacity-30 rounded-full blur-sm"></div>
                <div className="text-2xl">{caseType.emoji}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-bold">{caseType.name}</h3>
                <p className="text-gray-400 text-sm">{caseType.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-xl">💎</span>
                <span className="text-white text-xl font-bold">{caseType.price}</span>
                <span className="text-gray-400">TON</span>
              </div>
              <button 
                onClick={() => openCase(caseType)}
                disabled={userStats.balance < caseType.price || isSpinning}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  userStats.balance >= caseType.price && !isSpinning
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg transform hover:scale-105' 
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
              >
                {isSpinning ? 'Открывается...' : 'Открыть кейс'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isSpinning && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <h3 className="text-white text-2xl font-bold mb-8">🎁 Открываем кейс...</h3>
            
            <div className="relative w-80 h-32 bg-gray-800 rounded-xl overflow-hidden border-4 border-teal-400">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-500 z-10 transform -translate-x-0.5"></div>
              
              <div 
                className="flex h-full items-center"
                style={{
                  transform: isSpinning ? 'translateX(-3760px)' : 'translateX(0px)',
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                  width: '4000px'
                }}
              >
                {spinningItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-20 h-20 bg-gray-700 rounded-lg border-2 border-gray-600 flex flex-col items-center justify-center mx-1"
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-white text-xs font-bold">{item.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-center space-x-1 mb-4">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <p className="text-gray-300">Определяем ваш выигрыш...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const ProfileScreen = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Профиль</h2>
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">👤</span>
          <div>
            <div className="font-semibold">{userStats.name}</div>
            <div className="text-gray-400 text-sm">{userStats.username}</div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-400">Уровень: {userStats.level}</div>
        <div className="mt-2 text-sm text-gray-400">Сыграно игр: {userStats.gamesPlayed}</div>
        <div className="mt-2 text-sm text-gray-400">Побед: {userStats.wins}</div>
        <div className="mt-2 text-sm text-gray-400">Винрейт: {userStats.winRate}%</div>
        <div className="mt-2 text-sm text-gray-400">Стрик: {userStats.streak}</div>
        <div className="mt-2 text-sm text-gray-400">Всего заработано: {userStats.earned} TON</div>
        <div className="mt-2 text-sm text-gray-400">Суммарная ценность подарков: {userStats.totalValue}</div>
      </div>
      <div className="mt-6">
        <TonWalletNoSSR />
      </div>
    </div>
  )

  const BottomNav = () => (
    <div className="bg-gray-900 p-4 flex justify-around border-t border-gray-800">
      {[
        { id: 'inventory', icon: Package, label: 'Инвентарь' },
        { id: 'cases', icon: Gift, label: 'Кейсы' },
        { id: 'home', icon: TrendingUp, label: 'Главная' },
        { id: 'pvp', icon: RotateCcw, label: 'PVP' },
        { id: 'profile', icon: User, label: 'Профиль' }
      ].map(item => (
        <button
          key={item.id}
          onClick={() => setCurrentScreen(item.id)}
          className={`flex flex-col items-center gap-1 relative ${
            currentScreen === item.id ? 'text-white' : 'text-gray-500'
          }`}
        >
          {currentScreen === item.id && (
            <div className="absolute -top-2 w-8 h-1 bg-white rounded-full"></div>
          )}
          <item.icon size={20} />
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />
      case 'cases': return <CasesScreen />
      case 'inventory': return <div className="flex-1 bg-gray-900 p-4 text-center text-white">Инвентарь</div>
      case 'profile': return <ProfileScreen />
      case 'pvp': return <PvpScreen />
      default: return <HomeScreen />
    }
  }

  const RewardModal = () => (
    showModal?.type === 'reward' && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-2xl text-center max-w-sm mx-4">
          <h3 className="text-white text-2xl font-bold mb-4">🎉 Поздравляем!</h3>
          <div className="text-6xl mb-4">{showModal.gift.emoji}</div>
          <h4 className="text-white text-lg mb-2">{showModal.gift.name}</h4>
          <p className="text-teal-400 text-xl font-bold mb-6">+{showModal.gift.value} TON</p>
          <button 
            onClick={() => setShowModal(null)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-3 rounded-xl text-white font-bold"
          >
            ✨ Забрать награду ✨
          </button>
        </div>
      </div>
    )
  )

  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen flex flex-col relative">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-teal-400">💎 {userStats.balance.toFixed(3)} TON</span>
          <Star className="text-yellow-400" size={16} />
          <span className="text-yellow-400">{userStats.stars}</span>
        </div>
        <button 
          onClick={() => addBalance(10)}
          className="bg-blue-500 px-3 py-1 rounded text-white text-sm"
        >
          + Пополнить
        </button>
      </div>

      <TelegramHeader />
      {renderScreen()}
      <BottomNav />
      <RewardModal />

      <div className="text-center text-gray-600 text-xs p-2">
        @LudoGift_bot • Статистика обновляется в реальном времени
      </div>
    </div>
  )
}

export default LudoGiftApp 