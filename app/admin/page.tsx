"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  Download,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { type Project } from "../content";
import {
  type Article,
  type PortfolioContent,
  defaults,
  readContent,
  saveContent,
} from "../local-content";

const Shell = styled.main`
  min-height: 100vh;
  background: #f3f7f9;
  color: #132638;
  font: 16px/1.5 Arial, Helvetica, sans-serif;
  padding: 35px 25px 80px;
  * {
    box-sizing: border-box;
  }
  .inner {
    max-width: 1250px;
    margin: auto;
  }
  a {
    color: #274860;
    text-decoration: none;
    font-weight: 700;
  }
  h1 {
    font-size: clamp(30px, 4vw, 47px);
    letter-spacing: -0.05em;
    margin: 13px 0 5px;
  }
  p {
    color: #60717e;
  }
  .intro {
    max-width: 760px;
  }
  .tabs {
    display: flex;
    gap: 8px;
    margin: 32px 0;
  }
  .tabs button {
    border: 1px solid #c7d3db;
    background: white;
    padding: 10px 18px;
    font-weight: 700;
  }
  .tabs button.active {
    background: #112a3d;
    color: white;
  }
  .layout {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 800px) {
    .layout {
      grid-template-columns: 1fr;
    }
  }
  .panel {
    background: white;
    border: 1px solid #d6e0e6;
    padding: 24px;
  }
  .list {
    display: grid;
    gap: 8px;
  }
  .list button {
    background: #f7fafb;
    border: 1px solid #dce5e9;
    text-align: left;
    padding: 12px;
    color: #173044;
  }
  .list button.active {
    border-color: #ba925e;
    background: #fbf7ef;
  }
  .list small {
    display: block;
    color: #738390;
  }
  .toolbar {
    display: flex;
    gap: 9px;
    flex-wrap: wrap;
    margin: 18px 0;
  }
  .toolbar button,
  .toolbar a,
  .save {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid #aebdc7;
    background: white;
    color: #122b3e;
    font-size: 13px;
    font-weight: 800;
    padding: 10px 13px;
    cursor: pointer;
  }
  .toolbar .danger {
    color: #8a372f;
    border-color: #e0bcb5;
  }
  .save {
    background: #cba46e;
    border-color: #cba46e;
    margin-top: 17px;
  }
  label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #334b5c;
    margin: 14px 0 5px;
  }
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    border: 1px solid #c5d2d9;
    background: white;
    color: #142d3d;
    padding: 10px 12px;
    font: inherit;
    min-height: 43px;
  }
  textarea {
    resize: vertical;
    min-height: 80px;
  }
  .two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 15px;
  }
  @media (max-width: 650px) {
    .two {
      grid-template-columns: 1fr;
    }
  }
  .notice {
    background: #e8f1f4;
    border-left: 3px solid #7b9cac;
    padding: 13px 16px;
    color: #3a5c70;
    font-size: 14px;
  }
  .saved {
    color: #226b49;
    font-size: 14px;
    font-weight: 700;
  }
  .checkbox {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .checkbox input {
    width: auto;
    min-height: auto;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;
const newId = () =>
  String(Date.now()) + "-" + Math.random().toString(36).slice(2);
const blankProject = (): Project => ({
  id: newId(),
  number: "",
  date: { fr: "", en: "" },
  category: { fr: "", en: "" },
  title: { fr: "", en: "" },
  summary: { fr: "", en: "" },
  problem: { fr: "", en: "" },
  solution: { fr: "", en: "" },
  role: { fr: "", en: "" },
  features: { fr: "", en: "" },
  result: { fr: "", en: "" },
  tech: [],
});
const blankArticle = (): Article => ({
  id: newId(),
  title: { fr: "", en: "" },
  excerpt: { fr: "", en: "" },
  body: { fr: "", en: "" },
  category: "",
  date: new Date().toISOString().slice(0, 10),
  published: false,
});
const projectFields = [
  "title",
  "summary",
  "category",
  "date",
  "problem",
  "solution",
  "role",
  "features",
  "result",
] as const;
const fieldNames: Record<(typeof projectFields)[number], string> = {
  title: "Titre",
  summary: "Résumé",
  category: "Catégorie",
  date: "Période",
  problem: "Problème",
  solution: "Solution",
  role: "Rôle",
  features: "Fonctionnalités",
  result: "Résultats",
};
export default function Admin() {
  const [data, setData] = useState<PortfolioContent>(defaults),
    [tab, setTab] = useState<"projects" | "articles">("projects");
  const [project, setProject] = useState<Project | null>(null),
    [article, setArticle] = useState<Article | null>(null),
    [saved, setSaved] = useState("");
  useEffect(() => {
    const current = readContent();
    setData(current);
    setProject(current.projects[0] ?? null);
    setArticle(current.articles[0] ?? null);
  }, []);
  function persist(next: PortfolioContent) {
    saveContent(next);
    setData(next);
    setSaved("Enregistré dans ce navigateur.");
    setTimeout(() => setSaved(""), 3500);
  }
  function projectField(
    key: (typeof projectFields)[number],
    lang: "fr" | "en",
    value: string
  ) {
    if (project)
      setProject({ ...project, [key]: { ...project[key], [lang]: value } });
  }
  function articleField(
    key: "title" | "excerpt" | "body",
    lang: "fr" | "en",
    value: string
  ) {
    if (article)
      setArticle({ ...article, [key]: { ...article[key], [lang]: value } });
  }
  function saveProject() {
    if (!project) return;
    if (!project.title.fr.trim()) {
      alert("Le titre français est requis.");
      return;
    }
    const exists = data.projects.some((p) => p.id === project.id);
    const next = exists
      ? data.projects.map((p) => (p.id === project.id ? project : p))
      : [
          ...data.projects,
          {
            ...project,
            number: String(data.projects.length + 1).padStart(2, "0"),
          },
        ];
    persist({ ...data, projects: next });
    setProject(next.find((p) => p.id === project.id) ?? null);
  }
  function saveArticle() {
    if (!article) return;
    if (!article.title.fr.trim()) {
      alert("Le titre français est requis.");
      return;
    }
    const exists = data.articles.some((a) => a.id === article.id);
    const next = exists
      ? data.articles.map((a) => (a.id === article.id ? article : a))
      : [...data.articles, article];
    persist({ ...data, articles: next });
  }
  function remove() {
    if (!window.confirm("Supprimer cet élément de ce navigateur ?")) return;
    if (tab === "projects" && project) {
      const next = data.projects.filter((x) => x.id !== project.id);
      persist({ ...data, projects: next });
      setProject(next[0] ?? null);
    }
    if (tab === "articles" && article) {
      const next = data.articles.filter((x) => x.id !== article.id);
      persist({ ...data, articles: next });
      setArticle(next[0] ?? null);
    }
  }
  function reset() {
    if (
      !window.confirm(
        "Restaurer les projets du CV et supprimer les articles enregistrés dans ce navigateur ?"
      )
    )
      return;
    localStorage.removeItem("alpha-ousmane-portfolio-content-v1");
    persist(defaults);
    setProject(defaults.projects[0]);
    setArticle(null);
  }
  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-contenu-local.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Shell>
      <div className="inner">
        <a href="/">
          <ArrowLeft style={{ verticalAlign: "middle" }} /> Retour au portfolio
        </a>
        <h1>Administration</h1>
        <p className="intro">
          Gérez ici les projets et articles affichés dans ce navigateur. Les
          modifications restent sur cet appareil : elles ne sont pas partagées
          avec les autres visiteurs et ne remplacent pas les données du code
          source.
        </p>
        <div className="notice">
          Cet espace ne comporte pas de connexion. Il sert à préparer et
          prévisualiser du contenu local. Pour publier vos modifications à tous,
          il faudra ajouter une base de données et une authentification.
        </div>
        <div className="toolbar">
          <button onClick={exportJson}>
            <Download /> Exporter JSON
          </button>
          <button onClick={reset}>
            <RotateCcw /> Restaurer le contenu initial
          </button>
        </div>
        <div className="tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "projects"}
            className={tab === "projects" ? "active" : ""}
            onClick={() => setTab("projects")}
          >
            Projets ({data.projects.length})
          </button>
          <button
            role="tab"
            aria-selected={tab === "articles"}
            className={tab === "articles" ? "active" : ""}
            onClick={() => setTab("articles")}
          >
            Articles ({data.articles.length})
          </button>
        </div>
        <div className="layout">
          <aside className="panel">
            <div className="list">
              {tab === "projects"
                ? data.projects.map((p) => (
                    <button
                      className={p.id === project?.id ? "active" : ""}
                      key={p.id}
                      onClick={() => setProject(p)}
                    >
                      {p.title.fr || "Sans titre"}
                      <small>{p.category.fr}</small>
                    </button>
                  ))
                : data.articles.map((a) => (
                    <button
                      className={a.id === article?.id ? "active" : ""}
                      key={a.id}
                      onClick={() => setArticle(a)}
                    >
                      {a.title.fr || "Sans titre"}
                      <small>
                        {a.published ? "Publié" : "Brouillon"} · {a.date}
                      </small>
                    </button>
                  ))}
            </div>
            <div className="toolbar">
              <button
                onClick={() =>
                  tab === "projects"
                    ? setProject(blankProject())
                    : setArticle(blankArticle())
                }
              >
                <Plus />{" "}
                {tab === "projects" ? "Nouveau projet" : "Nouvel article"}
              </button>
            </div>
          </aside>
          <section className="panel">
            {tab === "projects" ? (
              project ? (
                <>
                  <h2>
                    {data.projects.some((x) => x.id === project.id)
                      ? "Modifier le projet"
                      : "Nouveau projet"}
                  </h2>
                  {projectFields.map((key) => (
                    <div className="two" key={key}>
                      {(["fr", "en"] as const).map((lang) => (
                        <div key={lang}>
                          <label htmlFor={key + lang}>
                            {fieldNames[key]} · {lang.toUpperCase()}
                          </label>
                          {[
                            "summary",
                            "problem",
                            "solution",
                            "role",
                            "features",
                            "result",
                          ].includes(key) ? (
                            <textarea
                              id={key + lang}
                              value={project[key][lang]}
                              onChange={(e) =>
                                projectField(key, lang, e.target.value)
                              }
                            />
                          ) : (
                            <input
                              id={key + lang}
                              value={project[key][lang]}
                              onChange={(e) =>
                                projectField(key, lang, e.target.value)
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <label htmlFor="tech">
                    Technologies (séparées par une virgule)
                  </label>
                  <input
                    id="tech"
                    value={project.tech.join(", ")}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        tech: e.target.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                  <label htmlFor="link">URL du projet (facultative)</label>
                  <input
                    id="link"
                    type="url"
                    value={project.link ?? ""}
                    onChange={(e) =>
                      setProject({ ...project, link: e.target.value })
                    }
                  />
                  <div className="toolbar">
                    <button className="save" onClick={saveProject}>
                      <Save /> Enregistrer
                    </button>
                    {data.projects.some((x) => x.id === project.id) && (
                      <button className="danger" onClick={remove}>
                        <Trash2 /> Supprimer
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <p>Aucun projet. Créez-en un dans le panneau de gauche.</p>
              )
            ) : article ? (
              <>
                <h2>
                  {data.articles.some((x) => x.id === article.id)
                    ? "Modifier l’article"
                    : "Nouvel article"}
                </h2>
                {(["title", "excerpt", "body"] as const).map((key) => (
                  <div className="two" key={key}>
                    {(["fr", "en"] as const).map((lang) => (
                      <div key={lang}>
                        <label htmlFor={key + lang}>
                          {key === "title"
                            ? "Titre"
                            : key === "excerpt"
                            ? "Résumé"
                            : "Texte"}{" "}
                          · {lang.toUpperCase()}
                        </label>
                        {key === "title" ? (
                          <input
                            id={key + lang}
                            value={article[key][lang]}
                            onChange={(e) =>
                              articleField(key, lang, e.target.value)
                            }
                          />
                        ) : (
                          <textarea
                            id={key + lang}
                            style={
                              key === "body" ? { minHeight: 220 } : undefined
                            }
                            value={article[key][lang]}
                            onChange={(e) =>
                              articleField(key, lang, e.target.value)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="two">
                  <div>
                    <label htmlFor="articleCategory">Catégorie</label>
                    <input
                      id="articleCategory"
                      value={article.category}
                      onChange={(e) =>
                        setArticle({ ...article, category: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="articleDate">Date</label>
                    <input
                      id="articleDate"
                      type="date"
                      value={article.date}
                      onChange={(e) =>
                        setArticle({ ...article, date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={article.published}
                    onChange={(e) =>
                      setArticle({ ...article, published: e.target.checked })
                    }
                  />{" "}
                  Afficher cet article sur le portfolio local
                </label>
                <div className="toolbar">
                  <button className="save" onClick={saveArticle}>
                    <Save /> Enregistrer
                  </button>
                  {data.articles.some((x) => x.id === article.id) && (
                    <button className="danger" onClick={remove}>
                      <Trash2 /> Supprimer
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p>Aucun article. Créez-en un dans le panneau de gauche.</p>
            )}
            {saved && (
              <p className="saved" role="status">
                {saved}
              </p>
            )}
          </section>
        </div>
      </div>
    </Shell>
  );
}
