'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Zap, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const processSteps = [
    { icon: Target, label: '洞察' },
    { icon: Zap, label: '内容' },
    { icon: TrendingUp, label: '分发' },
    { icon: BarChart3, label: '转化' },
    { icon: RefreshCw, label: '复盘' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden" ref={ref}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 我们的使命 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
              我们的使命
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
            我们是一家专注服务中国出海企业的AI内容营销公司。
          </p>
          <p className="text-xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
            通过AI与全球营销网络，我们帮助品牌实现：
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] text-white rounded-full font-semibold shadow-lg"
            >
              从"流量增长"到"品牌增长"
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-[rgb(59,130,246)] to-[rgb(14,165,233)] text-white rounded-full font-semibold shadow-lg"
            >
              从"内容生产"到"内容生效"
            </motion.div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-8">
            让每一个中国品牌，都能被世界看见、被用户信任
          </p>
        </motion.div>

        {/* 服务理念 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
              服务理念：全链路内容增长体系
            </span>
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            我们相信，一个成功的品牌增长闭环，必须包含：
          </p>

          {/* 流程步骤 */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgb(30,64,175)] to-[rgb(59,130,246)] flex items-center justify-center shadow-lg mb-2">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {step.label}
                  </span>
                </motion.div>
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="w-8 h-0.5 bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] mx-2"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">
              因此，我们打造了面向全球市场的
            </p>
            <div className="mb-4">
              <a
                href="https://www.kuaikuaichuhai.com/b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-3xl font-bold bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Brand Growth Engine
                </motion.span>
              </a>
              <span className="text-xl text-gray-500 ml-3">(品牌内容增长引擎)</span>
            </div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              通过 AI、数据与内容的融合，帮助企业实现品牌与销售的双增长
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
