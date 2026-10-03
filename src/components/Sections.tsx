import {
  owner,
  revenEyeGateway,
  type SectionId,
} from '@/data/content';
import {
  ArrowUpRight,
  Eye,
  FileText,
  Github,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
} from 'lucide-react';

interface SectionProps {
  onNavigate: (id: SectionId) => void;
}

function SectionHeader({ number, german, title }: { number: string; german: string; title: string }) {
  return (
    <div className="mb-10 lg:mb-14">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="section-number text-amber-400 text-sm">{number}</span>
        <span className="german-label text-cream-400 text-sm">{german}</span>
      </div>
      <h2 className="font-display text-display-md font-500 text-cream-50 text-balance">{title}</h2>
    </div>
  );
}

// 01 — INTRODUCTION
export function IntroductionSection({ onNavigate }: SectionProps) {
  return (
    <article aria-labelledby="intro-heading" className="max-w-4xl">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="section-number text-amber-400 text-sm">01</span>
        <span className="german-label text-cream-400 text-sm">EINS</span>
      </div>
      <h1 id="intro-heading" className="font-display text-display-xl font-400 text-cream-50 text-balance leading-tight">
        {owner.tagline}
      </h1>
      <p className="mt-8 text-lg text-cream-300 max-w-2xl text-pretty leading-relaxed">
        I am {owner.name}, a creative technologist &amp; AI-assisted visual producer. This is PRAfolio — my living creative universe.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          onClick={() => onNavigate('about')}
          className="px-6 py-3 bg-amber-500 text-ink-950 font-500 text-sm tracking-wide rounded-lg hover:bg-amber-400 transition-colors"
        >
          Explore my profile
        </button>
        <button
          onClick={() => onNavigate('resume')}
          className="px-6 py-3 border border-ink-500 text-cream-200 font-500 text-sm tracking-wide rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          View resume
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 border border-ink-500 text-cream-200 font-500 text-sm tracking-wide rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          Get in touch
        </button>
      </div>
    </article>
  );
}

// 02 — ABOUT
export function AboutSection() {
  return (
    <article aria-labelledby="about-heading">
      <SectionHeader number="02" german="ZWEI" title="About" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-3">Professional positioning</p>
            <h3 className="font-display text-2xl lg:text-3xl font-500 text-cream-50 leading-tight text-balance">
              {owner.role}
            </h3>
          </div>

          <div className="space-y-4">
            {owner.bio.map((paragraph) => (
              <p key={paragraph} className="text-cream-300 leading-relaxed text-pretty">{paragraph}</p>
            ))}
          </div>

          {/* Creative production workflow */}
          <div className="pt-4">
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-5">Creative Production Workflow</h3>
            <div className="flex flex-col gap-0">
              {owner.workflow.map((step, i) => (
                <div key={step.stage} className="flex items-stretch gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center text-xs font-mono text-amber-400">
                      {i + 1}
                    </div>
                    {i < owner.workflow.length - 1 && <div className="w-px flex-1 bg-ink-600/40 min-h-[1.5rem]" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-cream-200 font-500">{step.stage}</p>
                    <p className="text-xs text-cream-500 mt-0.5 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={owner.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-ink-950 font-500 text-sm rounded-lg hover:bg-amber-400 transition-colors"
            >
              VIEW PORTFOLIO
              <ArrowUpRight size={16} />
            </a>
            <a
              href={owner.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink-500 text-cream-200 font-500 text-sm rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
            >
              VIEW GITHUB
              <Github size={16} />
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Creative focus */}
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Creative Focus</h3>
            <ul className="space-y-2">
              {owner.creativeFocus.map((item) => (
                <li key={item} className="text-sm text-cream-300 flex items-start gap-2 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Tools / Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {owner.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 text-xs font-mono text-cream-400 border border-ink-600/50 rounded-full">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Education</h3>
            <ul className="space-y-2">
              {owner.education.map((item) => (
                <li key={item} className="text-sm text-cream-300 leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Languages</h3>
            <ul className="space-y-2">
              {owner.languages.map((item) => (
                <li key={item} className="text-sm text-cream-300 leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}

// 03 — RESUME
export function ResumeSection() {
  return (
    <article aria-labelledby="resume-heading">
      <SectionHeader number="03" german="DREI" title="Resume" />
      <div className="max-w-2xl">
        <p className="text-cream-300 leading-relaxed mb-8">
          View my current resume on Google Drive.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={owner.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 text-ink-950 text-sm font-500 rounded-lg hover:bg-amber-400 transition-colors"
            aria-label="View resume on Google Drive in a new tab"
          >
            <FileText size={16} />
            VIEW RESUME
          </a>
        </div>
      </div>
    </article>
  );
}

// 04 — CONTACT
export function ContactSection() {
  const hasContact = owner.contact.email || owner.contact.phone;

  return (
    <article aria-labelledby="contact-heading">
      <SectionHeader number="04" german="VIER" title="Contact" />
      <div className="max-w-2xl">
        <p className="text-cream-300 leading-relaxed mb-8">
          For professional enquiries, use the contact details below.
        </p>
        {hasContact ? (
          <div className="space-y-3">
            {owner.contact.email && (
              <a
                href={`mailto:${owner.contact.email}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-ink-600/40 hover:border-amber-500/50 transition-colors group"
              >
                <Mail size={18} className="text-amber-400" />
                <span className="text-sm text-cream-300 group-hover:text-amber-400 transition-colors">
                  {owner.contact.email}
                </span>
              </a>
            )}
            {owner.contact.phone && (
              <a
                href={`tel:${owner.contact.phone}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-ink-600/40 hover:border-amber-500/50 transition-colors group"
              >
                <Phone size={18} className="text-amber-400" />
                <span className="text-sm text-cream-300 group-hover:text-amber-400 transition-colors">
                  {owner.contact.phone}
                </span>
              </a>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center gap-3 px-5 py-3 border border-dashed border-ink-600/40 text-cream-600 text-sm rounded-lg">
            <MessageSquare size={16} />
            Contact details to be added
          </div>
        )}
      </div>
    </article>
  );
}

// 05 — REVEN EYE
export function RevenEyeSection() {
  return (
    <article aria-labelledby="reven-eye-heading">
      <SectionHeader number="05" german="FÜNF" title="Reven Eye" />
      <div className="max-w-2xl">
        <div className="relative p-8 lg:p-10 rounded-2xl border border-ink-600/50 bg-ink-800/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-center justify-center">
                <Eye size={22} className="text-amber-400" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-500 text-cream-50">{revenEyeGateway.title}</h3>
                <p className="text-sm text-cream-500">{revenEyeGateway.subtitle}</p>
              </div>
            </div>
            <p className="text-cream-300 leading-relaxed text-pretty">
              {revenEyeGateway.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-600/40 bg-ink-900/40">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-xs font-mono text-cream-500 tracking-wide">In development</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
