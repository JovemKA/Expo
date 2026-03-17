export const profileData = {
  name: 'Andrey Kaiky Reis Ferreira',
  bio: 'Sou de Recife, PE, Brasil, e atualmente estou cursando Sistemas para Internet na UNICAP (Universidade Católica de Pernambuco). Estou aprendendo linguagens e frameworks como JavaScript/Node.js, Java/Spring Boot, Python e Golang, além de tecnologias como React, Docker e SQL. Em todos os meus projetos, utilizo o Git para versionamento de código e colaboração.',
  profileImage: require('@/assets/images/profile.jpg'),
  fallbackImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrey',
  
  stack: [
    {
      category: 'Backend',
      icon: 'hammer.fill',
      technologies: ['NestJS', 'Node.js', 'Java/Spring Boot', 'Python', 'Golang']
    },
    {
      category: 'Frontend',
      icon: 'paintbrush.fill',
      technologies: ['React', 'React Native', 'VueJS', 'TypeScript', 'JavaScript']
    },
    {
      category: 'Database',
      icon: 'cylinder.fill',
      technologies: ['SQL', 'PostgreSQL', 'MySQL']
    },
    {
      category: 'Tools',
      icon: 'wrench.fill',
      technologies: ['Git', 'Docker', 'VSCode', 'Linux']
    }
  ],
  
  disciplineTitle: 'App criado para a disciplina Programação para Dispositivos Móveis'
};
