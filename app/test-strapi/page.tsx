import { getArticles, getTags, getServices, getStrapiMediaUrl } from '@/lib/strapi';
import Image from 'next/image';

export default async function TestStrapiPage() {
  // 获取数据
  const articlesData = await getArticles();
  const tagsData = await getTags();
  const servicesData = await getServices();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Strapi CMS 数据测试</h1>

      {/* 文章列表 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">文章 ({articlesData.totalDocs || 0})</h2>
        {articlesData.docs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articlesData.docs.map((article) => {
              const coverUrl = article.coverImage
                ? getStrapiMediaUrl(article.coverImage.url)
                : null;

              return (
                <div key={article.id} className="border rounded-lg p-4 shadow-sm">
                  {coverUrl && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={coverUrl}
                        alt={article.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  {article.description && (
                    <p className="text-gray-600 mb-2">{article.description}</p>
                  )}
                  {article.featured && (
                    <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                      推荐
                    </span>
                  )}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-xs bg-gray-200 px-2 py-1 rounded"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">暂无文章。请在 Strapi 管理后台创建文章。</p>
        )}
      </section>

      {/* 标签列表 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">标签 ({tagsData.length || 0})</h2>
        {tagsData.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tagsData.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">暂无标签。请在 Strapi 管理后台创建标签。</p>
        )}
      </section>

      {/* 服务列表 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">服务 ({servicesData.totalDocs || 0})</h2>
        {servicesData.docs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.docs.map((service) => {
              const iconUrl = service.icon
                ? getStrapiMediaUrl(service.icon.url)
                : null;

              return (
                <div key={service.id} className="border rounded-lg p-4 shadow-sm">
                  {iconUrl && (
                    <div className="relative w-16 h-16 mb-4">
                      <Image
                        src={iconUrl}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  {service.shortDescription && (
                    <p className="text-gray-600">{service.shortDescription}</p>
                  )}
                  {service.featured && (
                    <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded mt-2">
                      推荐服务
                    </span>
                  )}
                  <p className="text-xs text-gray-400 mt-2">排序: {service.order}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">暂无服务。请在 Strapi 管理后台创建服务。</p>
        )}
      </section>

      {/* API 信息 */}
      <section className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">API 端点信息：</h3>
        <ul className="text-sm space-y-1">
          <li>• 文章: <code>http://localhost:1337/api/articles</code></li>
          <li>• 标签: <code>http://localhost:1337/api/tags</code></li>
          <li>• 服务: <code>http://localhost:1337/api/services</code></li>
          <li>• 管理后台: <code>http://localhost:1337/admin</code></li>
        </ul>
      </section>
    </div>
  );
}
