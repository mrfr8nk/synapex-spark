import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: () => api.getSiteSettings(),
    staleTime: 60_000,
  });

export const useProjects = (opts: { onlyVisible?: boolean } = {}) =>
  useQuery({
    queryKey: ["projects", opts.onlyVisible ?? false],
    queryFn: async () => {
      const data = await api.getProjects();
      if (opts.onlyVisible) return data.filter((p: any) => p.isVisible);
      return data ?? [];
    },
    staleTime: 60_000,
  });

export const useMilestones = () =>
  useQuery({
    queryKey: ["milestones"],
    queryFn: () => api.getMilestones(),
    staleTime: 60_000,
  });

export const useCurrentlyBuilding = () =>
  useQuery({
    queryKey: ["currently_building"],
    queryFn: () => api.getCurrentlyBuilding(),
    staleTime: 60_000,
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social_links"],
    queryFn: () => api.getSocialLinks(),
    staleTime: 60_000,
  });

export const useWhatIBuild = () =>
  useQuery({
    queryKey: ["what_i_build"],
    queryFn: () => api.getWhatIBuild(),
    staleTime: 60_000,
  });

export const useFooterLinks = () =>
  useQuery({
    queryKey: ["footer_links"],
    queryFn: () => api.getFooterLinks(),
    staleTime: 60_000,
  });

export const useBlogPosts = (opts: { onlyPublished?: boolean } = {}) =>
  useQuery({
    queryKey: ["blog_posts", opts.onlyPublished ?? false],
    queryFn: () => api.getBlogPosts(opts.onlyPublished),
    staleTime: 60_000,
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: () => api.getSkills(),
    staleTime: 60_000,
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: () => api.getTestimonials(),
    staleTime: 60_000,
  });

export const useCertifications = () =>
  useQuery({
    queryKey: ["certifications"],
    queryFn: () => api.getCertifications(),
    staleTime: 60_000,
  });

export const useEducation = () =>
  useQuery({
    queryKey: ["education"],
    queryFn: () => api.getEducation(),
    staleTime: 60_000,
  });
