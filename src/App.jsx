import { Header, Footer } from './components';
import {
  Hero,
  Metrics,
  Features,
  AgenticAI,
  RevenueAutomation,
  Newsletter
} from './sections';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Features />
        <AgenticAI />
        <RevenueAutomation />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
