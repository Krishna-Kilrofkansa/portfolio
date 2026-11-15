/**
 * lib/projectDeepDives.js
 * Rich project data repository backing both the Tactile Dossier Deck
 * and the Interactive ProjectDeepDiveModal.
 * 
 * Written with:
 * 1. Humane, plain-English explanations for non-technical visitors.
 * 2. Visual graph-based architecture stages for interactive flow diagrams.
 * 3. Exact mathematical formulations and real codebase failure post-mortems.
 * 4. Verified real image assets from public/project-assets/.
 */

export const PROJECT_DEEP_DIVES = {
    fifa_worldcup: {
        id: 'fifa_worldcup',
        chapter: 'CH.01 // CURIOSITY',
        title: 'FIFA World Cup 2026 Probabilistic Forecasting Engine',
        badge: '20,000 MONTE CARLO RUNS • CALIBRATED',
        timeline: 'June 2026 – August 2026',
        techStack: ['Python 3.11', 'NumPy', 'SciPy', 'Scikit-Learn', 'XGBoost', 'Monte Carlo'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa/World-Cup-Predictor',
        humaneStory:
            "I love football, and with the 2026 World Cup expanding to a brand-new 48-team format (12 groups of 4 with 495 permutations of 3rd-place tie-breakers), traditional tournament brackets broke down completely. Instead of relying on talking heads on TV or naive historical averages, I built a simulation engine from scratch. It plays out the entire World Cup 20,000 times in under 4.5 seconds—accounting for player form, goal margin impact, and match fatigue—delivering calibrated, realistic probability curves for every team's path to the trophy.",
        metrics: [
            { val: '20,000', lbl: 'Vectorized Monte Carlo Runs' },
            { val: '< 4.5s', lbl: 'Tournament Sim Latency' },
            { val: '495', lbl: 'FIFA Annex C Tie-break Branches' },
            { val: '0.00', lbl: 'Orientation Bias (Symmetric)' },
        ],
        architectureStages: [
            {
                id: 'ingestion',
                role: 'INGESTION',
                name: 'Historical Match & Squad Ingestion',
                type: 'INPUT',
                metric: '900+ Matches',
                plainDescription: 'Collects historical FIFA international match outcomes, goal differentials, and EA FC positional squad ratings.',
                technicalDetail: 'Historical matches ingested from 1994 to present; player positional ratings aggregated into Attack, Midfield, Defense, Goalkeeper composite tensors.',
                tech: 'Pandas / NumPy',
                inputOutput: { in: 'Raw match logs & player cards', out: 'Cleaned match-pair feature vectors' },
            },
            {
                id: 'elo_engine',
                role: 'CORE RATING',
                name: 'Dynamic Forward-Time Elo Engine',
                type: 'PROCESSING',
                metric: 'Strict t-1 Split',
                plainDescription: 'Calculates dynamic team strengths over time, rewarding teams more when they beat strong opponents by multiple goals.',
                technicalDetail: 'Implements margin-of-victory multiplier: ln(|goal_diff| + 1) * (2.2 / (elo_diff * 0.001 + 2.2)), strictly evaluated at timestamp t-1 to prevent point-in-time data leakage.',
                tech: 'Python / Math',
                inputOutput: { in: 'Match kickoff timestamp', out: 'Point-in-time Elo ratings at t-1' },
            },
            {
                id: 'symmetrizer',
                role: 'FAIRNESS GATE',
                name: 'Pairwise Symmetrization & Mirroring',
                type: 'SECURITY',
                metric: 'Zero-Intercept',
                plainDescription: 'Guarantees that the simulation does not arbitrarily favor Team A over Team B just because Team A was entered first.',
                technicalDetail: 'Trains multinomial classifier on dual mirrored pairs [(x, y), (-x, flip(y))] with zero-intercept constraints, ensuring P(A beats B) + P(B beats A) + P(Draw) == 1.0.',
                tech: 'Scikit-Learn',
                inputOutput: { in: 'Raw feature vector (x)', out: 'Mirrored feature tensor [(x), (-x)]' },
            },
            {
                id: 'monte_carlo',
                role: 'SIMULATION',
                name: 'Vectorized Monte Carlo Tournament Sim',
                type: 'ENGINE',
                metric: '20,000 Runs in 4.5s',
                plainDescription: 'Simulates the entire 48-team tournament bracket tens of thousands of times using vectorized matrix math to map out every possible progression.',
                technicalDetail: 'Vectorized NumPy simulation resolving 12 groups of 4, top 2 advance, plus the 8 best 3rd-place teams under FIFA Annex C permutations using precomputed lookup tables.',
                tech: 'NumPy Vectorized C-API',
                inputOutput: { in: 'Calibrated match transition matrix', out: '20,000 completed tournament brackets' },
            },
            {
                id: 'calibrator',
                role: 'VERIFICATION',
                name: 'Platt Calibration & Brier Verification',
                type: 'OUTPUT',
                metric: 'Brier Minimization',
                plainDescription: 'Ensures the probabilities are genuinely honest: when the engine says a team has a 70% chance of advancing, they actually advance 70% of the time.',
                technicalDetail: 'Platt scaling and isotonic regression evaluated against multi-class Brier score and log-loss, eliminating false overconfidence in knockout rounds.',
                tech: 'SciPy Optimize',
                inputOutput: { in: 'Raw logits from classifier', out: 'Calibrated probability distributions' },
            },
        ],
        dataContracts: `// State Vector for Match Simulation:
Team_Vector = [
    Elo_Delta: float32,          // t-1 Walk-forward difference
    Att_vs_Def_Delta: float32,   // Attacking rating minus opposing Defense
    Midfield_Control: float32,   // Differential in ball retention metrics
    Rest_Days_Delta: int16,      // Physical fatigue recovery delta
    Travel_Distance_Km: float32  // Venue displacement across North America
]
P(Win, Draw, Loss) = Softmax(W * Team_Vector + 0.0) // Zero-intercept constraint`,
        mathFormula: 'P(A \\text{ beats } B) = \\frac{1}{1 + 10^{-(R_A - R_B) / 400}} \\times \\ln(|\\Delta \\text{goals}| + 1)',
        mathExplanation:
            'The dynamic forward Elo uses a margin-of-victory dampener to prevent blowout games against weak opponents from artificially inflating ratings, while Platt scaling maps uncalibrated SVM/XGBoost margins into true, empirical posterior probabilities.',
        technicalBulletPoints: [
            {
                title: 'Vectorized NumPy Engine',
                detail: 'Simulates all 48-team tournament brackets simultaneously as contiguous memory arrays without slow Python for-loops, finishing 20,000 full World Cups in 4.4 seconds.',
            },
            {
                title: 'FIFA Annex C Logic',
                detail: 'Fully implements the 495 combinations of third-place team allocation across the Round of 32 knockout grid using precomputed constant-time bitmask lookups.',
            },
            {
                title: 'Zero Leakage Guarantee',
                detail: 'Every feature is frozen strictly at t-1 relative to the opening whistle. No post-match Elo adjustments or injured player updates from future rounds pollute training splits.',
            },
        ],
        codeSnippet: `def simulate_tournament_vectorized(elo_ratings, squad_vectors, n_sims=20000):
    # Vectorized group stage simulation
    # Memory contiguous float32 tensors
    group_points = np.zeros((n_sims, 48), dtype=np.int16)
    for match in group_schedule:
        t1, t2 = match.team1_idx, match.team2_idx
        p_win, p_draw, p_loss = match_classifier.predict_proba_calibrated(t1, t2)
        outcomes = sample_outcomes_vectorized(p_win, p_draw, p_loss, n_sims)
        accumulate_points(group_points, t1, t2, outcomes)
    # Resolve 495 Annex C permutations
    advancing_teams = resolve_annex_c_vectorized(group_points)
    return run_knockouts_vectorized(advancing_teams, n_sims)`,
        postMortem: {
            whatBroke:
                'Initial backtests showed a suspiciously high 78% accuracy on historical tournament games. Looking deeper, the model was predicting Team A vs Team B differently depending on which team was passed first into the function (orientation bias).',
            rootCause:
                'Point-in-time data leakage: the model was inadvertently reading final tournament squad updates that occurred after matches had already concluded, and the neural classifier lacked symmetry invariance.',
            fixes: [
                {
                    title: 'Strict Walk-Forward Temporal Splits',
                    desc: 'Froze all historical Elo ratings and player attributes strictly at t-1 relative to kickoff.',
                },
                {
                    title: 'Pairwise Symmetrization',
                    desc: 'Trained on mirrored pairs [(x, y), (-x, flip(y))] with zero-intercept constraints, guaranteeing P(A beats B) + P(B beats A) + P(Draw) == 1.0.',
                },
                {
                    title: 'Platt Calibration & Brier Optimization',
                    desc: 'Switched loss function from raw accuracy to multi-class Brier score, penalizing overconfident predictions that failed in real matches.',
                },
            ],
        },
        takeaway:
            'I would rather have trustworthy, calibrated probabilities that reflect real uncertainty than confident, fragile point predictions that look impressive until game day.',
        images: [
            {
                src: '/project-assets/fifa_worldcup/bracket_2026.png',
                caption: 'Official 48-Team Probabilistic Tournament Progression Bracket & Annex C Grid',
            },
        ],
    },

    hollow_knight: {
        id: 'hollow_knight',
        chapter: 'CH.03 // TAKING A BIGGER SWING',
        title: "Hollow Knight King's Pass Reinforcement Learning Agent",
        badge: 'ZERO-FRAME LATENCY • DIRECT MEMORY HOOK',
        timeline: 'October 2026',
        techStack: ['Python', 'Gymnasium', 'Stable-Baselines3 (PPO)', 'C# / Unity Modding', 'PyDirectInput'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            "Most artificial intelligence in video games is trained by recording the monitor screen with video capture and running heavy neural networks on the video frames. But video capture is slow, lags behind by two full frames, and wastes computer power processing background art. In a precision platformer like Hollow Knight where a split-second mistake drops you onto deadly spikes, visual lag means instant death. I wrote a custom C# mod that compiles straight into the game's Unity engine, reading the player's exact coordinates and obstacle locations straight from computer memory at the speed of RAM—allowing an AI agent to learn King's Pass with zero frame latency.",
        metrics: [
            { val: '0 Frames', lbl: 'Visual Latency (Bypassed CNNs)' },
            { val: '23-D', lbl: 'Tactical Radar State Vector' },
            { val: '10x', lbl: 'Faster Training Iteration' },
            { val: '100%', lbl: 'Autonomous Platform Completion' },
        ],
        architectureStages: [
            {
                id: 'unity_runtime',
                role: 'GAME RUNTIME',
                name: 'Unity Engine Loop & C# BepInEx Mod',
                type: 'INPUT',
                metric: 'In-Engine Hook',
                plainDescription: "Runs directly inside Hollow Knight's memory. Every 3 game frames, it extracts position, velocity, and enemy coordinates without touching the screen.",
                technicalDetail: 'Compiled C# BepInEx mod hooking HeroController.Update(). Serializes player x, y, x_vel, y_vel, and ground contact flags directly into an in-memory memory-mapped file.',
                tech: 'C# / BepInEx / Unity API',
                inputOutput: { in: 'Unity HeroController instance', out: 'Raw in-memory telemetry buffer' },
            },
            {
                id: 'tactical_radar',
                role: 'STATE VECTORIZER',
                name: '23-Dimensional Tactical Radar Vector',
                type: 'PROCESSING',
                metric: '23 Floats',
                plainDescription: 'Does the AI see enemies with a camera? No. It receives a radar vector: distance to nearest hazards, relative coordinates, and health.',
                technicalDetail: 'Vector: [x, y, vx, vy, is_grounded, can_dash, e_range, e_danger, e_dx, e_dy, e_hp, next_waypoint_dx, next_waypoint_dy, ...].',
                tech: 'Python / NumPy',
                inputOutput: { in: 'Raw memory buffer', out: 'Normalized 23-D observation tensor' },
            },
            {
                id: 'ppo_policy',
                role: 'CORE AI BRAIN',
                name: 'PPO Actor-Critic Policy Network',
                type: 'ENGINE',
                metric: 'Stable-Baselines3',
                plainDescription: 'The neural network that decides whether to jump, run left, dash, or swing the nail based on the current situation.',
                technicalDetail: 'Proximal Policy Optimization (PPO) with clipped surrogate objective L^CLIP(theta), GAE lambda = 0.95, learning rate 3e-4, evaluated over 500,000 environment steps.',
                tech: 'Stable-Baselines3 / PyTorch',
                inputOutput: { in: '23-D state vector', out: 'Discrete action probabilities' },
            },
            {
                id: 'action_executor',
                role: 'HARDWARE CONTROL',
                name: 'Duration-Aware Macro Key Controller',
                type: 'OUTPUT',
                metric: 'PyDirectInput',
                plainDescription: 'Converts AI decisions into genuine Windows keyboard inputs with exact hold durations, because in Hollow Knight, tapping jump gives a tiny hop while holding jump gives a high leap.',
                technicalDetail: 'DirectInput scancode injection with duration-aware threading (0.10s short hop vs 0.32s full jump), overcoming discrete frame-tap limitations.',
                tech: 'PyDirectInput / Win32 API',
                inputOutput: { in: 'Action index (0-7)', out: 'Low-level Windows key press event' },
            },
            {
                id: 'deterministic_reset',
                role: 'SPEEDUP RESET',
                name: 'Zero-Reload Instant Teleportation',
                type: 'STORAGE',
                metric: '< 10ms Reset',
                plainDescription: 'When the AI falls onto spikes or dies, instead of waiting 15 seconds for the game to reload menus, the mod instantly teleports the Knight back to the checkpoint.',
                technicalDetail: 'File trigger signal causes KingsPassRLMod to directly set HeroController.transform.position = Vector3(36.24, 11.41, 0) and restore full HP without reloading scene assets.',
                tech: 'C# Mod IPC',
                inputOutput: { in: 'Death / Fall event', out: 'Instant checkpoint coordinate restore' },
            },
        ],
        dataContracts: `// 23-Dimensional Observation Space:
Observation_Space = Box(low=-inf, high=inf, shape=(23,), dtype=float32)
// Action Space:
Action_Space = Discrete(8) // [NOOP, LEFT, RIGHT, HOP, FULL_JUMP, DASH_RIGHT, DASH_LEFT, ATTACK]`,
        mathFormula: 'L^{CLIP}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\min\\left( r_t(\\theta)\\hat{A}_t, \\; \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_t \\right) \\right]',
        mathExplanation:
            'PPO clips policy updates within [1 - epsilon, 1 + epsilon] to prevent destructive large weight updates when navigating unforgiving platform geometry, stabilized by generalized advantage estimation (GAE).',
        technicalBulletPoints: [
            {
                title: 'Bypassing Computer Vision',
                detail: 'Standard screen capture and CNN processing adds 33–66ms of lag. Reading internal coordinates directly from Unity dropped state extraction latency to under 1.5ms.',
            },
            {
                title: 'Potential-Based Waypoint Reward Shaping',
                detail: 'Implemented a continuous potential field Phi(s) along 42 waypoints in King\'s Pass to prevent the agent from getting stuck in local loops or retreating for easy safety.',
            },
            {
                title: 'Fact-Check: Enemy Sensing',
                detail: 'The agent does not use a computer vision camera. It queries game memory for relative spatial coordinates of nearby Crawlid and Vengefly enemies within a tactical radar radius.',
            },
        ],
        codeSnippet: `// Inside KingsPassRLMod.cs (Unity C# Hook):
public void FixedUpdate() {
    if (HeroController.instance == null) return;
    var hero = HeroController.instance;
    var pos = hero.transform.position;
    var rb = hero.GetComponent<Rigidbody2D>();
    
    // Write telemetry directly to shared JSON/Named Pipe
    var state = new PlayerState {
        x = pos.x, y = pos.y,
        vx = rb.velocity.x, vy = rb.velocity.y,
        grounded = hero.cState.onGround,
        touchingWall = hero.cState.touchingWall,
        canDash = hero.canDash()
    };
    File.WriteAllText(STATE_FILE_PATH, JsonUtility.ToJson(state));
}`,
        postMortem: {
            whatBroke:
                'In initial training runs, the Knight refused to jump high enough to clear the first raised ledge, repeatedly bumping into the rock face and dying on spikes.',
            rootCause:
                'In Hollow Knight, jump height is dictated by key hold duration (a 0.10s tap produces a low hop; holding for 0.32s produces a full high jump). Standard discrete RL triggers tapped the key for 1 frame, which failed physics checks.',
            fixes: [
                {
                    title: 'Duration-Aware Macro Actions',
                    desc: 'Re-engineered the action space to support timed key holds (Tap Jump vs High Jump) executed in dedicated worker threads.',
                },
                {
                    title: 'Potential Waypoint Reward Field',
                    desc: 'Constructed waypoints.json along the cavern route, rewarding forward distance progress rather than raw step survival.',
                },
                {
                    title: 'Instant In-Memory Teleportation',
                    desc: 'Eliminated slow 15-second menu reloading upon death by writing an in-engine coordinate reset hook.',
                },
            ],
        },
        takeaway:
            'I am comfortable starting before I know how. When standard approaches are bloated, writing the low-level harness yourself is always worth it.',
        images: [
            {
                src: '/project-assets/hollow_knight/system_architecture.png',
                caption: 'System Architecture: C# Unity Engine Telemetry Hook ➔ Python Gymnasium Environment',
            },
            {
                src: '/project-assets/hollow_knight/training_results.png',
                caption: 'Training Telemetry: Episode Reward, Waypoint Convergence & Loss Curves',
            },
            {
                src: '/project-assets/hollow_knight/image7.png',
                caption: "In-Game Execution: Autonomous Navigation through King's Pass Caverns",
            },
        ],
    },

    outreach_automation: {
        id: 'outreach_automation',
        chapter: 'CH.02 // INITIATIVE',
        title: 'Two-Stage Conversational Placement Outreach Engine',
        badge: 'ZERO SPAM DROP • HUMAN CONVERSATIONAL PROTOCOL',
        timeline: 'October 2026',
        techStack: ['Python', 'Gmail API', 'OAuth2', 'Batch Queuing', 'Rate Limiting'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'During college placement season, reaching out to startup founders and engineering leads for 6-month internships was taking 4+ hours every day copying, personalizing, attaching resumes, and updating spreadsheets. I wrote a Python script to send them in batches. Within minutes, Gmail flagged my account as a bot, and enterprise corporate spam filters sent cold emails with PDF attachments straight to the junk folder. Instead of giving up, I redesigned the entire approach into a polite, human-first two-stage protocol: send a short, respectful 3-sentence inquiry first with zero attachments. Only when a human replies with interest does the engine automatically follow up with the tailored resume.',
        metrics: [
            { val: '0%', lbl: 'Spam Flag Rate (vs 90% previously)' },
            { val: '6-12s', lbl: 'Randomized Human Jitter Delay' },
            { val: '59', lbl: 'Verified Mailboxes Targeted' },
            { val: '100%', lbl: 'Audit Trail Response Tracking' },
        ],
        architectureStages: [
            {
                id: 'contact_dedupe',
                role: 'INGESTION',
                name: 'Contact Ingestion & Sanitization',
                type: 'INPUT',
                metric: '61 ➔ 59 Mailboxes',
                plainDescription: 'Ingests company and founder directories, cleaning out duplicates and verifying corporate email formatting.',
                technicalDetail: 'Reads contacts.csv, normalizes domains, deduplicates redundant entries, and extracts recipient engineering tech stacks.',
                tech: 'Python / CSV Parser',
                inputOutput: { in: 'contacts.csv', out: 'Sanitized target mailbox records' },
            },
            {
                id: 'conversational_stage1',
                role: 'STAGE 1 QUERY',
                name: 'Lightweight Text-Only Query Dispatch',
                type: 'PROCESSING',
                metric: 'Zero Attachments',
                plainDescription: 'Sends a short, customized note asking if the team has an opening for a builder. No PDF attachments to trigger corporate spam filters.',
                technicalDetail: 'Creates personalized text drafts tailored to the company stack. Dispatches in batches of 15 with 6–12 second randomized jitter delay.',
                tech: 'Gmail API / OAuth2',
                inputOutput: { in: 'Tailored message parameters', out: 'Dispatched initial query message' },
            },
            {
                id: 'thread_watcher',
                role: 'MONITORING',
                name: 'Thread Response Poller & State Machine',
                type: 'ENGINE',
                metric: 'Thread ID Sync',
                plainDescription: 'Monitors the email inbox to see when a founder replies, tracking conversation status without human intervention.',
                technicalDetail: 'sync_status.py queries Gmail thread IDs for new incoming messages from recipients, updating state to SENT, REPLIED, or FAILED.',
                tech: 'Google Workspace REST API',
                inputOutput: { in: 'Active thread IDs', out: 'Updated mailbox state machine' },
            },
            {
                id: 'conversational_stage2',
                role: 'STAGE 2 DELIVERY',
                name: 'Automated Resume Delivery on Reply',
                type: 'OUTPUT',
                metric: 'Targeted PDF Delivery',
                plainDescription: 'When the founder replies asking to see a resume, the system stages the tailored PDF follow-up draft for instant review and dispatch.',
                technicalDetail: 'Generates follow-up email in the same conversation thread, attaching the role-specific ATS LaTeX resume PDF.',
                tech: 'MIME Multitype / Python',
                inputOutput: { in: 'Inbound positive reply', out: 'Follow-up draft with tailored PDF attached' },
            },
        ],
        dataContracts: `// State Machine:
PENDING_STAGE1 ➔ DISPATCHED_STAGE1 ➔ [WAITING_REPLY] ➔ INBOUND_RESPONSE_DETECTED ➔ STAGE2_RESUME_DISPATCHED`,
        mathFormula: 'T_{\\text{dispatch}} = T_{\\text{base}} + \\text{Uniform}(6.0, \\; 12.0) \\times \\text{BatchMultiplier}',
        mathExplanation:
            'Randomized exponential and uniform timing intervals evade heuristic bot detection engines on Gmail and corporate mail gateways like Proofpoint and Mimecast.',
        technicalBulletPoints: [
            {
                title: 'The Anti-Spam Breakthrough',
                detail: 'Cold emails with attachments have a 70%+ spam capture rate. Sending a genuine text-only inquiry first establishes domain trust and DKIM/SPF credibility.',
            },
            {
                title: 'Automated Thread Continuity',
                detail: 'Maintains Gmail Message-ID and In-Reply-To headers so follow-up resumes stay neatly inside the same conversation thread.',
            },
        ],
        codeSnippet: `def create_lightweight_query(service, to_email, founder_name, tech_stack):
    # Stage 1: Zero attachments to survive spam filters
    subject = f"Question regarding {tech_stack} engineering at your team"
    body = f"Hi {founder_name},\\n\\nI've been following your engineering work on {tech_stack}. I'm a hands-on systems & ML builder looking for a 6-month co-op internship.\\n\\nWould you be open to seeing a tailored resume if there is an opening?\\n\\nBest,\\nAakarshak"
    return stage_draft_with_jitter(service, to_email, subject, body)`,
        postMortem: {
            whatBroke:
                'I initially ran a script that fired 50 emails with PDF resumes attached in 3 minutes. Google flagged the account for automated behavior, and corporate firewalls dropped every email into spam.',
            rootCause:
                'Cold outreach with PDF attachments triggers high-confidence heuristic spam scores on modern corporate mail filters (Proofpoint/Mimecast), and zero-delay batching triggers Gmail rate limits.',
            fixes: [
                {
                    title: 'Two-Stage Conversational Protocol',
                    desc: 'Removed attachments from initial outreach entirely; only deliver PDF after recipient replies.',
                },
                {
                    title: 'Randomized Human Jitter',
                    desc: 'Added 6 to 12 seconds of random pause between dispatches to replicate authentic human typing and sending.',
                },
            ],
        },
        takeaway:
            'A tool that works on localhost is not enough. Software has to survive real-world spam filters, rate limits, and human psychology.',
        images: [],
    },

    qcecuring_pki: {
        id: 'qcecuring_pki',
        chapter: 'CH.04 // REAL WORLD PRODUCTION',
        title: 'Enterprise Code-Signing Certificate Manager (Qcecuring)',
        badge: 'PRODUCTION ENTERPRISE PKI • 60% LATENCY CUT',
        timeline: 'October 2025 – December 2025',
        techStack: ['Spring Boot 3.5', 'Java 21', 'MongoDB', 'Angular 20', 'Angular Material', 'SHA-256 / RSA'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa/Code-Signing-Certificate-Manager',
        humaneStory:
            'When software companies release an app or update, their code must be stamped with a cryptographic digital wax seal (code-signing) so operating systems and users know it came from the authentic company and has not been infected with malware. At Qcecuring, the old approval process was slow and cumbersome—developers waited hours or even days for a single code signature. I built an enterprise portal where two authorized leads can review release checksums and sign off digitally via a multi-approver quorum workflow, cutting signing turnaround by 60% while ensuring the company master private keys are never exposed.',
        metrics: [
            { val: '60%', lbl: 'Turnaround Latency Cut' },
            { val: '100%', lbl: 'Audit Trail Compliance' },
            { val: '2-Key', lbl: 'Quorum Multi-Signatory Policy' },
            { val: 'SHA-256', lbl: 'Binary Integrity Verification' },
        ],
        architectureStages: [
            {
                id: 'angular_portal',
                role: 'FRONTEND UI',
                name: 'Certificate Lifecycle & Signing Portal',
                type: 'INPUT',
                metric: 'Angular 20',
                plainDescription: 'Modern dashboard for developers to submit binary artifacts for signing, inspect certificate validity, and monitor pending releases.',
                technicalDetail: 'Angular 20 standalone architecture with Angular Material, reactive forms, real-time status badges, and artifact upload pipelines.',
                tech: 'Angular 20 / TypeScript',
                inputOutput: { in: 'Developer release artifact / CSR', out: 'Signing request ticket' },
            },
            {
                id: 'quorum_gateway',
                role: 'GOVERNANCE GATE',
                name: 'Multi-Approver Quorum Authorization Gateway',
                type: 'SECURITY',
                metric: '2-of-N Approval',
                plainDescription: 'Prevents any single rogue user or stolen account from signing malicious software by requiring digital approvals from two separate leads.',
                technicalDetail: 'Enforces strict M-of-N quorum consensus: release signing tickets remain locked until required distinct cryptographic approvals are registered.',
                tech: 'Spring Security / Java 21',
                inputOutput: { in: 'Pending release ticket', out: 'Quorum authorized cryptographic token' },
            },
            {
                id: 'pki_core',
                role: 'CRYPTOGRAPHIC CORE',
                name: 'PKI Certificate Authority & Signer Service',
                type: 'ENGINE',
                metric: 'RSA-4096 / SHA-256',
                plainDescription: 'Computes cryptographic hashes of the software binaries and applies the digital signature using secure X.509 certificates.',
                technicalDetail: 'X.509 certificate generation, automated checksum verification, and RSA-4096 / ECDSA binary signing executed in isolated HSM-compatible services.',
                tech: 'Java Security / Bouncy Castle',
                inputOutput: { in: 'Validated binary checksum', out: 'Cryptographically signed binary artifact' },
            },
            {
                id: 'audit_vault',
                role: 'IMMUTABLE AUDIT',
                name: 'Tamper-Proof Audit Logging Vault',
                type: 'STORAGE',
                metric: 'MongoDB',
                plainDescription: 'Records every single signing request, approver identity, timestamp, and binary hash in an immutable audit database for security compliance.',
                technicalDetail: 'MongoDB collection storing immutable signing ledgers with cryptographic digest chaining to guarantee zero retroactive tampering.',
                tech: 'MongoDB / Spring Data',
                inputOutput: { in: 'Signed transaction record', out: 'Permanent audit ledger log entry' },
            },
        ],
        dataContracts: `// Signing Request Data Contract:
{
  "requestId": "REQ-2025-9982",
  "artifactName": "firmware-update-v2.bin",
  "sha256Checksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "certificateId": "CERT-CORP-ROOT-01",
  "quorumStatus": "APPROVED_2_OF_2",
  "approvers": ["lead.sec@qcecuring.com", "director.eng@qcecuring.com"],
  "signatureStatus": "COMPLETED"
}`,
        mathFormula: '\\text{Signature} = \\text{Sign}_{K_{\\text{private}}}(\\text{SHA-256}(\\text{Binary})) \\quad \\text{subject to} \\quad \\sum_{i=1}^N A_i \\ge Q',
        mathExplanation:
            'Binary integrity is verified via SHA-256 before signature generation, while the quorum threshold condition ensures no signing operation executes without meeting quorum Q.',
        technicalBulletPoints: [
            {
                title: 'Turnaround Latency Cut by 60%',
                detail: 'Replaced manual developer ticket pinging with an automated workflow that notified approvers and executed binary signing immediately upon the second approval.',
            },
            {
                title: 'Tamper-Proof Ledger',
                detail: 'Every certificate generation, revocation, and binary signing operation is preserved in immutable audit logs with verified timestamps and user fingerprints.',
            },
        ],
        codeSnippet: `// Spring Boot Quorum Evaluation Service:
@Transactional
public SigningResponse approveAndSign(String requestId, String approverId) {
    SigningRequest request = requestRepository.findById(requestId)
        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
    request.addApproval(approverId);
    
    if (request.getApprovals().size() >= QUORUM_THRESHOLD) {
        byte[] binaryHash = cryptoService.computeSha256(request.getArtifact());
        byte[] digitalSignature = pkiService.signWithCertificate(request.getCertificateId(), binaryHash);
        auditLogger.recordSigningEvent(request, approverId, digitalSignature);
        return new SigningResponse(SigningStatus.COMPLETED, digitalSignature);
    }
    return new SigningResponse(SigningStatus.AWAITING_FURTHER_APPROVAL, null);
}`,
        postMortem: {
            whatBroke:
                'During peak release cycles, approvers experienced database locking issues when multiple concurrent signing tickets were being verified simultaneously.',
            rootCause:
                'Pessimistic transaction locks on the certificate entity blocked read requests across all pending artifacts awaiting verification.',
            fixes: [
                {
                    title: 'Optimistic Locking with Versioning',
                    desc: 'Migrated MongoDB documents to optimistic locking with @Version attributes, eliminating pipeline deadlocks.',
                },
                {
                    title: 'Asynchronous Event Bus',
                    desc: 'Decoupled cryptographic signing execution from HTTP request threads using Spring Async worker queues.',
                },
            ],
        },
        takeaway:
            'Security infrastructure is only successful when it makes safe behavior faster than cutting corners.',
        images: [
            {
                src: '/project-assets/code_signing/dashboard_overview.png',
                caption: 'Enterprise Certificate Management Dashboard — Active Certificates & Expiry Timeline',
            },
            {
                src: '/project-assets/code_signing/audit_logs_table.png',
                caption: 'Immutable Audit Logs Table — Real-time Verification & Quorum Approver Sign-offs',
            },
            {
                src: '/project-assets/code_signing/signing_request_detail.png',
                caption: 'Artifact Signing Request Detail — Binary Checksum & Certificate Association',
            },
            {
                src: '/project-assets/code_signing/quorum_approval_workflow.png',
                caption: 'Multi-Signatory Quorum Approval Workflow Interface',
            },
        ],
    },

    taslasoft_reddit: {
        id: 'taslasoft_reddit',
        chapter: 'CH.04 // REAL WORLD PRODUCTION',
        title: 'Social Intelligence & Brand Risk Pipeline (Taslasoft)',
        badge: '10,000+ POSTS/DAY • 95% PRECISION • AES-256-GCM',
        timeline: 'March 2026 – September 2026',
        techStack: ['Python', 'PRAW', 'SQLAlchemy', 'SQLite (WAL)', 'AES-256-GCM', 'VADER', 'Regex PII'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'During my internship at Taslasoft, we built a real-time listening system for civic safety and brand awareness monitoring across public forums like Reddit. When thousands of people post online every day about traffic accidents, civic corruption, or infrastructure breakdowns, officials need to know immediately without invading citizens\' privacy. I built a 3-tier privacy and intelligence pipeline: it scans 10,000+ public posts a day, instantly strips out personal details like phone numbers and 12-digit Aadhaar IDs, encrypts the text with bank-grade AES-256 cryptography, and flags critical civic emergencies in under a second with 95% accuracy.',
        metrics: [
            { val: '10,000+', lbl: 'Daily Posts Analyzed' },
            { val: '< 1s', lbl: 'Classification Latency' },
            { val: '95%', lbl: 'Critical Incident Precision' },
            { val: '100%', lbl: 'Automated PII Stripping' },
        ],
        architectureStages: [
            {
                id: 'praw_harvester',
                role: 'CRAWLER',
                name: 'Real-Time Reddit Crawler & Ingestion',
                type: 'INPUT',
                metric: '6 Topic Clusters',
                plainDescription: 'Streams live discussions and posts across regional subreddits covering traffic, law & order, and infrastructure.',
                technicalDetail: 'PRAW (Python Reddit API Wrapper) crawler querying streaming endpoints with OAuth2 token rotation across target subreddits.',
                tech: 'PRAW / Python',
                inputOutput: { in: 'Subreddit post streams', out: 'Raw post JSON payloads' },
            },
            {
                id: 'seen_dedupe',
                role: 'DEDUPLICATION',
                name: 'In-Memory Deduplication & Filter',
                type: 'PROCESSING',
                metric: 'O(1) Hash Set',
                plainDescription: 'Discards repeat posts and spam immediately so system resources are only spent on fresh events.',
                technicalDetail: 'In-memory LRU seen-set cache checking post IDs and title hashes to drop duplicate submissions in sub-millisecond time.',
                tech: 'Python Collections',
                inputOutput: { in: 'Raw post JSON', out: 'Unique post objects' },
            },
            {
                id: 'classifier_vader',
                role: 'CLASSIFIER',
                name: 'Multi-Label Topic & Sentiment Classifier',
                type: 'ENGINE',
                metric: 'VADER Sentiment',
                plainDescription: 'Categorizes posts into urgency buckets (e.g., Road Hazard, Law & Order, Water Supply) and scores community distress.',
                technicalDetail: 'Cascaded classification: fast keyword triage followed by VADER sentiment analysis for compound emotional distress scoring.',
                tech: 'VADER / Custom Lexicon',
                inputOutput: { in: 'Cleaned post text', out: 'Category tags & severity score' },
            },
            {
                id: 'privacy_engine',
                role: 'PRIVACY LAYER',
                name: '3-Tier Privacy Engineering Layer',
                type: 'SECURITY',
                metric: 'AES-256-GCM',
                plainDescription: 'Scans for Indian phone numbers, emails, and Aadhaar numbers, strips them out, and encrypts stored text with AES-256.',
                technicalDetail: 'Layer 1: Regex PII scrubber. Layer 2: SHA-256 username pseudonymization. Layer 3: AES-256-GCM authenticated encryption at rest.',
                tech: 'Python Cryptography / Regex',
                inputOutput: { in: 'Unsanitized post text', out: 'Redacted, encrypted ciphertext payload' },
            },
            {
                id: 'wal_database',
                role: 'STORAGE',
                name: 'Dual-Table SQLite Storage (WAL Mode)',
                type: 'STORAGE',
                metric: '7-Day TTL Policy',
                plainDescription: 'Stores raw encrypted posts with an automatic 7-day deletion policy, while preserving aggregated statistical trends indefinitely.',
                technicalDetail: 'Dual tables: reddit_raw (encrypted text with 7-day TTL cleanup) and analytics_agg (anonymized daily metric averages) in SQLite WAL mode.',
                tech: 'SQLite WAL / SQLAlchemy',
                inputOutput: { in: 'Encrypted payload & metrics', out: 'Structured analytics database' },
            },
        ],
        dataContracts: `// Dual Storage Schema:
reddit_raw = {
    id: String (Primary Key),
    ciphertext: BLOB (AES-256-GCM),
    nonce: BLOB (12 bytes),
    auth_tag: BLOB (16 bytes),
    expires_at: Timestamp (Now + 7 Days)
}
analytics_agg = {
    date: Date,
    topic: Enum [TRAFFIC, CRIME, CORRUPTION, WATER],
    daily_volume: Int,
    avg_sentiment: Float32
}`,
        mathFormula: 'C = \\text{AES-256-GCM}_{K}(\\text{ScrubbedText}, \\; \\text{Nonce}) \\quad \\text{with} \\quad \\text{TTL} = 7 \\text{ Days}',
        mathExplanation:
            'Authenticated AES-256-GCM guarantees both confidentiality and integrity of citizen submissions, while strict TTL ensures compliance with data protection standards.',
        technicalBulletPoints: [
            {
                title: '95% Precision Across Critical Events',
                detail: 'Tuned cascaded filters to prevent false emergency alerts from flooding monitoring dashboards.',
            },
            {
                title: 'Zero Leakage of Citizen Identity',
                detail: 'All citizen usernames are one-way hashed with SHA-256 salts, and Indian mobile numbers and Aadhaar sequences are redacted before database writes.',
            },
        ],
        codeSnippet: `def scrub_and_encrypt(raw_text, author_username, secret_key):
    # Step 1: Scrub Indian Phone Numbers and Aadhaar
    clean_text = re.sub(r'(\\+91[\\-\\s]?)?[6-9]\\d{9}', '[REDACTED_PHONE]', raw_text)
    clean_text = re.sub(r'\\b\\d{4}\\s?\\d{4}\\s?\\d{4}\\b', '[REDACTED_AADHAAR]', clean_text)
    
    # Step 2: Pseudonymize Author
    masked_user = hashlib.sha256((author_username + SALT).encode()).hexdigest()[:16]
    
    # Step 3: AES-256-GCM Authenticated Encryption
    aesgcm = AESGCM(secret_key)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, clean_text.encode(), None)
    return ciphertext, nonce, masked_user`,
        postMortem: {
            whatBroke:
                'During a high-traffic local election cycle, the pipeline experienced severe SQLite write-lock contention, causing crawler backpressure.',
            rootCause:
                'Default SQLite journal mode locks the entire file during write operations, causing concurrent crawler threads to time out.',
            fixes: [
                {
                    title: 'Enabled SQLite Write-Ahead Logging (WAL)',
                    desc: 'PRAGMA journal_mode=WAL; allowed concurrent readers to query analytics without blocking crawler writes.',
                },
                {
                    title: 'Batch Write Transactions',
                    desc: 'Aggregated incoming posts into batches of 50 before flushing to disk, cutting I/O operations by 80%.',
                },
            ],
        },
        takeaway:
            'Public data intelligence is worthless if it violates the privacy of the people it is designed to protect.',
        images: [],
    },

    tslate: {
        id: 'tslate',
        chapter: 'CH.05 // WHAT I CARE ABOUT',
        title: 'TSlate — Offline Voice-to-Voice Translator for My Mom',
        badge: '100% OFFLINE • INT4 ONNX • ZERO CLOUD LAG',
        timeline: 'December 2026',
        techStack: ['Python', 'ONNX Runtime', 'Silero VAD', 'Whisper STT (INT4)', 'Piper TTS', 'Android NDK'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'My mother is a North Indian housewife from Bihar who speaks only Hindi. When she visited and stayed with me in the South, she faced daily friction doing simple everyday things: talking to local vegetable vendors, kirana shopkeepers, domestic helpers, and auto drivers who speak Kannada. Watching her feel hesitant, struggle with hand gestures, or have to wait for me just to buy groceries broke my heart. I realized language barriers should never strip away independence. I built TSlate: an app for her phone with a single giant tap button that runs 100% offline. She speaks Hindi naturally, and the phone instantly speaks out loud in clear Kannada to the shopkeeper. No confusing menus, no network lag, and zero internet required.',
        metrics: [
            { val: '100%', lbl: 'Offline (Zero Cloud Dependency)' },
            { val: '< 650ms', lbl: 'Voice-to-Voice Pipeline Latency' },
            { val: 'INT4', lbl: 'Quantized Small Language Model' },
            { val: '0', lbl: 'Tech Anxiety for Mom' },
        ],
        architectureStages: [
            {
                id: 'vad_capture',
                role: 'AUDIO CAPTURE',
                name: 'Silero Voice Activity Detection (VAD)',
                type: 'INPUT',
                metric: 'Ring Buffer',
                plainDescription: 'Listens for when my mom starts and stops speaking so she does not have to fiddle with complex buttons.',
                technicalDetail: 'ONNX-optimized Silero VAD evaluating 30ms PCM audio frames; segments speech with 500ms trailing silence cutoff.',
                tech: 'Silero VAD / AudioRecord',
                inputOutput: { in: 'Raw microphone PCM audio', out: 'Voiced audio chunk tensor' },
            },
            {
                id: 'whisper_stt',
                role: 'SPEECH TO TEXT',
                name: 'Quantized Whisper Hindi STT Engine',
                type: 'PROCESSING',
                metric: 'INT4 Quantized',
                plainDescription: 'Converts her spoken Hindi voice into text directly on the phone processor without sending audio to Google or cloud servers.',
                technicalDetail: 'Whisper-tiny fine-tuned on Hindi conversational speech, quantized to INT4 via ONNX Runtime Mobile, running in under 200ms.',
                tech: 'ONNX Runtime / Whisper',
                inputOutput: { in: 'PCM audio tensor', out: 'Hindi text string' },
            },
            {
                id: 'translation_slm',
                role: 'TRANSLATION CORE',
                name: 'On-Device Hindi ➔ Kannada Neural Translator',
                type: 'ENGINE',
                metric: 'Direct Dialect Mapping',
                plainDescription: 'Translates conversational Hindi into everyday colloquial Kannada as spoken in local South Indian markets.',
                technicalDetail: 'Compact bilingual sequence-to-sequence model optimized with weight sharing and INT8 GEMM kernels for ARM Neon architecture.',
                tech: 'Hugging Face / ONNX',
                inputOutput: { in: 'Hindi text prompt', out: 'Kannada translation text' },
            },
            {
                id: 'piper_tts',
                role: 'AUDIO SPEECH OUT',
                name: 'Piper Neural Voice Synthesizer',
                type: 'OUTPUT',
                metric: 'Kannada Audio Out',
                plainDescription: 'Speaks the translation out loud in a clear, natural Kannada voice through the phone speaker to the shopkeeper.',
                technicalDetail: 'Piper fast neural TTS synthesizing 16kHz audio waveform using VITS architecture with sub-100ms latency on mobile CPUs.',
                tech: 'Piper TTS / OpenSL ES',
                inputOutput: { in: 'Kannada text string', out: '16kHz Audio waveform out' },
            },
        ],
        dataContracts: `// Voice Pipeline Latency Breakdown:
VAD Segment Detection: ~50ms
Whisper Hindi STT (INT4): ~220ms
Seq2Seq Hindi->Kannada: ~180ms
Piper Neural TTS Waveform: ~140ms
Total End-to-End Latency: ~590ms (< 650ms Target)`,
        mathFormula: '\\text{Latency}_{\\text{E2E}} = T_{\\text{VAD}} + T_{\\text{Whisper[INT4]}} + T_{\\text{NMT}} + T_{\\text{PiperTTS}} < 650\\text{ms}',
        mathExplanation:
            'By quantizing models to INT4 and INT8, memory bandwidth bottlenecks on mobile SoCs are eliminated, allowing real-time speech translation without cloud servers.',
        technicalBulletPoints: [
            {
                title: 'Zero Cloud Dependency',
                detail: 'Designed specifically for underground markets, remote highway vegetable stalls, and kirana stores where mobile data signal is spotty or nonexistent.',
            },
            {
                title: 'Conversational Dialect Grounding',
                detail: 'Tuned specifically on market vocabulary (vegetable names, kilo weights, prices, change requests) rather than literary grammar.',
            },
        ],
        codeSnippet: `// On-Device Pipeline Execution:
async function translateMomVoice(audioBuffer) {
    const isSpeech = await sileroVad.detect(audioBuffer);
    if (!isSpeech) return;
    
    // Step 1: Hindi STT on mobile CPU
    const hindiText = await whisperOnnx.transcribe(audioBuffer);
    
    // Step 2: Bilingual Translation
    const kannadaText = await nmtOnnx.translate(hindiText, { from: 'hi', to: 'kn' });
    
    // Step 3: Speak out loud to shopkeeper
    await piperTts.speak(kannadaText, { voice: 'kn_IN-market' });
}`,
        postMortem: {
            whatBroke:
                'First prototype drained the phone battery rapidly and lagged by 3 seconds per sentence on a budget Android phone.',
            rootCause:
                'Unquantized FP32 models were causing severe CPU throttling and memory thrashing on low-end mobile RAM.',
            fixes: [
                {
                    title: 'INT4 & INT8 Model Quantization',
                    desc: 'Quantized weights with ONNX Runtime Mobile, reducing model footprint from 450MB down to 85MB.',
                },
                {
                    title: 'VAD Gating',
                    desc: 'Idle audio listening uses ultra-lightweight VAD, keeping the heavy neural translator asleep until active speech is detected.',
                },
            ],
        },
        takeaway:
            'Technology is not impressive because of benchmark numbers. It is impressive when it lets my mom walk to the neighborhood store and chat with the shopkeeper with confidence.',
        images: [],
    },

    dromos_hyperloop: {
        id: 'dromos_hyperloop',
        chapter: 'CH.06 // LAB & PHYSICAL SYSTEMS',
        title: 'Team Dromos Hyperloop — Levitation & Web Architecture',
        badge: '2nd PLACE GLOBAL HYPERLOOP COMP. (GHC)',
        timeline: 'January 2025 – August 2025',
        techStack: ['C/C++', 'React 18', 'TypeScript', 'CAN Bus', 'Moving-Window Filter', 'Three.js'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        liveUrl: 'https://team-dromos-website.vercel.app/',
        humaneStory:
            'Hyperloop is the vision of pods traveling at near-airplane speeds inside sealed low-pressure vacuum tubes, floating millimeters above the track without friction. At Team Dromos, we designed and manufactured an authentic prototype pod and took it to the Global Hyperloop Competition (GHC). As Levitation Engineer and Web Architect, I owned the levitation sensor telemetry and the team\'s public digital experience. Two hours before our critical track test, unexpected electrical noise from the high-power motors caused our levitation sensors to jitter wildly. I coded an in-memory moving-window low-pass filter directly on the sensor bus to cancel the noise, stabilizing the pod and helping our team secure 2nd Place internationally on the global podium.',
        metrics: [
            { val: '2nd Place', lbl: 'Global Hyperloop Competition (GHC)' },
            { val: '100Hz', lbl: 'Levitation Sensor Sample Rate' },
            { val: '2h Fix', lbl: 'Emergency In-Memory Filter Fix' },
            { val: '60 FPS', lbl: 'Official Telemetry Web Dashboard' },
        ],
        architectureStages: [
            {
                id: 'sensor_bus',
                role: 'HARDWARE SENSORS',
                name: 'Gap & Hall Effect Sensor Ingestion',
                type: 'INPUT',
                metric: '100Hz Telemetry',
                plainDescription: 'Laser distance sensors and Hall-effect sensors reading the exact gap distance between the pod magnets and the aluminum track.',
                technicalDetail: 'Raw analog voltage converted via 12-bit ADC over SPI bus; samples gap distance in millimeters at 100 samples per second.',
                tech: 'Embedded C / SPI',
                inputOutput: { in: 'Analog sensor voltages', out: 'Raw distance telemetry frames' },
            },
            {
                id: 'filter_stage',
                role: 'SIGNAL PROCESSING',
                name: 'Moving-Window Low-Pass Filter',
                type: 'PROCESSING',
                metric: 'Noise Rejection',
                plainDescription: 'The emergency filter written 2 hours before the track run to remove electrical noise caused by high-power motors.',
                technicalDetail: 'In-memory ring buffer implementing a moving-average finite impulse response (FIR) low-pass filter, suppressing high-frequency EMI spikes.',
                tech: 'C/C++ Ring Buffer',
                inputOutput: { in: 'Noisy sensor distance stream', out: 'Smooth calibrated levitation gap' },
            },
            {
                id: 'levitation_ctrl',
                role: 'CONTROL CORE',
                name: 'Levitation Subsystem Controller',
                type: 'ENGINE',
                metric: 'PID Feedback Loop',
                plainDescription: 'Dynamically adjusts magnet currents to hold the pod in steady magnetic levitation millimeters above the guide track.',
                technicalDetail: 'Closed-loop PID controller calculating PWM duty cycle commands to maintain target 12mm levitation clearance.',
                tech: 'PID Controller / PWM',
                inputOutput: { in: 'Filtered gap measurement', out: 'PWM magnet coil current' },
            },
            {
                id: 'telemetry_web',
                role: 'PRESENTATION',
                name: 'Official Team Web & Telemetry Experience',
                type: 'OUTPUT',
                metric: 'React 18 / Three.js',
                plainDescription: 'Architected the official Team Dromos web experience showcasing 3D pod models, specifications, and telemetry visualization.',
                technicalDetail: 'High-performance React 18, Vite, TypeScript, GSAP kinetic animations, and 60 FPS Three.js rendering.',
                tech: 'React / Three.js / GSAP',
                inputOutput: { in: 'Pod specifications & CAD assets', out: 'Interactive 3D web experience' },
            },
        ],
        dataContracts: `// Sensor Filter Buffer:
float gap_window[WINDOW_SIZE = 8];
uint8_t head = 0;
float apply_filter(float raw_gap) {
    gap_window[head] = raw_gap;
    head = (head + 1) % WINDOW_SIZE;
    float sum = 0.0f;
    for(int i = 0; i < WINDOW_SIZE; i++) sum += gap_window[i];
    return sum / WINDOW_SIZE;
}`,
        mathFormula: 'y[n] = \\frac{1}{M} \\sum_{k=0}^{M-1} x[n-k] \\quad \\text{with} \\quad M = 8 \\; \\text{samples at } 100\\text{Hz}',
        mathExplanation:
            'The 8-sample moving window acts as a digital low-pass filter, attenuating electromagnetic interference (EMI) harmonics generated by motor switching.',
        technicalBulletPoints: [
            {
                title: 'Podium Finish at GHC',
                detail: 'Team Dromos clinched 2nd Place internationally at the Global Hyperloop Competition, competing against university teams worldwide.',
            },
            {
                title: 'High-Stakes On-Track Debugging',
                detail: 'Diagnosed sensor instability under track conditions and deployed the in-memory FIR filter firmware flash two hours prior to the official track test.',
            },
        ],
        codeSnippet: `// Embedded Sensor Filter (Emergency Deploy):
#define FILTER_WINDOW 8
static float readings[FILTER_WINDOW] = {0};
static int read_idx = 0;

float update_levitation_gap(float raw_analog_gap) {
    readings[read_idx] = raw_analog_gap;
    read_idx = (read_idx + 1) % FILTER_WINDOW;
    
    float total = 0.0f;
    for (int i = 0; i < FILTER_WINDOW; i++) {
        total += readings[i];
    }
    return total / (float)FILTER_WINDOW;
}`,
        postMortem: {
            whatBroke:
                'During pre-run track tests, the levitation distance sensor reported erratic swings between 4mm and 28mm while the pod was sitting completely stationary.',
            rootCause:
                'Electromagnetic interference (EMI) radiated from the high-voltage inverter switching coils was coupling into unshielded sensor signal wires.',
            fixes: [
                {
                    title: 'In-Memory Moving-Window FIR Filter',
                    desc: 'Coded and flashed a ring-buffer low-pass filter directly to firmware, attenuating high-frequency noise spikes.',
                },
                {
                    title: 'Ferrite Choke & Signal Isolation',
                    desc: 'Physically routed sensor lines through ferrite cores to damp radiated motor EMI before track launch.',
                },
            ],
        },
        takeaway:
            'Hardware and software cannot be isolated. When physical noise threatens a system, the fastest fix is often written in software.',
        images: [
            {
                src: '/project-assets/dromos_hyperloop/ghc_2025_podium.jpeg',
                caption: 'Official Podium Ceremony — Team Dromos Securing 2nd Place at Global Hyperloop Competition',
            },
            {
                src: '/project-assets/dromos_hyperloop/ghc_2025_track_pod.jpeg',
                caption: 'Team Dromos Functional Hyperloop Pod on Test Track',
            },
            {
                src: '/project-assets/dromos_hyperloop/ghc_2025_team_photo.jpeg',
                caption: 'Team Dromos Engineering Crew at Competition Track Venue',
            },
            {
                src: '/project-assets/dromos_hyperloop/ghc_2025_telemetry.png',
                caption: 'Levitation Gap & Motor Current Telemetry Readouts',
            },
            {
                src: '/project-assets/dromos_hyperloop/dromos_website_preview.png',
                caption: 'Official Team Dromos Web Architecture (React 18 + Three.js)',
            },
        ],
    },

    bullseye_xai: {
        id: 'bullseye_xai',
        chapter: 'CH.06 // LAB & COMPUTER VISION',
        title: 'BullsEye with BreedTrace-XAI — Livestock Computer Vision',
        badge: 'EXPLAINABLE AI • MONOTONIC DELETION VERIFICATION',
        timeline: 'May 2025 – August 2025',
        techStack: ['PyTorch', 'TensorFlow', 'YOLOv8', 'VGG16', 'Grad-CAM', 'OpenCV', 'Flask'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'Veterinarians and rural dairy farmers need quick, reliable identification of cattle breeds for disease tracking and milk yield monitoring. But when standard artificial intelligence classifies a cow, veterinarians hesitate to trust it because deep neural networks are "black boxes"—nobody knows if the AI is looking at the cow\'s actual physical anatomy or just guessing based on the grass in the background. We built BullsEye: it detects cattle with YOLOv8, classifies breeds with VGG16, and uses Explainable AI (Grad-CAM heatmaps) to highlight the exact visual features (horn curvature, muzzle, hump) that drove the decision, giving vets transparent, verified predictions.',
        metrics: [
            { val: 'YOLOv8', lbl: 'Real-time Object Detection' },
            { val: 'Grad-CAM', lbl: 'Visual Explainability Heatmaps' },
            { val: 'Monotonic', lbl: 'Deletion Verification Curve' },
            { val: '< 80ms', lbl: 'Frame Inference Latency' },
        ],
        architectureStages: [
            {
                id: 'video_feed',
                role: 'VIDEO INGESTION',
                name: 'Live RTSP / Video Stream Capture',
                type: 'INPUT',
                metric: 'OpenCV Stream',
                plainDescription: 'Captures camera frames of cattle in livestock barns and rural farms under variable lighting.',
                technicalDetail: 'OpenCV video stream decoding frame-by-frame with dynamic contrast normalization and histogram equalization.',
                tech: 'OpenCV / Python',
                inputOutput: { in: 'RTSP video stream', out: 'Normalized RGB frame tensor' },
            },
            {
                id: 'yolo_detector',
                role: 'OBJECT DETECTION',
                name: 'YOLOv8 Bounding Box Localization',
                type: 'PROCESSING',
                metric: 'mAP@50 0.91',
                plainDescription: 'Pinpoints the exact location of cows in the camera frame, cutting out distracting background fences and trees.',
                technicalDetail: 'YOLOv8n bounding box detector fine-tuned on cattle morphology, cropping animals with 10% bounding margin.',
                tech: 'Ultralytics YOLOv8',
                inputOutput: { in: 'Full camera frame', out: 'Cropped animal bounding box' },
            },
            {
                id: 'breed_classifier',
                role: 'CLASSIFICATION',
                name: 'VGG16 Transfer Learning Classifier',
                type: 'ENGINE',
                metric: 'Indigenous Breeds',
                plainDescription: 'Identifies the specific breed (Gir, Sahiwal, Red Sindhi, Holstein) from the cropped image.',
                technicalDetail: 'Fine-tuned VGG16 with custom dense classification head trained with categorical cross-entropy and cosine annealing.',
                tech: 'PyTorch / Transfer Learning',
                inputOutput: { in: 'Cropped cattle image', out: 'Breed class probabilities' },
            },
            {
                id: 'gradcam_xai',
                role: 'EXPLAINABILITY',
                name: 'Grad-CAM & Integrated Gradients Heatmap',
                type: 'OUTPUT',
                metric: 'Faithful Heatmaps',
                plainDescription: 'Generates a glowing color heatmap over the image showing veterinarians exactly which anatomical features the AI inspected.',
                technicalDetail: 'Computes gradients of the target class score with respect to the final convolutional feature map, projecting saliency over input pixels.',
                tech: 'PyTorch Autograd / Grad-CAM',
                inputOutput: { in: 'Feature map gradients & image', out: 'Superimposed Grad-CAM saliency map' },
            },
        ],
        dataContracts: `// Grad-CAM Formulation:
L^c_{Grad-CAM} = ReLU( sum_k alpha_k^c * A^k )
alpha_k^c = (1 / Z) * sum_i sum_j ( d y^c / d A^k_{i,j} )`,
        mathFormula: 'L^c_{\\text{Grad-CAM}} = \\text{ReLU}\\left( \\sum_k \\alpha_k^c A^k \\right) \\quad \\text{where} \\quad \\alpha_k^c = \\frac{1}{Z} \\sum_i \\sum_j \\frac{\\partial y^c}{\\partial A^k_{i,j}}',
        mathExplanation:
            'Gradients of the class score y^c with respect to feature map activations A^k weight importance, and ReLU filters out features contributing negatively to the target breed.',
        technicalBulletPoints: [
            {
                title: 'Monotonic Deletion Curve Verification',
                detail: 'Verified explainability faithfulness by systematically deleting the highest-attribution pixels and confirming that the model prediction score dropped monotonically.',
            },
            {
                title: 'Background Sensitivity Check',
                detail: 'Ensured the model did not suffer from background shortcut learning (e.g. associating green pastures with Holsteins).',
            },
        ],
        codeSnippet: `def generate_gradcam(model, image_tensor, target_class):
    # Register forward and backward hooks on target conv layer
    features = []
    grads = []
    
    def forward_hook(module, input, output): features.append(output)
    def backward_hook(module, grad_in, grad_out): grads.append(grad_out[0])
    
    target_layer = model.features[-1]
    h1 = target_layer.register_forward_hook(forward_hook)
    h2 = target_layer.register_backward_hook(backward_hook)
    
    output = model(image_tensor)
    loss = output[0, target_class]
    loss.backward()
    
    weights = torch.mean(grads[0], dim=(2, 3), keepdim=True)
    cam = torch.sum(weights * features[0], dim=1).squeeze()
    cam = torch.relu(cam)
    return cam.detach().cpu().numpy()`,
        postMortem: {
            whatBroke:
                'Early model iterations classified Holstein cattle with 98% accuracy in test sets, but failed when tested on local farms.',
            rootCause:
                'Background shortcut bias: the dataset photos of Holsteins were all taken in green grass pastures, while Indian breeds were in dry dirt paddocks. The model was classifying the grass, not the cow!',
            fixes: [
                {
                    title: 'YOLOv8 Bounding Box Tighter Crop',
                    desc: 'Isolated the cow body and cropped out 90% of surrounding background scenery.',
                },
                {
                    title: 'Monotonic Pixel Deletion Evaluation',
                    desc: 'Implemented Fig 1 & Fig 2 deletion benchmarks to mathematically prove the model relies on anatomical features.',
                },
            ],
        },
        takeaway:
            'If you cannot explain why your model made a prediction, you do not have a solution—you have a gamble.',
        images: [
            {
                src: '/project-assets/bullseye_xai/fig1_monotonic_deletion.png',
                caption: 'Figure 1: Monotonic Deletion Curve — Verifying XAI Heatmap Faithfulness',
            },
            {
                src: '/project-assets/bullseye_xai/fig2_background_sensitivity.png',
                caption: 'Figure 2: Background Sensitivity Analysis Across Pastures vs Stalls',
            },
            {
                src: '/project-assets/bullseye_xai/fig3_category_accuracy.png',
                caption: 'Figure 3: Category Accuracy & Precision Across Cattle Breeds',
            },
            {
                src: '/project-assets/bullseye_xai/fig4_latency_breakdown.png',
                caption: 'Figure 4: Frame Latency Breakdown (YOLOv8 + VGG16 + Saliency Map)',
            },
        ],
    },

    police_rag: {
        id: 'police_rag',
        chapter: 'CH.06 // CIVIC SYSTEMS & RAG',
        title: 'Police Crime Intelligence RAG Platform',
        badge: 'AIR-GAPPED PRIVACY • CHROMADB VECTOR STORE',
        timeline: 'January 2026',
        techStack: ['FastAPI', 'LangChain', 'Ollama (nomic-embed)', 'ChromaDB', 'SQLite', 'ReportLab'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'Police investigators spend hundreds of hours sifting through dense stacks of First Information Reports (FIRs) trying to spot modus operandi patterns across crimes. But law enforcement documents are strictly confidential and cannot be uploaded to commercial cloud AI like ChatGPT. We built a 100% locally hosted, air-gapped investigative copilot: officers can ask natural questions in plain English—such as "Show all reported bike theft cases near the railway station involving two masked riders"—and the system retrieves relevant FIRs, synthesizes suspect patterns, and generates courtroom-ready investigation summary PDFs without a single byte leaving the police station.',
        metrics: [
            { val: '100% Local', lbl: 'Air-Gapped Cloud Privacy' },
            { val: 'ChromaDB', lbl: 'Vector Similarity Database' },
            { val: 'PDF Export', lbl: 'Automated Courtroom Reports' },
            { val: '< 1.2s', lbl: 'Document Retrieval Latency' },
        ],
        architectureStages: [
            {
                id: 'fir_loader',
                role: 'DOCUMENT INGESTION',
                name: 'FIR Document Ingestion & Chunking',
                type: 'INPUT',
                metric: 'LangChain Splitter',
                plainDescription: 'Loads unstructured police complaint files and splits them into clean narrative paragraphs.',
                technicalDetail: 'DirectoryLoader / TextLoader parsing FIR records with RecursiveCharacterTextSplitter (chunk size 512, overlap 64).',
                tech: 'LangChain / Python',
                inputOutput: { in: 'FIR text documents', out: 'Chunked text passages' },
            },
            {
                id: 'vector_embed',
                role: 'EMBEDDINGS',
                name: 'Local nomic-embed-text Vectorization',
                type: 'PROCESSING',
                metric: 'Local Ollama',
                plainDescription: 'Converts police reports into mathematical vectors so the computer can find similar crimes based on meaning, not just exact keywords.',
                technicalDetail: 'Ollama embeddings running nomic-embed-text locally, generating 768-dimensional semantic embeddings stored in ChromaDB.',
                tech: 'Ollama / ChromaDB',
                inputOutput: { in: 'Chunked passages', out: '768-D semantic vectors in ChromaDB' },
            },
            {
                id: 'rag_query_engine',
                role: 'RETRIEVAL & REASONING',
                name: 'Context Assembler & Local LLM',
                type: 'ENGINE',
                metric: 'Llama / Mistral',
                plainDescription: 'Retrieves the most relevant FIR excerpts and synthesizes a concise, factual answer for the investigator.',
                technicalDetail: 'ChromaDB cosine similarity retrieval injecting top-k chunks into prompt context evaluated by local Llama/Mistral model.',
                tech: 'FastAPI / LangChain RAG',
                inputOutput: { in: 'Investigator query', out: 'Synthesized intelligence response' },
            },
            {
                id: 'courtroom_export',
                role: 'EXPORT',
                name: 'Courtroom PDF Report Generator',
                type: 'OUTPUT',
                metric: 'ReportLab PDF',
                plainDescription: 'Generates formal, formatted investigation PDFs with case citations and timestamps ready for legal submission.',
                technicalDetail: 'ReportLab engine formatting session conversations and cited FIR paragraphs into structured legal investigation PDFs.',
                tech: 'ReportLab / Python',
                inputOutput: { in: 'Investigative synthesis', out: 'investigation_summary.pdf' },
            },
        ],
        dataContracts: `// ChromaDB Schema:
collection.add(
    documents=["FIR No. 42/2026: Suspects entered via rear balcony..."],
    metadatas=[{"fir_id": "42-2026", "date": "2026-01-12", "ipc_sections": "379, 380", "station": "Cyberabad"}],
    ids=["doc_42_01"]
)`,
        mathFormula: '\\text{Similarity}(Q, \\; D_i) = \\frac{\\mathbf{e}_Q \\cdot \\mathbf{e}_{D_i}}{\\|\\mathbf{e}_Q\\| \\|\\mathbf{e}_{D_i}\\|} \\ge \\tau',
        mathExplanation:
            'Cosine similarity between query embedding e_Q and document chunks e_{D_i} retrieves the top matching FIR narratives for context assembly.',
        technicalBulletPoints: [
            {
                title: 'Strict Air-Gapped Operation',
                detail: 'Designed for on-premise deployment on local police workstations, ensuring zero cloud exfiltration of sensitive victim and suspect data.',
            },
            {
                title: 'Audit Logging & Courtroom PDF Generator',
                detail: 'SQLite session storage records investigator queries and generates verifiable PDF reports documenting citations.',
            },
        ],
        codeSnippet: `// FastAPI RAG Query Endpoint:
@app.post("/api/query")
async def query_fir_database(request: QueryRequest):
    # Step 1: Semantic retrieval
    docs = vector_store.similarity_search(request.prompt, k=4)
    context = "\\n---\\n".join([d.page_content for d in docs])
    
    # Step 2: Context prompt assembly
    system_prompt = f"You are a police intelligence assistant. Using only the FIR context below, answer the investigator's question.\\nContext:\\n{context}"
    response = ollama_client.generate(model="mistral", prompt=system_prompt + f"\\nQuestion: {request.prompt}")
    
    # Step 3: Record session
    save_session_turn(request.session_id, request.prompt, response, docs)
    return {"answer": response, "sources": [d.metadata for d in docs]}`,
        postMortem: {
            whatBroke:
                'Initially, the model hallucinated suspect vehicle numbers that did not exist in the police files when asked broad questions.',
            rootCause:
                'Unconstrained system prompt allowed the local LLM to use prior training weights rather than strictly grounding its answers on retrieved FIR documents.',
            fixes: [
                {
                    title: 'Strict Context Guardrail Prompt',
                    desc: 'Added negative constraint: "If the specific fact is not explicitly present in the provided FIR context, state that it is unrecorded."',
                },
                {
                    title: 'Direct Source Citation Badges',
                    desc: 'Required every factual statement in the answer to include a verifiable [FIR-ID #] citation.',
                },
            ],
        },
        takeaway:
            'In law enforcement and justice, an AI hallucination is not an inconvenience—it is a catastrophic risk. Strict retrieval grounding is non-negotiable.',
        images: [],
    },

    society_tracker: {
        id: 'society_tracker',
        chapter: 'CH.06 // FULL-STACK PRODUCTION',
        title: 'Society Maintenance Tracker — Residential Accounting Platform',
        badge: 'NEXT.JS 16 • PRISMA ORM • RBAC AUTH',
        timeline: 'November 2025',
        techStack: ['Next.js 16', 'React 19', 'Prisma ORM', 'PostgreSQL / SQLite', 'JWT', 'Bcrypt', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'Managing an apartment complex or residential society with hundreds of flats usually means messy WhatsApp groups, lost paper receipts, and awkward arguments about who has paid their monthly maintenance. I built Society Tracker: a full-stack web portal where residents can view their monthly dues, upload payment screenshots, submit maintenance complaints with photos, and see society announcements. Admins get a clean accounting dashboard to verify bank receipts with one click, automate monthly maintenance billings, and track complaint resolution times.',
        metrics: [
            { val: 'Next.js 16', lbl: 'Server & Client Architecture' },
            { val: 'Prisma ORM', lbl: 'Type-Safe Relational Schema' },
            { val: '1-Click', lbl: 'Admin Payment Verification' },
            { val: 'RBAC', lbl: 'Admin vs Resident Role Gate' },
        ],
        architectureStages: [
            {
                id: 'next_ui',
                role: 'USER CLIENT',
                name: 'Next.js 16 Responsive Portal',
                type: 'INPUT',
                metric: 'App Router',
                plainDescription: 'Fast, clean web interface for residents and admins to log in, view balances, and manage society affairs.',
                technicalDetail: 'Next.js 16 App Router with server-side rendered pages, React 19 hooks, Tailwind CSS, and Lucide iconography.',
                tech: 'Next.js 16 / React 19',
                inputOutput: { in: 'Resident browser interaction', out: 'Client requests & JWT tokens' },
            },
            {
                id: 'auth_rbac',
                role: 'SECURITY',
                name: 'JWT Authentication & Role Gate',
                type: 'SECURITY',
                metric: 'Bcrypt + JWT',
                plainDescription: 'Separates privileges so regular residents can only see their own flat dues, while elected committee members access admin billing controls.',
                technicalDetail: 'HTTP-only cookies storing JWT tokens signed with SHA-256; middleware enforces RBAC permissions across /admin and /resident route trees.',
                tech: 'JWT / Bcrypt / Middleware',
                inputOutput: { in: 'User login credentials', out: 'Authenticated role session' },
            },
            {
                id: 'billing_engine',
                role: 'ACCOUNTING CORE',
                name: 'Maintenance Billing & Complaint Triage Engine',
                type: 'ENGINE',
                metric: 'Automated Dues',
                plainDescription: 'Calculates monthly dues based on flat square footage, records payment slips, and manages complaint statuses from open to resolved.',
                technicalDetail: 'Prisma transactions managing flat ledger entries, dues accumulation, penalty calculators, and complaint triage workflows.',
                tech: 'Prisma ORM / TypeScript',
                inputOutput: { in: 'Monthly billing cycle trigger', out: 'Generated invoice ledgers' },
            },
            {
                id: 'db_layer',
                role: 'PERSISTENCE',
                name: 'PostgreSQL / Prisma Database Schema',
                type: 'STORAGE',
                metric: 'Relational Schema',
                plainDescription: 'Stores users, flats, payments, and complaint records in a clean, relational database.',
                technicalDetail: 'Normalized relational schema with foreign key constraints across Flat, User, MaintenanceBill, PaymentProof, and Complaint tables.',
                tech: 'Prisma / PostgreSQL / SQLite',
                inputOutput: { in: 'Prisma queries', out: 'Persisted relational rows' },
            },
        ],
        dataContracts: `// Prisma Schema Model:
model MaintenanceBill {
  id          String   @id @default(uuid())
  flatId      String
  month       String
  amount      Float
  status      BillStatus @default(PENDING) // PENDING, PAID, OVERDUE
  paymentSlip String?
  paidAt      DateTime?
  flat        Flat     @relation(fields: [flatId], references: [id])
}`,
        mathFormula: '\\text{MaintenanceFee} = \\text{BaseCharge} + (\\text{SqFt} \\times \\text{RatePerSqFt}) + \\text{ParkingSlots} \\times P',
        mathExplanation:
            'Dynamic fee computation accommodates variable flat configurations while preventing manual calculation errors in society accounting.',
        technicalBulletPoints: [
            {
                title: 'Role-Based Access Control (RBAC)',
                detail: 'Admin dashboard restricted to verified committee members, with separate resident view for flat-specific statements.',
            },
            {
                title: 'Complaint Lifecycle Tracking',
                detail: 'Residents submit issues (plumbing, electrical, security) with photos, and receive status updates as committee members assign contractors.',
            },
        ],
        codeSnippet: `// Server Action: Approve Maintenance Payment
export async function approvePayment(billId: string, adminUserId: string) {
    const session = await verifyAdminSession(adminUserId);
    if (!session.isAdmin) throw new Error("Unauthorized");
    
    return await prisma.$transaction(async (tx) => {
        const bill = await tx.maintenanceBill.update({
            where: { id: billId },
            data: { status: "PAID", verifiedAt: new Date(), verifiedBy: adminUserId }
        });
        await tx.societyLedger.create({
            data: { amount: bill.amount, type: "CREDIT", flatId: bill.flatId, description: \`Maint \${bill.month}\` }
        });
        return bill;
    });
}`,
        postMortem: {
            whatBroke:
                'Initially, multiple concurrent clicks on the "Approve Payment" button generated duplicate credit ledger entries in society accounts.',
            rootCause:
                'Non-atomic database updates lacked concurrency protection and unique constraints on bill-transaction pairings.',
            fixes: [
                {
                    title: 'Prisma Interactive Transactions',
                    desc: 'Wrapped bill status update and ledger crediting in an atomic prisma.$transaction block.',
                },
                {
                    title: 'Client Debounce & Optimistic Disabling',
                    desc: 'Disabled verification action buttons immediately upon first click with optimistic visual feedback.',
                },
            ],
        },
        takeaway:
            'Good software does not need to be fancy—it needs to solve real, messy everyday human friction reliably.',
        images: [
            {
                src: '/project-assets/society_tracker/admin_dashboard.png',
                caption: 'Admin Dashboard — Society Dues, Collection Rates & Financial Overview',
            },
            {
                src: '/project-assets/society_tracker/complaints.png',
                caption: 'Resident Complaint Triage Portal — Status Tracking & Admin Resolution',
            },
            {
                src: '/project-assets/society_tracker/notices.png',
                caption: 'Society Notice Board & Circular Distribution System',
            },
            {
                src: '/project-assets/society_tracker/login.png',
                caption: 'Secure Authentication & Flat Owner Portal Login',
            },
        ],
    },

    varuna_triage: {
        id: 'varuna_triage',
        chapter: 'CH.05 // WHAT I CARE ABOUT',
        title: 'VARUNA — Disaster Incident Triage & Emergency Response',
        badge: 'RANKED 51ST NATIONALLY (SIH 2025) • 98.4% RECALL',
        timeline: 'Smart India Hackathon 2025',
        techStack: ['Python', 'OpenCV', 'PyTorch', 'Cost-Sensitive Loss', 'Perceptual Hashing', 'Flask'],
        githubUrl: 'https://github.com/Krishna-Kilrofkansa',
        humaneStory:
            'During major flood disasters, government emergency dispatch centers get overwhelmed by tens of thousands of frantic messages, duplicate pictures, and blurry spam photos from social media. Real life-and-death distress calls get buried in the noise. At the Smart India Hackathon 2025 (where our 5-person team ranked 51st nationally out of 864 teams across India), we built VARUNA: an automated emergency triage system. It uses computer vision to filter out blurry and duplicate photos, and a custom AI classifier tuned with an asymmetric loss: missing a real flood emergency is penalized 10 times harder than sending a false alarm. The result was 98.4% recall on critical life-threatening emergencies.',
        metrics: [
            { val: 'Rank 51', lbl: 'Nationally (Top 150 of 864 Teams)' },
            { val: '98.4%', lbl: 'Recall on Life-Threatening Crises' },
            { val: '40%', lbl: 'Duplicate/Spam Reports Filtered' },
            { val: '10x', lbl: 'Penalty for Missed Emergencies' },
        ],
        architectureStages: [
            {
                id: 'distress_reports',
                role: 'CITIZEN INGESTION',
                name: 'Citizen Distress Feed Ingestion',
                type: 'INPUT',
                metric: 'Multi-Channel Feed',
                plainDescription: 'Collects incoming emergency photos, messages, and GPS coordinates sent by citizens in flood zones.',
                technicalDetail: 'Multi-channel webhook receiving citizen reports, geotags, and media attachments during natural disasters.',
                tech: 'Flask Webhooks / Python',
                inputOutput: { in: 'Citizen report payload', out: 'Raw report records' },
            },
            {
                id: 'blur_dedupe',
                role: 'COMPUTER VISION GATE',
                name: 'OpenCV Laplacian Blur & Deduplication',
                type: 'PROCESSING',
                metric: '40% Noise Reduction',
                plainDescription: 'Instantly discards blurry, unreadable images and duplicate forwarded spam pictures so operators do not waste time.',
                technicalDetail: 'Laplacian variance filter detects unreadable blur (threshold < 100); perceptual image hashing (dHash) eliminates viral forwarded duplicates.',
                tech: 'OpenCV / ImageHash',
                inputOutput: { in: 'Raw report photos', out: 'Filtered high-signal image queue' },
            },
            {
                id: 'cost_sensitive_ai',
                role: 'CLASSIFICATION CORE',
                name: 'Asymmetric Cost-Sensitive AI Triage',
                type: 'ENGINE',
                metric: 'CFN = 10 * CFP',
                plainDescription: 'Classifies reports by urgency. Penalizes missed life-threatening emergencies 10x harder than a false alarm.',
                technicalDetail: 'Cost-sensitive neural classifier optimizing asymmetric risk loss function, guaranteeing 98.4% recall on severe incident classes.',
                tech: 'PyTorch / Custom Loss',
                inputOutput: { in: 'Verified image & text report', out: 'Severity classification (P1 to P4)' },
            },
            {
                id: 'dispatch_queue',
                role: 'DISPATCH QUEUE',
                name: 'Priority Emergency Dispatch Queue',
                type: 'OUTPUT',
                metric: 'Ranked Priority',
                plainDescription: 'Surfaces highest-severity life-or-death crises at the very top of first-responder and rescue team screens.',
                technicalDetail: 'Sorted priority queue mapping geotagged incidents to disaster management authorities with verified contact routing.',
                tech: 'Redis Priority Queue / REST',
                inputOutput: { in: 'Classified incident tickets', out: 'Prioritized first-responder dispatch board' },
            },
        ],
        dataContracts: `// Asymmetric Loss Matrix:
Cost_Matrix = [
    [0,   1],   // False Alarm (FP): Cost = 1 (A wasted phone call)
    [10,  0]    // Missed Emergency (FN): Cost = 10 (A human life lost)
]
L_cost = - sum ( y * 10 * log(p) + (1 - y) * 1 * log(1 - p) )`,
        mathFormula: 'L_{\\text{asymmetric}} = - \\sum_{i} \\left[ y_i \\cdot C_{\\text{FN}} \\log(\\hat{p}_i) + (1 - y_i) \\cdot C_{\\text{FP}} \\log(1 - \\hat{p}_i) \\right] \\quad \\text{with} \\quad C_{\\text{FN}} = 10 \\cdot C_{\\text{FP}}',
        mathExplanation:
            'In emergency triage, False Negatives (missing a trapped person) are infinitely more dangerous than False Positives (sending a drone to verify a safe house). Setting CFN = 10 forces the model to achieve 98.4% critical recall.',
        technicalBulletPoints: [
            {
                title: 'Ranked 51st Nationally at Smart India Hackathon',
                detail: 'Led a 5-person engineering team across an intense 36-hour sprint, qualifying in the top 150 of 864 participating teams across India.',
            },
            {
                title: '40% Report Pruning',
                detail: 'Perceptual hashing eliminated hundreds of identical viral WhatsApp photos forwarded by concerned citizens, saving valuable first-responder triage cycles.',
            },
        ],
        codeSnippet: `// Asymmetric Cost-Sensitive Binary Cross Entropy:
class CostSensitiveLoss(nn.Module):
    def __init__(self, cost_fn=10.0, cost_fp=1.0):
        super().__init__()
        self.cfn = cost_fn
        self.cfp = cost_fp
        
    def forward(self, pred_probs, targets):
        # targets: 1 (Critical Emergency), 0 (Non-critical)
        loss = - (targets * self.cfn * torch.log(pred_probs + 1e-7) + 
                  (1.0 - targets) * self.cfp * torch.log(1.0 - pred_probs + 1e-7))
        return torch.mean(loss)`,
        postMortem: {
            whatBroke:
                'At 2:00 AM during the hackathon, our baseline model showed an impressive 89% accuracy, but was misclassifying nearly 45% of life-threatening trapped flood cases as routine waterlogging.',
            rootCause:
                'Class imbalance: routine queries and minor waterlogging vastly outnumbered severe rooftop stranding reports, leading standard cross-entropy to optimize for the majority class.',
            fixes: [
                {
                    title: 'Forced Asymmetric Loss Function',
                    desc: 'Replaced standard cross-entropy with a cost-sensitive penalty that weighed false negatives 10x heavier than false alarms.',
                },
                {
                    title: 'Laplacian Blur Pre-Filter',
                    desc: 'Filtered out low-resolution and blurry sensor camera captures that confused the classifier.',
                },
            ],
        },
        takeaway:
            'Our ML team celebrated 89% accuracy at 2 AM, but the model was misclassifying half the life-threatening flood reports. A false alarm costs a phone call; a missed report costs a life. Never confuse mathematical accuracy with real-world effectiveness.',
        images: [],
    },
};
