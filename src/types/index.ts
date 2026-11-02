export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  subServices: {
    title: string;
    description: string;
  }[];
  capabilities: string[];
  technologies: string[];
  businessValue: string[];
  deliverables: string[];
  engagementProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProjectSlugs?: string[];
}

export interface ProjectGalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  specs?: { label: string; value: string }[];
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName?: string;
  category: string;
  categorySlug: string;
  summary: string;
  status: "Enterprise Deployment" | "Production" | "Concept & Prototype";
  problemStatement: string;
  solutionOverview: string;
  keyFeatures: string[];
  architectureHighlights: string[];
  techStack: string[];
  challengesAndMitigations: {
    challenge: string;
    mitigation: string;
  }[];
  resultsOrImpact: string[];
  relatedServiceSlugs: string[];
  accentColor: string;
  mockupType: "mobile" | "dashboard" | "gis" | "cloud" | "security" | "streaming" | "epos" | "medical";
  liveUrl?: string;
  images?: ProjectGalleryItem[];
  enterprisePartners?: string[];
  appStoreLinks?: {
    name: string;
    url: string;
    platform?: string;
  }[];
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  challenges: string[];
  solutions: string[];
  relevantServices: string[];
  keyHighlight: string;
  iconName: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    codeSnippet?: {
      language: string;
      code: string;
    };
    diagramNote?: string;
  }[];
  relatedSlugs: string[];
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  comment: string;
  recommendation: string;
  badge?: string;
  project?: string;
  verified?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone?: string;
  location: string;
  companyProfileUrl: string;
  socials: {
    platform: string;
    url: string;
  }[];
}
