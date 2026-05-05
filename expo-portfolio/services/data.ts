import { ImageSourcePropType } from 'react-native';

export type Profile = {
  name: string;
  title: string;
  bio: string;
  avatar: ImageSourcePropType;
  links: {
    github?: string;
    linkedin?: string;
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
  name: 'Andrey Kaiky Reis Ferreira',
  title: 'Desenvolvedor de Software',
  bio: 'Sou estudante e desenvolvedor de software apaixonado por tecnologia, inovação e trabalho em equipe, com experiência em desenvolvimento utilizando Java, JavaScript e TypeScript. Atuo em projetos com NestJS, Spring Boot e Vue.js, participando tanto da construção de novas soluções quanto da manutenção e evolução de sistemas complexos. Possuo forte habilidade de comunicação, o que me permite alinhar objetivos, compartilhar conhecimento e contribuir para ambientes colaborativos e produtivos. Busco constantemente crescimento profissional e oportunidades para colaborar com equipes comprometidas com entregas de alta qualidade.',
  avatar: require('../assets/images/profile.jpg'),
  links: {
    github: 'https://github.com/jovemka',
    linkedin: 'https://www.linkedin.com/in/andreykaiky/',
  },
};

export const academic: AcademicItem[] = [
  {
    institution: 'UNICAP - Universidade Católica de Pernambuco',
    course: 'Tecnólogo em Sistemas para Internet',
    period: 'JAN 2024 – DEZ 2026',
    description: 'Curso em andamento com foco em desenvolvimento web, programação orientada a objetos, inteligência artificial aplicada e testes de software. Principais disciplinas: Aplicações Orientadas a Serviços, POO, IA Aplicada e Processos de Testes.',
  },
  {
    institution: 'CESAR School',
    course: 'Formação Acelerada em Soluções de Techdesign (FAST)',
    period: 'SET 2024',
    description: 'Formação intensiva com foco em Agilidade, Fundamentos de Frontend, Web API, React e Testes Automatizados.',
  },
  {
    institution: 'Alura',
    course: 'Formação: A partir do zero - Programação',
    period: 'JUL 2024',
    description: 'Curso introdutório em programação para iniciantes.',
  },
];

export const professional: ProfessionalItem[] = [
  {
    role: 'Estágio em Desenvolvimento de Sistemas',
    company: 'Radium Tecnologia',
    period: 'MAI 2025 – NOV 2025',
    description: 'Desenvolvimento completo de aplicativo e serviço Android em Java utilizando Gradle, voltado à transmissão RTMP em tempo real. Integração com hardware específico e desenvolvimento de SaaS para gestão de videomonitoramento. Manutenção e evolução de backend em NestJS, incluindo correção de bugs e implementação de novas funcionalidades. Frontend em Vue.js utilizando Vue Router, Pinia e Element Plus. Atuação com arquitetura de microsserviços utilizando Docker, RabbitMQ e WebSockets. Participação em ambiente ágil com Scrum.',
    technologies: ['Java', 'Android', 'Gradle', 'RTMP', 'NestJS', 'Vue.js', 'Vue Router', 'Pinia', 'Element Plus', 'Docker', 'RabbitMQ', 'WebSockets', 'PostgreSQL', 'Git', 'Gitflow', 'Scrum'],
  },
];

export const projects: Project[] = [
  {
    title: 'Software de Organização Financeira',
    description: 'Desenvolvimento de API com autenticação via Supabase e implementação de CRUDs para visualização de relatórios financeiros. Projeto realizado durante a Residência Porto Digital em parceria com CinQ Finance.',
    technologies: ['JavaScript', 'Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'Git', 'GitHub', 'Scrum'],
    links: {
      github: 'https://github.com/monix',
    },
    featured: true,
  },
];

export const appTechnologies = ['Expo', 'React Native', 'Gluestack UI', 'Expo Router', 'TypeScript'] as const;

export const extraFeatures = [
  'Theme toggle with persisted preference',
  'Animated project filtering using LayoutAnimation',
  'Smooth stack transitions across screens',
] as const;
