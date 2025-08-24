import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LibreTranslationService } from '@/services/translationService';

export type Language = 'en' | 'ko' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, dynamicContent?: string) => string | Promise<string>;
  translateDynamicContent: (content: string) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.solutions': 'Solutions',
    'nav.store': 'Store',
    'nav.blog': 'Blog',
    'nav.blog.manage': 'Blog Management',
    'nav.contact': 'Contact Us',
    'nav.profile': 'Profile',
    'nav.cart': 'Cart',
    
    // Hero Section
    'hero.title': 'Future of Compute',
    'hero.subtitle': 'Revolutionary semiconductor technology driving tomorrow\'s innovations',
    'hero.cta.primary': 'Explore Solutions',
    'hero.cta.secondary': 'Watch Demo',
    
    // About
    'about.title': 'Leading Innovation',
          'about.description': 'Lifeeasy is pioneering the next generation of computational solutions',
    'about.description.full': 'We aim to provide a full-stack supply chain management solution for both our customers and suppliers.',
    'about.ranking': 'Ranked one of the largest electronic components distributors in India.',
    'about.industries.title': 'Industries Served',
    'industries.automotive': 'Automotive',
    'industries.mobile': 'Mobile',
    'industries.industrial': 'Industrial',
    'industries.iot': 'IOT',
    'industries.medical': 'Medical',
    'industries.telecom': 'Telecom',
    'industries.defense': 'Defense',
    'industries.led': 'LED Lighting',
    
    // Mission & Vision
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'To provide our customers comprehensive value-added services for Electronic Solutions giving them a competitive advantage in time to market, technology, flexibility, and total cost. Relentlessly connect our business partners to new revenue-generating opportunities and convert these into business by bringing together the innovative technologies and capabilities to deliver solutions in the marketplace for sustainable long-term growth. Leverage our outstanding management and employee teams to build an Organisation with true long-term value.',
    'about.vision.title': 'Our Vision',
    'about.vision.description': 'To be recognized as a Global leader providing world-class Electronic Solutions services to its customers while creating value for all stakeholders.',
    
    // Vision & Mission Section
    'about.vision.mission.title': 'Vision & Mission',
    'about.vision.highlight1': 'Global Leadership',
    'about.vision.highlight2': 'Industry Innovation',
    'about.vision.highlight3': 'Future Technology',
    'about.mission.highlight1': 'Industry Revolution',
    'about.mission.highlight2': 'Innovation Drive',
    'about.mission.highlight3': 'Sustainable Growth',
    'about.vision.mission.cta': 'Ready to be part of our journey?',
    'about.vision.mission.button': 'Get Started',
    
    // Awards & Trophies Section
    'awards.title': 'Awards and Trophies',
    'awards.subtitle': 'Recognizing excellence and innovation in electronic solutions',
    'awards.excellence.title': 'Excellence in Electronics',
    'awards.excellence.description': 'Outstanding performance and quality in electronic component distribution',
    'awards.innovation.title': 'Innovation Award',
    'awards.innovation.description': 'Pioneering new solutions and technologies in the industry',
    'awards.quality.title': 'Quality Excellence',
    'awards.quality.description': 'Consistent delivery of high-quality electronic solutions',
    'awards.service.title': 'Customer Service Excellence',
    'awards.service.description': 'Exceptional customer support and satisfaction',
    'awards.growth.title': 'Growth Achievement',
    'awards.growth.description': 'Remarkable business expansion and market presence',
    'awards.leadership.title': 'Industry Leadership',
    'awards.leadership.description': 'Leading the way in electronic solutions innovation',
    'awards.stats.awards': 'Awards Won',
    'awards.stats.years': 'Years of Excellence',
    'awards.stats.commitment': 'Commitment to Quality',
    
    // Store Page
    'store.title': 'Store',
    'store.subtitle': 'Browse our comprehensive collection of electronic components',
    'store.product': 'Product(s)',
    'store.search.placeholder': 'Search...',
    'store.noProducts': 'No products found matching your criteria.',
    'store.categories.all': 'All Products',
    'store.categories.batteries': 'Batteries',
    'store.categories.electromechanical': 'Electromechanical',
    'store.categories.passive': 'Passive',
    'store.categories.semiconductor': 'Semiconductor',
    'store.categories.wirelessRf': 'Wireless & RF',
    'store.sort.featured': 'Sort By: Featured',
    'store.sort.priceLow': 'Price: Low to High',
    'store.sort.priceHigh': 'Price: High to Low',
    'store.sort.name': 'Name: A to Z',
    'store.filters.categories': 'Categories',
    'store.filters.allProducts': 'All Products',
    'store.filters.brand': 'Brand',
    'store.filters.seeAll': 'See All',
    'store.filters.availability': 'Availability',
    'store.filters.hideOutOfStock': 'Hide Out of Stock',
    'store.filters.priceRange': 'Price Range',
    
    // Product Details Page
    'product.unitPrice': 'per unit',
    'product.quantity': 'Quantity',
    'product.qtyPerPack': 'Qty per pack',
    'product.pricingTiers': 'Pricing Tiers',
    'product.total': 'Total',
    'product.getQuotation': 'Get Quotation',
    'product.quoteConfirmation': 'We have received your request for quote. Our sales team will get back to you as soon as possible.',
    'product.dataSheet': 'Data Sheet',
    'product.share': 'Share',
    
    // Profile Sidebar
    'profile.hello': 'Hello',
    'profile.myCart': 'My cart',
    'profile.myAccount': 'My Account',
    'profile.myOrders': 'My orders',
    'profile.editProfile': 'Edit Profile',
    'profile.changePassword': 'Change Password',
    'profile.logout': 'Logout',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.description': 'Ready to transform your technology?',
    
    // Banner Carousel
    'banner.slide1.title': 'MLM Software Solutions',
    'banner.slide1.subtitle': 'Network Marketing Excellence',
    'banner.slide1.description': 'Transform your MLM business with our comprehensive software platform designed for network marketing success and growth.',
    'banner.slide1.cta': 'Explore Solutions',
    
    'banner.slide2.title': 'Commission Tracking',
    'banner.slide2.subtitle': 'Smart Business Growth',
    'banner.slide2.description': 'Track commissions, manage downlines, and optimize your MLM business with our advanced analytics and reporting tools.',
    'banner.slide2.cta': 'View Products',
    
    'banner.slide3.title': 'Secure MLM Platform',
    'banner.slide3.subtitle': 'Trust & Reliability',
    'banner.slide3.description': 'Build your network marketing empire on our secure, scalable platform with enterprise-grade security and compliance.',
    'banner.slide3.cta': 'Learn More',
    
    'banner.slide4.title': 'MLM Automation',
    'banner.slide4.subtitle': 'Powerful Performance',
    'banner.slide4.description': 'Automate your MLM operations with our cutting-edge software that streamlines processes and maximizes efficiency.',
    'banner.slide4.cta': 'Get Started',
    
    'banner.innovation.hub': 'Innovation Hub',
    
    // Global Semiconductor Distributor Section
    'distributor.main.title': 'GLOBAL SEMICONDUCTOR DISTRIBUTOR',
    'distributor.subtitle': 'Looking to source Electronic Components in India?',
    'distributor.description.para1': 'Rabyte is established as a single window supplier of semiconductors, interconnectors, displays and modules, and electromechanical and passive components. Rabyte serves its customers with comprehensive electronic solutions like Box-Build Solutions, Supply Chain Management, Electronic Components and Design Services.',
    'distributor.description.para2': 'Rabyte currently serves the electronic industry fraternity spread all over the world.',
    'distributor.categories.title': 'Popular Categories',
    'distributor.category.microcontrollers': 'Microcontrollers',
    'distributor.category.memories': 'Memories',
    'distributor.category.mosfets': 'Mosfets',
    'distributor.category.discretes': 'Discretes',
    'distributor.category.resistors': 'Resistors',
    'distributor.category.power.management': 'Power Management',
    
    // Top Brands Section
    'brands.title': 'Top Brands',
    'brands.fuji.electric': 'Fuji Electric',
    'brands.holitech': 'HOLITECH',
    'brands.holtek': 'HOLTEK',
    'brands.hongfa': 'HONGFA',
    'brands.hornby.electronic': 'HORNBY ELECTRONIC',
    'brands.ignion': 'ignion',
    'brands.diotec': 'Diotec',
    'brands.enfalion': 'Enfalion',
    'brands.everlight': 'Everlight',
    'brands.edison': 'Edison',
    'brands.fagor': 'Fagor',
    'brands.rabyte.logo1': 'Rabyte Logo 1',
    'brands.rabyte.logo2': 'Rabyte Logo 2',
    'brands.rabyte.logo3': 'Rabyte Logo 3',
    
    // Top Products Section
    'products.title': 'Top Products',
    'products.capacitor.resistor': 'Capacitor/Resistor',
    'products.development.board': 'Development Board',
    'products.capacitor.component': 'Capacitor Component',
    'products.fuse.inductor': 'Fuse/Inductor',
    'products.microcontroller.chip': 'Microcontroller Chip',
    'products.memory.module': 'Memory Module',
    'products.power.ic': 'Power IC',
    'products.sensor.module': 'Sensor Module',
    'products.connector.assembly': 'Connector Assembly',
    
    // Blog & Translation
    'blog.translating': 'Translating...',
    'blog.translation.failed': 'Translation failed. Showing original content.',
    'blog.translation.cache.info': 'Translation served from cache',
    'blog.translation.completed': 'Translation completed',
    'blog.translation.error': 'Translation error',
    'blog.translation.translating': 'Translating...',
    'blog.translation.complete': 'Translation complete',
    'blog.views': 'Views',
    'blog.unknown.author': 'Unknown author',
    'blog.updated': 'Updated',
    'blog.no.content': 'No content',
    'blog.post.id': 'Post ID',
    'blog.slug': 'Slug',
    
    // Blog Page UI
    'blog.page.title': 'Blog',
    'blog.page.subtitle': 'Explore the latest insights in semiconductor technology, IoT solutions, and electronic innovation.',
    'blog.search.placeholder': 'Search articles...',
    'blog.filter.all.tags': 'All Tags',
    'blog.back.to.list': '← Back to Blog List',
    'blog.translation.info.title': 'Auto Translation',
    'blog.translation.info.description': 'All blog posts are automatically translated to your selected language using the free LibreTranslate service. Content is cached for faster loading and better performance.',
    'blog.title': 'Blog',
    'blog.description': 'Explore the latest insights in semiconductor technology, IoT solutions, and electronic innovation.',
    'blog.filter.all.categories': 'All Categories',
    'blog.refresh': 'Refresh',
    'blog.loading': 'Loading blog posts...',
    'blog.retry': 'Retry',
    'blog.no.posts': 'No blog posts found',
    'blog.no.posts.description': 'Try adjusting your search or filter criteria.',
    
    // Blog Post UI
    'blog.post.article.id': 'Article ID:',
    'blog.post.translated.to.korean': '한국어로 번역됨',
    'blog.post.translated.to.chinese': '已翻译为中文',
    
    // Blog Management
    'blog.management.title': 'Blog Management',
    'blog.management.new.post': 'New Post',
    'blog.management.create.first': 'Create First Post',
    'blog.management.edit.post': 'Edit Post',
    'blog.management.create.new': 'Create New Post',
    'blog.management.title.label': 'Title *',
    'blog.management.title.placeholder': 'Enter post title',
    'blog.management.author.label': 'Author *',
    'blog.management.author.placeholder': 'Enter author name',
    'blog.management.content.label': 'Content *',
    'blog.management.content.placeholder': 'Write your blog post content...',
    'blog.management.tags.label': 'Tags',
    'blog.management.tags.placeholder': 'tag1, tag2, tag3',
    'blog.management.category.label': 'Category',
    'blog.management.category.placeholder': 'Enter category',
    'blog.management.image.label': 'Featured Image URL',
    'blog.management.image.placeholder': 'https://example.com/image.jpg',
    'blog.management.cancel': 'Cancel',
    'blog.management.update.post': 'Update Post',
    'blog.management.create.post': 'Create Post',
    'blog.management.view': 'View',
    'blog.management.edit': 'Edit',
    'blog.management.delete': 'Delete',
    'blog.management.no.posts': 'No blog posts yet',
    'blog.management.no.posts.description': 'Create your first blog post to get started!',
    'blog.management.loading': 'Loading blog posts...',
    'blog.management.error.fetch': 'Failed to fetch blog posts',
    'blog.management.error.save': 'Failed to save blog post',
    'blog.management.error.delete': 'Failed to delete blog post',
    'blog.management.confirm.delete': 'Are you sure you want to delete this post?',
    'blog.management.required.fields': 'Please fill in all required fields',
    
    // Translation Status
    'translation.status.title': 'Translation Status',
    'translation.status.service.active': 'LibreTranslate Service: Active',
    'translation.status.cache.entries': 'Cached Entries',
    'translation.status.cache.size': 'Cache Size',
    'translation.status.cache.health': 'Cache Health',
    'translation.status.cache.health.empty': '空',
    'translation.status.cache.health.good': '良好',
    'translation.status.cache.health.moderate': '中等',
    'translation.status.cache.health.high': '高',
    'translation.status.cache.health.unknown': '未知',
    'translation.status.cache.management.title': 'Cache Management',
    'translation.status.cache.management.clean': 'Clean Expired Cache',
    'translation.status.cache.management.cleaning': 'Cleaning...',
    'translation.status.cache.management.refresh': 'Refresh Stats',
    'translation.status.cache.lastCleanup': 'Last cleanup: {date}',
    'translation.status.info.cache.performance': '• Translations are cached for 30 days to improve performance',
    'translation.status.info.cache.autoClean': '• Cache is automatically cleaned up on page load',
    'translation.status.info.libreTranslate': '• LibreTranslate is a free, open-source translation service',
    
    // Language
    'language.english': 'English',
    'language.korean': '한국어',
    'language.chinese': '中文',
  },
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.about': '회사소개',
    'nav.solutions': '솔루션',
    'nav.store': '스토어',
    'nav.blog': '블로그',
    'nav.blog.manage': '블로그 관리',
    'nav.contact': '연락처',
    'nav.profile': '프로필',
    'nav.cart': '장바구니',
    
    // Hero Section
    'hero.title': '미래의 컴퓨팅',
    'hero.subtitle': '내일의 혁신을 이끄는 혁신적인 반도체 기술',
    'hero.cta.primary': '솔루션 탐색',
    'hero.cta.secondary': '데모 보기',
    
    // About
    'about.title': '혁신을 선도하다',
          'about.description': 'Lifeeasy는 차세대 컴퓨팅 솔루션을 개척하고 있습니다',
    'about.description.full': '우리는 고객과 공급업체 모두를 위한 풀스택 공급망 관리 솔루션을 제공하는 것을 목표로 합니다.',
    'about.ranking': '인도에서 가장 큰 전자 부품 유통업체 중 하나로 선정되었습니다.',
    'about.industries.title': '서비스 산업',
    'industries.automotive': '자동차',
    'industries.mobile': '모바일',
    'industries.industrial': '산업용',
    'industries.iot': '사물인터넷',
    'industries.medical': '의료',
    'industries.telecom': '통신',
    'industries.defense': '방위',
    'industries.led': 'LED 조명',
    
    // Mission & Vision
    'about.mission.title': '우리의 미션',
    'about.mission.description': '고객에게 시장 진입 시간, 기술, 유연성 및 총 비용 측면에서 경쟁 우위를 제공하는 전자 솔루션을 위한 포괄적인 부가가치 서비스를 제공합니다. 혁신적인 기술과 역량을 결합하여 시장에서 지속 가능한 장기 성장을 위한 솔루션을 제공함으로써 비즈니스 파트너를 새로운 수익 창출 기회에 끊임없이 연결하고 이를 비즈니스로 전환합니다. 탁월한 경영진과 직원 팀을 활용하여 진정한 장기 가치를 가진 조직을 구축합니다.',
    'about.vision.title': '우리의 비전',
    'about.vision.description': '모든 이해관계자에게 가치를 창출하면서 고객에게 세계적 수준의 전자 솔루션 서비스를 제공하는 글로벌 리더로 인정받는 것입니다.',
    
    // Vision & Mission Section
    'about.vision.mission.title': '비전 & 미션',
    'about.vision.highlight1': '글로벌 리더십',
    'about.vision.highlight2': '산업 혁신',
    'about.vision.highlight3': '미래 기술',
    'about.mission.highlight1': '산업 혁명',
    'about.mission.highlight2': '혁신 추진',
    'about.mission.highlight3': '지속 가능한 성장',
    'about.vision.mission.cta': '우리의 여정에 참여할 준비가 되셨나요?',
    'about.vision.mission.button': '시작하기',
    
    // Awards & Trophies Section
    'awards.title': '수상 및 트로피',
    'awards.subtitle': '전자 솔루션의 우수성과 혁신을 인정합니다',
    'awards.excellence.title': '전자 제품 우수성',
    'awards.excellence.description': '전자 부품 유통 분야에서의 뛰어난 성과와 품질',
    'awards.innovation.title': '혁신상',
    'awards.innovation.description': '업계의 새로운 솔루션과 기술 개척',
    'awards.quality.title': '품질 우수성',
    'awards.quality.description': '고품질 전자 솔루션의 지속적인 제공',
    'awards.service.title': '고객 서비스 우수성',
    'awards.service.description': '탁월한 고객 지원과 만족도',
    'awards.growth.title': '성장 성과',
    'awards.growth.description': '놀라운 비즈니스 확장과 시장 존재감',
    'awards.leadership.title': '업계 리더십',
    'awards.leadership.description': '전자 솔루션 혁신의 선두주자',
    'awards.stats.awards': '수상 횟수',
    'awards.stats.years': '우수성 연차',
    'awards.stats.commitment': '품질에 대한 약속',
    
    // Store Page
    'store.title': '스토어',
    'store.subtitle': '전자 부품의 포괄적인 컬렉션을 둘러보세요',
    'store.product': '제품',
    'store.search.placeholder': '검색...',
    'store.noProducts': '조건에 맞는 제품을 찾을 수 없습니다.',
    'store.categories.all': '모든 제품',
    'store.categories.batteries': '배터리',
    'store.categories.electromechanical': '전기기계',
    'store.categories.passive': '수동 부품',
    'store.categories.semiconductor': '반도체',
    'store.categories.wirelessRf': '무선 및 RF',
    'store.sort.featured': '정렬: 추천순',
    'store.sort.priceLow': '가격: 낮은 순',
    'store.sort.priceHigh': '가격: 높은 순',
    'store.sort.name': '이름: A-Z',
    'store.filters.categories': '카테고리',
    'store.filters.allProducts': '모든 제품',
    'store.filters.brand': '브랜드',
    'store.filters.seeAll': '모두 보기',
    'store.filters.availability': '재고 상태',
    'store.filters.hideOutOfStock': '품절 상품 숨기기',
    'store.filters.priceRange': '가격 범위',
    
    // Product Details Page
    'product.unitPrice': '개당',
    'product.quantity': '수량',
    'product.qtyPerPack': '패키지당 수량',
    'product.pricingTiers': '가격 등급',
    'product.total': '총계',
    'product.getQuotation': '견적 요청',
    'product.quoteConfirmation': '견적 요청을 받았습니다. 영업팀이 최대한 빨리 연락드리겠습니다.',
    'product.dataSheet': '데이터시트',
    'product.share': '공유',
    
    // Profile Sidebar
    'profile.hello': '안녕하세요',
    'profile.myCart': '내 장바구니',
    'profile.myAccount': '내 계정',
    'profile.myOrders': '내 주문',
    'profile.editProfile': '프로필 편집',
    'profile.changePassword': '비밀번호 변경',
    'profile.logout': '로그아웃',
    
    // Contact
    'contact.title': '연락하기',
    'contact.description': '기술을 혁신할 준비가 되셨나요?',
    
    // Banner Carousel
    'banner.slide1.title': 'MLM 소프트웨어 솔루션',
    'banner.slide1.subtitle': '네트워크 마케팅 우수성',
    'banner.slide1.description': '네트워크 마케팅 성공과 성장을 위해 설계된 포괄적인 소프트웨어 플랫폼으로 MLM 비즈니스를 변화시키세요.',
    'banner.slide1.cta': '솔루션 탐색',
    
    'banner.slide2.title': '수수료 추적',
    'banner.slide2.subtitle': '스마트 비즈니스 성장',
    'banner.slide2.description': '고급 분석 및 보고 도구로 수수료를 추적하고, 다운라인을 관리하며, MLM 비즈니스를 최적화하세요.',
    'banner.slide2.cta': '제품 보기',
    
    'banner.slide3.title': '보안 MLM 플랫폼',
    'banner.slide3.subtitle': '신뢰와 안정성',
    'banner.slide3.description': '엔터프라이즈급 보안 및 규정 준수를 갖춘 안전하고 확장 가능한 플랫폼에서 네트워크 마케팅 제국을 구축하세요.',
    'banner.slide3.cta': '더 알아보기',
    
    'banner.slide4.title': 'MLM 자동화',
    'banner.slide4.subtitle': '강력한 성능',
    'banner.slide4.description': '프로세스를 간소화하고 효율성을 극대화하는 최첨단 소프트웨어로 MLM 운영을 자동화하세요.',
    'banner.slide4.cta': '시작하기',
    
    'banner.innovation.hub': '혁신 허브',
    
    // Global Semiconductor Distributor Section
    'distributor.main.title': '글로벌 반도체 유통업체',
    'distributor.subtitle': '인도에서 전자 부품을 조달하고 싶으신가요?',
    'distributor.description.para1': 'Rabyte는 반도체, 인터커넥터, 디스플레이 및 모듈, 전기기계 및 수동 부품의 원스톱 공급업체로 설립되었습니다. Rabyte는 Box-Build 솔루션, 공급망 관리, 전자 부품 및 디자인 서비스와 같은 포괄적인 전자 솔루션으로 고객에게 서비스를 제공합니다.',
    'distributor.description.para2': 'Rabyte는 현재 전 세계에 퍼져 있는 전자 산업계에 서비스를 제공하고 있습니다.',
    'distributor.categories.title': '인기 카테고리',
    'distributor.category.microcontrollers': '마이크로컨트롤러',
    'distributor.category.memories': '메모리',
    'distributor.category.mosfets': '모스펫',
    'distributor.category.discretes': '개별 부품',
    'distributor.category.resistors': '저항',
    'distributor.category.power.management': '전력 관리',
    
    // Top Brands Section
    'brands.title': '인기 브랜드',
    'brands.fuji.electric': '후지 전기',
    'brands.holitech': '홀리테크',
    'brands.holtek': '홀텍',
    'brands.hongfa': '홍파',
    'brands.hornby.electronic': '혼비 전자',
    'brands.ignion': '이그니온',
    'brands.diotec': 'Diotec',
    'brands.enfalion': 'Enfalion',
    'brands.everlight': 'Everlight',
    'brands.edison': 'Edison',
    'brands.fagor': 'Fagor',
    'brands.rabyte.logo1': '래바이트 로고 1',
    'brands.rabyte.logo2': '래바이트 로고 2',
    'brands.rabyte.logo3': '래바이트 로고 3',
    
    // Top Products Section
    'products.title': '인기 제품',
    'products.capacitor.resistor': '커패시터/저항',
    'products.development.board': '개발 보드',
    'products.capacitor.component': '커패시터 부품',
    'products.fuse.inductor': '퓨즈/인덕터',
    'products.microcontroller.chip': '마이크로컨트롤러 칩',
    'products.memory.module': '메모리 모듈',
    'products.power.ic': '전력 IC',
    'products.sensor.module': '센서 모듈',
    'products.connector.assembly': '커넥터 어셈블리',
    
    // Blog & Translation
    'blog.translating': '번역 중...',
    'blog.translation.failed': '번역에 실패했습니다. 원본 내용을 표시합니다.',
    'blog.translation.cache.info': '캐시에서 번역 제공',
    'blog.translation.completed': '번역 완료',
    'blog.translation.error': '번역 오류',
    'blog.translation.translating': '번역 중...',
    'blog.translation.complete': '번역 완료',
    'blog.views': '조회수',
    'blog.unknown.author': '알 수 없는 작성자',
    'blog.updated': '업데이트됨',
    'blog.no.content': '내용이 없습니다',
    'blog.post.id': '게시물 ID',
    'blog.slug': '슬러그',
    
    // Blog Page UI
    'blog.page.title': '블로그',
    'blog.page.subtitle': '반도체 기술, IoT 솔루션 및 전자 혁신의 최신 정보를 탐색하세요.',
    'blog.search.placeholder': '기사 검색...',
    'blog.filter.all.tags': '모든 태그',
    'blog.back.to.list': '← 블로그 목록으로 돌아가기',
    'blog.translation.info.title': '자동 번역',
    'blog.translation.info.description': '무료 LibreTranslate 서비스를 사용하여 선택한 언어로 모든 블로그 게시물이 자동으로 번역됩니다. 콘텐츠는 더 빠른 로딩 및 더 나은 성능을 위해 캐시됩니다.',
    'blog.title': '블로그',
    'blog.description': '반도체 기술, IoT 솔루션 및 전자 혁신의 최신 정보를 탐색하세요.',
    'blog.filter.all.categories': '모든 카테고리',
    'blog.refresh': '새로고침',
    'blog.loading': '블로그 게시물을 불러오는 중...',
    'blog.retry': '다시 시도',
    'blog.no.posts': '블로그 게시물이 없습니다',
    'blog.no.posts.description': '검색 또는 필터 조건을 조정해 보세요.',
    
    // Blog Post UI
    'blog.post.article.id': '기사 ID:',
    'blog.post.translated.to.korean': '한국어로 번역됨',
    'blog.post.translated.to.chinese': '한국어로 번역됨',
    
    // Blog Management
    'blog.management.title': '블로그 관리',
    'blog.management.new.post': '새 게시물',
    'blog.management.create.first': '첫 번째 게시물 생성',
    'blog.management.edit.post': '게시물 수정',
    'blog.management.create.new': '새 게시물 생성',
    'blog.management.title.label': '제목 *',
    'blog.management.title.placeholder': '게시물 제목 입력',
    'blog.management.author.label': '작성자 *',
    'blog.management.author.placeholder': '작성자 이름 입력',
    'blog.management.content.label': '내용 *',
    'blog.management.content.placeholder': '블로그 게시물 내용을 작성하세요...',
    'blog.management.tags.label': '태그',
    'blog.management.tags.placeholder': '태그1, 태그2, 태그3',
    'blog.management.category.label': '카테고리',
    'blog.management.category.placeholder': '카테고리 입력',
    'blog.management.image.label': '특징 이미지 URL',
    'blog.management.image.placeholder': 'https://example.com/image.jpg',
    'blog.management.cancel': '취소',
    'blog.management.update.post': '게시물 수정',
    'blog.management.create.post': '게시물 생성',
    'blog.management.view': '보기',
    'blog.management.edit': '수정',
    'blog.management.delete': '삭제',
    'blog.management.no.posts': '아직 블로그 게시물이 없습니다',
    'blog.management.no.posts.description': '시작하려면 첫 번째 블로그 게시물을 생성하세요!',
    'blog.management.loading': '블로그 게시물 로딩 중...',
    'blog.management.error.fetch': '블로그 게시물 가져오기 실패',
    'blog.management.error.save': '블로그 게시물 저장 실패',
    'blog.management.error.delete': '블로그 게시물 삭제 실패',
    'blog.management.confirm.delete': '이 게시물을 정말 삭제하시겠습니까?',
    'blog.management.required.fields': '모든 필수 필드를 입력해야 합니다',
    
    // Translation Status
    'translation.status.title': '번역 상태',
    'translation.status.service.active': 'LibreTranslate 서비스: 활성화',
    'translation.status.cache.entries': '캐시된 항목',
    'translation.status.cache.size': '캐시 크기',
    'translation.status.cache.health': '캐시 상태',
    'translation.status.cache.health.empty': '비어있음',
    'translation.status.cache.health.good': '좋음',
    'translation.status.cache.health.moderate': '보통',
    'translation.status.cache.health.high': '높음',
    'translation.status.cache.health.unknown': '알 수 없음',
    'translation.status.cache.management.title': '캐시 관리',
    'translation.status.cache.management.clean': '만료된 캐시 정리',
    'translation.status.cache.management.cleaning': '정리 중...',
    'translation.status.cache.management.refresh': '통계 새로고침',
    'translation.status.cache.lastCleanup': '마지막 정리: {date}',
    'translation.status.info.cache.performance': '• 번역은 30일 동안 캐시되어 성능을 향상시킵니다',
    'translation.status.info.cache.autoClean': '• 페이지 로드 시 캐시가 자동으로 정리됩니다',
    'translation.status.info.libreTranslate': '• LibreTranslate는 무료, 오픈 소스 번역 서비스입니다',
    
    // Language
    'language.english': 'English',
    'language.korean': '한국어',
    'language.chinese': '中文',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.solutions': '解决方案',
    'nav.store': '商店',
    'nav.blog': '博客',
    'nav.blog.manage': '博客管理',
    'nav.contact': '联系我们',
    'nav.profile': '个人中心',
    'nav.cart': '购物车',
    
    // Hero Section
    'hero.title': '计算的未来',
    'hero.subtitle': '推动明日创新的革命性半导体技术',
    'hero.cta.primary': '探索解决方案',
    'hero.cta.secondary': '观看演示',
    
    // About
    'about.title': '引领创新',
          'about.description': 'Lifeeasy正在开创下一代计算解决方案',
    'about.description.full': '我们的目标是为客户和供应商提供全栈供应链管理解决方案。',
    'about.ranking': '被评为印度最大的电子元件分销商之一。',
    'about.industries.title': '服务行业',
    'industries.automotive': '汽车',
    'industries.mobile': '移动',
    'industries.industrial': '工业',
    'industries.iot': '物联网',
    'industries.medical': '医疗',
    'industries.telecom': '电信',
    'industries.defense': '国防',
    'industries.led': 'LED照明',
    
    // Mission & Vision
    'about.mission.title': '我们的使命',
    'about.mission.description': '为客户提供全面的电子解决方案增值服务，在上市时间、技术、灵活性和总成本方面给予他们竞争优势。不懈地将我们的商业伙伴与新的创收机会联系起来，并通过汇集创新技术和能力来提供市场解决方案，实现可持续的长期增长，从而将这些机会转化为业务。利用我们优秀的管理和员工团队，建立一个具有真正长期价值的组织。',
    'about.vision.title': '我们的愿景',
    'about.vision.description': '成为为客户提供世界级电子解决方案服务并为所有利益相关者创造价值的全球领导者。',
    
    // Vision & Mission Section
    'about.vision.mission.title': '愿景与使命',
    'about.vision.highlight1': '全球领导力',
    'about.vision.highlight2': '行业创新',
    'about.vision.highlight3': '未来技术',
    'about.mission.highlight1': '行业革命',
    'about.mission.highlight2': '创新驱动',
    'about.mission.highlight3': '可持续发展',
    'about.vision.mission.cta': '准备好加入我们的旅程了吗？',
    'about.vision.mission.button': '开始',
    
    // Awards & Trophies Section
    'awards.title': '奖项与奖杯',
    'awards.subtitle': '认可电子解决方案的卓越性和创新性',
    'awards.excellence.title': '电子卓越奖',
    'awards.excellence.description': '电子元件分销领域的卓越表现和质量',
    'awards.innovation.title': '创新奖',
    'awards.innovation.description': '开创行业新解决方案和技术',
    'awards.quality.title': '质量卓越奖',
    'awards.quality.description': '持续提供高质量电子解决方案',
    'awards.service.title': '客户服务卓越奖',
    'awards.service.description': '卓越的客户支持和满意度',
    'awards.growth.title': '成长成就奖',
    'awards.growth.description': '显著的业务扩张和市场存在感',
    'awards.leadership.title': '行业领导奖',
    'awards.leadership.description': '引领电子解决方案创新',
    'awards.stats.awards': '获奖次数',
    'awards.stats.years': '卓越年数',
    'awards.stats.commitment': '质量承诺',
    
    // Store Page
    'store.title': '商店',
    'store.subtitle': '浏览我们全面的电子元件集合',
    'store.product': '产品',
    'store.search.placeholder': '搜索...',
    'store.noProducts': '未找到符合条件的产品。',
    'store.categories.all': '所有产品',
    'store.categories.batteries': '电池',
    'store.categories.electromechanical': '机电',
    'store.categories.passive': '被动元件',
    'store.categories.semiconductor': '半导体',
    'store.categories.wirelessRf': '无线和射频',
    'store.sort.featured': '排序：推荐',
    'store.sort.priceLow': '价格：从低到高',
    'store.sort.priceHigh': '价格：从高到低',
    'store.sort.name': '名称：A-Z',
    'store.filters.categories': '类别',
    'store.filters.allProducts': '所有产品',
    'store.filters.brand': '品牌',
    'store.filters.seeAll': '查看全部',
    'store.filters.availability': '库存状态',
    'store.filters.hideOutOfStock': '隐藏缺货商品',
    'store.filters.priceRange': '价格范围',
    
    // Product Details Page
    'product.unitPrice': '每单位',
    'product.quantity': '数量',
    'product.qtyPerPack': '每包数量',
    'product.pricingTiers': '价格等级',
    'product.total': '总计',
    'product.getQuotation': '获取报价',
    'product.quoteConfirmation': '我们已收到您的报价请求。我们的销售团队将尽快与您联系。',
    'product.dataSheet': '数据表',
    'product.share': '分享',
    
    // Profile Sidebar
    'profile.hello': '你好',
    'profile.myCart': '我的购物车',
    'profile.myAccount': '我的账户',
    'profile.myOrders': '我的订单',
    'profile.editProfile': '编辑资料',
    'profile.changePassword': '修改密码',
    'profile.logout': '退出登录',
    
    // Contact
    'contact.title': '联系我们',
    'contact.description': '准备好改变您的技术了吗？',
    
    // Banner Carousel
    'banner.slide1.title': 'MLM软件解决方案',
    'banner.slide1.subtitle': '网络营销卓越',
    'banner.slide1.description': '通过我们专为网络营销成功和增长而设计的综合软件平台，转变您的MLM业务。',
    'banner.slide1.cta': '探索解决方案',
    
    'banner.slide2.title': '佣金跟踪',
    'banner.slide2.subtitle': '智能业务增长',
    'banner.slide2.description': '通过我们的高级分析和报告工具跟踪佣金、管理下线并优化您的MLM业务。',
    'banner.slide2.cta': '查看产品',
    
    'banner.slide3.title': '安全MLM平台',
    'banner.slide3.subtitle': '信任与可靠性',
    'banner.slide3.description': '在我们具有企业级安全性和合规性的安全、可扩展平台上构建您的网络营销帝国。',
    'banner.slide3.cta': '了解更多',
    
    'banner.slide4.title': 'MLM自动化',
    'banner.slide4.subtitle': '强大性能',
    'banner.slide4.description': '通过我们简化流程并最大化效率的尖端软件，自动化您的MLM运营。',
    'banner.slide4.cta': '开始',
    
    'banner.innovation.hub': '创新中心',
    
    // Global Semiconductor Distributor Section
    'distributor.main.title': '全球半导体分销商',
    'distributor.subtitle': '想在印度采购电子元件吗？',
    'distributor.description.para1': 'Rabyte是一家半导体、连接器、显示器和模块以及机电和被动元件的单一窗口供应商。Rabyte为客户提供全面的电子解决方案，如盒装解决方案、供应链管理、电子元件和设计服务。',
    'distributor.description.para2': 'Rabyte目前为遍布全球的电子行业提供服务。',
    'distributor.categories.title': '热门类别',
    'distributor.category.microcontrollers': '微控制器',
    'distributor.category.memories': '存储器',
    'distributor.category.mosfets': '场效应管',
    'distributor.category.discretes': '分立器件',
    'distributor.category.resistors': '电阻器',
    'distributor.category.power.management': '电源管理',
    
    // Top Brands Section
    'brands.title': '顶级品牌',
    'brands.fuji.electric': '富士电机',
    'brands.holitech': '和立泰',
    'brands.holtek': '盛群',
    'brands.hongfa': '宏发',
    'brands.hornby.electronic': '霍恩比电子',
    'brands.ignion': '伊格尼昂',
    'brands.diotec': 'Diotec',
    'brands.enfalion': 'Enfalion',
    'brands.everlight': 'Everlight',
    'brands.edison': 'Edison',
    'brands.fagor': 'Fagor',
    'brands.rabyte.logo1': '雷比特标志 1',
    'brands.rabyte.logo2': '雷比特标志 2',
    'brands.rabyte.logo3': '雷比特标志 3',
    
    // Top Products Section
    'products.title': '顶级产品',
    'products.capacitor.resistor': '电容器/电阻器',
    'products.development.board': '开发板',
    'products.capacitor.component': '电容器组件',
    'products.fuse.inductor': '保险丝/电感器',
    'products.microcontroller.chip': '微控制器芯片',
    'products.memory.module': '内存模块',
    'products.power.ic': '电源IC',
    'products.sensor.module': '传感器模块',
    'products.connector.assembly': '连接器组件',
    
    // Blog & Translation
    'blog.translating': '翻译中...',
    'blog.translation.failed': '翻译失败。显示原始内容。',
    'blog.translation.cache.info': '从缓存提供翻译',
    'blog.translation.completed': '翻译完成',
    'blog.translation.error': '翻译错误',
    'blog.translation.translating': '翻译中...',
    'blog.translation.complete': '翻译完成',
    'blog.views': '浏览量',
    'blog.unknown.author': '未知作者',
    'blog.updated': '已更新',
    'blog.no.content': '无内容',
    'blog.post.id': '帖子ID',
    'blog.slug': 'slug',
    
    // Blog Page UI
    'blog.page.title': '博客',
    'blog.page.subtitle': '探索半导体技术、物联网解决方案和电子创新的最新见解。',
    'blog.search.placeholder': '搜索文章...',
    'blog.filter.all.tags': '所有标签',
    'blog.back.to.list': '← 返回博客列表',
    'blog.translation.info.title': '自动翻译',
    'blog.translation.info.description': '所有博客文章都使用免费的LibreTranslate服务自动翻译为您选择的语言。内容被缓存以实现更快的加载和更好的性能。',
    'blog.title': '博客',
    'blog.description': '探索半导体技术、物联网解决方案和电子创新的最新见解。',
    'blog.filter.all.categories': '所有类别',
    'blog.refresh': '刷新',
    'blog.loading': '正在加载博客文章...',
    'blog.retry': '重试',
    'blog.no.posts': '未找到博客文章',
    'blog.no.posts.description': '请尝试调整搜索或筛选条件。',
    
    // Blog Post UI
    'blog.post.article.id': '文章ID:',
    'blog.post.translated.to.korean': '已翻译为韩语',
    'blog.post.translated.to.chinese': '已翻译为中文',
    
    // Blog Management
    'blog.management.title': '博客管理',
    'blog.management.new.post': '新帖子',
    'blog.management.create.first': '创建第一个帖子',
    'blog.management.edit.post': '编辑帖子',
    'blog.management.create.new': '创建新帖子',
    'blog.management.title.label': '标题 *',
    'blog.management.title.placeholder': '输入帖子标题',
    'blog.management.author.label': '作者 *',
    'blog.management.author.placeholder': '输入作者名称',
    'blog.management.content.label': '内容 *',
    'blog.management.content.placeholder': '撰写博客文章内容...',
    'blog.management.tags.label': '标签',
    'blog.management.tags.placeholder': '标签1, 标签2, 标签3',
    'blog.management.category.label': '类别',
    'blog.management.category.placeholder': '输入类别',
    'blog.management.image.label': '特色图片URL',
    'blog.management.image.placeholder': 'https://example.com/image.jpg',
    'blog.management.cancel': '取消',
    'blog.management.update.post': '更新帖子',
    'blog.management.create.post': '创建帖子',
    'blog.management.view': '查看',
    'blog.management.edit': '编辑',
    'blog.management.delete': '删除',
    'blog.management.no.posts': '还没有博客文章',
    'blog.management.no.posts.description': '开始创建您的第一个博客文章！',
    'blog.management.loading': '加载博客文章...',
    'blog.management.error.fetch': '获取博客文章失败',
    'blog.management.error.save': '保存博客文章失败',
    'blog.management.error.delete': '删除博客文章失败',
    'blog.management.confirm.delete': '您确定要删除此帖子吗？',
    'blog.management.required.fields': '请填写所有必填字段',
    
    // Translation Status
    'translation.status.title': '翻译状态',
    'translation.status.service.active': 'LibreTranslate 服务: 活动',
    'translation.status.cache.entries': '缓存条目',
    'translation.status.cache.size': '缓存大小',
    'translation.status.cache.health': '缓存健康',
    'translation.status.cache.health.empty': 'Empty',
    'translation.status.cache.health.good': 'Good',
    'translation.status.cache.health.moderate': 'Moderate',
    'translation.status.cache.health.high': 'High',
    'translation.status.cache.health.unknown': 'Unknown',
    'translation.status.cache.management.title': '缓存管理',
    'translation.status.cache.management.clean': '清理过期缓存',
    'translation.status.cache.management.cleaning': '正在清理...',
    'translation.status.cache.management.refresh': '刷新统计',
    'translation.status.cache.lastCleanup': '上次清理: {date}',
    'translation.status.info.cache.performance': '• 翻译已缓存30天以提高性能',
    'translation.status.info.cache.autoClean': '• 缓存会在页面加载时自动清理',
    'translation.status.info.libreTranslate': '• LibreTranslate 是一个免费的开源翻译服务',
    
    // Language
    'language.english': 'English',
    'language.korean': '한국어',
    'language.chinese': '中文',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Static translation function (for existing translations)
  const t = (key: string, dynamicContent?: string): string | Promise<string> => {
    // If dynamic content is provided, translate it
    if (dynamicContent) {
      return translateDynamicContent(dynamicContent);
    }
    
    // Return static translation
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Dynamic translation function for blog content
  const translateDynamicContent = async (content: string): Promise<string> => {
    // Don't translate if language is English
    if (language === 'en') {
      return content;
    }

    setIsTranslating(true);
    
    try {
      const translatedContent = await LibreTranslationService.translateText(
        content, 
        language
      );
      
      return translatedContent;
    } catch (error) {
      console.error('Translation failed:', error);
      return content; // Fallback to original content
    } finally {
      setIsTranslating(false);
    }
  };

  // Cleanup cache on mount
  React.useEffect(() => {
    LibreTranslationService.cleanupCache();
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translateDynamicContent,
      isTranslating 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};