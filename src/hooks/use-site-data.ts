import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((r) => { map[r.key] = r.value; });
      return map;
    },
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useMilestones = () =>
  useQuery({
    queryKey: ["milestones"],
    queryFn: async () => {
      const { data, error } = await supabase.from("milestones").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useCurrentlyBuilding = () =>
  useQuery({
    queryKey: ["currently_building"],
    queryFn: async () => {
      const { data, error } = await supabase.from("currently_building").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_links").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useWhatIBuild = () =>
  useQuery({
    queryKey: ["what_i_build"],
    queryFn: async () => {
      const { data, error } = await supabase.from("what_i_build").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useFooterLinks = () =>
  useQuery({
    queryKey: ["footer_links"],
    queryFn: async () => {
      const { data, error } = await supabase.from("footer_links").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
