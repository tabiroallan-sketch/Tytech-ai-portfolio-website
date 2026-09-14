import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { servicePages } from "@/data/services";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/solutions",
    "/industries",
    "/projects",
    "/about",
    "/contact",
    "/resources",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceRoutes = servicePages.map((page) => ({
    url: `${site.url}/services/${page.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const solutionRoutes = solutions.map((solution) => ({
    url: `${site.url}/solutions/${solution.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${site.url}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${site.url}/resources/${article.slug}`,
    lastModified: article.updatedAt ? article.updatedAt : article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...solutionRoutes,
    ...industryRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ];
}