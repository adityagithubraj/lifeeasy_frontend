import React, { Suspense } from 'react';
import BannerCarousel from '@/components/sections/BannerCarousel';
import NewArrivalsSection from '@/components/sections/NewArrivalsSection';
import TopProductsSection from '@/components/sections/TopProductsSection';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  // Function to show person information when clicked
  const showPersonInfo = (name: string, level: string) => {
    const messages: { [key: string]: string } = {
      'You': 'You are the network sponsor at the top level.',
      'Person A': 'Direct recruit A - your first team member.',
      'Person B': 'Direct recruit B - your second team member.',
      'Person A1': 'Second level recruit under Person A.',
      'Person A2': 'Second level recruit under Person A.',
      'Person B1': 'Second level recruit under Person B.',
      'Person B2': 'Second level recruit under Person B.'
    };
    
    alert(`${name}\nLevel: ${level}\n\n${messages[name]}`);
  };

  // Add animation effects when component mounts
  React.useEffect(() => {
    const nodes = document.querySelectorAll('[data-person-node]');
    
    nodes.forEach((node, index) => {
      setTimeout(() => {
        if (node instanceof HTMLElement) {
          node.style.opacity = '0';
          node.style.transform = 'scale(0)';
          node.style.transition = 'all 0.5s ease';
          
          setTimeout(() => {
            if (node instanceof HTMLElement) {
              node.style.opacity = '1';
              node.style.transform = 'scale(1)';
            }
          }, 100);
        }
      }, index * 200);
    });
  }, []);

  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        }>
        {/* Banner Carousel */}
        <BannerCarousel />
        
        {/* New Arrivals Section */}
        <NewArrivalsSection />
        
        {/* Top Products Section */}
        <TopProductsSection />

        {/* Our Business Logic Section */}
        <section className={`py-16 md:py-20 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                MLM Network Structure
              </h2>
              <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Interactive 2-person structure with network statistics
              </p>
            </motion.div>

            {/* MLM Tree Structure */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className={`bg-white dark:bg-gray-700 rounded-2xl p-8 md:p-10 shadow-2xl max-w-4xl w-full ${
                theme === 'dark' ? 'border border-gray-600' : ''
              }`}>
                <div className="flex justify-center w-full">
                  <svg width="600" height="400" viewBox="0 0 600 400" className="w-full h-auto">
                    {/* Level Labels */}
                    <text x="50" y="80" className={`text-sm font-medium ${
                      theme === 'dark' ? 'fill-gray-300' : 'fill-gray-600'
                    }`}>Level 1</text>
                    <text x="50" y="200" className={`text-sm font-medium ${
                      theme === 'dark' ? 'fill-gray-300' : 'fill-gray-600'
                    }`}>Level 2</text>
                    <text x="50" y="320" className={`text-sm font-medium ${
                      theme === 'dark' ? 'fill-gray-300' : 'fill-gray-600'
                    }`}>Level 3</text>
                    
                    {/* Connection Lines */}
                    {/* Level 1 to Level 2 */}
                    <path d="M 300 100 L 200 180" className="stroke-gray-400 stroke-3 fill-none"/>
                    <path d="M 300 100 L 400 180" className="stroke-gray-400 stroke-3 fill-none"/>
                    
                    {/* Level 2 to Level 3 */}
                    <path d="M 200 200 L 150 280" className="stroke-gray-400 stroke-3 fill-none"/>
                    <path d="M 200 200 L 250 280" className="stroke-gray-400 stroke-3 fill-none"/>
                    <path d="M 400 200 L 350 280" className="stroke-gray-400 stroke-3 fill-none"/>
                    <path d="M 400 200 L 450 280" className="stroke-gray-400 stroke-3 fill-none"/>
                    
                    {/* Level 1 - Sponsor */}
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('You', 'Sponsor')} data-person-node>
                      <circle cx="300" cy="80" r="30" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="300" y="85" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">YOU</text>
                    </g>
                    
                    {/* Level 2 - Direct Recruits */}
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('Person A', 'Direct Recruit')} data-person-node>
                      <circle cx="200" cy="200" r="25" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="200" y="205" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">A</text>
                    </g>
                    
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('Person B', 'Direct Recruit')} data-person-node>
                      <circle cx="400" cy="200" r="25" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="400" y="205" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">B</text>
                    </g>
                    
                    {/* Level 3 - Second Level Recruits */}
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('Person A1', 'Second Level')} data-person-node>
                      <circle cx="150" cy="320" r="20" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="150" y="325" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">A1</text>
                    </g>
                    
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('Person A2', 'Second Level')} data-person-node>
                      <circle cx="250" cy="320" r="20" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="250" y="325" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">A2</text>
                    </g>
                    
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('Person B1', 'Second Level')} data-person-node>
                      <circle cx="350" cy="320" r="20" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="350" y="325" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">B1</text>
                    </g>
                    
                    <g className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => showPersonInfo('Person B2', 'Second Level')} data-person-node>
                      <circle cx="450" cy="320" r="20" className="fill-blue-600 stroke-blue-800 stroke-3 transition-all duration-300"/>
                      <text x="450" y="325" className="fill-white font-semibold text-xs" textAnchor="middle" dominantBaseline="middle">B2</text>
                    </g>
                  </svg>
                </div>
                
                {/* Network Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
                  <div className={`p-4 md:p-6 rounded-xl text-center ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                  }`}>
                    <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>6</div>
                    <div className={`text-sm md:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Total Network Size</div>
                  </div>
                  
                  <div className={`p-4 md:p-6 rounded-xl text-center ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                  }`}>
                    <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>2</div>
                    <div className={`text-sm md:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Direct Recruits</div>
                  </div>
                  
                  <div className={`p-4 md:p-6 rounded-xl text-center ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                  }`}>
                    <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>3</div>
                    <div className={`text-sm md:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Network Levels</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Suspense>
    </div>
  );
};

export default Home;