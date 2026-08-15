'use client';

import ProjectModal from './ProjectModal';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { projects, imageErrors, isModalOpen, handleImageError, openModal, closeModal, getModalData } = useProjects();

  return (
    <>
      <section id="projetos" className="py-20 scroll-mt-24">
        <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-4">
          <span className="w-12 h-px bg-primary-container" />
          Projetos
        </h2>

        <div className="flex flex-col gap-8">
          {projects.map((project, projectIndex) => (
            <div
              key={projectIndex}
              className={`bg-surface-container rounded-xl border border-border-subtle overflow-hidden hover:border-primary-container transition-all duration-300 flex flex-col md:flex-row ${
                project.layout === 'reverse' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Media Column */}
              <div className={`md:w-1/4 flex flex-col p-4 justify-between border-b md:border-b-0 ${
                project.layout === 'reverse' ? 'md:border-l' : 'md:border-r'
              } border-border-subtle bg-surface-base`}>
                {/* Video / Preview */}
                <div className="h-36 w-full relative overflow-hidden bg-surface-container-low rounded-lg mb-4 group">
                  <img
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    src={project.videoThumbnail}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-primary-container/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(130,87,229,0.6)] group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href="#"
                    className="bg-primary-container text-text-primary text-sm font-semibold px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-inverse-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">code</span>
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="bg-surface-elevated text-text-primary text-sm font-semibold px-3 py-2 rounded-lg border border-border-subtle flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">computer</span>
                    Visualizar
                  </a>
                </div>
              </div>

              {/* Info Column */}
              <div className="md:w-3/4 flex flex-col p-4 justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-3 flex items-center">
                    <span className="material-symbols-outlined mr-2 text-primary-container text-2xl">{project.icon}</span>
                    {project.title}
                  </h3>
                  <p className="text-text-secondary mb-5 leading-relaxed text-base line-clamp-3">{project.description}</p>

                  {/* Thumbnails */}
                  <div className="flex gap-2 mb-5">
                    {project.images.map((image, imageIndex) => {
                      const key = `${projectIndex}-${imageIndex}`;
                      const hasError = imageErrors[key];

                      return (
                        <button
                          key={imageIndex}
                          onClick={() => openModal(project)}
                          className="w-11 h-11 rounded-lg bg-surface-elevated border border-border-subtle overflow-hidden flex items-center justify-center hover:border-primary-container transition-colors"
                        >
                          {hasError ? (
                            <span className="material-symbols-outlined text-primary-container text-base">
                              image
                            </span>
                          ) : (
                            <img
                              alt={project.imageLabels[imageIndex]}
                              className="w-full h-full object-cover"
                              src={image}
                              onError={() => handleImageError(key)}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-surface-elevated px-3 py-1.5 rounded-lg text-base font-medium text-text-secondary border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={getModalData()}
      />
    </>
  );
}
