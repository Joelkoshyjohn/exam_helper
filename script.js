const EXAM_DATE = new Date(2026, 10, 23, 0, 0, 0);
const STORAGE_KEY = "studydesk-cst401-v1";
const REVISION_OFFSETS = [0, 1, 3, 7];

const modules = [
  {
    id: 1,
    title: "Introduction",
    hours: 7,
    topics: [
      "Introduction to Artificial Intelligence", "Foundations of AI", "History of AI", "Applications of AI",
      "Intelligent Agents", "Agents and Environments", "Concept of Rationality", "Nature of Environments", "Structure of Agents",
    ],
    important: [
      ["Types of agents: Simple Reflex, Model-Based, Goal-Based and Utility-Based", "High", 14],
      ["PEAS description", "High", 8], ["Properties of task environments", "High", 8],
      ["Rational agents", "High", 6], ["Structure of intelligent agents", "Medium", 8],
      ["Applications of AI", "Medium", 6],
    ],
  },
  {
    id: 2,
    title: "Problem Solving",
    hours: 7,
    topics: [
      "Problem-solving agents", "Problem-solving process", "Searching for solutions", "Uninformed search strategies",
      "Informed search strategies", "Heuristic functions",
    ],
    important: [
      ["Breadth First Search (BFS)", "High", 8], ["Depth First Search (DFS)", "High", 8],
      ["Uniform Cost Search", "High", 8], ["Depth Limited Search", "Medium", 6],
      ["Iterative Deepening DFS", "Medium", 8], ["Best First Search", "High", 8],
      ["A* Search", "High", 14], ["Heuristic functions", "High", 6], ["8-puzzle problem formulation", "High", 8],
    ],
  },
  {
    id: 3,
    title: "Search in Complex Environments",
    hours: 7,
    topics: [
      "Adversarial search", "Games", "Optimal decisions in games", "Minimax algorithm", "Alpha-Beta pruning",
      "Constraint Satisfaction Problems", "Constraint propagation", "Backtracking search", "Structure of CSP problems",
    ],
    important: [
      ["Minimax algorithm with game tree", "High", 14], ["Alpha-Beta pruning with example", "High", 14],
      ["CSP components", "High", 8], ["Backtracking search", "High", 8], ["Forward checking", "Medium", 6],
      ["MRV heuristic", "Medium", 6], ["Least Constraining Value", "Medium", 6],
      ["Local consistency", "Medium", 8], ["Crypt arithmetic problems", "High", 8],
    ],
  },
  {
    id: 4,
    title: "Knowledge Representation and Reasoning",
    hours: 9,
    topics: [
      "Logical agents", "Knowledge-based agents", "Logic", "Propositional Logic", "Propositional theorem proving",
      "Agents based on Propositional Logic", "First Order Predicate Logic", "Syntax and semantics of FOL",
      "Knowledge representation in FOL", "Inference in First Order Logic", "Propositional versus First Order inference",
      "Unification and lifting", "Forward chaining", "Backward chaining", "Resolution",
    ],
    important: [
      ["Propositional logic", "High", 8], ["First Order Logic", "High", 8],
      ["English sentence to FOL conversion", "High", 8], ["Unification and Most General Unifier (MGU)", "High", 8],
      ["Forward chaining", "High", 14], ["Backward chaining", "High", 14], ["Resolution", "High", 14],
      ["Knowledge-based agents", "Medium", 8], ["Propositional theorem proving", "Medium", 8],
    ],
  },
  {
    id: 5,
    title: "Machine Learning",
    hours: 6,
    topics: [
      "Learning from examples", "Forms of learning", "Supervised learning", "Learning decision trees",
      "Generalization and overfitting", "Evaluating and choosing the best hypothesis",
      "Regression and classification with linear models",
    ],
    important: [
      ["Decision Tree Learning", "High", 14], ["Entropy", "High", 8], ["Information Gain", "High", 8],
      ["Decision tree construction problems", "High", 14], ["Univariate Linear Regression", "High", 8],
      ["Multivariate Linear Regression", "Medium", 8], ["Logistic Regression", "High", 8],
      ["Best hypothesis selection", "Medium", 6], ["Ockham's Razor", "Low", 3],
    ],
  },
];

const priorityOrder = { High: 0, Medium: 1, Low: 2 };
const topicRecords = modules.flatMap((module) => module.topics.map((name, index) => ({
  id: `m${module.id}-t${index + 1}`,
  module: module.id,
  name,
  priority: module.important.find(([importantName]) => importantName.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(importantName.toLowerCase()))?.[1] ?? "",
})));

function topicForImportant(module, name) {
  const mappings = {
    "Types of agents: Simple Reflex, Model-Based, Goal-Based and Utility-Based": "Intelligent Agents",
    "PEAS description": "Agents and Environments",
    "Properties of task environments": "Nature of Environments",
    "Rational agents": "Concept of Rationality",
    "Structure of intelligent agents": "Structure of Agents",
    "Applications of AI": "Applications of AI",
    "Breadth First Search (BFS)": "Uninformed search strategies",
    "Depth First Search (DFS)": "Uninformed search strategies",
    "Uniform Cost Search": "Uninformed search strategies",
    "Depth Limited Search": "Uninformed search strategies",
    "Iterative Deepening DFS": "Uninformed search strategies",
    "Best First Search": "Informed search strategies",
    "A* Search": "Informed search strategies",
    "8-puzzle problem formulation": "Problem-solving process",
    "Minimax algorithm with game tree": "Minimax algorithm",
    "Alpha-Beta pruning with example": "Alpha-Beta pruning",
    "CSP components": "Constraint Satisfaction Problems",
    "Forward checking": "Constraint propagation",
    "MRV heuristic": "Constraint Satisfaction Problems",
    "Least Constraining Value": "Constraint Satisfaction Problems",
    "Local consistency": "Constraint propagation",
    "Crypt arithmetic problems": "Constraint Satisfaction Problems",
    "English sentence to FOL conversion": "First Order Predicate Logic",
    "Unification and Most General Unifier (MGU)": "Unification and lifting",
    "Knowledge-based agents": "Knowledge-based agents",
    "Propositional theorem proving": "Propositional theorem proving",
    "Decision Tree Learning": "Learning decision trees",
    "Entropy": "Learning decision trees",
    "Information Gain": "Learning decision trees",
    "Decision tree construction problems": "Learning decision trees",
    "Univariate Linear Regression": "Regression and classification with linear models",
    "Multivariate Linear Regression": "Regression and classification with linear models",
    "Logistic Regression": "Regression and classification with linear models",
    "Best hypothesis selection": "Evaluating and choosing the best hypothesis",
    "Ockham's Razor": "Evaluating and choosing the best hypothesis",
  };
  const mappedName = mappings[name] || name;
  return topicRecords.find((topic) => topic.module === module.id && topic.name === mappedName)
    || topicRecords.find((topic) => topic.module === module.id && (topic.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(topic.name.toLowerCase())))
    || topicRecords.find((topic) => topic.module === module.id);
}

const importantRecords = modules.flatMap((module) => module.important.map(([name, priority, marks], index) => ({
  id: `m${module.id}-i${index + 1}`,
  module: module.id,
  name,
  priority,
  marks,
  topicId: topicForImportant(module, name)?.id,
})));

const noteLibrary = {
  "Intelligent Agents": {
    definition: "An agent perceives its environment through sensors and acts on it through actuators.",
    points: ["An agent function maps percept sequences to actions.", "A rational agent selects actions expected to maximize its performance measure.", "Agent design depends on the task environment."],
    example: "For a vacuum agent, percepts can include its location and whether that square is dirty; actions include moving and cleaning.",
  },
  "Breadth First Search (BFS)": {
    definition: "BFS expands the shallowest unexpanded node first, using a FIFO queue.",
    points: ["Complete when the branching factor is finite.", "Optimal when every step has the same cost.", "Uses substantial memory because it stores the frontier at each level."],
    algorithm: ["Put the start node in a FIFO frontier.", "Remove the front node and test for a goal.", "Add each not-yet-explored successor to the back.", "Repeat until a goal is found or the frontier is empty."],
  },
  "Depth First Search (DFS)": {
    definition: "DFS expands the deepest unexpanded node first, typically using a stack or recursion.",
    points: ["Uses less frontier memory than BFS in many tree searches.", "Not generally optimal.", "Can fail to terminate in an infinite-depth space without cycle checks or a depth limit."],
    algorithm: ["Push the start node onto a stack.", "Pop a node and test for a goal.", "Push its unvisited successors.", "Continue until a goal is found or the stack is empty."],
  },
  "A* Search": {
    definition: "A* is an informed best-first search that ranks nodes using an estimated total solution cost.",
    points: ["Evaluation: f(n) = g(n) + h(n).", "g(n) is the cost already incurred; h(n) estimates the remaining cost.", "A* tree search is optimal with an admissible heuristic; graph-search conditions also depend on consistency or node reopening."],
    example: "If a path to n costs g(n)=4 and the heuristic estimates h(n)=7, then f(n)=11. A* selects the available node with the smallest f-value.",
  },
  "Minimax algorithm with game tree": {
    definition: "Minimax chooses an optimal move in a two-player, zero-sum, deterministic game with alternating turns.",
    points: ["MAX nodes choose the largest child value.", "MIN nodes choose the smallest child value.", "Terminal positions receive utility values; values are backed up toward the root."],
    algorithm: ["Expand the game tree to terminal states or a cutoff.", "Assign utilities to leaves.", "Back up maximum values at MAX levels and minimum values at MIN levels.", "Choose the root action with the best backed-up value."],
  },
  "Alpha-Beta pruning with example": {
    definition: "Alpha-beta pruning avoids searching branches that cannot change the minimax decision.",
    points: ["Alpha is MAX's best value found so far; beta is MIN's best value found so far.", "Prune when alpha is greater than or equal to beta.", "With good move ordering it can search deeper; it returns the same choice as minimax."],
  },
  "Constraint Satisfaction Problems": {
    definition: "A CSP is described by variables, a domain of values for each variable, and constraints on allowed combinations.",
    points: ["Backtracking assigns one variable at a time.", "Forward checking removes values inconsistent with a new assignment.", "MRV chooses the unassigned variable with the fewest legal values; least-constraining value leaves the most options for others."],
    example: "In a map-colouring CSP, regions are variables, colours are domains, and adjacent regions must have different colours.",
  },
  "Propositional Logic": {
    definition: "Propositional logic represents facts as propositions combined with logical connectives.",
    points: ["A proposition is true or false.", "Common connectives include NOT (¬), AND (∧), OR (∨), implication (→), and biconditional (↔).", "A model assigns truth values; entailment means every model of the premises also satisfies the conclusion."],
  },
  "First Order Predicate Logic": {
    definition: "First-order logic extends propositional logic with objects, predicates, variables, functions, and quantifiers.",
    points: ["Universal quantifier: ∀x (for every x).", "Existential quantifier: ∃x (there exists an x).", "Predicates express properties or relations over objects."],
    example: "“Every student studies” can be represented as ∀x (Student(x) → Studies(x)).",
  },
  "Unification and Most General Unifier (MGU)": {
    definition: "Unification finds substitutions that make two logical expressions identical; an MGU is the least restrictive such substitution.",
    points: ["A substitution maps variables to terms.", "Consistent substitutions must respect repeated variables.", "Unification supports first-order inference rules such as resolution."],
    example: "Unifying Knows(John, x) with Knows(y, Mary) gives {y/John, x/Mary}.",
  },
  "Forward chaining": {
    definition: "Forward chaining is a data-driven inference procedure that applies rules whose premises are known to derive new facts.",
    points: ["Start from known facts.", "Find rules whose antecedents are satisfied.", "Add their conclusions and continue until the query is proved or no new facts can be derived."],
  },
  "Backward chaining": {
    definition: "Backward chaining is a goal-driven procedure that works backward from a query to the facts or rules that could prove it.",
    points: ["Choose a rule whose conclusion matches the goal.", "Turn its premises into subgoals.", "Recursively prove subgoals from facts or other rules."],
  },
  "Resolution": {
    definition: "Resolution is an inference rule used to derive consequences from clauses, typically after converting premises to clause form.",
    points: ["To prove a query by refutation, add its negation to the knowledge base.", "Resolve clauses containing complementary literals.", "An empty clause indicates a contradiction and therefore proves the query."],
  },
  "Entropy": {
    definition: "Entropy measures the uncertainty in a collection of examples with respect to their class labels.",
    points: ["For class proportions pᵢ, H(S) = −Σ pᵢ log₂(pᵢ).", "Entropy is zero when all examples belong to one class.", "For two equally represented classes, entropy is 1 bit."],
  },
  "Information Gain": {
    definition: "Information gain measures the expected reduction in entropy after splitting examples on an attribute.",
    points: ["Gain(S,A) = H(S) − Σᵥ (|Sᵥ|/|S|) H(Sᵥ).", "Compute the parent entropy, each subset entropy, and the size-weighted remainder.", "Decision-tree learning can select the attribute with the largest gain."],
  },
  "Univariate Linear Regression": {
    definition: "Univariate linear regression models a continuous output from one input using a line.",
    points: ["Prediction: ŷ = θ₀ + θ₁x.", "A common squared-error objective is J(θ) = (1/(2m)) Σ(ŷᵢ − yᵢ)².", "The fitted parameters minimize the chosen loss on training examples."],
  },
  "Logistic Regression": {
    definition: "Logistic regression models a class probability using a sigmoid applied to a linear score.",
    points: ["σ(z) = 1/(1+e⁻ᶻ).", "For binary classification, p(y=1|x) = σ(θᵀx).", "A decision threshold converts the probability into a predicted class."],
  },
  "Heuristic functions": {
    definition: "A heuristic h(n) estimates the cost from a search state n to a goal.",
    points: ["A heuristic can guide informed search toward promising states.", "An admissible heuristic never overestimates the true remaining cost.", "Heuristic quality affects both search effort and optimality guarantees."],
  },
  "PEAS description": {
    definition: "PEAS describes an agent task environment using Performance measure, Environment, Actuators, and Sensors.",
    points: ["Specify how success is evaluated.", "Describe the world and the actions available to the agent.", "List the percepts the agent can receive."],
  },
  "Decision Tree Learning": {
    definition: "A decision tree predicts an output by testing attributes along a path from the root to a leaf.",
    points: ["Internal nodes represent tests; branches represent outcomes; leaves represent predictions.", "Tree construction recursively partitions training examples.", "Overly complex trees can overfit, so evaluation and model selection matter."],
  },
};

const pageNames = {
  dashboard: "Dashboard", syllabus: "My syllabus", important: "Important topics", papers: "Question papers", bookmarks: "Bookmarks",
  repeated: "Repeated questions", bank: "Question bank", notes: "Study notes", planner: "Study planner",
  revision: "Revision tracker", mock: "Mock exam", formulas: "Formula sheet", analytics: "Analytics", settings: "Settings",
};

const initialState = {
  completedTopics: [], prepStatus: {}, topicNotes: {}, studiedAt: {}, revisedAt: {},
  questionStatus: {}, bookmarks: [], dailyPlans: {}, studyMinutesByDay: {}, completedPomodoros: 0,
  pomodoro: { focusMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15, cycle: 0, mode: "focus", running: false, remainingMs: 25 * 60 * 1000, deadline: null },
  dailyGoalMinutes: 90, mockSessions: [], recentActivity: [], darkMode: false,
};

let state = loadState();
let activePage = "dashboard";
let searchQuery = "";
let selectedNoteTopic = topicRecords[0]?.id ?? "";
let pomodoroInterval = null;
let mockInterval = null;
let toastTimeout = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return structuredClone(initialState);
    return {
      ...structuredClone(initialState),
      ...saved,
      pomodoro: { ...initialState.pomodoro, ...(saved.pomodoro || {}) },
      dailyPlans: saved.dailyPlans || {},
      studyMinutesByDay: saved.studyMinutesByDay || {},
      completedTopics: Array.isArray(saved.completedTopics) ? saved.completedTopics : [],
      bookmarks: Array.isArray(saved.bookmarks) ? saved.bookmarks : [],
      mockSessions: Array.isArray(saved.mockSessions) ? saved.mockSessions : [],
      recentActivity: Array.isArray(saved.recentActivity) ? saved.recentActivity : [],
    };
  } catch (error) {
    console.error("Could not load saved study data.", error);
    return structuredClone(initialState);
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Could not save study data.", error);
    showToast("Your browser could not save this update. Check local storage space and permissions.");
    return false;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function todayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(dateString, options = { month: "short", day: "numeric" }) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(undefined, options);
}

function topicById(id) {
  return topicRecords.find((topic) => topic.id === id);
}

function moduleById(id) {
  return modules.find((module) => module.id === Number(id));
}

function moduleCompletion(moduleId) {
  const topics = topicRecords.filter((topic) => topic.module === moduleId);
  const completed = topics.filter((topic) => state.completedTopics.includes(topic.id)).length;
  return { completed, total: topics.length, percent: topics.length ? Math.round((completed / topics.length) * 100) : 0 };
}

function totalCompletion() {
  const completed = topicRecords.filter((topic) => state.completedTopics.includes(topic.id)).length;
  return { completed, total: topicRecords.length, percent: Math.round((completed / topicRecords.length) * 100) };
}

function recordActivity(text) {
  state.recentActivity.unshift({ text, date: new Date().toISOString() });
  state.recentActivity = state.recentActivity.slice(0, 12);
}

function showToast(message) {
  const region = document.querySelector("#toast-region");
  if (!region) return;
  region.textContent = message;
  region.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => region.classList.remove("is-visible"), 3200);
}

function renderPage(page = activePage) {
  activePage = pageNames[page] ? page : "dashboard";
  const content = document.querySelector("#page-content");
  document.querySelector("#page-breadcrumb").textContent = pageNames[activePage];
  document.querySelector("#sidebar-streak").textContent = `${studyStreak()} day streak`;
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.page === activePage);
  });
  const renderers = {
    dashboard: renderDashboard, syllabus: renderSyllabus, important: renderImportant, papers: renderPapers,
    repeated: renderRepeated, bank: renderQuestionBank, bookmarks: renderBookmarks, notes: renderNotes, planner: renderPlanner,
    revision: renderRevision, mock: renderMock, formulas: renderFormulas, analytics: renderAnalytics, settings: renderSettings,
  };
  content.innerHTML = renderers[activePage]();
  document.querySelector("#sidebar").classList.remove("is-open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
  if (activePage === "mock" && state.activeMock?.startedAt) updateMockClock();
}

function headerBlock(eyebrow, title, description, actions = "") {
  return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-description">${description}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
}

function renderDashboard() {
  const progress = totalCompletion();
  const now = new Date();
  const countdownMs = Math.max(0, EXAM_DATE - now);
  const days = Math.floor(countdownMs / 86400000);
  const hours = Math.floor((countdownMs % 86400000) / 3600000);
  const minutes = Math.floor((countdownMs % 3600000) / 60000);
  const todayMinutes = state.studyMinutesByDay[todayKey()] || 0;
  const due = dueRevisions().slice(0, 5);
  const nextTopics = recommendedTopics(3);
  const tasks = getPlan(todayKey());
  const modulesHtml = modules.map((module) => {
    const completion = moduleCompletion(module.id);
    return `<article class="module-card">
      <div class="module-card-top"><span class="module-badge">M${module.id}</span><span class="module-percent">${completion.percent}%</span></div>
      <h3>${escapeHTML(module.title)}</h3><p>${completion.completed} of ${completion.total} topics complete · ${module.hours} syllabus hours</p>
      <div class="progress-track"><span style="width:${completion.percent}%"></span></div>
      <button class="text-button" data-action="open-module" data-module="${module.id}">Continue module <span>→</span></button>
    </article>`;
  }).join("");
  const taskHtml = tasks.slice(0, 4).map((task) => renderTask(task, todayKey())).join("");
  const dueHtml = due.length ? due.map((item) => `<button class="list-row compact-row" data-action="open-topic" data-topic="${item.topic.id}">
    <span class="priority-marker ${item.kind === "Final" ? "marker-high" : ""}"></span><span class="row-main"><strong>${escapeHTML(item.topic.name)}</strong><small>Module ${item.topic.module} · ${item.kind} revision ${item.due === todayKey() ? "due today" : `· ${formatDate(item.due)}`}</small></span><span class="row-arrow">→</span></button>`).join("") : `<div class="empty-state small-empty"><span class="empty-icon">✓</span><strong>All caught up</strong><p>No revisions due today.</p></div>`;
  const recommendedHtml = nextTopics.map((topic) => {
    const important = importantRecords.find((item) => item.topicId === topic.id);
    return `<button class="list-row compact-row" data-action="open-topic" data-topic="${topic.id}"><span class="priority-tag ${important ? `priority-${important.priority.toLowerCase()}` : "priority-medium"}">${important?.priority ?? "Topic"}</span><span class="row-main"><strong>${escapeHTML(topic.name)}</strong><small>Module ${topic.module}${important ? ` · ${important.marks} marks` : ""}</small></span><span class="row-arrow">→</span></button>`;
  }).join("");
  const activity = state.recentActivity.length ? state.recentActivity.slice(0, 4).map((item) => `<div class="activity-row"><span class="activity-dot"></span><div><strong>${escapeHTML(item.text)}</strong><small>${new Date(item.date).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</small></div></div>`).join("") : `<p class="muted-note">Your study actions will appear here.</p>`;
  return `${headerBlock(`${now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}`, "Welcome back.", "A steady session today moves you closer to exam day.", `<button class="button button-primary" data-action="go-page" data-page="planner">Plan today's study <span>→</span></button>`)}
    <section class="exam-banner">
      <div><p class="banner-label"><span class="banner-dot"></span> COUNTDOWN TO EXAM DATE</p><h2>Artificial Intelligence <span>CST401</span></h2><p>KTU B.Tech S7 CSE · 2019 Scheme · Forenoon · Slot A · Start time not specified</p></div>
      <div class="countdown" id="exam-countdown" aria-label="${days} days, ${hours} hours, ${minutes} minutes remaining">
        <div><strong id="countdown-days">${String(days).padStart(2, "0")}</strong><span>days</span></div><i>:</i><div><strong id="countdown-hours">${String(hours).padStart(2, "0")}</strong><span>hours</span></div><i>:</i><div><strong id="countdown-minutes">${String(minutes).padStart(2, "0")}</strong><span>minutes</span></div>
      </div>
      <div class="banner-footer"><span>23 November 2026</span><span>3 hours · 100 marks</span></div>
    </section>
    <section class="stats-grid">
      <article class="stat-card"><div class="stat-icon blue-icon">◴</div><div><span>SYLLABUS COMPLETE</span><strong>${progress.percent}<small>%</small></strong><p>${progress.completed} of ${progress.total} topics</p></div></article>
      <article class="stat-card"><div class="stat-icon green-icon">✓</div><div><span>TOPICS REMAINING</span><strong>${progress.total - progress.completed}</strong><p>Across five modules</p></div></article>
      <article class="stat-card"><div class="stat-icon violet-icon">◷</div><div><span>STUDY TIME TODAY</span><strong>${(todayMinutes / 60).toFixed(1)}<small>h</small></strong><p>${todayMinutes} minutes logged</p></div></article>
      <article class="stat-card"><div class="stat-icon amber-icon">✦</div><div><span>STUDY STREAK</span><strong>${studyStreak()}</strong><p>consecutive days</p></div></article>
    </section>
    <div class="section-title-row"><div><p class="eyebrow">YOUR COURSE</p><h2>Module progress</h2></div><button class="text-button" data-action="go-page" data-page="syllabus">View full syllabus →</button></div>
    <section class="module-grid">${modulesHtml}</section>
    ${renderPomodoro()}
    <div class="dashboard-columns">
      <section class="panel"><div class="panel-heading"><div><p class="eyebrow">TODAY'S FOCUS</p><h2>Study targets</h2></div><button class="text-button" data-action="go-page" data-page="planner">Edit plan →</button></div>
        <div class="task-list">${taskHtml}</div><div class="goal-progress"><div><span>Daily study goal</span><strong>${todayMinutes} / ${state.dailyGoalMinutes} min</strong></div><div class="progress-track"><span style="width:${Math.min(100, (todayMinutes / Math.max(1, state.dailyGoalMinutes)) * 100)}%"></span></div></div>
      </section>
      <section class="panel"><div class="panel-heading"><div><p class="eyebrow">SPACED PRACTICE</p><h2>Revisions due</h2></div><button class="text-button" data-action="go-page" data-page="revision">See all →</button></div>${dueHtml}</section>
    </div>
    <div class="dashboard-columns lower-columns">
      <section class="panel"><div class="panel-heading"><div><p class="eyebrow">NEXT BEST STEP</p><h2>Topics to study next</h2></div><button class="text-button" data-action="go-page" data-page="important">Priorities →</button></div>${recommendedHtml}</section>
      <section class="panel"><div class="panel-heading"><div><p class="eyebrow">YOUR JOURNEY</p><h2>Recent activity</h2></div></div><div class="activity-list">${activity}</div></section>
    </div>`;
}

function renderSyllabus() {
  const progress = totalCompletion();
  const moduleCards = modules.map((module) => {
    const completion = moduleCompletion(module.id);
    const topics = module.topics.map((name, index) => {
      const topic = topicRecords.find((item) => item.module === module.id && item.name === name);
      const complete = state.completedTopics.includes(topic.id);
      const important = importantRecords.find((item) => item.topicId === topic.id);
      return `<div class="syllabus-topic ${complete ? "is-complete" : ""}">
        <label class="topic-check"><input id="topic-check-${topic.id}" type="checkbox" data-action="toggle-topic" data-topic="${topic.id}" ${complete ? "checked" : ""} />
        <span class="custom-check" aria-hidden="true">${complete ? "✓" : ""}</span><span class="topic-name">${escapeHTML(name)}</span></label>
        ${important ? `<span class="priority-tag priority-${important.priority.toLowerCase()}">${important.priority}</span>` : ""}
        <button class="inline-link" data-action="open-topic" data-topic="${topic.id}" type="button" aria-label="Open notes for ${escapeHTML(name)}">Notes ↗</button>
      </div>`;
    }).join("");
    return `<details class="syllabus-module" ${module.id === 1 ? "open" : ""}>
      <summary><span class="module-badge">M${module.id}</span><span class="summary-main"><strong>${escapeHTML(module.title)}</strong><small>${module.topics.length} topics · ${module.hours} syllabus hours</small></span>
      <span class="summary-progress"><strong>${completion.percent}%</strong><span class="progress-track"><span style="width:${completion.percent}%"></span></span></span><span class="summary-count">${completion.completed}/${completion.total}</span><span class="summary-chevron">⌄</span></summary>
      <div class="syllabus-topic-list">${topics}</div>
    </details>`;
  }).join("");
  return `${headerBlock("COURSE OUTLINE", "My syllabus", "Track each syllabus topic. Your completion state is saved on this device.")}
    <section class="panel syllabus-overview"><div class="syllabus-overview-copy"><div><p class="eyebrow">OVERALL PROGRESS</p><h2>${progress.percent}% <span>complete</span></h2></div><p>${progress.completed} topics completed of ${progress.total} total · 36 syllabus hours</p></div><div class="progress-track large-track"><span style="width:${progress.percent}%"></span></div></section>
    <div class="module-accordion">${moduleCards}</div>`;
}

function renderImportant() {
  const selected = document.querySelector("#priority-filter")?.value || "all";
  const records = importantRecords.filter((item) => selected === "all" || item.priority === selected).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || a.module - b.module);
  const cards = records.map((item) => {
    const topic = topicById(item.topicId);
    const status = state.prepStatus[item.id] || "Not started";
    const revised = state.revisedAt[topic.id];
    return `<article class="important-row"><span class="priority-tag priority-${item.priority.toLowerCase()}">${item.priority}</span><div class="important-main"><button class="link-heading" data-action="open-topic" data-topic="${topic.id}">${escapeHTML(item.name)}</button><p>Module ${item.module} · Expected question: ${item.marks} marks</p><textarea class="topic-note-input" rows="2" placeholder="Personal notes…" aria-label="Notes for ${escapeHTML(item.name)}" data-action="save-topic-note" data-topic="${topic.id}">${escapeHTML(state.topicNotes[topic.id] || "")}</textarea><button class="text-button" data-action="open-related-questions" data-topic="${topic.id}">Related questions →</button></div><div class="important-controls"><label>Preparation<select data-action="set-prep" data-id="${item.id}">${["Not started", "Learning", "Completed", "Needs revision"].map((choice) => `<option ${status === choice ? "selected" : ""}>${choice}</option>`).join("")}</select></label><span class="revision-mini">${revised ? `Last revised ${formatDate(revised)}` : "Not revised yet"}</span><button class="button button-small button-quiet" data-action="mark-revised" data-topic="${topic.id}">Mark revised</button><button class="icon-button favorite-button ${state.bookmarks.includes(item.id) ? "is-saved" : ""}" data-action="toggle-bookmark" data-id="${item.id}" aria-label="Bookmark ${escapeHTML(item.name)}">☆</button></div></article>`;
  }).join("");
  return `${headerBlock("FOCUS LIST", "Important topics", "Priorities follow the study brief you provided; no past-paper frequency is implied.")}
    <section class="panel filter-panel"><div class="filter-intro"><strong>${importantRecords.length} syllabus priority topics</strong><span>Study status, spaced revisions, personal notes and marks to prepare.</span></div><label class="select-filter">Priority<select id="priority-filter"><option value="all" ${selected === "all" ? "selected" : ""}>All priorities</option><option value="High" ${selected === "High" ? "selected" : ""}>High priority</option><option value="Medium" ${selected === "Medium" ? "selected" : ""}>Medium priority</option><option value="Low" ${selected === "Low" ? "selected" : ""}>Low priority</option></select></label></section>
    <section class="important-list">${cards || `<div class="empty-state">No topics match this priority.</div>`}</section>`;
}

function renderPapers() {
  const query = document.querySelector("#paper-search")?.value.toLowerCase() || "";
  const moduleFilter = document.querySelector("#paper-module")?.value || "all";
  const markFilter = document.querySelector("#paper-marks")?.value || "all";
  const paperFilter = document.querySelector("#paper-source")?.value || "all";
  const filtered = allPaperQuestions.filter((question) => {
    const matchesText = !query || `${question.text} ${question.paperTitle} module ${question.module}`.toLowerCase().includes(query);
    return matchesText
      && (moduleFilter === "all" || question.module === Number(moduleFilter))
      && (markFilter === "all" || question.marks === Number(markFilter) || question.parts?.some((part) => part.marks === Number(markFilter)))
      && (paperFilter === "all" || (paperFilter === "archive" ? !question.supplementary : question.supplementary));
  });
  const paperOrder = [...PAPER_ARCHIVE.map((paper) => paper.id), SUPPLEMENTAL_PAPER.id];
  const paperCards = paperOrder.map((paperId) => {
    const questions = filtered.filter((question) => question.paperId === paperId);
    if (!questions.length) return "";
    const paper = paperId === SUPPLEMENTAL_PAPER.id ? SUPPLEMENTAL_PAPER : PAPER_ARCHIVE.find((item) => item.id === paperId);
    const indexedCount = allPaperQuestions.filter((question) => question.paperId === paperId).length;
    return `<details class="paper-card" ${query || moduleFilter !== "all" || markFilter !== "all" ? "open" : ""}><summary><span class="paper-date-badge">${paper.year}</span><span class="paper-summary-main"><strong>${escapeHTML(paper.title)}</strong><small>${escapeHTML(paper.session)} · ${indexedCount} indexed questions · ${paperId === SUPPLEMENTAL_PAPER.id ? "supplemental practice" : "source: uploaded ZIP"}</small></span><span class="paper-match-count">${questions.length} shown</span><span class="summary-chevron">⌄</span></summary>${paper.note ? `<p class="paper-note">${escapeHTML(paper.note)}</p>` : ""}<div class="paper-question-list">${questions.map((question) => renderPaperQuestion(question)).join("")}</div></details>`;
  }).join("");
  return `${headerBlock("SOURCE MATERIALS", "Question papers", "Seven KTU examination papers from the supplied ZIP, plus the separate first-series practice PDF. Questions are indexed by paper, module and marks.")}
    <section class="paper-summary-grid"><article class="panel paper-summary"><span class="stat-icon blue-icon">▧</span><div><strong>${PAPER_ARCHIVE.length}</strong><span>uploaded KTU papers</span></div></article><article class="panel paper-summary"><span class="stat-icon violet-icon">☷</span><div><strong>${PAPER_QUESTIONS.length}</strong><span>indexed archive questions</span></div></article><article class="panel paper-summary"><span class="stat-icon amber-icon">↻</span><div><strong>${filtered.length}</strong><span>questions match filters</span></div></article></section>
    <section class="notice-card notice-info"><span class="notice-icon">i</span><div><strong>Source and extraction notes</strong><p>Archive questions were extracted from the seven PDFs. Scanned/encoded text has occasional extraction ambiguity; missing diagrams and numerical tables are not reconstructed here. Use the original paper for those visual details. The first-series PDF is explicitly marked as possibly not matching the actual exam and is excluded from repetition counts.</p></div></section>
    <section class="panel bank-filter paper-filter"><label class="search-field"><span>⌕</span><input id="paper-search" type="search" value="${escapeHTML(query)}" placeholder="Search questions or paper title" aria-label="Search question papers" /></label><label>Module<select id="paper-module"><option value="all">All modules</option>${modules.map((item) => `<option value="${item.id}" ${moduleFilter === String(item.id) ? "selected" : ""}>Module ${item.id}</option>`).join("")}</select></label><label>Marks<select id="paper-marks"><option value="all">All marks</option>${[3, 4, 5, 6, 7, 8, 9, 10, 14].map((value) => `<option value="${value}" ${markFilter === String(value) ? "selected" : ""}>${value} marks</option>`).join("")}</select></label><label>Source<select id="paper-source"><option value="all">All sources</option><option value="archive" ${paperFilter === "archive" ? "selected" : ""}>KTU archive</option><option value="supplemental" ${paperFilter === "supplemental" ? "selected" : ""}>First-series PDF</option></select></label><span class="result-count">${filtered.length} questions</span></section>
    <div class="papers-list">${paperCards || `<div class="panel empty-state"><span class="empty-icon">⌕</span><strong>No questions match these filters</strong><p>Try clearing the module, marks or source filters.</p></div>`}</div>`;
}

function renderRepeated() {
  const exactGroups = repeatedExactGroups();
  const conceptGroups = repeatedConceptGroups();
  return `${headerBlock("PAPER ANALYSIS", "Repeated questions", "Exact wording matches are separated from questions that test a recurring concept. Only the seven uploaded KTU papers count; the practice PDF is excluded.")}
    <section class="repeat-stats"><article class="panel"><span class="repeat-stat-icon">＝</span><div><strong>${exactGroups.length}</strong><span>exact repeat groups</span></div></article><article class="panel"><span class="repeat-stat-icon">↻</span><div><strong>${conceptGroups.length}</strong><span>recurring concepts</span></div></article><article class="panel"><span class="repeat-stat-icon">▧</span><div><strong>${PAPER_ARCHIVE.length}</strong><span>papers compared</span></div></article></section>
    <section class="panel repeated-panel"><div class="panel-heading"><div><p class="eyebrow">SAME WORDING</p><h2>Exact repeats</h2></div><span class="muted-note">Normalized question text matches</span></div>${exactGroups.length ? exactGroups.map((group) => renderRepeatGroup(group, "exact")).join("") : `<div class="empty-inline">No exact full-question wording matches were identified in the indexed papers. Similar concepts are listed separately below.</div>`}</section>
    <section class="panel repeated-panel"><div class="panel-heading"><div><p class="eyebrow">SAME UNDERLYING TOPIC</p><h2>Conceptually similar questions</h2></div><span class="muted-note">Sorted by number of appearances</span></div>${conceptGroups.length ? conceptGroups.map((group) => renderRepeatGroup(group, "concept")).join("") : `<div class="empty-inline">No recurring concepts found.</div>`}</section>
    <p class="muted-note repeat-method">Method: exact matches use punctuation/case-normalized text. Concept groups use the question topic and syllabus concept, not a claim that wording is identical. Counts are question appearances across the uploaded archive papers; the supplemental first-series PDF is excluded.</p>`;
}

function renderPaperQuestion(question) {
  const part = question.part === "A" ? `Part A · Q${question.number}` : question.supplementary ? `First-series Q${question.number}` : `Part B · Module ${question.module} · Q${question.number}`;
  const body = question.parts?.length
    ? `<ol class="paper-subparts">${question.parts.map((subpart) => `<li><span class="marks-pill">${subpart.marks} marks</span>${escapeHTML(subpart.text)}</li>`).join("")}</ol>`
    : `<p>${escapeHTML(question.text)}</p>`;
  return `<article class="paper-question"><div class="paper-question-head"><span class="part-label">${part}</span><span class="module-pill">Module ${question.module}</span><span class="marks-pill">${question.marks} marks</span></div>${body}</article>`;
}

function normalizeQuestion(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function repeatedExactGroups() {
  const groups = new Map();
  PAPER_QUESTIONS.forEach((question) => {
    const key = normalizeQuestion(question.text);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(question);
  });
  return [...groups.values()].filter((items) => items.length > 1)
    .map((items) => ({ title: items[0].text, items }))
    .sort((a, b) => b.items.length - a.items.length);
}

const conceptMatchers = [
  ["PEAS task descriptions", /\bpeas\b/],
  ["Task-environment properties and types", /task.environment|episodic|sequential environment/],
  ["Rational agents and agent types", /rational agent|agent programs|types of agents|goal.based|utility.based|reflex agent|agent architectures/],
  ["AI definitions, approaches and applications", /applications of ai|turing test|categories under which ai|history of ai|human.centred|think or act like a human/],
  ["Search performance and problem formulation", /evaluate the performance of a search|evaluat.{0,15}search algorithm|well.defined ai problem|problem formulation|state.space search/],
  ["Uninformed search strategies", /uninformed search|breadth.first|depth.first|depth.limited|iterative.deepening|uniform.cost/],
  ["Informed search, heuristics and A*", /heuristic|a\*|a star|best.first search|relaxed problem/],
  ["Constraint satisfaction and consistency", /\bcsp\b|constraint satisfaction|constraint propagation|arc.consisten|node consisten|local consisten|class.schedul/],
  ["CSP backtracking and variable-ordering heuristics", /backtracking search|back tracking|minimum.remaining.values|\bmrv\b|least.constraining.value|forward checking/],
  ["Cryptarithmetic CSPs", /cryptarithmetic|two \+ two|send \+ more|eat \+ that/],
  ["Minimax and adversarial search", /minimax|min.max|adversarial search|game tree/],
  ["Alpha-beta pruning", /alpha.beta|alpha beta/],
  ["Propositional logic and CNF", /propositional logic|conjunctive normal form|\bcnf\b|horn clause|atomic and complex/],
  ["First-order logic representation", /first.order logic|\bfol\b|predicate logic|quantifier|represent.*logic/],
  ["Unification and MGU", /unif/],
  ["Resolution and entailment", /resolution|entailment/],
  ["Forward and backward chaining", /forward chaining|backward chaining/],
  ["Machine-learning forms and evaluation", /forms of learning|types of learning|supervised learning|unsupervised learning|reinforcement learning|cross.validation|best hypothesis/],
  ["Overfitting and generalization", /overfitting|underfitting|generalization/],
  ["Decision trees, entropy and information gain", /decision.tree|decision tree|entropy|information gain|gini index|important attributes/],
  ["Regression and classification", /regression|classification/],
  ["Logistic regression", /logistic regression|linear classification/],
];

function repeatedConceptGroups() {
  const groups = conceptMatchers.map(([title, pattern]) => {
    const items = PAPER_QUESTIONS.filter((question) => pattern.test(question.text));
    const papers = new Set(items.map((question) => question.paperId));
    return { title, items, papers };
  }).filter((group) => group.papers.size > 1);
  return groups.sort((a, b) => b.items.length - a.items.length || a.title.localeCompare(b.title));
}

function renderRepeatGroup(group, kind) {
  const years = [...new Set(group.items.map((item) => `${item.session} ${item.year}`))].join(" · ");
  const modulesInvolved = [...new Set(group.items.map((item) => item.module))].sort().map((module) => `M${module}`).join(", ");
  const frequency = group.items.length;
  const priority = frequency >= 5 ? "High" : frequency >= 3 ? "Medium" : "Low";
  const relatedTopics = [...new Set(group.items.map((item) => topicForPaperQuestion(item).name))].join(", ");
  return `<details class="repeat-group"><summary><span class="priority-tag priority-${priority.toLowerCase()}">${priority} · ${frequency} appearances</span><strong>${escapeHTML(group.title)}</strong><span class="repeat-years">${escapeHTML(years)}</span><span class="module-pill">${modulesInvolved}</span><span class="summary-chevron">⌄</span></summary><p class="related-topics">Related topics: ${escapeHTML(relatedTopics)}</p><div class="repeat-questions">${group.items.map((item) => `<div class="repeat-question-row"><span class="repeat-year">${item.year} · ${escapeHTML(item.session)}</span><span class="module-pill">M${item.module} · ${item.marks} marks</span><p>${escapeHTML(item.text)}</p><span class="source-label">${escapeHTML(item.paperTitle)}${kind === "exact" ? " · exact wording group" : " · concept match"}</span></div>`).join("")}</div></details>`;
}

function buildQuestionBank() {
  const questions = [];
  topicRecords.forEach((topic) => {
    const module = moduleById(topic.module);
    const important = importantRecords.filter((item) => item.topicId === topic.id);
    const marks = important[0]?.marks ?? (topic.module === 4 ? 8 : 6);
    questions.push({
      id: `${topic.id}-q${marks}`,
      module: topic.module, topicId: topic.id, topic: topic.name, marks,
      text: marks >= 8 ? `Explain ${topic.name} in the context of ${module.title}. Include its key steps or components and a suitable example.` : `Define ${topic.name} and state its role in ${module.title}.`,
      outline: outlineFor(topic.name),
      difficulty: marks >= 8 ? "Intermediate" : "Foundational",
      importance: important[0]?.priority ?? "Medium",
    });
  });
  modules.forEach((module) => {
    const concepts = module.important.filter((item) => item[2] === 14);
    const source = concepts.length ? concepts : [[module.topics[0], "Medium", 14]];
    [...source, ...source].slice(0, 2).forEach(([name], index) => {
      const topic = topicRecords.find((item) => item.module === module.id && (item.name.toLowerCase().includes(String(name).toLowerCase()) || String(name).toLowerCase().includes(item.name.toLowerCase()))) || topicRecords.find((item) => item.module === module.id);
      questions.push({
        id: `m${module.id}-long-${index + 1}`, module: module.id, topicId: topic.id, topic: String(name), marks: 14,
        text: `Discuss ${name}. Explain its main concepts or algorithm, illustrate the process with a worked example, and comment on its properties.`,
        outline: outlineFor(String(name)), difficulty: "Advanced", importance: "High",
      });
    });
  });
  const paperEntries = allPaperQuestionRecords().flatMap((paperQuestion) => {
    const subQuestions = paperQuestion.parts?.length
      ? paperQuestion.parts.map((part, index) => ({
        ...paperQuestion,
        id: `${paperQuestion.id}-${String.fromCharCode(97 + index)}`,
        text: part.text,
        marks: part.marks,
        source: `${paperQuestion.paperTitle}${paperQuestion.supplementary ? " · practice source" : ""} · Q${paperQuestion.number}${String.fromCharCode(97 + index)}`,
      }))
      : [paperQuestion];
    return subQuestions.map((subQuestion) => {
      const topic = topicForPaperQuestion(subQuestion);
      const source = subQuestion.supplementary
        ? `${subQuestion.paperTitle} · practice source (${subQuestion.source})`
        : subQuestion.source || subQuestion.paperTitle;
      return {
        id: `paper-${subQuestion.id}`,
        module: subQuestion.module,
        topicId: topic.id,
        topic: topic.name,
        marks: subQuestion.marks,
        text: subQuestion.text,
        outline: outlineFor(topic.name),
        difficulty: subQuestion.marks >= 10 ? "Advanced" : subQuestion.marks >= 6 ? "Intermediate" : "Foundational",
        importance: "Past paper",
        source,
        year: subQuestion.year,
      };
    });
  });
  return [...paperEntries, ...questions.map((question) => ({ ...question, source: "Syllabus-derived practice" }))];
}

function allPaperQuestionRecords() {
  return [...PAPER_QUESTIONS, ...SUPPLEMENTAL_QUESTIONS];
}

function topicForPaperQuestion(question) {
  const text = question.text.toLowerCase();
  const patterns = [
    [/peas|task.environment|rational agent|agent program|agent type|learning agent|applications of ai/, 1],
    [/search|heuristic|a\*|a star|8.puzzle|8.queens|problem formulation/, 2],
    [/csp|constraint|cryptarith|minimax|alpha.beta|game tree|backtracking/, 3],
    [/first.order|\bfol\b|logic|resolution|unification|chaining|cnf|modus ponens|quantifier/, 4],
    [/learning|overfitting|entropy|information gain|decision.tree|regression|classification|hypothesis/, 5],
  ];
  const moduleId = patterns.find(([pattern]) => pattern.test(text))?.[1] ?? question.module;
  const moduleTopics = topicRecords.filter((topic) => topic.module === moduleId);
  const related = moduleTopics.find((topic) => text.includes(topic.name.toLowerCase()));
  return related || topicRecords.find((topic) => topic.module === moduleId) || topicRecords[0];
}

const questionBank = buildQuestionBank();
const allPaperQuestions = [...PAPER_QUESTIONS, ...SUPPLEMENTAL_QUESTIONS];

function outlineFor(name) {
  const detail = noteLibrary[name];
  if (!detail) return `Define ${name}; identify its role and key terms; explain the relevant steps or components from the syllabus; use a clear example; finish with a concise summary.`;
  const items = [detail.definition, ...(detail.points || [])];
  if (detail.algorithm) items.push(...detail.algorithm);
  if (detail.example) items.push(`Example: ${detail.example}`);
  return items.join(" ");
}

function renderQuestionBank() {
  const query = document.querySelector("#bank-search")?.value.toLowerCase() || "";
  const module = document.querySelector("#bank-module")?.value || "all";
  const marks = document.querySelector("#bank-marks")?.value || "all";
  const sourceFilter = document.querySelector("#bank-source")?.value || "all";
  const questions = questionBank.filter((question) => {
    const matchesText = !query || `${question.text} ${question.topic}`.toLowerCase().includes(query);
    const sourceMatches = sourceFilter === "all" || (sourceFilter === "archive" ? !question.source.startsWith("Syllabus") && !question.source.includes("practice source") : question.source.startsWith("Syllabus"));
    return matchesText && sourceMatches && (module === "all" || question.module === Number(module)) && (marks === "all" || question.marks === Number(marks));
  });
  const cards = questions.map((question) => {
    const status = state.questionStatus[question.id] || "Not started";
    const priority = question.importance === "Past paper" ? "priority-medium" : `priority-${question.importance.toLowerCase()}`;
    return `<article class="question-bank-card"><div class="question-card-meta"><span class="module-pill">M${question.module} · ${escapeHTML(moduleById(question.module).title)}</span><span class="marks-pill">${question.marks} marks</span><span class="priority-tag ${priority}">${escapeHTML(question.importance)}</span></div><h3>${escapeHTML(question.text)}</h3><p class="question-topic">Topic: ${escapeHTML(question.topic)} · ${question.difficulty}</p><details class="answer-outline"><summary>Suggested answer outline</summary><p>${escapeHTML(question.outline)}</p></details><div class="question-card-footer"><span class="source-label">Source: ${escapeHTML(question.source)}</span><div><button class="icon-button favorite-button ${state.bookmarks.includes(question.id) ? "is-saved" : ""}" data-action="toggle-bookmark" data-id="${question.id}" aria-label="Bookmark question">☆</button><select data-action="set-question-status" data-id="${question.id}" aria-label="Question practice status">${["Not started", "Learning", "Completed", "Needs revision"].map((option) => `<option ${status === option ? "selected" : ""}>${option}</option>`).join("")}</select></div></div></article>`;
  }).join("");
  return `${headerBlock("PRACTICE LIBRARY", "Question bank", "Actual indexed paper questions are cited by source; supplementary syllabus prompts are labelled separately.")}
    <section class="panel bank-filter"><label class="search-field"><span>⌕</span><input id="bank-search" type="search" value="${escapeHTML(query)}" placeholder="Search questions or topics" aria-label="Search question bank" /></label><label>Module<select id="bank-module"><option value="all">All modules</option>${modules.map((item) => `<option value="${item.id}" ${module === String(item.id) ? "selected" : ""}>Module ${item.id}</option>`).join("")}</select></label><label>Marks<select id="bank-marks"><option value="all">All marks</option>${[3, 4, 5, 6, 7, 8, 9, 10, 14].map((value) => `<option value="${value}" ${marks === String(value) ? "selected" : ""}>${value} marks</option>`).join("")}</select></label><label>Source<select id="bank-source"><option value="all">All questions</option><option value="archive" ${sourceFilter === "archive" ? "selected" : ""}>Question papers</option><option value="syllabus" ${sourceFilter === "syllabus" ? "selected" : ""}>Syllabus practice</option></select></label><span class="result-count">${questions.length} prompts</span></section>
    <div class="question-bank-grid">${cards || `<div class="empty-state">No practice questions match your filters.</div>`}</div>`;
}

function renderBookmarks() {
  const rows = state.bookmarks.map((id) => {
    const important = importantRecords.find((item) => item.id === id);
    if (important) {
      const topic = topicById(important.topicId);
      return `<article class="bookmark-row"><span class="priority-tag priority-${important.priority.toLowerCase()}">${important.priority}</span><div class="bookmark-main"><button class="link-heading" data-action="open-topic" data-topic="${topic.id}">${escapeHTML(important.name)}</button><p>Important topic · Module ${important.module} · ${important.marks} marks</p></div><button class="button button-small button-quiet" data-action="toggle-bookmark" data-id="${id}">Remove</button></article>`;
    }
    const question = questionBank.find((item) => item.id === id);
    if (!question) return "";
    return `<article class="bookmark-row"><span class="module-pill">M${question.module}</span><div class="bookmark-main"><strong>${escapeHTML(question.text)}</strong><p>${question.marks} marks · ${escapeHTML(question.source)}</p></div><button class="button button-small button-quiet" data-action="toggle-bookmark" data-id="${id}">Remove</button></article>`;
  }).join("");
  return `${headerBlock("SAVED FOR LATER", "Bookmarks", "Your saved priority topics and question-bank prompts.")}<section class="panel bookmark-list">${rows || `<div class="empty-state"><span class="empty-icon">☆</span><strong>No bookmarks yet</strong><p>Save a priority topic or practice question with the star button to find it here.</p><button class="button button-secondary" data-action="go-page" data-page="bank">Browse questions →</button></div>`}</section>`;
}

function renderNotes() {
  const topic = topicById(selectedNoteTopic) || topicRecords[0];
  const detail = noteLibrary[topic.name];
  const related = importantRecords.find((item) => item.topicId === topic.id);
  const text = state.topicNotes[topic.id] || "";
  const moduleTopics = topicRecords.filter((item) => item.module === topic.module);
  const points = detail?.points?.map((point) => `<li>${escapeHTML(point)}</li>`).join("") || `<li>This topic is listed in the supplied CST401 syllabus. Add lecture-specific details or examples to your personal notes.</li>`;
  const algorithm = detail?.algorithm?.length ? `<section class="note-section"><h3>Algorithm / process</h3><ol>${detail.algorithm.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol></section>` : "";
  const example = detail?.example ? `<section class="note-example"><strong>Worked example</strong><p>${escapeHTML(detail.example)}</p></section>` : "";
  return `${headerBlock("STUDY LIBRARY", "Study notes", "Concise revision notes for syllabus topics, with room for your own class notes.", `<button class="button button-secondary" data-action="export-notes">Export my notes</button>`)}
    <div class="notes-layout"><aside class="notes-topic-list"><div class="notes-list-heading">SYLLABUS TOPICS</div>${modules.map((module) => `<div class="notes-module-heading">Module ${module.id} · ${escapeHTML(module.title)}</div>${topicRecords.filter((item) => item.module === module.id).map((item) => `<button class="note-topic-link ${item.id === topic.id ? "is-active" : ""}" data-action="select-note-topic" data-topic="${item.id}">${escapeHTML(item.name)}</button>`).join("")}`).join("")}</aside>
    <article class="panel notes-article"><div class="note-article-top"><span class="module-pill">MODULE ${topic.module} · ${escapeHTML(moduleById(topic.module).title)}</span>${related ? `<span class="priority-tag priority-${related.priority.toLowerCase()}">${related.priority} priority</span>` : ""}</div><h2>${escapeHTML(topic.name)}</h2>
      <section class="note-section"><h3>Simple explanation</h3><p>${escapeHTML(detail?.definition || `${topic.name} is a topic in Module ${topic.module} of the CST401 syllabus. Use the points below as a revision checklist and expand them using your course material.`)}</p></section>
      <section class="note-section"><h3>Important points</h3><ul>${points}</ul></section>${algorithm}${example}
      <section class="note-section exam-answer"><h3>Exam answer structure</h3><ol><li>Start with a precise definition and state the purpose.</li><li>Explain the main components, assumptions or steps in a logical order.</li><li>Add a labelled diagram, formula or example where relevant.</li><li>Conclude with key properties, limitations or a short summary.</li></ol></section>
      <label class="personal-note-label" for="personal-note">My class notes</label><textarea id="personal-note" class="personal-notes-editor" placeholder="Add your own examples, derivations or questions…">${escapeHTML(text)}</textarea><div class="note-save-row"><span class="muted-note">${text ? "Saved on this device" : "Notes save automatically as you type"}</span><button class="button button-secondary" data-action="mark-studied" data-topic="${topic.id}">Mark topic studied</button></div></article></div>`;
}

function revisionSchedule(topicId) {
  const studied = state.studiedAt[topicId];
  if (!studied) return [];
  const studiedDate = new Date(`${studied}T12:00:00`);
  const schedule = REVISION_OFFSETS.map((offset, index) => {
    const due = new Date(studiedDate);
    due.setDate(due.getDate() + offset);
    return { kind: ["First", "Second", "Third", "Fourth"][index], due: todayKey(due), index };
  });
  const finalDate = new Date(EXAM_DATE);
  finalDate.setDate(finalDate.getDate() - 1);
  schedule.push({ kind: "Final", due: todayKey(finalDate), index: 4 });
  return schedule;
}

function dueRevisions(includeFuture = false) {
  const today = todayKey();
  const due = [];
  topicRecords.forEach((topic) => {
    revisionSchedule(topic.id).forEach((revision) => {
      const revisionKey = `${topic.id}:${revision.index}`;
      if (!state.revisedAt[revisionKey] && (includeFuture || revision.due <= today)) due.push({ topic, ...revision });
    });
  });
  return due.sort((a, b) => a.due.localeCompare(b.due) || a.topic.module - b.topic.module);
}

function renderRevision() {
  const due = dueRevisions(true);
  const today = todayKey();
  const rows = due.map((item) => {
    const status = item.due < today ? "Overdue" : item.due === today ? "Due today" : "Upcoming";
    return `<div class="revision-row"><div class="revision-date"><strong>${formatDate(item.due)}</strong><small>${status}</small></div><span class="revision-step">${item.kind}</span><div class="revision-topic"><strong>${escapeHTML(item.topic.name)}</strong><small>Module ${item.topic.module} · ${escapeHTML(moduleById(item.topic.module).title)}</small></div><button class="button button-small ${item.due <= today ? "button-primary" : "button-quiet"}" data-action="mark-revision-step" data-topic="${item.topic.id}" data-step="${item.index}" ${item.due > today ? "disabled" : ""}>Mark revised</button></div>`;
  }).join("");
  const unstudied = topicRecords.filter((topic) => !state.studiedAt[topic.id]).length;
  return `${headerBlock("SPACED REPETITION", "Revision tracker", "Mark topics studied to schedule revisions after 1, 3 and 7 days, plus a final review before the exam.")}
    <section class="revision-intro panel"><div><span class="stat-icon blue-icon">◷</span><div><strong>${due.filter((item) => item.due <= today).length}</strong><span>revisions due now</span></div></div><div><span class="stat-icon green-icon">▤</span><div><strong>${unstudied}</strong><span>topics not yet scheduled</span></div></div><div><span class="stat-icon violet-icon">↻</span><div><strong>4 + final</strong><span>revision milestones per topic</span></div></div></section>
    <section class="panel revision-panel"><div class="panel-heading"><div><p class="eyebrow">REVISION QUEUE</p><h2>Upcoming and overdue</h2></div><button class="text-button" data-action="go-page" data-page="syllabus">Study a topic →</button></div>
      <div class="revision-legend"><span><i class="legend-dot due-dot"></i>Due now</span><span><i class="legend-dot upcoming-dot"></i>Upcoming</span></div>
      ${rows || `<div class="empty-state"><span class="empty-icon">✓</span><strong>No pending revisions</strong><p>Mark a topic as studied in your syllabus or notes to start its revision schedule.</p></div>`}</section>`;
}

function defaultTasksFor(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  const dayIndex = Math.floor((date - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / 86400000);
  const moduleRotation = [4, 2, 4, 3, 4, 1, 5, 4, 3, 4, 2, 4, 5, 1];
  const preferred = moduleRotation[((dayIndex % moduleRotation.length) + moduleRotation.length) % moduleRotation.length];
  const primary = topicRecords.find((topic) => topic.module === preferred && !state.completedTopics.includes(topic.id)) || topicRecords.find((topic) => !state.completedTopics.includes(topic.id));
  const due = dueRevisions(true).find((item) => item.due <= dateKey);
  const tasks = [];
  if (primary) tasks.push({ id: `target-${dateKey}-a`, label: `Study: ${primary.name}`, topicId: primary.id, minutes: 35, done: false });
  if (due && due.topic.id !== primary?.id) tasks.push({ id: `target-${dateKey}-revision`, label: `Revise: ${due.topic.name} (${due.kind.toLowerCase()} review)`, topicId: due.topic.id, minutes: 20, done: false });
  const next = topicRecords.find((topic) => topic.module === 4 && !state.completedTopics.includes(topic.id) && topic.id !== primary?.id) || topicRecords.find((topic) => !state.completedTopics.includes(topic.id) && topic.id !== primary?.id);
  if (next) tasks.push({ id: `target-${dateKey}-b`, label: `Review: ${next.name}`, topicId: next.id, minutes: 25, done: false });
  tasks.push({ id: `target-${dateKey}-practice`, label: "Practise one question from today's topics", minutes: 20, done: false });
  return tasks;
}

function getPlan(dateKey) {
  if (!Array.isArray(state.dailyPlans[dateKey])) {
    let tasks = defaultTasksFor(dateKey);
    state.dailyPlans[dateKey] = tasks;
    persist();
  }
  if (dateKey === todayKey()) carryIncompleteTasks(dateKey);
  return state.dailyPlans[dateKey];
}

function carryIncompleteTasks(dateKey) {
  const priorDate = new Date(`${dateKey}T12:00:00`);
  priorDate.setDate(priorDate.getDate() - 1);
  const priorKey = todayKey(priorDate);
  const previous = state.dailyPlans[priorKey] || [];
  const todayTasks = state.dailyPlans[dateKey];
  const carried = [];
  previous.forEach((task) => {
    if (task.done || task.carriedTo === dateKey) return;
    const sourceId = task.sourceId || task.id;
    if (todayTasks.some((current) => current.sourceId === sourceId || current.id === `carry-${sourceId}-${dateKey}`)) {
      task.carriedTo = dateKey;
      return;
    }
    task.carriedTo = dateKey;
    carried.push({ ...task, id: `carry-${sourceId}-${dateKey}`, sourceId, done: false, carried: true, custom: true });
  });
  if (carried.length) {
    todayTasks.unshift(...carried);
    persist();
  }
}

function renderTask(task, dateKey) {
  const inputId = `task-${escapeHTML(dateKey)}-${escapeHTML(task.id)}`;
  return `<div class="task-row ${task.done ? "is-done" : ""}"><input id="${inputId}" type="checkbox" data-action="toggle-task" data-date="${dateKey}" data-id="${escapeHTML(task.id)}" ${task.done ? "checked" : ""}><label class="custom-check-label" for="${inputId}"><span class="custom-check">${task.done ? "✓" : ""}</span></label><label class="task-label" for="${inputId}">${escapeHTML(task.label)}${task.carried ? `<small class="carry-label">Carried forward</small>` : ""}</label><span class="task-duration">${task.minutes || 25} min</span>${task.topicId ? `<button type="button" class="task-open" data-action="open-topic" data-topic="${task.topicId}" aria-label="Open related topic">↗</button>` : ""}</div>`;
}

function renderPlanner() {
  const today = todayKey();
  const tasks = getPlan(today);
  const done = tasks.filter((task) => task.done).length;
  const taskCompletion = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${today}T12:00:00`);
    date.setDate(date.getDate() + index);
    const key = todayKey(date);
    const dayTasks = getPlan(key);
    const complete = dayTasks.filter((task) => task.done).length;
    const module = modules.find((item) => item.id === [4, 2, 4, 3, 4, 1, 5][index]);
    return `<article class="week-day ${index === 0 ? "is-today" : ""}"><div class="week-day-head"><span>${index === 0 ? "Today" : date.toLocaleDateString(undefined, { weekday: "short" })}</span><strong>${date.getDate()}</strong></div><span class="week-focus">Focus · M${module.id}</span><p>${escapeHTML(module.title)}</p><div class="week-day-foot"><span>${complete}/${dayTasks.length} done</span><span>${dayTasks.reduce((sum, task) => sum + (task.minutes || 0), 0)} min</span></div></article>`;
  }).join("");
  const taskList = tasks.map((task) => renderTask(task, today)).join("");
  return `${headerBlock("MAKE A PLAN", "Study planner", "A syllabus-hour-weighted plan with extra focus on Module 4. Edit today's tasks and add your own targets.", `<button class="button button-secondary" data-action="go-page" data-page="settings">Edit daily goal</button>`)}
    <section class="planner-top-grid"><div class="panel planner-today"><div class="panel-heading"><div><p class="eyebrow">${formatDate(today, { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}</p><h2>Today's plan</h2></div><span class="today-progress">${taskCompletion}% complete · ${done}/${tasks.length} done</span></div><div class="task-list">${taskList}</div>
      <form class="add-task-form" id="add-task-form"><label class="sr-only" for="new-task">Add a study task</label><input id="new-task" name="label" placeholder="Add a study target…" required maxlength="120"><label class="sr-only" for="new-task-minutes">Duration in minutes</label><input id="new-task-minutes" name="minutes" type="number" min="5" max="240" value="25" aria-label="Duration in minutes"><span>min</span><button class="button button-primary button-small" type="submit">Add task</button></form></div>
      <section class="panel goal-card"><div class="goal-ring" style="--goal:${Math.min(100, Math.round(((state.studyMinutesByDay[today] || 0) / Math.max(1, state.dailyGoalMinutes)) * 100))}%"><span>${Math.min(100, Math.round(((state.studyMinutesByDay[today] || 0) / Math.max(1, state.dailyGoalMinutes)) * 100))}%</span></div><div><p class="eyebrow">DAILY STUDY GOAL</p><h2>${state.dailyGoalMinutes} minutes</h2><p>${state.studyMinutesByDay[today] || 0} focused minutes recorded today. Focus time is logged from completed Pomodoro sessions.</p><button class="text-button" data-action="go-page" data-page="settings">Change goal →</button></div></section></section>
    <section class="panel week-panel"><div class="panel-heading"><div><p class="eyebrow">LOOK AHEAD</p><h2>Next 7 days</h2></div><span class="muted-note">Suggested module focus · editable daily task lists</span></div><div class="week-grid">${days}</div></section>
    <section class="planner-note"><strong>Schedule note</strong><span>This is a suggested rolling plan, not a fixed calendar of every remaining day. Completed progress and revisions stay saved; unfinished custom tasks carry forward.</span></section>`;
}

function renderMock() {
  const active = state.activeMock;
  if (!active) return `${headerBlock("EXAM PRACTICE", "Mock exam", "KTU-style timed practice: 10 short questions and two choices from each module, with one 14-mark response required per module.")}
    <section class="mock-intro-grid"><article class="panel mock-detail"><p class="eyebrow">EXAM FORMAT</p><h2>100 marks · 3 hours</h2><div class="mock-mark-row"><span>Part A</span><strong>10 × 3 marks = 30</strong><small>Answer all</small></div><div class="mock-mark-row"><span>Part B</span><strong>2 × 14 marks × 5 modules = 70</strong><small>Choose one from each module</small></div><p class="muted-note">Questions are generated from the syllabus-derived practice bank. This mock is not assembled from past-paper questions.</p><button class="button button-primary" data-action="start-mock">Start mock exam <span>→</span></button></article><article class="panel mock-rules"><div class="stat-icon violet-icon">✎</div><h3>How it works</h3><ul><li>One 3-hour countdown starts when you begin.</li><li>Answer spaces are saved locally as you type.</li><li>Part B requires one selected question from each module.</li><li>Descriptive answers are self-evaluated; no automatic score is claimed.</li><li>Your completed attempt and self-score are recorded in Analytics.</li></ul></article></section>
    ${renderMockHistory()}`;
  if (active.submitted) return renderMockResults(active);
  const elapsed = active.deadline ? Math.max(0, active.deadline - Date.now()) : 3 * 60 * 60 * 1000;
  const questionBlocks = active.questions.map((question, index) => {
    const partB = question.marks === 14;
    const group = partB ? `Part B · Module ${question.module}` : "Part A · Short answer";
    return `<article class="mock-question"><div class="mock-question-meta"><span>${group}</span><strong>${question.marks} marks</strong></div><h3>${index + 1}. ${escapeHTML(question.text)}</h3>${partB ? `<label class="answer-choice"><input type="checkbox" data-action="select-partb" data-index="${index}" ${active.selectedPartB.includes(index) ? "checked" : ""}><span>Choose this question for Module ${question.module}</span></label>` : ""}<label class="sr-only" for="mock-answer-${index}">Your answer for question ${index + 1}</label><textarea id="mock-answer-${index}" class="mock-answer" data-action="save-mock-answer" data-index="${index}" placeholder="Write your answer here…">${escapeHTML(active.answers[String(index)] || "")}</textarea></article>`;
  }).join("");
  return `${headerBlock("TIMED PRACTICE", "Mock exam in progress", `Started ${new Date(active.startedAt).toLocaleString()}. Answers are saved on this device.`)}
    <section class="mock-exam-toolbar"><div><span class="eyebrow">TIME REMAINING</span><strong class="mock-clock" id="mock-clock">${formatClock(elapsed)}</strong></div><span class="mock-unanswered" id="mock-unanswered">Unanswered: ${mockAnswerStats(active).unanswered}</span><button class="button button-danger" data-action="submit-mock">Submit exam</button></section>
    <div class="mock-instructions"><strong>Part A:</strong> Answer all 10 questions. <strong>Part B:</strong> Select exactly one 14-mark question from each module, then answer it.</div><div class="mock-question-list">${questionBlocks}</div>`;
}

function mockAnswerStats(active) {
  const partAIndexes = active.questions.map((question, index) => question.marks === 3 ? index : -1).filter((index) => index >= 0);
  const selectedPartB = active.selectedPartB.filter((index) => active.questions[index]?.marks === 14);
  const missingModules = modules.filter((module) => !selectedPartB.some((index) => active.questions[index].module === module.id));
  const requiredIndexes = [...partAIndexes, ...selectedPartB];
  const answered = requiredIndexes.filter((index) => active.answers[index]?.trim()).length;
  const partAAnswered = partAIndexes.filter((index) => active.answers[index]?.trim()).length;
  return {
    answered,
    total: partAIndexes.length + modules.length,
    partAAnswered,
    unanswered: partAIndexes.length - partAAnswered
      + selectedPartB.filter((index) => !active.answers[index]?.trim()).length
      + missingModules.length,
    missingModules,
  };
}

function formatClock(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function renderMockResults(active) {
  const { answered, total, partAAnswered, missingModules, unanswered } = mockAnswerStats(active);
  return `${headerBlock("ATTEMPT COMPLETE", "Mock exam review", "Review unanswered questions and record your own evaluation for each module.")}
    <section class="panel mock-result-summary"><div class="result-stat"><strong>${answered}/${total}</strong><span>required answers written</span></div><div class="result-stat"><strong>${partAAnswered}/10</strong><span>Part A answered</span></div><div class="result-stat"><strong>${5 - missingModules.length}/5</strong><span>Part B modules selected</span></div><div class="result-stat"><strong>${formatDuration(active.elapsedMs || 0)}</strong><span>time used</span></div></section>
    <p class="muted-note mock-unanswered-summary">${unanswered} required response(s) unanswered, including any module without a Part B selection.</p>
    ${missingModules.length ? `<div class="notice-card notice-warning"><span class="notice-icon">!</span><div><strong>Part B selection incomplete</strong><p>No question was selected for Module ${missingModules.join(", Module ")}. This attempt is recorded for practice, not as a valid complete paper.</p></div></div>` : ""}
    <section class="panel self-eval-panel"><div class="panel-heading"><div><p class="eyebrow">SELF-ASSESSMENT</p><h2>Evaluate your Part B answers</h2></div><span class="muted-note">Not automatically graded</span></div><div class="self-score-grid">${modules.map((module) => `<label>Module ${module.id}<select data-action="set-mock-score" data-module="${module.id}"><option value="">Not evaluated</option>${Array.from({ length: 15 }, (_, score) => `<option value="${score}" ${String(active.selfScores?.[module.id] ?? "") === String(score) ? "selected" : ""}>${score} / 14</option>`).join("")}</select></label>`).join("")}</div><button class="button button-primary" data-action="save-mock-evaluation">Save evaluation</button></section>
    <section class="mock-review-list">${active.questions.map((question, index) => {
      const selected = question.marks === 3 || active.selectedPartB.includes(index);
      const answered = active.answers[index]?.trim();
      const status = !selected ? "Alternative not selected" : answered ? "Answer saved" : "Unanswered";
      const statusClass = !selected ? "" : answered ? "answered" : "unanswered";
      return `<article class="mock-review-row"><div><span class="module-pill">${question.marks === 14 ? `Part B · M${question.module}` : "Part A"}</span><span class="marks-pill">${question.marks} marks</span></div><p>${escapeHTML(question.text)}</p><span class="answer-status ${statusClass}">${status}</span></article>`;
    }).join("")}</section>
    <div class="result-actions"><button class="button button-secondary" data-action="resume-mock">Return to answers</button><button class="button button-primary" data-action="new-mock">Start another mock</button></div>`;
}

function formatDuration(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function renderMockHistory() {
  const attempts = state.mockSessions || [];
  const rows = attempts.slice(0, 5).map((attempt) => `<div class="mock-history-row"><span>${formatDate(attempt.date, { month: "short", day: "numeric", year: "numeric" })}</span><span>${attempt.answered}/${attempt.total} answers</span><span>${attempt.selfScore == null ? "Not self-evaluated" : `${attempt.selfScore}/70 self-score`}</span></div>`).join("");
  return `<section class="panel mock-history"><div class="panel-heading"><div><p class="eyebrow">YOUR PRACTICE</p><h2>Recent attempts</h2></div></div>${rows || `<p class="muted-note">Completed mock attempts will be recorded here.</p>`}</section>`;
}

function renderFormulas() {
  const groups = [
    { module: 1, title: "Agents and task environments", items: [
      ["PEAS", "Performance measure · Environment · Actuators · Sensors"],
      ["Agent function", "Maps a percept sequence to an action."],
      ["Rational action", "An action that maximizes expected performance, given the percept history and available knowledge."],
    ] },
    { module: 2, title: "Search", items: [
      ["A* evaluation", "f(n) = g(n) + h(n)"],
      ["BFS", "FIFO frontier · complete with finite branching · optimal for equal step costs."],
      ["DFS", "LIFO frontier / stack · low frontier memory · not generally optimal."],
      ["Uniform-cost evaluation", "Expand the frontier node with the lowest path cost g(n)."],
    ] },
    { module: 3, title: "Adversarial search and CSP", items: [
      ["Minimax", "MAX: max(child values) · MIN: min(child values)."],
      ["Alpha-beta cutoff", "Prune when α ≥ β. α is MAX's best bound; β is MIN's best bound."],
      ["CSP", "Variables + domains + constraints."],
    ] },
    { module: 4, title: "Logic and inference", items: [
      ["Symbols", "¬ NOT · ∧ AND · ∨ OR · → implication · ↔ biconditional"],
      ["Quantifiers", "∀ universal (“for all”) · ∃ existential (“there exists”)"],
      ["Unification example", "Unify Knows(John, x) with Knows(y, Mary): {y/John, x/Mary}."],
      ["Resolution by refutation", "Add the negated query; derive the empty clause to show contradiction and prove the query."],
    ] },
    { module: 5, title: "Machine learning", items: [
      ["Entropy", "H(S) = −Σᵢ pᵢ log₂(pᵢ)"],
      ["Information Gain", "Gain(S,A) = H(S) − Σᵥ (|Sᵥ|/|S|) H(Sᵥ)"],
      ["Univariate linear regression", "ŷ = θ₀ + θ₁x"],
      ["Squared-error objective", "J(θ) = (1/(2m)) Σᵢ (ŷᵢ − yᵢ)²"],
      ["Logistic regression", "σ(z) = 1/(1+e⁻ᶻ) · p(y=1|x) = σ(θᵀx)"],
    ] },
  ];
  return `${headerBlock("QUICK REFERENCE", "Formula sheet", "A compact, syllabus-aligned reference. Check your course conventions when writing formal derivations.")}
    <div class="formula-grid">${groups.map((group) => `<section class="panel formula-module"><div class="formula-module-head"><span class="module-badge">M${group.module}</span><div><p class="eyebrow">MODULE ${group.module}</p><h2>${group.title}</h2></div></div>${group.items.map(([label, formula]) => `<div class="formula-item"><strong>${escapeHTML(label)}</strong><code>${escapeHTML(formula)}</code></div>`).join("")}</section>`).join("")}</div>`;
}

function studyStreak() {
  const studiedDays = new Set(Object.keys(state.studyMinutesByDay).filter((date) => state.studyMinutesByDay[date] > 0));
  let streak = 0;
  const date = new Date();
  if (!studiedDays.has(todayKey(date))) date.setDate(date.getDate() - 1);
  while (studiedDays.has(todayKey(date))) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

function renderAnalytics() {
  const completion = totalCompletion();
  const maxModuleMinutes = Math.max(1, ...modules.map((module) => module.hours * 60));
  const moduleRows = modules.map((module) => {
    const progress = moduleCompletion(module.id);
    const minutes = module.hours * 60;
    return `<div class="analytics-module"><div class="analytics-module-label"><span class="module-badge">M${module.id}</span><strong>${escapeHTML(module.title)}</strong><span>${progress.completed}/${progress.total} topics · ${progress.percent}%</span></div><div class="progress-track"><span style="width:${progress.percent}%"></span></div><small>${module.hours} syllabus hours · allocated proportion shown</small></div>`;
  }).join("");
  const lastSeven = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = todayKey(date);
    const minutes = state.studyMinutesByDay[key] || 0;
    const height = Math.min(100, Math.round((minutes / Math.max(state.dailyGoalMinutes, 60)) * 100));
    return `<div class="chart-day"><div class="chart-bar-wrap"><span class="chart-bar" style="height:${height}%"></span></div><strong>${minutes ? `${minutes}m` : "—"}</strong><small>${date.toLocaleDateString(undefined, { weekday: "short" })}</small></div>`;
  }).join("");
  const loggedMinutes = Object.values(state.studyMinutesByDay).reduce((sum, value) => sum + Number(value || 0), 0);
  const questionCompleted = Object.values(state.questionStatus).filter((status) => status === "Completed").length;
  const evaluatedScores = state.mockSessions.flatMap((session) => Object.values(session.selfScores || {}).map(Number).filter(Number.isFinite));
  const averageSelfScore = evaluatedScores.length ? `${(evaluatedScores.reduce((a, b) => a + b, 0) / evaluatedScores.length).toFixed(1)}/14` : "—";
  const pending = dueRevisions().length;
  const weeklyMinutes = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return state.studyMinutesByDay[todayKey(date)] || 0;
  }).reduce((sum, minutes) => sum + minutes, 0);
  return `${headerBlock("YOUR PROGRESS", "Analytics", "Only activity recorded on this device is counted. No untracked hours or paper statistics are estimated.")}
    <section class="analytics-overview"><article class="stat-card"><div class="stat-icon blue-icon">◴</div><div><span>SYLLABUS COMPLETE</span><strong>${completion.percent}<small>%</small></strong><p>${completion.completed} of ${completion.total} topics</p></div></article><article class="stat-card"><div class="stat-icon green-icon">◷</div><div><span>FOCUS TIME LOGGED</span><strong>${(loggedMinutes / 60).toFixed(1)}<small>h</small></strong><p>${loggedMinutes} minutes recorded</p></div></article><article class="stat-card"><div class="stat-icon amber-icon">✦</div><div><span>STUDY STREAK</span><strong>${studyStreak()}</strong><p>consecutive days</p></div></article><article class="stat-card"><div class="stat-icon violet-icon">✓</div><div><span>QUESTIONS COMPLETED</span><strong>${questionCompleted}</strong><p>in your practice bank</p></div></article></section>
    <div class="analytics-columns"><section class="panel analytics-panel"><div class="panel-heading"><div><p class="eyebrow">COURSE OVERVIEW</p><h2>Module-wise syllabus completion</h2></div></div>${moduleRows}</section>
    <section class="panel analytics-panel"><div class="panel-heading"><div><p class="eyebrow">RECENT ACTIVITY</p><h2>Study time · last 7 days</h2></div></div><div class="study-chart">${lastSeven}</div><div class="chart-footnote">${(weeklyMinutes / 60).toFixed(1)} focused hours recorded this week. Bars show completed focus sessions only; daily goal: ${state.dailyGoalMinutes} min.</div><div class="analytics-extra"><div><span>Revisions due</span><strong>${pending}</strong></div><div><span>Mock self-evaluation avg.</span><strong>${averageSelfScore}</strong></div><div><span>Mock attempts</span><strong>${state.mockSessions.length}</strong></div></div></section></div>
    <section class="analytics-hint"><strong>How time is counted</strong><span>Study time is recorded when a focus Pomodoro completes. Paused or incomplete sessions are not included.</span></section>`;
}

function renderSettings() {
  const pomo = state.pomodoro;
  return `${headerBlock("PERSONALIZE", "Settings", "Adjust your goals and study timer. Your preferences and progress stay in this browser.")}
    <section class="settings-grid"><article class="panel settings-card"><div class="settings-card-heading"><span class="stat-icon blue-icon">◎</span><div><h2>Daily study goal</h2><p>Used in your dashboard and daily progress ring.</p></div></div><form id="goal-form" class="settings-form"><label for="daily-goal">Focused minutes per day</label><div class="inline-form-row"><input id="daily-goal" name="goal" type="number" min="15" max="720" value="${state.dailyGoalMinutes}" required><button class="button button-primary button-small" type="submit">Save goal</button></div></form></article>
    <article class="panel settings-card"><div class="settings-card-heading"><span class="stat-icon violet-icon">◷</span><div><h2>Pomodoro timer</h2><p>A long break follows every fourth focus session.</p></div></div><form id="pomodoro-form" class="settings-form"><div class="duration-inputs"><label>Focus minutes<input name="focus" type="number" min="1" max="120" value="${pomo.focusMinutes}"></label><label>Short break<input name="short" type="number" min="1" max="60" value="${pomo.shortBreakMinutes}"></label><label>Long break<input name="long" type="number" min="1" max="90" value="${pomo.longBreakMinutes}"></label></div><button class="button button-primary button-small" type="submit">Save timer settings</button></form></article>
    <article class="panel settings-card"><div class="settings-card-heading"><span class="stat-icon green-icon">☷</span><div><h2>Personal study data</h2><p>Download a backup or your own study notes.</p></div></div><div class="settings-actions"><button class="button button-secondary" data-action="export-data">Export progress JSON</button><button class="button button-secondary" data-action="export-notes">Export personal notes</button></div><p class="muted-note">Data is stored locally in this browser. Clearing browser site data removes it.</p></article>
    <article class="panel settings-card theme-settings"><div class="settings-card-heading"><span class="stat-icon amber-icon">◐</span><div><h2>Appearance</h2><p>Choose a comfortable theme for your study sessions.</p></div></div><button class="button button-secondary" data-action="toggle-theme">Switch to ${state.darkMode ? "light" : "dark"} mode</button></article></section>
    <section class="settings-footnote"><strong>Exam details</strong><span>KTU · B.Tech S7 CSE (2019 Scheme) · CST401 · 23 November 2026 · FN · Slot A · 3 hours · 100 marks</span></section>`;
}

function recommendedTopics(limit) {
  return [...topicRecords].filter((topic) => !state.completedTopics.includes(topic.id)).sort((a, b) => {
    const aPriority = importantRecords.find((item) => item.topicId === a.id);
    const bPriority = importantRecords.find((item) => item.topicId === b.id);
    return (priorityOrder[aPriority?.priority || "Low"] - priorityOrder[bPriority?.priority || "Low"])
      || (a.module === 4 ? -1 : 0) - (b.module === 4 ? -1 : 0) || a.module - b.module;
  }).slice(0, limit);
}

function renderSearchPage() {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return renderPage("dashboard");
  const topics = topicRecords.filter((topic) => `${topic.name} module ${topic.module}`.toLowerCase().includes(query));
  const questions = questionBank.filter((question) => `${question.text} ${question.topic} module ${question.module}`.toLowerCase().includes(query)).slice(0, 12);
  document.querySelector("#page-breadcrumb").textContent = "Search";
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.remove("is-active"));
  document.querySelector("#page-content").innerHTML = `${headerBlock("SEARCH RESULTS", `Results for “${escapeHTML(searchQuery)}”`, "Search across syllabus topics and syllabus-derived practice questions.")}<section class="panel search-results"><h2>Topics <span>${topics.length}</span></h2>${topics.map((topic) => `<button class="list-row compact-row" data-action="open-topic" data-topic="${topic.id}"><span class="module-badge">M${topic.module}</span><span class="row-main"><strong>${escapeHTML(topic.name)}</strong><small>${escapeHTML(moduleById(topic.module).title)}</small></span><span class="row-arrow">→</span></button>`).join("") || `<p class="muted-note">No matching topics.</p>`}</section><section class="question-bank-grid search-question-grid">${questions.map((question) => `<article class="question-bank-card"><div class="question-card-meta"><span class="module-pill">M${question.module}</span><span class="marks-pill">${question.marks} marks</span></div><h3>${escapeHTML(question.text)}</h3><button class="text-button" data-action="go-page" data-page="bank">Open question bank →</button></article>`).join("")}</section>`;
}

function toggleTopic(topicId) {
  const index = state.completedTopics.indexOf(topicId);
  const topic = topicById(topicId);
  if (!topic) return;
  if (index >= 0) {
    state.completedTopics.splice(index, 1);
    delete state.studiedAt[topicId];
    delete state.revisedAt[topicId];
    Object.keys(state.revisedAt).filter((key) => key.startsWith(`${topicId}:`)).forEach((key) => delete state.revisedAt[key]);
    importantRecords.filter((item) => item.topicId === topicId).forEach((item) => { state.prepStatus[item.id] = "Not started"; });
    recordActivity(`Reopened ${topic.name}`);
  } else {
    state.completedTopics.push(topicId);
    state.studiedAt[topicId] = todayKey();
    importantRecords.filter((item) => item.topicId === topicId).forEach((item) => { state.prepStatus[item.id] = "Completed"; });
    recordActivity(`Completed ${topic.name}`);
  }
  persist();
  renderPage(activePage);
}

function markTopicStudied(topicId) {
  const topic = topicById(topicId);
  if (!topic) return;
  if (!state.completedTopics.includes(topicId)) state.completedTopics.push(topicId);
  state.studiedAt[topicId] = todayKey();
  importantRecords.filter((item) => item.topicId === topicId).forEach((item) => { state.prepStatus[item.id] = "Completed"; });
  recordActivity(`Studied ${topic.name}`);
  persist();
  showToast("Topic studied. First revision is due today.");
  if (activePage === "notes") renderPage("notes");
  else renderPage(activePage);
}

function markRevision(topicId, step) {
  const topic = topicById(topicId);
  if (!topic) return;
  const key = `${topicId}:${step}`;
  state.revisedAt[key] = todayKey();
  state.revisedAt[topicId] = todayKey();
  recordActivity(`Revised ${topic.name}`);
  persist();
  showToast("Revision marked complete.");
  renderPage(activePage);
}

function setTaskDone(dateKey, taskId, done) {
  const tasks = getPlan(dateKey);
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return;
  task.done = done;
  if (done) {
    recordActivity(`Completed study target: ${task.label}`);
    if (task.topicId && task.label.startsWith("Study:")) markTopicStudied(task.topicId);
    else persist();
  } else persist();
  renderPage(activePage);
}

function toggleTheme() {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle("dark-mode", state.darkMode);
  persist();
  if (activePage === "settings") renderPage(activePage);
}

function toggleBookmark(id) {
  const index = state.bookmarks.indexOf(id);
  if (index >= 0) state.bookmarks.splice(index, 1);
  else state.bookmarks.push(id);
  persist();
  renderPage(activePage);
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportNotes() {
  const lines = ["CST401 Artificial Intelligence — Personal Study Notes", ""];
  topicRecords.filter((topic) => state.topicNotes[topic.id]).forEach((topic) => {
    lines.push(`Module ${topic.module}: ${topic.name}`, state.topicNotes[topic.id], "");
  });
  if (lines.length === 2) {
    showToast("Add personal notes before exporting.");
    return;
  }
  downloadFile("cst401-personal-notes.txt", lines.join("\n"), "text/plain;charset=utf-8");
}

function startPomodoro() {
  const pomo = state.pomodoro;
  if (pomo.running) return;
  pomo.running = true;
  pomo.deadline = Date.now() + pomo.remainingMs;
  persist();
  runPomodoroTick();
  pomodoroInterval = window.setInterval(runPomodoroTick, 1000);
  renderPage("dashboard");
}

function pausePomodoro() {
  const pomo = state.pomodoro;
  if (!pomo.running) return;
  pomo.remainingMs = Math.max(0, pomo.deadline - Date.now());
  pomo.running = false;
  pomo.deadline = null;
  window.clearInterval(pomodoroInterval);
  persist();
  renderPage("dashboard");
}

function resetPomodoro() {
  const pomo = state.pomodoro;
  window.clearInterval(pomodoroInterval);
  pomo.running = false;
  pomo.deadline = null;
  pomo.mode = "focus";
  pomo.remainingMs = pomo.focusMinutes * 60000;
  persist();
  renderPage("dashboard");
}

function runPomodoroTick() {
  const pomo = state.pomodoro;
  if (!pomo.running || !pomo.deadline) return;
  pomo.remainingMs = Math.max(0, pomo.deadline - Date.now());
  const clock = document.querySelector("#pomodoro-clock");
  if (clock) clock.textContent = formatClock(pomo.remainingMs);
  if (pomo.remainingMs > 0) return;
  window.clearInterval(pomodoroInterval);
  pomo.running = false;
  pomo.deadline = null;
  if (pomo.mode === "focus") {
    state.studyMinutesByDay[todayKey()] = (state.studyMinutesByDay[todayKey()] || 0) + pomo.focusMinutes;
    state.completedPomodoros += 1;
    pomo.cycle = (pomo.cycle + 1) % 4;
    pomo.mode = pomo.cycle === 0 ? "long" : "short";
    pomo.remainingMs = (pomo.mode === "long" ? pomo.longBreakMinutes : pomo.shortBreakMinutes) * 60000;
    recordActivity(`Completed a ${pomo.focusMinutes}-minute focus session`);
    showToast(`Focus session complete. Time for a ${pomo.mode === "long" ? "long" : "short"} break.`);
  } else {
    pomo.mode = "focus";
    pomo.remainingMs = pomo.focusMinutes * 60000;
    showToast("Break finished. Ready for another focus session?");
  }
  persist();
  renderPage(activePage);
}

function renderPomodoro() {
  const pomo = state.pomodoro;
  const remaining = pomo.running && pomo.deadline ? Math.max(0, pomo.deadline - Date.now()) : pomo.remainingMs;
  const modeName = pomo.mode === "focus" ? "Focus session" : pomo.mode === "long" ? "Long break" : "Short break";
  return `<section class="panel pomodoro-panel"><div class="pomodoro-heading"><p class="eyebrow">POMODORO TIMER</p><span class="session-counter">${pomo.mode === "long" ? 4 : pomo.cycle} / 4 focus sessions</span></div><div class="pomodoro-ring ${pomo.mode !== "focus" ? "break-mode" : ""}"><span id="pomodoro-clock">${formatClock(remaining)}</span><small>${modeName}</small></div><div class="pomodoro-controls"><button class="button button-primary" data-action="${pomo.running ? "pause-pomodoro" : "start-pomodoro"}">${pomo.running ? "Pause" : "Start"} ${pomo.mode === "focus" ? "focus" : "break"}</button><button class="button button-quiet" data-action="reset-pomodoro">Reset</button></div><div class="pomodoro-settings-inline"><span>${pomo.focusMinutes} min focus</span><i>·</i><span>${pomo.shortBreakMinutes} min short break</span><i>·</i><span>${pomo.longBreakMinutes} min long break</span></div></section>`;
}

function getMockQuestions() {
  const shortQuestions = modules.flatMap((module) => questionBank
    .filter((question) => question.module === module.id && question.marks === 3 && !question.source.startsWith("Syllabus"))
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map((question) => ({ ...question, marks: 3 })));
  const longQuestions = modules.flatMap((module) => questionBank.filter((question) => question.module === module.id && question.marks === 14).sort(() => Math.random() - 0.5).slice(0, 2));
  return [...shortQuestions, ...longQuestions];
}

function startMock() {
  const questions = getMockQuestions();
  if (questions.filter((question) => question.marks === 3).length < 10 || modules.some((module) => questions.filter((question) => question.module === module.id && question.marks === 14).length < 2)) {
    showToast("There are not enough practice questions to create a complete mock.");
    return;
  }
  state.activeMock = { startedAt: new Date().toISOString(), deadline: Date.now() + 3 * 60 * 60 * 1000, questions, answers: {}, selectedPartB: [], selfScores: {}, submitted: false };
  recordActivity("Started a CST401 mock exam");
  persist();
  renderPage("mock");
  mockInterval = window.setInterval(updateMockClock, 1000);
}

function updateMockClock() {
  const active = state.activeMock;
  if (!active || active.submitted || !active.deadline) return;
  const remaining = Math.max(0, active.deadline - Date.now());
  const clock = document.querySelector("#mock-clock");
  if (clock) clock.textContent = formatClock(remaining);
  if (remaining <= 0) submitMock(true);
}

function submitMock(timedOut = false) {
  const active = state.activeMock;
  if (!active || active.submitted) return;
  window.clearInterval(mockInterval);
  active.submitted = true;
  active.elapsedMs = Math.max(0, 3 * 60 * 60 * 1000 - Math.max(0, active.deadline - Date.now()));
  active.timedOut = timedOut;
  const stats = mockAnswerStats(active);
  const scores = Object.values(active.selfScores || {}).map(Number).filter(Number.isFinite);
  state.mockSessions.unshift({
    date: todayKey(), answered: stats.answered, total: stats.total,
    selfScore: scores.length ? scores.reduce((sum, value) => sum + value, 0) : null,
    selfScores: active.selfScores,
  });
  state.mockSessions = state.mockSessions.slice(0, 20);
  recordActivity(timedOut ? "Mock exam time expired" : "Submitted a CST401 mock exam");
  persist();
  renderPage("mock");
}

function saveMockProgress() {
  if (state.activeMock) persist();
  const unanswered = state.activeMock ? mockAnswerStats(state.activeMock).unanswered : 0;
  const counter = document.querySelector("#mock-unanswered");
  if (counter) counter.textContent = `Unanswered: ${unanswered}`;
}

function handleAction(target) {
  const action = target.dataset.action;
  const topicId = target.dataset.topic;
  switch (action) {
    case "go-page": renderPage(target.dataset.page); break;
    case "open-module": renderPage("syllabus"); setTimeout(() => { const details = [...document.querySelectorAll(".syllabus-module")].find((item) => item.querySelector(".module-badge")?.textContent === `M${target.dataset.module}`); details?.setAttribute("open", ""); details?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 0); break;
    case "open-topic": selectedNoteTopic = topicId; renderPage("notes"); break;
    case "open-related-questions": {
      const topic = topicById(topicId);
      renderPage("bank");
      if (topic) {
        document.querySelector("#bank-search").value = topic.name;
        renderQuestionBankIntoPage();
      }
      break;
    }
    case "toggle-topic": toggleTopic(topicId); break;
    case "mark-studied": markTopicStudied(topicId); break;
    case "mark-revision-step": markRevision(topicId, Number(target.dataset.step)); break;
    case "mark-revised": {
      const revision = revisionSchedule(topicId).find((item) => !state.revisedAt[`${topicId}:${item.index}`] && item.due <= todayKey());
      if (revision) markRevision(topicId, revision.index);
      else showToast("No revision is due yet. Mark the topic studied to create its schedule.");
      break;
    }
    case "toggle-task": setTaskDone(target.dataset.date, target.dataset.id, target.checked); break;
    case "toggle-bookmark": toggleBookmark(target.dataset.id); break;
    case "select-note-topic": selectedNoteTopic = topicId; renderPage("notes"); break;
    case "export-notes": exportNotes(); break;
    case "export-data": downloadFile("cst401-study-progress.json", JSON.stringify(state, null, 2), "application/json"); break;
    case "toggle-theme": toggleTheme(); break;
    case "start-pomodoro": startPomodoro(); break;
    case "pause-pomodoro": pausePomodoro(); break;
    case "reset-pomodoro": resetPomodoro(); break;
    case "start-mock": startMock(); break;
    case "submit-mock": submitMock(); break;
    case "resume-mock": state.activeMock.submitted = false; state.activeMock.deadline = Date.now() + 3 * 60 * 60 * 1000; persist(); renderPage("mock"); mockInterval = window.setInterval(updateMockClock, 1000); break;
    case "new-mock": state.activeMock = null; persist(); renderPage("mock"); break;
    case "save-mock-evaluation": {
      const session = state.mockSessions[0];
      if (session && state.activeMock) {
        session.selfScores = { ...state.activeMock.selfScores };
        const values = Object.values(session.selfScores).map(Number).filter(Number.isFinite);
        session.selfScore = values.length ? values.reduce((sum, value) => sum + value, 0) : null;
        persist();
        showToast("Self-evaluation saved.");
        renderPage("mock");
      }
      break;
    }
    default: break;
  }
}

function handleChange(target) {
  if (target.dataset.action === "set-prep") {
    state.prepStatus[target.dataset.id] = target.value;
    const item = importantRecords.find((record) => record.id === target.dataset.id);
    if (item && target.value === "Completed" && !state.completedTopics.includes(item.topicId)) {
      state.completedTopics.push(item.topicId);
      state.studiedAt[item.topicId] = todayKey();
      recordActivity(`Completed ${item.name}`);
    }
    if (item && target.value !== "Completed" && state.completedTopics.includes(item.topicId)) {
      state.completedTopics = state.completedTopics.filter((id) => id !== item.topicId);
      delete state.studiedAt[item.topicId];
    }
    persist();
    renderPage(activePage);
  } else if (target.dataset.action === "set-question-status") {
    state.questionStatus[target.dataset.id] = target.value;
    persist();
    renderPage(activePage);
  } else if (target.dataset.action === "select-partb") {
    const active = state.activeMock;
    const index = Number(target.dataset.index);
    const question = active?.questions[index];
    if (!active || !question) return;
    const sameModule = active.selectedPartB.filter((selected) => active.questions[selected].module === question.module);
    if (target.checked && sameModule.length >= 1) {
      target.checked = false;
      showToast(`Select only one Part B question from Module ${question.module}.`);
      return;
    }
    active.selectedPartB = target.checked ? [...active.selectedPartB, index] : active.selectedPartB.filter((selected) => selected !== index);
    saveMockProgress();
  } else if (target.dataset.action === "set-mock-score") {
    const score = target.value;
    if (state.activeMock) {
      if (score === "") delete state.activeMock.selfScores[target.dataset.module];
      else state.activeMock.selfScores[target.dataset.module] = Number(score);
      persist();
    }
  } else if (target.id === "priority-filter") {
    const priority = target.value;
    document.querySelector("#page-content").innerHTML = renderImportant();
    document.querySelector("#priority-filter").value = priority;
  } else if (target.id === "bank-module" || target.id === "bank-marks" || target.id === "bank-source") {
    renderQuestionBankIntoPage();
  } else if (target.id === "paper-module" || target.id === "paper-marks" || target.id === "paper-source") {
    const page = document.querySelector("#page-content");
    const query = document.querySelector("#paper-search")?.value || "";
    page.innerHTML = renderPapers();
    document.querySelector("#paper-search").value = query;
  }
}

function renderQuestionBankIntoPage() {
  const page = document.querySelector("#page-content");
  const query = document.querySelector("#bank-search")?.value || "";
  const module = document.querySelector("#bank-module")?.value || "all";
  const marks = document.querySelector("#bank-marks")?.value || "all";
  const source = document.querySelector("#bank-source")?.value || "all";
  page.innerHTML = renderQuestionBank();
  document.querySelector("#bank-search").value = query;
  document.querySelector("#bank-module").value = module;
  document.querySelector("#bank-marks").value = marks;
  document.querySelector("#bank-source").value = source;
}

function handleInput(target) {
  if (target.id === "global-search") {
    searchQuery = target.value;
    if (searchQuery.trim()) renderSearchPage();
    else renderPage(activePage);
  } else if (target.id === "bank-search") {
    const query = target.value;
    renderQuestionBankIntoPage();
    const input = document.querySelector("#bank-search");
    input.value = query;
    input.focus();
    input.setSelectionRange(query.length, query.length);
  } else if (target.id === "paper-search") {
    const query = target.value;
    const page = document.querySelector("#page-content");
    page.innerHTML = renderPapers();
    const input = document.querySelector("#paper-search");
    input.value = query;
    input.focus();
    input.setSelectionRange(query.length, query.length);
  } else if (target.dataset.action === "save-topic-note") {
    state.topicNotes[target.dataset.topic] = target.value;
    persist();
  } else if (target.id === "personal-note") {
    state.topicNotes[selectedNoteTopic] = target.value;
    persist();
  } else if (target.dataset.action === "save-mock-answer") {
    if (state.activeMock) {
      state.activeMock.answers[target.dataset.index] = target.value;
      saveMockProgress();
    }
  }
}

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget && actionTarget.type !== "checkbox" && actionTarget.tagName !== "SELECT" && actionTarget.tagName !== "TEXTAREA") {
    handleAction(actionTarget);
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target.dataset.action === "toggle-topic" || target.dataset.action === "toggle-task") handleAction(target);
  else handleChange(target);
});

document.addEventListener("input", (event) => handleInput(event.target));

document.addEventListener("submit", (event) => {
  if (event.target.id === "add-task-form") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const label = String(formData.get("label") || "").trim();
    const minutes = Number(formData.get("minutes"));
    if (!label || !Number.isFinite(minutes) || minutes < 5 || minutes > 240) {
      showToast("Enter a task and a duration between 5 and 240 minutes.");
      return;
    }
    getPlan(todayKey()).push({ id: `custom-${Date.now()}`, label, minutes, done: false, custom: true });
    persist();
    renderPage("planner");
  } else if (event.target.id === "goal-form") {
    event.preventDefault();
    const goal = Number(new FormData(event.target).get("goal"));
    if (!Number.isInteger(goal) || goal < 15 || goal > 720) {
      showToast("Set a daily goal between 15 and 720 minutes.");
      return;
    }
    state.dailyGoalMinutes = goal;
    persist();
    showToast("Daily study goal updated.");
    renderPage("settings");
  } else if (event.target.id === "pomodoro-form") {
    event.preventDefault();
    if (state.pomodoro.running) {
      showToast("Pause the running timer before changing its durations.");
      return;
    }
    const data = new FormData(event.target);
    const focus = Number(data.get("focus"));
    const short = Number(data.get("short"));
    const long = Number(data.get("long"));
    if (![focus, short, long].every(Number.isInteger) || focus < 1 || focus > 120 || short < 1 || short > 60 || long < 1 || long > 90) {
      showToast("Check timer durations: focus 1–120, short break 1–60, long break 1–90 minutes.");
      return;
    }
    state.pomodoro.focusMinutes = focus;
    state.pomodoro.shortBreakMinutes = short;
    state.pomodoro.longBreakMinutes = long;
    if (state.pomodoro.mode === "focus") state.pomodoro.remainingMs = focus * 60000;
    else state.pomodoro.remainingMs = (state.pomodoro.mode === "long" ? long : short) * 60000;
    persist();
    showToast("Pomodoro settings saved.");
    renderPage("settings");
  }
});

document.querySelector("#main-nav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (button) renderPage(button.dataset.page);
});

document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);
document.querySelector("#menu-toggle").addEventListener("click", () => {
  const sidebar = document.querySelector("#sidebar");
  const open = sidebar.classList.toggle("is-open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", String(open));
});

document.querySelector("#global-search").addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.target.value = "";
    searchQuery = "";
    renderPage(activePage);
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#global-search").focus();
  }
});

function renderDashboardWithTimer() {
  renderPage("dashboard");
  const timerPanel = document.querySelector("#dashboard-timer-slot");
  if (timerPanel) timerPanel.innerHTML = renderPomodoro();
}

document.body.classList.toggle("dark-mode", state.darkMode);
renderPage("dashboard");
if (state.pomodoro.running && state.pomodoro.deadline) {
  if (state.pomodoro.deadline <= Date.now()) runPomodoroTick();
  else pomodoroInterval = window.setInterval(runPomodoroTick, 1000);
}
if (state.activeMock && !state.activeMock.submitted) mockInterval = window.setInterval(updateMockClock, 1000);
window.setInterval(() => {
  const countdown = document.querySelector("#exam-countdown");
  if (!countdown) return;
  const remaining = Math.max(0, EXAM_DATE - Date.now());
  document.querySelector("#countdown-days").textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
  document.querySelector("#countdown-hours").textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, "0");
  document.querySelector("#countdown-minutes").textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
  countdown.setAttribute("aria-label", `${document.querySelector("#countdown-days").textContent} days, ${document.querySelector("#countdown-hours").textContent} hours, ${document.querySelector("#countdown-minutes").textContent} minutes until the exam date`);
}, 60000);
