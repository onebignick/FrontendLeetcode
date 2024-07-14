import './globals.css';
import WelcomeCard from '@/components/homePage/WelcomeCard';

export default function Home() {
  return (
    <main className="px-5 lg:px-10 xl:px-15 py-5">
      {/* frontend racers, This is the Home Page */}
      <WelcomeCard />
    </main>
  );
}
