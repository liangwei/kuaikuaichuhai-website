'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Zap, Target, Gamepad2 } from 'lucide-react';

export default function TargetClients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clients = [
    {
      icon: Sparkles,
      type: '新消费品牌',
      category: '美妆、家居、食品',
      need: '品牌故事、口碑建设',
      value: '建立认知与信任',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      type: '3C电子与智能硬件',
      category: '消费电子',
      need: '产品教育、功能展示',
      value: '内容解释力强，影响购买',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      type: 'SaaS / B2B企业',
      category: '企业服务',
      need: '海外线索、品牌背书',
      value: '内容驱动信任与转化',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Gamepad2,
      type: '游戏 / App出海',
      category: '数字产品',
      need: '社区运营、用户留存',
      value: '内容促UGC、裂变传播',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="target" className="py-24 bg-white" ref={ref}>
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
              服务对象
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            谁最需要品牌内容营销？
          </p>
        </motion.div>

        {/* 客户类型网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* 背景装饰 */}
              <div
                className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${client.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}
              />

              <div className="relative">
                {/* 图标和类型 */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${client.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}
                  >
                    <client.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {client.type}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-[rgb(30,64,175)] rounded-full text-sm font-medium">
                      {client.category}
                    </span>
                  </div>
                </div>

                {/* 需求和价值 */}
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">典型需求</div>
                    <div className="font-semibold text-gray-900">
                      {client.need}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="text-sm text-[rgb(30,64,175)] mb-1">
                      内容价值
                    </div>
                    <div className="font-semibold text-gray-900">
                      {client.value}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            我们的核心客户，是那些
            <span className="font-bold text-[rgb(30,64,175)]">
              追求品牌影响力、重视内容价值、希望走长期增长路线
            </span>
            的企业
          </p>
        </motion.div>
      </div>
    </section>
  );
}
