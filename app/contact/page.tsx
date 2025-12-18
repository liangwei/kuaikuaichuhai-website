'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { submitContact } from '@/lib/strapi'
import { Mail, Phone, Building2, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const defaultService = searchParams.get('service') as 'seo' | 'geo' | 'social' | null

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: defaultService || 'seo',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await submitContact({
        ...formData,
        serviceType: formData.serviceType as 'seo' | 'geo' | 'social' | 'other',
        source: window.location.href,
      })
      setStatus('success')
      // 重置表单
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        serviceType: 'seo',
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('提交失败，请稍后再试或直接联系我们')
      console.error('Contact form error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative max-w-6xl mx-auto">
            <FadeInWhenVisible>
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                联系我们
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
                让我们一起探讨您的出海计划，专业团队随时为您服务
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <FadeInWhenVisible>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">联系方式</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">邮箱</div>
                          <div className="text-sm text-gray-600">contact@kuaikuaichuhai.com</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">电话</div>
                          <div className="text-sm text-gray-600">+86 132 4005 5520</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.1}>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-3">响应时间</h3>
                    <p className="text-blue-100">
                      我们通常在24小时内回复您的咨询
                    </p>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <FadeInWhenVisible delay={0.2}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    {status === 'success' ? (
                      <div className="text-center py-12">
                        <div className="flex justify-center mb-4">
                          <div className="p-4 bg-green-100 rounded-full">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">提交成功！</h3>
                        <p className="text-gray-600 mb-6">感谢您的咨询，我们会尽快与您联系</p>
                        <button
                          onClick={() => setStatus('idle')}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                          再次提交
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              姓名 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="请输入您的姓名"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              公司名称
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="您的公司名称"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              邮箱 <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              电话
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="+86 138 0013 8000"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Service Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            感兴趣的服务 <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          >
                            <option value="seo">SEO服务</option>
                            <option value="geo">GEO服务</option>
                            <option value="social">社媒服务</option>
                            <option value="other">其他服务</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            需求描述 <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="请描述您的需求，我们会为您提供专业建议..."
                          />
                        </div>

                        {/* Error Message */}
                        {status === 'error' && (
                          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{errorMessage}</p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                          {status === 'loading' ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              提交中...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              提交咨询
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
