'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', requirement: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 监听点击事件，检查是否点击了联系我们链接
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="#contact"]');
      if (link) {
        setTimeout(() => {
          nameInputRef.current?.focus();
        }, 1500);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 使用 mailto 方式
      const subject = encodeURIComponent(`来自 ${formData.name} 的咨询`);
      const body = encodeURIComponent(`称呼：${formData.name}\n\n需求：${formData.requirement}`);
      window.location.href = `mailto:contact@kuaikuaichuhai.com?subject=${subject}&body=${body}`;

      setSubmitStatus('success');
      setFormData({ name: '', requirement: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* 右侧 - 联系表单 */}
          <div className="md:pl-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-sm ml-auto">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-xs text-gray-400 mb-1.5">
                    您的称呼
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    ref={nameInputRef}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="请输入您的称呼"
                  />
                </div>
                <div>
                  <label htmlFor="requirement" className="block text-xs text-gray-400 mb-1.5">
                    您的需求
                  </label>
                  <textarea
                    id="requirement"
                    required
                    rows={3}
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors resize-none"
                    placeholder="请简单描述您的出海需求"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-white text-[rgb(30,64,175)] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    '发送中...'
                  ) : submitStatus === 'success' ? (
                    '已打开邮件客户端'
                  ) : (
                    <>
                      发送咨询
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              </form>
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
