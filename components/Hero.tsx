'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Sparkles, TrendingUp } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 背景动画元素 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 渐变圆形 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[rgb(30,64,175)]/20 to-[rgb(59,130,246)]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[rgb(14,165,233)]/20 to-[rgb(30,64,175)]/20 rounded-full blur-3xl"
        />

        {/* 网格背景 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* 标签 */}
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[rgb(30,64,175)]/10 to-[rgb(59,130,246)]/10 border border-[rgb(30,64,175)]/20 text-[rgb(30,64,175)] text-sm font-medium backdrop-blur-sm">
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              AI驱动的品牌内容营销
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] via-[rgb(59,130,246)] to-[rgb(14,165,233)] bg-clip-text text-transparent">
              让中国品牌
            </span>
            <br />
            <span className="text-gray-900">在全球被看见</span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            用AI与全球营销网络，帮助出海企业实现从"流量增长"到"品牌增长"
          </motion.p>

          {/* CTA 按钮 */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(30,64,175,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] text-white rounded-full font-semibold text-lg shadow-xl flex items-center gap-2"
            >
              开始出海之旅
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[rgb(30,64,175)] rounded-full font-semibold text-lg border-2 border-[rgb(30,64,175)]/20 hover:border-[rgb(30,64,175)]/50 transition-all"
            >
              查看成功案例
            </motion.button>
          </motion.div>

          {/* 特性图标 */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Globe,
                title: '全球覆盖',
                desc: '多语言内容营销',
              },
              {
                icon: Sparkles,
                title: 'AI 驱动',
                desc: '效率提升3倍',
              },
              {
                icon: TrendingUp,
                title: '增长保证',
                desc: 'ROI可量化追踪',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s` }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
              >
                <feature.icon className="w-12 h-12 text-[rgb(30,64,175)] mb-4 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
