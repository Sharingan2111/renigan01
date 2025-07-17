'use client';

import { useEffect, useState } from 'react';

export default function TonWalletComponent() {
  const [connector, setConnector] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    let tonConnect;
    async function loadTonConnect() {
      const { TonConnect } = await import('@tonconnect/sdk');
      tonConnect = new TonConnect({
        manifestUrl: '/tonconnect-manifest.json'
      });
      setConnector(tonConnect);
      await tonConnect.restoreConnection();
      if (tonConnect.wallet) setWallet(tonConnect.wallet);
      tonConnect.onStatusChange((wallet) => setWallet(wallet));
    }
    loadTonConnect();
    return () => {
      if (tonConnect && tonConnect.offStatusChange) tonConnect.offStatusChange();
    };
  }, []);

  const connectWallet = async () => {
    if (!connector) return;
    try {
      await connector.connect({});
    } catch (e) {
      alert('Ошибка подключения: ' + e.message);
    }
  };

  const disconnectWallet = async () => {
    if (!connector) return;
    try {
      await connector.disconnect();
      setWallet(null);
      setBalance('0');
    } catch (e) {
      alert('Ошибка отключения: ' + e.message);
    }
  };

  const fetchBalance = async () => {
    if (!wallet?.account?.address) return;
    try {
      const response = await fetch(
        `https://tonapi.io/v2/accounts/${wallet.account.address}`
      );
      const data = await response.json();
      setBalance(data.balance ? (parseInt(data.balance) / 1e9).toFixed(2) : '0');
    } catch (e) {
      setBalance('0');
    }
  };

  useEffect(() => {
    if (wallet?.account?.address) fetchBalance();
  }, [wallet?.account?.address]);

  const topUpAddress = 'UQAubZ5rlpOUVKfotwN5hnN21tTPYtoiAm4eaItdkh0Oos3M';
  const [topUpAmount, setTopUpAmount] = useState('1');

  const topUp = async () => {
    if (!connector || !wallet) return;
    try {
      await connector.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: topUpAddress,
            amount: (parseFloat(topUpAmount) * 1e9).toString(),
            payload: undefined
          }
        ]
      });
      setTimeout(fetchBalance, 3000);
    } catch (e) {
      alert('Ошибка пополнения: ' + e.message);
    }
  };

  if (!connector) return <div>Загрузка TON Connect...</div>;

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>TON Wallet</h1>
      {!wallet ? (
        <button onClick={connectWallet} style={btnStyle}>Подключить кошелек</button>
      ) : (
        <div>
          <div style={infoBox}>
            <div><strong>Адрес:</strong></div>
            <div style={addrBox}>{wallet.account.address}</div>
            <div style={{ marginTop: 10 }}>
              <strong>Баланс:</strong> {balance} TON
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={topUpAmount}
              onChange={e => setTopUpAmount(e.target.value)}
              placeholder="Сумма (TON)"
              style={{ width: '60%', padding: 8, borderRadius: 6, border: '1px solid #ddd', marginRight: 8 }}
            />
            <button onClick={topUp} style={btnStyle}>Пополнить баланс</button>
          </div>
          <button onClick={fetchBalance} style={btnSec}>Обновить баланс</button>
          <button onClick={disconnectWallet} style={btnSec}>Отключить кошелек</button>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  width: '100%',
  padding: 12,
  background: '#007AFF',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer',
  marginBottom: 10
};
const btnSec = { ...btnStyle, background: 'transparent', color: '#007AFF', border: '1px solid #007AFF' };
const infoBox = { background: '#f8f9fa', padding: 15, borderRadius: 8, marginBottom: 15 };
const addrBox = { fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', background: '#fff', padding: 8, borderRadius: 4, marginTop: 5 }; 