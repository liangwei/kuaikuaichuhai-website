/**
 * Strapi CMS API 工具函数
 * 兼容 Payload CMS 接口格式
 */

import { Article, Tag, Service, Contact, Case, ArticlesResponse as StrapiArticlesResponse } from './types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Payload 兼容的响应格式
interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * 将 Strapi 响应转换为 Payload 格式
 */
function convertToPayloadFormat<T>(strapiData: StrapiArticlesResponse | any): PayloadResponse<T> {
  const { data, meta } = strapiData;
  const pagination = meta.pagination || {
    page: 1,
    pageSize: 25,
    pageCount: 0,
    total: 0,
  };

  return {
    docs: data,
    totalDocs: pagination.total,
    limit: pagination.pageSize,
    totalPages: pagination.pageCount,
    page: pagination.page,
    pagingCounter: (pagination.page - 1) * pagination.pageSize + 1,
    hasPrevPage: pagination.page > 1,
    hasNextPage: pagination.page < pagination.pageCount,
    prevPage: pagination.page > 1 ? pagination.page - 1 : null,
    nextPage: pagination.page < pagination.pageCount ? pagination.page + 1 : null,
  };
}

/**
 * 通用的 Strapi API 请求函数
 */
async function fetchAPI(path: string, queryParams: Record<string, any> = {}) {
  const params = new URLSearchParams();

  // 处理查询参数
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const url = `${API_URL}${path}${params.toString() ? `?${params}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // 简单方案：不缓存，总是获取最新数据
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    console.error('URL:', url);
    throw error;
  }
}

/**
 * 获取所有文章
 */
export async function getArticles(options?: {
  type?: 'seo' | 'geo' | 'social';
  tag?: string;
  limit?: number;
  page?: number;
  status?: 'draft' | 'published';
}): Promise<PayloadResponse<Article>> {
  const params: Record<string, any> = {
    'populate': '*',
    'pagination[page]': options?.page || 1,
    'pagination[pageSize]': options?.limit || 25,
    'sort[0]': 'publishedAt:desc',
  };

  // 过滤条件
  if (options?.type) {
    params['filters[type][$eq]'] = options.type;
  }

  // 标签过滤（Strapi 5.x 的关联过滤）
  if (options?.tag) {
    params['filters[tags][name][$eq]'] = options.tag;
  }

  const data = await fetchAPI('/articles', params);
  return convertToPayloadFormat<Article>(data);
}

/**
 * 根据 slug 获取单个文章
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const params = {
    'filters[slug][$eq]': slug,
    'populate': '*',
  };

  const data = await fetchAPI('/articles', params);
  return data.data?.[0] || null;
}

/**
 * 根据 ID 获取单个文章
 */
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const data = await fetchAPI(`/articles/${id}`, { populate: '*' });
    return data.data || null;
  } catch {
    return null;
  }
}

/**
 * 获取相关文章（同类型的其他文章）
 */
export async function getRelatedArticles(
  articleId: string | number,
  type: 'seo' | 'geo' | 'social',
  limit: number = 6
): Promise<Article[]> {
  const params = {
    'filters[type][$eq]': type,
    'filters[id][$ne]': articleId,
    'populate': '*',
    'pagination[pageSize]': limit,
    'sort[0]': 'publishedAt:desc',
  };

  const data = await fetchAPI('/articles', params);
  return data.data || [];
}

/**
 * 增加文章浏览量
 */
export async function incrementArticleViewCount(id: string): Promise<void> {
  // Strapi 5.x 需要先获取当前值，然后更新
  // 这个功能需要在 Strapi 后端实现自定义 API 端点
  // 暂时跳过实现
  console.warn('incrementArticleViewCount not implemented for Strapi');
}

/**
 * 获取所有标签
 */
export async function getTags(): Promise<Tag[]> {
  const params = {
    'pagination[pageSize]': 100,
  };

  const data = await fetchAPI('/tags', params);
  return data.data || [];
}

/**
 * 根据 slug 获取标签
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const params = {
    'filters[slug][$eq]': slug,
  };

  const data = await fetchAPI('/tags', params);
  return data.data?.[0] || null;
}

/**
 * 获取所有服务
 */
export async function getServices(options?: {
  limit?: number;
}): Promise<PayloadResponse<Service>> {
  const params: Record<string, any> = {
    'populate': '*',
    'pagination[pageSize]': options?.limit || 25,
    'sort[0]': 'order:asc',
  };

  const data = await fetchAPI('/services', params);
  return convertToPayloadFormat<Service>(data);
}

/**
 * 根据 slug 获取服务页面
 */
export async function getServiceBySlug(slug: 'seo' | 'geo' | 'social'): Promise<Service | null> {
  const params = {
    'filters[slug][$eq]': slug,
    'populate': '*',
  };

  const data = await fetchAPI('/services', params);
  return data.data?.[0] || null;
}

/**
 * 获取最新文章
 */
export async function getLatestArticles(limit: number = 6): Promise<Article[]> {
  const params = {
    'populate': '*',
    'pagination[pageSize]': limit,
    'sort[0]': 'publishedAt:desc',
  };

  const data = await fetchAPI('/articles', params);
  return data.data || [];
}

/**
 * 获取热门标签
 */
export async function getPopularTags(limit: number = 10): Promise<Tag[]> {
  const params = {
    'pagination[pageSize]': limit,
  };

  const data = await fetchAPI('/tags', params);
  return data.data || [];
}

/**
 * 获取 Strapi 媒体文件的完整 URL
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * 提交联系表单
 */
export async function submitContact(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  serviceType: 'seo' | 'geo' | 'social' | 'other';
  message: string;
  source?: string;
}): Promise<Contact> {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        ...data,
        dealStatus: 'pending',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit contact: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
}

/**
 * 获取所有案例
 */
export async function getCases(options?: {
  serviceType?: 'seo' | 'geo' | 'social';
  featured?: boolean;
  limit?: number;
  page?: number;
}): Promise<PayloadResponse<Case>> {
  const params: Record<string, any> = {
    'populate': '*',
    'pagination[page]': options?.page || 1,
    'pagination[pageSize]': options?.limit || 12,
    'sort[0]': 'order:asc',
  };

  if (options?.serviceType) {
    params['filters[serviceType][$eq]'] = options.serviceType;
  }

  if (options?.featured !== undefined) {
    params['filters[featured][$eq]'] = options.featured;
  }

  const data = await fetchAPI('/cases', params);
  return convertToPayloadFormat<Case>(data);
}

/**
 * 根据 slug 获取单个案例
 */
export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const params = {
    'filters[slug][$eq]': slug,
    'populate': '*',
  };

  const data = await fetchAPI('/cases', params);
  return data.data?.[0] || null;
}

/**
 * 获取相关案例
 */
export async function getRelatedCases(
  caseId: string | number,
  serviceType: 'seo' | 'geo' | 'social',
  limit: number = 3
): Promise<Case[]> {
  const params = {
    'filters[serviceType][$eq]': serviceType,
    'filters[id][$ne]': caseId,
    'populate': '*',
    'pagination[pageSize]': limit,
    'sort[0]': 'order:asc',
  };

  const data = await fetchAPI('/cases', params);
  return data.data || [];
}

