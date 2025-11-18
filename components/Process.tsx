'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Rocket, BarChart } from 'lucide-react';

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      icon: Lightbulb,
      title: '洞察与策略设计',
      time: '1-2周',
      deliverables: [
        '市场洞察报告',
        '内容策略方案',
      ],
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      number: '02',
      icon: Rocket,
      title: '内容生产与分发',
      time: '4-6周',
      deliverables: [
        '内容资产包',
        '发布计划',
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      icon: BarChart,
      title: '增长与复盘优化',
      time: '持续',
      deliverables: [
        '效果报告',
        '策略复盘',
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden" ref={ref}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
              服务流程
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            每个环节都有数据追踪、AI辅助分析与可量化目标
          </p>
        </motion.div>

        {/* 时间线 */}
        <div className="relative">
          {/* 连接线 - 仅在桌面显示 */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(30,64,175)] via-[rgb(59,130,246)] to-[rgb(14,165,233)] rounded-full opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* 编号指示器 */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl relative z-10`}
                >
                  <span className="text-3xl font-bold text-white">
                    {step.number}
                  </span>
                </motion.div>

                {/* 卡片 */}
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all"
                >
                  {/* 图标 */}
                  <div
                    className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>

                  {/* 时间周期 */}
                  <div className="inline-block px-3 py-1 bg-blue-50 text-[rgb(30,64,175)] rounded-full text-sm font-medium mb-6">
                    ⏱ {step.time}
                  </div>

                  {/* 交付成果 */}
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-3">
                      主要产出
                    </div>
                    <ul className="space-y-2">
                      {step.deliverables.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 箭头 - 仅在桌面显示，且不是最后一个 */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-6 text-[rgb(30,64,175)] opacity-30">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
