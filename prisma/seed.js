const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$transaction([
    prisma.experience.deleteMany(),
    prisma.project.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.metric.deleteMany(),
    prisma.socialLink.deleteMany(),
    prisma.profile.deleteMany(),
  ]);

  await prisma.profile.create({
    data: {
      name: "Rishabh Dev Singh",
      role: "B.Tech CSE Student",
      headline: "Final-year CSE student focused on software engineering.",
      summary:
        "I am currently pursuing my fourth year of B.Tech in Computer Science & Engineering and actively building real-world projects to grow as a software engineer.",
      location: "Ratsar, Ballia, Uttar Pradesh, India",
      email: "dsrishabh@gmail.com",
      availability: "Open to internships and entry-level roles",
      about:
        "Currently studying at Babu Banarsi Das University, Lucknow (passout 2026). I enjoy working on backend systems and practical applications, and I am excited to contribute to impactful software projects. Languages: English, Hindi. Hobbies: Music, Painting. Address: Ratsar, Ballia, Uttar Pradesh, 277123. Phone: +91 9565976649.",
      highlights: [
        "B.Tech CSE, Babu Banarsi Das University (2026)",
        "Class 12: 72% · Sunbeam School, Ballia",
        "Class 10: 77.6% · Sunbeam School, Ballia",
      ],
    },
  });

  await prisma.socialLink.createMany({
    data: [
      { label: "GitHub", href: "https://github.com/Reshabhdev", order: 1 },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/rishabh-dev-singh-261183253",
        order: 2,
      },
      { label: "Email", href: "mailto:dsrishabh@gmail.com", order: 3 },
    ],
  });

  await prisma.metric.createMany({
    data: [
      { label: "Passout year", value: "2026", order: 1 },
      { label: "Projects built", value: "2", order: 2 },
      { label: "Certifications", value: "4", order: 3 },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: "Python", category: "Programming", order: 1 },
      { name: "Machine Learning", category: "Programming", order: 2 },
      { name: "Node.js", category: "Backend", order: 1 },
      { name: "Blockchain Essentials", category: "Certifications", order: 1 },
      { name: "Clean Coding", category: "Certifications", order: 2 },
      { name: "Internet of Things", category: "Certifications", order: 3 },
      { name: "Data Analysis with Python", category: "Certifications", order: 4 },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        name: "Desktop Dictionary",
        description: "A desktop dictionary app with fast word lookup.",
        stack: ["Python"],
        status: "Academic Project",
        order: 1,
      },
      {
        name: "Hotel Design Backend",
        description: "Backend services for a hotel design concept project.",
        stack: ["Node.js"],
        status: "Academic Project",
        order: 2,
      },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        role: "Fresher",
        company: "Open to opportunities",
        period: "2026",
        highlights: [
          "Actively building academic and personal projects.",
          "Interested in software engineering roles and internships.",
          "Ready to contribute to backend and full-stack teams.",
        ],
        order: 1,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
