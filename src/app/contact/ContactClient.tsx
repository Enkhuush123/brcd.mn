"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function ContactClient() {
  const { language } = useLanguage();
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
      addressText: "Монгол улс, Улаанбаатар хот",
      phoneText: "+976 7711-XXXX"
    },
    EN: {
      title: "Contact Us",
      desc: "Please reach out to us for any inquiries or feedback using the form below.",
      name: "Your Name",
      email: "Email Address",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Your message has been received. Thank you!",
      addressText: "Ulaanbaatar, Mongolia",
      phoneText: "+976 7711-XXXX"
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
      addressText: "蒙古国，乌兰巴托",
      phoneText: "+976 7711-XXXX"
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
              <h3 className="text-xl font-bold text-[#002b5c] mb-2">Хаяг / Address</h3>
              <p className="text-slate-600">{current.addressText}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-teal-50 p-4 rounded-xl text-[#115e59]">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002b5c] mb-2">Утас / Phone</h3>
              <p className="text-slate-600">{current.phoneText}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-teal-50 p-4 rounded-xl text-[#115e59]">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002b5c] mb-2">Имэйл / Email</h3>
              <p className="text-slate-600">info@bcrd.mn</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#115e59]/10 to-transparent rounded-bl-full"></div>
          
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#002b5c]">{current.success}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{current.name}</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#115e59] outline-none transition-all"
                  placeholder={current.name}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{current.email}</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#115e59] outline-none transition-all"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{current.message}</label>
                <textarea 
                  required 
                  rows={5}
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#115e59] outline-none transition-all resize-none"
                  placeholder="..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#002b5c] to-[#115e59] text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all flex justify-center items-center gap-2"
              >
                {loading ? current.sending : current.send}
                {!loading && <Send className="w-5 h-5" />}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
