"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/context/SettingsContext";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function ContactClient() {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dict = {
    MN: {
      title: "Холбоо барих",
      desc: "Бидэнтэй холбогдох хаяг, утас болон санал хүсэлтийн форм энд байрлана.",
      name: "Таны нэр",
      email: "Имэйл хаяг",
      message: "Санал хүсэлт",
      send: "Илгээх",
      sending: "Илгээж байна...",
      success: "Таны санал хүсэлтийг хүлээн авлаа. Баярлалаа!",
      addressTitle: "Хаяг байршил",
      addressText: "Хан-Уул дүүрэг, 7-р хороо, Маршалл таун, Кинг Тауер.",
      emailTitle: "Цахим шуудан",
      phoneTitle: "Холбогдох утас",
      phoneText: "976-88087744"
    },
    ZH: {
      title: "联系我们",
      desc: "请使用以下表格与我们联系以获取任何查询或反馈。",
      name: "您的姓名",
      email: "电子邮件",
      message: "您的留言",
      send: "发送信息",
      sending: "发送中...",
      success: "您的留言已收到。谢谢！",
      addressTitle: "机构地址",
      addressText: "乌兰巴托市汉乌拉区第7区，Marshall Town, King Tower",
      emailTitle: "电子邮箱",
      phoneTitle: "联系电话",
      phoneText: "+976 88087744"
    }
  };
  const current = dict[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      alert("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-24">
      <AnimatedSection className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-6">
          {current.title}
        </h1>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#002b5c] mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">{current.desc}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedSection delay={0.1} className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-teal-50 p-4 rounded-xl text-[#115e59]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002b5c] mb-2">{current.addressTitle}</h3>
              <p className="text-slate-600 leading-relaxed">{current.addressText}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-teal-50 p-4 rounded-xl text-[#115e59]">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002b5c] mb-2">{current.emailTitle}</h3>
              <p className="text-slate-600">{settings.email || "info@brcd-mongolia.org"}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-teal-50 p-4 rounded-xl text-[#115e59]">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002b5c] mb-2">{current.phoneTitle}</h3>
              <p className="text-slate-600">{settings.phone || current.phoneText}</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{current.name}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#115e59]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{current.email}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#115e59]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{current.message}</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#115e59]"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#115e59] hover:bg-[#0f4d4a] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#115e59]/20"
            >
              <Send className="w-5 h-5" />
              {loading ? current.sending : current.send}
            </button>
            {success && (
              <p className="text-teal-600 font-bold text-center mt-4">{current.success}</p>
            )}
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}
