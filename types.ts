
export type Role = 'user' | 'model' | 'admin';

export interface Message {
  id: string;
  conversationId: string;
  role: Role;
  text: string;
  timestamp: number;
  isThinking?: boolean;
  quickReplies?: string[];
  actionRequired?: boolean;
  summary?: string; 
}

export interface GradeRecord {
  gr10: number;
  gr11: number;
  gr12hk1: number;
  gr12hk2: number;
}

export interface SubjectMap {
  [key: string]: GradeRecord; 
}

export interface CandidateInfo {
  fullName: string;
  dob: string;
  phone: string;
  password?: string;
  email: string;
  cccd: string;
  province: string;
  highSchool: string;
  gradYear: string;
  priorityArea: 'KV1' | 'KV2-NT' | 'KV2' | 'KV3';
  priorityObject: string;
}

export interface CalculationResult {
  method: string;
  methodName: string;
  totalScore: number;
  combination: string;
  subjects: string[];
}

export interface AdmissionProfile {
  candidateInfo: CandidateInfo;
  selectedMajorCode: string;
  inputScores: SubjectMap;
  bestResult: CalculationResult;
  finalScore: number; 
  priorityScore: number;
  status: 'DAT' | 'CAN_XEM_XET' | 'KHONG_DAT';
  submittedAt: number;
}

export interface User {
  id: string;
  name: string;
  username?: string; // For admin login
  phone?: string;
  password?: string;
  role: 'user' | 'admin';
  zalo?: string;
  email?: string;
  status: 'active' | 'banned';
  interestedMajor?: string;
  admissionProfile?: AdmissionProfile;
  createdAt: number;
  lastActiveAt: number;
  messagesCount: number;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  lastMessage: string;
  updatedAt: number;
  isRead: boolean;
  tags?: string[];
  intent?: string; 
}

export interface RAGDocument {
    id: string;
    title: string;
    content: string;
    type: 'PDF' | 'DOCX' | 'TEXT';
    status: 'Indexed' | 'Processing' | 'Error';
    updatedAt: number;
    size?: string;
    vectorId?: string;
}

export interface MajorDetail {
  overview: string;
  careerPaths: string[];
  curriculumHighlights: string[];
}

export interface Major {
  stt: number;
  code: string;
  name: string;
  tuitionHK1: number;
  pricePerCredit: number;
  creditsHK1: number;
  benchmarks: {
    thpt: number;
    hocba: number;
    dgnl?: number;
    vsat?: number;
    notes?: string;
  };
  combinations: string[];
  group: string;
  icon?: any;
  color: string;
  details: MajorDetail;
}

export interface AdmissionTimeline {
  event: string;
  date: string;
  desc: string;
  icon?: any;
}

export interface ScholarshipPolicy {
  name: string;
  value: string;
  amount: number;
  condition: string;
  minHocBa?: number;
  minTHPT?: number;
  icon?: any;
  color?: string;
}

export interface Highlight {
  title: string;
  desc: string;
  icon: string;
  color: string;
  stat: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  color: string;
  image?: string;
}

// --- CMS TYPES ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  desc?: string;
  associatedTags: string[];
}

export interface Attachment {
    name: string;
    url: string;
    type: 'pdf' | 'doc' | 'image' | 'other';
    size?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string; 
  date: string;
  scheduleDate?: string; 
  category: string;
  tags: string[];
  color: string;
  image: string; 
  thumbnail?: string;
  seoTitle?: string;
  seoDesc?: string;
  status: 'published' | 'draft' | 'scheduled';
  views: number;
  author?: string;
  // New fields for detail view
  iframeUrl?: string;
  attachments?: Attachment[];
  relatedLinks?: { text: string; url: string }[];
  isFeatured?: boolean;
}

// --- AI/CHATBOT ADVANCED TYPES (RASA-LIKE) ---
export interface IntentEntity {
    entity: string;
    value: string;
    start: number;
    end: number;
}

export interface IntentExample {
    text: string;
    entities?: IntentEntity[];
}

export interface NLUIntent {
    name: string;
    examples: IntentExample[];
    description?: string;
}

export interface RasaRule {
    id: string;
    rule: string;
    steps: {
        intent?: string;
        action?: string;
    }[];
}

export interface RasaStory {
    id: string;
    story: string;
    steps: {
        intent?: string;
        action?: string;
        user?: string; // For explicit text matching
    }[];
}

export interface RasaDomain {
    intents: string[];
    actions: string[];
    responses: Record<string, {text: string}[]>;
}

export interface LLMConfig {
    provider: 'gemini' | 'openai';
    apiKey?: string;
    modelName: string;
    systemPrompt: string;
    temperature: number;
    topK: number;
    maxOutputTokens: number;
    quotaUsed: number;
    quotaLimit: number;
    lastTrainedAt: number;
}

// --- SYSTEM BACKUP TYPE ---
export interface SystemBackup {
    version: string;
    timestamp: number;
    users: User[];
    conversations: Conversation[];
    messages: Message[];
    ragDocs: RAGDocument[];
    news: NewsItem[];
    config: LLMConfig;
    rules: RasaRule[];
    stories: RasaStory[];
}

export interface UniversityData {
  general: {
    name: string;
    code: string;
    address: string;
    hotline: string;
    zalo: string;
    email: string;
    website: string;
    stats: {
      employmentRate: string;
      partners: number;
      years: number;
    };
    description: string;
  };
  majors: Major[];
  scholarships: ScholarshipPolicy[];
  timeline: AdmissionTimeline[];
  highlights: Highlight[];
  testimonials: Testimonial[];
  news: NewsItem[];
  admissionMethods: {
      name: string;
      desc: string;
      icon: string;
  }[];
  scholarshipSteps: {
      step: string;
      title: string;
      desc: string;
  }[];
}

export enum ViewState {
  HOME,
  ABOUT,
  MAJORS,
  ADMISSIONS,
  NEWS,
  NEWS_DETAIL,
  ADMIN,
  CHAT_FULL,
  CHATBOT
}

export interface ChatInterfaceProps {
  isFullScreen?: boolean;
  isWidget?: boolean;
  initialMessage?: string;
  pageContext?: string;
}
