export interface Project {
  name: string;
  repoLink: string;
  demoLink?: string;
  tags?: string[];
  description?: string;
}

// Public, non-fork repositories from https://github.com/X-Olivia,
// ordered by the latest GitHub update time.
export const projects: Project[] = [
  {
    name: 'AirWriting-Model-Hub',
    description: 'A web interface integrating air-writing recognition with real-time visualization — bridging gesture input and digital expression.',
    repoLink: 'https://github.com/X-Olivia/AirWriting-Model-Hub',
    demoLink: 'https://x-olivia.github.io/AirWriting-Model-Hub/',
    tags: ['TypeScript']
  },
  {
    name: 'satellite_marl',
    description: 'An research project about LEO Satellite Multi-Agent RL Packet Routing',
    repoLink: 'https://github.com/X-Olivia/satellite_marl',
    tags: ['Python']
  },
  {
    name: 'Menstral_Prediction_OER.io',
    description: 'An open educational resource for people entering menstrual-cycle prediction from app development, AI / data science, or medicine.',
    repoLink: 'https://github.com/X-Olivia/Menstral_Prediction_OER.io',
    demoLink: 'https://x-olivia.github.io/Menstral_Prediction_OER.io/',
    tags: ['HTML']
  },
  {
    name: 'welcome-to-uni-openday',
    description: 'A funny Weekend Hackathon Project',
    repoLink: 'https://github.com/X-Olivia/welcome-to-uni-openday',
    demoLink: 'https://welcome-hazel.vercel.app',
    tags: ['Python']
  },
  {
    name: 'Women-in-Tech-Museum',
    description: 'An online museum celebrating women pioneers who shaped science, technology, engineering, and mathematics across 4,000 years of history.',
    repoLink: 'https://github.com/X-Olivia/Women-in-Tech-Museum',
    tags: ['TypeScript']
  },
  {
    name: 'My_Website',
    repoLink: 'https://github.com/X-Olivia/My_Website'
  },
  {
    name: 'Ymir',
    description: 'AI-powered social content creation assistant built with Flutter. Features 10 unique AI characters for image analysis, caption suggestions, and intelligent commenting. Supports cross-platform deployment with secure local data storage.',
    repoLink: 'https://github.com/X-Olivia/Ymir',
    tags: ['Dart']
  },
  {
    name: 'Menstrual-Cycle-Prediction-from-WearablePhysiological-Data-in-Irregular-Cycles',
    repoLink: 'https://github.com/X-Olivia/Menstrual-Cycle-Prediction-from-WearablePhysiological-Data-in-Irregular-Cycles',
    tags: ['Python']
  },
  {
    name: 'bilibili-content-analyzer',
    description: 'A comprehensive data analysis tool for Bilibili video content with customizable keywords, sentiment analysis, and interactive visualizations',
    repoLink: 'https://github.com/X-Olivia/bilibili-content-analyzer',
    tags: ['Python']
  },
  {
    name: 'Calm',
    description: '开发中',
    repoLink: 'https://github.com/X-Olivia/Calm'
  },
  {
    name: 'quantum-maze',
    description: 'A team-built quantum physics puzzle game — where players explore superposition, entanglement, and uncertainty through interactive mazes.',
    repoLink: 'https://github.com/X-Olivia/quantum-maze',
    tags: ['GDScript']
  },
  {
    name: 'flobot',
    description: 'A menstrual care service robot combining predictive tracking, gentle mobility, and emotional support — built for real-world empathy.',
    repoLink: 'https://github.com/X-Olivia/flobot',
    tags: ['Python']
  },
  {
    name: 'Practice',
    description: 'Start from now',
    repoLink: 'https://github.com/X-Olivia/Practice',
    tags: ['Python']
  }
];
