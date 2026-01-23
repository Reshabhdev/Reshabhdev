import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPortfolioData } from "@/lib/portfolio";

export default async function Home() {
  const { profile, socials, metrics, skills, projects, experiences } =
    await getPortfolioData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            {profile.name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="#about" className="hover:text-foreground">
              About
            </Link>
            <Link href="#skills" className="hover:text-foreground">
              Skills
            </Link>
            <Link href="#projects" className="hover:text-foreground">
              Projects
            </Link>
            <Link href="#experience" className="hover:text-foreground">
              Experience
            </Link>
            <Link href="#contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
          <Button asChild size="sm" variant="outline">
            <Link href={`mailto:${profile.email}`}>Let&apos;s talk</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-14">
        <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-10 md:p-14">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{profile.role}</Badge>
              <Badge variant="outline">{profile.availability}</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                {profile.headline}
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                {profile.summary}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild>
                <Link href={`mailto:${profile.email}`}>Start a project</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#projects">View work</Link>
              </Button>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{profile.location}</span>
                <Separator className="h-4 w-px bg-border" />
                <span>{profile.email}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="border-border/70">
              <CardHeader>
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
                <CardDescription>{metric.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section id="about" className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-base text-muted-foreground">{profile.about}</p>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <Button key={social.label} asChild variant="outline" size="sm">
                  <Link href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
              <CardDescription>Focused on impact and clarity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {profile.highlights.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="skills" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <Badge variant="outline">Design + Engineering</Badge>
          </div>
          <div className="space-y-6">
            {skills.map((group) => (
              <div key={group.category} className="space-y-3">
                <div className="text-sm font-semibold text-muted-foreground">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Selected Work</h2>
            <Button asChild variant="ghost">
              <Link href={`mailto:${profile.email}`}>Request case study</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.name} className="border-border/70">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{project.name}</CardTitle>
                    {project.status ? (
                      <Badge variant="outline">{project.status}</Badge>
                    ) : null}
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  {project.href ? (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.href} target="_blank" rel="noreferrer">
                        View project
                      </Link>
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-6">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((role) => (
              <Card key={`${role.company}-${role.role}`} className="border-border/70">
                <CardHeader>
                  <CardTitle>{role.role}</CardTitle>
                  <CardDescription>
                    {role.company} · {role.period}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {role.highlights.map((highlight) => (
                    <div key={highlight} className="flex gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <p>{highlight}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Let&apos;s build something thoughtful</CardTitle>
              <CardDescription>
                I&apos;m available for product builds, design systems, and
                Postgres-backed platforms.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button asChild>
                <Link href={`mailto:${profile.email}`}>Email me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#projects">See my work</Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                {profile.location}
              </span>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2026 {profile.name}. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
