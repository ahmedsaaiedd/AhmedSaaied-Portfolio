export type Project = {
  id: string
  number: string
  title: string
  discipline: string
  year: string
  headline: string
  summary: string
  role: string
  accent: string
  accentSoft: string
  surface: string
  cover: string
  images: string[]
  imageAlt: string
  landscape?: boolean
  liveUrl?: string
  challenge: string
  decisions: string[]
  outcome: string
  tools: string[]
  signals: {
    value: string
    label: string
  }[]
  phases: {
    title: string
    text: string
  }[]
  prototypeSteps: {
    label: string
    hint: string
    image: string
  }[]
}

export const projects: Project[] = [
  {
    id: "squadtactics",
    number: "01",
    title: "SquadTactics Pro",
    discipline: "Product design · Flutter engineering",
    year: "2026",
    headline: "Matchday control, without the chaos.",
    summary:
      "A bilingual football operations platform that connects coaches and players across lineups, fixtures, contracts, training, live match events, and post-match reporting.",
    role: "End-to-end product design and mobile engineering",
    accent: "#55ff28",
    accentSoft: "rgba(85,255,40,.14)",
    surface: "#07100b",
    cover: "/projects/squadtactics/Screenshot_20260910_142539.jpg",
    images: [
      "/projects/squadtactics/Screenshot_20260910_142539.jpg",
      "/projects/squadtactics/Screenshot_20260910_142548.jpg",
      "/projects/squadtactics/Screenshot_20260910_142652.jpg",
      "/projects/squadtactics/Screenshot_20260910_142724.jpg",
      "/projects/squadtactics/Screenshot_20260910_142727.jpg",
      "/projects/squadtactics/Screenshot_20260910_142705.jpg",
      "/projects/squadtactics/Screenshot_20260910_142710.jpg",
      "/projects/squadtactics/Screenshot_20260910_142808.jpg",
      "/projects/squadtactics/Screenshot_20260910_142815.jpg",
      "/projects/squadtactics/Screenshot_20260910_142826.jpg",
      "/projects/squadtactics/Screenshot_20260910_142836.jpg",
    ],
    imageAlt: "SquadTactics Pro football management mobile app",
    challenge:
      "Football teams jump between chats, spreadsheets, and memory. The product needed to keep sensitive match decisions quick while giving every role only what it needs.",
    decisions: [
      "Separated coach and player journeys without splitting the visual language.",
      "Designed the lineup builder around fast formation changes and safe player swaps.",
      "Added a confirmation layer before match data becomes permanent.",
      "Built responsive light, dark, English, and Arabic experiences from one system.",
    ],
    outcome:
      "A coherent working product spanning pre-match planning, live operations, team communication, and player records rather than a collection of disconnected screens.",
    tools: ["Flutter", "Riverpod", "GoRouter", "Firebase", "Figma"],
    signals: [
      { value: "02", label: "Role-specific journeys" },
      { value: "06", label: "Supported formations" },
      { value: "11", label: "Player lineup logic" },
    ],
    phases: [
      { title: "Map the team", text: "Defined coach, player, matchday, and ownership responsibilities before shaping screens." },
      { title: "Model the match", text: "Connected fixtures, lineups, live events, contracts, and reports as one product system." },
      { title: "Build the rhythm", text: "Created reusable Flutter flows with fast feedback and a consistent tactical language." },
      { title: "Test the edges", text: "Pressure-tested swaps, permissions, confirmations, localization, and real-device behavior." },
    ],
    prototypeSteps: [
      {
        label: "Enter securely",
        hint: "Tap the screen to move from access into the coach journey.",
        image: "/projects/squadtactics/Screenshot_20260910_142548.jpg",
      },
      {
        label: "Read matchday",
        hint: "The home view makes the next decision and team activity immediately visible.",
        image: "/projects/squadtactics/Screenshot_20260910_142652.jpg",
      },
      {
        label: "Manage the roster",
        hint: "Player status, position, contract, and value stay connected in one workspace.",
        image: "/projects/squadtactics/Screenshot_20260910_142700.jpg",
      },
      {
        label: "Schedule the match",
        hint: "A focused form captures the opponent, venue, timing, and competition safely.",
        image: "/projects/squadtactics/Screenshot_20260910_142727.jpg",
      },
    ],
  },
  {
    id: "helpdesk",
    number: "02",
    title: "HelpDesk Lite",
    discipline: "Product strategy · Full-stack engineering",
    year: "2026",
    headline: "Support work stays visible, owned, and moving.",
    summary:
      "A role-aware support workspace that takes internal requests from clear submission to ownership, resolution, and management visibility without turning the process into enterprise clutter.",
    role: "Product planning, UX/UI design, and full-stack development",
    accent: "#58e3cf",
    accentSoft: "rgba(88,227,207,.15)",
    surface: "#06151a",
    cover: "/projects/helpdesk/employee-overview.png",
    images: [
      "/projects/helpdesk/login-dark.png",
      "/projects/helpdesk/employee-overview.png",
      "/projects/helpdesk/employee-requests.png",
      "/projects/helpdesk/new-request.png",
      "/projects/helpdesk/support-overview.png",
      "/projects/helpdesk/ticket-queue.png",
      "/projects/helpdesk/support-my-tickets.png",
      "/projects/helpdesk/manager-overview.png",
      "/projects/helpdesk/team-workload.png",
      "/projects/helpdesk/unassigned.png",
      "/projects/helpdesk/users.png",
      "/projects/helpdesk/manager-light.png",
      "/projects/helpdesk/login-light.png",
    ],
    imageAlt: "HelpDesk Lite role-based support management web application",
    landscape: true,
    liveUrl: "https://helpdesk-lite-6yxdkgqvz-ahmedsaaiedd.vercel.app/login",
    challenge:
      "Internal support often disappears into chat threads and unclear ownership. The product needed to make every request traceable while keeping employee submission, support handling, and management oversight focused and easy to learn.",
    decisions: [
      "Separated employee, support, and manager workspaces around the decisions each role actually makes.",
      "Designed one shared ticket lifecycle so status, priority, requester, and owner remain understandable everywhere.",
      "Protected edits and management actions with role-based authorization instead of relying on hidden interface controls.",
      "Built responsive dark and light experiences with clear loading, empty, error, and success states.",
    ],
    outcome:
      "A production-deployed full-stack product where employees can raise and follow requests, support staff can own the queue, and managers can understand workload and access without operational noise.",
    tools: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    signals: [
      { value: "03", label: "Role-specific workspaces" },
      { value: "13", label: "Documented product views" },
      { value: "02", label: "Appearance modes" },
    ],
    phases: [
      { title: "Define the workflow", text: "Mapped submission, ownership, status changes, permissions, and manager visibility before building screens." },
      { title: "Model the data", text: "Connected users, roles, tickets, priorities, states, and ownership through a maintainable relational model." },
      { title: "Build by role", text: "Created focused employee, support, and manager workspaces from one consistent responsive system." },
      { title: "Prove production", text: "Tested real workflows, database behavior, responsive layouts, authorization boundaries, and deployment." },
    ],
    prototypeSteps: [
      {
        label: "Enter the workspace",
        hint: "Secure access routes each user into the right role-aware experience.",
        image: "/projects/helpdesk/login-dark.png",
      },
      {
        label: "Create a request",
        hint: "Employees submit complete requests with clear expectations and required fields.",
        image: "/projects/helpdesk/new-request.png",
      },
      {
        label: "Move the queue",
        hint: "Support staff can filter, own, prioritize, and resolve active work.",
        image: "/projects/helpdesk/ticket-queue.png",
      },
      {
        label: "Read the operation",
        hint: "Managers can inspect workload, unassigned work, users, and overall support health.",
        image: "/projects/helpdesk/manager-overview.png",
      },
    ],
  },
  {
    id: "spoton",
    number: "03",
    title: "SpotON",
    discipline: "Product design · Flutter engineering",
    year: "2026",
    headline: "Parking, minus the friction.",
    summary:
      "A parking companion that takes drivers from live availability to a reserved spot, QR pass, vehicles, guest access, and payments in a few calm steps.",
    role: "Product redesign, architecture, and Flutter development",
    accent: "#1688ff",
    accentSoft: "rgba(22,136,255,.16)",
    surface: "#061323",
    cover: "/projects/spoton/Screenshot_20260910_124733.jpg",
    images: [
      "/projects/spoton/Screenshot_20260910_124733.jpg",
      "/projects/spoton/Screenshot_20260910_124740.jpg",
      "/projects/spoton/Screenshot_20260910_124750.jpg",
      "/projects/spoton/Screenshot_20260910_124802.jpg",
      "/projects/spoton/Screenshot_20260910_124815.jpg",
      "/projects/spoton/Screenshot_20260910_124826.jpg",
      "/projects/spoton/Screenshot_20260910_124843.jpg",
    ],
    imageAlt: "SpotON parking companion mobile app",
    challenge:
      "Parking apps often expose the system instead of helping the driver. The key was reducing choice at the right moments while keeping availability, distance, price, and timing visible.",
    decisions: [
      "Made the best next action dominant on every screen.",
      "Turned booking into a short, reviewable three-step flow.",
      "Kept maps, lists, passes, vehicles, and guest access inside one navigation model.",
      "Created a shared visual system that remains crisp in light and dark modes.",
    ],
    outcome:
      "A complete demo-ready mobile experience with persistent local sessions, booking states, QR passes, vehicle management, and accessible appearance controls.",
    tools: ["Flutter", "Dart", "Responsive UI", "Motion", "Product UX"],
    signals: [
      { value: "03", label: "Booking decisions" },
      { value: "02", label: "Appearance modes" },
      { value: "01", label: "Unified driver journey" },
    ],
    phases: [
      { title: "Audit the drive", text: "Removed decisions that distract a driver from finding and securing the right spot." },
      { title: "Prioritize context", text: "Balanced availability, distance, duration, and price without turning the screen into a table." },
      { title: "Design the flow", text: "Compressed reservation into three calm, reviewable decisions with a clear final check." },
      { title: "Build for return use", text: "Connected passes, vehicles, guests, payment references, and preferences around repeat visits." },
    ],
    prototypeSteps: [
      {
        label: "Open dashboard",
        hint: "Tap to start with live availability and the best next action.",
        image: "/projects/spoton/Screenshot_20260910_124733.jpg",
      },
      {
        label: "Find a spot",
        hint: "Compare nearby parking by availability, distance, and price.",
        image: "/projects/spoton/Screenshot_20260910_124740.jpg",
      },
      {
        label: "Choose the time",
        hint: "Set the start and duration without leaving the booking flow.",
        image: "/projects/spoton/Screenshot_20260910_124750.jpg",
      },
      {
        label: "Review booking",
        hint: "Confirm the spot, time, vehicle, payment method, and total in one final view.",
        image: "/projects/spoton/Screenshot_20260910_124802.jpg",
      },
    ],
  },
  {
    id: "qnb",
    number: "04",
    title: "QNB Mobile Redesign",
    discipline: "UX strategy · Interface design",
    year: "2026",
    headline: "A bank home that explains your money.",
    summary:
      "A concept redesign that reorganizes everyday banking around balance clarity, recent activity, fast actions, and spending context while respecting QNB's purple identity.",
    role: "UX audit, information architecture, and visual redesign",
    accent: "#c86cff",
    accentSoft: "rgba(200,108,255,.15)",
    surface: "#170a1d",
    cover: "/projects/qnb/Screen_Logo_Loading.jpg",
    images: [
      "/projects/qnb/Screen_Logo_Loading.jpg",
      "/projects/qnb/Screen_Login.jpg",
      "/projects/qnb/Screen_Home.jpg",
      "/projects/qnb/Screen_Home-1.jpg",
      "/projects/qnb/Screen_BeBudget.jpg",
      "/projects/qnb/Screen_Navigation_Drawer.jpg",
    ],
    imageAlt: "QNB mobile banking redesign concept",
    challenge:
      "Banking interfaces carry dense information and high-stakes actions. The redesign needed to feel familiar and trustworthy while making frequent tasks faster to find and easier to understand.",
    decisions: [
      "Elevated account balance and card context without overwhelming the first view.",
      "Grouped frequent actions into a stable, reachable pattern.",
      "Added useful budget context instead of another isolated dashboard.",
      "Used motion and hierarchy to clarify state, not decorate transactions.",
    ],
    outcome:
      "A calmer, more scannable banking concept that preserves brand recognition while reducing the effort required for everyday financial decisions.",
    tools: ["Figma", "UX Audit", "Design System", "Prototyping", "Accessibility"],
    signals: [
      { value: "06", label: "Redesigned screens" },
      { value: "04", label: "Primary money actions" },
      { value: "01", label: "Clear financial home" },
    ],
    phases: [
      { title: "Audit the friction", text: "Reviewed the existing hierarchy through the lens of frequent, high-confidence banking tasks." },
      { title: "Reframe the home", text: "Made balances, account context, recent activity, and fast actions work as one scan." },
      { title: "Systemize trust", text: "Used consistent spacing, states, and QNB purple to feel familiar without preserving clutter." },
      { title: "Prototype decisions", text: "Connected sign-in, home, budgeting, and navigation into a believable everyday flow." },
    ],
    prototypeSteps: [
      {
        label: "Sign in securely",
        hint: "Tap to move from authentication into the redesigned banking home.",
        image: "/projects/qnb/Screen_Login.jpg",
      },
      {
        label: "Understand balance",
        hint: "Account context, recent activity, and high-frequency actions share one hierarchy.",
        image: "/projects/qnb/Screen_Home.jpg",
      },
      {
        label: "Review spending",
        hint: "Budget context turns transaction history into something more useful.",
        image: "/projects/qnb/Screen_BeBudget.jpg",
      },
      {
        label: "Navigate confidently",
        hint: "The drawer keeps the wider banking system structured and predictable.",
        image: "/projects/qnb/Screen_Navigation_Drawer.jpg",
      },
    ],
  },
  {
    id: "swizzle",
    number: "05",
    title: "Swizzle",
    discipline: "Brand strategy · Presentation design",
    year: "2025",
    headline: "A summer brand people can almost taste.",
    summary:
      "A playful launch system for an Egyptian slushy concept, covering the brand story, signature multi-flavour cups, product range, audience, destinations, and operating model.",
    role: "Brand narrative, visual system, and deck design",
    accent: "#ff5b87",
    accentSoft: "rgba(255,91,135,.15)",
    surface: "#241035",
    cover: "/projects/swizzle/swizzle-02.jpg",
    images: [
      "/projects/swizzle/swizzle-02.jpg",
      "/projects/swizzle/swizzle-03.jpg",
      "/projects/swizzle/swizzle-04.jpg",
      "/projects/swizzle/swizzle-05.jpg",
      "/projects/swizzle/swizzle-06.jpg",
      "/projects/swizzle/swizzle-07.jpg",
      "/projects/swizzle/swizzle-13.jpg",
      "/projects/swizzle/swizzle-14.jpg",
    ],
    imageAlt: "Swizzle brand presentation",
    landscape: true,
    challenge:
      "The idea needed to feel distinct before the physical experience existed. The presentation had to make the concept, audience, range, and rollout understandable at a glance.",
    decisions: [
      "Built the identity around a memorable twist-cup silhouette and energetic type.",
      "Used a compact purple and pink system to hold varied content together.",
      "Moved from brand promise to product and destination in a simple narrative arc.",
      "Balanced commercial detail with a deliberately playful consumer tone.",
    ],
    outcome:
      "A cohesive brand story that can support conversations with partners, vendors, and early customers while keeping the product experience front and center.",
    tools: ["Brand Strategy", "Visual Identity", "Figma", "Presentation Design"],
    signals: [
      { value: "08", label: "Story-led key slides" },
      { value: "02", label: "Core brand colors" },
      { value: "01", label: "Signature cup idea" },
    ],
    phases: [
      { title: "Define the promise", text: "Positioned the brand around playful choice, summer energy, and a recognizable product ritual." },
      { title: "Shape the identity", text: "Built a compact visual system around the twist-cup silhouette, purple, pink, and expressive type." },
      { title: "Structure the story", text: "Moved from the central idea to products, audience, destinations, and operations in a clean arc." },
      { title: "Prepare the launch", text: "Balanced consumer excitement with enough clarity for vendor and partner conversations." },
    ],
    prototypeSteps: [
      {
        label: "Meet Swizzle",
        hint: "Tap to move through the launch narrative.",
        image: "/projects/swizzle/swizzle-02.jpg",
      },
      {
        label: "See the promise",
        hint: "The brand story turns a product idea into an experience people can picture.",
        image: "/projects/swizzle/swizzle-03.jpg",
      },
      {
        label: "Explore the identity",
        hint: "A compact visual language holds the playful concept together.",
        image: "/projects/swizzle/swizzle-04.jpg",
      },
      {
        label: "Enter the range",
        hint: "The deck connects the visual idea to a clear product system.",
        image: "/projects/swizzle/swizzle-05.jpg",
      },
    ],
  },
  {
    id: "automate",
    number: "06",
    title: "AutoMate",
    discipline: "Android engineering · Product design",
    year: "2026",
    headline: "Your car, understood as a living machine.",
    summary:
      "A private, local-first vehicle companion that turns maintenance, mileage, fuel, documents, and costs into one calm living map of the machine.",
    role: "Kotlin developer",
    accent: "#a584ff",
    accentSoft: "rgba(165,132,255,.16)",
    surface: "#120e18",
    cover: "/projects/automate/Screenshot_20260916_015445_AutoMate.jpg",
    images: [
      "/projects/automate/Screenshot_20260916_015445_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015434_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015423_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015247_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015254_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015258_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015342_AutoMate.jpg",
      "/projects/automate/Screenshot_20260916_015306_AutoMate.jpg",
    ],
    imageAlt: "AutoMate native Android vehicle care and ownership app",
    challenge:
      "Vehicle ownership scatters essential information across odometer notes, invoices, reminders, fuel receipts, and document folders. The product needed to connect all of it without feeling like another dense dashboard or requiring an account.",
    decisions: [
      "Built the experience around one living machine whose condition changes with every drive and service event.",
      "Connected care cycles, fuel entries, costs, documents, and mileage instead of presenting isolated utilities.",
      "Used progressive disclosure and a five-room navigation model to keep detailed ownership data approachable.",
      "Made privacy structural: local Room persistence, no account, and explicit device-owned data controls.",
    ],
    outcome:
      "A native Android product with a distinctive living-machine identity, calm daily status, vehicle switching, lifecycle-aware care, cost perspective, a private glovebox, and adaptive appearance and motion controls.",
    tools: ["Kotlin", "Jetpack Compose", "MVVM", "Room", "Material 3"],
    signals: [
      { value: "05", label: "Connected ownership rooms" },
      { value: "07", label: "Tracked vehicle systems" },
      { value: "100%", label: "Local-first data" },
    ],
    phases: [
      { title: "Map the machine", text: "Turned care, mileage, fuel, costs, documents, and settings into one connected ownership model." },
      { title: "Give it a pulse", text: "Created the living-machine orbit and calm status language so health is understood before numbers are read." },
      { title: "Engineer the memory", text: "Used Kotlin, Compose, MVVM, and Room to keep state structured, responsive, and private on the device." },
      { title: "Tune the experience", text: "Designed adaptive themes, quiet motion, reminders, and progressive detail for comfortable repeated use." },
    ],
    prototypeSteps: [
      {
        label: "Wake the machine",
        hint: "Enter a private ownership experience built around the car rather than a menu of tools.",
        image: "/projects/automate/Screenshot_20260916_015445_AutoMate.jpg",
      },
      {
        label: "Read its rhythm",
        hint: "The home orbit compresses mileage, condition, and the next care signal into one glance.",
        image: "/projects/automate/Screenshot_20260916_015434_AutoMate.jpg",
      },
      {
        label: "Open the care map",
        hint: "Every system exposes its lifecycle, history, and remaining distance without losing the bigger picture.",
        image: "/projects/automate/Screenshot_20260916_015423_AutoMate.jpg",
      },
      {
        label: "Keep the glovebox",
        hint: "Documents and renewals remain organized, visible, and stored on the device.",
        image: "/projects/automate/Screenshot_20260916_015342_AutoMate.jpg",
      },
    ],
  },
]

export const capabilities = [
  {
    number: "01",
    title: "Mobile product engineering",
    text: "Responsive Flutter and native Android experiences, robust state, navigation, offline-aware flows, device details, and motion that stays smooth under real use.",
    tools: "Flutter · Kotlin · Jetpack Compose · Riverpod",
  },
  {
    number: "02",
    title: "Product & interface design",
    text: "Information architecture, interaction design, visual systems, prototyping, and the small usability decisions that make software feel obvious.",
    tools: "Figma · UX systems · Prototyping",
  },
  {
    number: "03",
    title: "Web & backend systems",
    text: "Practical full-stack products with clear data models, safe authentication, maintainable components, and production-minded performance.",
    tools: "Next.js · TypeScript · PostgreSQL · Firebase",
  },
]
