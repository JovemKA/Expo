import { ImageSourcePropType } from 'react-native';

export type Profile = {
  name: string;
  title: string;
  bio: string;
  avatar: ImageSourcePropType;
  links: {
    github: string;
    linkedin: string;
  };
};

export type AcademicItem = {
  institution: string;
  course: string;
  period: string;
  description: string;
};

export type ProfessionalItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
  };
  featured?: boolean;
};

export const profile: Profile = {
  name: 'Jordan Lee',
  title: 'Senior React Native Engineer',
  bio: 'I craft mobile products that blend performance, accessibility, and thoughtful design systems. This resume app demonstrates a reusable component approach, structured navigation, and data-driven storytelling.',
  avatar: require('../assets/images/react-logo.png'),
  links: {
    github: 'https://github.com/jordanlee',
    linkedin: 'https://www.linkedin.com/in/jordanlee',
  },
};

export const academic: AcademicItem[] = [
  {
    institution: 'Westbridge University',
    course: 'B.S. in Computer Science',
    period: '2013 - 2017',
    description: 'Focused on human-computer interaction, software architecture, and mobile computing. Led a capstone project on realtime health analytics.',
  },
  {
    institution: 'Northshore Institute of Technology',
    course: 'M.S. in Software Engineering',
    period: '2018 - 2020',
    description: 'Researched scalable UI architectures and built a component library for cross-platform teams.',
  },
];

export const professional: ProfessionalItem[] = [
  {
    role: 'Senior React Native Engineer',
    company: 'Orbit Labs',
    period: '2022 - Present',
    description: 'Led the mobile platform modernization effort, introducing a modular architecture, automated release pipelines, and a design-token driven UI kit.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'GraphQL', 'Jest'],
  },
  {
    role: 'Mobile Engineer',
    company: 'Nova Health',
    period: '2019 - 2022',
    description: 'Built clinical workflow tools with offline-first sync, biometric onboarding, and analytics dashboards for providers.',
    technologies: ['React Native', 'Redux Toolkit', 'Firebase', 'SQLite', 'Figma'],
  },
];

export const projects: Project[] = [
  {
    title: 'PulsePay',
    description: 'A digital wallet experience with instant transfers, spend insights, and a new user onboarding flow that reduced drop-off by 18%.',
    technologies: ['Expo', 'React Native', 'TypeScript'],
    links: {
      github: 'https://github.com/jordanlee/pulsepay',
      demo: 'https://pulsepay.app',
    },
    featured: true,
  },
  {
    title: 'Atlas Mobility',
    description: 'A fleet management companion for delivery drivers with live route changes, safety checklists, and performance snapshots.',
    technologies: ['React Native', 'Maps', 'REST APIs'],
    links: {
      github: 'https://github.com/jordanlee/atlas-mobility',
    },
    featured: true,
  },
  {
    title: 'Studio Minutes',
    description: 'A creative studio planner that organizes client briefs, moodboards, and timelines in a visual workspace.',
    technologies: ['Expo Router', 'Gluestack UI', 'TypeScript'],
    links: {
      github: 'https://github.com/jordanlee/studio-minutes',
      demo: 'https://studio-minutes.app',
    },
    featured: true,
  },
  {
    title: 'Harvest AI',
    description: 'An agriculture insights app that turns sensor data into irrigation recommendations and weather forecasts.',
    technologies: ['React Native', 'Charting', 'Edge Functions'],
    links: {
      github: 'https://github.com/jordanlee/harvest-ai',
    },
  },
];

export const appTechnologies = ['Expo', 'React Native', 'Gluestack UI', 'Expo Router', 'TypeScript'] as const;

export const extraFeatures = [
  'Theme toggle with persisted preference',
  'Animated project filtering using LayoutAnimation',
  'Smooth stack transitions across screens',
] as const;
