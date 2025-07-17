# LudoGift Telegram Mini App

NFT подарки и кейсы для Telegram мини-приложения

## 🚀 Быстрый старт

```bash
# Клонирование и установка
git clone <your-repo>
cd ludogift-telegram-mini-app
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
npm start
```

## 📁 Структура проекта

```
ludogift-telegram-mini-app/
├── src/
│   ├── app/
│   │   ├── layout.js          # Основной layout
│   │   ├── page.js            # Главная страница
│   │   └── globals.css        # Глобальные стили
│   ├── components/
│   │   ├── LudoGiftApp.jsx    # Основное приложение
│   │   ├── screens/           # Экраны приложения
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── CasesScreen.jsx
│   │   │   ├── InventoryScreen.jsx
│   │   │   ├── ProfileScreen.jsx
│   │   │   └── PvpScreen.jsx
│   │   ├── ui/                # UI компоненты
│   │   │   ├── Header.jsx
│   │   │   ├── BottomNav.jsx
│   │   │   └── Modals.jsx
│   │   └── utils/             # Утилиты
│   │       ├── constants.js
│   │       ├── gameLogic.js
│   │       └── telegram.js
├── public/
│   ├── icons/                 # Иконки
│   └── images/               # Изображения
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🎮 Основные функции

### ✅ Реализовано:
- **🎁 Система кейсов** с анимированной рулеткой
- **📦 Инвентарь** с NFT подарками
- **📊 Статистика в реальном времени**
- **🏆 Таблица лидеров**
- **⚔️ PVP режим** (базовая версия)
- **📱 Telegram WebApp интеграция**
- **🎨 Адаптивный дизайн**

### 🔄 В разработке:
- **💰 Интеграция с TON кошельком**
- **👥 Реферальная система**
- **🎯 Ежедневные задания**
- **🔗 Социальные функции**

## 🛠️ Технологии

- **React 18** - UI библиотека
- **Next.js 14** - React фреймворк
- **Tailwind CSS** - Стилизация
- **Lucide React** - Иконки
- **Telegram WebApp SDK** - Интеграция с Telegram

## 📱 Telegram WebApp

### Настройка бота:
1. Создайте бота через @BotFather
2. Получите токен бота
3. Настройте веб-приложение: `/setmenubutton`
4. Укажите URL вашего приложения

### Деплой:
```bash
# Сборка для статического хостинга
npm run build

# Файлы для деплоя находятся в папке out/
```

## 🎯 Развитие проекта

### Следующие шаги:
1. **Добавить полную PVP систему**
2. **Интегрировать TON Connect**
3. **Добавить больше типов кейсов**
4. **Реализовать marketplace**
5. **Добавить анимации и звуки**

### Рекомендуемые улучшения:
- **State Management** (Zustand/Redux)
- **База данных** (Supabase/Firebase)
- **API интеграция** для реальных NFT
- **Платежная система** TON
- **Push уведомления**

## 🐛 Известные проблемы

- PVP режим требует доработки
- Нужна интеграция с реальным блокчейном
- Требуется оптимизация анимаций

## 📄 Лицензия

MIT License - см. файл LICENSE

## 👥 Команда

- **Frontend** - React/Next.js разработка
- **Blockchain** - TON интеграция  
- **Design** - UI/UX дизайн
- **Backend** - API и база данных

## 🔗 Полезные ссылки

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram WebApp](https://core.telegram.org/bots/webapps)
- [TON Documentation](https://ton.org/docs/)
- [Next.js Docs](https://nextjs.org/docs)

---

**Создано для конкурса Telegram Mini Apps 2025** 🚀 # sharingan
# sharingan
# sharingan
