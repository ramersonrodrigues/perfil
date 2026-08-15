'use client';

import { useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

export function useProjects() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getModalData = () => {
    if (!selectedProject) return null;
    return {
      title: selectedProject.title,
      images: selectedProject.images,
      imageLabels: selectedProject.imageLabels,
    };
  };

  return {
    projects,
    imageErrors,
    isModalOpen,
    selectedProject,
    handleImageError,
    openModal,
    closeModal,
    getModalData,
  };
}

export type { Project };
