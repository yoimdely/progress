import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  HeartHandshake, Store, Bike, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp, Calendar, BusFront, Train
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Прогресс» — Симферополь, Евпаторийское ш., с. Белоглинка";

  const meta = [
    { name: "description", content: "ЖК «Прогресс» (Симферополь, Евпаторийское шоссе): квартал комфорт‑класса в с. Белоглинка. Предчистовая отделка, благоустроенные дворы без машин, детсад в проекте. Сроки: 1 очередь — IV кв. 2025 / I кв. 2026; весь проект — до II кв. 2029. ДДУ 214‑ФЗ, эскроу." },
    { property: "og:title", content: "ЖК «Прогресс» — новостройка в Симферополе (Белоглинка)" },
    { property: "og:description", content: "10 домов комфорт‑класса, планировки от студий до 3‑комн., паркинг, дворы без машин, рассрочка и ипотеки." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image-progress.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"; // городской рендер-заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#D6E4FF", backgroundColor: "#FFFFFF", color: "#0F2037" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #2563EB 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#3C5B88" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#D6E4FF", backgroundColor: "#F3F7FF", color: "#0F2037" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#F7FAFF", color: "#0F2037", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: мягкие волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #EAF2FF 0%, #F7FAFF 45%, #F7FAFF 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#D6E4FF" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#E1EAFF" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: сетка + просторные кнопки */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(247,250,255,0.9)", borderColor: "#D6E4FF" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-3">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0F2037", color: "#E1EAFF" }}>П</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Прогресс»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#3C5B88" }}>
                <MapPin size={12} className="inline mr-1" /> Симферополь, с. Белоглинка, Евпаторийское ш., район ул. В. Высоцкого
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О проекте", "Планировки", "Инженерия", "Транспорт", "Очереди", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#plans','#tech','#transport','#phases','#faq'][i]} className="hover:text-blue-700 whitespace-nowrap transition-colors" style={{ color: "#3C5B88" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#AFC6FF", color: "#0F2037" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#2563EB", color: "#F7FAFF" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#D6E4FF' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О проекте','#about'],['Планировки','#plans'],['Инженерия','#tech'],['Транспорт','#transport'],['Очереди','#phases'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-blue-50" style={{ color: '#3C5B88' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#AFC6FF', color: '#0F2037' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#2563EB', color: '#F7FAFF' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0F2037", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Прогресс» — квартал комфорт‑класса в Белоглинке
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#3C5B88", maxWidth: 640 }}>
              Современные дома рядом с Евпаторийским шоссе: дворы без машин, детские и спортивные зоны, коммерция на первых этажах. Продажи по ДДУ (214‑ФЗ) с эскроу.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["Комфорт‑класс", <ShieldCheck size={18} key="s" />],["10 домов", <Building2 size={18} key="b" />],["Предчистовая отделка", <Hammer size={18} key="h" />],["Парковка: гостевая и крытая", <ParkingSquare size={18} key="p" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#D6E4FF", color: "#0F2037" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#2563EB", color: "#F7FAFF" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#AFC6FF", color: "#0F2037" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#D6E4FF" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(214,228,255,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop" alt="Современный квартал в Симферополе" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="10" label="Домов" sub="территория ~2,1 Га" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="IV кв. 2025" label="1 очередь (1 этап)" sub="далее — I кв. 2026" icon={<Calendar size={18} />} /></div>
          <div className="h-full"><Stat value="до II кв. 2029" label="Полная готовность" sub="поэтапный ввод" icon={<Calendar size={18} />} /></div>
          <div className="h-full"><Stat value="Студии–3к" label="Форматы" sub="предчистовая отделка" icon={<Ruler size={18} />} /></div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#3C5B88' }}>
              «Прогресс» — квартал комфорт‑класса в Мирновском сельском поселении (с. Белоглинка) у Евпаторийского шоссе. Проектом предусмотрены дворы без машин, коммерческие помещения на первых этажах и благоустроенные общественные пространства. Форматы квартир — от студий до трёхкомнатных.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Сроки', t: '1 очередь — IV кв. 2025 (1 этап) и I кв. 2026 (2 этап); весь проект — до II кв. 2029.', icon: <Calendar size={18} /> },
                { h: 'Конструктив', t: 'Монолитно‑кирпичные дома, энергоэффективные решения, панорамное остекление.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой формат', t: 'ДДУ по 214‑ФЗ с расчётами через эскроу‑счета.', icon: <ShieldCheck size={18} /> },
                { h: 'Застройщик', t: 'Группа компаний «Владоград».', icon: <FileText size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#D6E4FF', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0F2037' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#3C5B88' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#E1EAFF', borderColor: '#D6E4FF' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0F2037' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#3C5B88' }}>
              <li><MapPin size={14} className="inline mr-2" /> Симферополь, с. Белоглинка, Мирновское с/п</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Дворы без машин, парковки на периметре и крытые решения</li>
              <li><Hammer size={14} className="inline mr-2" /> Отделка: предчистовая</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#2563EB', color: '#F7FAFF' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ИНЖЕНЕРИЯ */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#EAF2FF' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Инженерия и удобства</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3C5B88' }}>
              {[
                { t: 'Предчистовая отделка, готовность под ремонт', icon: <Hammer size={16} /> },
                { t: 'Видеонаблюдение и контроль доступа', icon: <ShieldCheck size={16} /> },
                { t: 'Озеленённые дворы с детскими и спортзонами', icon: <Trees size={16} /> },
                { t: 'Коммерция на первых этажах', icon: <Store size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D6E4FF' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0F2037' }}>
              <ShieldCheck size={18} /> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#3C5B88' }}>
              {["Современные планировки", "Двор без машин", "Развитие района", "Ипотеки и рассрочки"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F7FAFF', borderColor: '#D6E4FF' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировочные решения</h2>
          <p className="mt-3" style={{ color: '#3C5B88' }}>
            Студии, 1‑, 2‑ и 3‑комнатные квартиры. Пришлём PDF‑подборку с актуальными ценами, этажами и видами.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Рациональные форматы для старта/аренды", icon: <Home size={18} /> },
              { t: "1‑2‑комнатные", d: "Кухни‑гостиные, гардеробные, лоджии", icon: <Home size={18} /> },
              { t: "3‑комнатные", d: "Семейные сценарии, приватные спальни", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D6E4FF' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0F2037' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3C5B88' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#1D4ED8' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ТРАНСПОРТ (новый блок) */}
      <section id="transport" className="py-14 md:py-20" style={{ backgroundColor: '#EAF2FF' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><BusFront size={22} /> Транспорт и доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3C5B88' }}>
              {[
                'Выезд на Евпаторийское шоссе — пару минут на авто',
                'Остановки общественного транспорта — в шаговой доступности',
                'До центра Симферополя — ориентир 15–20 минут на машине',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><BusFront size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#D6E4FF' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D0%B8%D0%BC%D1%84%D0%B5%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%2C%20%D0%B5%D0%B2%D0%BF%D0%B0%D1%82%D0%BE%D1%80%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%20%D0%91%D0%B5%D0%BB%D0%BE%D0%B3%D0%BB%D0%B8%D0%BD%D0%BA%D0%B0&z=14" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ОЧЕРЕДИ И СРОКИ */}
      <section id="phases" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Очереди и сроки</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {[
              { t: "1 очередь — 1 этап", d: "IV кв. 2025", icon: <FileText size={18} /> },
              { t: "1 очередь — 2 этап", d: "I кв. 2026", icon: <FileText size={18} /> },
              { t: "Следующие позиции", d: "до II кв. 2029 (поэтапно)", icon: <FileText size={18} /> },
              { t: "Формат сделки", d: "ДДУ по 214‑ФЗ, эскроу‑счета", icon: <ShieldCheck size={18} /> },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D6E4FF' }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#0F2037' }}>{s.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3C5B88' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#EAF2FF' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен комплекс?", a: "Республика Крым, Симферополь, Мирновское с/п, с. Белоглинка, рядом с Евпаторийским шоссе." },
              { q: "Какие форматы квартир?", a: "Студии, 1‑, 2‑ и 3‑комнатные — в предчистовой отделке." },
              { q: "Есть ли паркинг?", a: "Да: гостевые места и крытые решения (в т.ч. многоуровневые/подземные по корпусам)." },
              { q: "Какой формат сделки?", a: "ДДУ по 214‑ФЗ, расчёты на эскроу‑счётах." },
              { q: "Когда сдача?", a: "1 очередь — IV кв. 2025 / I кв. 2026; весь проект — до II кв. 2029." },
              { q: "Есть ли рассрочка?", a: "Да, у застройщика доступны рассрочки — условия уточняйте в отделе продаж." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#D6E4FF' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0F2037' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#3C5B88' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, Симферополь, Мирновское с/п, с. Белоглинка, рядом с Евпаторийским шоссе." } },
            { "@type": "Question", "name": "Какие форматы квартир?", "acceptedAnswer": { "@type": "Answer", "text": "Студии, 1‑, 2‑ и 3‑комнатные — в предчистовой отделке." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Гостевые и крытые решения (в т.ч. многоуровневые/подземные по корпусам)." } },
            { "@type": "Question", "name": "Какой формат сделки?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ по 214‑ФЗ и эскроу‑счета." } },
            { "@type": "Question", "name": "Когда сдача?", "acceptedAnswer": { "@type": "Answer", "text": "1 очередь — IV кв. 2025 / I кв. 2026; весь проект — до II кв. 2029." } },
            { "@type": "Question", "name": "Есть ли рассрочка?", "acceptedAnswer": { "@type": "Answer", "text": "Да, рассрочки от застройщика." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#3C5B88' }}>
              Пришлём PDF с планировками, этажами и видами, действующие цены, информацию об очередях и условиях ипотеки/рассрочки.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#AFC6FF', color: '#0F2037' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D6E4FF' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0F2037' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#3C5B88' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0F2037' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#3C5B88' }}>
                  Оставьте контакты — вышлем актуальные предложения по ЖК «Прогресс».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D6E4FF' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D6E4FF' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D6E4FF' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D6E4FF' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#2563EB', color: '#F7FAFF' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#5B76A6' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#5B76A6' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#D6E4FF' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#3C5B88' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0F2037' }}>
              <Home size={16} /> ЖК «Прогресс»
            </div>
            <p className="mt-2">Республика Крым, Симферополь, Евпаторийское ш., с. Белоглинка</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Девелопер: ГК «Владоград».</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК «Прогресс»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Евпаторийское ш., с. Белоглинка",
          "addressLocality": "Симферополь",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#2563EB", color: "#F7FAFF", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
