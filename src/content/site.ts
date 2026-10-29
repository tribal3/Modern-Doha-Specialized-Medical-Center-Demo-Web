export type Lang = 'en' | 'ar'

/**
 * Center facts — sourced from the brief and from the center's public listings
 * (directory listings and the center's public social pages).
 * Update these in one place.
 */
export const clinic = {
  nameEn: 'Modern Doha Specialized Medical Center',
  nameAr: 'مجمع الدوحة الطبي التخصصي الحديث',
  nameShortEn: 'Modern Doha',
  nameShortAr: 'الدوحة الحديث',
  nameSubEn: 'Specialized Medical Center',
  nameSubAr: 'مجمع طبي تخصصي',
  roleEn: 'Multispecialty Medical Center',
  roleAr: 'مجمع طبي متعدد التخصصات',
  city: 'Al Wakrah, Qatar',
  addressEn: 'Building 59, Al Jabal Street, Al Wakrah, Qatar',
  addressAr: 'مبنى 59، شارع الجبل، الوكرة، قطر',
  phoneDisplay: '+974 3313 6662',
  phoneHref: 'tel:+97433136662',
  /** Directions link for the published address. */
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Building%2059%2C%20Al%20Jabal%20Street%2C%20Al%20Wakrah%2C%20Qatar',
  mapEmbed:
    'https://maps.google.com/maps?q=Building+59,+Al+Jabal+Street,+Al+Wakrah,+Qatar&z=15&output=embed',
  emergencyNumber: '999',
} as const

/**
 * Only specialties published for this center in public sources are listed:
 * dermatology (including cosmetic skin care) and gynecology. No doctor names,
 * credentials or claims are invented here.
 */
export type ServiceId = 'dermatology' | 'aesthetics' | 'gynecology'

export interface ServiceCopy {
  id: ServiceId
  title: string
  description: string
  detail: string
}

export interface InfoItem {
  title: string
  body: string
}

export interface HourRow {
  day: string
  hours: string
}

export interface SiteCopy {
  meta: { title: string; description: string }
  nav: {
    home: string
    why: string
    services: string
    about: string
    patients: string
    contact: string
  }
  actions: {
    call: string
    directions: string
    enquiry: string
    learnMore: string
    menu: string
    close: string
    language: string
  }
  header: {
    tagline: string
    menuTitle: string
  }
  hero: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    body: string
    explore: string
    trust: [string, string, string]
    imageAlt: string
    imageCaption: string
    cardEyebrow: string
  }
  trust: {
    eyebrow: string
    facts: [string, string, string]
    note: string
    cta: string
  }
  specialty: {
    eyebrow: string
    title: string
    intro: string
    paragraphs: [string, string]
    panelTitle: string
    points: InfoItem[]
    note: string
  }
  services: {
    eyebrow: string
    title: string
    intro: string
    note: string
    cardCta: string
    dialogKicker: string
    dialogGoodToKnow: string
    dialogPoints: [string, string, string]
    dialogDisclaimer: string
    dialogCta: string
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: [string, string]
    points: InfoItem[]
    cta: string
    imageAlt: string
    detailAlt: string
    imageNote: string
    badge: string
  }
  patients: {
    eyebrow: string
    title: string
    intro: string
    items: InfoItem[]
    note: string
  }
  appointment: {
    eyebrow: string
    title: string
    body: string
    note: string
  }
  contact: {
    eyebrow: string
    title: string
    intro: string
    locationLabel: string
    locationValue: string
    phoneLabel: string
    enquireLabel: string
    enquireValue: string
    panelNote: string
    hoursTitle: string
    hoursRows: HourRow[]
    hoursNote: string
    mapTitle: string
    mapNote: string
    mapCta: string
  }
  footer: {
    blurb: string
    exploreTitle: string
    servicesTitle: string
    contactTitle: string
    languageTitle: string
    disclaimer: string
    medicalNote: string
    copyright: string
    credit: string
  }
  serviceDetails: Record<ServiceId, string>
  servicesList: ServiceCopy[]
}

const en: SiteCopy = {
  meta: {
    title: 'Modern Doha Specialized Medical Center · Al Wakrah, Qatar',
    description:
      'Modern Doha Specialized Medical Center in Al Wakrah, Qatar — dermatology and gynecology appointments arranged by phone. Building 59, Al Jabal Street. Call +974 3313 6662.',
  },
  nav: {
    home: 'Home',
    why: 'Why Choose Us',
    services: 'Medical Services',
    about: 'About Us',
    patients: 'Patient Info',
    contact: 'Contact',
  },
  actions: {
    call: 'Call Center',
    directions: 'Get Directions',
    enquiry: 'Appointment Enquiry',
    learnMore: 'Learn More',
    menu: 'Open menu',
    close: 'Close',
    language: 'Language',
  },
  header: {
    tagline: 'Al Wakrah · Qatar',
    menuTitle: 'Menu',
  },
  hero: {
    eyebrow: 'Multispecialty care · Al Wakrah, Qatar',
    titleLead: 'Specialist care for',
    titleAccent: 'every stage of life.',
    body: 'Modern Doha Specialized Medical Center brings dermatology and women’s health together at one address in Al Wakrah — with appointments arranged directly by phone.',
    explore: 'Explore Services',
    trust: [
      'Dermatology & skin care',
      'Gynecology & women’s health',
      'Appointments by phone',
    ],
    imageAlt:
      'A physician in a white coat holding a phone in a bright clinical setting',
    imageCaption: 'Illustrative imagery — not a photograph of this center.',
    cardEyebrow: 'Appointments by phone',
  },
  trust: {
    eyebrow: 'At a Glance',
    facts: [
      'Dermatology & gynecology',
      'Building 59, Al Jabal Street',
      'Open six days a week',
    ],
    note: 'Center details shown from public listings. Please call to confirm specialties and timings before travelling.',
    cta: 'Call the center',
  },
  specialty: {
    eyebrow: 'Why Choose Us',
    title: 'Specialist care, arranged around you.',
    intro:
      'A multispecialty medical center in Al Wakrah that brings skin health and women’s health under one roof — with a direct phone line and clear information in both languages.',
    paragraphs: [
      'Instead of travelling between clinics for related concerns, patients can be seen in one place. Dermatology and gynecology sit side by side in the same building, and the reception team helps you find the right appointment for what you need.',
      'Appointments are made by phone, so you speak to a person rather than fill in a form. The center is open six days a week, with Friday closed, at Building 59 on Al Jabal Street in Al Wakrah.',
    ],
    panelTitle: 'What makes the center different',
    points: [
      {
        title: 'Two specialties, one address',
        body: 'Dermatology and women’s health appointments in the same Al Wakrah building.',
      },
      {
        title: 'A direct phone line',
        body: 'Call the center and speak with the reception team — no online booking required.',
      },
      {
        title: 'English & Arabic information',
        body: 'Every section of this site is available in both languages, with right-to-left reading for Arabic.',
      },
    ],
    note: 'This is an unofficial website concept. Please confirm specialties, doctors and timings directly with the center.',
  },
  services: {
    eyebrow: 'Medical Services',
    title: 'Specialist clinics under one roof.',
    intro:
      'The specialties publicly listed for the center: dermatology — including cosmetic skin care — and gynecology. Call to confirm the clinic days and doctors for each.',
    note: 'Service information is based on the center’s public listings. Doctors, clinic days and availability can change — please call before visiting.',
    cardCta: 'Learn More',
    dialogKicker: 'Medical Service',
    dialogGoodToKnow: 'Before you call',
    dialogPoints: [
      'Ask the reception team which clinic days are available for this specialty.',
      'Mention your main concern so they can guide you to the right appointment.',
      'Bring any previous reports, prescriptions or test results with you.',
    ],
    dialogDisclaimer:
      'This is general information, not medical advice. Please speak with a qualified clinician about your own health.',
    dialogCta: 'Call to enquire',
  },
  about: {
    eyebrow: 'About Us',
    title: 'A specialist address in the heart of Al Wakrah.',
    paragraphs: [
      'Modern Doha Specialized Medical Center is a private multispecialty medical center at Building 59 on Al Jabal Street in Al Wakrah. Dermatology and gynecology are offered together, so families in Al Wakrah can reach specialist care close to home.',
      'The center is open six days a week, with Friday closed, and appointments are arranged by phone. This website is an unofficial concept created by TRIBAL³ for presentation — it is not the center’s official website.',
    ],
    points: [
      {
        title: 'In the heart of Al Wakrah',
        body: 'Building 59, Al Jabal Street — a straightforward address to find and share.',
      },
      {
        title: 'Dermatology & women’s health',
        body: 'Two specialist clinics, side by side in one medical center.',
      },
      {
        title: 'Arranged by phone',
        body: 'Call the reception team directly to find a suitable appointment.',
      },
    ],
    cta: 'Patient information',
    imageAlt:
      'The center’s building on Al Jabal Street in Al Wakrah, with its sign above the entrance',
    detailAlt: 'A skin care treatment in progress at a dermatology clinic',
    imageNote:
      'Building photograph from the center’s public listing. The smaller image is illustrative stock photography, not a photograph of this center.',
    badge: 'Al Wakrah · Qatar',
  },
  patients: {
    eyebrow: 'Patient Information',
    title: 'A few things to know before you visit.',
    intro:
      'Practical answers for a smooth appointment, so your call and your visit go to plan.',
    items: [
      {
        title: 'Appointments are arranged by phone',
        body: 'This website does not take bookings. Call the center and the reception team will advise on available times.',
      },
      {
        title: 'What to bring',
        body: 'Your identification, any insurance or health card you hold, a list of medicines you take, and recent reports if you have them.',
      },
      {
        title: 'Confirm before you travel',
        body: 'Clinic days and timings can change. Call ahead to confirm the specialty you need is available that day.',
      },
      {
        title: 'Finding the center',
        body: 'Use the directions link for Building 59, Al Jabal Street, Al Wakrah. Ask reception for the easiest approach when you call.',
      },
    ],
    note: 'General information only. Doctors, services and timings should be confirmed by phone. In an emergency in Qatar, call 999.',
  },
  appointment: {
    eyebrow: 'Appointments',
    title: 'The quickest way to book is to call.',
    body: 'Have a question about a specialty, a clinic day or availability? Call the center and the reception team will talk you through it.',
    note: 'No online booking — a person answers the phone.',
  },
  contact: {
    eyebrow: 'Contact & Location',
    title: 'Find us in Al Wakrah.',
    intro: 'Phone, address and clinic hours — everything you need to plan a visit.',
    locationLabel: 'Address',
    locationValue: 'Building 59, Al Jabal Street, Al Wakrah, Qatar',
    phoneLabel: 'Phone',
    enquireLabel: 'Appointments',
    enquireValue: 'By phone — call the center',
    panelNote:
      'Appointments are arranged directly with the center by phone. This website does not take online bookings.',
    hoursTitle: 'Clinic Hours',
    hoursRows: [
      { day: 'Saturday – Wednesday', hours: '9:00 AM – 9:00 PM' },
      { day: 'Thursday', hours: '9:00 AM – 8:00 PM' },
      { day: 'Friday', hours: 'Closed' },
    ],
    hoursNote:
      'Hours as published in public listings — please call to confirm before visiting.',
    mapTitle: 'Map showing Modern Doha Specialized Medical Center in Al Wakrah',
    mapNote: 'Map preview by Google Maps',
    mapCta: 'Open in Google Maps',
  },
  footer: {
    blurb:
      'A bilingual website concept for Modern Doha Specialized Medical Center — a multispecialty medical center in Al Wakrah, Qatar.',
    exploreTitle: 'Explore',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    languageTitle: 'Language',
    disclaimer:
      'Unofficial website concept created by TRIBAL³ for presentation purposes — not the center’s official website.',
    medicalNote:
      'General information only, not medical advice. In an emergency in Qatar, call 999.',
    copyright: '© 2026 Modern Doha Specialized Medical Center · Al Wakrah, Qatar',
    credit: 'Concept & design by TRIBAL³',
  },
  serviceDetails: {
    dermatology:
      'Dermatology looks after the skin, hair and nails — from everyday concerns such as acne, eczema and pigmentation to longer-term follow-up. Call the center to ask which dermatology clinic days are available.',
    aesthetics:
      'Cosmetic skin care covers treatments offered for appearance and skin confidence. Ask the center directly about the treatments currently available, who performs them and what aftercare involves.',
    gynecology:
      'Gynecology and women’s health appointments cover routine reviews, consultations and follow-up across different life stages. Call the center to confirm which clinic days are available.',
  },
  servicesList: [
    {
      id: 'dermatology',
      title: 'Dermatology',
      description:
        'Consultations for skin, hair and nail concerns, with follow-up where needed.',
      detail: '',
    },
    {
      id: 'aesthetics',
      title: 'Cosmetic Dermatology',
      description:
        'Aesthetic skin treatments offered by the center’s dermatology clinic.',
      detail: '',
    },
    {
      id: 'gynecology',
      title: 'Gynecology & Women’s Health',
      description:
        'Women’s health consultations and follow-up across different life stages.',
      detail: '',
    },
  ],
}

const ar: SiteCopy = {
  meta: {
    title: 'مجمع الدوحة الطبي التخصصي الحديث · الوكرة، قطر',
    description:
      'مجمع الدوحة الطبي التخصصي الحديث في الوكرة، قطر — مواعيد الجلدية والنساء تُرتَّب هاتفيًا. مبنى 59، شارع الجبل. هاتف: 974 3313 6662.',
  },
  nav: {
    home: 'الرئيسية',
    why: 'لماذا نحن',
    services: 'الخدمات الطبية',
    about: 'من نحن',
    patients: 'للمراجعين',
    contact: 'تواصل معنا',
  },
  actions: {
    call: 'اتصل بالمجمع',
    directions: 'الاتجاهات',
    enquiry: 'استفسار عن موعد',
    learnMore: 'اعرف المزيد',
    menu: 'فتح القائمة',
    close: 'إغلاق',
    language: 'اللغة',
  },
  header: {
    tagline: 'الوكرة · قطر',
    menuTitle: 'القائمة',
  },
  hero: {
    eyebrow: 'رعاية متعددة التخصصات · الوكرة، قطر',
    titleLead: 'رعاية تخصصية في',
    titleAccent: 'كل مرحلة من حياتك.',
    body: 'يجمع مجمع الدوحة الطبي التخصصي الحديث تخصصَي الجلدية وصحة المرأة في عنوان واحد في الوكرة — مع ترتيب المواعيد هاتفيًا مباشرة.',
    explore: 'استكشف الخدمات',
    trust: [
      'الجلدية والعناية بالبشرة',
      'النساء وصحة المرأة',
      'المواعيد تُرتَّب هاتفيًا',
    ],
    imageAlt: 'طبيب يرتدي المعطف الأبيض ويتحقق من هاتفه في بيئة علاجية مشرقة',
    imageCaption: 'صور توضيحية، وليست صورة لهذا المجمع.',
    cardEyebrow: 'المواعيد هاتفيًا',
  },
  trust: {
    eyebrow: 'لمحة سريعة',
    facts: ['الجلدية والنساء', 'مبنى 59، شارع الجبل', 'مفتوح ستة أيام أسبوعيًا'],
    note: 'بيانات المجمع مأخوذة من المصادر العامة. يُرجى الاتصال للتأكد من التخصصات والمواعيد قبل التوجّه.',
    cta: 'اتصل بالمجمع',
  },
  specialty: {
    eyebrow: 'لماذا نحن',
    title: 'رعاية تخصصية مرتّبة حولك.',
    intro:
      'مجمع طبي متعدد التخصصات في الوكرة يجمع صحة الجلد وصحة المرأة تحت سقف واحد — مع خط هاتفي مباشر ومعلومات واضحة باللغتين.',
    paragraphs: [
      'بدلًا من التنقل بين العيادات لاستفسارات مترابطة، يمكن للمراجع أن يُستقبل في مكان واحد. تقع عيادة الجلدية وعيادة النساء جنبًا إلى جنب في المبنى نفسه، ويساعدك فريق الاستقبال في الوصول إلى الموعد المناسب لحاجتك.',
      'تُرتَّب المواعيد هاتفيًا، فتتحدث إلى شخص بدل ملء استمارة. والمجمع مفتوح ستة أيام في الأسبوع، ويغلق يوم الجمعة، في مبنى 59 على شارع الجبل في الوكرة.',
    ],
    panelTitle: 'ما يميّز المجمع',
    points: [
      {
        title: 'تخصصان في عنوان واحد',
        body: 'مواعيد الجلدية وصحة المرأة في المبنى نفسه في الوكرة.',
      },
      {
        title: 'خط هاتفي مباشر',
        body: 'اتصل بالمجمع وتحدّث مع فريق الاستقبال — دون حاجة إلى حجز إلكتروني.',
      },
      {
        title: 'معلومات بالعربية والإنجليزية',
        body: 'كل قسم في هذا الموقع متاح باللغتين، مع عرض العربية من اليمين إلى اليسار.',
      },
    ],
    note: 'هذا تصوّر غير رسمي للموقع. يُرجى التأكد من التخصصات والأطباء والمواعيد مباشرة مع المجمع.',
  },
  services: {
    eyebrow: 'الخدمات الطبية',
    title: 'عيادات تخصصية تحت سقف واحد.',
    intro:
      'التخصصات المنشورة للعموم عن المجمع: الجلدية — بما يشمل العناية التجميلية بالبشرة — والنساء. اتصل للتأكد من أيام العيادات والأطباء لكل تخصص.',
    note: 'معلومات الخدمات مبنية على المصادر العامة للمجمع. قد يتغير الأطباء وأيام العيادات والتوفر — يُرجى الاتصال قبل الزيارة.',
    cardCta: 'اعرف المزيد',
    dialogKicker: 'خدمة طبية',
    dialogGoodToKnow: 'قبل الاتصال',
    dialogPoints: [
      'اسأل فريق الاستقبال عن أيام العيادة المتاحة لهذا التخصص.',
      'اذكر شكواك الأساسية ليرشدوك إلى الموعد المناسب.',
      'أحضر معك أي تقارير أو وصفات أو نتائج فحوصات سابقة.',
    ],
    dialogDisclaimer:
      'هذه معلومات عامة وليست نصيحة طبية. يُرجى استشارة مختص مؤهل بشأن صحتك.',
    dialogCta: 'اتصل للاستفسار',
  },
  about: {
    eyebrow: 'من نحن',
    title: 'عنوان تخصصي في قلب الوكرة.',
    paragraphs: [
      'مجمع الدوحة الطبي التخصصي الحديث مجمع طبي خاص متعدد التخصصات في مبنى 59 على شارع الجبل في الوكرة. وتُقدَّم فيه الجلدية والنساء معًا، لتصل الأسر في الوكرة إلى رعاية تخصصية قريبة من منازلهم.',
      'المجمع مفتوح ستة أيام في الأسبوع، ويغلق يوم الجمعة، وتُرتَّب المواعيد هاتفيًا. وهذا الموقع تصوّر غير رسمي أعدّته TRIBAL³ لأغراض العرض، وليس الموقع الرسمي للمجمع.',
    ],
    points: [
      {
        title: 'في قلب الوكرة',
        body: 'مبنى 59، شارع الجبل — عنوان سهل الوصول والمشاركة.',
      },
      {
        title: 'الجلدية وصحة المرأة',
        body: 'عيادتان تخصصيتان جنبًا إلى جنب في مجمع طبي واحد.',
      },
      {
        title: 'الترتيب هاتفيًا',
        body: 'اتصل بفريق الاستقبال مباشرة للوصول إلى موعد مناسب.',
      },
    ],
    cta: 'معلومات للمراجعين',
    imageAlt: 'مبنى المجمع في شارع الجبل بالوكرة، مع اللافتة أعلى المدخل',
    detailAlt: 'جلسة عناية بالبشرة داخل عيادة جلدية',
    imageNote:
      'صورة المبنى من القائمة العامة للمجمع. أما الصورة الصغيرة فهي صورة توضيحية وليست صورة للمجمع.',
    badge: 'الوكرة · قطر',
  },
  patients: {
    eyebrow: 'معلومات للمراجعين',
    title: 'أمور يُستحسن معرفتها قبل الزيارة.',
    intro: 'إجابات عملية لموعد سلس، لتنظيم اتصالك وزيارتك بسهولة.',
    items: [
      {
        title: 'المواعيد تُرتَّب هاتفيًا',
        body: 'لا يقبل هذا الموقع الحجز الإلكتروني. اتصل بالمجمع وسيرشدك فريق الاستقبال إلى المواعيد المتاحة.',
      },
      {
        title: 'ما تحضره معك',
        body: 'إثبات الهوية، وأي بطاقة تأمين أو بطاقة صحية تحملها، وقائمة الأدوية التي تتناولها، وأحدث التقارير إن وُجدت.',
      },
      {
        title: 'تأكد قبل التوجّه',
        body: 'قد تتغير أيام العيادات ومواعيدها. اتصل مسبقًا للتأكد من توفر التخصص الذي تحتاجه في ذلك اليوم.',
      },
      {
        title: 'الوصول إلى المجمع',
        body: 'استخدم رابط الاتجاهات إلى مبنى 59، شارع الجبل، الوكرة. واسأل الاستقبال عن أسهل طريق للوصول عند الاتصال.',
      },
    ],
    note: 'معلومات عامة فقط. يُرجى تأكيد الأطباء والخدمات والمواعيد هاتفيًا. وفي الحالات الطارئة في قطر، اتصل بالرقم 999.',
  },
  appointment: {
    eyebrow: 'المواعيد',
    title: 'أسرع طريقة للحجز هي الاتصال.',
    body: 'لديك سؤال عن تخصص أو يوم عيادة أو توفر موعد؟ اتصل بالمجمع وسيرشدك فريق الاستقبال خطوة بخطوة.',
    note: 'لا حجز إلكتروني — شخص يردّ على الهاتف.',
  },
  contact: {
    eyebrow: 'التواصل والموقع',
    title: 'تجدونا في الوكرة.',
    intro: 'الهاتف والعنوان ومواعيد العمل — كل ما تحتاجه لترتيب زيارتك.',
    locationLabel: 'العنوان',
    locationValue: 'مبنى 59، شارع الجبل، الوكرة، قطر',
    phoneLabel: 'الهاتف',
    enquireLabel: 'المواعيد',
    enquireValue: 'هاتفيًا — اتصل بالمجمع',
    panelNote:
      'تُرتَّب المواعيد مباشرة مع المجمع عبر الهاتف، ولا يقبل هذا الموقع الحجز الإلكتروني.',
    hoursTitle: 'مواعيد العمل',
    hoursRows: [
      {
        day: 'السبت – الأربعاء',
        hours: 'من 9:00 صباحًا إلى 9:00 مساءً',
      },
      { day: 'الخميس', hours: 'من 9:00 صباحًا إلى 8:00 مساءً' },
      { day: 'الجمعة', hours: 'مغلق' },
    ],
    hoursNote:
      'المواعيد وفق المصادر العامة — يُرجى الاتصال للتأكيد قبل الزيارة.',
    mapTitle: 'خريطة لموقع مجمع الدوحة الطبي التخصصي الحديث في الوكرة',
    mapNote: 'معاينة الخريطة من خرائط Google',
    mapCta: 'فتح في خرائط Google',
  },
  footer: {
    blurb:
      'تصوّر لموقع إلكتروني ثنائي اللغة لمجمع الدوحة الطبي التخصصي الحديث — مجمع طبي متعدد التخصصات في الوكرة، قطر.',
    exploreTitle: 'استكشف',
    servicesTitle: 'الخدمات',
    contactTitle: 'تواصل',
    languageTitle: 'اللغة',
    disclaimer:
      'تصوّر غير رسمي للموقع أعدّته TRIBAL³ لأغراض العرض، وليس الموقع الرسمي للمجمع.',
    medicalNote: 'معلومات عامة وليست نصيحة طبية. في الحالات الطارئة في قطر، اتصل بالرقم 999.',
    copyright: '© 2026 مجمع الدوحة الطبي التخصصي الحديث · الوكرة، قطر',
    credit: 'الفكرة والتصميم: TRIBAL³',
  },
  serviceDetails: {
    dermatology:
      'تُعنى الجلدية بالبشرة والشعر والأظافر — من الحالات الشائعة كحب الشباب والأكزيما والتصبغات إلى المتابعة على المدى الأطول. اتصل بالمجمع للاستفسار عن أيام عيادة الجلدية المتاحة.',
    aesthetics:
      'تشمل العناية التجميلية بالبشرة العلاجات التي تُقدَّم لأغراض المظهر وثقة البشرة. اسأل المجمع مباشرة عن العلاجات المتاحة حاليًا ومن يقوم بها وما تتضمنه العناية بعدها.',
    gynecology:
      'تشمل مواعيد النساء وصحة المرأة المراجعات الدورية والاستشارات والمتابعة في مختلف مراحل الحياة. اتصل بالمجمع للتأكد من أيام العيادة المتاحة.',
  },
  servicesList: [
    {
      id: 'dermatology',
      title: 'الجلدية',
      description: 'استشارات لمشاكل البشرة والشعر والأظافر، مع المتابعة عند الحاجة.',
      detail: '',
    },
    {
      id: 'aesthetics',
      title: 'الجلدية التجميلية',
      description: 'علاجات تجميلية للبشرة تقدّمها عيادة الجلدية في المجمع.',
      detail: '',
    },
    {
      id: 'gynecology',
      title: 'النساء وصحة المرأة',
      description: 'استشارات ومتابعة لصحة المرأة في مختلف مراحل الحياة.',
      detail: '',
    },
  ],
}

export const copy: Record<Lang, SiteCopy> = { en, ar }

export const isRtl = (lang: Lang) => lang === 'ar'
