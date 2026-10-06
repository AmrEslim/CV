import React, { useMemo, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { getProjects } from '../../content';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [filter, setFilter] = useState('all');

  const projects = useMemo(() => getProjects(language), [language]);
  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="scene">
      <div className="content-container">
        <h2 className="section-title">{t('projects.title')}</h2>

        {categories.length > 1 && (
          <div className="project-filters" role="group" aria-label="Filter projects">
            {['all', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${filter === cat ? 'active' : ''}`}
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? t('projects.filterAll') : t(`projects.categories.${cat}`)}
              </button>
            ))}
          </div>
        )}

        <div className="robotics-projects">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
