import { ImageSourcePropType } from 'react-native';

import { findFirst, findMany, isBack4AppConfigured } from '@/services/back4app';
import {
  academic as localAcademic,
  extraFeatures as localExtraFeatures,
  professional as localProfessional,
  projects as localProjects,
  portfolioFallback,
  type AcademicItem,
  type PortfolioContent,
  type PortfolioSummary,
  type ProfessionalItem,
  type Project,
} from '@/services/data';

type RemoteProfile = {
  name: string;
  title: string;
  bio: string;
  location?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

type RemoteAcademicItem = AcademicItem & {
  sortOrder?: number;
  isActive?: boolean;
};

type RemoteProfessionalItem = ProfessionalItem & {
  sortOrder?: number;
  isActive?: boolean;
};

type RemoteProject = Project & {
  sortOrder?: number;
  isActive?: boolean;
};

type RemotePortfolioSettings = {
  certificates?: number;
  experience?: string;
  projects?: number;
  appTechnologies?: string[];
  extraFeatures?: string[];
};

type RemotePortfolioContent = Partial<{
  profile: PortfolioContent['profile'];
  summary: PortfolioSummary;
  academic: AcademicItem[];
  professional: ProfessionalItem[];
  projects: Project[];
  appTechnologies: readonly string[];
  extraFeatures: readonly string[];
  aboutParagraphs: string[];
}>;

const CLASS_NAMES = {
  profile: 'PortfolioProfile',
  academic: 'PortfolioAcademic',
  professional: 'PortfolioProfessional',
  projects: 'PortfolioProject',
  settings: 'PortfolioSettings',
  about: 'PortfolioAbout',
} as const;

function toImageSource(value?: string): ImageSourcePropType | undefined {
  return value ? { uri: value } : undefined;
}

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
}

function mapProject(remote: RemoteProject): Project {
  return {
    title: remote.title ?? '',
    description: remote.description ?? '',
    technologies: remote.technologies ?? [],
    links: {
      github: (remote as any).githubUrl ?? (remote as any).links?.github,
      demo: (remote as any).demoUrl ?? (remote as any).links?.demo,
    },
    featured: Boolean((remote as any).featured),
  };
}

function mapProfile(remote: RemoteProfile) {
  const fallbackProfile = portfolioFallback.profile;

  return {
    ...fallbackProfile,
    name: remote.name,
    title: remote.title,
    bio: remote.bio,
    location: remote.location ?? fallbackProfile.location,
    avatar: toImageSource(remote.avatarUrl) ?? fallbackProfile.avatar,
    links: {
      github: remote.githubUrl ?? fallbackProfile.links.github,
      linkedin: remote.linkedinUrl ?? fallbackProfile.links.linkedin,
    },
  };
}

function mapSummary(remote?: RemotePortfolioSettings | null) {
  const fallbackSummary = portfolioFallback.summary;

  return {
    certificates: remote?.certificates ?? fallbackSummary.certificates,
    experience: remote?.experience ?? fallbackSummary.experience,
    projects: remote?.projects ?? fallbackSummary.projects,
  };
}

async function loadRemotePortfolioContent(): Promise<RemotePortfolioContent> {
  if (!isBack4AppConfigured()) {
    return {};
  }

  const [remoteProfile, remoteAcademic, remoteProfessional, remoteProjects, remoteSettings] =
    await Promise.all([
      findFirst<RemoteProfile>(CLASS_NAMES.profile),
      findMany<RemoteAcademicItem>(CLASS_NAMES.academic, { order: 'sortOrder' }),
      findMany<RemoteProfessionalItem>(CLASS_NAMES.professional, { order: 'sortOrder' }),
      findMany<RemoteProject>(CLASS_NAMES.projects, { order: 'sortOrder' }),
      findFirst<RemotePortfolioSettings>(CLASS_NAMES.settings),
    ]);

  // try to load about content (single record expected)
  let remoteAbout: { paragraphs?: string[] } | null = null;
  try {
    const aboutRecord = await findFirst<{ paragraphs?: string[] }>(CLASS_NAMES.about);
    remoteAbout = aboutRecord ?? null;
  } catch (e) {
    remoteAbout = null;
  }

  return {
    profile: remoteProfile ? mapProfile(remoteProfile) : undefined,
    summary: mapSummary(remoteSettings),
    academic: remoteAcademic.length > 0 ? sortByOrder(remoteAcademic.filter((item) => item.isActive !== false)) : undefined,
    professional:
      remoteProfessional.length > 0
        ? sortByOrder(remoteProfessional.filter((item) => item.isActive !== false))
        : undefined,
    projects:
      remoteProjects.length > 0
        ? sortByOrder(remoteProjects.filter((item) => item.isActive !== false)).map(mapProject)
        : undefined,
    appTechnologies: remoteSettings?.appTechnologies ?? undefined,
    extraFeatures: remoteSettings?.extraFeatures ?? undefined,
    aboutParagraphs: remoteAbout?.paragraphs ?? undefined,
  };
}

function mergePortfolioContent(remote: RemotePortfolioContent): PortfolioContent {
  return {
    profile: remote.profile ?? portfolioFallback.profile,
    summary: remote.summary ?? portfolioFallback.summary,
    academic: remote.academic ?? localAcademic,
    professional: remote.professional ?? localProfessional,
    projects: remote.projects ?? localProjects,
    appTechnologies: remote.appTechnologies ?? portfolioFallback.appTechnologies,
    extraFeatures: remote.extraFeatures ?? localExtraFeatures,
    aboutParagraphs: remote.aboutParagraphs ?? portfolioFallback.aboutParagraphs,
  };
}

export async function getPortfolioContent() {
  const remote = await loadRemotePortfolioContent();
  return mergePortfolioContent(remote);
}

export { loadRemotePortfolioContent, mergePortfolioContent };
