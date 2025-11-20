'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-[rgb(30,64,175)] to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 上半部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* 左侧 - 品牌区域 */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6 inline-block"
            >
              <Image
                src="/logo.png"
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
                <span>+86 132 4005 5520</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MessageCircle className="w-5 h-5" />
                <span>微信: kuaikuaitools</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>广东省东莞市虎门镇连升路139号A+大厦1单元507室 <br />天津市武清区创业总部基地C06号楼204室</span>
              </div>
            </div>
          </div>

          {/* 右侧 - 二维码区域 */}
          <div className="md:pl-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-xs ml-auto">
              <div className="text-center">
                {/* 引导语 */}
                <h3 className="text-white font-semibold text-base mb-4 leading-relaxed">
                  扫码联系行业专家
                  <br />
                  <span className="text-sm text-gray-300">预约免费深度咨询，获取独家报告资料</span>
                </h3>

                {/* 二维码 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-white p-3 rounded-xl"
                >
                  <Image
                    src="/code.png"
                    alt="联系我们"
                    width={140}
                    height={140}
                    className="w-36 h-36"
                  />
                </motion.div>
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
