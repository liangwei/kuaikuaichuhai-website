'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Search,
  Share2,
  LineChart,
  MessageCircle,
  BarChart3,
} from 'lucide-react';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Search,
      title: 'GEO智能洞察',
      desc: '从数据出发，找到内容机会点',
      features: ['AI采集各国家搜索、社交与竞品数据', '识别热门主题、用户兴趣与内容空白', '生成品牌专属的「内容策略地图」'],
      gradient: 'from-blue-500 to-cyan-500',
      resultLabel: '交付成果',
      results: ['GEO市场洞察报告', '关键词与趋势矩阵', '品牌内容策略建议'],
    },
    {
      icon: Share2,
      title: '社媒内容营销',
      desc: '让品牌故事融入用户日常',
      features: ['TikTok/Instagram/YouTube/X全平台内容策略', '多语言短视频 + 图文创意制作', '海外KOL / KOC合作与话题共创','每月内容日历与运营复盘'],
      gradient: 'from-purple-500 to-pink-500',
      resultLabel: '效果目标',
      results: ['品牌曝光提升 40%', '用户互动率提升 50%', '粉丝留存与复购增长'],
    },
    {
      icon: LineChart,
      title: 'SEO优化与内容矩阵',
      desc: '让品牌在全球搜索中长期可见',
      features: ['AI生成多语言SEO内容（博客 / 着陆页 / 评测文）', '关键词策略 + 结构化网站优化', '外链建设与权重提升','内容更新与排名监控'],
      gradient: 'from-orange-500 to-red-500',
      resultLabel: '效果目标',
      results: ['自然流量提升 80%+', '投放依赖下降 30%', '长期线索稳定增长'],
    },
    {
      icon: MessageCircle,
      title: 'Reddit社区运营',
      desc: '在全球最真实的社区赢得信任',
      features: ['Reddit板块受众分析与话题植入', '品牌AMA活动策划与口碑讨论引导', '用户UGC引导与舆情监测','危机公关与声量管理'],
      gradient: 'from-green-500 to-emerald-500',
      resultLabel: '成果表现',
      results: ['品牌提及率增长 3倍', '高质量反链提升', '自然流量显著增长'],
    },
    {
      icon: BarChart3,
      title: '增长仪表盘',
      desc: '让每一篇内容都有ROI',
      features: ['渠道数据整合（SEO + 社媒 + Reddit）', 'AI分析主题效果、渠道ROI、受众偏好', '自动生成月度报告与增长策略优化'],
      gradient: 'from-indigo-500 to-blue-500',
      resultLabel: '价值',
      results: ['数据闭环', '从"做内容"转向"做增长"'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
              核心服务
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            全链路内容增长体系：洞察 → 内容 → 分发 → 转化 → 复盘
          </p>
        </motion.div>

        {/* 服务卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* 背景渐变 */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              {/* 图标 */}
              <div
                className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* 内容 */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.desc}</p>

              {/* 特性列表 */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-700 text-sm">
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2 mt-1.5 flex-shrink-0`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* 成果/效果目标 */}
              <div className={`mt-4 pt-4 border-t border-gray-100`}>
                <div className={`text-xs font-semibold mb-2 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                  {service.resultLabel}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.results.map((result, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>

              {/* 悬停效果边框 */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[rgb(30,64,175)]/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* 底部统计 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '3x', label: 'AI效率提升' },
            { number: '120%', label: '流量增长' },
            { number: '50%', label: '成本降低' },
            { number: '80+', label: '服务客户' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
