import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  hero: { tag: string; name: string; title: string; description: string; bgImage: string };
  stats: Array<{ count: number; label: string }>;
  marqueeItems: string[];
  about: { image: string; badgeText: string; title: string; paragraph1: string; paragraph2: string; tags: string[] };
  careerCards: Array<{ id: string; image: string; org: string; role: string; date: string; type: string; bullets: string[] }>;
  projects: Array<{ id: string; image: string; tag: string; title: string; description: string }>;
  publications: Array<{ id: string; title: string; authors: string; journal: string }>;
  conferences: Array<{ id: string; image: string; icon: string; title: string; description: string; badge: string }>;
  skills: Array<{ id: string; label: string; level: string; width: number }>;
  skillsImage: string;
  contact: { description: string; location: string; email: string; phone: string; linkedin: string; researchgate: string };
  footer: { copy: string; tagline: string };
}

const PortfolioSchema = new Schema<IPortfolio>({
  hero: {
    tag: { type: String, default: '🪲 Wildlife Researcher & Conservation Biologist' },
    name: { type: String, default: 'Ashutosh Dey' },
    title: { type: String, default: 'Project Biologist · Firefly Ecology · Biodiversity Conservation' },
    description: { type: String, default: '' },
    bgImage: { type: String, default: '' },
  },
  stats: { type: [{ count: Number, label: String }], default: [] },
  marqueeItems: { type: [String], default: [] },
  about: {
    image: { type: String, default: '' },
    badgeText: { type: String, default: '' },
    title: { type: String, default: '' },
    paragraph1: { type: String, default: '' },
    paragraph2: { type: String, default: '' },
    tags: { type: [String], default: [] },
  },
  careerCards: {
    type: [{ id: String, image: String, org: String, role: String, date: String, type: { type: String, default: 'work' }, bullets: [String] }],
    default: [],
  },
  projects: {
    type: [{ id: String, image: String, tag: String, title: String, description: String }],
    default: [],
  },
  publications: {
    type: [{ id: String, title: String, authors: String, journal: String }],
    default: [],
  },
  conferences: {
    type: [{ id: String, image: String, icon: String, title: String, description: String, badge: String }],
    default: [],
  },
  skills: {
    type: [{ id: String, label: String, level: String, width: Number }],
    default: [],
  },
  skillsImage: { type: String, default: '' },
  contact: {
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    researchgate: { type: String, default: '' },
  },
  footer: {
    copy: { type: String, default: '© 2025 Ashutosh Dey' },
    tagline: { type: String, default: '🪲 Illuminating biodiversity, one firefly at a time' },
  },
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
