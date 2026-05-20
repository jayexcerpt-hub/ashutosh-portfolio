// "use client";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useAdmin } from "./AdminContext";
// import ImageUploader from "./ImageUploader";
// import {
//   FiMapPin,
//   FiMail,
//   FiPhone,
//   FiLinkedin,
//   FiExternalLink,
//   FiEdit2,
//   FiTrash2,
//   FiPlus,
//   FiX,
//   FiCheck,
//   FiChevronDown,
//   FiGlobe,
//   FiBook,
//   FiAward,
//   FiCamera,
//   FiSave,
//   FiRefreshCw,
// } from "react-icons/fi";
// import {
//   HiOutlineAcademicCap,
//   HiOutlineBeaker,
//   HiOutlineLightBulb,
//   HiOutlineGlobeAlt,
//   HiOutlineDocumentText,
//   HiOutlineStar,
// } from "react-icons/hi2";
// import { BsTwitterX } from "react-icons/bs";
// import { GiBugNet, GiForestCamp } from "react-icons/gi";
// import { MdOutlineEco, MdScience } from "react-icons/md";
// import { FaResearchgate } from "react-icons/fa";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface CareerCard {
//   _id?: string;
//   id: string;
//   image: string;
//   org: string;
//   role: string;
//   date: string;
//   type: "work" | "research";
//   bullets: string[];
// }

// interface ProjectCard {
//   _id?: string;
//   id: string;
//   image: string;
//   tag: string;
//   title: string;
//   description: string;
// }

// interface Publication {
//   _id?: string;
//   id: string;
//   title: string;
//   authors: string;
//   journal: string;
// }

// interface Conference {
//   _id?: string;
//   id: string;
//   image: string;
//   icon: string;
//   title: string;
//   description: string;
//   badge: string;
// }

// interface Skill {
//   id: string;
//   label: string;
//   level: string;
//   width: number;
// }

// interface PortfolioData {
//   _id?: string;
//   hero: {
//     tag: string;
//     name: string;
//     title: string;
//     description: string;
//     bgImage: string;
//   };
//   stats: Array<{ count: number; label: string }>;
//   marqueeItems: string[];
//   about: {
//     image: string;
//     badgeText: string;
//     title: string;
//     paragraph1: string;
//     paragraph2: string;
//     tags: string[];
//   };
//   careerCards: CareerCard[];
//   projects: ProjectCard[];
//   publications: Publication[];
//   conferences: Conference[];
//   skills: Skill[];
//   skillsImage: string;
//   contact: {
//     description: string;
//     location: string;
//     email: string;
//     phone: string;
//     linkedin: string;
//     researchgate: string;
//   };
//   footer: { copy: string; tagline: string };
// }

// const genId = () => Math.random().toString(36).slice(2, 9);

// const DEFAULT_DATA: PortfolioData = {
//   hero: {
//     tag: "🪲 Wildlife Researcher & Conservation Biologist",
//     name: "Ashutosh Dey",
//     title: "Project Biologist · Firefly Ecology · Biodiversity Conservation",
//     description:
//       "Bridging the gap between ecological science and community action — studying fireflies, documenting biodiversity, and working at the frontier of human-wildlife harmony.",
//     bgImage:
//       "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1600&q=80",
//   },
//   stats: [
//     { count: 5, label: "Publications" },
//     { count: 3, label: "Int'l Events" },
//     { count: 4, label: "Research Projects" },
//     { count: 2, label: "Years Field Research" },
//   ],
//   marqueeItems: [
//     "Firefly Ecology",
//     "Wildlife Conservation",
//     "Biodiversity Research",
//     "Nocturnal Surveys",
//     "Human-Wildlife Conflict",
//     "Community Science",
//     "IUCN SSC",
//     "Odisha · Karnataka · Kerala",
//   ],
//   about: {
//     image:
//       "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
//     badgeText: "M.Sc. Wildlife Biodiversity & Conservation",
//     title: "A Naturalist at heart, a Scientist by training",
//     paragraph1:
//       "I completed my M.Sc. in Wildlife Biodiversity & Conservation from North Orissa University, Odisha. Over the years I have actively worked on biodiversity assessment, ecological surveys, firefly research, and conservation-based field projects across India's remarkable forest landscapes.",
//     paragraph2:
//       "Currently working as a Project Biologist in a Human-Wildlife Conflict CSR Project, contributing to ecological monitoring, field surveys, conservation awareness, and wildlife research — combining rigorous science with community participation for long-term biodiversity conservation.",
//     tags: [
//       "Firefly Ecology",
//       "Human-Wildlife Conflict",
//       "Biodiversity Monitoring",
//       "Nocturnal Surveys",
//       "GIS Mapping",
//       "Community Conservation",
//       "Ecological Documentation",
//     ],
//   },
//   careerCards: [
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
//       org: "CSR Conservation Project · Present",
//       role: "Project Biologist",
//       date: "Human-Wildlife Conflict Division",
//       type: "work",
//       bullets: [
//         "Human-wildlife conflict mitigation activities",
//         "Biodiversity monitoring and ecological surveys",
//         "Community awareness and conservation outreach",
//         "GPS-based field navigation and wildlife data collection",
//         "Coordination with local stakeholders and forest officials",
//       ],
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=800&q=80",
//       org: "EMPRI, Bangalore · Nov 2022 – Mar 2024",
//       role: "Field Cum-Lab Assistant",
//       date: "Firefly Identification & Bioecology, Karnataka",
//       type: "research",
//       bullets: [
//         "Nocturnal field surveys for firefly monitoring",
//         "Firefly behavioral observations and species documentation",
//         "Habitat assessment and biodiversity recording",
//         "Scientific documentation and research coordination",
//         "Firefly rearing",
//       ],
//     },
//   ],
//   projects: [
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
//       tag: "Conflict Study · Odisha",
//       title: "Human-Elephant Conflict Assessment",
//       description:
//         "Case study in Rairangpur Forest Division focusing on conflict assessment, community interactions, and evidence-based mitigation approaches.",
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
//       tag: "Entomology · Odisha",
//       title: "Lepidoptera & Odonata Biodiversity",
//       description:
//         "Field-based assessment in Badampahar Forest Range documenting species diversity, ecological significance and conservation status.",
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
//       tag: "Community Science · Baripada",
//       title: "People's Biodiversity Register (PBR)",
//       description:
//         "Biodiversity documentation initiative under Baripada Forest Division integrating traditional ecological knowledge with scientific surveys.",
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&q=80",
//       tag: "Ethnobotany · Deuli Forest",
//       title: "Medicinal Plant Documentation",
//       description:
//         "Research on medicinal plant diversity in Deuli Forest Range, cataloguing ethnobotanical uses and conservation priorities.",
//     },
//   ],
//   publications: [
//     {
//       id: genId(),
//       title:
//         "Companions of the 'fun-loving' fireflies in the wild: friends or foes?",
//       authors: "Chakravarthy A.K., Parvez, Ashutosh Dey & Amlan Das (2023)",
//       journal: "Indian Entomologist",
//     },
//     {
//       id: genId(),
//       title:
//         "Assessment and Status of Lepidoptera and Odonata of Rairangpur Forest Division, Odisha, India",
//       authors: "Parvez et al. (2023)",
//       journal: "Biodiversity Research Publication",
//     },
//     {
//       id: genId(),
//       title: "Sacred Groves of Badampahar Forest Range, Odisha",
//       authors: "Barik et al. (2023)",
//       journal: "Ecology & Conservation Studies",
//     },
//     {
//       id: genId(),
//       title: "Ethnobotany in Deuli Forest Range, Odisha",
//       authors: "Khan et al. (2021)",
//       journal: "Journal of Ethnobotanical Research",
//     },
//     {
//       id: genId(),
//       title: "Aquatic Fauna of Suleipat Dam, Odisha",
//       authors: "Dey et al. (2021)",
//       journal: "Freshwater Biodiversity Documentation",
//     },
//   ],
//   conferences: [
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
//       icon: "🌍",
//       title: "International Firefly Conclave",
//       description:
//         "Organized a landmark international conclave at Kannur University, Kerala, bringing together global firefly researchers, ecologists, and conservationists.",
//       badge: "Organizer · Kannur University, Kerala",
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
//       icon: "🔬",
//       title: "IFTW 2024 — International Firefly Taxonomy Workshop",
//       description:
//         "Organized a hybrid international workshop in association with IUCN SSC, Monash University, and the Firefly Asian Association.",
//       badge: "Organizer · IUCN SSC Collaboration · 2024",
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80",
//       icon: "💡",
//       title: "World Firefly Day Webinar 2023",
//       description:
//         "Coordinated an international webinar focused on firefly monitoring, conservation strategies, and community-based ecotourism opportunities.",
//       badge: "Coordinator · International Webinar · 2023",
//     },
//   ],
//   skills: [
//     {
//       id: genId(),
//       label: "Wildlife Field Survey Techniques",
//       level: "Expert",
//       width: 92,
//     },
//     {
//       id: genId(),
//       label: "Nocturnal Biodiversity Surveys",
//       level: "Expert",
//       width: 90,
//     },
//     {
//       id: genId(),
//       label: "GPS Handling & Field Navigation",
//       level: "Advanced",
//       width: 88,
//     },
//     {
//       id: genId(),
//       label: "Ecological Monitoring & Documentation",
//       level: "Advanced",
//       width: 85,
//     },
//     {
//       id: genId(),
//       label: "Scientific Reporting",
//       level: "Advanced",
//       width: 82,
//     },
//     {
//       id: genId(),
//       label: "QGIS & Ecological Mapping",
//       level: "Intermediate",
//       width: 60,
//     },
//     { id: genId(), label: "Adobe Photoshop", level: "Intermediate", width: 58 },
//   ],
//   skillsImage:
//     "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
//   contact: {
//     description:
//       "Open to research collaborations, fieldwork opportunities, conservation projects, and speaking engagements related to firefly ecology and biodiversity conservation.",
//     location: "Balasore, Odisha, India",
//     email: "ashutoshday90@gmail.com",
//     phone: "+91 6372970772",
//     linkedin: "https://www.linkedin.com/in/ashutosh-dey-1b4a0b1ab",
//     researchgate: "https://www.researchgate.net/profile/Ashutosh-Dey",
//   },
//   footer: {
//     copy: "© 2025 Ashutosh Dey · Wildlife Researcher",
//     tagline: "🪲 Illuminating biodiversity, one firefly at a time",
//   },
// };

// // ─── EditableText ─────────────────────────────────────────────────────────────
// function EditText({
//   value,
//   onChange,
//   isAdmin,
//   tag = "span",
//   className = "",
//   multiline = false,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   isAdmin: boolean;
//   tag?: "span" | "p" | "h1" | "h2" | "h3" | "div";
//   className?: string;
//   multiline?: boolean;
// }) {
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState(value);
//   const Tag = tag as React.ElementType;
//   useEffect(() => {
//     setDraft(value);
//   }, [value]);
//   const save = () => {
//     onChange(draft);
//     setEditing(false);
//   };
//   const cancel = () => {
//     setDraft(value);
//     setEditing(false);
//   };
//   if (!isAdmin) return <Tag className={className}>{value}</Tag>;
//   if (editing)
//     return (
//       <span className="inline-flex flex-col gap-1">
//         {multiline ? (
//           <textarea
//             autoFocus
//             value={draft}
//             onChange={(e) => setDraft(e.target.value)}
//             rows={4}
//             className="w-full min-w-[260px] p-2 text-sm rounded-lg resize-none border border-[#52b788] bg-[#0a1f14] text-[#fefae0] outline-none font-mono"
//           />
//         ) : (
//           <input
//             autoFocus
//             value={draft}
//             onChange={(e) => setDraft(e.target.value)}
//             className="p-2 text-sm rounded-lg border border-[#52b788] bg-[#0a1f14] text-[#fefae0] outline-none font-mono min-w-[200px]"
//           />
//         )}
//         <span className="flex gap-1">
//           <button
//             onClick={save}
//             className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#d4ff7d] text-[#081c15] font-semibold"
//           >
//             <FiCheck size={10} />
//             Save
//           </button>
//           <button
//             onClick={cancel}
//             className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-[rgba(82,183,136,0.15)] text-[#52b788] border border-[rgba(82,183,136,0.3)]"
//           >
//             <FiX size={10} />
//             Cancel
//           </button>
//         </span>
//       </span>
//     );
//   return (
//     <Tag
//       className={`${className} cursor-pointer group/et relative`}
//       onClick={() => setEditing(true)}
//       title="Click to edit"
//     >
//       {value}
//       <FiEdit2
//         size={10}
//         className="inline ml-1 opacity-0 group-hover/et:opacity-70 text-[#d4ff7d] transition-opacity"
//       />
//     </Tag>
//   );
// }

// // ─── Modal ────────────────────────────────────────────────────────────────────
// function Modal({
//   title,
//   onClose,
//   children,
// }: {
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
//       style={{ background: "rgba(4,14,8,0.9)", backdropFilter: "blur(16px)" }}
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div
//         className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
//         style={{
//           background: "linear-gradient(145deg,#0d2818,#081c15)",
//           border: "1px solid rgba(82,183,136,0.25)",
//           boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
//         }}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-[rgba(82,183,136,0.12)]">
//           <h3
//             className="font-semibold text-[#fefae0] text-lg"
//             style={{ fontFamily: "Syne,sans-serif" }}
//           >
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-full text-[#52b788] hover:bg-[rgba(82,183,136,0.15)] transition-colors"
//           >
//             <FiX />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }

// // ─── FormField ────────────────────────────────────────────────────────────────
// function FormField({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="text-[0.65rem] tracking-widest uppercase font-mono text-[#52b788]">
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

// function Input({
//   value,
//   onChange,
//   placeholder,
//   type = "text",
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   type?: string;
// }) {
//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full px-4 py-3 rounded-xl text-sm font-mono bg-[rgba(8,28,21,0.8)] border border-[rgba(82,183,136,0.2)] text-[#fefae0] outline-none transition-all focus:border-[rgba(82,183,136,0.6)] placeholder-[rgba(254,250,224,0.25)]"
//     />
//   );
// }

// function Textarea({
//   value,
//   onChange,
//   placeholder,
//   rows = 3,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   rows?: number;
// }) {
//   return (
//     <textarea
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       rows={rows}
//       className="w-full px-4 py-3 rounded-xl text-sm font-mono bg-[rgba(8,28,21,0.8)] border border-[rgba(82,183,136,0.2)] text-[#fefae0] outline-none transition-all focus:border-[rgba(82,183,136,0.6)] placeholder-[rgba(254,250,224,0.25)] resize-none"
//     />
//   );
// }

// // ─── Admin Action Bar ──────────────────────────────────────────────────────────
// function AdminBar({ onAdd, label }: { onAdd: () => void; label: string }) {
//   return (
//     <div className="flex justify-end mb-6">
//       <button
//         onClick={onAdd}
//         className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,255,125,0.25)]"
//         style={{
//           background: "rgba(212,255,125,0.12)",
//           border: "1px solid rgba(212,255,125,0.35)",
//           color: "#d4ff7d",
//         }}
//       >
//         <FiPlus size={14} />
//         {label}
//       </button>
//     </div>
//   );
// }

// // ─── Card Action Buttons ───────────────────────────────────────────────────────
// function CardActions({
//   onEdit,
//   onDelete,
// }: {
//   onEdit: () => void;
//   onDelete: () => void;
// }) {
//   return (
//     <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-10">
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onEdit();
//         }}
//         className="w-8 h-8 flex items-center justify-center rounded-lg bg-[rgba(212,255,125,0.15)] border border-[rgba(212,255,125,0.3)] text-[#d4ff7d] hover:bg-[rgba(212,255,125,0.25)] transition-colors backdrop-blur-sm"
//       >
//         <FiEdit2 size={12} />
//       </button>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onDelete();
//         }}
//         className="w-8 h-8 flex items-center justify-center rounded-lg bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-red-400 hover:bg-[rgba(239,68,68,0.25)] transition-colors backdrop-blur-sm"
//       >
//         <FiTrash2 size={12} />
//       </button>
//     </div>
//   );
// }

// // ─── Section Title ─────────────────────────────────────────────────────────────
// function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
//   return (
//     <div className="mb-14 text-center">
//       <p className="text-[0.65rem] tracking-[0.3em] uppercase font-mono text-[#52b788] mb-3">
//         {eyebrow}
//       </p>
//       <h2
//         className="text-4xl md:text-5xl font-light text-[#fefae0] leading-tight"
//         style={{ fontFamily: "Cormorant Garamond,serif" }}
//       >
//         {title}
//       </h2>
//       <div
//         className="mt-4 mx-auto w-16 h-px"
//         style={{
//           background:
//             "linear-gradient(to right,transparent,#52b788,transparent)",
//         }}
//       />
//     </div>
//   );
// }

// // ─── MAIN PORTFOLIO ────────────────────────────────────────────────────────────
// export default function Portfolio() {
//   const { isAdmin } = useAdmin();
//   const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [saveMsg, setSaveMsg] = useState("");
//   const [activeFilter, setActiveFilter] = useState<"all" | "work" | "research">(
//     "all",
//   );

//   // Modal states
//   const [careerModal, setCareerModal] = useState<{
//     open: boolean;
//     item: CareerCard | null;
//   }>({ open: false, item: null });
//   const [projectModal, setProjectModal] = useState<{
//     open: boolean;
//     item: ProjectCard | null;
//   }>({ open: false, item: null });
//   const [pubModal, setPubModal] = useState<{
//     open: boolean;
//     item: Publication | null;
//   }>({ open: false, item: null });
//   const [confModal, setConfModal] = useState<{
//     open: boolean;
//     item: Conference | null;
//   }>({ open: false, item: null });
//   const [skillModal, setSkillModal] = useState<{
//     open: boolean;
//     item: Skill | null;
//   }>({ open: false, item: null });
//   const [viewModal, setViewModal] = useState<{
//     open: boolean;
//     item: CareerCard | ProjectCard | null;
//     type: string;
//   }>({ open: false, item: null, type: "" });

//   const marqueeRef = useRef<HTMLDivElement>(null);

//   // Load data
//   useEffect(() => {
//     fetch("/api/portfolio")
//       .then((r) => r.json())
//       .then((d) => {
//         if (d && !d.error) {
//           // Ensure ids exist on array items
//           const ensureIds = (arr: Record<string, unknown>[]) =>
//             (arr || []).map((i) => ({ ...i, id: (i.id as string) || genId() }));
//           setData({
//             ...DEFAULT_DATA,
//             ...d,
//             careerCards: ensureIds(d.careerCards || d.experience || []),
//             projects: ensureIds(d.projects || []),
//             publications: ensureIds(d.publications || []),
//             conferences: ensureIds(d.conferences || []),
//             skills: ensureIds(d.skills || []),
//           });
//         }
//       })
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   // Save
//   const save = useCallback(async (newData: PortfolioData) => {
//     setSaving(true);
//     try {
//       await fetch("/api/portfolio", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newData),
//       });
//       setSaveMsg("Saved!");
//       setTimeout(() => setSaveMsg(""), 2000);
//     } catch {
//       setSaveMsg("Error saving");
//     } finally {
//       setSaving(false);
//     }
//   }, []);

//   const update = useCallback(
//     (newData: PortfolioData) => {
//       setData(newData);
//       if (isAdmin) save(newData);
//     },
//     [isAdmin, save],
//   );

//   // Marquee animation
//   useEffect(() => {
//     const el = marqueeRef.current;
//     if (!el) return;
//     let x = 0;
//     const speed = 0.5;
//     const half = el.scrollWidth / 2;
//     const tick = () => {
//       x -= speed;
//       if (Math.abs(x) >= half) x = 0;
//       el.style.transform = `translateX(${x}px)`;
//       requestAnimationFrame(tick);
//     };
//     const id = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(id);
//   }, []);

//   if (loading)
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center"
//         style={{ background: "#081c15" }}
//       >
//         <div className="text-center">
//           <div className="text-5xl mb-4 animate-bounce">🪲</div>
//           <p className="text-[#52b788] text-sm font-mono tracking-widest animate-pulse">
//             Loading portfolio…
//           </p>
//         </div>
//       </div>
//     );

//   const filteredCareer = data.careerCards.filter(
//     (c) => activeFilter === "all" || c.type === activeFilter,
//   );

//   // ─── CAREER FORM ────────────────────────────────────────────────────────────
//   function CareerForm({
//     item,
//     onSave,
//     onClose,
//   }: {
//     item: CareerCard | null;
//     onSave: (c: CareerCard) => void;
//     onClose: () => void;
//   }) {
//     const blank: CareerCard = {
//       id: genId(),
//       image: "",
//       org: "",
//       role: "",
//       date: "",
//       type: "work",
//       bullets: [""],
//     };
//     const [form, setForm] = useState<CareerCard>(item || blank);
//     const setBullet = (i: number, v: string) =>
//       setForm((f) => {
//         const b = [...f.bullets];
//         b[i] = v;
//         return { ...f, bullets: b };
//       });
//     const addBullet = () =>
//       setForm((f) => ({ ...f, bullets: [...f.bullets, ""] }));
//     const removeBullet = (i: number) =>
//       setForm((f) => ({ ...f, bullets: f.bullets.filter((_, j) => j !== i) }));
//     return (
//       <div className="space-y-5">
//         <FormField label="Type">
//           <div className="flex gap-3">
//             {(["work", "research"] as const).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setForm((f) => ({ ...f, type: t }))}
//                 className={`flex-1 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all border ${form.type === t ? "bg-[rgba(212,255,125,0.15)] border-[rgba(212,255,125,0.5)] text-[#d4ff7d]" : "border-[rgba(82,183,136,0.2)] text-[#52b788]"}`}
//               >
//                 {t === "work" ? "💼 Work" : "🔬 Research"}
//               </button>
//             ))}
//           </div>
//         </FormField>
//         <FormField label="Image URL">
//           <Input
//             value={form.image}
//             onChange={(v) => setForm((f) => ({ ...f, image: v }))}
//             placeholder="https://…"
//           />
//         </FormField>
//         <FormField label="Organisation">
//           <Input
//             value={form.org}
//             onChange={(v) => setForm((f) => ({ ...f, org: v }))}
//           />
//         </FormField>
//         <FormField label="Role / Title">
//           <Input
//             value={form.role}
//             onChange={(v) => setForm((f) => ({ ...f, role: v }))}
//           />
//         </FormField>
//         <FormField label="Date / Division">
//           <Input
//             value={form.date}
//             onChange={(v) => setForm((f) => ({ ...f, date: v }))}
//           />
//         </FormField>
//         <FormField label="Bullet Points">
//           <div className="space-y-2">
//             {form.bullets.map((b, i) => (
//               <div key={i} className="flex gap-2">
//                 <Input
//                   value={b}
//                   onChange={(v) => setBullet(i, v)}
//                   placeholder={`Point ${i + 1}`}
//                 />
//                 <button
//                   onClick={() => removeBullet(i)}
//                   className="w-10 flex-shrink-0 flex items-center justify-center rounded-xl border border-[rgba(239,68,68,0.3)] text-red-400 hover:bg-[rgba(239,68,68,0.1)] transition-colors"
//                 >
//                   <FiTrash2 size={13} />
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={addBullet}
//               className="w-full py-2 rounded-xl border border-dashed border-[rgba(82,183,136,0.3)] text-[#52b788] text-xs font-mono hover:border-[rgba(82,183,136,0.6)] transition-colors flex items-center justify-center gap-2"
//             >
//               <FiPlus size={12} />
//               Add bullet
//             </button>
//           </div>
//         </FormField>
//         <div className="flex gap-3 pt-2">
//           <button
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-semibold tracking-wide bg-[#d4ff7d] text-[#081c15] hover:shadow-[0_8px_30px_rgba(212,255,125,0.3)] transition-all"
//           >
//             <FiSave className="inline mr-2" />
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm font-mono border border-[rgba(82,183,136,0.25)] text-[#52b788] hover:bg-[rgba(82,183,136,0.1)] transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ─── PROJECT FORM ───────────────────────────────────────────────────────────
//   function ProjectForm({
//     item,
//     onSave,
//     onClose,
//   }: {
//     item: ProjectCard | null;
//     onSave: (p: ProjectCard) => void;
//     onClose: () => void;
//   }) {
//     const [form, setForm] = useState<ProjectCard>(
//       item || { id: genId(), image: "", tag: "", title: "", description: "" },
//     );
//     return (
//       <div className="space-y-5">
//         <FormField label="Image URL">
//           <Input
//             value={form.image}
//             onChange={(v) => setForm((f) => ({ ...f, image: v }))}
//             placeholder="https://…"
//           />
//         </FormField>
//         <FormField label="Tag / Category">
//           <Input
//             value={form.tag}
//             onChange={(v) => setForm((f) => ({ ...f, tag: v }))}
//             placeholder="Ecology · Region"
//           />
//         </FormField>
//         <FormField label="Title">
//           <Input
//             value={form.title}
//             onChange={(v) => setForm((f) => ({ ...f, title: v }))}
//           />
//         </FormField>
//         <FormField label="Description">
//           <Textarea
//             value={form.description}
//             onChange={(v) => setForm((f) => ({ ...f, description: v }))}
//             rows={4}
//           />
//         </FormField>
//         <div className="flex gap-3 pt-2">
//           <button
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-semibold tracking-wide bg-[#d4ff7d] text-[#081c15] hover:shadow-[0_8px_30px_rgba(212,255,125,0.3)] transition-all"
//           >
//             <FiSave className="inline mr-2" />
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm font-mono border border-[rgba(82,183,136,0.25)] text-[#52b788] hover:bg-[rgba(82,183,136,0.1)] transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ─── PUBLICATION FORM ───────────────────────────────────────────────────────
//   function PubForm({
//     item,
//     onSave,
//     onClose,
//   }: {
//     item: Publication | null;
//     onSave: (p: Publication) => void;
//     onClose: () => void;
//   }) {
//     const [form, setForm] = useState<Publication>(
//       item || { id: genId(), title: "", authors: "", journal: "" },
//     );
//     return (
//       <div className="space-y-5">
//         <FormField label="Title">
//           <Textarea
//             value={form.title}
//             onChange={(v) => setForm((f) => ({ ...f, title: v }))}
//             rows={3}
//           />
//         </FormField>
//         <FormField label="Authors">
//           <Input
//             value={form.authors}
//             onChange={(v) => setForm((f) => ({ ...f, authors: v }))}
//             placeholder="Author et al. (Year)"
//           />
//         </FormField>
//         <FormField label="Journal">
//           <Input
//             value={form.journal}
//             onChange={(v) => setForm((f) => ({ ...f, journal: v }))}
//           />
//         </FormField>
//         <div className="flex gap-3 pt-2">
//           <button
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-semibold tracking-wide bg-[#d4ff7d] text-[#081c15] hover:shadow-[0_8px_30px_rgba(212,255,125,0.3)] transition-all"
//           >
//             <FiSave className="inline mr-2" />
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm font-mono border border-[rgba(82,183,136,0.25)] text-[#52b788] hover:bg-[rgba(82,183,136,0.1)] transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ─── CONFERENCE FORM ────────────────────────────────────────────────────────
//   function ConfForm({
//     item,
//     onSave,
//     onClose,
//   }: {
//     item: Conference | null;
//     onSave: (c: Conference) => void;
//     onClose: () => void;
//   }) {
//     const [form, setForm] = useState<Conference>(
//       item || {
//         id: genId(),
//         image: "",
//         icon: "🌍",
//         title: "",
//         description: "",
//         badge: "",
//       },
//     );
//     return (
//       <div className="space-y-5">
//         <FormField label="Image URL">
//           <Input
//             value={form.image}
//             onChange={(v) => setForm((f) => ({ ...f, image: v }))}
//             placeholder="https://…"
//           />
//         </FormField>
//         <FormField label="Icon Emoji">
//           <Input
//             value={form.icon}
//             onChange={(v) => setForm((f) => ({ ...f, icon: v }))}
//             placeholder="🌍"
//           />
//         </FormField>
//         <FormField label="Title">
//           <Input
//             value={form.title}
//             onChange={(v) => setForm((f) => ({ ...f, title: v }))}
//           />
//         </FormField>
//         <FormField label="Description">
//           <Textarea
//             value={form.description}
//             onChange={(v) => setForm((f) => ({ ...f, description: v }))}
//             rows={4}
//           />
//         </FormField>
//         <FormField label="Badge">
//           <Input
//             value={form.badge}
//             onChange={(v) => setForm((f) => ({ ...f, badge: v }))}
//             placeholder="Role · Organisation · Year"
//           />
//         </FormField>
//         <div className="flex gap-3 pt-2">
//           <button
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-semibold tracking-wide bg-[#d4ff7d] text-[#081c15] hover:shadow-[0_8px_30px_rgba(212,255,125,0.3)] transition-all"
//           >
//             <FiSave className="inline mr-2" />
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm font-mono border border-[rgba(82,183,136,0.25)] text-[#52b788] hover:bg-[rgba(82,183,136,0.1)] transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ─── SKILL FORM ─────────────────────────────────────────────────────────────
//   function SkillForm({
//     item,
//     onSave,
//     onClose,
//   }: {
//     item: Skill | null;
//     onSave: (s: Skill) => void;
//     onClose: () => void;
//   }) {
//     const [form, setForm] = useState<Skill>(
//       item || { id: genId(), label: "", level: "Intermediate", width: 70 },
//     );
//     return (
//       <div className="space-y-5">
//         <FormField label="Skill Name">
//           <Input
//             value={form.label}
//             onChange={(v) => setForm((f) => ({ ...f, label: v }))}
//           />
//         </FormField>
//         <FormField label="Level">
//           <div className="flex gap-2 flex-wrap">
//             {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
//               <button
//                 key={l}
//                 onClick={() => setForm((f) => ({ ...f, level: l }))}
//                 className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all border ${form.level === l ? "bg-[rgba(212,255,125,0.15)] border-[rgba(212,255,125,0.5)] text-[#d4ff7d]" : "border-[rgba(82,183,136,0.2)] text-[#52b788]"}`}
//               >
//                 {l}
//               </button>
//             ))}
//           </div>
//         </FormField>
//         <FormField label={`Proficiency: ${form.width}%`}>
//           <input
//             type="range"
//             min={10}
//             max={100}
//             value={form.width}
//             onChange={(e) => setForm((f) => ({ ...f, width: +e.target.value }))}
//             className="w-full accent-[#d4ff7d]"
//           />
//         </FormField>
//         <div className="flex gap-3 pt-2">
//           <button
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-semibold tracking-wide bg-[#d4ff7d] text-[#081c15] hover:shadow-[0_8px_30px_rgba(212,255,125,0.3)] transition-all"
//           >
//             <FiSave className="inline mr-2" />
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm font-mono border border-[rgba(82,183,136,0.25)] text-[#52b788] hover:bg-[rgba(82,183,136,0.1)] transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen"
//       style={{
//         background: "#081c15",
//         color: "#fefae0",
//         fontFamily: "DM Mono,monospace",
//       }}
//     >
//       {/* ── Save indicator ─────────────────────────────────────────────────── */}
//       {isAdmin && (saving || saveMsg) && (
//         <div
//           className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono"
//           style={{
//             background: saving
//               ? "rgba(82,183,136,0.15)"
//               : "rgba(212,255,125,0.15)",
//             border: `1px solid ${saving ? "rgba(82,183,136,0.3)" : "rgba(212,255,125,0.3)"}`,
//             color: saving ? "#52b788" : "#d4ff7d",
//           }}
//         >
//           {saving ? (
//             <>
//               <FiRefreshCw size={12} className="animate-spin" /> Saving…
//             </>
//           ) : (
//             <>
//               <FiCheck size={12} /> {saveMsg}
//             </>
//           )}
//         </div>
//       )}

//       {/* ═══════════════════════════════════════════════════════════════════════
//           HERO SECTION
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section
//         id="hero"
//         className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
//       >
//         {/* BG Image */}
//         <div className="absolute inset-0">
//           {isAdmin ? (
//             <ImageUploader
//               currentUrl={data.hero.bgImage}
//               onUpload={(url) =>
//                 update({ ...data, hero: { ...data.hero, bgImage: url } })
//               }
//               className="w-full h-full"
//             />
//           ) : (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               src={data.hero.bgImage}
//               alt="Hero background"
//               className="w-full h-full object-cover"
//             />
//           )}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(to bottom,rgba(8,28,21,0.5) 0%,rgba(8,28,21,0.3) 40%,rgba(8,28,21,0.85) 80%,#081c15 100%)",
//             }}
//           />
//         </div>

//         {/* Firefly particles */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: Math.random() * 3 + 1 + "px",
//                 height: Math.random() * 3 + 1 + "px",
//                 left: Math.random() * 100 + "%",
//                 top: Math.random() * 100 + "%",
//                 background: "#d4ff7d",
//                 boxShadow: "0 0 8px 3px rgba(212,255,125,0.5)",
//                 animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
//           <div
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[0.65rem] tracking-widest uppercase font-mono"
//             style={{
//               background: "rgba(82,183,136,0.1)",
//               border: "1px solid rgba(82,183,136,0.25)",
//               color: "#52b788",
//             }}
//           >
//             <EditText
//               value={data.hero.tag}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, tag: v } })
//               }
//               isAdmin={isAdmin}
//             />
//           </div>

//           <h1
//             className="text-6xl md:text-8xl font-light mb-6 leading-none"
//             style={{ fontFamily: "Cormorant Garamond,serif" }}
//           >
//             <EditText
//               value={data.hero.name}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, name: v } })
//               }
//               isAdmin={isAdmin}
//               tag="span"
//             />
//           </h1>

//           <p
//             className="text-sm tracking-[0.25em] uppercase font-mono mb-8"
//             style={{ color: "#52b788" }}
//           >
//             <EditText
//               value={data.hero.title}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, title: v } })
//               }
//               isAdmin={isAdmin}
//             />
//           </p>

//           <p
//             className="text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
//             style={{
//               color: "rgba(254,250,224,0.75)",
//               fontFamily: "Cormorant Garamond,serif",
//             }}
//           >
//             <EditText
//               value={data.hero.description}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, description: v } })
//               }
//               isAdmin={isAdmin}
//               multiline
//             />
//           </p>

//           <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
//             <a
//               href="#about"
//               className="px-8 py-3.5 rounded-xl text-sm font-mono font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(212,255,125,0.3)]"
//               style={{ background: "#d4ff7d", color: "#081c15" }}
//             >
//               Explore Work
//             </a>
//             <a
//               href="#contact"
//               className="px-8 py-3.5 rounded-xl text-sm font-mono tracking-wide transition-all hover:-translate-y-0.5"
//               style={{
//                 background: "rgba(82,183,136,0.1)",
//                 border: "1px solid rgba(82,183,136,0.3)",
//                 color: "#b7e4c7",
//               }}
//             >
//               Get in Touch
//             </a>
//           </div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//           <FiChevronDown size={20} style={{ color: "rgba(82,183,136,0.5)" }} />
//         </div>
//       </section>

//       {/* ── STATS ────────────────────────────────────────────────────────────── */}
//       <section
//         className="py-16 border-y"
//         style={{
//           borderColor: "rgba(82,183,136,0.1)",
//           background: "rgba(13,40,24,0.5)",
//         }}
//       >
//         <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
//           {data.stats.map((s, i) => (
//             <div key={i} className="text-center">
//               <div
//                 className="text-5xl md:text-6xl font-light mb-2"
//                 style={{
//                   fontFamily: "Cormorant Garamond,serif",
//                   color: "#d4ff7d",
//                 }}
//               >
//                 {isAdmin ? (
//                   <input
//                     type="number"
//                     value={s.count}
//                     onChange={(e) => {
//                       const ss = [...data.stats];
//                       ss[i] = { ...ss[i], count: +e.target.value };
//                       update({ ...data, stats: ss });
//                     }}
//                     className="w-24 text-center bg-transparent border-b border-[rgba(212,255,125,0.3)] outline-none text-[#d4ff7d]"
//                     style={{
//                       fontFamily: "Cormorant Garamond,serif",
//                       fontSize: "inherit",
//                     }}
//                   />
//                 ) : (
//                   s.count
//                 )}
//               </div>
//               <p
//                 className="text-[0.65rem] tracking-widest uppercase font-mono"
//                 style={{ color: "#52b788" }}
//               >
//                 <EditText
//                   value={s.label}
//                   onChange={(v) => {
//                     const ss = [...data.stats];
//                     ss[i] = { ...ss[i], label: v };
//                     update({ ...data, stats: ss });
//                   }}
//                   isAdmin={isAdmin}
//                 />
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── MARQUEE ────────────────────────────────────────────────────────────── */}
//       <div
//         className="py-5 overflow-hidden"
//         style={{ borderBottom: "1px solid rgba(82,183,136,0.08)" }}
//       >
//         <div ref={marqueeRef} className="flex gap-10 whitespace-nowrap">
//           {[
//             ...data.marqueeItems,
//             ...data.marqueeItems,
//             ...data.marqueeItems,
//           ].map((item, i) => (
//             <span
//               key={i}
//               className="flex items-center gap-4 text-[0.65rem] tracking-[0.3em] uppercase font-mono"
//               style={{ color: "rgba(82,183,136,0.5)" }}
//             >
//               <GiBugNet size={10} style={{ color: "#d4ff7d", opacity: 0.6 }} />
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           ABOUT SECTION
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section id="about" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
//           {/* Image */}
//           <div className="relative">
//             <div
//               className="absolute -inset-4 rounded-3xl opacity-20"
//               style={{
//                 background:
//                   "radial-gradient(ellipse at center, #52b788 0%, transparent 70%)",
//               }}
//             />
//             <div
//               className="relative aspect-[4/5] rounded-2xl overflow-hidden"
//               style={{ border: "1px solid rgba(82,183,136,0.2)" }}
//             >
//               {isAdmin ? (
//                 <ImageUploader
//                   currentUrl={data.about.image}
//                   onUpload={(url) =>
//                     update({ ...data, about: { ...data.about, image: url } })
//                   }
//                   className="w-full h-full"
//                 />
//               ) : (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={data.about.image}
//                   alt="About"
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//             <div
//               className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl text-xs font-mono"
//               style={{ background: "#d4ff7d", color: "#081c15" }}
//             >
//               <HiOutlineAcademicCap className="inline mr-1.5" size={12} />
//               <EditText
//                 value={data.about.badgeText}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, badgeText: v } })
//                 }
//                 isAdmin={isAdmin}
//               />
//             </div>
//           </div>

//           {/* Content */}
//           <div>
//             <p className="text-[0.65rem] tracking-[0.3em] uppercase font-mono text-[#52b788] mb-4">
//               About Me
//             </p>
//             <h2
//               className="text-4xl md:text-5xl font-light text-[#fefae0] leading-tight mb-8"
//               style={{ fontFamily: "Cormorant Garamond,serif" }}
//             >
//               <EditText
//                 value={data.about.title}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, title: v } })
//                 }
//                 isAdmin={isAdmin}
//                 multiline
//                 tag="span"
//               />
//             </h2>
//             <div className="space-y-4 mb-8">
//               <EditText
//                 value={data.about.paragraph1}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, paragraph1: v } })
//                 }
//                 isAdmin={isAdmin}
//                 tag="p"
//                 className="text-sm leading-relaxed"
//                 style={
//                   {
//                     color: "rgba(254,250,224,0.7)",
//                     fontFamily: "Cormorant Garamond,serif",
//                     fontSize: "1rem",
//                   } as React.CSSProperties
//                 }
//                 multiline
//               />
//               <EditText
//                 value={data.about.paragraph2}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, paragraph2: v } })
//                 }
//                 isAdmin={isAdmin}
//                 tag="p"
//                 className="text-sm leading-relaxed"
//                 style={
//                   {
//                     color: "rgba(254,250,224,0.7)",
//                     fontFamily: "Cormorant Garamond,serif",
//                     fontSize: "1rem",
//                   } as React.CSSProperties
//                 }
//                 multiline
//               />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {data.about.tags.map((t, i) => (
//                 <span
//                   key={i}
//                   className="px-3 py-1.5 rounded-lg text-[0.65rem] tracking-wide font-mono"
//                   style={{
//                     background: "rgba(82,183,136,0.1)",
//                     border: "1px solid rgba(82,183,136,0.2)",
//                     color: "#b7e4c7",
//                   }}
//                 >
//                   <MdOutlineEco className="inline mr-1" size={10} />
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           CAREER SECTION (Work + Research)
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section
//         id="experience"
//         className="py-28 px-6"
//         style={{ background: "rgba(8,22,15,0.6)" }}
//       >
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle
//             eyebrow="Career Timeline"
//             title="Field Work & Research Projects"
//           />

//           {/* Filter tabs */}
//           <div className="flex justify-center gap-3 mb-10">
//             {(["all", "work", "research"] as const).map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActiveFilter(f)}
//                 className={`px-5 py-2 rounded-xl text-xs font-mono tracking-widest uppercase transition-all border ${activeFilter === f ? "bg-[rgba(212,255,125,0.12)] border-[rgba(212,255,125,0.4)] text-[#d4ff7d]" : "border-[rgba(82,183,136,0.2)] text-[rgba(82,183,136,0.6)] hover:border-[rgba(82,183,136,0.4)]"}`}
//               >
//                 {f === "all"
//                   ? "✦ All"
//                   : f === "work"
//                     ? "💼 Work"
//                     : "🔬 Research"}
//               </button>
//             ))}
//           </div>

//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setCareerModal({ open: true, item: null })}
//               label="Add Career Card"
//             />
//           )}

//           <div className="grid md:grid-cols-2 gap-6">
//             {filteredCareer.map((card) => (
//               <div
//                 key={card.id}
//                 className="relative group rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
//                 style={{
//                   background: "linear-gradient(145deg,#0d2818,#081c15)",
//                   border: "1px solid rgba(82,183,136,0.15)",
//                 }}
//               >
//                 {/* Image */}
//                 <div className="h-48 overflow-hidden relative">
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={
//                       card.image ||
//                       "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80"
//                     }
//                     alt={card.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div
//                     className="absolute inset-0"
//                     style={{
//                       background:
//                         "linear-gradient(to top,rgba(8,28,21,0.9),transparent)",
//                     }}
//                   />
//                   <div className="absolute top-3 left-3">
//                     <span
//                       className="px-2.5 py-1 rounded-lg text-[0.6rem] font-mono tracking-wide uppercase"
//                       style={{
//                         background:
//                           card.type === "work"
//                             ? "rgba(212,255,125,0.15)"
//                             : "rgba(82,183,136,0.15)",
//                         border: `1px solid ${card.type === "work" ? "rgba(212,255,125,0.3)" : "rgba(82,183,136,0.3)"}`,
//                         color: card.type === "work" ? "#d4ff7d" : "#52b788",
//                       }}
//                     >
//                       {card.type === "work" ? "💼 Work" : "🔬 Research"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-[0.65rem] tracking-widest uppercase font-mono text-[#52b788] mb-1">
//                     {card.org}
//                   </p>
//                   <h3
//                     className="text-xl font-light text-[#fefae0] mb-1"
//                     style={{ fontFamily: "Cormorant Garamond,serif" }}
//                   >
//                     {card.role}
//                   </h3>
//                   <p className="text-xs font-mono text-[rgba(254,250,224,0.45)] mb-4">
//                     {card.date}
//                   </p>
//                   <ul className="space-y-1.5">
//                     {card.bullets.slice(0, 3).map((b, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start gap-2 text-xs"
//                         style={{ color: "rgba(254,250,224,0.6)" }}
//                       >
//                         <span
//                           className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
//                           style={{ background: "#52b788" }}
//                         />
//                         {b}
//                       </li>
//                     ))}
//                     {card.bullets.length > 3 && (
//                       <li className="text-xs text-[#52b788] font-mono">
//                         +{card.bullets.length - 3} more…
//                       </li>
//                     )}
//                   </ul>
//                   <button
//                     onClick={() =>
//                       setViewModal({ open: true, item: card, type: "career" })
//                     }
//                     className="mt-4 flex items-center gap-2 text-xs font-mono text-[#52b788] hover:text-[#d4ff7d] transition-colors"
//                   >
//                     <FiExternalLink size={11} />
//                     View full details
//                   </button>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setCareerModal({ open: true, item: card })}
//                     onDelete={() => {
//                       if (confirm("Delete this card?"))
//                         update({
//                           ...data,
//                           careerCards: data.careerCards.filter(
//                             (c) => c.id !== card.id,
//                           ),
//                         });
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           RESEARCH PROJECTS
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section id="projects" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle eyebrow="Field Studies" title="Research Projects" />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setProjectModal({ open: true, item: null })}
//               label="Add Project"
//             />
//           )}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {data.projects.map((p) => (
//               <div
//                 key={p.id}
//                 className="relative group rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
//                 style={{
//                   border: "1px solid rgba(82,183,136,0.15)",
//                   background: "linear-gradient(145deg,#0d2818,#081c15)",
//                 }}
//                 onClick={() =>
//                   setViewModal({ open: true, item: p, type: "project" })
//                 }
//               >
//                 <div className="h-44 overflow-hidden relative">
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={p.image}
//                     alt={p.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div
//                     className="absolute inset-0"
//                     style={{
//                       background:
//                         "linear-gradient(to top,rgba(8,28,21,0.95),rgba(8,28,21,0.1))",
//                     }}
//                   />
//                 </div>
//                 <div className="p-5">
//                   <p className="text-[0.6rem] tracking-widest uppercase font-mono text-[#52b788] mb-2">
//                     {p.tag}
//                   </p>
//                   <h3
//                     className="text-base font-light text-[#fefae0] mb-2 leading-snug"
//                     style={{ fontFamily: "Cormorant Garamond,serif" }}
//                   >
//                     {p.title}
//                   </h3>
//                   <p
//                     className="text-xs leading-relaxed"
//                     style={{ color: "rgba(254,250,224,0.5)" }}
//                   >
//                     {p.description.slice(0, 90)}…
//                   </p>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => {
//                       setProjectModal({ open: true, item: p });
//                     }}
//                     onDelete={() => {
//                       if (confirm("Delete project?"))
//                         update({
//                           ...data,
//                           projects: data.projects.filter((x) => x.id !== p.id),
//                         });
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           PUBLICATIONS
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section
//         id="publications"
//         className="py-28 px-6"
//         style={{ background: "rgba(8,22,15,0.6)" }}
//       >
//         <div className="max-w-4xl mx-auto">
//           <SectionTitle eyebrow="Academic Output" title="Publications" />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setPubModal({ open: true, item: null })}
//               label="Add Publication"
//             />
//           )}
//           <div className="space-y-4">
//             {data.publications.map((p, i) => (
//               <div
//                 key={p.id}
//                 className="relative group flex gap-5 p-6 rounded-2xl transition-all hover:-translate-x-1"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,rgba(13,40,24,0.8),rgba(8,28,21,0.6))",
//                   border: "1px solid rgba(82,183,136,0.12)",
//                 }}
//               >
//                 <div
//                   className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold"
//                   style={{
//                     background: "rgba(212,255,125,0.08)",
//                     border: "1px solid rgba(212,255,125,0.2)",
//                     color: "#d4ff7d",
//                   }}
//                 >
//                   {i + 1}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3
//                     className="text-base font-light text-[#fefae0] mb-1.5 leading-snug"
//                     style={{ fontFamily: "Cormorant Garamond,serif" }}
//                   >
//                     {p.title}
//                   </h3>
//                   <p
//                     className="text-xs font-mono mb-1"
//                     style={{ color: "rgba(254,250,224,0.5)" }}
//                   >
//                     {p.authors}
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <HiOutlineDocumentText
//                       size={11}
//                       style={{ color: "#52b788" }}
//                     />
//                     <span
//                       className="text-[0.65rem] tracking-wide font-mono"
//                       style={{ color: "#52b788" }}
//                     >
//                       {p.journal}
//                     </span>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setPubModal({ open: true, item: p })}
//                     onDelete={() => {
//                       if (confirm("Delete publication?"))
//                         update({
//                           ...data,
//                           publications: data.publications.filter(
//                             (x) => x.id !== p.id,
//                           ),
//                         });
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           CONFERENCES & EVENTS
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section id="conferences" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle
//             eyebrow="Events & Outreach"
//             title="Conferences & International Events"
//           />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setConfModal({ open: true, item: null })}
//               label="Add Event"
//             />
//           )}
//           <div className="grid md:grid-cols-3 gap-6">
//             {data.conferences.map((c) => (
//               <div
//                 key={c.id}
//                 className="relative group rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
//                 style={{
//                   background: "linear-gradient(145deg,#0d2818,#081c15)",
//                   border: "1px solid rgba(82,183,136,0.15)",
//                 }}
//               >
//                 <div className="h-48 overflow-hidden relative">
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={c.image}
//                     alt={c.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div
//                     className="absolute inset-0"
//                     style={{
//                       background:
//                         "linear-gradient(to top,rgba(8,28,21,0.95),rgba(8,28,21,0.2))",
//                     }}
//                   />
//                   <div className="absolute bottom-3 left-4 text-3xl">
//                     {c.icon}
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3
//                     className="text-lg font-light text-[#fefae0] mb-3 leading-snug"
//                     style={{ fontFamily: "Cormorant Garamond,serif" }}
//                   >
//                     {c.title}
//                   </h3>
//                   <p
//                     className="text-xs leading-relaxed mb-4"
//                     style={{ color: "rgba(254,250,224,0.6)" }}
//                   >
//                     {c.description}
//                   </p>
//                   <div
//                     className="flex items-center gap-2 px-3 py-2 rounded-lg"
//                     style={{
//                       background: "rgba(212,255,125,0.06)",
//                       border: "1px solid rgba(212,255,125,0.15)",
//                     }}
//                   >
//                     <FiAward size={12} style={{ color: "#d4ff7d" }} />
//                     <span
//                       className="text-[0.6rem] tracking-wide font-mono"
//                       style={{ color: "#d4ff7d" }}
//                     >
//                       {c.badge}
//                     </span>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setConfModal({ open: true, item: c })}
//                     onDelete={() => {
//                       if (confirm("Delete event?"))
//                         update({
//                           ...data,
//                           conferences: data.conferences.filter(
//                             (x) => x.id !== c.id,
//                           ),
//                         });
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           SKILLS
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section
//         id="skills"
//         className="py-28 px-6"
//         style={{ background: "rgba(8,22,15,0.6)" }}
//       >
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle eyebrow="Expertise" title="Skills & Proficiencies" />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setSkillModal({ open: true, item: null })}
//               label="Add Skill"
//             />
//           )}
//           <div className="grid md:grid-cols-2 gap-16 items-start">
//             <div className="space-y-5">
//               {data.skills.map((s) => (
//                 <div key={s.id} className="relative group">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-mono text-[#fefae0]">
//                       {s.label}
//                     </span>
//                     <span
//                       className="text-[0.6rem] tracking-widest uppercase font-mono px-2.5 py-1 rounded-lg"
//                       style={{
//                         background: "rgba(82,183,136,0.1)",
//                         border: "1px solid rgba(82,183,136,0.2)",
//                         color: "#52b788",
//                       }}
//                     >
//                       {s.level}
//                     </span>
//                   </div>
//                   <div
//                     className="h-1.5 rounded-full overflow-hidden"
//                     style={{ background: "rgba(82,183,136,0.1)" }}
//                   >
//                     <div
//                       className="h-full rounded-full transition-all duration-1000"
//                       style={{
//                         width: `${s.width}%`,
//                         background:
//                           "linear-gradient(to right, #52b788, #d4ff7d)",
//                       }}
//                     />
//                   </div>
//                   {isAdmin && (
//                     <div className="absolute -right-2 top-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button
//                         onClick={() => setSkillModal({ open: true, item: s })}
//                         className="w-6 h-6 flex items-center justify-center rounded bg-[rgba(212,255,125,0.15)] text-[#d4ff7d] hover:bg-[rgba(212,255,125,0.25)]"
//                       >
//                         <FiEdit2 size={10} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (confirm("Delete skill?"))
//                             update({
//                               ...data,
//                               skills: data.skills.filter((x) => x.id !== s.id),
//                             });
//                         }}
//                         className="w-6 h-6 flex items-center justify-center rounded bg-[rgba(239,68,68,0.15)] text-red-400 hover:bg-[rgba(239,68,68,0.25)]"
//                       >
//                         <FiTrash2 size={10} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="relative">
//               <div
//                 className="absolute -inset-6 rounded-3xl opacity-10"
//                 style={{
//                   background:
//                     "radial-gradient(ellipse,#52b788,transparent 70%)",
//                 }}
//               />
//               <div
//                 className="relative aspect-[4/3] rounded-2xl overflow-hidden"
//                 style={{ border: "1px solid rgba(82,183,136,0.2)" }}
//               >
//                 {isAdmin ? (
//                   <ImageUploader
//                     currentUrl={data.skillsImage}
//                     onUpload={(url) => update({ ...data, skillsImage: url })}
//                     className="w-full h-full"
//                   />
//                 ) : (
//                   // eslint-disable-next-line @next/next/no-img-element
//                   <img
//                     src={data.skillsImage}
//                     alt="Field work"
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>
//               <div
//                 className="absolute -bottom-4 -left-4 p-4 rounded-xl"
//                 style={{
//                   background: "linear-gradient(135deg,#0d2818,#081c15)",
//                   border: "1px solid rgba(82,183,136,0.2)",
//                 }}
//               >
//                 <GiForestCamp size={24} style={{ color: "#52b788" }} />
//                 <p
//                   className="text-[0.65rem] tracking-wide font-mono mt-1"
//                   style={{ color: "#52b788" }}
//                 >
//                   Field Researcher
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           CONTACT
//       ═══════════════════════════════════════════════════════════════════════ */}
//       <section id="contact" className="py-28 px-6">
//         <div className="max-w-5xl mx-auto">
//           <SectionTitle
//             eyebrow="Get in Touch"
//             title="Contact & Collaboration"
//           />
//           <div className="grid md:grid-cols-2 gap-12">
//             {/* Description */}
//             <div>
//               <p
//                 className="text-base leading-relaxed mb-8"
//                 style={{
//                   fontFamily: "Cormorant Garamond,serif",
//                   color: "rgba(254,250,224,0.75)",
//                   fontSize: "1.1rem",
//                 }}
//               >
//                 <EditText
//                   value={data.contact.description}
//                   onChange={(v) =>
//                     update({
//                       ...data,
//                       contact: { ...data.contact, description: v },
//                     })
//                   }
//                   isAdmin={isAdmin}
//                   multiline
//                   tag="span"
//                 />
//               </p>
//               <div className="space-y-4">
//                 {[
//                   {
//                     icon: <FiMapPin />,
//                     label: "Location",
//                     value: data.contact.location,
//                     key: "location" as const,
//                   },
//                   {
//                     icon: <FiMail />,
//                     label: "Email",
//                     value: data.contact.email,
//                     key: "email" as const,
//                   },
//                   {
//                     icon: <FiPhone />,
//                     label: "Phone",
//                     value: data.contact.phone,
//                     key: "phone" as const,
//                   },
//                 ].map(({ icon, label, value, key }) => (
//                   <div key={key} className="flex items-center gap-4">
//                     <div
//                       className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//                       style={{
//                         background: "rgba(82,183,136,0.1)",
//                         border: "1px solid rgba(82,183,136,0.2)",
//                         color: "#52b788",
//                       }}
//                     >
//                       {icon}
//                     </div>
//                     <div>
//                       <p className="text-[0.6rem] tracking-widest uppercase font-mono text-[rgba(82,183,136,0.6)]">
//                         {label}
//                       </p>
//                       <EditText
//                         value={value}
//                         onChange={(v) =>
//                           update({
//                             ...data,
//                             contact: { ...data.contact, [key]: v },
//                           })
//                         }
//                         isAdmin={isAdmin}
//                         className="text-sm text-[#fefae0] font-mono"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Social links */}
//             <div className="space-y-4">
//               <p className="text-[0.65rem] tracking-[0.3em] uppercase font-mono text-[#52b788] mb-6">
//                 Connect Online
//               </p>
//               {[
//                 {
//                   icon: <FiLinkedin size={18} />,
//                   label: "LinkedIn",
//                   value: data.contact.linkedin,
//                   key: "linkedin" as const,
//                   color: "#0A66C2",
//                 },
//                 {
//                   icon: <FaResearchgate size={18} />,
//                   label: "ResearchGate",
//                   value: data.contact.researchgate,
//                   key: "researchgate" as const,
//                   color: "#00CCBB",
//                 },
//               ].map(({ icon, label, value, key, color }) => (
//                 <div
//                   key={key}
//                   className="p-5 rounded-2xl transition-all hover:-translate-y-0.5 group"
//                   style={{
//                     background: "rgba(13,40,24,0.6)",
//                     border: "1px solid rgba(82,183,136,0.15)",
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className="w-10 h-10 rounded-xl flex items-center justify-center"
//                         style={{
//                           background: `${color}20`,
//                           border: `1px solid ${color}40`,
//                           color,
//                         }}
//                       >
//                         {icon}
//                       </div>
//                       <span className="text-sm font-mono text-[#fefae0]">
//                         {label}
//                       </span>
//                     </div>
//                     <a
//                       href={value}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5"
//                       style={{
//                         background: "rgba(82,183,136,0.1)",
//                         border: "1px solid rgba(82,183,136,0.25)",
//                         color: "#52b788",
//                       }}
//                     >
//                       <FiExternalLink size={11} />
//                       Visit
//                     </a>
//                   </div>
//                   {isAdmin && (
//                     <div className="mt-3">
//                       <Input
//                         value={value}
//                         onChange={(v) =>
//                           update({
//                             ...data,
//                             contact: { ...data.contact, [key]: v },
//                           })
//                         }
//                         placeholder="URL"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {/* Quick contact card */}
//               <div
//                 className="p-6 rounded-2xl mt-4"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,rgba(212,255,125,0.06),rgba(82,183,136,0.04))",
//                   border: "1px solid rgba(212,255,125,0.15)",
//                 }}
//               >
//                 <div className="flex items-center gap-2 mb-3">
//                   <HiOutlineLightBulb style={{ color: "#d4ff7d" }} size={16} />
//                   <span className="text-xs font-mono tracking-wide text-[#d4ff7d]">
//                     Open to collaborations
//                   </span>
//                 </div>
//                 <p
//                   className="text-xs font-mono"
//                   style={{ color: "rgba(254,250,224,0.5)" }}
//                 >
//                   Research · Fieldwork · Speaking · Conservation
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
//       <footer
//         className="py-10 px-6 border-t"
//         style={{ borderColor: "rgba(82,183,136,0.1)" }}
//       >
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <EditText
//             value={data.footer.copy}
//             onChange={(v) =>
//               update({ ...data, footer: { ...data.footer, copy: v } })
//             }
//             isAdmin={isAdmin}
//             className="text-xs font-mono"
//             style={{ color: "rgba(82,183,136,0.5)" } as React.CSSProperties}
//           />
//           <EditText
//             value={data.footer.tagline}
//             onChange={(v) =>
//               update({ ...data, footer: { ...data.footer, tagline: v } })
//             }
//             isAdmin={isAdmin}
//             className="text-xs font-mono"
//             style={{ color: "rgba(82,183,136,0.4)" } as React.CSSProperties}
//           />
//         </div>
//       </footer>

//       {/* ═══════════════════════════════════════════════════════════════════════
//           MODALS
//       ═══════════════════════════════════════════════════════════════════════ */}

//       {/* Career Modal */}
//       {careerModal.open && (
//         <Modal
//           title={careerModal.item ? "Edit Career Card" : "Add Career Card"}
//           onClose={() => setCareerModal({ open: false, item: null })}
//         >
//           <CareerForm
//             item={careerModal.item}
//             onClose={() => setCareerModal({ open: false, item: null })}
//             onSave={(c) => {
//               const cards = careerModal.item
//                 ? data.careerCards.map((x) => (x.id === c.id ? c : x))
//                 : [...data.careerCards, c];
//               update({ ...data, careerCards: cards });
//               setCareerModal({ open: false, item: null });
//             }}
//           />
//         </Modal>
//       )}

//       {/* Project Modal */}
//       {projectModal.open && (
//         <Modal
//           title={projectModal.item ? "Edit Project" : "Add Research Project"}
//           onClose={() => setProjectModal({ open: false, item: null })}
//         >
//           <ProjectForm
//             item={projectModal.item}
//             onClose={() => setProjectModal({ open: false, item: null })}
//             onSave={(p) => {
//               const projects = projectModal.item
//                 ? data.projects.map((x) => (x.id === p.id ? p : x))
//                 : [...data.projects, p];
//               update({ ...data, projects });
//               setProjectModal({ open: false, item: null });
//             }}
//           />
//         </Modal>
//       )}

//       {/* Publication Modal */}
//       {pubModal.open && (
//         <Modal
//           title={pubModal.item ? "Edit Publication" : "Add Publication"}
//           onClose={() => setPubModal({ open: false, item: null })}
//         >
//           <PubForm
//             item={pubModal.item}
//             onClose={() => setPubModal({ open: false, item: null })}
//             onSave={(p) => {
//               const publications = pubModal.item
//                 ? data.publications.map((x) => (x.id === p.id ? p : x))
//                 : [...data.publications, p];
//               update({ ...data, publications });
//               setPubModal({ open: false, item: null });
//             }}
//           />
//         </Modal>
//       )}

//       {/* Conference Modal */}
//       {confModal.open && (
//         <Modal
//           title={confModal.item ? "Edit Event" : "Add Event"}
//           onClose={() => setConfModal({ open: false, item: null })}
//         >
//           <ConfForm
//             item={confModal.item}
//             onClose={() => setConfModal({ open: false, item: null })}
//             onSave={(c) => {
//               const conferences = confModal.item
//                 ? data.conferences.map((x) => (x.id === c.id ? c : x))
//                 : [...data.conferences, c];
//               update({ ...data, conferences });
//               setConfModal({ open: false, item: null });
//             }}
//           />
//         </Modal>
//       )}

//       {/* Skill Modal */}
//       {skillModal.open && (
//         <Modal
//           title={skillModal.item ? "Edit Skill" : "Add Skill"}
//           onClose={() => setSkillModal({ open: false, item: null })}
//         >
//           <SkillForm
//             item={skillModal.item}
//             onClose={() => setSkillModal({ open: false, item: null })}
//             onSave={(s) => {
//               const skills = skillModal.item
//                 ? data.skills.map((x) => (x.id === s.id ? s : x))
//                 : [...data.skills, s];
//               update({ ...data, skills });
//               setSkillModal({ open: false, item: null });
//             }}
//           />
//         </Modal>
//       )}

//       {/* VIEW Modal */}
//       {viewModal.open && viewModal.item && (
//         <Modal
//           title="Details"
//           onClose={() => setViewModal({ open: false, item: null, type: "" })}
//         >
//           {viewModal.type === "career" &&
//             (() => {
//               const c = viewModal.item as CareerCard;
//               return (
//                 <div className="space-y-5">
//                   <div className="h-48 rounded-xl overflow-hidden">
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={
//                         c.image ||
//                         "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80"
//                       }
//                       alt={c.role}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <span
//                       className="text-[0.6rem] tracking-widest uppercase font-mono px-2.5 py-1 rounded-lg"
//                       style={{
//                         background:
//                           c.type === "work"
//                             ? "rgba(212,255,125,0.1)"
//                             : "rgba(82,183,136,0.1)",
//                         color: c.type === "work" ? "#d4ff7d" : "#52b788",
//                         border: `1px solid ${c.type === "work" ? "rgba(212,255,125,0.25)" : "rgba(82,183,136,0.25)"}`,
//                       }}
//                     >
//                       {c.type}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[0.65rem] tracking-widest uppercase font-mono text-[#52b788]">
//                       {c.org}
//                     </p>
//                     <h3
//                       className="text-2xl font-light text-[#fefae0] mt-1"
//                       style={{ fontFamily: "Cormorant Garamond,serif" }}
//                     >
//                       {c.role}
//                     </h3>
//                     <p className="text-xs font-mono text-[rgba(254,250,224,0.4)] mt-0.5">
//                       {c.date}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-[0.65rem] tracking-widest uppercase font-mono text-[#52b788] mb-3">
//                       Key Responsibilities
//                     </p>
//                     <ul className="space-y-2">
//                       {c.bullets.map((b, i) => (
//                         <li
//                           key={i}
//                           className="flex items-start gap-2.5 text-sm"
//                           style={{
//                             color: "rgba(254,250,224,0.75)",
//                             fontFamily: "Cormorant Garamond,serif",
//                           }}
//                         >
//                           <span
//                             className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
//                             style={{ background: "#52b788" }}
//                           />
//                           {b}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               );
//             })()}
//           {viewModal.type === "project" &&
//             (() => {
//               const p = viewModal.item as ProjectCard;
//               return (
//                 <div className="space-y-5">
//                   <div className="h-52 rounded-xl overflow-hidden">
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={p.image}
//                       alt={p.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-[0.65rem] tracking-widest uppercase font-mono text-[#52b788] mb-2">
//                       {p.tag}
//                     </p>
//                     <h3
//                       className="text-2xl font-light text-[#fefae0]"
//                       style={{ fontFamily: "Cormorant Garamond,serif" }}
//                     >
//                       {p.title}
//                     </h3>
//                   </div>
//                   <p
//                     className="text-base leading-relaxed"
//                     style={{
//                       color: "rgba(254,250,224,0.75)",
//                       fontFamily: "Cormorant Garamond,serif",
//                     }}
//                   >
//                     {p.description}
//                   </p>
//                 </div>
//               );
//             })()}
//         </Modal>
//       )}

//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.2; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.5); }
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAdmin } from "./AdminContext";
// import ImageUploader from "./ImageUploader";
// import {
//   FiMapPin,
//   FiMail,
//   FiPhone,
//   FiLinkedin,
//   FiExternalLink,
//   FiEdit2,
//   FiTrash2,
//   FiPlus,
//   FiX,
//   FiCheck,
//   FiChevronDown,
//   FiAward,
//   FiSave,
//   FiRefreshCw,
//   FiMenu,
// } from "react-icons/fi";
// import {
//   HiOutlineAcademicCap,
//   HiOutlineLightBulb,
//   HiOutlineDocumentText,
// } from "react-icons/hi2";
// import { GiBugNet, GiForestCamp } from "react-icons/gi";
// import { MdOutlineEco } from "react-icons/md";
// import { FaResearchgate } from "react-icons/fa";
// import { gsap } from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import LoginModal from "./LoginModal";

// gsap.registerPlugin(ScrollToPlugin);

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface CareerCard {
//   _id?: string;
//   id: string;
//   image: string;
//   org: string;
//   role: string;
//   date: string;
//   type: "work" | "research";
//   bullets: string[];
// }

// interface ProjectCard {
//   _id?: string;
//   id: string;
//   image: string;
//   tag: string;
//   title: string;
//   description: string;
// }

// interface Publication {
//   _id?: string;
//   id: string;
//   title: string;
//   authors: string;
//   journal: string;
// }

// interface Conference {
//   _id?: string;
//   id: string;
//   image: string;
//   icon: string;
//   title: string;
//   description: string;
//   badge: string;
// }

// interface Skill {
//   id: string;
//   label: string;
//   level: string;
//   width: number;
// }

// interface PortfolioData {
//   _id?: string;
//   hero: {
//     tag: string;
//     name: string;
//     title: string;
//     description: string;
//     bgImage: string;
//   };
//   stats: Array<{ count: number; label: string }>;
//   marqueeItems: string[];
//   about: {
//     image: string;
//     badgeText: string;
//     title: string;
//     paragraph1: string;
//     paragraph2: string;
//     tags: string[];
//   };
//   careerCards: CareerCard[];
//   projects: ProjectCard[];
//   publications: Publication[];
//   conferences: Conference[];
//   skills: Skill[];
//   skillsImage: string;
//   contact: {
//     description: string;
//     location: string;
//     email: string;
//     phone: string;
//     linkedin: string;
//     researchgate: string;
//   };
//   footer: { copy: string; tagline: string };
// }

// const genId = () => Math.random().toString(36).slice(2, 9);

// const DEFAULT_DATA: PortfolioData = {
//   hero: {
//     tag: "🪲 Wildlife Researcher & Conservation Biologist",
//     name: "Ashutosh Dey",
//     title: "Project Biologist · Firefly Ecology · Biodiversity Conservation",
//     description:
//       "Bridging the gap between ecological science and community action — studying fireflies, documenting biodiversity, and working at the frontier of human-wildlife harmony.",
//     bgImage:
//       "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1600&q=80",
//   },
//   stats: [
//     { count: 5, label: "Publications" },
//     { count: 3, label: "Int'l Events" },
//     { count: 4, label: "Research Projects" },
//     { count: 2, label: "Years Field Research" },
//   ],
//   marqueeItems: [
//     "Firefly Ecology",
//     "Wildlife Conservation",
//     "Biodiversity Research",
//     "Nocturnal Surveys",
//     "Human-Wildlife Conflict",
//     "Community Science",
//     "IUCN SSC",
//     "Odisha · Karnataka · Kerala",
//   ],
//   about: {
//     image:
//       "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
//     badgeText: "M.Sc. Wildlife Biodiversity & Conservation",
//     title: "A Naturalist at heart, a Scientist by training",
//     paragraph1:
//       "I completed my M.Sc. in Wildlife Biodiversity & Conservation from North Orissa University, Odisha. Over the years I have actively worked on biodiversity assessment, ecological surveys, firefly research, and conservation-based field projects across India's remarkable forest landscapes.",
//     paragraph2:
//       "Currently working as a Project Biologist in a Human-Wildlife Conflict CSR Project, contributing to ecological monitoring, field surveys, conservation awareness, and wildlife research — combining rigorous science with community participation for long-term biodiversity conservation.",
//     tags: [
//       "Firefly Ecology",
//       "Human-Wildlife Conflict",
//       "Biodiversity Monitoring",
//       "Nocturnal Surveys",
//       "GIS Mapping",
//       "Community Conservation",
//       "Ecological Documentation",
//     ],
//   },
//   careerCards: [
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
//       org: "CSR Conservation Project · Present",
//       role: "Project Biologist",
//       date: "Human-Wildlife Conflict Division",
//       type: "work",
//       bullets: [
//         "Human-wildlife conflict mitigation activities",
//         "Biodiversity monitoring and ecological surveys",
//         "Community awareness and conservation outreach",
//         "GPS-based field navigation and wildlife data collection",
//         "Coordination with local stakeholders and forest officials",
//       ],
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=800&q=80",
//       org: "EMPRI, Bangalore · Nov 2022 – Mar 2024",
//       role: "Field Cum-Lab Assistant",
//       date: "Firefly Identification & Bioecology, Karnataka",
//       type: "research",
//       bullets: [
//         "Nocturnal field surveys for firefly monitoring",
//         "Firefly behavioral observations and species documentation",
//         "Habitat assessment and biodiversity recording",
//         "Scientific documentation and research coordination",
//         "Firefly rearing",
//       ],
//     },
//   ],
//   projects: [
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
//       tag: "Conflict Study · Odisha",
//       title: "Human-Elephant Conflict Assessment",
//       description:
//         "Case study in Rairangpur Forest Division focusing on conflict assessment, community interactions, and evidence-based mitigation approaches.",
//     },
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
//       tag: "Entomology · Odisha",
//       title: "Lepidoptera & Odonata Biodiversity",
//       description:
//         "Field-based assessment in Badampahar Forest Range documenting species diversity, ecological significance and conservation status.",
//     },
//   ],
//   publications: [
//     {
//       id: genId(),
//       title:
//         "Companions of the 'fun-loving' fireflies in the wild: friends or foes?",
//       authors: "Chakravarthy A.K., Parvez, Ashutosh Dey & Amlan Das (2023)",
//       journal: "Indian Entomologist",
//     },
//     {
//       id: genId(),
//       title:
//         "Assessment and Status of Lepidoptera and Odonata of Rairangpur Forest Division, Odisha, India",
//       authors: "Parvez et al. (2023)",
//       journal: "Biodiversity Research Publication",
//     },
//   ],
//   conferences: [
//     {
//       id: genId(),
//       image:
//         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
//       icon: "🌍",
//       title: "International Firefly Conclave",
//       description:
//         "Organized a landmark international conclave at Kannur University, Kerala, bringing together global firefly researchers, ecologists, and conservationists.",
//       badge: "Organizer · Kannur University, Kerala",
//     },
//   ],
//   skills: [
//     {
//       id: genId(),
//       label: "Wildlife Field Survey Techniques",
//       level: "Expert",
//       width: 92,
//     },
//     {
//       id: genId(),
//       label: "Nocturnal Biodiversity Surveys",
//       level: "Expert",
//       width: 90,
//     },
//     {
//       id: genId(),
//       label: "QGIS & Ecological Mapping",
//       level: "Intermediate",
//       width: 60,
//     },
//   ],
//   skillsImage:
//     "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
//   contact: {
//     description:
//       "Open to research collaborations, fieldwork opportunities, conservation projects, and speaking engagements related to firefly ecology and biodiversity conservation.",
//     location: "Balasore, Odisha, India",
//     email: "ashutoshday90@gmail.com",
//     phone: "+91 6372970772",
//     linkedin: "https://www.linkedin.com/in/ashutosh-dey-1b4a0b1ab",
//     researchgate: "https://www.researchgate.net/profile/Ashutosh-Dey",
//   },
//   footer: {
//     copy: "© 2025 Ashutosh Dey · Wildlife Researcher",
//     tagline: "🪲 Illuminating biodiversity, one firefly at a time",
//   },
// };

// // ─── Navbar Component ─────────────────────────────────────────────────────────

// // ─── Editable Text Component ─────────────────────────────────────────────────
// function EditText({
//   value,
//   onChange,
//   isAdmin,
//   tag = "span",
//   className = "",
//   multiline = false,
// }: any) {
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState(value);
//   const Tag = tag;
//   useEffect(() => setDraft(value), [value]);

//   if (!isAdmin) return <Tag className={className}>{value}</Tag>;
//   if (editing) {
//     return (
//       <motion.div
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         className="inline-flex flex-col gap-1"
//       >
//         {multiline ? (
//           <textarea
//             autoFocus
//             value={draft}
//             onChange={(e) => setDraft(e.target.value)}
//             rows={4}
//             className="w-full min-w-[260px] p-2 text-sm rounded-lg bg-[#0a1f14] text-[#fefae0] border border-[#52b788] outline-none font-mono"
//           />
//         ) : (
//           <input
//             autoFocus
//             value={draft}
//             onChange={(e) => setDraft(e.target.value)}
//             className="p-2 text-sm rounded-lg bg-[#0a1f14] text-[#fefae0] border border-[#52b788] outline-none font-mono min-w-[200px]"
//           />
//         )}
//         <div className="flex gap-1">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               onChange(draft);
//               setEditing(false);
//             }}
//             className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#d4ff7d] text-[#081c15] font-bold"
//           >
//             <FiCheck size={10} /> Save
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               setDraft(value);
//               setEditing(false);
//             }}
//             className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/40"
//           >
//             <FiX size={10} /> Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   }
//   return (
//     <Tag
//       className={`${className} cursor-pointer group/edit`}
//       onClick={() => setEditing(true)}
//     >
//       {value}
//       <FiEdit2
//         size={10}
//         className="inline ml-1 opacity-0 group-hover/edit:opacity-70 transition-opacity text-[#d4ff7d]"
//       />
//     </Tag>
//   );
// }

// // ─── Modal Component ─────────────────────────────────────────────────────────
// function Modal({ title, onClose, children }: any) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-[#040e08]/95 backdrop-blur-2xl"
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 30 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 30 }}
//         className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0d2818] to-[#081c15] border border-[#52b788]/40 shadow-2xl"
//       >
//         <div className="flex justify-between items-center p-6 border-b border-[#52b788]/20">
//           <h3 className="font-semibold text-lg text-[#fefae0] font-['Syne']">
//             {title}
//           </h3>
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#52b788]/20 transition"
//           >
//             <FiX className="text-[#52b788]" />
//           </motion.button>
//         </div>
//         <div className="p-6">{children}</div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─── Admin Action Components ─────────────────────────────────────────────────
// function AdminBar({ onAdd, label }: any) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       className="flex justify-end mb-8"
//     >
//       <motion.button
//         whileHover={{ scale: 1.02, y: -2 }}
//         whileTap={{ scale: 0.98 }}
//         onClick={onAdd}
//         className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider bg-[#d4ff7d]/10 border border-[#d4ff7d]/40 text-[#d4ff7d]"
//       >
//         <FiPlus size={14} /> {label}
//       </motion.button>
//     </motion.div>
//   );
// }

// function CardActions({ onEdit, onDelete }: any) {
//   return (
//     <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={onEdit}
//         className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#d4ff7d]/20 border border-[#d4ff7d]/50 text-[#d4ff7d] hover:bg-[#d4ff7d]/40 transition"
//       >
//         <FiEdit2 size={12} />
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={onDelete}
//         className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ef4444]/20 border border-[#ef4444]/50 text-[#fca5a5] hover:bg-[#ef4444]/40 transition"
//       >
//         <FiTrash2 size={12} />
//       </motion.button>
//     </div>
//   );
// }

// function SectionTitle({ eyebrow, title }: any) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className="text-center mb-14"
//     >
//       <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-[#52b788] mb-3">
//         {eyebrow}
//       </p>
//       <h2 className="text-4xl md:text-5xl font-light text-[#fefae0] font-['Cormorant_Garamond']">
//         {title}
//       </h2>
//       <motion.div
//         initial={{ width: 0 }}
//         whileInView={{ width: 64 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="mt-4 mx-auto h-0.5 bg-gradient-to-r from-transparent via-[#52b788] to-transparent"
//       />
//     </motion.div>
//   );
// }

// // ─── Main Portfolio Component ────────────────────────────────────────────────
// export default function Portfolio() {
//   const { isAdmin } = useAdmin();
//   const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [saveMsg, setSaveMsg] = useState("");
//   const [activeFilter, setActiveFilter] = useState<"all" | "work" | "research">(
//     "all",
//   );

//   // Modal states
//   const [careerModal, setCareerModal] = useState<{
//     open: boolean;
//     item: CareerCard | null;
//   }>({ open: false, item: null });
//   const [projectModal, setProjectModal] = useState<{
//     open: boolean;
//     item: ProjectCard | null;
//   }>({ open: false, item: null });
//   const [pubModal, setPubModal] = useState<{
//     open: boolean;
//     item: Publication | null;
//   }>({ open: false, item: null });
//   const [confModal, setConfModal] = useState<{
//     open: boolean;
//     item: Conference | null;
//   }>({ open: false, item: null });
//   const [skillModal, setSkillModal] = useState<{
//     open: boolean;
//     item: Skill | null;
//   }>({ open: false, item: null });
//   const [viewModal, setViewModal] = useState<{
//     open: boolean;
//     item: any;
//     type: string;
//   }>({ open: false, item: null, type: "" });

//   const marqueeRef = useRef<HTMLDivElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetch("/api/portfolio")
//       .then((r) => r.json())
//       .then((d) => {
//         if (d && !d.error) {
//           setData((prev) => ({
//             ...prev,
//             ...d,
//             careerCards: d.careerCards || d.experience || [],
//             projects: d.projects || [],
//             publications: d.publications || [],
//             conferences: d.conferences || [],
//             skills: d.skills || [],
//           }));
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     // GSAP animations for marquee
//     const el = marqueeRef.current;
//     if (!el) return;
//     let x = 0;
//     const speed = 0.5;
//     const half = el.scrollWidth / 2;
//     const tick = () => {
//       x -= speed;
//       if (Math.abs(x) >= half) x = 0;
//       el.style.transform = `translateX(${x}px)`;
//       requestAnimationFrame(tick);
//     };
//     const id = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(id);
//   }, []);

//   const save = useCallback(async (newData: PortfolioData) => {
//     setSaving(true);
//     try {
//       await fetch("/api/portfolio", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newData),
//       });
//       setSaveMsg("Saved!");
//       setTimeout(() => setSaveMsg(""), 2000);
//     } catch {
//       setSaveMsg("Error saving");
//     } finally {
//       setSaving(false);
//     }
//   }, []);

//   const update = useCallback(
//     (newData: PortfolioData) => {
//       setData(newData);
//       if (isAdmin) save(newData);
//     },
//     [isAdmin, save],
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#081c15]">
//         <motion.div
//           animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="text-center"
//         >
//           <div className="text-5xl mb-4">🪲</div>
//           <p className="text-[#52b788] text-sm font-mono tracking-wide">
//             Loading portfolio…
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   const filteredCareer = data.careerCards.filter(
//     (c) => activeFilter === "all" || c.type === activeFilter,
//   );

//   // Simple form helpers
//   const CareerForm = ({ item, onSave, onClose }: any) => {
//     const [form, setForm] = useState(
//       item || {
//         id: genId(),
//         image: "",
//         org: "",
//         role: "",
//         date: "",
//         type: "work",
//         bullets: [""],
//       },
//     );
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Type
//           </label>
//           <div className="flex gap-3">
//             <button
//               onClick={() => setForm({ ...form, type: "work" })}
//               className={`flex-1 py-2.5 rounded-xl text-xs font-mono uppercase ${form.type === "work" ? "bg-[#d4ff7d]/20 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]"} border transition`}
//             >
//               💼 Work
//             </button>
//             <button
//               onClick={() => setForm({ ...form, type: "research" })}
//               className={`flex-1 py-2.5 rounded-xl text-xs font-mono uppercase ${form.type === "research" ? "bg-[#d4ff7d]/20 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]"} border transition`}
//             >
//               🔬 Research
//             </button>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Image URL
//           </label>
//           <input
//             value={form.image}
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0] outline-none focus:border-[#d4ff7d]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Organisation
//           </label>
//           <input
//             value={form.org}
//             onChange={(e) => setForm({ ...form, org: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Role
//           </label>
//           <input
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Date/Division
//           </label>
//           <input
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Bullets
//           </label>
//           {form.bullets.map((b: string, i: number) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input
//                 value={b}
//                 onChange={(e) => {
//                   const newBullets = [...form.bullets];
//                   newBullets[i] = e.target.value;
//                   setForm({ ...form, bullets: newBullets });
//                 }}
//                 className="flex-1 p-2 rounded-lg text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//               />
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() =>
//                   setForm({
//                     ...form,
//                     bullets: form.bullets.filter(
//                       (_: any, j: number) => j !== i,
//                     ),
//                   })
//                 }
//                 className="px-3 rounded-lg border border-[#ef4444]/40 text-[#fca5a5]"
//               >
//                 ✗
//               </motion.button>
//             </div>
//           ))}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setForm({ ...form, bullets: [...form.bullets, ""] })}
//             className="w-full py-2 rounded-xl border border-dashed border-[#52b788]/40 text-[#52b788] text-xs flex items-center justify-center gap-2"
//           >
//             + Add bullet
//           </motion.button>
//         </div>
//         <div className="flex gap-3 mt-6">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
//           >
//             <FiSave size={14} /> Save
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
//           >
//             Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   const ProjectForm = ({ item, onSave, onClose }: any) => {
//     const [form, setForm] = useState(
//       item || { id: genId(), image: "", tag: "", title: "", description: "" },
//     );
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Image URL
//           </label>
//           <input
//             value={form.image}
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Tag
//           </label>
//           <input
//             value={form.tag}
//             onChange={(e) => setForm({ ...form, tag: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Title
//           </label>
//           <input
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Description
//           </label>
//           <textarea
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             rows={4}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
//           >
//             <FiSave size={14} /> Save
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
//           >
//             Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   const PubForm = ({ item, onSave, onClose }: any) => {
//     const [form, setForm] = useState(
//       item || { id: genId(), title: "", authors: "", journal: "" },
//     );
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Title
//           </label>
//           <textarea
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             rows={3}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Authors
//           </label>
//           <input
//             value={form.authors}
//             onChange={(e) => setForm({ ...form, authors: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Journal
//           </label>
//           <input
//             value={form.journal}
//             onChange={(e) => setForm({ ...form, journal: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
//           >
//             <FiSave size={14} /> Save
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
//           >
//             Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   const ConfForm = ({ item, onSave, onClose }: any) => {
//     const [form, setForm] = useState(
//       item || {
//         id: genId(),
//         image: "",
//         icon: "🌍",
//         title: "",
//         description: "",
//         badge: "",
//       },
//     );
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Image URL
//           </label>
//           <input
//             value={form.image}
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Icon Emoji
//           </label>
//           <input
//             value={form.icon}
//             onChange={(e) => setForm({ ...form, icon: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Title
//           </label>
//           <input
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Description
//           </label>
//           <textarea
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             rows={4}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Badge
//           </label>
//           <input
//             value={form.badge}
//             onChange={(e) => setForm({ ...form, badge: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
//           >
//             <FiSave size={14} /> Save
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
//           >
//             Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   const SkillForm = ({ item, onSave, onClose }: any) => {
//     const [form, setForm] = useState(
//       item || { id: genId(), label: "", level: "Intermediate", width: 70 },
//     );
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Skill Name
//           </label>
//           <input
//             value={form.label}
//             onChange={(e) => setForm({ ...form, label: e.target.value })}
//             className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Level
//           </label>
//           <div className="flex gap-2 flex-wrap">
//             {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
//               <motion.button
//                 key={l}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setForm({ ...form, level: l })}
//                 className={`px-4 py-2 rounded-xl text-xs font-mono ${form.level === l ? "bg-[#d4ff7d]/20 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]"} border transition`}
//               >
//                 {l}
//               </motion.button>
//             ))}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
//             Proficiency: {form.width}%
//           </label>
//           <input
//             type="range"
//             min={10}
//             max={100}
//             value={form.width}
//             onChange={(e) => setForm({ ...form, width: +e.target.value })}
//             className="w-full accent-[#d4ff7d]"
//           />
//         </div>
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSave(form)}
//             className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
//           >
//             <FiSave size={14} /> Save
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
//           >
//             Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#081c15] text-[#fefae0] font-['DM_Mono'] overflow-x-hidden">
//       {/* Save Indicator */}
//       <AnimatePresence>
//         {isAdmin && (saving || saveMsg) && (
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 100 }}
//             className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-[#d4ff7d]/15 border border-[#d4ff7d]/40 text-[#d4ff7d] backdrop-blur-md"
//           >
//             {saving ? (
//               <>
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 1 }}
//                 >
//                   <FiRefreshCw size={12} />
//                 </motion.div>{" "}
//                 Saving…
//               </>
//             ) : (
//               <>
//                 <FiCheck size={12} /> {saveMsg}
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* HERO SECTION */}
//       <section
//         id="hero"
//         className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
//       >
//         <div className="absolute inset-0">
//           {isAdmin ? (
//             <ImageUploader
//               currentUrl={data.hero.bgImage}
//               onUpload={(url) =>
//                 update({ ...data, hero: { ...data.hero, bgImage: url } })
//               }
//               className="w-full h-full"
//             />
//           ) : (
//             <img
//               src={data.hero.bgImage}
//               className="w-full h-full object-cover"
//               alt="hero"
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#081c15]/30 via-[#081c15]/10 to-[#081c15]" />
//         </div>

//         {/* Animated firefly particles */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {[...Array(30)].map((_, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
//               transition={{
//                 duration: 3 + Math.random() * 4,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//               className="absolute w-1 h-1 rounded-full bg-[#d4ff7d] shadow-[0_0_10px_#d4ff7d]"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] text-[11px] tracking-wide backdrop-blur-sm"
//           >
//             <EditText
//               value={data.hero.tag}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, tag: v } })
//               }
//               isAdmin={isAdmin}
//             />
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-6xl md:text-8xl font-light leading-tight mb-6 font-['Cormorant_Garamond']"
//           >
//             <EditText
//               value={data.hero.name}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, name: v } })
//               }
//               isAdmin={isAdmin}
//               tag="span"
//             />
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-sm tracking-[0.2em] uppercase mb-8 text-[#52b788]"
//           >
//             <EditText
//               value={data.hero.title}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, title: v } })
//               }
//               isAdmin={isAdmin}
//             />
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-[#fefae0]/80"
//           >
//             <EditText
//               value={data.hero.description}
//               onChange={(v) =>
//                 update({ ...data, hero: { ...data.hero, description: v } })
//               }
//               isAdmin={isAdmin}
//               multiline
//             />
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="mt-12 flex flex-wrap justify-center gap-4"
//           >
//             <motion.a
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               href="#about"
//               className="px-8 py-3.5 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] transition-all shadow-lg shadow-[#d4ff7d]/20"
//             >
//               Explore Work
//             </motion.a>
//             <motion.a
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               href="#contact"
//               className="px-8 py-3.5 rounded-xl text-sm font-mono border border-[#52b788]/50 bg-[#52b788]/10 transition-all"
//             >
//               Get in Touch
//             </motion.a>
//           </motion.div>
//         </div>

//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 1.5 }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2"
//         >
//           <FiChevronDown className="text-[#52b788]/50" size={20} />
//         </motion.div>
//       </section>

//       {/* STATS SECTION */}
//       <section className="py-16 px-6 border-y border-[#52b788]/10 bg-[#0d2818]/50 backdrop-blur-sm">
//         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//           {data.stats.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.5 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//             >
//               <div className="text-4xl md:text-5xl font-light text-[#d4ff7d] mb-1">
//                 {isAdmin ? (
//                   <input
//                     type="number"
//                     value={s.count}
//                     onChange={(e) => {
//                       const ss = [...data.stats];
//                       ss[i].count = +e.target.value;
//                       update({ ...data, stats: ss });
//                     }}
//                     className="w-20 text-center bg-transparent border-b border-[#d4ff7d]/30 text-inherit text-4xl outline-none"
//                   />
//                 ) : (
//                   s.count
//                 )}
//               </div>
//               <p className="text-[11px] tracking-wider uppercase text-[#52b788]">
//                 <EditText
//                   value={s.label}
//                   onChange={(v) => {
//                     const ss = [...data.stats];
//                     ss[i].label = v;
//                     update({ ...data, stats: ss });
//                   }}
//                   isAdmin={isAdmin}
//                 />
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* MARQUEE */}
//       <div className="py-5 overflow-hidden border-b border-[#52b788]/10">
//         <div ref={marqueeRef} className="flex gap-10 whitespace-nowrap">
//           {[...data.marqueeItems, ...data.marqueeItems].map((item, i) => (
//             <span
//               key={i}
//               className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#52b788]/60"
//             >
//               <GiBugNet className="text-[#d4ff7d]/60" size={12} /> {item}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* ABOUT SECTION */}
//       <section id="about" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="relative"
//           >
//             <div className="absolute -inset-4 rounded-3xl bg-[#52b788]/10 blur-2xl" />
//             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#52b788]/40">
//               {isAdmin ? (
//                 <ImageUploader
//                   currentUrl={data.about.image}
//                   onUpload={(url) =>
//                     update({ ...data, about: { ...data.about, image: url } })
//                   }
//                   className="w-full h-full"
//                 />
//               ) : (
//                 <img
//                   src={data.about.image}
//                   className="w-full h-full object-cover"
//                   alt="about"
//                 />
//               )}
//             </div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//               className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[#d4ff7d] text-[#081c15] text-xs font-mono flex items-center gap-2"
//             >
//               <HiOutlineAcademicCap size={14} />{" "}
//               <EditText
//                 value={data.about.badgeText}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, badgeText: v } })
//                 }
//                 isAdmin={isAdmin}
//               />
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <p className="text-[11px] tracking-[0.2em] uppercase text-[#52b788] mb-4">
//               About Me
//             </p>
//             <h2 className="text-4xl md:text-5xl font-light mb-8 font-['Cormorant_Garamond'] leading-tight">
//               <EditText
//                 value={data.about.title}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, title: v } })
//                 }
//                 isAdmin={isAdmin}
//                 multiline
//                 tag="span"
//               />
//             </h2>
//             <div className="space-y-4 text-[#fefae0]/80 leading-relaxed mb-8">
//               <EditText
//                 value={data.about.paragraph1}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, paragraph1: v } })
//                 }
//                 isAdmin={isAdmin}
//                 tag="p"
//                 multiline
//               />
//               <EditText
//                 value={data.about.paragraph2}
//                 onChange={(v) =>
//                   update({ ...data, about: { ...data.about, paragraph2: v } })
//                 }
//                 isAdmin={isAdmin}
//                 tag="p"
//                 multiline
//               />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {data.about.tags.map((t, i) => (
//                 <motion.span
//                   key={i}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.05 }}
//                   className="px-3 py-1.5 rounded-lg text-[11px] font-mono bg-[#52b788]/10 border border-[#52b788]/20 text-[#b7e4c7] flex items-center gap-1"
//                 >
//                   <MdOutlineEco size={10} /> {t}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* CAREER SECTION */}
//       <section id="experience" className="py-28 px-6 bg-[#081715]/50">
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle
//             eyebrow="Career Timeline"
//             title="Field Work & Research Projects"
//           />
//           <div className="flex justify-center gap-3 mb-10">
//             {(["all", "work", "research"] as const).map((f) => (
//               <motion.button
//                 key={f}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setActiveFilter(f)}
//                 className={`px-5 py-2 rounded-xl text-xs font-mono uppercase transition-all ${activeFilter === f ? "bg-[#d4ff7d]/15 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]/60"} border`}
//               >
//                 {f === "all"
//                   ? "✦ All"
//                   : f === "work"
//                     ? "💼 Work"
//                     : "🔬 Research"}
//               </motion.button>
//             ))}
//           </div>
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setCareerModal({ open: true, item: null })}
//               label="Add Career Card"
//             />
//           )}
//           <div className="grid md:grid-cols-2 gap-6">
//             {filteredCareer.map((card, idx) => (
//               <motion.div
//                 key={card.id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative rounded-2xl overflow-hidden border border-[#52b788]/20 bg-gradient-to-br from-[#0d2818] to-[#081c15] shadow-xl"
//               >
//                 <div className="h-48 overflow-hidden">
//                   <motion.img
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     src={card.image}
//                     className="w-full h-full object-cover"
//                     alt={card.role}
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="inline-block px-2 py-1 rounded-md text-[9px] font-mono uppercase mb-3 bg-[#d4ff7d]/10 border border-[#d4ff7d]/30 text-[#d4ff7d]">
//                     {card.type === "work" ? "💼 Work" : "🔬 Research"}
//                   </div>
//                   <p className="text-[11px] uppercase text-[#52b788] mb-1">
//                     {card.org}
//                   </p>
//                   <h3 className="text-xl font-light mb-1 font-['Cormorant_Garamond']">
//                     {card.role}
//                   </h3>
//                   <p className="text-xs text-[#fefae0]/40 mb-4">{card.date}</p>
//                   <ul className="space-y-2">
//                     {card.bullets.slice(0, 3).map((b, i) => (
//                       <motion.li
//                         key={i}
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.05 }}
//                         className="flex gap-2 text-sm text-[#fefae0]/70"
//                       >
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] mt-2" />{" "}
//                         {b}
//                       </motion.li>
//                     ))}
//                     {card.bullets.length > 3 && (
//                       <li className="text-xs text-[#52b788]">
//                         +{card.bullets.length - 3} more
//                       </li>
//                     )}
//                   </ul>
//                   <motion.button
//                     whileHover={{ x: 5 }}
//                     onClick={() =>
//                       setViewModal({ open: true, item: card, type: "career" })
//                     }
//                     className="mt-4 text-sm text-[#52b788] flex gap-2 items-center"
//                   >
//                     View details <FiExternalLink size={12} />
//                   </motion.button>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setCareerModal({ open: true, item: card })}
//                     onDelete={() => {
//                       if (confirm("Delete?"))
//                         update({
//                           ...data,
//                           careerCards: data.careerCards.filter(
//                             (c) => c.id !== card.id,
//                           ),
//                         });
//                     }}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PROJECTS SECTION */}
//       <section id="projects" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle eyebrow="Field Studies" title="Research Projects" />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setProjectModal({ open: true, item: null })}
//               label="Add Project"
//             />
//           )}
//           <div className="grid md:grid-cols-2 gap-6">
//             {data.projects.map((p, idx) => (
//               <motion.div
//                 key={p.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative rounded-xl overflow-hidden border border-[#52b788]/15 bg-gradient-to-br from-[#0d2818] to-[#081c15] cursor-pointer"
//               >
//                 <div className="h-44 overflow-hidden">
//                   <motion.img
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     src={p.image}
//                     className="w-full h-full object-cover"
//                     alt={p.title}
//                   />
//                 </div>
//                 <div className="p-5">
//                   <p className="text-[10px] uppercase text-[#52b788] mb-1">
//                     {p.tag}
//                   </p>
//                   <h3 className="text-lg font-light mb-2">{p.title}</h3>
//                   <p className="text-sm text-[#fefae0]/60">
//                     {p.description.slice(0, 85)}…
//                   </p>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setProjectModal({ open: true, item: p })}
//                     onDelete={() => {
//                       if (confirm("Delete?"))
//                         update({
//                           ...data,
//                           projects: data.projects.filter((x) => x.id !== p.id),
//                         });
//                     }}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PUBLICATIONS */}
//       <section id="publications" className="py-28 px-6 bg-[#081715]/50">
//         <div className="max-w-4xl mx-auto">
//           <SectionTitle eyebrow="Academic Output" title="Publications" />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setPubModal({ open: true, item: null })}
//               label="Add Publication"
//             />
//           )}
//           <div className="space-y-4">
//             {data.publications.map((p, i) => (
//               <motion.div
//                 key={p.id}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.05 }}
//                 whileHover={{ x: 5 }}
//                 className="group relative p-5 rounded-xl bg-[#0d2818]/80 border border-[#52b788]/10"
//               >
//                 <div className="flex gap-4">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     className="w-10 h-10 rounded-lg bg-[#d4ff7d]/10 border border-[#d4ff7d]/20 flex items-center justify-center text-[#d4ff7d] font-mono text-lg"
//                   >
//                     {i + 1}
//                   </motion.div>
//                   <div className="flex-1">
//                     <h3 className="text-base font-light">{p.title}</h3>
//                     <p className="text-xs text-[#fefae0]/60">{p.authors}</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <HiOutlineDocumentText
//                         className="text-[#52b788]"
//                         size={12}
//                       />
//                       <span className="text-[11px] text-[#52b788]">
//                         {p.journal}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setPubModal({ open: true, item: p })}
//                     onDelete={() => {
//                       if (confirm("Delete?"))
//                         update({
//                           ...data,
//                           publications: data.publications.filter(
//                             (x) => x.id !== p.id,
//                           ),
//                         });
//                     }}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CONFERENCES */}
//       <section id="conferences" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle
//             eyebrow="Events & Outreach"
//             title="Conferences & International Events"
//           />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setConfModal({ open: true, item: null })}
//               label="Add Event"
//             />
//           )}
//           <div className="grid md:grid-cols-2 gap-6">
//             {data.conferences.map((c, idx) => (
//               <motion.div
//                 key={c.id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative rounded-2xl overflow-hidden border border-[#52b788]/15 bg-gradient-to-br from-[#0d2818] to-[#081c15]"
//               >
//                 <div className="h-48 overflow-hidden relative">
//                   <motion.img
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     src={c.image}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#081c15] to-transparent" />
//                   <div className="absolute bottom-3 left-4 text-3xl">
//                     {c.icon}
//                   </div>
//                 </div>
//                 <div className="p-5">
//                   <h3 className="text-xl font-light mb-2">{c.title}</h3>
//                   <p className="text-sm text-[#fefae0]/70 mb-3">
//                     {c.description}
//                   </p>
//                   <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d4ff7d]/10 border border-[#d4ff7d]/20 w-fit">
//                     <FiAward className="text-[#d4ff7d]" size={12} />
//                     <span className="text-[10px] font-mono text-[#d4ff7d]">
//                       {c.badge}
//                     </span>
//                   </div>
//                 </div>
//                 {isAdmin && (
//                   <CardActions
//                     onEdit={() => setConfModal({ open: true, item: c })}
//                     onDelete={() => {
//                       if (confirm("Delete?"))
//                         update({
//                           ...data,
//                           conferences: data.conferences.filter(
//                             (x) => x.id !== c.id,
//                           ),
//                         });
//                     }}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SKILLS */}
//       <section id="skills" className="py-28 px-6 bg-[#081715]/50">
//         <div className="max-w-6xl mx-auto">
//           <SectionTitle eyebrow="Expertise" title="Skills & Proficiencies" />
//           {isAdmin && (
//             <AdminBar
//               onAdd={() => setSkillModal({ open: true, item: null })}
//               label="Add Skill"
//             />
//           )}
//           <div className="grid md:grid-cols-2 gap-12 items-start">
//             <div className="space-y-5">
//               {data.skills.map((s, idx) => (
//                 <motion.div
//                   key={s.id}
//                   initial={{ opacity: 0, x: -30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="group relative"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm text-[#fefae0]">{s.label}</span>
//                     <span className="text-[10px] px-2 py-1 rounded-md bg-[#52b788]/20 border border-[#52b788]/30 text-[#52b788]">
//                       {s.level}
//                     </span>
//                   </div>
//                   <div className="h-2 rounded-full bg-[#52b788]/20 overflow-hidden">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       whileInView={{ width: `${s.width}%` }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 1, ease: "easeOut" }}
//                       className="h-full rounded-full bg-gradient-to-r from-[#52b788] to-[#d4ff7d]"
//                     />
//                   </div>
//                   {isAdmin && (
//                     <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
//                       <button
//                         onClick={() => setSkillModal({ open: true, item: s })}
//                         className="w-6 h-6 rounded-md bg-[#d4ff7d]/20 text-[#d4ff7d]"
//                       >
//                         <FiEdit2 size={10} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (confirm("Delete?"))
//                             update({
//                               ...data,
//                               skills: data.skills.filter((x) => x.id !== s.id),
//                             });
//                         }}
//                         className="w-6 h-6 rounded-md bg-[#ef4444]/20 text-[#fca5a5]"
//                       >
//                         <FiTrash2 size={10} />
//                       </button>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <div className="absolute -inset-6 rounded-3xl bg-[#52b788]/10 blur-3xl" />
//               <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#52b788]/40">
//                 {isAdmin ? (
//                   <ImageUploader
//                     currentUrl={data.skillsImage}
//                     onUpload={(url) => update({ ...data, skillsImage: url })}
//                     className="w-full h-full"
//                   />
//                 ) : (
//                   <img
//                     src={data.skillsImage}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//                 <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-gradient-to-br from-[#0d2818] to-[#081c15] border border-[#52b788]/40">
//                   <GiForestCamp className="text-[#52b788]" size={24} />
//                   <p className="text-[10px] font-mono text-[#52b788] mt-1">
//                     Field Researcher
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section id="contact" className="py-28 px-6">
//         <div className="max-w-5xl mx-auto">
//           <SectionTitle
//             eyebrow="Get in Touch"
//             title="Contact & Collaboration"
//           />
//           <div className="grid md:grid-cols-2 gap-12">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <p className="text-lg leading-relaxed mb-8 font-['Cormorant_Garamond'] text-[#fefae0]/80">
//                 <EditText
//                   value={data.contact.description}
//                   onChange={(v) =>
//                     update({
//                       ...data,
//                       contact: { ...data.contact, description: v },
//                     })
//                   }
//                   isAdmin={isAdmin}
//                   multiline
//                   tag="span"
//                 />
//               </p>
//               <div className="space-y-4">
//                 {[
//                   { icon: <FiMapPin />, label: "Location", key: "location" },
//                   { icon: <FiMail />, label: "Email", key: "email" },
//                   { icon: <FiPhone />, label: "Phone", key: "phone" },
//                 ].map(({ icon, label, key }) => (
//                   <motion.div
//                     key={key}
//                     whileHover={{ x: 5 }}
//                     className="flex items-center gap-4"
//                   >
//                     <div className="w-12 h-12 rounded-xl bg-[#52b788]/10 border border-[#52b788]/40 flex items-center justify-center text-[#52b788]">
//                       {icon}
//                     </div>
//                     <div>
//                       <p className="text-[10px] tracking-[0.1em] uppercase text-[#52b788]/60">
//                         {label}
//                       </p>
//                       <EditText
//                         value={
//                           data.contact[
//                             key as keyof typeof data.contact
//                           ] as string
//                         }
//                         onChange={(v) =>
//                           update({
//                             ...data,
//                             contact: { ...data.contact, [key]: v },
//                           })
//                         }
//                         isAdmin={isAdmin}
//                         className="text-sm font-mono text-[#fefae0]"
//                       />
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <p className="text-[11px] tracking-[0.2em] uppercase text-[#52b788] mb-6">
//                 Connect Online
//               </p>
//               <div className="space-y-3">
//                 <motion.div
//                   whileHover={{ y: -3 }}
//                   className="p-5 rounded-xl bg-[#0d2818]/80 border border-[#52b788]/20"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 flex items-center justify-center text-[#0A66C2]">
//                         <FiLinkedin size={18} />
//                       </div>
//                       <span className="text-sm text-[#fefae0]">LinkedIn</span>
//                     </div>
//                     <a
//                       href={data.contact.linkedin}
//                       target="_blank"
//                       className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] hover:gap-2 transition"
//                     >
//                       Visit <FiExternalLink size={10} />
//                     </a>
//                   </div>
//                   {isAdmin && (
//                     <input
//                       value={data.contact.linkedin}
//                       onChange={(e) =>
//                         update({
//                           ...data,
//                           contact: {
//                             ...data.contact,
//                             linkedin: e.target.value,
//                           },
//                         })
//                       }
//                       className="mt-3 w-full p-2 rounded-lg text-xs bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//                     />
//                   )}
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ y: -3 }}
//                   className="p-5 rounded-xl bg-[#0d2818]/80 border border-[#52b788]/20"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-[#00CCBB]/20 border border-[#00CCBB]/40 flex items-center justify-center text-[#00CCBB]">
//                         <FaResearchgate size={18} />
//                       </div>
//                       <span className="text-sm text-[#fefae0]">
//                         ResearchGate
//                       </span>
//                     </div>
//                     <a
//                       href={data.contact.researchgate}
//                       target="_blank"
//                       className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] hover:gap-2 transition"
//                     >
//                       Visit <FiExternalLink size={10} />
//                     </a>
//                   </div>
//                   {isAdmin && (
//                     <input
//                       value={data.contact.researchgate}
//                       onChange={(e) =>
//                         update({
//                           ...data,
//                           contact: {
//                             ...data.contact,
//                             researchgate: e.target.value,
//                           },
//                         })
//                       }
//                       className="mt-3 w-full p-2 rounded-lg text-xs bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
//                     />
//                   )}
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ y: -3 }}
//                   className="p-5 rounded-xl bg-[#d4ff7d]/5 border border-[#d4ff7d]/20"
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <HiOutlineLightBulb className="text-[#d4ff7d]" size={16} />
//                     <span className="text-xs font-mono text-[#d4ff7d]">
//                       Open to collaborations
//                     </span>
//                   </div>
//                   <p className="text-xs text-[#fefae0]/50">
//                     Research · Fieldwork · Speaking · Conservation
//                   </p>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="py-10 px-6 border-t border-[#52b788]/10 text-center">
//         <div className="space-y-2">
//           <EditText
//             value={data.footer.copy}
//             onChange={(v) =>
//               update({ ...data, footer: { ...data.footer, copy: v } })
//             }
//             isAdmin={isAdmin}
//             className="text-[11px] font-mono text-[#52b788]/50"
//           />
//           <EditText
//             value={data.footer.tagline}
//             onChange={(v) =>
//               update({ ...data, footer: { ...data.footer, tagline: v } })
//             }
//             isAdmin={isAdmin}
//             className="text-[11px] font-mono text-[#52b788]/30"
//           />
//         </div>
//       </footer>

//       {/* MODALS */}
//       <AnimatePresence>
//         {careerModal.open && (
//           <Modal
//             title={careerModal.item ? "Edit Career" : "Add Career"}
//             onClose={() => setCareerModal({ open: false, item: null })}
//           >
//             <CareerForm
//               item={careerModal.item}
//               onSave={(c: CareerCard) => {
//                 const cards = careerModal.item
//                   ? data.careerCards.map((x) => (x.id === c.id ? c : x))
//                   : [...data.careerCards, c];
//                 update({ ...data, careerCards: cards });
//                 setCareerModal({ open: false, item: null });
//               }}
//               onClose={() => setCareerModal({ open: false, item: null })}
//             />
//           </Modal>
//         )}
//         {projectModal.open && (
//           <Modal
//             title={projectModal.item ? "Edit Project" : "Add Project"}
//             onClose={() => setProjectModal({ open: false, item: null })}
//           >
//             <ProjectForm
//               item={projectModal.item}
//               onSave={(p: ProjectCard) => {
//                 const projects = projectModal.item
//                   ? data.projects.map((x) => (x.id === p.id ? p : x))
//                   : [...data.projects, p];
//                 update({ ...data, projects });
//                 setProjectModal({ open: false, item: null });
//               }}
//               onClose={() => setProjectModal({ open: false, item: null })}
//             />
//           </Modal>
//         )}
//         {pubModal.open && (
//           <Modal
//             title={pubModal.item ? "Edit Publication" : "Add Publication"}
//             onClose={() => setPubModal({ open: false, item: null })}
//           >
//             <PubForm
//               item={pubModal.item}
//               onSave={(p: Publication) => {
//                 const pubs = pubModal.item
//                   ? data.publications.map((x) => (x.id === p.id ? p : x))
//                   : [...data.publications, p];
//                 update({ ...data, publications: pubs });
//                 setPubModal({ open: false, item: null });
//               }}
//               onClose={() => setPubModal({ open: false, item: null })}
//             />
//           </Modal>
//         )}
//         {confModal.open && (
//           <Modal
//             title={confModal.item ? "Edit Event" : "Add Event"}
//             onClose={() => setConfModal({ open: false, item: null })}
//           >
//             <ConfForm
//               item={confModal.item}
//               onSave={(c: Conference) => {
//                 const confs = confModal.item
//                   ? data.conferences.map((x) => (x.id === c.id ? c : x))
//                   : [...data.conferences, c];
//                 update({ ...data, conferences: confs });
//                 setConfModal({ open: false, item: null });
//               }}
//               onClose={() => setConfModal({ open: false, item: null })}
//             />
//           </Modal>
//         )}
//         {skillModal.open && (
//           <Modal
//             title={skillModal.item ? "Edit Skill" : "Add Skill"}
//             onClose={() => setSkillModal({ open: false, item: null })}
//           >
//             <SkillForm
//               item={skillModal.item}
//               onSave={(s: Skill) => {
//                 const skills = skillModal.item
//                   ? data.skills.map((x) => (x.id === s.id ? s : x))
//                   : [...data.skills, s];
//                 update({ ...data, skills });
//                 setSkillModal({ open: false, item: null });
//               }}
//               onClose={() => setSkillModal({ open: false, item: null })}
//             />
//           </Modal>
//         )}
//         {viewModal.open && viewModal.item && (
//           <Modal
//             title="Details"
//             onClose={() => setViewModal({ open: false, item: null, type: "" })}
//           >
//             {viewModal.type === "career" &&
//               (() => {
//                 const c = viewModal.item as CareerCard;
//                 return (
//                   <div>
//                     <img
//                       src={c.image}
//                       className="w-full h-48 object-cover rounded-xl mb-4"
//                     />
//                     <div className="mb-2 inline-block px-2 py-1 rounded-md text-[10px] font-mono bg-[#d4ff7d]/20 text-[#d4ff7d]">
//                       {c.type}
//                     </div>
//                     <p className="text-[11px] uppercase text-[#52b788]">
//                       {c.org}
//                     </p>
//                     <h3 className="text-2xl font-light mb-2">{c.role}</h3>
//                     <p className="text-xs text-[#fefae0]/40 mb-4">{c.date}</p>
//                     <p className="text-[11px] uppercase text-[#52b788] mb-2">
//                       Key Responsibilities
//                     </p>
//                     <ul className="space-y-2">
//                       {c.bullets.map((b, i) => (
//                         <li key={i} className="flex gap-2">
//                           <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] mt-2" />
//                           {b}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 );
//               })()}
//             {viewModal.type === "project" &&
//               (() => {
//                 const p = viewModal.item as ProjectCard;
//                 return (
//                   <div>
//                     <img
//                       src={p.image}
//                       className="w-full h-48 object-cover rounded-xl mb-4"
//                     />
//                     <p className="text-[11px] uppercase text-[#52b788]">
//                       {p.tag}
//                     </p>
//                     <h3 className="text-2xl font-light mb-4">{p.title}</h3>
//                     <p className="text-base leading-relaxed text-[#fefae0]/80">
//                       {p.description}
//                     </p>
//                   </div>
//                 );
//               })()}
//           </Modal>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "./AdminContext";
import ImageUploader from "./ImageUploader";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiExternalLink,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheck,
  FiChevronDown,
  FiAward,
  FiSave,
  FiRefreshCw,
  FiMenu,
} from "react-icons/fi";
import {
  HiOutlineAcademicCap,
  HiOutlineLightBulb,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { GiBugNet, GiForestCamp } from "react-icons/gi";
import { MdOutlineEco } from "react-icons/md";
import { FaResearchgate } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LoginModal from "./LoginModal";

gsap.registerPlugin(ScrollToPlugin);

// ─── Types ────────────────────────────────────────────────────────────────────
interface CareerCard {
  _id?: string;
  id: string;
  image: string;
  org: string;
  role: string;
  date: string;
  type: "work" | "research";
  bullets: string[];
}

interface ProjectCard {
  _id?: string;
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
}

interface Publication {
  _id?: string;
  id: string;
  title: string;
  authors: string;
  journal: string;
}

interface Conference {
  _id?: string;
  id: string;
  image: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
}

interface Skill {
  id: string;
  label: string;
  level: string;
  width: number;
}

interface PortfolioData {
  _id?: string;
  hero: {
    tag: string;
    name: string;
    title: string;
    description: string;
    bgImage: string;
  };
  stats: Array<{ count: number; label: string }>;
  marqueeItems: string[];
  about: {
    image: string;
    badgeText: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    tags: string[];
  };
  careerCards: CareerCard[];
  projects: ProjectCard[];
  publications: Publication[];
  conferences: Conference[];
  skills: Skill[];
  skillsImage: string;
  contact: {
    description: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    researchgate: string;
  };
  footer: { copy: string; tagline: string };
}

const genId = () => Math.random().toString(36).slice(2, 9);

const DEFAULT_DATA: PortfolioData = {
  hero: {
    tag: "🪲 Wildlife Researcher & Conservation Biologist",
    name: "Ashutosh Dey",
    title: "Project Biologist · Firefly Ecology · Biodiversity Conservation",
    description:
      "Bridging the gap between ecological science and community action — studying fireflies, documenting biodiversity, and working at the frontier of human-wildlife harmony.",
    bgImage:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1600&q=80",
  },
  stats: [
    { count: 5, label: "Publications" },
    { count: 3, label: "Int'l Events" },
    { count: 4, label: "Research Projects" },
    { count: 2, label: "Years Field Research" },
  ],
  marqueeItems: [
    "Firefly Ecology",
    "Wildlife Conservation",
    "Biodiversity Research",
    "Nocturnal Surveys",
    "Human-Wildlife Conflict",
    "Community Science",
    "IUCN SSC",
    "Odisha · Karnataka · Kerala",
  ],
  about: {
    image:
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
    badgeText: "M.Sc. Wildlife Biodiversity & Conservation",
    title: "A Naturalist at heart, a Scientist by training",
    paragraph1:
      "I completed my M.Sc. in Wildlife Biodiversity & Conservation from North Orissa University, Odisha. Over the years I have actively worked on biodiversity assessment, ecological surveys, firefly research, and conservation-based field projects across India's remarkable forest landscapes.",
    paragraph2:
      "Currently working as a Project Biologist in a Human-Wildlife Conflict CSR Project, contributing to ecological monitoring, field surveys, conservation awareness, and wildlife research — combining rigorous science with community participation for long-term biodiversity conservation.",
    tags: [
      "Firefly Ecology",
      "Human-Wildlife Conflict",
      "Biodiversity Monitoring",
      "Nocturnal Surveys",
      "GIS Mapping",
      "Community Conservation",
      "Ecological Documentation",
    ],
  },
  careerCards: [
    {
      id: genId(),
      image:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
      org: "CSR Conservation Project · Present",
      role: "Project Biologist",
      date: "Human-Wildlife Conflict Division",
      type: "work",
      bullets: [
        "Human-wildlife conflict mitigation activities",
        "Biodiversity monitoring and ecological surveys",
        "Community awareness and conservation outreach",
        "GPS-based field navigation and wildlife data collection",
        "Coordination with local stakeholders and forest officials",
      ],
    },
    {
      id: genId(),
      image:
        "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=800&q=80",
      org: "EMPRI, Bangalore · Nov 2022 – Mar 2024",
      role: "Field Cum-Lab Assistant",
      date: "Firefly Identification & Bioecology, Karnataka",
      type: "research",
      bullets: [
        "Nocturnal field surveys for firefly monitoring",
        "Firefly behavioral observations and species documentation",
        "Habitat assessment and biodiversity recording",
        "Scientific documentation and research coordination",
        "Firefly rearing",
      ],
    },
  ],
  projects: [
    {
      id: genId(),
      image:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
      tag: "Conflict Study · Odisha",
      title: "Human-Elephant Conflict Assessment",
      description:
        "Case study in Rairangpur Forest Division focusing on conflict assessment, community interactions, and evidence-based mitigation approaches.",
    },
    {
      id: genId(),
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      tag: "Entomology · Odisha",
      title: "Lepidoptera & Odonata Biodiversity",
      description:
        "Field-based assessment in Badampahar Forest Range documenting species diversity, ecological significance and conservation status.",
    },
  ],
  publications: [
    {
      id: genId(),
      title:
        "Companions of the 'fun-loving' fireflies in the wild: friends or foes?",
      authors: "Chakravarthy A.K., Parvez, Ashutosh Dey & Amlan Das (2023)",
      journal: "Indian Entomologist",
    },
    {
      id: genId(),
      title:
        "Assessment and Status of Lepidoptera and Odonata of Rairangpur Forest Division, Odisha, India",
      authors: "Parvez et al. (2023)",
      journal: "Biodiversity Research Publication",
    },
  ],
  conferences: [
    {
      id: genId(),
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      icon: "🌍",
      title: "International Firefly Conclave",
      description:
        "Organized a landmark international conclave at Kannur University, Kerala, bringing together global firefly researchers, ecologists, and conservationists.",
      badge: "Organizer · Kannur University, Kerala",
    },
  ],
  skills: [
    {
      id: genId(),
      label: "Wildlife Field Survey Techniques",
      level: "Expert",
      width: 92,
    },
    {
      id: genId(),
      label: "Nocturnal Biodiversity Surveys",
      level: "Expert",
      width: 90,
    },
    {
      id: genId(),
      label: "QGIS & Ecological Mapping",
      level: "Intermediate",
      width: 60,
    },
  ],
  skillsImage:
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
  contact: {
    description:
      "Open to research collaborations, fieldwork opportunities, conservation projects, and speaking engagements related to firefly ecology and biodiversity conservation.",
    location: "Balasore, Odisha, India",
    email: "ashutoshday90@gmail.com",
    phone: "+91 6372970772",
    linkedin: "https://www.linkedin.com/in/ashutosh-dey-1b4a0b1ab",
    researchgate: "https://www.researchgate.net/profile/Ashutosh-Dey",
  },
  footer: {
    copy: "© 2025 Ashutosh Dey · Wildlife Researcher",
    tagline: "🪲 Illuminating biodiversity, one firefly at a time",
  },
};

// ─── Editable Text Component ─────────────────────────────────────────────────
function EditText({
  value,
  onChange,
  isAdmin,
  tag = "span",
  className = "",
  multiline = false,
}: any) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const Tag = tag;
  useEffect(() => setDraft(value), [value]);

  if (!isAdmin) return <Tag className={className}>{value}</Tag>;
  if (editing) {
    return (
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="inline-flex flex-col gap-1"
      >
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className="w-full min-w-[260px] p-2 text-sm rounded-lg bg-[#0a1f14] text-[#fefae0] border border-[#52b788] outline-none font-mono"
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="p-2 text-sm rounded-lg bg-[#0a1f14] text-[#fefae0] border border-[#52b788] outline-none font-mono min-w-[200px]"
          />
        )}
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onChange(draft);
              setEditing(false);
            }}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#d4ff7d] text-[#081c15] font-bold"
          >
            <FiCheck size={10} /> Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/40"
          >
            <FiX size={10} /> Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  }
  return (
    <Tag
      className={`${className} cursor-pointer group/edit`}
      onClick={() => setEditing(true)}
    >
      {value}
      <FiEdit2
        size={10}
        className="inline ml-1 opacity-0 group-hover/edit:opacity-70 transition-opacity text-[#d4ff7d]"
      />
    </Tag>
  );
}

// ─── Modal Component ─────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-[#040e08]/95 backdrop-blur-2xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0d2818] to-[#081c15] border border-[#52b788]/40 shadow-2xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-[#52b788]/20">
          <h3 className="font-semibold text-lg text-[#fefae0] font-['Syne']">
            {title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#52b788]/20 transition"
          >
            <FiX className="text-[#52b788]" />
          </motion.button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// ─── Admin Action Components ─────────────────────────────────────────────────
function AdminBar({ onAdd, label }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex justify-end mb-8"
    >
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider bg-[#d4ff7d]/10 border border-[#d4ff7d]/40 text-[#d4ff7d]"
      >
        <FiPlus size={14} /> {label}
      </motion.button>
    </motion.div>
  );
}

function CardActions({ onEdit, onDelete }: any) {
  return (
    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onEdit}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#d4ff7d]/20 border border-[#d4ff7d]/50 text-[#d4ff7d] hover:bg-[#d4ff7d]/40 transition"
      >
        <FiEdit2 size={12} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ef4444]/20 border border-[#ef4444]/50 text-[#fca5a5] hover:bg-[#ef4444]/40 transition"
      >
        <FiTrash2 size={12} />
      </motion.button>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-[#52b788] mb-3">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-light text-[#fefae0] font-['Cormorant_Garamond']">
        {title}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 mx-auto h-0.5 bg-gradient-to-r from-transparent via-[#52b788] to-transparent"
      />
    </motion.div>
  );
}

// ─── Main Portfolio Component ────────────────────────────────────────────────
export default function Portfolio() {
  const { isAdmin } = useAdmin();
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "work" | "research">(
    "all",
  );

  // Modal states
  const [careerModal, setCareerModal] = useState<{
    open: boolean;
    item: CareerCard | null;
  }>({ open: false, item: null });
  const [projectModal, setProjectModal] = useState<{
    open: boolean;
    item: ProjectCard | null;
  }>({ open: false, item: null });
  const [pubModal, setPubModal] = useState<{
    open: boolean;
    item: Publication | null;
  }>({ open: false, item: null });
  const [confModal, setConfModal] = useState<{
    open: boolean;
    item: Conference | null;
  }>({ open: false, item: null });
  const [skillModal, setSkillModal] = useState<{
    open: boolean;
    item: Skill | null;
  }>({ open: false, item: null });
  const [viewModal, setViewModal] = useState<{
    open: boolean;
    item: any;
    type: string;
  }>({ open: false, item: null, type: "" });

  const marqueeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) {
          setData((prev) => ({
            ...prev,
            ...d,
            careerCards: d.careerCards || d.experience || [],
            projects: d.projects || [],
            publications: d.publications || [],
            conferences: d.conferences || [],
            skills: d.skills || [],
          }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // GSAP animations for marquee
    const el = marqueeRef.current;
    if (!el) return;
    let x = 0;
    const speed = 0.5;
    const half = el.scrollWidth / 2;
    const tick = () => {
      x -= speed;
      if (Math.abs(x) >= half) x = 0;
      el.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const save = useCallback(async (newData: PortfolioData) => {
    setSaving(true);
    try {
      await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      setSaveMsg("Saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch {
      setSaveMsg("Error saving");
    } finally {
      setSaving(false);
    }
  }, []);

  const update = useCallback(
    (newData: PortfolioData) => {
      setData(newData);
      if (isAdmin) save(newData);
    },
    [isAdmin, save],
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081c15]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">🪲</div>
          <p className="text-[#52b788] text-sm font-mono tracking-wide">
            Loading portfolio…
          </p>
        </motion.div>
      </div>
    );
  }

  const filteredCareer = data.careerCards.filter(
    (c) => activeFilter === "all" || c.type === activeFilter,
  );

  // Simple form helpers
  const CareerForm = ({ item, onSave, onClose }: any) => {
    const [form, setForm] = useState(
      item || {
        id: genId(),
        image: "",
        org: "",
        role: "",
        date: "",
        type: "work",
        bullets: [""],
      },
    );
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Type
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setForm({ ...form, type: "work" })}
              className={`flex-1 py-2.5 rounded-xl text-xs font-mono uppercase ${form.type === "work" ? "bg-[#d4ff7d]/20 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]"} border transition`}
            >
              💼 Work
            </button>
            <button
              onClick={() => setForm({ ...form, type: "research" })}
              className={`flex-1 py-2.5 rounded-xl text-xs font-mono uppercase ${form.type === "research" ? "bg-[#d4ff7d]/20 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]"} border transition`}
            >
              🔬 Research
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Image URL
          </label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0] outline-none focus:border-[#d4ff7d]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Organisation
          </label>
          <input
            value={form.org}
            onChange={(e) => setForm({ ...form, org: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Role
          </label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Date/Division
          </label>
          <input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Bullets
          </label>
          {form.bullets.map((b: string, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={b}
                onChange={(e) => {
                  const newBullets = [...form.bullets];
                  newBullets[i] = e.target.value;
                  setForm({ ...form, bullets: newBullets });
                }}
                className="flex-1 p-2 rounded-lg text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setForm({
                    ...form,
                    bullets: form.bullets.filter(
                      (_: any, j: number) => j !== i,
                    ),
                  })
                }
                className="px-3 rounded-lg border border-[#ef4444]/40 text-[#fca5a5]"
              >
                ✗
              </motion.button>
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setForm({ ...form, bullets: [...form.bullets, ""] })}
            className="w-full py-2 rounded-xl border border-dashed border-[#52b788]/40 text-[#52b788] text-xs flex items-center justify-center gap-2"
          >
            + Add bullet
          </motion.button>
        </div>
        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(form)}
            className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
          >
            <FiSave size={14} /> Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const ProjectForm = ({ item, onSave, onClose }: any) => {
    const [form, setForm] = useState(
      item || { id: genId(), image: "", tag: "", title: "", description: "" },
    );
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Image URL
          </label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Tag
          </label>
          <input
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Title
          </label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(form)}
            className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
          >
            <FiSave size={14} /> Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const PubForm = ({ item, onSave, onClose }: any) => {
    const [form, setForm] = useState(
      item || { id: genId(), title: "", authors: "", journal: "" },
    );
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Title
          </label>
          <textarea
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            rows={3}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Authors
          </label>
          <input
            value={form.authors}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Journal
          </label>
          <input
            value={form.journal}
            onChange={(e) => setForm({ ...form, journal: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(form)}
            className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
          >
            <FiSave size={14} /> Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const ConfForm = ({ item, onSave, onClose }: any) => {
    const [form, setForm] = useState(
      item || {
        id: genId(),
        image: "",
        icon: "🌍",
        title: "",
        description: "",
        badge: "",
      },
    );
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Image URL
          </label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Icon Emoji
          </label>
          <input
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Title
          </label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Badge
          </label>
          <input
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(form)}
            className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
          >
            <FiSave size={14} /> Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const SkillForm = ({ item, onSave, onClose }: any) => {
    const [form, setForm] = useState(
      item || { id: genId(), label: "", level: "Intermediate", width: 70 },
    );
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Skill Name
          </label>
          <input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full p-3 rounded-xl text-sm bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
          />
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Level
          </label>
          <div className="flex gap-2 flex-wrap">
            {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
              <motion.button
                key={l}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setForm({ ...form, level: l })}
                className={`px-4 py-2 rounded-xl text-xs font-mono ${form.level === l ? "bg-[#d4ff7d]/20 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]"} border transition`}
              >
                {l}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#52b788] block mb-2">
            Proficiency: {form.width}%
          </label>
          <input
            type="range"
            min={10}
            max={100}
            value={form.width}
            onChange={(e) => setForm({ ...form, width: +e.target.value })}
            className="w-full accent-[#d4ff7d]"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(form)}
            className="flex-1 py-3 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] flex items-center justify-center gap-2"
          >
            <FiSave size={14} /> Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm border border-[#52b788]/40 text-[#52b788]"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#081c15] text-[#fefae0] font-['DM_Mono'] overflow-x-hidden">
      {/* Save Indicator */}
      <AnimatePresence>
        {isAdmin && (saving || saveMsg) && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-[#d4ff7d]/15 border border-[#d4ff7d]/40 text-[#d4ff7d] backdrop-blur-md"
          >
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <FiRefreshCw size={12} />
                </motion.div>{" "}
                Saving…
              </>
            ) : (
              <>
                <FiCheck size={12} /> {saveMsg}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          {isAdmin ? (
            <ImageUploader
              currentUrl={data.hero.bgImage}
              onUpload={(url) =>
                update({ ...data, hero: { ...data.hero, bgImage: url } })
              }
              className="w-full h-full"
            />
          ) : (
            <img
              src={data.hero.bgImage}
              className="w-full h-full object-cover"
              alt="hero"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#081c15]/30 via-[#081c15]/10 to-[#081c15]" />
        </div>

        {/* Animated firefly particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-1 h-1 rounded-full bg-[#d4ff7d] shadow-[0_0_10px_#d4ff7d]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] text-[11px] tracking-wide backdrop-blur-sm"
          >
            <EditText
              value={data.hero.tag}
              onChange={(v) =>
                update({ ...data, hero: { ...data.hero, tag: v } })
              }
              isAdmin={isAdmin}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-light leading-tight mb-6 font-['Cormorant_Garamond']"
          >
            <EditText
              value={data.hero.name}
              onChange={(v) =>
                update({ ...data, hero: { ...data.hero, name: v } })
              }
              isAdmin={isAdmin}
              tag="span"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm tracking-[0.2em] uppercase mb-8 text-[#52b788]"
          >
            <EditText
              value={data.hero.title}
              onChange={(v) =>
                update({ ...data, hero: { ...data.hero, title: v } })
              }
              isAdmin={isAdmin}
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-[#fefae0]/80"
          >
            <EditText
              value={data.hero.description}
              onChange={(v) =>
                update({ ...data, hero: { ...data.hero, description: v } })
              }
              isAdmin={isAdmin}
              multiline
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#about"
              className="px-8 py-3.5 rounded-xl text-sm font-mono font-bold bg-[#d4ff7d] text-[#081c15] transition-all shadow-lg shadow-[#d4ff7d]/20"
            >
              Explore Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3.5 rounded-xl text-sm font-mono border border-[#52b788]/50 bg-[#52b788]/10 transition-all"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <FiChevronDown className="text-[#52b788]/50" size={20} />
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-6 border-y border-[#52b788]/10 bg-[#0d2818]/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {data.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-light text-[#d4ff7d] mb-1">
                {isAdmin ? (
                  <input
                    type="number"
                    value={s.count}
                    onChange={(e) => {
                      const ss = [...data.stats];
                      ss[i].count = +e.target.value;
                      update({ ...data, stats: ss });
                    }}
                    className="w-20 text-center bg-transparent border-b border-[#d4ff7d]/30 text-inherit text-4xl outline-none"
                  />
                ) : (
                  s.count
                )}
              </div>
              <p className="text-[11px] tracking-wider uppercase text-[#52b788]">
                <EditText
                  value={s.label}
                  onChange={(v) => {
                    const ss = [...data.stats];
                    ss[i].label = v;
                    update({ ...data, stats: ss });
                  }}
                  isAdmin={isAdmin}
                />
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-5 overflow-hidden border-b border-[#52b788]/10">
        <div ref={marqueeRef} className="flex gap-10 whitespace-nowrap">
          {[...data.marqueeItems, ...data.marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#52b788]/60"
            >
              <GiBugNet className="text-[#d4ff7d]/60" size={12} /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-[#52b788]/10 blur-2xl" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#52b788]/40">
              {isAdmin ? (
                <ImageUploader
                  currentUrl={data.about.image}
                  onUpload={(url) =>
                    update({ ...data, about: { ...data.about, image: url } })
                  }
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={data.about.image}
                  className="w-full h-full object-cover"
                  alt="about"
                />
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[#d4ff7d] text-[#081c15] text-xs font-mono flex items-center gap-2"
            >
              <HiOutlineAcademicCap size={14} />{" "}
              <EditText
                value={data.about.badgeText}
                onChange={(v) =>
                  update({ ...data, about: { ...data.about, badgeText: v } })
                }
                isAdmin={isAdmin}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#52b788] mb-4">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-8 font-['Cormorant_Garamond'] leading-tight">
              <EditText
                value={data.about.title}
                onChange={(v) =>
                  update({ ...data, about: { ...data.about, title: v } })
                }
                isAdmin={isAdmin}
                multiline
                tag="span"
              />
            </h2>
            <div className="space-y-4 text-[#fefae0]/80 leading-relaxed mb-8">
              <EditText
                value={data.about.paragraph1}
                onChange={(v) =>
                  update({ ...data, about: { ...data.about, paragraph1: v } })
                }
                isAdmin={isAdmin}
                tag="p"
                multiline
              />
              <EditText
                value={data.about.paragraph2}
                onChange={(v) =>
                  update({ ...data, about: { ...data.about, paragraph2: v } })
                }
                isAdmin={isAdmin}
                tag="p"
                multiline
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {data.about.tags.map((t, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-mono bg-[#52b788]/10 border border-[#52b788]/20 text-[#b7e4c7] flex items-center gap-1"
                >
                  <MdOutlineEco size={10} /> {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAREER SECTION */}
      <section id="experience" className="py-28 px-6 bg-[#081715]/50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Career Timeline"
            title="Field Work & Research Projects"
          />
          <div className="flex justify-center gap-3 mb-10">
            {(["all", "work", "research"] as const).map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-xl text-xs font-mono uppercase transition-all ${activeFilter === f ? "bg-[#d4ff7d]/15 border-[#d4ff7d]/50 text-[#d4ff7d]" : "bg-transparent border-[#52b788]/30 text-[#52b788]/60"} border`}
              >
                {f === "all"
                  ? "✦ All"
                  : f === "work"
                    ? "💼 Work"
                    : "🔬 Research"}
              </motion.button>
            ))}
          </div>
          {isAdmin && (
            <AdminBar
              onAdd={() => setCareerModal({ open: true, item: null })}
              label="Add Career Card"
            />
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCareer.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden border border-[#52b788]/20 bg-gradient-to-br from-[#0d2818] to-[#081c15] shadow-xl cursor-pointer"
                onClick={() =>
                  setViewModal({ open: true, item: card, type: "career" })
                }
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={card.image}
                    className="w-full h-full object-cover"
                    alt={card.role}
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-2 py-1 rounded-md text-[9px] font-mono uppercase mb-3 bg-[#d4ff7d]/10 border border-[#d4ff7d]/30 text-[#d4ff7d]">
                    {card.type === "work" ? "💼 Work" : "🔬 Research"}
                  </div>
                  <p className="text-[11px] uppercase text-[#52b788] mb-1">
                    {card.org}
                  </p>
                  <h3 className="text-xl font-light mb-1 font-['Cormorant_Garamond']">
                    {card.role}
                  </h3>
                  <p className="text-xs text-[#fefae0]/40 mb-4">{card.date}</p>
                  <ul className="space-y-2">
                    {card.bullets.slice(0, 3).map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-2 text-sm text-[#fefae0]/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] mt-2" />{" "}
                        {b}
                      </motion.li>
                    ))}
                    {card.bullets.length > 3 && (
                      <li className="text-xs text-[#52b788]">
                        +{card.bullets.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
                {isAdmin && (
                  <CardActions
                    onEdit={(e) => {
                      e.stopPropagation();
                      setCareerModal({ open: true, item: card });
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete?"))
                        update({
                          ...data,
                          careerCards: data.careerCards.filter(
                            (c) => c.id !== card.id,
                          ),
                        });
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Field Studies" title="Research Projects" />
          {isAdmin && (
            <AdminBar
              onAdd={() => setProjectModal({ open: true, item: null })}
              label="Add Project"
            />
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-xl overflow-hidden border border-[#52b788]/15 bg-gradient-to-br from-[#0d2818] to-[#081c15] cursor-pointer"
                onClick={() =>
                  setViewModal({ open: true, item: p, type: "project" })
                }
              >
                <div className="h-44 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={p.image}
                    className="w-full h-full object-cover"
                    alt={p.title}
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase text-[#52b788] mb-1">
                    {p.tag}
                  </p>
                  <h3 className="text-lg font-light mb-2">{p.title}</h3>
                  <p className="text-sm text-[#fefae0]/60">
                    {p.description.slice(0, 85)}…
                  </p>
                </div>
                {isAdmin && (
                  <CardActions
                    onEdit={(e) => {
                      e.stopPropagation();
                      setProjectModal({ open: true, item: p });
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete?"))
                        update({
                          ...data,
                          projects: data.projects.filter((x) => x.id !== p.id),
                        });
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications" className="py-28 px-6 bg-[#081715]/50">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Academic Output" title="Publications" />
          {isAdmin && (
            <AdminBar
              onAdd={() => setPubModal({ open: true, item: null })}
              label="Add Publication"
            />
          )}
          <div className="space-y-4">
            {data.publications.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 5 }}
                className="group relative p-5 rounded-xl bg-[#0d2818]/80 border border-[#52b788]/10"
              >
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-lg bg-[#d4ff7d]/10 border border-[#d4ff7d]/20 flex items-center justify-center text-[#d4ff7d] font-mono text-lg"
                  >
                    {i + 1}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-base font-light">{p.title}</h3>
                    <p className="text-xs text-[#fefae0]/60">{p.authors}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <HiOutlineDocumentText
                        className="text-[#52b788]"
                        size={12}
                      />
                      <span className="text-[11px] text-[#52b788]">
                        {p.journal}
                      </span>
                    </div>
                  </div>
                </div>
                {isAdmin && (
                  <CardActions
                    onEdit={() => setPubModal({ open: true, item: p })}
                    onDelete={() => {
                      if (confirm("Delete?"))
                        update({
                          ...data,
                          publications: data.publications.filter(
                            (x) => x.id !== p.id,
                          ),
                        });
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFERENCES */}
      <section id="conferences" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Events & Outreach"
            title="Conferences & International Events"
          />
          {isAdmin && (
            <AdminBar
              onAdd={() => setConfModal({ open: true, item: null })}
              label="Add Event"
            />
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {data.conferences.map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden border border-[#52b788]/15 bg-gradient-to-br from-[#0d2818] to-[#081c15] cursor-pointer"
                onClick={() =>
                  setViewModal({ open: true, item: c, type: "conference" })
                }
              >
                <div className="h-48 overflow-hidden relative">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={c.image}
                    className="w-full h-full object-cover"
                    alt={c.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081c15] to-transparent" />
                  <div className="absolute bottom-3 left-4 text-3xl">
                    {c.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-light mb-2">{c.title}</h3>
                  <p className="text-sm text-[#fefae0]/70 mb-3">
                    {c.description.slice(0, 100)}…
                  </p>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d4ff7d]/10 border border-[#d4ff7d]/20 w-fit">
                    <FiAward className="text-[#d4ff7d]" size={12} />
                    <span className="text-[10px] font-mono text-[#d4ff7d]">
                      {c.badge}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <CardActions
                    onEdit={(e) => {
                      e.stopPropagation();
                      setConfModal({ open: true, item: c });
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete?"))
                        update({
                          ...data,
                          conferences: data.conferences.filter(
                            (x) => x.id !== c.id,
                          ),
                        });
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 bg-[#081715]/50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Expertise" title="Skills & Proficiencies" />
          {isAdmin && (
            <AdminBar
              onAdd={() => setSkillModal({ open: true, item: null })}
              label="Add Skill"
            />
          )}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              {data.skills.map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#fefae0]">{s.label}</span>
                    <span className="text-[10px] px-2 py-1 rounded-md bg-[#52b788]/20 border border-[#52b788]/30 text-[#52b788]">
                      {s.level}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#52b788]/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#52b788] to-[#d4ff7d]"
                    />
                  </div>
                  {isAdmin && (
                    <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => setSkillModal({ open: true, item: s })}
                        className="w-6 h-6 rounded-md bg-[#d4ff7d]/20 text-[#d4ff7d]"
                      >
                        <FiEdit2 size={10} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete?"))
                            update({
                              ...data,
                              skills: data.skills.filter((x) => x.id !== s.id),
                            });
                        }}
                        className="w-6 h-6 rounded-md bg-[#ef4444]/20 text-[#fca5a5]"
                      >
                        <FiTrash2 size={10} />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-3xl bg-[#52b788]/10 blur-3xl" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#52b788]/40">
                {isAdmin ? (
                  <ImageUploader
                    currentUrl={data.skillsImage}
                    onUpload={(url) => update({ ...data, skillsImage: url })}
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={data.skillsImage}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-gradient-to-br from-[#0d2818] to-[#081c15] border border-[#52b788]/40">
                  <GiForestCamp className="text-[#52b788]" size={24} />
                  <p className="text-[10px] font-mono text-[#52b788] mt-1">
                    Field Researcher
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow="Get in Touch"
            title="Contact & Collaboration"
          />
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg leading-relaxed mb-8 font-['Cormorant_Garamond'] text-[#fefae0]/80">
                <EditText
                  value={data.contact.description}
                  onChange={(v) =>
                    update({
                      ...data,
                      contact: { ...data.contact, description: v },
                    })
                  }
                  isAdmin={isAdmin}
                  multiline
                  tag="span"
                />
              </p>
              <div className="space-y-4">
                {[
                  { icon: <FiMapPin />, label: "Location", key: "location" },
                  { icon: <FiMail />, label: "Email", key: "email" },
                  { icon: <FiPhone />, label: "Phone", key: "phone" },
                ].map(({ icon, label, key }) => (
                  <motion.div
                    key={key}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#52b788]/10 border border-[#52b788]/40 flex items-center justify-center text-[#52b788]">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-[#52b788]/60">
                        {label}
                      </p>
                      <EditText
                        value={
                          data.contact[
                            key as keyof typeof data.contact
                          ] as string
                        }
                        onChange={(v) =>
                          update({
                            ...data,
                            contact: { ...data.contact, [key]: v },
                          })
                        }
                        isAdmin={isAdmin}
                        className="text-sm font-mono text-[#fefae0]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#52b788] mb-6">
                Connect Online
              </p>
              <div className="space-y-3">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-[#0d2818]/80 border border-[#52b788]/20"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 flex items-center justify-center text-[#0A66C2]">
                        <FiLinkedin size={18} />
                      </div>
                      <span className="text-sm text-[#fefae0]">LinkedIn</span>
                    </div>
                    <a
                      href={data.contact.linkedin}
                      target="_blank"
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] hover:gap-2 transition"
                    >
                      Visit <FiExternalLink size={10} />
                    </a>
                  </div>
                  {isAdmin && (
                    <input
                      value={data.contact.linkedin}
                      onChange={(e) =>
                        update({
                          ...data,
                          contact: {
                            ...data.contact,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      className="mt-3 w-full p-2 rounded-lg text-xs bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
                    />
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-[#0d2818]/80 border border-[#52b788]/20"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00CCBB]/20 border border-[#00CCBB]/40 flex items-center justify-center text-[#00CCBB]">
                        <FaResearchgate size={18} />
                      </div>
                      <span className="text-sm text-[#fefae0]">
                        ResearchGate
                      </span>
                    </div>
                    <a
                      href={data.contact.researchgate}
                      target="_blank"
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] hover:gap-2 transition"
                    >
                      Visit <FiExternalLink size={10} />
                    </a>
                  </div>
                  {isAdmin && (
                    <input
                      value={data.contact.researchgate}
                      onChange={(e) =>
                        update({
                          ...data,
                          contact: {
                            ...data.contact,
                            researchgate: e.target.value,
                          },
                        })
                      }
                      className="mt-3 w-full p-2 rounded-lg text-xs bg-[#0a1f14] border border-[#52b788]/30 text-[#fefae0]"
                    />
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-[#d4ff7d]/5 border border-[#d4ff7d]/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineLightBulb className="text-[#d4ff7d]" size={16} />
                    <span className="text-xs font-mono text-[#d4ff7d]">
                      Open to collaborations
                    </span>
                  </div>
                  <p className="text-xs text-[#fefae0]/50">
                    Research · Fieldwork · Speaking · Conservation
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-[#52b788]/10 text-center">
        <div className="space-y-2">
          <EditText
            value={data.footer.copy}
            onChange={(v) =>
              update({ ...data, footer: { ...data.footer, copy: v } })
            }
            isAdmin={isAdmin}
            className="text-[11px] font-mono text-[#52b788]/50"
          />
          <EditText
            value={data.footer.tagline}
            onChange={(v) =>
              update({ ...data, footer: { ...data.footer, tagline: v } })
            }
            isAdmin={isAdmin}
            className="text-[11px] font-mono text-[#52b788]/30"
          />
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {careerModal.open && (
          <Modal
            title={careerModal.item ? "Edit Career" : "Add Career"}
            onClose={() => setCareerModal({ open: false, item: null })}
          >
            <CareerForm
              item={careerModal.item}
              onSave={(c: CareerCard) => {
                const cards = careerModal.item
                  ? data.careerCards.map((x) => (x.id === c.id ? c : x))
                  : [...data.careerCards, c];
                update({ ...data, careerCards: cards });
                setCareerModal({ open: false, item: null });
              }}
              onClose={() => setCareerModal({ open: false, item: null })}
            />
          </Modal>
        )}
        {projectModal.open && (
          <Modal
            title={projectModal.item ? "Edit Project" : "Add Project"}
            onClose={() => setProjectModal({ open: false, item: null })}
          >
            <ProjectForm
              item={projectModal.item}
              onSave={(p: ProjectCard) => {
                const projects = projectModal.item
                  ? data.projects.map((x) => (x.id === p.id ? p : x))
                  : [...data.projects, p];
                update({ ...data, projects });
                setProjectModal({ open: false, item: null });
              }}
              onClose={() => setProjectModal({ open: false, item: null })}
            />
          </Modal>
        )}
        {pubModal.open && (
          <Modal
            title={pubModal.item ? "Edit Publication" : "Add Publication"}
            onClose={() => setPubModal({ open: false, item: null })}
          >
            <PubForm
              item={pubModal.item}
              onSave={(p: Publication) => {
                const pubs = pubModal.item
                  ? data.publications.map((x) => (x.id === p.id ? p : x))
                  : [...data.publications, p];
                update({ ...data, publications: pubs });
                setPubModal({ open: false, item: null });
              }}
              onClose={() => setPubModal({ open: false, item: null })}
            />
          </Modal>
        )}
        {confModal.open && (
          <Modal
            title={confModal.item ? "Edit Event" : "Add Event"}
            onClose={() => setConfModal({ open: false, item: null })}
          >
            <ConfForm
              item={confModal.item}
              onSave={(c: Conference) => {
                const confs = confModal.item
                  ? data.conferences.map((x) => (x.id === c.id ? c : x))
                  : [...data.conferences, c];
                update({ ...data, conferences: confs });
                setConfModal({ open: false, item: null });
              }}
              onClose={() => setConfModal({ open: false, item: null })}
            />
          </Modal>
        )}
        {skillModal.open && (
          <Modal
            title={skillModal.item ? "Edit Skill" : "Add Skill"}
            onClose={() => setSkillModal({ open: false, item: null })}
          >
            <SkillForm
              item={skillModal.item}
              onSave={(s: Skill) => {
                const skills = skillModal.item
                  ? data.skills.map((x) => (x.id === s.id ? s : x))
                  : [...data.skills, s];
                update({ ...data, skills });
                setSkillModal({ open: false, item: null });
              }}
              onClose={() => setSkillModal({ open: false, item: null })}
            />
          </Modal>
        )}
        {viewModal.open && viewModal.item && (
          <Modal
            title={
              viewModal.type === "career"
                ? (viewModal.item as CareerCard).role
                : viewModal.type === "project"
                  ? (viewModal.item as ProjectCard).title
                  : (viewModal.item as Conference).title
            }
            onClose={() => setViewModal({ open: false, item: null, type: "" })}
          >
            {viewModal.type === "career" &&
              (() => {
                const c = viewModal.item as CareerCard;
                return (
                  <div>
                    <img
                      src={c.image}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                      alt={c.role}
                    />
                    <div className="mb-2 inline-block px-2 py-1 rounded-md text-[10px] font-mono bg-[#d4ff7d]/20 text-[#d4ff7d]">
                      {c.type === "work" ? "💼 Work Experience" : "🔬 Research"}
                    </div>
                    <p className="text-[11px] uppercase text-[#52b788]">
                      {c.org}
                    </p>
                    <h3 className="text-2xl font-light mb-2">{c.role}</h3>
                    <p className="text-xs text-[#fefae0]/40 mb-4">{c.date}</p>
                    <p className="text-[11px] uppercase text-[#52b788] mb-2">
                      Key Responsibilities
                    </p>
                    <ul className="space-y-2">
                      {c.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] mt-2" />
                          <span className="text-sm text-[#fefae0]/80">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            {viewModal.type === "project" &&
              (() => {
                const p = viewModal.item as ProjectCard;
                return (
                  <div>
                    <img
                      src={p.image}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                      alt={p.title}
                    />
                    <p className="text-[11px] uppercase text-[#52b788]">
                      {p.tag}
                    </p>
                    <h3 className="text-2xl font-light mb-4">{p.title}</h3>
                    <p className="text-base leading-relaxed text-[#fefae0]/80">
                      {p.description}
                    </p>
                  </div>
                );
              })()}
            {viewModal.type === "conference" &&
              (() => {
                const c = viewModal.item as Conference;
                return (
                  <div>
                    <img
                      src={c.image}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                      alt={c.title}
                    />
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">{c.icon}</span>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d4ff7d]/10 border border-[#d4ff7d]/20 w-fit">
                        <FiAward className="text-[#d4ff7d]" size={12} />
                        <span className="text-[10px] font-mono text-[#d4ff7d]">
                          {c.badge}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-light mb-4">{c.title}</h3>
                    <p className="text-base leading-relaxed text-[#fefae0]/80">
                      {c.description}
                    </p>
                  </div>
                );
              })()}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
