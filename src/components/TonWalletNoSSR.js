'use client';
import dynamic from 'next/dynamic';

const TonWalletComponent = dynamic(
  () => import('./TonWalletComponent'),
  { ssr: false, loading: () => <div>Загрузка кошелька...</div> }
);

export default function TonWalletNoSSR() {
  return <TonWalletComponent />;
} 