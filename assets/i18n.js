/* United Blending — language switcher
 *
 * Translations are keyed by the exact English string on the page, so no
 * markup changes are needed: on switch we walk the text nodes and swap
 * matches, keeping the English original on the node so we can switch back.
 * Names, addresses, phone numbers and emails are deliberately untranslated.
 */
(function () {
  const LANGS = [
    { code: "en", label: "English",          short: "EN" },
    { code: "zh", label: "中文",     short: "中文" },
    { code: "ms", label: "Bahasa Melayu",    short: "MS" },
    { code: "id", label: "Bahasa Indonesia", short: "ID" },
    { code: "fr", label: "Français",    short: "FR" },
    { code: "de", label: "Deutsch",          short: "DE" },
    { code: "es", label: "Español",     short: "ES" },
  ];

  const DICT = {
    zh: {
      "Specialise in Packaging Container.": "专注于容器包装。",
      "About": "关于我们", "Products": "产品", "Industries": "服务行业",
      "Contact": "联系我们", "Get a quote": "获取报价", "Email us": "电邮联系",
      "Home": "首页", "Company": "公司", "Careers": "招聘", "Group": "集团",
      "Terms": "条款", "Privacy": "隐私", "Compliance": "合规",
      "Pte Ltd · Singapore": "Pte Ltd · 新加坡",
      "Specialise in Packaging Container": "专注于容器包装",
      "Talk to us": "联系我们",
      "Members of": "成员单位", "Waste Management": "废物管理",
      "List of subsidiary companies": "子公司名单",
      "Collection & sales of industrial packaging": "工业包装回收与销售",
      "Recovery & treatment of solvents": "溶剂回收与处理",
      "New steel, PE drums & IBC": "全新钢桶、PE 桶及 IBC",
      "General waste collector": "一般废物收集",
      "Logistics & warehousing": "物流与仓储",
      "About us": "关于我们",
      "Established since 2003 with a humble beginning in commodity trading, mainly dealing with Steel drums and other Packaging Container items.": "自 2003 年起以商品贸易起步，主要经营钢桶及其他容器包装产品。",
      "To this day, we remain as one of the closest business alliance partners, supplying Steel drums mainly to the major oil giants in the Oil & Gas industry.": "时至今日，我们始终是最紧密的商业联盟伙伴之一，主要为石油与天然气行业的大型石油公司供应钢桶。",
      "Our key selling points": "我们的核心优势",
      "Have a good listening ear": "用心倾听客户需求",
      "Solving your problems": "为您解决问题",
      "Flexible & always accommodating to customers' needs": "灵活应变，始终配合客户需求",
      "Working towards cost savings for our customers": "致力于为客户节省成本",
      "Industries we serve": "服务行业",
      "Trusted across eight industries.": "深受八大行业信赖。",
      "Oil & Gas": "石油与天然气", "Special Chemical": "特种化学品",
      "Food & Beverage": "食品饮料", "Agriculture & Pesticides": "农业与农药", "Marine": "船舶海事", "Perfumery": "香精香料", "F&B": "食品饮料",
      "Automotive": "汽车工业", "Industrial": "工业制造", "Aviation": "航空",
      "Explore our range of products": "探索我们的产品系列",
      "Tight & open head": "闭口与开口式", "Steel Drums": "钢桶",
      "UN-certified": "联合国认证", "HDPE Drums": "高密度聚乙烯桶",
      "Galvanised cage": "镀锌钢架", "IBCs": "中型散装容器",
      "Stackable HDPE": "可堆叠 HDPE", "Jerrycans": "方桶",
      "New & used": "全新与二手", "Wooden & Plastic Pallets": "木质与塑料托盘",
      "We are located at": "我们的位置",
      "Comes with 34,000 square feet covered warehouse": "配备 34,000 平方英尺有盖仓库",
      "12 loading bays with ramps": "12 个带坡道的装卸区",
      "8 24-footer covered and open air trucks": "8 辆 24 尺有盖及敞篷货车",
      "Let's talk supply.": "让我们谈谈供应。", "Contact us": "联系我们",
      "Address": "地址", "Telephone": "电话", "Mobile": "手机",
      "Email": "电邮", "Website": "网站", "Operating hours": "营业时间",
      "Monday to Friday: 8:30am to 5:30pm": "星期一至五：上午 8:30 至下午 5:30",
      "Saturday, Sunday & PH: Closed": "星期六、日及公共假期：休息",
      "Request a quote": "索取报价",
      "Tell us what you need: drums, IBCs, jerrycans, pallets or blending. We'll come back within one working day.": "告诉我们您的需求：钢桶、IBC、方桶、托盘或调配服务。我们将在一个工作日内回复。",
      "Name": "姓名", "Phone": "电话", "What do you need?": "您需要什么？",
      "Send enquiry": "发送查询",
      "Submitting opens your email app with the enquiry pre-filled; nothing is stored on this site.": "提交后将打开您的电邮应用并自动填入内容；本网站不会储存任何资料。",
      "Industrial packaging and blended supply, operating from the heart of Singapore since 2003.": "工业包装与调配供应，自 2003 年起立足新加坡。",
      "Steel drums": "钢桶", "HDPE drums": "高密度聚乙烯桶",
      "IBCs & jerrycans": "IBC 与方桶", "Pallets": "托盘", "Our yard": "我们的场地",
      "© 2026 United Blending Pte Ltd. All rights reserved.": "© 2026 United Blending Pte Ltd. 版权所有。",
    },

    ms: {
      "Specialise in Packaging Container.": "Pakar dalam Pembungkusan Kontena.",
      "About": "Tentang", "Products": "Produk", "Industries": "Industri",
      "Contact": "Hubungi", "Get a quote": "Dapatkan sebut harga", "Email us": "E-mel kami",
      "Home": "Laman utama", "Company": "Syarikat", "Careers": "Kerjaya", "Group": "Kumpulan",
      "Terms": "Terma", "Privacy": "Privasi", "Compliance": "Pematuhan",
      "Pte Ltd · Singapore": "Pte Ltd · Singapura",
      "Specialise in Packaging Container": "Pakar dalam Pembungkusan Kontena",
      "Talk to us": "Hubungi kami",
      "Members of": "Ahli kepada", "Waste Management": "Pengurusan Sisa",
      "List of subsidiary companies": "Senarai syarikat subsidiari",
      "Collection & sales of industrial packaging": "Pengumpulan & penjualan pembungkusan industri",
      "Recovery & treatment of solvents": "Pemulihan & rawatan pelarut",
      "New steel, PE drums & IBC": "Drum keluli baharu, drum PE & IBC",
      "General waste collector": "Pengumpul sisa am",
      "Logistics & warehousing": "Logistik & pergudangan",
      "About us": "Tentang kami",
      "Established since 2003 with a humble beginning in commodity trading, mainly dealing with Steel drums and other Packaging Container items.": "Ditubuhkan sejak 2003 dengan permulaan sederhana dalam perdagangan komoditi, terutamanya drum keluli dan barangan Pembungkusan Kontena yang lain.",
      "To this day, we remain as one of the closest business alliance partners, supplying Steel drums mainly to the major oil giants in the Oil & Gas industry.": "Sehingga kini, kami kekal sebagai salah satu rakan perikatan perniagaan terdekat, membekalkan drum keluli terutamanya kepada syarikat minyak gergasi dalam industri Minyak & Gas.",
      "Our key selling points": "Kelebihan utama kami",
      "Have a good listening ear": "Sentiasa mendengar dengan teliti",
      "Solving your problems": "Menyelesaikan masalah anda",
      "Flexible & always accommodating to customers' needs": "Fleksibel & sentiasa memenuhi keperluan pelanggan",
      "Working towards cost savings for our customers": "Berusaha menjimatkan kos untuk pelanggan",
      "Industries we serve": "Industri yang kami khidmati",
      "Trusted across eight industries.": "Dipercayai dalam lapan industri.",
      "Oil & Gas": "Minyak & Gas", "Special Chemical": "Bahan Kimia Khas",
      "Food & Beverage": "Makanan & Minuman", "Agriculture & Pesticides": "Pertanian & Racun Perosak", "Marine": "Maritim", "Perfumery": "Pewangi", "F&B": "Makanan & Minuman",
      "Automotive": "Automotif", "Industrial": "Perindustrian", "Aviation": "Penerbangan",
      "Explore our range of products": "Terokai rangkaian produk kami",
      "Tight & open head": "Kepala tertutup & terbuka", "Steel Drums": "Drum Keluli",
      "UN-certified": "Diperakui UN", "HDPE Drums": "Drum HDPE",
      "Galvanised cage": "Sangkar bergalvani", "IBCs": "IBC",
      "Stackable HDPE": "HDPE boleh disusun", "Jerrycans": "Jeriken",
      "New & used": "Baharu & terpakai", "Wooden & Plastic Pallets": "Palet Kayu & Plastik",
      "We are located at": "Kami terletak di",
      "Comes with 34,000 square feet covered warehouse": "Dilengkapi gudang berbumbung seluas 34,000 kaki persegi",
      "12 loading bays with ramps": "12 teluk pemunggahan dengan tanjakan",
      "8 24-footer covered and open air trucks": "8 trak 24 kaki berbumbung dan terbuka",
      "Let's talk supply.": "Mari bincang bekalan.", "Contact us": "Hubungi kami",
      "Address": "Alamat", "Telephone": "Telefon", "Mobile": "Telefon bimbit",
      "Email": "E-mel", "Website": "Laman web", "Operating hours": "Waktu operasi",
      "Monday to Friday: 8:30am to 5:30pm": "Isnin hingga Jumaat: 8:30 pagi hingga 5:30 petang",
      "Saturday, Sunday & PH: Closed": "Sabtu, Ahad & Cuti Umum: Tutup",
      "Request a quote": "Minta sebut harga",
      "Tell us what you need: drums, IBCs, jerrycans, pallets or blending. We'll come back within one working day.": "Beritahu kami keperluan anda: drum, IBC, jeriken, palet atau pengadunan. Kami akan menghubungi anda dalam satu hari bekerja.",
      "Name": "Nama", "Phone": "Telefon", "What do you need?": "Apa yang anda perlukan?",
      "Send enquiry": "Hantar pertanyaan",
      "Submitting opens your email app with the enquiry pre-filled; nothing is stored on this site.": "Menghantar akan membuka aplikasi e-mel anda dengan pertanyaan diisi terlebih dahulu; tiada data disimpan di laman ini.",
      "Industrial packaging and blended supply, operating from the heart of Singapore since 2003.": "Pembungkusan industri dan bekalan adunan, beroperasi dari pusat Singapura sejak 2003.",
      "Steel drums": "Drum keluli", "HDPE drums": "Drum HDPE",
      "IBCs & jerrycans": "IBC & jeriken", "Pallets": "Palet", "Our yard": "Kawasan kami",
      "© 2026 United Blending Pte Ltd. All rights reserved.": "© 2026 United Blending Pte Ltd. Hak cipta terpelihara.",
    },

    id: {
      "Specialise in Packaging Container.": "Spesialis Kemasan Kontainer.",
      "About": "Tentang", "Products": "Produk", "Industries": "Industri",
      "Contact": "Kontak", "Get a quote": "Minta penawaran", "Email us": "Email kami",
      "Home": "Beranda", "Company": "Perusahaan", "Careers": "Karier", "Group": "Grup",
      "Terms": "Ketentuan", "Privacy": "Privasi", "Compliance": "Kepatuhan",
      "Pte Ltd · Singapore": "Pte Ltd · Singapura",
      "Specialise in Packaging Container": "Spesialis Kemasan Kontainer",
      "Talk to us": "Hubungi kami",
      "Members of": "Anggota dari", "Waste Management": "Pengelolaan Limbah",
      "List of subsidiary companies": "Daftar anak perusahaan",
      "Collection & sales of industrial packaging": "Pengumpulan & penjualan kemasan industri",
      "Recovery & treatment of solvents": "Pemulihan & pengolahan pelarut",
      "New steel, PE drums & IBC": "Drum baja baru, drum PE & IBC",
      "General waste collector": "Pengumpul limbah umum",
      "Logistics & warehousing": "Logistik & pergudangan",
      "About us": "Tentang kami",
      "Established since 2003 with a humble beginning in commodity trading, mainly dealing with Steel drums and other Packaging Container items.": "Didirikan sejak 2003 dengan awal yang sederhana di bidang perdagangan komoditas, terutama drum baja dan barang Kemasan Kontainer lainnya.",
      "To this day, we remain as one of the closest business alliance partners, supplying Steel drums mainly to the major oil giants in the Oil & Gas industry.": "Hingga kini, kami tetap menjadi salah satu mitra aliansi bisnis terdekat, memasok drum baja terutama kepada perusahaan minyak besar di industri Minyak & Gas.",
      "Our key selling points": "Keunggulan utama kami",
      "Have a good listening ear": "Selalu mendengarkan dengan baik",
      "Solving your problems": "Menyelesaikan masalah Anda",
      "Flexible & always accommodating to customers' needs": "Fleksibel & selalu memenuhi kebutuhan pelanggan",
      "Working towards cost savings for our customers": "Berupaya menghemat biaya bagi pelanggan",
      "Industries we serve": "Industri yang kami layani",
      "Trusted across eight industries.": "Dipercaya di delapan industri.",
      "Oil & Gas": "Minyak & Gas", "Special Chemical": "Bahan Kimia Khusus",
      "Food & Beverage": "Makanan & Minuman", "Agriculture & Pesticides": "Pertanian & Pestisida", "Marine": "Maritim", "Perfumery": "Parfum", "F&B": "Makanan & Minuman",
      "Automotive": "Otomotif", "Industrial": "Industri", "Aviation": "Penerbangan",
      "Explore our range of products": "Jelajahi rangkaian produk kami",
      "Tight & open head": "Kepala tertutup & terbuka", "Steel Drums": "Drum Baja",
      "UN-certified": "Bersertifikat UN", "HDPE Drums": "Drum HDPE",
      "Galvanised cage": "Rangka galvanis", "IBCs": "IBC",
      "Stackable HDPE": "HDPE dapat ditumpuk", "Jerrycans": "Jeriken",
      "New & used": "Baru & bekas", "Wooden & Plastic Pallets": "Palet Kayu & Plastik",
      "We are located at": "Kami berlokasi di",
      "Comes with 34,000 square feet covered warehouse": "Dilengkapi gudang tertutup seluas 34.000 kaki persegi",
      "12 loading bays with ramps": "12 dok bongkar muat dengan ramp",
      "8 24-footer covered and open air trucks": "8 truk 24 kaki tertutup dan terbuka",
      "Let's talk supply.": "Mari bicara soal pasokan.", "Contact us": "Hubungi kami",
      "Address": "Alamat", "Telephone": "Telepon", "Mobile": "Ponsel",
      "Email": "Email", "Website": "Situs web", "Operating hours": "Jam operasional",
      "Monday to Friday: 8:30am to 5:30pm": "Senin hingga Jumat: 08.30 hingga 17.30",
      "Saturday, Sunday & PH: Closed": "Sabtu, Minggu & Hari Libur: Tutup",
      "Request a quote": "Minta penawaran",
      "Tell us what you need: drums, IBCs, jerrycans, pallets or blending. We'll come back within one working day.": "Beri tahu kami kebutuhan Anda: drum, IBC, jeriken, palet atau pencampuran. Kami akan menghubungi Anda dalam satu hari kerja.",
      "Name": "Nama", "Phone": "Telepon", "What do you need?": "Apa yang Anda butuhkan?",
      "Send enquiry": "Kirim pertanyaan",
      "Submitting opens your email app with the enquiry pre-filled; nothing is stored on this site.": "Mengirim akan membuka aplikasi email Anda dengan pertanyaan yang sudah terisi; tidak ada data yang disimpan di situs ini.",
      "Industrial packaging and blended supply, operating from the heart of Singapore since 2003.": "Kemasan industri dan pasokan campuran, beroperasi dari jantung Singapura sejak 2003.",
      "Steel drums": "Drum baja", "HDPE drums": "Drum HDPE",
      "IBCs & jerrycans": "IBC & jeriken", "Pallets": "Palet", "Our yard": "Area kami",
      "© 2026 United Blending Pte Ltd. All rights reserved.": "© 2026 United Blending Pte Ltd. Hak cipta dilindungi.",
    },

    fr: {
      "Specialise in Packaging Container.": "Spécialiste de l'emballage industriel.",
      "About": "À propos", "Products": "Produits", "Industries": "Secteurs",
      "Contact": "Contact", "Get a quote": "Demander un devis", "Email us": "Écrivez-nous",
      "Home": "Accueil", "Company": "Société", "Careers": "Carrières", "Group": "Groupe",
      "Terms": "Conditions", "Privacy": "Confidentialité", "Compliance": "Conformité",
      "Pte Ltd · Singapore": "Pte Ltd · Singapour",
      "Specialise in Packaging Container": "Spécialiste de l'emballage industriel",
      "Talk to us": "Contactez-nous",
      "Members of": "Membre du", "Waste Management": "Gestion des déchets",
      "List of subsidiary companies": "Liste des filiales",
      "Collection & sales of industrial packaging": "Collecte et vente d'emballages industriels",
      "Recovery & treatment of solvents": "Récupération et traitement des solvants",
      "New steel, PE drums & IBC": "Fûts acier neufs, fûts PE et GRV",
      "General waste collector": "Collecte des déchets généraux",
      "Logistics & warehousing": "Logistique et entreposage",
      "About us": "À propos de nous",
      "Established since 2003 with a humble beginning in commodity trading, mainly dealing with Steel drums and other Packaging Container items.": "Fondée en 2003 avec des débuts modestes dans le négoce de matières premières, principalement des fûts en acier et d'autres emballages industriels.",
      "To this day, we remain as one of the closest business alliance partners, supplying Steel drums mainly to the major oil giants in the Oil & Gas industry.": "Aujourd'hui encore, nous restons l'un des partenaires d'alliance les plus proches, fournissant des fûts en acier principalement aux grandes compagnies du secteur pétrolier et gazier.",
      "Our key selling points": "Nos atouts majeurs",
      "Have a good listening ear": "Une écoute attentive",
      "Solving your problems": "Résoudre vos problèmes",
      "Flexible & always accommodating to customers' needs": "Flexibles et toujours à l'écoute des besoins clients",
      "Working towards cost savings for our customers": "Œuvrer à réduire les coûts de nos clients",
      "Industries we serve": "Les secteurs que nous servons",
      "Trusted across eight industries.": "La confiance de huit secteurs.",
      "Oil & Gas": "Pétrole et gaz", "Special Chemical": "Chimie de spécialité",
      "Food & Beverage": "Agroalimentaire", "Agriculture & Pesticides": "Agriculture et pesticides", "Marine": "Maritime", "Perfumery": "Parfumerie", "F&B": "Agroalimentaire",
      "Automotive": "Automobile", "Industrial": "Industrie", "Aviation": "Aéronautique",
      "Explore our range of products": "Découvrez notre gamme de produits",
      "Tight & open head": "Tête fixe et ouverte", "Steel Drums": "Fûts en acier",
      "UN-certified": "Certifié ONU", "HDPE Drums": "Fûts PEHD",
      "Galvanised cage": "Cage galvanisée", "IBCs": "GRV (IBC)",
      "Stackable HDPE": "PEHD empilable", "Jerrycans": "Jerricanes",
      "New & used": "Neufs et d'occasion", "Wooden & Plastic Pallets": "Palettes bois et plastique",
      "We are located at": "Nous sommes situés au",
      "Comes with 34,000 square feet covered warehouse": "Entrepôt couvert de 34 000 pieds carrés",
      "12 loading bays with ramps": "12 quais de chargement avec rampes",
      "8 24-footer covered and open air trucks": "8 camions de 24 pieds, bâchés et ouverts",
      "Let's talk supply.": "Parlons approvisionnement.", "Contact us": "Contactez-nous",
      "Address": "Adresse", "Telephone": "Téléphone", "Mobile": "Portable",
      "Email": "E-mail", "Website": "Site web", "Operating hours": "Heures d'ouverture",
      "Monday to Friday: 8:30am to 5:30pm": "Du lundi au vendredi : 8h30 à 17h30",
      "Saturday, Sunday & PH: Closed": "Samedi, dimanche et jours fériés : fermé",
      "Request a quote": "Demander un devis",
      "Tell us what you need: drums, IBCs, jerrycans, pallets or blending. We'll come back within one working day.": "Dites-nous ce dont vous avez besoin : fûts, GRV, jerricanes, palettes ou mélange. Nous revenons vers vous sous un jour ouvré.",
      "Name": "Nom", "Phone": "Téléphone", "What do you need?": "De quoi avez-vous besoin ?",
      "Send enquiry": "Envoyer la demande",
      "Submitting opens your email app with the enquiry pre-filled; nothing is stored on this site.": "L'envoi ouvre votre messagerie avec la demande pré-remplie ; aucune donnée n'est conservée sur ce site.",
      "Industrial packaging and blended supply, operating from the heart of Singapore since 2003.": "Emballages industriels et approvisionnement, au cœur de Singapour depuis 2003.",
      "Steel drums": "Fûts en acier", "HDPE drums": "Fûts PEHD",
      "IBCs & jerrycans": "GRV et jerricanes", "Pallets": "Palettes", "Our yard": "Notre site",
      "© 2026 United Blending Pte Ltd. All rights reserved.": "© 2026 United Blending Pte Ltd. Tous droits réservés.",
    },

    de: {
      "Specialise in Packaging Container.": "Spezialist für Industrieverpackungen.",
      "About": "Über uns", "Products": "Produkte", "Industries": "Branchen",
      "Contact": "Kontakt", "Get a quote": "Angebot anfordern", "Email us": "E-Mail senden",
      "Home": "Startseite", "Company": "Unternehmen", "Careers": "Karriere", "Group": "Gruppe",
      "Terms": "AGB", "Privacy": "Datenschutz", "Compliance": "Compliance",
      "Pte Ltd · Singapore": "Pte Ltd · Singapur",
      "Specialise in Packaging Container": "Spezialist für Industrieverpackungen",
      "Talk to us": "Sprechen Sie uns an",
      "Members of": "Mitglied der", "Waste Management": "Abfallwirtschaft",
      "List of subsidiary companies": "Liste der Tochtergesellschaften",
      "Collection & sales of industrial packaging": "Sammlung & Verkauf von Industrieverpackungen",
      "Recovery & treatment of solvents": "Rückgewinnung & Aufbereitung von Lösemitteln",
      "New steel, PE drums & IBC": "Neue Stahlfässer, PE-Fässer & IBC",
      "General waste collector": "Allgemeine Abfallsammlung",
      "Logistics & warehousing": "Logistik & Lagerhaltung",
      "About us": "Über uns",
      "Established since 2003 with a humble beginning in commodity trading, mainly dealing with Steel drums and other Packaging Container items.": "Seit 2003 mit bescheidenen Anfängen im Rohstoffhandel tätig, hauptsächlich mit Stahlfässern und weiteren Industrieverpackungen.",
      "To this day, we remain as one of the closest business alliance partners, supplying Steel drums mainly to the major oil giants in the Oil & Gas industry.": "Bis heute zählen wir zu den engsten Geschäftspartnern und beliefern vor allem die großen Ölkonzerne der Öl- und Gasindustrie mit Stahlfässern.",
      "Our key selling points": "Unsere Stärken",
      "Have a good listening ear": "Wir hören genau zu",
      "Solving your problems": "Wir lösen Ihre Probleme",
      "Flexible & always accommodating to customers' needs": "Flexibel und stets auf Kundenwünsche eingestellt",
      "Working towards cost savings for our customers": "Kostenersparnis für unsere Kunden",
      "Industries we serve": "Branchen, die wir beliefern",
      "Trusted across eight industries.": "Vertrauen aus acht Branchen.",
      "Oil & Gas": "Öl & Gas", "Special Chemical": "Spezialchemie",
      "Food & Beverage": "Lebensmittel & Getränke", "Agriculture & Pesticides": "Landwirtschaft & Pflanzenschutz", "Marine": "Maritim", "Perfumery": "Parfümerie", "F&B": "Lebensmittel & Getränke",
      "Automotive": "Automobil", "Industrial": "Industrie", "Aviation": "Luftfahrt",
      "Explore our range of products": "Entdecken Sie unser Produktsortiment",
      "Tight & open head": "Spund- und Deckelfässer", "Steel Drums": "Stahlfässer",
      "UN-certified": "UN-zertifiziert", "HDPE Drums": "HDPE-Fässer",
      "Galvanised cage": "Verzinkter Gitterkorb", "IBCs": "IBC-Container",
      "Stackable HDPE": "Stapelbares HDPE", "Jerrycans": "Kanister",
      "New & used": "Neu & gebraucht", "Wooden & Plastic Pallets": "Holz- & Kunststoffpaletten",
      "We are located at": "Sie finden uns in",
      "Comes with 34,000 square feet covered warehouse": "Mit 34.000 Quadratfuß überdachter Lagerfläche",
      "12 loading bays with ramps": "12 Ladebuchten mit Rampen",
      "8 24-footer covered and open air trucks": "8 24-Fuß-Lkw, überdacht und offen",
      "Let's talk supply.": "Sprechen wir über Ihre Versorgung.", "Contact us": "Kontakt",
      "Address": "Adresse", "Telephone": "Telefon", "Mobile": "Mobil",
      "Email": "E-Mail", "Website": "Website", "Operating hours": "Öffnungszeiten",
      "Monday to Friday: 8:30am to 5:30pm": "Montag bis Freitag: 8:30 bis 17:30 Uhr",
      "Saturday, Sunday & PH: Closed": "Samstag, Sonntag & Feiertage: geschlossen",
      "Request a quote": "Angebot anfordern",
      "Tell us what you need: drums, IBCs, jerrycans, pallets or blending. We'll come back within one working day.": "Sagen Sie uns, was Sie brauchen: Fässer, IBC, Kanister, Paletten oder Mischservice. Wir melden uns innerhalb eines Werktages.",
      "Name": "Name", "Phone": "Telefon", "What do you need?": "Was benötigen Sie?",
      "Send enquiry": "Anfrage senden",
      "Submitting opens your email app with the enquiry pre-filled; nothing is stored on this site.": "Beim Absenden öffnet sich Ihr E-Mail-Programm mit vorausgefüllter Anfrage; auf dieser Website werden keine Daten gespeichert.",
      "Industrial packaging and blended supply, operating from the heart of Singapore since 2003.": "Industrieverpackungen und Mischversorgung, seit 2003 aus Singapur.",
      "Steel drums": "Stahlfässer", "HDPE drums": "HDPE-Fässer",
      "IBCs & jerrycans": "IBC & Kanister", "Pallets": "Paletten", "Our yard": "Unser Gelände",
      "© 2026 United Blending Pte Ltd. All rights reserved.": "© 2026 United Blending Pte Ltd. Alle Rechte vorbehalten.",
    },

    es: {
      "Specialise in Packaging Container.": "Especialistas en envases industriales.",
      "About": "Nosotros", "Products": "Productos", "Industries": "Sectores",
      "Contact": "Contacto", "Get a quote": "Solicitar presupuesto", "Email us": "Escríbanos",
      "Home": "Inicio", "Company": "Empresa", "Careers": "Empleo", "Group": "Grupo",
      "Terms": "Términos", "Privacy": "Privacidad", "Compliance": "Cumplimiento",
      "Pte Ltd · Singapore": "Pte Ltd · Singapur",
      "Specialise in Packaging Container": "Especialistas en envases industriales",
      "Talk to us": "Hablemos",
      "Members of": "Miembro del", "Waste Management": "Gestión de Residuos",
      "List of subsidiary companies": "Lista de empresas filiales",
      "Collection & sales of industrial packaging": "Recogida y venta de envases industriales",
      "Recovery & treatment of solvents": "Recuperación y tratamiento de disolventes",
      "New steel, PE drums & IBC": "Bidones de acero nuevos, bidones PE e IBC",
      "General waste collector": "Recogida de residuos generales",
      "Logistics & warehousing": "Logística y almacenamiento",
      "About us": "Sobre nosotros",
      "Established since 2003 with a humble beginning in commodity trading, mainly dealing with Steel drums and other Packaging Container items.": "Fundada en 2003 con comienzos humildes en el comercio de materias primas, principalmente bidones de acero y otros envases industriales.",
      "To this day, we remain as one of the closest business alliance partners, supplying Steel drums mainly to the major oil giants in the Oil & Gas industry.": "Hasta hoy seguimos siendo uno de los socios comerciales más cercanos, suministrando bidones de acero principalmente a las grandes petroleras del sector de petróleo y gas.",
      "Our key selling points": "Nuestras ventajas clave",
      "Have a good listening ear": "Saber escuchar",
      "Solving your problems": "Resolver sus problemas",
      "Flexible & always accommodating to customers' needs": "Flexibles y siempre atentos a las necesidades del cliente",
      "Working towards cost savings for our customers": "Trabajar para ahorrar costes a nuestros clientes",
      "Industries we serve": "Sectores a los que servimos",
      "Trusted across eight industries.": "La confianza de ocho sectores.",
      "Oil & Gas": "Petróleo y gas", "Special Chemical": "Química especializada",
      "Food & Beverage": "Alimentación y bebidas", "Agriculture & Pesticides": "Agricultura y pesticidas", "Marine": "Marítimo", "Perfumery": "Perfumería", "F&B": "Alimentación y bebidas",
      "Automotive": "Automoción", "Industrial": "Industria", "Aviation": "Aviación",
      "Explore our range of products": "Explore nuestra gama de productos",
      "Tight & open head": "Boca estrecha y abierta", "Steel Drums": "Bidones de acero",
      "UN-certified": "Certificado ONU", "HDPE Drums": "Bidones HDPE",
      "Galvanised cage": "Jaula galvanizada", "IBCs": "Contenedores IBC",
      "Stackable HDPE": "HDPE apilable", "Jerrycans": "Garrafas",
      "New & used": "Nuevos y usados", "Wooden & Plastic Pallets": "Palés de madera y plástico",
      "We are located at": "Nos encontramos en",
      "Comes with 34,000 square feet covered warehouse": "Con 34.000 pies cuadrados de almacén cubierto",
      "12 loading bays with ramps": "12 muelles de carga con rampas",
      "8 24-footer covered and open air trucks": "8 camiones de 24 pies, cubiertos y abiertos",
      "Let's talk supply.": "Hablemos de suministro.", "Contact us": "Contacto",
      "Address": "Dirección", "Telephone": "Teléfono", "Mobile": "Móvil",
      "Email": "Correo", "Website": "Sitio web", "Operating hours": "Horario",
      "Monday to Friday: 8:30am to 5:30pm": "De lunes a viernes: 8:30 a 17:30",
      "Saturday, Sunday & PH: Closed": "Sábado, domingo y festivos: cerrado",
      "Request a quote": "Solicitar presupuesto",
      "Tell us what you need: drums, IBCs, jerrycans, pallets or blending. We'll come back within one working day.": "Díganos qué necesita: bidones, IBC, garrafas, palés o mezcla. Le responderemos en un día laborable.",
      "Name": "Nombre", "Phone": "Teléfono", "What do you need?": "¿Qué necesita?",
      "Send enquiry": "Enviar consulta",
      "Submitting opens your email app with the enquiry pre-filled; nothing is stored on this site.": "Al enviar se abrirá su aplicación de correo con la consulta rellenada; no se almacena nada en este sitio.",
      "Industrial packaging and blended supply, operating from the heart of Singapore since 2003.": "Envases industriales y suministro de mezclas, desde el corazón de Singapur desde 2003.",
      "Steel drums": "Bidones de acero", "HDPE drums": "Bidones HDPE",
      "IBCs & jerrycans": "IBC y garrafas", "Pallets": "Palés", "Our yard": "Nuestras instalaciones",
      "© 2026 United Blending Pte Ltd. All rights reserved.": "© 2026 United Blending Pte Ltd. Todos los derechos reservados.",
    },
  };

  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "TEXTAREA"]);

  function walk(node, fn) {
    if (node.nodeType === 3) return fn(node);
    if (node.nodeType !== 1 || SKIP.has(node.tagName)) return;
    for (const child of [...node.childNodes]) walk(child, fn);
  }

  function apply(code) {
    const dict = DICT[code] || null;
    walk(document.body, (n) => {
      // Remember the English original once, so switching back is lossless
      if (n.__en === undefined) n.__en = n.nodeValue;
      const en = n.__en.trim();
      if (!en) return;
      const hit = dict && dict[en];
      n.nodeValue = hit ? n.__en.replace(en, hit) : n.__en;
    });
    // Form placeholders and the submit button live outside text nodes
    document.querySelectorAll("[placeholder]").forEach((el) => {
      if (el.__enPh === undefined) el.__enPh = el.getAttribute("placeholder");
      const t = dict && dict[el.__enPh];
      el.setAttribute("placeholder", t || el.__enPh);
    });
    document.documentElement.lang = code;
    try { localStorage.setItem("ub-lang", code); } catch (e) {}
  }

  function build() {
    const host = document.querySelector(".lang");
    if (!host) return;
    const saved = (() => {
      try { return localStorage.getItem("ub-lang"); } catch (e) { return null; }
    })();
    const current = LANGS.some((l) => l.code === saved) ? saved : "en";

    const sel = document.createElement("select");
    sel.className = "lang-select";
    sel.setAttribute("aria-label", "Select language");
    for (const l of LANGS) {
      const o = document.createElement("option");
      o.value = l.code;
      o.textContent = l.label;
      if (l.code === current) o.selected = true;
      sel.appendChild(o);
    }
    sel.addEventListener("change", () => apply(sel.value));
    host.appendChild(sel);

    if (current !== "en") apply(current);
    else document.documentElement.lang = "en";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
