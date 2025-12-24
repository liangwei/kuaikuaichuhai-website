/**
 * Strapi CMS 数据类型定义（Strapi 5.x 格式）
 */

// Strapi 基础响应结构
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// 媒体文件格式
export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// 媒体文件（Strapi 5.x 扁平格式）
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// 标签（Strapi 5.x 扁平格式）
export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string | null;
  title?: string;  // SEO 标题
  description?: string;  // SEO 描述
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// 文章（Strapi 5.x 扁平格式）
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  description?: string;
  content: string;
  excerpt?: string;
  featured: boolean;
  type: 'seo' | 'geo' | 'social';
  author?: string;
  viewCount?: number;
  coverImage?: StrapiMedia | null;
  tags?: Tag[];
  status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// 服务特性
export interface ServiceFeature {
  id: number;
  title: string;
  description: string;
}

// 服务（Strapi 5.x 扁平格式）
export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  description: string;
  shortDescription: string;
  heroTitle?: string;
  heroSubtitle?: string;
  content?: string;
  features?: ServiceFeature[];
  featured: boolean;
  order: number;
  icon?: StrapiMedia | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// 联系表单（Strapi 5.x 扁平格式）
export interface Contact {
  id: number;
  documentId: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  serviceType: 'seo' | 'geo' | 'social' | 'other';
  message: string;
  dealStatus: 'pending' | 'contacted' | 'closed';
  source?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// 案例成果数据
export interface CaseResult {
  id: number;
  metric: string;
  value: string;
  icon?: string;
}

// 案例（Strapi 5.x 扁平格式）
export interface Case {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  client?: string;
  clientLogo?: StrapiMedia | null;
  industry?: 'ecommerce' | 'saas' | 'manufacturing' | 'tourism' | 'other';
  serviceType: 'seo' | 'geo' | 'social';
  description?: string;
  challenge?: string;
  solution?: string;
  results?: CaseResult[];
  coverImage?: StrapiMedia | null;
  images?: StrapiMedia[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// 列表响应类型
export type ArticlesResponse = StrapiResponse<Article[]>;
export type TagsResponse = StrapiResponse<Tag[]>;
export type ServicesResponse = StrapiResponse<Service[]>;
export type ContactsResponse = StrapiResponse<Contact[]>;
export type CasesResponse = StrapiResponse<Case[]>;
