'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    产品: ['服务介绍', '价格方案', '成功案例', '客户评价'],
    资源: ['博客', '白皮书', '行业报告', '出海指南'],
    公司: ['关于我们', '加入我们', '联系方式', '合作伙伴'],
    法律: ['隐私政策', '服务条款', 'Cookie政策', '版权声明'],
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-[rgb(30,64,175)] to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 上半部分 */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* 品牌区域 */}
          <div className="max-w-md">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6"
            >
              <Image
                src="/logo_white.png"
                alt="快快出海"
                width={150}
                height={50}
                className="h-12 w-auto mx-auto"
              />
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              用AI助力中国品牌走向世界，让每一个中国品牌都能被世界看见、被用户信任。
            </p>
            {/* 联系方式 */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>contact@kuaikuaichuhai.com</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+86 132 4005 5520</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <MessageCircle className="w-5 h-5" />
                <span>微信: kuaikuaichuhai</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>中国 深圳</span>
              </div>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-white/10 my-8" />

        {/* 下半部分 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* 版权信息 */}
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 快快出海. All rights reserved.
          </div>

          {/* 备案信息 */}
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            京ICP备2025146343号
          </a>
        </div>
      </div>

      {/* 底部装饰条 */}
      <div className="h-1 bg-gradient-to-r from-[rgb(30,64,175)] via-[rgb(59,130,246)] to-[rgb(14,165,233)]" />
    </footer>
  );
}
