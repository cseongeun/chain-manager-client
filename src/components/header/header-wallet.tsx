import WalletButtonn from '@/components/header/wallet-button';

export default function HeaderWallet() {
  return (
    <div className="relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8">
      {/* <NotificationButton /> */}
      <WalletButtonn />
    </div>
  );
}
