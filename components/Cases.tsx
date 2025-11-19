'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const cases = [
    {
      company: 'Anker 子品牌',
      category: '3C电子',
      services: ['GEO洞察', 'SEO优化', 'Reddit运营'],
      results: [
        { icon: TrendingUp, label: 'Google流量', value: '+120%' },
        { icon: Users, label: 'Reddit提及', value: '+3倍' },
        { icon: DollarSign, label: '转化率', value: '+85%' },
      ],
      bgGradient: 'from-blue-500 to-cyan-500',
    },
    {
      company: '美妆出海品牌',
      category: '美妆护肤',
      services: ['TikTok营销', '社媒矩阵', 'KOL合作'],
      results: [
        { icon: Users, label: '粉丝增长', value: '20K+' },
        { icon: TrendingUp, label: '视频CTR', value: '3.2%' },
        { icon: DollarSign, label: 'ROI提升', value: '+150%' },
      ],
      bgGradient: 'from-pink-500 to-rose-500',
    },
    {
      company: 'SaaS企业',
      category: 'B2B软件',
      services: ['SEO内容', 'LinkedIn运营', '线索培育'],
      results: [
        { icon: Users, label: '月新增线索', value: '80+' },
        { icon: DollarSign, label: 'CAC下降', value: '-35%' },
        { icon: TrendingUp, label: '成交率', value: '+65%' },
      ],
      bgGradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section id="cases" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50" ref={ref}>
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
              成功案例
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            内容不只是让品牌被看见，而是让内容成为增长资产
          </p>
        </motion.div>

        {/* 案例卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* 顶部渐变条 */}
              <div className={`h-2 bg-gradient-to-r ${caseItem.bgGradient}`} />

              <div className="p-8">
                {/* 公司信息 */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {caseItem.company}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-[rgb(30,64,175)] rounded-full text-sm font-medium">
                    {caseItem.category}
                  </span>
                </div>

                {/* 服务标签 */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {caseItem.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* 成果数据 */}
                <div className="space-y-4">
                  {caseItem.results.map((result, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-transparent rounded-lg group-hover:from-blue-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${caseItem.bgGradient} flex items-center justify-center`}>
                          <result.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {result.label}
                        </span>
                      </div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] bg-clip-text text-transparent">
                        {result.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* 查看详情按钮 - 暂时隐藏 */}
                {/* <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-[rgb(30,64,175)] to-[rgb(59,130,246)] text-white rounded-lg font-medium flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300"
                >
                  查看详细案例
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 信任徽章 - 暂时隐藏 */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-8">已服务超过80家出海企业</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Anker', 'Shein', 'Temu', 'TikTok', 'Shopify'].map((brand, i) => (
              <div
                key={i}
                className="text-2xl font-bold text-gray-400"
              >
                {brand}
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
