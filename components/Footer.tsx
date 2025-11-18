'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    产品: ['服务介绍', '价格方案', '成功案例', '客户评价'],
    资源: ['博客', '白皮书', '行业报告', '出海指南'],
    公司: ['关于我们', '加入我们', '联系方式', '合作伙伴'],
    法律: ['隐私政策', '服务条款', 'Cookie政策', '版权声明'],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[rgb(30,64,175)] to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 上半部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* 品牌区域 */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6"
            >
              <Image
                src="/logo_white.png"
                alt="快快出海"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              用AI助力中国品牌走向世界，让每一个中国品牌都能被世界看见、被用户信任。
            </p>
            {/* 联系方式 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>contact@kuaikuaichuhai.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+86 138 0000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>中国 深圳</span>
              </div>
            </div>
          </div>

          {/* 链接区域 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-300 hover:text-white transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分割线 */}
        <div className="border-t border-white/10 my-8" />

        {/* 下半部分 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* 版权信息 */}
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 快快出海. All rights reserved.
          </div>

          {/* 社交媒体 */}
          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Github, href: '#' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* 备案信息 */}
          <div className="text-gray-400 text-sm">
            京ICP备2025146343号
          </div>
        </div>
      </div>

      {/* 底部装饰条 */}
      <div className="h-1 bg-gradient-to-r from-[rgb(30,64,175)] via-[rgb(59,130,246)] to-[rgb(14,165,233)]" />
    </footer>
  );
}
