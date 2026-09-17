export type CaseStudyMetric = {
  value: string
  label: string
  detail: string
}

export type CaseStudyLayer = {
  title: string
  text: string
}

export type CaseStudy = {
  audience: string
  scope: string
  constraint: string
  evidenceNote: string
  metrics: CaseStudyMetric[]
  systemTitle: string
  systemIntro: string
  systemLayers: CaseStudyLayer[]
  reflection: string
}

export const caseStudies: Record<string, CaseStudy> = {
  squadtactics: {
    audience: "Coaches, players, and football staff working before, during, and after a match.",
    scope: "Mobile product strategy, bilingual UX, Flutter architecture, Firebase data, and live-match workflows.",
    constraint: "Match actions must stay fast and recoverable even when connectivity or attention is limited.",
    evidenceNote: "These figures describe implemented product scope, not estimated business uplift.",
    metrics: [
      { value: "02", label: "Role journeys", detail: "Coach and player experiences share one system while exposing different decisions." },
      { value: "06", label: "Formation models", detail: "Six tactical structures drive the same reusable lineup engine." },
      { value: "11", label: "Starting positions", detail: "A full starting XI can be assigned, swapped, and validated before kickoff." },
    ],
    systemTitle: "One match, three connected operating layers.",
    systemIntro: "The design system follows football operations instead of treating every feature as a separate screen.",
    systemLayers: [
      { title: "Prepare", text: "Fixtures, availability, roster status, contracts, and lineup selection establish match context." },
      { title: "Operate", text: "Periods, goals, substitutions, added time, and player minutes remain usable under pressure." },
      { title: "Remember", text: "The confirmed report turns live events into player history and team records." },
    ],
    reflection: "The next validation step is a timed matchday test with coaches using the app under poor connectivity.",
  },
  helpdesk: {
    audience: "Employees requesting help, support staff owning tickets, and managers monitoring workload.",
    scope: "Workflow design, role-based UX, Next.js application architecture, relational data, and deployment.",
    constraint: "Every status and edit must respect ownership and authorization, not only hide controls in the interface.",
    evidenceNote: "Counts are taken from the implemented role model and documented production views.",
    metrics: [
      { value: "03", label: "Role workspaces", detail: "Employee, support, and manager tasks are separated without fragmenting the product." },
      { value: "13", label: "Documented views", detail: "The shipped interface covers intake, queues, ownership, workload, users, and states." },
      { value: "02", label: "Appearance modes", detail: "Dark and light modes use the same components, hierarchy, and interaction rules." },
    ],
    systemTitle: "The ticket remains the source of truth.",
    systemIntro: "The interface, authorization rules, and relational model all follow the same ownership lifecycle.",
    systemLayers: [
      { title: "Intake", text: "Structured fields turn an informal request into actionable support context." },
      { title: "Ownership", text: "Priority, status, assignee, and permissions make responsibility visible at every step." },
      { title: "Oversight", text: "Managers see queues, workload, unassigned work, and users without interrupting resolution." },
    ],
    reflection: "A future iteration would add service-level targets and measure time-to-first-response with real operational data.",
  },
  spoton: {
    audience: "Drivers who need to find, reserve, enter, and manage parking with minimal distraction.",
    scope: "End-to-end mobile redesign covering discovery, booking, passes, vehicles, guests, and preferences.",
    constraint: "The product must surface price, distance, time, and availability without becoming another dashboard to study.",
    evidenceNote: "The numbers reflect the designed booking flow and implemented interface coverage.",
    metrics: [
      { value: "03", label: "Booking decisions", detail: "Time, vehicle, and payment are handled as three reviewable steps." },
      { value: "07", label: "Core product views", detail: "The portfolio documents the connected discovery-to-pass experience." },
      { value: "02", label: "Appearance modes", detail: "Light and dark experiences retain the same navigation and priority cues." },
    ],
    systemTitle: "Every screen answers the next driving question.",
    systemIntro: "The interaction system is organised around progress toward a confirmed, usable parking pass.",
    systemLayers: [
      { title: "Locate", text: "Availability, distance, and price help the driver choose without opening several tools." },
      { title: "Reserve", text: "A short sequence captures only the decisions required to secure the spot." },
      { title: "Arrive", text: "The QR pass, directions, vehicle, extension, and cancellation remain together after booking." },
    ],
    reflection: "The next study should compare completion time and booking errors against the original multi-screen flow.",
  },
  qnb: {
    audience: "Mobile banking customers checking balances, moving money, and understanding recent spending.",
    scope: "UX audit, information architecture, interaction hierarchy, interface system, and clickable concept prototype.",
    constraint: "Frequent actions must become easier to find without making a financial interface feel unfamiliar or unsafe.",
    evidenceNote: "No conversion claim is invented: these are directly countable changes in the redesign concept.",
    metrics: [
      { value: "06", label: "Redesigned screens", detail: "Six connected screens demonstrate authentication, home, budget, and navigation states." },
      { value: "04", label: "Actions surfaced", detail: "Four high-frequency money actions are placed directly in the home hierarchy." },
      { value: "01", label: "Consolidated home", detail: "Balance, recent activity, actions, and budget context share one scan path." },
    ],
    systemTitle: "A banking hierarchy built around confidence.",
    systemIntro: "The redesign reduces search effort through placement and grouping; it does not claim untested percentage gains.",
    systemLayers: [
      { title: "Recognise", text: "QNB colour, account context, and familiar financial patterns preserve trust." },
      { title: "Act", text: "Primary actions remain visible and reachable instead of being buried in navigation." },
      { title: "Understand", text: "Recent activity and budget context explain what changed after the action." },
    ],
    reflection: "A moderated usability test would establish the real click reduction and completion-time improvement versus the current app.",
  },
  swizzle: {
    audience: "Potential partners, vendors, investors, and early customers evaluating a new consumer concept.",
    scope: "Brand positioning, product story, visual identity, product visualisation, and presentation design.",
    constraint: "The deck had to explain an experience that did not yet exist physically while still feeling commercially credible.",
    evidenceNote: "The figures describe the delivered narrative system and its visible design ingredients.",
    metrics: [
      { value: "08", label: "Story sections", detail: "Eight key slides move from promise and identity to product, audience, and rollout." },
      { value: "02", label: "Anchor colours", detail: "A compact purple-and-pink core keeps varied product content recognisable." },
      { value: "01", label: "Signature ritual", detail: "The twist-cup idea gives the product a repeatable visual and physical moment." },
    ],
    systemTitle: "The product idea becomes a story people can repeat.",
    systemIntro: "Identity, deck structure, and product visualisation all reinforce the same playful launch promise.",
    systemLayers: [
      { title: "Taste", text: "Colour, type, and flavour language establish an immediate sensory personality." },
      { title: "Ritual", text: "The cup silhouette turns mixing flavours into the recognisable Swizzle behaviour." },
      { title: "Rollout", text: "Audience, destinations, range, and operating detail translate energy into a credible concept." },
    ],
    reflection: "The next step is testing the identity on physical cups, signage, menus, and a real point-of-sale environment.",
  },
  automate: {
    audience: "Drivers who want a private record of maintenance, mileage, fuel, costs, and vehicle documents.",
    scope: "Native Android development with Kotlin, Jetpack Compose, MVVM, Room, and Material 3.",
    constraint: "Detailed ownership data must remain understandable and useful without accounts, cloud setup, or a dense utility dashboard.",
    evidenceNote: "All figures come from the implemented navigation, tracked systems, and local persistence model.",
    metrics: [
      { value: "05", label: "Ownership rooms", detail: "Home, care, journeys, costs, and glovebox connect the vehicle lifecycle." },
      { value: "07", label: "Vehicle systems", detail: "Care cycles track seven service areas through mileage and history." },
      { value: "100%", label: "Device-owned data", detail: "Room persistence keeps the working product local-first with no required account." },
    ],
    systemTitle: "A native app organised like a living machine.",
    systemIntro: "Compose components expose detail progressively while the MVVM and Room layers keep state predictable.",
    systemLayers: [
      { title: "Observe", text: "Mileage, health, and upcoming care compress the vehicle state into one glance." },
      { title: "Remember", text: "Services, fuel, costs, and documents create a continuous local ownership record." },
      { title: "Respond", text: "Lifecycle cues and reminders turn stored information into the next useful action." },
    ],
    reflection: "The next engineering step is adding import, export, and encrypted backup without weakening the local-first model.",
  },
}
