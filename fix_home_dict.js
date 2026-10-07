const fs = require('fs');

function replaceDict(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const newDict =   const dict = {
    MN: {
      heroTitle1: "Евразийн холболт, Гео-эдийн засаг ба ",
      heroTitleHighlight: "Монгол-Хятадын",
      heroTitle2: " харилцаа",
      heroDesc: "Бид бүс нутгийн хамтын ажиллагааг гүнзгийрүүлэх хараат бус судалгаа хийж, бодлогын зөвлөмж боловсруулдаг \\"Тинк-Танк\\" (Think-Tank) юм.",
      readLatest: "Бодлогын тойм унших",

      progTitle: "Судалгааны чиглэл",
      progDesc: "Бид Монгол, Еврази, Дэлхийн Өмнөд болон бүс нутгийн түвшинд макро түвшний гүнзгийрүүлсэн судалгааг хийж гүйцэтгэдэг.",
      prog1Title: "Евразийн холболт ба Нэг бүс нэг зам",
      prog1Desc: "Макро геополитик, логистик болон дамжин өнгөрөх тээврийн коридорын судалгаа шинжилгээ.",
      prog2Title: "Бүс нутгийн гео-эдийн засаг ба Гадаад худалдаа, хөрөнгө оруулалт",
      prog2Desc: "Монгол-Орос-Хятадын эдийн засгийн коридор, гадаадын шууд хөрөнгө оруулалтын урсгал.",
      prog3Title: "Ногоон эдийн засаг ба Дижитал шилжилт",
      prog3Desc: "Экологийн засаглал, сэргээгдэх эрчим хүч, хиймэл оюун болон дижитал шилжилтийн бодлого.",
      readMore: "Дэлгэрэнгүй",

      hubBadge: "📈 Хөрөнгө оруулагчдын гарын авлага",
      hubDesc: "Монгол улсын хөрөнгө оруулалтын орчин, татвар, хууль эрх зүйн болон стратегийн төслүүдийн мэдээллийн сан. Гадаадын хөрөнгө оруулагчид болон судлаачдад зориулав.",
      hubBtn1: "Хөрөнгө оруулалтын гарын авлага",
      hubBtn2: "Алсын хараа 2050",
      hubFeat1: "Хууль эрх зүй",
      hubFeat1Desc: "Гадаадын хөрөнгө оруулалтын хууль, татварын өөрчлөлтүүд",
      hubFeat2: "Стратегийн төслүүд",
      hubFeat2Desc: "Шинэ сэргэлтийн бодлого, эрчим хүчний мега төслүүд",
      hubFeat3: "Макро эдийн засаг",
      hubFeat3Desc: "Хөрөнгө оруулагчдад зориулсан эдийн засгийн статистик, дата аналитик",

      insightTitle: "Онцлох анализ",
      newsTitle: "Төвийн мэдээ",
      viewAll: "Бүх нийтлэлийг үзэх",
      noArticles: "Нийтлэл олдсонгүй.",
      researcher: "Судлаач",

      expertTitle: "Бидний баг",
      noExperts: "Мэдээлэл олдсонгүй.",

      partners: "Хамтын ажиллагаатай байгууллагууд",
    },
    ZH: {
      heroTitle1: "欧亚互联、地缘经济与",
      heroTitleHighlight: "中蒙",
      heroTitle2: "关系",
      heroDesc: "我们是致力于深化区域合作、开展独立研究并制定政策建议的智库",
      readLatest: "查阅政策简报",

      progTitle: "研究方向",
      progDesc: "我们对蒙古、欧亚、全球南方及更广泛区域进行宏观层面的深度研究。",
      prog1Title: "欧亚互联与一带一路",
      prog1Desc: "宏观地缘政治、物流及过境运输走廊分析。",
      prog2Title: "区域地缘经济与外国直接投资",
      prog2Desc: "中蒙俄经济走廊及外国直接投资流动分析。",
      prog3Title: "绿色经济与数字化转型",
      prog3Desc: "生态治理、可再生能源、人工智能及数字转型政策。",
      readMore: "了解更多",

      hubBadge: "📈 投资指南",
      hubDesc: "提供有关蒙古国投资环境、战略项目、税务及法律信息的综合数据库，专为外国投资者和研究人员量身定制。",
      hubBtn1: "投资指南",
      hubBtn2: "查阅“愿景2050”",
      hubFeat1: "法律框架",
      hubFeat1Desc: "外国直接投资法律与税务更新",
      hubFeat2: "战略项目",
      hubFeat2Desc: "新复苏政策与能源大型项目",
      hubFeat3: "宏观经济",
      hubFeat3Desc: "面向投资者的经济统计与数据分析",

      insightTitle: "重点分析",
      newsTitle: "中心动态",
      viewAll: "查看所有文章",
      noArticles: "暂无文章。",
      researcher: "研究员",

      expertTitle: "我们的专家",
      noExperts: "暂无专家信息。",

      partners: "合作机构",
    }
  };;

  content = content.replace(/const dict = \{[\s\S]*?\n  \};\n\n  const current = dict\[language\];/m, newDict + '\n\n  const current = dict[language];');

  fs.writeFileSync(filePath, content, 'utf8');
}

replaceDict('src/app/HomeClient.tsx');
console.log('Done replacing dict');
