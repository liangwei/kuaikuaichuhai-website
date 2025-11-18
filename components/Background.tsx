'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingDown, Shield, Users, AlertCircle } from 'lucide-react';

export default function Background() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const challenges = [
    {
      icon: TrendingDown,
      stat: '20%+',
      label: 'Meta/Google广告CPM上涨',
      desc: '近三年平均涨幅',
    },
    {
      icon: Shield,
      stat: 'GDPR/ATT',
      label: '隐私政策限制',
      desc: '削弱精准投放效果',
    },
    {
      icon: Users,
      stat: '↓',
      label: '用户信任度下降',
      desc: '对传统广告的信任降低',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
              时代背景
            </span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            流量见顶，内容驱动增长
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            过去十年，中国出海企业依靠广告投放快速打开市场。但如今，全球数字广告成本连年上升，用户信任广告的程度却在下降。
          </p>
        </motion.div>

        {/* 挑战卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-white p-8 rounded-2xl border border-red-100 shadow-lg hover:shadow-xl transition-all group"
            >
              {/* 警告图标 */}
              <div className="absolute top-4 right-4">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>

              {/* 图标 */}
              <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <challenge.icon className="w-8 h-8 text-white" />
              </div>

              {/* 数据 */}
              <div className="text-4xl font-bold text-red-600 mb-2">
                {challenge.stat}
              </div>

              {/* 标题 */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {challenge.label}
              </h3>

              {/* 描述 */}
              <p className="text-gray-600">{challenge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 核心洞察 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-[rgb(30,64,175)] to-[rgb(59,130,246)] rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-6"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                投放买得到曝光，但买不到信任
              </h3>
              <div className="w-24 h-1 bg-white/50 mx-auto rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xl md:text-2xl leading-relaxed text-white/90"
            >
              在"内容为王"的新阶段，品牌增长的核心是
              <br />
              <span className="font-bold text-white">
                讲好故事、讲对人、讲出差异
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
