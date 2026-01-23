import { defaultPortfolio } from "@/lib/portfolio-data";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

export type PortfolioData = typeof defaultPortfolio;

let prisma: PrismaClient | undefined;
let pool: Pool | undefined;

const getPrisma = () => {
  if (!prisma) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
};

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!process.env.DATABASE_URL) {
    return defaultPortfolio;
  }

  try {
    const client = getPrisma();
    const [profile, socials, metrics, skills, projects, experiences] =
      await client.$transaction([
        client.profile.findFirst(),
        client.socialLink.findMany({ orderBy: { order: "asc" } }),
        client.metric.findMany({ orderBy: { order: "asc" } }),
        client.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
        client.project.findMany({ orderBy: { order: "asc" } }),
        client.experience.findMany({ orderBy: { order: "asc" } }),
      ]);

    if (!profile) {
      return defaultPortfolio;
    }

    const groupedSkills = skills.reduce(
      (acc, skill) => {
        const existing = acc.find((item) => item.category === skill.category);
        if (existing) {
          existing.items.push(skill.name);
        } else {
          acc.push({ category: skill.category, items: [skill.name] });
        }
        return acc;
      },
      [] as { category: string; items: string[] }[]
    );

    const normalizedProjects = projects.map((project) => ({
      ...project,
      href: project.href ?? "",
      status: project.status ?? "",
    }));

    return {
      profile,
      socials,
      metrics,
      skills: groupedSkills,
      projects: normalizedProjects,
      experiences,
    };
  } catch (error) {
    console.warn("Falling back to default portfolio data.", error);
    return defaultPortfolio;
  }
}
