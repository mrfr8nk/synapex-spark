const BASE = "/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (email: string, password: string, secret: string) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ email, password, secret }) }),
  me: () => request("/auth/me"),

  // Site Settings
  getSiteSettings: () => request("/site-settings"),
  updateSiteSettings: (data: Record<string, string>) =>
    request("/site-settings", { method: "PUT", body: JSON.stringify(data) }),

  // Projects
  getProjects: () => request("/projects"),
  createProject: (data: any) => request("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: string, data: any) => request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id: string) => request(`/projects/${id}`, { method: "DELETE" }),

  // Milestones
  getMilestones: () => request("/milestones"),
  createMilestone: (data: any) => request("/milestones", { method: "POST", body: JSON.stringify(data) }),
  updateMilestone: (id: string, data: any) => request(`/milestones/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteMilestone: (id: string) => request(`/milestones/${id}`, { method: "DELETE" }),

  // Currently Building
  getCurrentlyBuilding: () => request("/currently-building"),
  createCurrentlyBuilding: (data: any) => request("/currently-building", { method: "POST", body: JSON.stringify(data) }),
  updateCurrentlyBuilding: (id: string, data: any) => request(`/currently-building/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCurrentlyBuilding: (id: string) => request(`/currently-building/${id}`, { method: "DELETE" }),

  // Social Links
  getSocialLinks: () => request("/social-links"),
  createSocialLink: (data: any) => request("/social-links", { method: "POST", body: JSON.stringify(data) }),
  updateSocialLink: (id: string, data: any) => request(`/social-links/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSocialLink: (id: string) => request(`/social-links/${id}`, { method: "DELETE" }),

  // What I Build
  getWhatIBuild: () => request("/what-i-build"),
  createWhatIBuild: (data: any) => request("/what-i-build", { method: "POST", body: JSON.stringify(data) }),
  updateWhatIBuild: (id: string, data: any) => request(`/what-i-build/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteWhatIBuild: (id: string) => request(`/what-i-build/${id}`, { method: "DELETE" }),

  // Footer Links
  getFooterLinks: () => request("/footer-links"),
  createFooterLink: (data: any) => request("/footer-links", { method: "POST", body: JSON.stringify(data) }),
  updateFooterLink: (id: string, data: any) => request(`/footer-links/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFooterLink: (id: string) => request(`/footer-links/${id}`, { method: "DELETE" }),

  // Blog Posts
  getBlogPosts: (onlyPublished?: boolean) => request(`/blog-posts${onlyPublished ? "?published=true" : ""}`),
  getBlogPost: (slug: string) => request(`/blog-posts/${slug}`),
  createBlogPost: (data: any) => request("/blog-posts", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: string, data: any) => request(`/blog-posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlogPost: (id: string) => request(`/blog-posts/${id}`, { method: "DELETE" }),

  // Skills
  getSkills: () => request("/skills"),
  createSkill: (data: any) => request("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id: string, data: any) => request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id: string) => request(`/skills/${id}`, { method: "DELETE" }),

  // Testimonials
  getTestimonials: () => request("/testimonials"),
  createTestimonial: (data: any) => request("/testimonials", { method: "POST", body: JSON.stringify(data) }),
  updateTestimonial: (id: string, data: any) => request(`/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTestimonial: (id: string) => request(`/testimonials/${id}`, { method: "DELETE" }),

  // Certifications
  getCertifications: () => request("/certifications"),
  createCertification: (data: any) => request("/certifications", { method: "POST", body: JSON.stringify(data) }),
  updateCertification: (id: string, data: any) => request(`/certifications/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCertification: (id: string) => request(`/certifications/${id}`, { method: "DELETE" }),

  // Education
  getEducation: () => request("/education"),
  createEducation: (data: any) => request("/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id: string, data: any) => request(`/education/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEducation: (id: string) => request(`/education/${id}`, { method: "DELETE" }),

  // Contact Messages
  getContactMessages: () => request("/contact-messages"),
  createContactMessage: (data: any) => request("/contact-messages", { method: "POST", body: JSON.stringify(data) }),
  updateContactMessage: (id: string, data: any) => request(`/contact-messages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteContactMessage: (id: string) => request(`/contact-messages/${id}`, { method: "DELETE" }),

  // Upload
  uploadFile: async (file: File, folder = "uploads") => {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    const res = await fetch(`${BASE}/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
};

export function saveToken(token: string) { localStorage.setItem("admin_token", token); }
export function clearToken() { localStorage.removeItem("admin_token"); }
export function hasToken() { return !!localStorage.getItem("admin_token"); }
