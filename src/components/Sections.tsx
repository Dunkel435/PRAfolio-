import {
  owner,
  portfolioItems,
  portfolioCategories,
  experimentItems,
  projects,
  revenEyeGateway,
  type SectionId,
  type PortfolioItem,
  type ExperimentItem,
} from '@/data/content';
import {
  ArrowUpRight,
  Mail,
  Download,
  Sparkles,
  FlaskConical,
  FolderOpen,
  User,
  FileText,
  MessageSquare,
  Eye,
  Plus,
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
      <h2 className="font-display text-display-md font-500 text-cream-50 text-balance">
        {title}
      </h2>
    </div>
  );
}

// ── Empty state ──

function EmptyState({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-600/40 bg-ink-800/20 p-8 text-center">
      <div className="w-10 h-10 rounded-full border border-ink-500/40 flex items-center justify-center mx-auto mb-3">
        <Plus size={16} className="text-cream-600" />
      </div>
      <p className="text-sm text-cream-400 font-500">{label}</p>
      <p className="text-xs text-cream-600 mt-1">{hint}</p>
    </div>
  );
}

// ── Work card (data-driven, ready for content system) ──

function WorkCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="relative aspect-[4/3] rounded-xl border border-ink-600/50 bg-ink-800/40 overflow-hidden group">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-ink-500/50 flex items-center justify-center mb-4 group-hover:border-amber-500/50 transition-colors">
            <Sparkles size={18} className="text-cream-500 group-hover:text-amber-400 transition-colors" />
          </div>
          <p className="text-sm text-cream-400 font-500">{item.title}</p>
          <p className="text-xs text-cream-600 mt-1">{item.category}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {item.featured && (
        <span className="absolute top-3 right-3 text-xs text-amber-400 font-mono bg-ink-950/60 px-2 py-1 rounded-full">
          Featured
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm text-cream-100 font-500">{item.title}</p>
        {item.description && (
          <p className="text-xs text-cream-300 mt-1 line-clamp-2">{item.description}</p>
        )}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-cream-500 font-mono">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// ── Experiment card ──

function ExperimentCard({ item }: { item: ExperimentItem }) {
  return (
    <article className="relative aspect-[4/3] rounded-xl border border-ink-600/50 bg-ink-800/40 overflow-hidden group">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-ink-500/50 flex items-center justify-center mb-4 group-hover:border-teal-400/50 transition-colors">
            <FlaskConical size={18} className="text-cream-500 group-hover:text-teal-400 transition-colors" />
          </div>
          <p className="text-sm text-cream-400 font-500">{item.title}</p>
          <p className="text-xs text-cream-600 mt-1">{item.category}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm text-cream-100 font-500">{item.title}</p>
        {item.description && (
          <p className="text-xs text-cream-300 mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>
    </article>
  );
}

// ── Editable field placeholder ──

function EditableField({ label }: { label: string }) {
  return (
    <div className="p-4 rounded-lg border border-dashed border-ink-600/40 bg-ink-800/20">
      <p className="text-sm text-cream-500">{label}</p>
      <p className="text-xs text-cream-600 mt-1">Add content to display here</p>
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
        {owner.tagline ?? 'A living creative universe.'}
      </h1>
      <p className="mt-8 text-lg text-cream-300 max-w-2xl text-pretty leading-relaxed">
        I am {owner.name}
        {owner.role ? `, ${owner.role.toLowerCase()}.` : '.'}{' '}
        This is PRAfolio — my living creative universe.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          onClick={() => onNavigate('work')}
          className="px-6 py-3 bg-amber-500 text-ink-950 font-500 text-sm tracking-wide rounded-lg hover:bg-amber-400 transition-colors"
        >
          See selected work
        </button>
        <button
          onClick={() => onNavigate('about')}
          className="px-6 py-3 border border-ink-500 text-cream-200 font-500 text-sm tracking-wide rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          About me
        </button>
      </div>
    </article>
  );
}

// 02 — SELECTED WORK
export function WorkSection() {
  return (
    <article aria-labelledby="work-heading">
      <SectionHeader number="02" german="ZWEI" title="Selected Work" />
      <p className="text-cream-300 max-w-2xl mb-10 text-pretty leading-relaxed">
        A curated view of my strongest visual production. Work will appear here across the categories below as it is added.
      </p>

      {portfolioItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems
            .filter((item) => item.published)
            .map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <EmptyState key={i} label="Work entry" hint="Awaiting portfolio content" />
          ))}
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {portfolioCategories.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1.5 text-xs text-cream-400 border border-ink-600/40 rounded-full"
              title={cat.description}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// 03 — EXPERIMENTS
export function ExperimentsSection() {
  return (
    <article aria-labelledby="experiments-heading">
      <SectionHeader number="03" german="DREI" title="Experiments" />
      <p className="text-cream-300 max-w-2xl mb-10 text-pretty leading-relaxed">
        Ongoing explorations in generative pipelines, motion, and visual systems. Experiments document process, not just outcome.
      </p>

      {experimentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {experimentItems
            .filter((item) => item.published)
            .map((item) => (
              <ExperimentCard key={item.id} item={item} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[0, 1].map((i) => (
            <EmptyState key={i} label="Experiment" hint="Awaiting experiment content" />
          ))}
        </div>
      )}
    </article>
  );
}

// 04 — PROJECTS
export function ProjectsSection({ onNavigate }: SectionProps) {
  return (
    <article aria-labelledby="projects-heading">
      <SectionHeader number="04" german="VIER" title="Projects" />
      <p className="text-cream-300 max-w-2xl mb-10 text-pretty leading-relaxed">
        Case studies and deeper project documentation. Each project opens to its own page.
      </p>
      <div className="space-y-4">
        {projects.map((project) => (
          <button
            key={project.slug}
            onClick={() => onNavigate('projects')}
            className="block w-full text-left p-6 rounded-xl border border-ink-600/50 bg-ink-800/30 hover:border-amber-500/50 hover:bg-ink-700/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FolderOpen size={16} className="text-amber-400" />
                  <span className="text-xs text-cream-500 font-mono tracking-wide">{project.category}</span>
                  {project.featured && (
                    <span className="text-xs text-amber-400 font-mono">Featured</span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-500 text-cream-50 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-cream-400 mt-1 text-sm">{project.tagline}</p>
              </div>
              <ArrowUpRight size={20} className="text-cream-500 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
        <div className="p-6 rounded-xl border border-dashed border-ink-600/40 text-center">
          <p className="text-sm text-cream-500">More case studies will appear here as they are added.</p>
        </div>
      </div>
    </article>
  );
}

// 05 — ABOUT
export function AboutSection() {
  return (
    <article aria-labelledby="about-heading">
      <SectionHeader number="05" german="FÜNF" title="About" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {owner.bio.length > 0 ? (
            owner.bio.map((para, i) => (
              <p key={i} className="text-cream-300 text-lg leading-relaxed text-pretty">
                {para}
              </p>
            ))
          ) : (
            <EditableField label="About text" />
          )}
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Skills</h3>
            {owner.skills.length > 0 ? (
              <ul className="space-y-2">
                {owner.skills.map((skill) => (
                  <li key={skill} className="text-sm text-cream-300 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <EditableField label="Skills" />
            )}
          </div>
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Tools / Workflow</h3>
            {owner.tools.length > 0 ? (
              <ul className="space-y-2">
                {owner.tools.map((tool) => (
                  <li key={tool} className="text-sm text-cream-300 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    {tool}
                  </li>
                ))}
              </ul>
            ) : (
              <EditableField label="Tools / Workflow" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// 06 — RESUME
export function ResumeSection() {
  return (
    <article aria-labelledby="resume-heading">
      <SectionHeader number="06" german="SECHS" title="Resume" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-cream-300 leading-relaxed">
            A full resume document will be available for download here once provided.
          </p>
          {owner.resumeUrl ? (
            <a
              href={owner.resumeUrl}
              className="inline-flex items-center gap-2 px-5 py-3 border border-ink-500 text-cream-200 text-sm font-500 rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
              aria-label="Download resume PDF"
            >
              <Download size={16} />
              Download PDF
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-3 border border-dashed border-ink-600/40 text-cream-600 text-sm rounded-lg">
              <Download size={16} />
              Resume link to be added
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Experience</h3>
            {owner.experience.length > 0 ? (
              <div className="space-y-4">
                {owner.experience.map((entry, i) => (
                  <div key={i} className="p-4 rounded-lg border border-ink-600/40 bg-ink-800/20">
                    <p className="text-sm text-cream-200 font-500">{entry.role}</p>
                    <p className="text-xs text-cream-400 mt-0.5">{entry.organization}</p>
                    {entry.period && <p className="text-xs text-cream-600 mt-1">{entry.period}</p>}
                    {entry.description && <p className="text-sm text-cream-400 mt-2">{entry.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <EditableField label="Experience" />
            )}
          </div>
          <div>
            <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Education</h3>
            {owner.education.length > 0 ? (
              <div className="space-y-4">
                {owner.education.map((entry, i) => (
                  <div key={i} className="p-4 rounded-lg border border-ink-600/40 bg-ink-800/20">
                    <p className="text-sm text-cream-200 font-500">{entry.qualification}</p>
                    <p className="text-xs text-cream-400 mt-0.5">{entry.institution}</p>
                    {entry.period && <p className="text-xs text-cream-600 mt-1">{entry.period}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <EditableField label="Education" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// 07 — CONTACT
export function ContactSection() {
  return (
    <article aria-labelledby="contact-heading">
      <SectionHeader number="07" german="SIEBEN" title="Contact" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-cream-300 text-lg leading-relaxed mb-8 text-pretty">
            Open to professional opportunities, including roles, collaborations, and creative projects. Reach out through any of the channels below.
          </p>
          {owner.contact.email ? (
            <a
              href={`mailto:${owner.contact.email}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500 text-ink-950 font-500 text-sm rounded-lg hover:bg-amber-400 transition-colors"
            >
              <Mail size={16} />
              {owner.contact.email}
            </a>
          ) : (
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-dashed border-ink-600/40 text-cream-600 text-sm rounded-lg">
              <Mail size={16} />
              Email to be added
            </div>
          )}
        </div>
        <div className="space-y-3">
          <h3 className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">Channels</h3>
          {owner.contact.channels.length > 0 ? (
            owner.contact.channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href ?? '#'}
                className="flex items-center justify-between p-4 rounded-lg border border-ink-600/40 hover:border-amber-500/50 transition-colors group"
              >
                <span className="text-sm text-cream-300 font-500">{channel.label}</span>
                <span className="text-sm text-cream-500 group-hover:text-amber-400 transition-colors flex items-center gap-2">
                  {channel.value}
                  <ArrowUpRight size={14} />
                </span>
              </a>
            ))
          ) : (
            <EditableField label="Contact channels" />
          )}
        </div>
      </div>
    </article>
  );
}

// 08 — REVEN EYE
export function RevenEyeSection() {
  return (
    <article aria-labelledby="reven-eye-heading">
      <SectionHeader number="08" german="ACHT" title="Reven Eye" />
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
            <p className="text-cream-300 leading-relaxed text-pretty mb-8">
              {revenEyeGateway.description}
            </p>
            {revenEyeGateway.link ? (
              <a
                href={revenEyeGateway.link}
                className="inline-flex items-center gap-2 px-6 py-3 border border-amber-500/50 text-amber-400 font-500 text-sm rounded-lg hover:bg-amber-500/10 transition-colors"
              >
                Visit Reven Eye
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 border border-dashed border-ink-600/40 text-cream-600 text-sm rounded-lg">
                <Eye size={16} />
                Link to be added
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-cream-600 mt-6 leading-relaxed">
          Reven Eye is a separate website. PRAfolio only links to it — all creator and commercial features live there, not here.
        </p>
      </div>
    </article>
  );
}

// Section metadata for icons
export const sectionIcons: Record<SectionId, typeof Sparkles> = {
  introduction: Sparkles,
  work: Sparkles,
  experiments: FlaskConical,
  projects: FolderOpen,
  about: User,
  resume: FileText,
  contact: MessageSquare,
  'reven-eye': Eye,
};
