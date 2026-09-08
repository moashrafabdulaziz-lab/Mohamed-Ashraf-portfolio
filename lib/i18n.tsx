'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

export type Lang = 'en' | 'ar'
export type Dir = 'ltr' | 'rtl'

// -----------------------------------------------------------------------------
// Content dictionary — every user-facing string exists in both languages.
// Proper nouns / technical terms (.NET, C#, ASP.NET Core, SQL Server, GitHub,
// LinkedIn, AssetX) stay in Latin script intentionally.
// -----------------------------------------------------------------------------
const dict = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      approach: 'Approach',
      work: 'Work',
      skills: 'Skills',
      path: 'Path',
      contact: 'Contact',
    },
    a11y: {
      toEnglish: 'Switch to English',
      toArabic: 'التبديل إلى العربية',
      toggleTheme: 'Toggle color theme',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      primaryNav: 'Primary',
    },
    hero: {
      status: 'Open to opportunities',
      role: '.NET Backend Developer',
      name: 'Mohamed Ashraf\nAbdul Aziz',
      tagline: 'Building software with code, context, and purpose.',
      intro:
        'A backend developer who thinks beyond the code — pairing engineering discipline with a Business Information Systems background to build systems that actually solve the right problems.',
      ctaWork: 'View work',
      ctaContact: 'Get in touch',
      triad: ['code', 'context', 'purpose'],
      engineering: 'Engineering',
      business: 'Business',
      caption: 'Systems thinker · Cairo-based',
      scroll: 'Scroll',
    },
    about: {
      index: '01',
      label: 'About',
      heading: 'I build the parts of software people never see — and care about the ones they do.',
      body: [
        'I am a .NET backend developer focused on the layer where correctness matters most: APIs, data models, and the logic that keeps a product honest under real usage.',
        'My background in Business Information Systems means I don’t start with code — I start with the problem. Who is this for, what are they really trying to do, and where does the current workflow break down.',
        'That combination is the whole point of this portfolio: I don’t just implement features, I try to understand why they should exist.',
      ],
      pillars: [
        {
          k: 'Systems',
          v: 'APIs, databases, and architecture that stay maintainable as they grow.',
        },
        {
          k: 'Context',
          v: 'Requirements, users, and workflows understood before a line is written.',
        },
        {
          k: 'Craft',
          v: 'How software is presented and experienced — not just whether it runs.',
        },
        {
          k: 'Growth',
          v: 'Actively deepening my engineering craft, one real project at a time.',
        },
      ],
    },
    approach: {
      index: '02',
      label: 'Business × Technology',
      heading: 'Two languages, one system.',
      lead: 'Most problems worth solving live in the gap between what the business needs and what the software does. I work on both sides of that gap.',
      eng: {
        tag: 'Engineering',
        title: 'The system side',
        points: [
          'Designing clean, testable backend architecture',
          'Modeling data so it reflects the real domain',
          'Building APIs that are predictable and safe',
          'Keeping code maintainable as requirements change',
        ],
      },
      biz: {
        tag: 'Business',
        title: 'The context side',
        points: [
          'Turning fuzzy requirements into clear specs',
          'Mapping the real workflow, not the assumed one',
          'Weighing trade-offs against business value',
          'Speaking the language of both users and stakeholders',
        ],
      },
      intersection:
        'Where those two meet is where I do my best work — software that is technically sound and actually worth building.',
    },
    work: {
      index: '03',
      label: 'Selected work',
      heading: 'Work',
      lead: 'A case study, presented honestly — an early-stage product concept with a real landing page, not a launched commercial product.',
      assetx: {
        name: 'AssetX',
        kind: 'B2B Marketplace · Product concept',
        summary:
          'A B2B marketplace for buying, selling, and sourcing surplus and used business assets. The MVP focuses on electronics and business equipment.',
        stage: 'Early-stage concept · Landing page live',
        problem: {
          k: 'The problem',
          v: 'Companies sit on unused and surplus assets while other businesses actively search for the same equipment. The two rarely find each other efficiently.',
        },
        concept: {
          k: 'The concept',
          v: 'A single marketplace that connects companies holding assets with companies that need them — structured around how businesses actually transact.',
        },
        differentiator: {
          k: 'The differentiator',
          v: 'AssetX connects both sides of the market at once: supply (companies selling assets) and demand (companies requesting them). That two-sided intent is the core of the business logic.',
        },
        modelsLabel: 'Transaction models',
        models: [
          { k: 'Fixed Price', v: 'Straightforward listings with a set price.' },
          { k: 'Auctions', v: 'Competitive bidding for higher-value assets.' },
          { k: 'RFQs', v: 'Buyers request quotes; sellers respond to demand.' },
        ],
        featuresLabel: 'Key features',
        features: [
          'Buyer / Seller workflows',
          'Company profiles',
          'Asset listings',
          'Marketplace discovery',
          'Supply → Demand matching',
        ],
        stackLabel: 'Stack',
        stack: ['.NET', 'C#', 'ASP.NET Core', 'SQL Server', 'EF Core', 'REST APIs'],
        supply: 'Supply',
        supplyDesc: 'Companies selling assets',
        demand: 'Demand',
        demandDesc: 'Companies requesting assets',
        cta: 'Explore AssetX',
        ctaNote: 'Opens the live landing page',
        previewBar: 'assetx-eight.vercel.app',
      },
      moreLabel: 'Beyond AssetX',
      more:
        'AssetX is my current flagship. More backend projects are in progress as I keep building — the code lives on GitHub.',
      moreCta: 'See GitHub',
    },
    skills: {
      index: '04',
      label: 'Capabilities',
      heading: 'What I work with',
      note: 'Tools and practices I actively build with — grouped by where they sit in a system.',
      groups: [
        {
          k: 'Backend engineering',
          items: ['C#', '.NET', 'ASP.NET Core', 'REST APIs', 'Web API'],
        },
        {
          k: 'Data',
          items: ['SQL Server', 'EF Core', 'Database design', 'Data modeling'],
        },
        {
          k: 'Foundations',
          items: ['OOP', 'Clean code', 'Software architecture', 'Problem solving'],
        },
        {
          k: 'Tools & practice',
          items: ['Git', 'GitHub', 'Postman', 'Requirements analysis'],
        },
        {
          k: 'Business & systems',
          items: ['Systems thinking', 'Workflow mapping', 'Business logic', 'BIS foundation'],
        },
      ],
    },
    path: {
      index: '05',
      label: 'The path',
      heading: 'How I got here',
      note: 'A direction, not a résumé of titles — the honest shape of the journey so far.',
      nodes: [
        {
          tag: 'Foundation',
          k: 'Business Information Systems',
          v: 'Learned to see technology as a means to a business end — requirements, users, and workflows first.',
        },
        {
          tag: 'Focus',
          k: 'Backend engineering',
          v: 'Committed to the .NET stack: C#, ASP.NET Core, APIs, and relational data.',
        },
        {
          tag: 'Flagship',
          k: 'AssetX',
          v: 'Applied both sides at once — designing a two-sided B2B marketplace concept end to end.',
        },
        {
          tag: 'Now',
          k: 'Continuous learning',
          v: 'Actively deepening engineering craft — architecture, testing, and building things that last.',
        },
      ],
    },
    contact: {
      index: '06',
      label: 'Contact',
      heading: 'Let’s build something with purpose.',
      lead: 'Open to backend roles, collaboration, and interesting problems. The fastest way to reach me is email.',
      emailCta: 'Email me',
      copy: 'Copy',
      copied: 'Copied',
      elsewhere: 'Elsewhere',
      backTop: 'Back to top',
    },
    footer: {
      built: 'Designed & built by Mohamed Ashraf Abdul Aziz',
      rights: 'All rights reserved.',
      tagline: 'Code · Context · Purpose',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة',
      approach: 'المنهج',
      work: 'الأعمال',
      skills: 'المهارات',
      path: 'المسار',
      contact: 'تواصل',
    },
    a11y: {
      toEnglish: 'Switch to English',
      toArabic: 'التبديل إلى العربية',
      toggleTheme: 'تبديل مظهر الألوان',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      primaryNav: 'التنقل الرئيسي',
    },
    hero: {
      status: 'متاح للفرص',
      role: 'مطوّر خلفية ‏.NET',
      name: 'محمد أشرف\nعبد العزيز',
      tagline: 'أبني البرمجيات بالكود، والسياق، والهدف.',
      intro:
        'مطوّر خلفية يفكّر إلى ما هو أبعد من الكود — يجمع بين انضباط الهندسة وخلفية في نظم المعلومات الإدارية لبناء أنظمة تحلّ المشكلة الصحيحة فعلًا.',
      ctaWork: 'استعرض الأعمال',
      ctaContact: 'تواصل معي',
      triad: ['كود', 'سياق', 'هدف'],
      engineering: 'الهندسة',
      business: 'الأعمال',
      caption: 'مفكّر أنظمة · مقيم في القاهرة',
      scroll: 'مرّر للأسفل',
    },
    about: {
      index: '٠١',
      label: 'نبذة',
      heading: 'أبني الأجزاء التي لا يراها المستخدمون في البرمجيات — وأهتمّ بالأجزاء التي يرونها.',
      body: [
        'أنا مطوّر خلفية باستخدام ‏.NET، أركّز على الطبقة التي تكون فيها الدقّة أهمّ ما يكون: الـ APIs، ونماذج البيانات، والمنطق الذي يبقي المنتج متماسكًا تحت الاستخدام الحقيقي.',
        'خلفيتي في نظم المعلومات الإدارية تعني أنني لا أبدأ من الكود — بل أبدأ من المشكلة: لمن هذا المنتج، وما الذي يحاول المستخدم إنجازه حقًّا، وأين ينهار سير العمل الحالي.',
        'هذا الدمج هو جوهر هذا الموقع: أنا لا أنفّذ الميزات فحسب، بل أحاول أن أفهم لماذا ينبغي أن توجد أصلًا.',
      ],
      pillars: [
        { k: 'الأنظمة', v: 'واجهات برمجية وقواعد بيانات ومعمارية تبقى قابلة للصيانة وهي تكبر.' },
        { k: 'السياق', v: 'المتطلّبات والمستخدمون وسير العمل مفهومة قبل كتابة أيّ سطر.' },
        { k: 'الإتقان', v: 'كيف تُقدَّم البرمجيات وتُختبر تجربتها — لا مجرّد أن تعمل.' },
        { k: 'التطوّر', v: 'أعمّق مهاراتي الهندسية باستمرار، مشروعًا حقيقيًّا تلو الآخر.' },
      ],
    },
    approach: {
      index: '٠٢',
      label: 'الأعمال × التقنية',
      heading: 'لغتان، ونظام واحد.',
      lead: 'أغلب المشكلات التي تستحقّ الحلّ تعيش في الفجوة بين ما تحتاجه الأعمال وما يفعله البرنامج. أنا أعمل على طرفَي هذه الفجوة.',
      eng: {
        tag: 'الهندسة',
        title: 'جانب النظام',
        points: [
          'تصميم معمارية خلفية نظيفة وقابلة للاختبار',
          'نمذجة البيانات لتعكس المجال الحقيقي',
          'بناء واجهات برمجية متوقّعة وآمنة',
          'إبقاء الكود قابلًا للصيانة مع تغيّر المتطلّبات',
        ],
      },
      biz: {
        tag: 'الأعمال',
        title: 'جانب السياق',
        points: [
          'تحويل المتطلّبات الغامضة إلى مواصفات واضحة',
          'رسم سير العمل الفعلي لا المُفترَض',
          'الموازنة بين البدائل وفق قيمة الأعمال',
          'التحدّث بلغة المستخدمين وأصحاب المصلحة معًا',
        ],
      },
      intersection:
        'حيث يلتقي الجانبان أقدّم أفضل ما لديّ — برمجيات سليمة تقنيًّا وتستحقّ البناء فعلًا.',
    },
    work: {
      index: '٠٣',
      label: 'أعمال مختارة',
      heading: 'الأعمال',
      lead: 'دراسة حالة مقدَّمة بصدق — فكرة منتج في مرحلة مبكّرة مع صفحة هبوط حقيقية، وليست منتجًا تجاريًّا مُطلقًا.',
      assetx: {
        name: 'AssetX',
        kind: 'سوق B2B · فكرة منتج',
        summary:
          'سوق B2B لبيع وشراء وتوريد الأصول التجارية الفائضة والمستعملة. يركّز النموذج الأوّلي على الإلكترونيات والمعدّات التجارية.',
        stage: 'فكرة في مرحلة مبكّرة · صفحة الهبوط منشورة',
        problem: {
          k: 'المشكلة',
          v: 'شركات تكدّس أصولًا غير مستخدمة وفائضة بينما تبحث شركات أخرى عن المعدّات نفسها. ونادرًا ما يجد الطرفان بعضهما بكفاءة.',
        },
        concept: {
          k: 'الفكرة',
          v: 'سوق واحد يربط الشركات التي تملك الأصول بالشركات التي تحتاجها — مبنيّ على الطريقة التي تتعامل بها الشركات فعلًا.',
        },
        differentiator: {
          k: 'عنصر التميّز',
          v: 'يربط AssetX طرفَي السوق في آنٍ واحد: العرض (شركات تبيع الأصول) والطلب (شركات تطلبها). هذه النيّة الثنائية هي جوهر منطق الأعمال.',
        },
        modelsLabel: 'نماذج التعامل',
        models: [
          { k: 'سعر ثابت', v: 'عروض مباشرة بسعر محدَّد.' },
          { k: 'مزادات', v: 'مزايدة تنافسية للأصول الأعلى قيمة.' },
          { k: 'طلبات عروض أسعار', v: 'يطلب المشترون عروضًا؛ ويستجيب البائعون للطلب.' },
        ],
        featuresLabel: 'أبرز الميزات',
        features: [
          'مسارات المشتري / البائع',
          'ملفّات الشركات',
          'قوائم الأصول',
          'اكتشاف السوق',
          'مطابقة العرض ← الطلب',
        ],
        stackLabel: 'التقنيات',
        stack: ['.NET', 'C#', 'ASP.NET Core', 'SQL Server', 'EF Core', 'REST APIs'],
        supply: 'العرض',
        supplyDesc: 'شركات تبيع الأصول',
        demand: 'الطلب',
        demandDesc: 'شركات تطلب الأصول',
        cta: 'استكشف AssetX',
        ctaNote: 'يفتح صفحة الهبوط المنشورة',
        previewBar: 'assetx-eight.vercel.app',
      },
      moreLabel: 'ما بعد AssetX',
      more:
        'يمثّل AssetX مشروعي الرئيسي حاليًّا. وهناك مشاريع خلفية أخرى قيد العمل مع استمراري في البناء — والكود موجود على GitHub.',
      moreCta: 'زيارة GitHub',
    },
    skills: {
      index: '٠٤',
      label: 'القدرات',
      heading: 'ما أعمل به',
      note: 'أدوات وممارسات أبني بها فعلًا — مُصنَّفة وفق موقعها داخل النظام.',
      groups: [
        { k: 'هندسة الخلفية', items: ['C#', '.NET', 'ASP.NET Core', 'REST APIs', 'Web API'] },
        { k: 'البيانات', items: ['SQL Server', 'EF Core', 'تصميم قواعد البيانات', 'نمذجة البيانات'] },
        { k: 'الأساسيات', items: ['البرمجة الكائنية', 'الكود النظيف', 'معمارية البرمجيات', 'حلّ المشكلات'] },
        { k: 'الأدوات والممارسة', items: ['Git', 'GitHub', 'Postman', 'تحليل المتطلّبات'] },
        { k: 'الأعمال والأنظمة', items: ['التفكير النُّظُمي', 'رسم سير العمل', 'منطق الأعمال', 'أساس نظم المعلومات'] },
      ],
    },
    path: {
      index: '٠٥',
      label: 'المسار',
      heading: 'كيف وصلت إلى هنا',
      note: 'اتّجاه، لا قائمة مسمّيات وظيفية — الشكل الصادق للرحلة حتى الآن.',
      nodes: [
        {
          tag: 'الأساس',
          k: 'نظم المعلومات الإدارية',
          v: 'تعلّمت أن أرى التقنية وسيلة لغاية تخصّ الأعمال — المتطلّبات والمستخدمون وسير العمل أولًا.',
        },
        {
          tag: 'التركيز',
          k: 'هندسة الخلفية',
          v: 'التزمت بمنظومة ‏.NET: لغة C#، وASP.NET Core، والواجهات البرمجية، والبيانات العلائقية.',
        },
        {
          tag: 'المشروع الرئيسي',
          k: 'AssetX',
          v: 'طبّقت الجانبين معًا — بتصميم فكرة سوق B2B ثنائي الأطراف من البداية إلى النهاية.',
        },
        {
          tag: 'الآن',
          k: 'تعلّم مستمر',
          v: 'أعمّق حرفتي الهندسية باستمرار — المعمارية، والاختبار، وبناء ما يدوم.',
        },
      ],
    },
    contact: {
      index: '٠٦',
      label: 'تواصل',
      heading: 'لنبنِ شيئًا له هدف.',
      lead: 'متاح لأدوار الخلفية والتعاون والمشكلات المثيرة للاهتمام. أسرع طريقة للوصول إليّ هي البريد الإلكتروني.',
      emailCta: 'راسلني',
      copy: 'نسخ',
      copied: 'تم النسخ',
      elsewhere: 'في أماكن أخرى',
      backTop: 'العودة للأعلى',
    },
    footer: {
      built: 'تصميم وبناء محمد أشرف عبد العزيز',
      rights: 'جميع الحقوق محفوظة.',
      tagline: 'كود · سياق · هدف',
    },
  },
} as const

export type Dictionary = (typeof dict)['en']

type LanguageContextValue = {
  lang: Lang
  dir: Dir
  t: Dictionary
  setLang: (l: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'portfolio-lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
    if (stored === 'en' || stored === 'ar') {
      setLangState(stored)
    }
  }, [])

  useEffect(() => {
    const dir: Dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(
    () => setLangState((p) => (p === 'en' ? 'ar' : 'en')),
    [],
  )

  const dir: Dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider
      value={{ lang, dir, t: dict[lang], setLang, toggle }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
