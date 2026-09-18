import { useParams, useNavigate } from '@/router';
import { projects } from '@/data/content';
import { ArrowLeft } from 'lucide-react';

export function ProjectCaseStudy() {
  const params = useParams();
  const navigate = useNavigate();
  const slug = params.slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <article className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-display-md text-cream-50 mb-4">Project not found</h1>
        <p className="text-cream-400 mb-8">This project does not exist or has not been published yet.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-3 border border-ink-500 text-cream-200 text-sm rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to PRAfolio
        </button>
      </article>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-cream-400 hover:text-amber-400 transition-colors mb-10"
      >
        <ArrowLeft size={16} />
        Back to PRAfolio
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="section-number text-amber-400 text-sm">04 / VIER</span>
        <span className="text-xs text-cream-500 font-mono">{project.category}</span>
      </div>

      <h1 className="font-display text-display-lg font-500 text-cream-50 mb-3 text-balance">
        {project.title}
      </h1>
      <p className="text-xl text-cream-400 mb-8">{project.tagline}</p>

      <div className="aspect-video rounded-2xl border border-ink-600/50 bg-ink-800/30 mb-10 flex items-center justify-center">
        <p className="text-cream-500 text-sm">Case study content will be added here.</p>
      </div>

      <div className="prose-custom">
        <p className="text-cream-300 text-lg leading-relaxed text-pretty">
          {project.description}
        </p>
      </div>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-mono text-cream-400 border border-ink-600/50 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {!project.published && (
        <div className="mt-10 p-6 rounded-xl border border-dashed border-ink-600/40 text-center">
          <p className="text-sm text-cream-500">
            This case study is not yet published. The architecture is ready for future content.
          </p>
        </div>
      )}
    </article>
  );
}
