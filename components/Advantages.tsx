'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Globe2, Network, TrendingUp, Play, Target, BarChart3 } from 'lucide-react';
import CountUp from './CountUp';

export default function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const advantages = [
    {
      icon: Cpu,
      title: 'AI驱动效率',
      description: '从洞察、生成到复盘全流程AI加速',
      metrics: [
        { label: '产能提升', number: 3, prefix: '×' },
        { label: '成本降低', number: 50, prefix: '-', suffix: '%' },
      ],
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Globe2,
      title: '本地化内容团队',
      description: '东南亚、中东、欧美本地创作者深度合作',
      metrics: [
        { label: '覆盖地区', number: 20, suffix: '+' },
        { label: '本地创作者', number: 100, suffix: '+' },
      ],
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Network,
      title: '全渠道联动',
      description: '整合SEO、社媒、Reddit实现内容资产互通',
      metrics: [
        { label: '覆盖平台', number: 10, suffix: '+' },
        { label: '内容复用率', number: 80, suffix: '%' },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: '数据化ROI闭环',
      description: '每篇内容、每个渠道都可追踪与复盘',
      metrics: [
        { label: '数据维度', number: 50, suffix: '+' },
        { label: '报表频率', value: '实时' },
      ],
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 标题��� */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
              核心竞争力
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            为什么选择我们？
          </p>
        </motion.div>

        {/* 优势卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* 背景光晕 */}
              <div
                className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}
              />

              <div className="relative">
                {/* 图标 */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${advantage.gradient} flex items-center justify-center shadow-lg`}
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* 标题 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>

                {/* 描述 */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {advantage.description}
                </p>

                {/* 数据指标 */}
                <div className="grid grid-cols-2 gap-4">
                  {advantage.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="text-sm text-gray-500 mb-1">
                        {metric.label}
                      </div>
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${advantage.gradient} bg-clip-text text-transparent`}
                      >
                        {metric.number !== undefined ? (
                          <CountUp
                            end={metric.number}
                            prefix={metric.prefix}
                            suffix={metric.suffix}
                          />
                        ) : (
                          metric.value
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 装饰边框 */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[rgb(30,64,175)]/10 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* 团队背景 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-[rgb(30,64,175)] to-[rgb(59,130,246)] rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-4">深度行业经验</h3>
          <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
            核心团队来自字节跳动、蓝色光标、googleads等顶尖互联网与营销公司， 拥有丰富的的跨境营销实战经验，服务过3C、美妆、Saas、消费品等多个垂直领域。 我们不仅懂内容，更懂品牌增长的底层逻辑。
          </p>
          {/* <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
            团队成员来自
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { name: '字节跳动', icon: Play },
              { name: '蓝标国际', icon: Target },
              { name: 'Google Ads', icon: BarChart3 },
            ].map((company, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-lg font-semibold border border-white/30 flex items-center gap-2"
              >
                <company.icon className="w-5 h-5" />
                {company.name}
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
