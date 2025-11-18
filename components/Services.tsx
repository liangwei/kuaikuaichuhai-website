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
      desc: 'AI采集全球数据，识别内容机会点',
      features: ['市场洞察报告', '关键词矩阵', '内容策略建议'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Share2,
      title: '社媒内容营销',
      desc: 'TikTok/Instagram/YouTube全平台运营',
      features: ['多语言内容制作', 'KOL合作', '话题共创'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: LineChart,
      title: 'SEO优化矩阵',
      desc: '让品牌在全球搜索中长期可见',
      features: ['多语言SEO内容', '关键词优化', '权重提升'],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: MessageCircle,
      title: 'Reddit社区运营',
      desc: '在全球最真实的社区赢得信任',
      features: ['板块分析', 'AMA活动', 'UGC引导'],
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: BarChart3,
      title: '增长仪表盘',
      desc: '让每一篇内容都有ROI',
      features: ['全渠道数据整合', 'AI效果分析', '增长策略优化'],
      gradient: 'from-indigo-500 to-blue-500',
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
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

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
