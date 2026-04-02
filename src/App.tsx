/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Layout, 
  Mail, 
  Phone,
  ChevronRight, 
  ArrowRight, 
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Menu,
  X,
  Award,
  Cpu,
  Palette
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'projects' | 'project-detail' | 'aigc' | 'motion';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
}

interface MotionWork {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  description: string;
  details?: string[];
  gallery?: string[];
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 'hangry-buddy',
    title: 'HANGRY BUDDY',
    subtitle: '魔芋面系列包装设计',
    category: '包装设计',
    image: 'https://pic1.imgdb.cn/item/69b8b525a77f4cac5be43ccb.jpg',
    tags: ['Packaging', 'Illustration', 'Branding'],
    description: '针对健康速食赛道的包装困局，通过“视觉语言强化风味联想”与“低饱和度马卡龙色系”打造差异化。引入“星鼻鼹 IP”增强趣味性与品牌记忆点。'
  },
  {
    id: 'tanlive',
    title: '益仔 IP设计',
    subtitle: '碳 LIVE 平台品牌 IP 形象设计',
    category: 'ip设计',
    image: 'https://i.postimg.cc/85cmPJjN/1.jpg',
    tags: ['IP Design', '3D Modeling', 'Branding'],
    description: '以“低碳、科技、可持续、未来感”为关键词，选取海豹为原型打造“益仔”IP形象。通过科技配件强化“数字化、智能化”属性。'
  },
  {
    id: 'fadada',
    title: 'FADADA 2.0',
    subtitle: '法大大官网品牌视觉升级',
    category: '运营设计',
    image: 'https://i.postimg.cc/zG0T9j4s/fadada-1.png',
    tags: ['UI/UX', 'Web Design', 'Design System'],
    description: '解决旧版信息杂乱、价值抽象的问题。通过重构首屏布局、功能可视化、服务优势模块优化，建立统一、规范、可复用的视觉体系。'
  },
  {
    id: 'eco-flow',
    title: '探元平台界面视觉设计',
    subtitle: '文化遗产数字化设计实践',
    category: '界面设计',
    image: 'https://pic1.imgdb.cn/item/69b8c31fa77f4cac5be46faf.png',
    tags: ['界面设计', 'UI/UX', 'Digital Heritage'],
    description: '探元平台致力于文化遗产的数字化保护与传播。通过构建沉浸式的交互界面与系统化的视觉语言，将厚重的文化底蕴转化为直观的数字体验，实现传统文化的现代化表达。'
  },
  {
    id: 'cmlink',
    title: 'CMLink 中国移动海外运营',
    subtitle: '全球品牌视觉与运营设计',
    category: '运营设计',
    image: 'https://i.postimg.cc/Bbp4Nb9q/hai-wai-yun-ying-shi-jue-she-ji.png',
    tags: ['Branding', 'Operation', 'Global'],
    description: '为中国移动海外品牌 CMLink 提供全方位的视觉运营支持。通过系统化的设计语言，提升品牌在海外市场的专业度与辨识度，助力全球业务增长。'
  },
  {
    id: 'bolema-materials',
    title: '伯乐马运营物料设计',
    subtitle: '线上线下运营物料设计',
    category: '运营设计',
    image: 'https://i.postimg.cc/GtvqGTjn/bo-le-ma-zhao-pin-wu-liao-she-ji1.png',
    tags: ['Operation', 'Branding', 'Design'],
    description: '伯乐马线上线下运营物料设计，涵盖招聘、活动、品牌推广等多维度的视觉呈现。通过系统化的设计语言，确保品牌在不同媒介上的视觉统一性与传播力。'
  }
];

const MOTION_WORKS: MotionWork[] = [
  {
    id: 'fadada-motion',
    title: '法大大动效设计',
    subtitle: '法大大品牌动效呈现',
    image: 'https://i.postimg.cc/3NWhNdx4/fa-da-da.gif',
    category: 'Motion Graphics',
    description: '法大大品牌视觉动态化呈现，通过流畅的动效传达品牌的科技感与专业度。',
    details: ['https://i.postimg.cc/3NWhNdx4/fa-da-da.gif']
  },
  {
    id: 'bolema-motion',
    title: '',
    subtitle: '待更新',
    image: 'https://i.postimg.cc/G2xNRrPj/bo-le-ma-shou-ban.gif',
    category: 'Motion Graphics',
    description: '伯乐马手办产品的动态展示，捕捉产品的细节与动态美感。',
    details: ['https://i.postimg.cc/G2xNRrPj/bo-le-ma-shou-ban.gif']
  },
  {
    id: 'golden-bolema',
    title: '伯乐马动效',
    subtitle: '伯乐马系列手办动效呈现',
    image: 'https://i.postimg.cc/gjDn3wVn/huang-jin-bo-le.gif',
    category: 'Motion Graphics',
    description: '伯乐系列造型的动效制作，全程依托AIGC技术与可灵工具，搭建“创意构思—动效设计—开发适配”的完整工作流。\n\n设计的旋转一周动效，核心用于交付开发实现交互功能，支持手指拖拉操作，可带动手办360°旋转，既保证了动效统一性，又大幅提升创作与开发衔接效率，实现动效设计与开发交互的高效落地。',
    details: [
      'https://i.postimg.cc/gjDn3wVn/huang-jin-bo-le.gif',
      'https://i.postimg.cc/xT7cMNBn/bo-le-ma-shou-ban-dong-xiao-jiao-fu-gong-zuo-liu.png',
      'https://i.postimg.cc/ZRQf4RBJ/bai-yin-bo-le.gif',
      'https://i.postimg.cc/cHzD0Hgt/bo-jin-bo-le.gif'
    ],
    gallery: [
      'https://i.postimg.cc/mDgtsYK5/qing-tong-bo-le.png',
      'https://i.postimg.cc/gJ2nWV17/huang-jin-bo-le.png',
      'https://i.postimg.cc/nV5MyQ20/bai-yin-bo-le.png',
      'https://i.postimg.cc/c1j6p8hT/bo-jin-bo-le.png',
      'https://i.postimg.cc/RVHq4Vps/jian-xi-bo-le.png'
    ]
  }
];

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage, clearProject }: { currentPage: Page, setCurrentPage: (p: Page) => void, clearProject: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: '首页', icon: Layout },
    { id: 'about', label: '关于', icon: User },
    { id: 'projects', label: '作品', icon: Briefcase },
    { id: 'motion', label: '动效', icon: Palette },
    { id: 'aigc', label: 'AIGC', icon: Cpu },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif italic tracking-widest cursor-pointer"
          onClick={() => {
            setCurrentPage('home');
            clearProject();
          }}
        >
          钟晓滢
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                clearProject();
                if (['about', 'projects', 'aigc', 'motion'].includes(item.id) && currentPage === 'home') {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  setCurrentPage(item.id as Page);
                }
              }}
              className={`text-sm tracking-widest transition-colors hover:text-blue-400 ${currentPage === item.id ? 'text-blue-400 font-bold' : 'text-white/70'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    clearProject();
                    if (['about', 'projects', 'aigc', 'motion'].includes(item.id) && currentPage === 'home') {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      setCurrentPage(item.id as Page);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-4 text-lg"
                >
                  <item.icon size={20} className="text-blue-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ParticleBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 120;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = '#3b82f6';
      }

      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const directionX = (dx / distance) * force * 5;
          const directionY = (dy / distance) * force * 5;
          this.x -= directionX;
          this.y -= directionY;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <ParticleBackground />
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex items-center space-x-2">
            <span className="h-[1px] w-12 bg-blue-500"></span>
            <span className="text-blue-400 text-sm tracking-[0.3em] uppercase">Visual Designer</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
            DESIGN<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">PORTFOLIO</span>
          </h1>
          <p className="text-white/50 text-lg mb-10 max-w-md leading-relaxed">
            专注视觉设计、品牌升级与IP打造。用设计重塑认知，为品牌赋能。
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center space-x-2 hover:bg-blue-400 hover:text-white transition-all group"
            >
              <span>查看作品</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center space-x-4 px-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                    {i === 3 ? 'AIGC' : <Palette size={14} />}
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/40 tracking-widest">2026 COLLECTION</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square relative flex items-center justify-center">
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-pulse delay-700" />
            
            <div className="w-56 h-80 rounded-full overflow-hidden border border-white/10 relative z-20 shadow-2xl">
              <img 
                src="https://i.postimg.cc/c46FHyTF/image_85.png" 
                alt="钟晓滢" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute bottom-16 right-20 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 z-30 shadow-2xl translate-x-1/4">
              <div className="text-4xl font-serif italic mb-1">5+</div>
              <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h2 className="text-5xl font-serif italic mb-8">ABOUT me.</h2>
              <div className="space-y-6 text-white/60">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold">钟晓滢</div>
                    <div className="text-xs">Visual Designer</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold">zhimabao8899@gmail.com</div>
                    <div className="text-xs">Contact Email</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold">15521017156</div>
                    <div className="text-xs">Contact Phone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-16">
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8 flex items-center">
                <span className="w-8 h-[1px] bg-white/20 mr-4"></span>
                教育经历 / Education
              </h3>
              <div className="relative pl-8 border-l border-white/10">
                <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-blue-500" />
                <div className="text-xl font-bold mb-2">华南农业大学 - 视觉传达 (本科)</div>
                <div className="text-blue-400 text-sm mb-4">2017.9 - 2021.6</div>
              </div>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8 flex items-center">
                <span className="w-8 h-[1px] bg-white/20 mr-4"></span>
                工作经历 / Experience
              </h3>
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-blue-500" />
                  <div className="text-xl font-bold mb-2">北京洲际通网络科技有限公司 (深圳)</div>
                  <div className="text-blue-400 text-sm mb-4">2022.4 - 至今 | 视觉设计师</div>
                  <p className="text-white/50 leading-relaxed">
                    参与头部企业官网升级、文化数字化平台、品牌 IP 打造等核心项目，具备全流程设计落地能力。以品牌价值为核心打造专属视觉体系，熟练运用 AIGC 提效。
                  </p>
                </div>
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-white/20" />
                  <div className="text-xl font-bold mb-2">香港米米创作有限公司</div>
                  <div className="text-blue-400 text-sm mb-4">2021.5 - 2022.1 | 视觉设计师</div>
                  <p className="text-white/50 leading-relaxed">
                    负责品牌设计前期调研分析，创意执行以及系统化延展。独立完成包括但不限于品牌VI设计，包装设计，海报设计等。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = ({ onSelectProject }: { onSelectProject: (id: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState('全部');
  const filteredProjects = activeFilter === '全部' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-[1px] bg-blue-500"></div>
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-blue-400 font-bold">Portfolio Selection</h2>
            </div>
            <h3 className="text-6xl font-serif italic leading-tight">项目案例<br /><span className="text-white/20">SELECTED WORKS</span></h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {['全部', '包装设计', '界面设计', '运营设计', 'ip设计'].map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  activeFilter === filter 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-white/5 hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => onSelectProject(project.id)}
              >
              {/* Card Image Area */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-zinc-900 ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-700">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${project.id === 'cmlink' ? 'opacity-100 bg-black/40 flex items-center justify-center' : 'opacity-0 group-hover:opacity-100'}`}>
                  {project.id === 'cmlink' && (
                    <span className="text-white text-[10px] tracking-[0.2em] font-bold bg-black/60 px-4 py-2 rounded-full border border-white/20">待整理更新</span>
                  )}
                </div>
                
                {/* Floating Category Tag */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/80">
                  {project.category}
                </div>
              </div>

              {/* Card Content Area */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors duration-500">{project.title}</h4>
                    <p className="text-white/40 text-sm font-serif italic">{project.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-500">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Keywords / Tags - Prominent */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-3 py-1 bg-blue-500/5 text-blue-400/80 rounded-md border border-blue-500/10 uppercase tracking-tighter font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const MotionDesignSection = ({ onSelectMotion }: { onSelectMotion: (id: string) => void }) => {
  return (
    <section id="motion" className="py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-blue-400 font-bold">Motion Design</h2>
          </div>
          <h3 className="text-6xl font-serif italic leading-tight">动效设计<br /><span className="text-white/20">MOTION GRAPHICS</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOTION_WORKS.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
              onClick={() => onSelectMotion(work.id)}
            >
              <img 
                src={work.image} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <div className="text-blue-400 text-[10px] tracking-widest uppercase mb-2">{work.category}</div>
                <h4 className="text-2xl font-bold mb-1">{work.title}</h4>
                <p className="text-white/40 text-sm italic font-serif">{work.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIGCSection = () => {
  return (
    <section id="aigc" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-blue-400 mb-4"
          >
            Efficiency & Innovation
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-serif italic"
          >
            AIGC 赋能设计
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: '灵感收集', tools: '花瓣 / Pinterest / 站酷', icon: Layout },
            { title: '创意拆解', tools: 'ChatGPT / DeepSeek / 豆包AI', icon: Cpu },
            { title: '生成视觉', tools: 'Midjourney / 即梦AI / LibLib AI', icon: Palette },
            { title: '融合优化', tools: 'Illustrator / Photoshop / Figma', icon: Briefcase },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <item.icon size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-white/40 text-sm">{item.tools}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 p-12 rounded-[3rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-md">
            <div className="text-6xl font-serif italic text-blue-400 mb-4">200%</div>
            <h4 className="text-2xl font-bold mb-4">设计时效提升</h4>
            <p className="text-white/50 leading-relaxed">
              通过 AIGC 构建“灵感收集 - 创意拆解 - 视觉生成 - 后期优化”的全链路闭环，实现从单次创作到长期资产的体系化沉淀。
            </p>
          </div>
          <div className="flex-1 w-full max-w-lg aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
            <img 
              src="https://picsum.photos/seed/aigc/800/450" 
              alt="AIGC Workflow" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-8xl md:text-[12rem] font-serif italic text-white/5 mb-12 select-none">THANKS</h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-white p-2 rounded-2xl mb-8">
            <img 
              src="https://i.postimg.cc/HxWQdS2Z/8acad177fe60b63a3f25267ad71b8d87-1.png" 
              alt="WeChat QR Code" 
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-white/40 tracking-[0.3em] uppercase mb-12">请联系我噢 ~</p>
          
          <div className="flex space-x-6 mb-12">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Linkedin size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Github size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Instagram size={20} />
            </button>
          </div>
          
          <div className="text-[10px] text-white/20 tracking-[0.5em] uppercase">
            © 2026 钟晓滢. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Stickers Data ---
const STICKERS = [
  { static: 'https://i.postimg.cc/kGJHFFMK/biao-qing-bao1.png', animated: 'https://i.postimg.cc/X7HLdsXb/sheng-qi.gif' },
  { static: 'https://i.postimg.cc/1XmdccRg/biao-qing-bao2.png', animated: 'https://i.postimg.cc/1XmdccRg/biao-qing-bao2.png' },
  { static: 'https://i.postimg.cc/qqJFXXBR/biao-qing-bao3.png', animated: 'https://i.postimg.cc/qqJFXXBR/biao-qing-bao3.png' },
  { static: 'https://i.postimg.cc/cHMjn5WN/biao-qing-bao4.png', animated: 'https://i.postimg.cc/cHMjn5WN/biao-qing-bao4.png' },
  { static: 'https://i.postimg.cc/LXB710SF/biao-qing-bao5.png', animated: 'https://i.postimg.cc/LXB710SF/biao-qing-bao5.png' },
  { static: 'https://i.postimg.cc/0jk4dd5K/biao-qing-bao6.png', animated: 'https://i.postimg.cc/0jk4dd5K/biao-qing-bao6.png' },
  { static: 'https://i.postimg.cc/6qWPLL6y/biao-qing-bao7.png', animated: 'https://i.postimg.cc/Hn8jrWhv/ezgif-8c7da9179760197f.gif' },
  { static: 'https://i.postimg.cc/LXB710SK/biao-qing-bao8.png', animated: 'https://i.postimg.cc/LXB710SK/biao-qing-bao8.png' },
  { static: 'https://i.postimg.cc/zBSMgPNm/biao-qing-bao9.png', animated: 'https://i.postimg.cc/zBSMgPNm/biao-qing-bao9.png' },
];

const ProjectDetail = ({ projectId, onBack, onSelectProject }: { projectId: string, onBack: () => void, onSelectProject: (id: string) => void }) => {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  const isTanLive = projectId === 'tanlive';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black overflow-y-auto"
    >
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-[70] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        <X size={24} />
      </button>

      {/* Hero Section - Luxury Editorial */}
      {projectId !== 'hangry-buddy' && projectId !== 'eco-flow' && projectId !== 'fadada' && projectId !== 'bolema-materials' && (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
          <div className={`max-w-7xl mx-auto px-6 w-full ${isTanLive ? 'flex flex-col items-center text-center' : 'grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'}`}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: isTanLive ? 0 : -30, y: isTanLive ? 20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`space-y-12 ${isTanLive ? 'max-w-2xl' : ''}`}
            >
              <div className="space-y-6">
                <div className={`flex items-center ${isTanLive ? 'justify-center' : ''} space-x-4`}>
                  <span className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase">{project.category}</span>
                  <div className="h-[1px] w-12 bg-blue-500/30"></div>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tight text-white">
                  {project.title}
                </h1>

                <p className={`text-base md:text-lg text-white/40 font-light leading-relaxed italic ${isTanLive ? '' : 'max-w-md'}`}>
                  {project.subtitle}
                </p>
              </div>
              
              <div className={`grid grid-cols-3 gap-8 pt-12 border-t border-white/5 ${isTanLive ? 'w-full' : ''}`}>
                <div className="space-y-2">
                  <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block">Timeline</span>
                  <div className="text-xs font-mono text-white/60">2023 — 2024</div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block">Role</span>
                  <div className="text-xs font-mono text-white/60">Lead Designer</div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block">Focus</span>
                  <div className="text-xs font-mono text-white/60">IP & Strategy</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            {!isTanLive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Minimalist Detail Label */}
                <div className="absolute -bottom-12 -left-12 p-8 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl max-w-[200px] hidden md:block">
                  <div className="text-[8px] font-mono text-blue-400 uppercase tracking-widest mb-2">Ref. 01</div>
                  <div className="text-[10px] text-white/40 leading-relaxed">
                    Deconstructing the essence of low-carbon technology through organic forms.
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Vertical Rail Text */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="writing-vertical-rl rotate-180 text-[9px] font-mono text-white/10 uppercase tracking-[0.8em]">
              Sustainable Future — Digital Innovation — Carbon Live
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
            <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Scroll</span>
          </div>
        </div>
      )}


      <div className="bg-black text-white">
        {projectId === 'tanlive' ? (
          <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-blue-500/30">
            {/* 2. Project Hero Image Removed */}

            {/* 3. Design Concept - Image + Text Cards */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4 space-y-6">
                    <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Design Concept</div>
                    <h2 className="text-4xl font-serif font-light leading-tight">视觉符号与<br /><span className="italic">品牌基因</span></h2>
                    <p className="text-sm text-white/40 leading-relaxed font-light max-w-xs">
                      从自然界汲取灵感，将极地生物的纯净感与未来科技的精密感相结合，创造出独特的“科技自然主义”视觉语言。
                    </p>
                  </div>
                  
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group space-y-8">
                      <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                        <img 
                          src="https://i.postimg.cc/T3SJKh12/image-19268.png" 
                          alt="Design Prototype" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-serif italic">设计原型 / PROTOTYPE</h4>
                        <p className="text-sm text-white/40 leading-relaxed font-light">
                          以海豹为原型，提取其圆润、亲和的形态特征，转化为简洁的几何语言。
                        </p>
                      </div>
                    </div> 
                    
                    <div className="group space-y-8">
                      <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                        <img 
                          src="https://i.postimg.cc/zGMFy3vf/image-19269.png" 
                          alt="Tech Gear" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-serif italic">数字化组件 / DIGITAL GEAR</h4>
                        <p className="text-sm text-white/40 leading-relaxed font-light">
                          融入耳机、护目镜等数字化元素，强化 IP 的智能属性，建立与数字世界的交互媒介。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3.5 IP Concept Scenes */}
            <section className="py-24 bg-zinc-900/10">
              <div className="max-w-7xl mx-auto px-6 space-y-8">
                {[
                  'https://i.postimg.cc/t49LBSNZ/ip-8.jpg',
                  'https://i.postimg.cc/FHGw8yPr/ip-9.jpg',
                  'https://i.postimg.cc/8C5xS73T/ip-10.jpg'
                ].map((url, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50">
                    <img 
                      src={url} 
                      alt={`IP Concept Scene ${i+1}`} 
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Visual System - Data Grid & Orthographic */}
            <section className="py-24 border-y border-white/10 bg-zinc-900/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                  <div className="space-y-4">
                    <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Orthographic View</div>
                    <h2 className="text-3xl font-serif font-light italic">三视图与比例规范</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'Blue', hex: '#0066FF' },
                      { name: 'Cyan', hex: '#00F0FF' },
                      { name: 'Dark', hex: '#0A0A0A' }
                    ].map(color => (
                      <div key={color.name} className="space-y-2">
                        <div className="w-16 h-8 border border-white/10" style={{ backgroundColor: color.hex }} />
                        <div className="text-[10px] font-mono text-white/30 uppercase">{color.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full">
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 p-8">
                      <img 
                        src="https://i.postimg.cc/NMq0yc1z/san-shi-tu.png" 
                        alt="Orthographic View" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                </div>
              </div>
            </section>

            {/* 5. Yi-Zai Occupational Roles Showcase */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-4">
                      <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Professional Roles</div>
                      <h2 className="text-4xl font-serif font-light leading-tight">益仔多形态<br /><span className="italic">职业体系</span></h2>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed font-light">
                      基于碳 LIVE 品牌跨界需求，为「益仔」设计了涵盖科研、工程、运动等多种职业身份的视觉体系。通过对行业特征的符号化提取，展现 IP 在多元场景下的专业感与亲和力。
                    </p>
                    <div className="pt-8 border-t border-white/10">
                      <div className="flex items-center gap-4 text-xs font-mono text-white/30">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        OCCUPATIONAL SYSTEM ACTIVE / 2024
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: '消防益仔 / FIREFIGHTER', url: 'https://i.postimg.cc/Pfg1hZB5/bu-tong-xing-tai6.png' },
                        { name: '拜年益仔 / NEW YEAR', url: 'https://i.postimg.cc/dtGr03Yq/bu-tong-xing-tai9.png' },
                        { name: '侦探益仔 / DETECTIVE', url: 'https://i.postimg.cc/hPVTGvBW/bu-tong-xing-tai7.png' },
                        { name: '休闲益仔 / CASUAL', url: 'https://i.postimg.cc/9X6yVTsB/bu-tong-xing-tai2.png' },
                        { name: '骑行益仔 / CYCLING', url: 'https://i.postimg.cc/G3WvrY6x/bu-tong-xing-tai3.png' },
                        { name: '居家益仔 / HOME', url: 'https://i.postimg.cc/sfk5yStz/bu-tong-xing-tai5.png' },
                        { name: '指挥益仔 / CONDUCTOR', url: 'https://i.postimg.cc/5N8LtyVc/bu-tong-xing-tai8.png' },
                        { name: '科技益仔 / TECH', url: 'https://i.postimg.cc/NG9RWbCn/bu-tong-xing-tai1.png' }
                      ].map((state, i) => (
                        <div key={state.name} className="group space-y-3">
                          <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                            <img 
                              src={state.url} 
                              alt={state.name} 
                              className="w-full h-full object-cover transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col space-y-1 px-1">
                            <span className="text-[8px] font-mono text-white/20">ROLE_0{i+1}</span>
                            <span className="text-[10px] font-light tracking-widest group-hover:text-blue-500 transition-colors truncate">{state.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Expressions - Sticker Grid */}
            <section className="py-24 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                  <div className="space-y-4">
                    <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Social Expressions</div>
                    <h2 className="text-4xl font-serif font-light italic">社交化表情体系</h2>
                  </div>
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Sticker Set v1.0</div>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
                  {STICKERS.map((sticker, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-zinc-900/50 border border-white/5 p-4 hover:border-blue-500/30 transition-colors group cursor-pointer relative">
                      <img 
                        src={sticker.static} 
                        alt={`Sticker ${i + 1}`} 
                        className="w-full h-full object-contain group-hover:hidden"
                        referrerPolicy="no-referrer"
                      />
                      <img 
                        src={sticker.animated} 
                        alt={`Sticker ${i + 1} animated`} 
                        className="w-full h-full object-contain hidden group-hover:block group-hover:scale-110 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6.5 Preliminary Application Scenes */}
            <section className="py-24 bg-zinc-900/10">
              <div className="max-w-7xl mx-auto px-6 space-y-8">
                {[
                  'https://i.postimg.cc/fRWLnvvs/ip-1.jpg',
                  'https://i.postimg.cc/HLVkjsK9/ip-2.jpg',
                  'https://i.postimg.cc/0NBdJjNk/ip-3.jpg',
                  'https://i.postimg.cc/pXJT6SzQ/ip-4.jpg'
                ].map((url, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50">
                    <img 
                      src={url} 
                      alt={`Preliminary Scene ${i+1}`} 
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Marketing - Poster Gallery */}
            <section className="py-24 bg-zinc-900/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 space-y-6">
                  <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Solar Terms Theme Posters</div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <h2 className="text-4xl font-serif font-light leading-tight">节气主题海报</h2>
                    <p className="text-sm text-white/40 leading-relaxed font-light max-w-md">
                      结合中国传统二十四节气，通过益仔的生动演绎，展现品牌与自然时令的和谐共鸣，赋予品牌深厚的文化底蕴。
                    </p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden -mx-6">
                  <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max px-6">
                    {[...Array(3)].map((_, groupIndex) => (
                      <div key={groupIndex} className="flex gap-6">
                        {[
                          'https://i.postimg.cc/jSmDQrKv/2hai-bao.png',
                          'https://i.postimg.cc/JzvscWmp/3hai-bao.png',
                          'https://i.postimg.cc/nhgXYtZ2/4hai-bao.png',
                          'https://i.postimg.cc/JhXGpd4f/5hai-bao.png',
                          'https://i.postimg.cc/QM7HfndD/6hai-bao.png',
                          'https://i.postimg.cc/FKS7TnHz/7hai-bao.png',
                          'https://i.postimg.cc/PqDPSF5C/8hai-bao.png',
                          'https://i.postimg.cc/KYTR0s87/9hai-bao.png',
                          'https://i.postimg.cc/pTty4Ymf/10hai-bao.png',
                          'https://i.postimg.cc/XJ0XmcrP/11hai-bao.png',
                          'https://i.postimg.cc/Twqh6LbZ/12hai-bao.png'
                        ].map((url, i) => (
                          <div key={`${groupIndex}-${i}`} className="w-[300px] aspect-[1/2] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 group shrink-0">
                            <img 
                              src={url} 
                              alt={`Poster ${i+1}`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                </div>
              </div>
            </section>

            {/* 7.5 Additional Application Scenes */}
            <section className="pb-24 bg-zinc-900/10">
              <div className="max-w-7xl mx-auto px-6 space-y-8">
                {[
                  'https://i.postimg.cc/HxMW4vTr/ip-5.jpg',
                  'https://i.postimg.cc/hvqDC8jR/ip-6.jpg',
                  'https://i.postimg.cc/hvbSNJzt/ip-7.jpg'
                ].map((url, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50">
                    <img 
                      src={url} 
                      alt={`Application Scene ${i+1}`} 
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Immersive Scenes - Cinematic Gallery */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 space-y-4">
                  <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Eco-Friendly Scenarios</div>
                  <h2 className="text-5xl font-serif font-light italic">IP的环保低碳小场景呈现</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    'https://i.postimg.cc/zXD74Th9/15.jpg',
                    'https://i.postimg.cc/ryNghfDY/22.jpg',
                    'https://i.postimg.cc/c1BTDFvz/24.jpg',
                    'https://i.postimg.cc/J75KTps2/23.jpg',
                    'https://i.postimg.cc/59SpPsXK/21.jpg'
                  ].map((url, i) => (
                    <div key={i} className="aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                      <img 
                        src={url} 
                        alt={`Scene ${i+1}`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. Conclusion - Clean Center */}
            <section className="py-48 border-t border-white/10">
              <div className="max-w-2xl mx-auto px-6 text-center space-y-12">
                <div className="space-y-4">
                  <div className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">Conclusion</div>
                  <h2 className="text-5xl font-serif font-light italic tracking-tight">连接绿色未来</h2>
                </div>
                <p className="text-lg text-white/50 leading-relaxed font-light italic">
                  通过「益仔」这一视觉符号，我们将复杂的低碳理念转化为可感知、可互动的情感连接，为碳 LIVE 平台注入了持久的生命力。
                </p>
                <div className="pt-12">
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs font-mono tracking-[0.4em] uppercase text-white/30 hover:text-blue-400 transition-colors border-b border-white/10 pb-2"
                  >
                    Back to Top
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : projectId === 'hangry-buddy' ? (
          <div className="bg-black pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              {[
                'https://pic1.imgdb.cn/item/69b8b525a77f4cac5be43ccb.jpg',
                'https://pic1.imgdb.cn/item/69b8b525a77f4cac5be43cc9.jpg',
                'https://pic1.imgdb.cn/item/69b8b525a77f4cac5be43cca.jpg',
                'https://pic1.imgdb.cn/item/69b8b525a77f4cac5be43ccd.jpg',
                'https://i.postimg.cc/N0TqH7PD/8-5.jpg',
                'https://i.postimg.cc/9Mt6xX2j/8-6.jpg',
                'https://i.postimg.cc/1z6hqcYc/8-7.jpg',
                'https://i.postimg.cc/qRXPmBrM/8-8.jpg',
                'https://i.postimg.cc/7YQptQFs/8-9.jpg'
              ].map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <img 
                    src={url} 
                    alt={`Packaging Detail ${idx + 1}`} 
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>

        ) : projectId === 'fadada' ? (
          <div className="bg-black pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              {[
                'https://i.postimg.cc/zG0T9j4s/fadada-1.png',
                'https://i.postimg.cc/BQhxzNWb/2.jpg',
                'https://i.postimg.cc/bwrN69PW/3-(1).jpg',
                'https://i.postimg.cc/d1tCnTWQ/4-1.jpg',
                'https://i.postimg.cc/NLh7Nj9k/4-(3).jpg',
                'https://i.postimg.cc/MKvp5YzJ/5-1.jpg',
                'https://i.postimg.cc/hPfts0cw/5-2.jpg',
                'https://i.postimg.cc/c4rLhc0X/6-1.jpg',
                'https://i.postimg.cc/GhHmKjb0/6-2.jpg',
                'https://i.postimg.cc/K8ZnqVps/fadada-2.png',
                'https://i.postimg.cc/VkYjGTZx/fadada-3.png',
                'https://i.postimg.cc/pdcYnZZs/fadada-4.png',
                'https://i.postimg.cc/JhsHSWNb/fadada-5.png',
                'https://i.postimg.cc/cCBvf1SP/fadada-6.png',
                'https://i.postimg.cc/yNCzCm9b/fadada-7.png',
                'https://i.postimg.cc/RZkvV5rn/fadada-8.png'
              ].map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <img 
                    src={url} 
                    alt={`Fadada Detail ${idx + 1}`} 
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : projectId === 'eco-flow' ? (
          <div className="bg-black pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              {[
                'https://pic1.imgdb.cn/item/69b8c31fa77f4cac5be46faf.png',
                'https://pic1.imgdb.cn/item/69b8c28aa77f4cac5be46cd0.png',
                'https://pic1.imgdb.cn/item/69b8c273a77f4cac5be46c75.png',
                'https://pic1.imgdb.cn/item/69b8c273a77f4cac5be46c73.png',
                'https://pic1.imgdb.cn/item/69b8c273a77f4cac5be46c77.png',
                'https://pic1.imgdb.cn/item/69b8c273a77f4cac5be46c76.png',
                'https://pic1.imgdb.cn/item/69b8c273a77f4cac5be46c74.png',
                'https://pic1.imgdb.cn/item/69b8c273a77f4cac5be46c72.png'
              ].map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <img 
                    src={url} 
                    alt={`Project Detail ${idx + 1}`} 
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : projectId === 'bolema-materials' ? (
          <div className="bg-black pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              {[
                'https://i.postimg.cc/GtvqGTjn/bo-le-ma-zhao-pin-wu-liao-she-ji1.png',
                'https://i.postimg.cc/fLG9cHHZ/bo-le-ma-zhao-pin-wu-liao-she-ji2.png',
                'https://i.postimg.cc/LXYPZdVF/bo-le-ma-zhao-pin-wu-liao-she-ji3.png',
                'https://i.postimg.cc/6qCYn4hJ/bo-le-ma-zhao-pin-wu-liao-she-ji4.png',
                'https://i.postimg.cc/Y95W6XXp/bo-le-ma-zhao-pin-wu-liao-she-ji5.png',
                'https://i.postimg.cc/9MR9q3B2/bo-le-ma-zhao-pin-wu-liao-she-ji6.png'
              ].map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <img 
                    src={url} 
                    alt={`Project Detail ${idx + 1}`} 
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Fallback for unknown projects */}
            <div className="lg:col-span-12 text-center py-32">
               <p className="text-white/40">Project content coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Next Project Footer */}
      <div className="bg-[#080808] py-48 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-[10px] tracking-[0.5em] uppercase text-white/20 mb-12 font-bold">Next Case Study</h3>
          <button 
            onClick={() => {
              const nextIdx = (PROJECTS.findIndex(p => p.id === projectId) + 1) % PROJECTS.length;
              onBack();
              setTimeout(() => onSelectProject(PROJECTS[nextIdx].id), 300);
            }}
            className="group inline-block"
          >
            <div className="text-7xl md:text-9xl font-serif italic mb-8 group-hover:text-blue-400 transition-all duration-700 transform group-hover:scale-105">
              {PROJECTS[(PROJECTS.findIndex(p => p.id === projectId) + 1) % PROJECTS.length].title}
            </div>
            <div className="flex items-center justify-center space-x-4 text-white/40 group-hover:text-white transition-colors">
              <span className="text-sm tracking-widest uppercase">View Project</span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MotionDetail = ({ motionId, onBack }: { motionId: string, onBack: () => void }) => {
  const work = MOTION_WORKS.find(w => w.id === motionId);
  if (!work) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black overflow-y-auto"
    >
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-[70] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        <X size={24} />
      </button>

      <div className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center pt-32 pb-24 px-6">
        <div className="max-w-4xl w-full space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase">{work.category}</span>
              <div className="h-[1px] w-12 bg-blue-500/30"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tight text-white">
              {work.title}
            </h1>
            <p className="text-lg text-white/40 font-light leading-relaxed italic">
              {work.subtitle}
            </p>
          </div>

          {/* Main Visual */}
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
            <img 
              src={work.image} 
              alt={work.title} 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <p className="text-white/60 leading-relaxed text-lg whitespace-pre-line">
              {work.description}
            </p>
            <div className="h-[1px] w-24 bg-white/10 mx-auto"></div>
          </div>

          {/* Additional Details if any */}
          {work.details && work.details.length > 1 && (
            <div className="grid grid-cols-1 gap-12">
              {work.details.slice(1).map((url, idx) => (
                <div key={idx} className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                  <img 
                    src={url} 
                    alt={`${work.title} Detail ${idx + 1}`} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Gallery in a row */}
          {work.gallery && work.gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {work.gallery.map((url, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg bg-zinc-900">
                  <img 
                    src={url} 
                    alt={`${work.title} Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#080808] py-24 border-t border-white/5 text-center">
        <button 
          onClick={onBack}
          className="text-xs font-mono tracking-[0.4em] uppercase text-white/30 hover:text-blue-400 transition-colors"
        >
          Close Project
        </button>
      </div>
    </motion.div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          <ArrowRight size={20} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedMotionId, setSelectedMotionId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProjectId, selectedMotionId]);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleSelectMotion = (id: string) => {
    setSelectedMotionId(id);
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        clearProject={() => {
          setSelectedProjectId(null);
          setSelectedMotionId(null);
        }} 
      />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onExplore={() => setCurrentPage('projects')} />
            <About />
            <Projects onSelectProject={handleSelectProject} />
            <MotionDesignSection onSelectMotion={handleSelectMotion} />
            <AIGCSection />
          </>
        )}
        
        {currentPage === 'about' && <About />}
        
        {currentPage === 'projects' && (
          <div className="pt-20">
            <Projects onSelectProject={handleSelectProject} />
          </div>
        )}

        {currentPage === 'aigc' && (
          <div className="pt-20">
            <AIGCSection />
          </div>
        )}

        {currentPage === 'motion' && (
          <div className="pt-20">
            <MotionDesignSection onSelectMotion={handleSelectMotion} />
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />

      <AnimatePresence>
        {selectedProjectId && (
          <ProjectDetail 
            projectId={selectedProjectId} 
            onBack={() => setSelectedProjectId(null)} 
            onSelectProject={handleSelectProject}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMotionId && (
          <MotionDetail 
            motionId={selectedMotionId} 
            onBack={() => setSelectedMotionId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
