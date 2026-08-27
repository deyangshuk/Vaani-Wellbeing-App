import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CircleDollarSign,
  ChevronRight,
  ChevronDown,
  CircleHelp,
  Clock3,
  Coins,
  FileText,
  GraduationCap,
  Heart,
  Info,
  Leaf,
  LockKeyhole,
  MessageCircle,
  Moon,
  Play,
  Square,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  WalletCards,
} from 'lucide-react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import bakuArtwork from '@assets/7e18e83aec3d35195120a938bd13fb17_1787681321007.jpg';
import garudaArtwork from '@assets/ho77_1787681461963.jpg';
import kitsuneArtwork from '@assets/white-ninetailed-fox-stands-on-260nw-2496405175_1787681498807.jpg';
import baihuArtwork from '@assets/baihu_1787681526736.webp';

const queryClient = new QueryClient();

type Flow = 'welcome' | 'privacy' | 'login' | 'role' | 'school' | 'details' | 'pet' | 'caregiver-details' | 'caregiver-docs' | 'caregiver-slots' | 'caregiver-dashboard' | 'app';
type Tab = 'calendar' | 'questionnaire' | 'chat' | 'resources';
type Message = { id: number; from: 'vaani' | 'user'; text: string };

const questions = [
  'How did I sleep last night?',
  'What is my current energy level?',
  'What dominant emotion am I feeling right now?',
  'Am I feeling calm or overwhelmed today?',
  'Have I connected with anyone today?',
  'How am I reacting to daily stressors?',
  'Did I experience any moments of joy?',
];

const answers = [
  ['Very well', 'Pretty well', 'Restlessly', 'Not at all'],
  ['Full of energy', 'Steady', 'A little low', 'Running on empty'],
  ['Happy', 'Calm', 'Sad', 'Anxious'],
  ['Calm', 'Mostly okay', 'A little overwhelmed', 'Very overwhelmed'],
  ['Yes, meaningfully', 'A quick message', 'Not yet', 'I would like to'],
  ['I am managing', 'I am taking a pause', 'I am avoiding things', 'I feel stretched'],
  ['Yes, a small moment', 'A few sparks', 'Not today', 'I am not sure yet'],
];

const starterPrompts = [
  'I feel a little overwhelmed',
  'Help me make a gentle plan for today',
  'I would like to talk something through',
];

const petArtwork: Record<string, string> = {
  Baku: bakuArtwork,
  Garuda: garudaArtwork,
  Kitsune: kitsuneArtwork,
  Baihu: baihuArtwork,
};

const petGuidance: Record<string, { welcome: string; tips: Record<Tab, string> }> = {
  Baku: { welcome: 'I am Baku. I will help you make a little room for what is on your mind.', tips: { calendar: 'Let us start with one small pause today. The calendar helps you notice your rhythm.', questionnaire: 'There is no right answer here. I will stay beside you while you check in.', chat: 'You can say things here exactly as they are. We can take them one breath at a time.', resources: 'When you need extra support, I can help you find a quiet book or a guided pause.' } },
  Garuda: { welcome: 'I am Garuda. I will help you find steadiness when your day feels full.', tips: { calendar: 'A steady rhythm is built from small returns. Your calendar keeps those returns visible.', questionnaire: 'Answer with your first instinct. Noticing how you feel is already a brave step.', chat: 'You do not have to carry a difficult thought alone. Tell me what feels heavy.', resources: 'A guide or meditation can be a useful landing place between conversations.' } },
  Kitsune: { welcome: 'I am Kitsune. I will help you notice gentle possibilities in your day.', tips: { calendar: 'Your calendar is a soft record of the moments you chose yourself.', questionnaire: 'Let us be curious, not critical. Every answer gives you a little more understanding.', chat: 'Bring me a question, a feeling, or even a jumble of thoughts. We can untangle them slowly.', resources: 'There are small, kind tools here for when you want to explore at your own pace.' } },
  Baihu: { welcome: 'I am Baihu. I will help you feel held while you care for your inner world.', tips: { calendar: 'The calendar is here to remind you that showing up can be quiet and still count.', questionnaire: 'Take your time. This check-in belongs to you and there is nothing to perform.', chat: 'This is a safe first place to put words to a feeling. I am listening.', resources: 'You can return to these books and meditations whenever you need a gentler next step.' } },
};

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? 'compact' : ''}`} aria-label="Vaani home">
      <span className="mark-dot" aria-hidden="true" />
      <span>vaani</span>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  testId,
  type = 'button',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  testId: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button className="button-primary" type={type} onClick={onClick} data-testid={testId} disabled={disabled}>
      {children}
    </button>
  );
}

function Welcome({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const timeout = window.setTimeout(onContinue, 2200);
    return () => window.clearTimeout(timeout);
  }, [onContinue]);

  return (
    <main className="flow-screen welcome-screen">
      <div className="welcome-orbit" aria-hidden="true" />
      <div className="welcome-lockup screen-transition">
        <Brand />
        <h1 className="welcome-title display-font">Vaani</h1>
        <p className="welcome-tagline display-font">A softer place to meet yourself.</p>
        <p className="welcome-subline">A private pause for student life</p>
      </div>
    </main>
  );
}

function Privacy({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card wide">
        <div className="privacy-layout">
          <section>
            <div className="privacy-icon" aria-hidden="true"><LockKeyhole size={27} /></div>
            <p className="eyebrow" style={{ marginTop: '1.4rem' }}>Before we begin</p>
            <h1 className="privacy-title display-font">Your inner world belongs to you.</h1>
            <p className="muted-copy">Vaani is a quiet, private corner for noticing how you are doing. You choose what to share, and when.</p>
          </section>
          <section className="privacy-sheet" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Our promise to your privacy</h2>
            <p>These are the simple things we will always keep in mind while you use Vaani.</p>
            <div className="privacy-point">
              <ShieldCheck size={18} />
              <div><strong>Your right to privacy</strong><span>Your reflections are yours. Vaani will never make a decision about you from a private check-in.</span></div>
            </div>
            <div className="privacy-point">
              <LockKeyhole size={18} />
              <div><strong>Only what you choose</strong><span>We ask for the minimum needed to make this space feel personal. You can skip anything.</span></div>
            </div>
            <div className="privacy-point">
              <Heart size={18} />
              <div><strong>Support, not diagnosis</strong><span>Vaani offers gentle wellbeing tools. It is not a replacement for professional care.</span></div>
            </div>
            <PrimaryButton onClick={onContinue} testId="button-accept-privacy">
              I understand <ArrowRight size={16} />
            </PrimaryButton>
          </section>
        </div>
      </div>
    </main>
  );
}

function Login({ phone, setPhone, email, setEmail, role, setRole, onLogin, onSignUp }: {
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  role: 'student' | 'caregiver';
  setRole: (value: 'student' | 'caregiver') => void;
  onLogin: () => void;
  onSignUp: () => void;
}) {
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <Brand />
          <p className="eyebrow" style={{ marginTop: '2.8rem' }}>Welcome back</p>
          <h1 className="display-font">Return to your space.</h1>
          <p>Choose how you are joining Vaani, then use either detail to continue.</p>
          <div className="field-stack">
            <label className="field-label" htmlFor="login-role">I am a
              <select id="login-role" className="field-input" value={role} onChange={(event) => setRole(event.target.value as 'student' | 'caregiver')} data-testid="select-login-role">
                <option value="student">Student</option>
                <option value="caregiver">Caregiver</option>
              </select>
            </label>
            <label className="field-label" htmlFor="login-phone">Phone Number
              <input id="login-phone" className="field-input" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter your phone number" data-testid="input-login-phone" />
            </label>
            <label className="field-label" htmlFor="login-email">Email Id
              <input id="login-email" className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" data-testid="input-login-email" />
            </label>
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onSignUp} data-testid="button-login-sign-up">Sign Up</button>
            <PrimaryButton onClick={onLogin} testId="button-login">Log In <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}

function RoleChoice({ onStudent, onCaregiver }: { onStudent: () => void; onCaregiver: () => void }) {
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <div className="role-intro">
          <Brand />
          <p className="eyebrow" style={{ marginTop: '2.8rem' }}>A space made for you</p>
          <h1 className="display-font">How shall we meet?</h1>
          <p className="muted-copy">Choose your role here.</p>
        </div>
        <div className="role-grid">
          <button className="role-card student" onClick={onStudent} data-testid="button-role-student">
            <span className="role-icon"><GraduationCap size={23} /></span>
            <h2 className="display-font">Student</h2>
            <p>A private rhythm for your feelings, focus, and everyday wellbeing.</p>
            <span className="button-link">Make my space <ChevronRight size={15} /></span>
          </button>
          <button className="role-card caregiver" onClick={onCaregiver} data-testid="button-role-caregiver">
            <span className="role-icon"><ShieldCheck size={23} /></span>
            <h2 className="display-font">Caregiver</h2>
            <p>A considered companion space for supporting student wellbeing.</p>
            <span className="button-link">Enter caregiver space <ChevronRight size={15} /></span>
          </button>
        </div>
      </div>
    </main>
  );
}

function ProgressRail({ step }: { step: number }) {
  return <div className="progress-rail" aria-label={`Onboarding step ${step} of 3`}>{[1, 2, 3].map((item) => <span key={item} className={item <= step ? 'active' : ''} />)}</div>;
}

function SchoolStep({ school, setSchool, admission, setAdmission, onNext, onBack, onSkip }: {
  school: string; setSchool: (value: string) => void; admission: string; setAdmission: (value: string) => void; onNext: () => void; onBack: () => void; onSkip: () => void;
}) {
  const valid = admission.toLowerCase() === 'vaani24';
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <ProgressRail step={1} />
          <p className="eyebrow">Your student space</p>
          <h1 className="display-font">Let’s start with where you are.</h1>
          <p>A little context helps us make Vaani feel like it belongs to your everyday life. This is a demo lookup; no school records are accessed.</p>
          <div className="field-stack">
            <label className="field-label" htmlFor="school-select">Your school <small>Optional</small>
              <select id="school-select" className="field-input" value={school} onChange={(event) => setSchool(event.target.value)} data-testid="select-school">
                <option value="">Choose your school</option>
                <option value="AJPS">AJPS — A.J. Public School</option>
                <option value="Lakeside">Lakeside College</option>
                <option value="Mitra">Mitra Institute of Design</option>
              </select>
            </label>
            <label className="field-label" htmlFor="admission-number">Admission number <small>Optional</small>
              <input id="admission-number" className="field-input" value={admission} onChange={(event) => setAdmission(event.target.value)} placeholder="For example, Vaani24" data-testid="input-admission-number" />
              <span className="validation-note" role="status">{admission ? (valid ? 'Demo match found — you can continue.' : 'Demo validation: try Vaani24 to see a match.') : ''}</span>
            </label>
            <div className="demo-note"><Info size={15} /><span>Demo lookup only: enter <strong>Vaani24</strong> to preview a successful validation.</span></div>
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onSkip} data-testid="button-skip-school">Skip for now</button>
            <div>
              <button className="button-ghost" onClick={onBack} data-testid="button-back-school"><ArrowLeft size={15} /> Back</button>
              <PrimaryButton onClick={onNext} testId="button-continue-school">Continue <ArrowRight size={15} /></PrimaryButton>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DetailsStep({ name, setName, gender, setGender, age, setAge, onNext, onBack }: {
  name: string; setName: (value: string) => void; gender: string; setGender: (value: string) => void; age: string; setAge: (value: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <ProgressRail step={2} />
          <p className="eyebrow">A few more details</p>
          <h1 className="display-font">How would you like to be called?</h1>
          <p>There is no perfect way to be here. Share only what feels comfortable; these details stay on this device in this first version.</p>
          <div className="field-stack">
            <label className="field-label" htmlFor="name-input">Your name
              <input id="name-input" className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="What should we call you?" data-testid="input-name" />
            </label>
            <label className="field-label" htmlFor="gender-select">Gender <small>Optional</small>
              <select id="gender-select" className="field-input" value={gender} onChange={(event) => setGender(event.target.value)} data-testid="select-gender">
                <option value="">Prefer not to say</option><option value="woman">Woman</option><option value="man">Man</option><option value="non-binary">Non-binary</option><option value="self-describe">Self-describe</option>
              </select>
            </label>
            <label className="field-label" htmlFor="age-input">Age <small>Optional</small>
              <input id="age-input" className="field-input" type="number" min="13" max="100" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Your age" data-testid="input-age" />
            </label>
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onBack} data-testid="button-back-details"><ArrowLeft size={15} /> Back</button>
            <PrimaryButton onClick={onNext} testId="button-continue-details">Continue <ArrowRight size={15} /></PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}

function PetStep({ pet, setPet, onNext, onBack }: { pet: string; setPet: (value: string) => void; onNext: () => void; onBack: () => void }) {
  const pets = [
    { name: 'Baku', quality: 'The Japanese nightmare-eater' },
    { name: 'Garuda', quality: 'Known for its strength and speed' },
    { name: 'Kitsune', quality: 'Represents intelligence and protection' },
    { name: 'Baihu', quality: 'The giver of justice' },
  ];
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <ProgressRail step={3} />
          <p className="eyebrow">A small companion</p>
          <h1 className="display-font">Choose who will sit beside you.</h1>
          <p>Your companion will keep you company through check-ins and quiet moments. No pressure, no performance.</p>
          <div className="pet-grid" role="radiogroup" aria-label="Choose a virtual companion">
            {pets.map((item) => (
              <button key={item.name} className={`pet-choice ${pet === item.name ? 'selected' : ''}`} onClick={() => setPet(item.name)} role="radio" aria-checked={pet === item.name} data-testid={`button-pet-${item.name.toLowerCase()}`}>
                <span className="pet-avatar"><img src={petArtwork[item.name]} alt="" /></span>
                <span><strong>{item.name}</strong><span>{item.quality}</span></span>
                {pet === item.name ? <Check size={16} aria-label="Selected" /> : null}
              </button>
            ))}
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onBack} data-testid="button-back-pet"><ArrowLeft size={15} /> Back</button>
            <PrimaryButton onClick={onNext} testId="button-finish-onboarding">Enter my space <ArrowRight size={15} /></PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}

function CaregiverDetailsStep({ name, setName, gender, setGender, age, setAge, onNext, onBack }: {
  name: string; setName: (value: string) => void; gender: string; setGender: (value: string) => void; age: string; setAge: (value: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <ProgressRail step={1} />
          <p className="eyebrow">Caregiver profile</p>
          <h1 className="display-font">Tell us a little about you.</h1>
          <p>These details help us introduce you to students with care. You can update them later.</p>
          <div className="field-stack">
            <label className="field-label" htmlFor="caregiver-name">Your name
              <input id="caregiver-name" className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="What should students call you?" data-testid="input-caregiver-name" />
            </label>
            <label className="field-label" htmlFor="caregiver-gender">Gender <small>Optional</small>
              <select id="caregiver-gender" className="field-input" value={gender} onChange={(event) => setGender(event.target.value)} data-testid="select-caregiver-gender">
                <option value="">Prefer not to say</option><option value="woman">Woman</option><option value="man">Man</option><option value="non-binary">Non-binary</option><option value="self-describe">Self-describe</option>
              </select>
            </label>
            <label className="field-label" htmlFor="caregiver-age">Age
              <input id="caregiver-age" className="field-input" type="number" min="18" max="100" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Your age" data-testid="input-caregiver-age" />
            </label>
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onBack} data-testid="button-back-caregiver-details"><ArrowLeft size={15} /> Back</button>
            <PrimaryButton onClick={onNext} testId="button-continue-caregiver-details">Continue <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}

function CaregiverDocuments({ documents, setDocuments, onNext, onBack }: { documents: string[]; setDocuments: (value: string[]) => void; onNext: () => void; onBack: () => void }) {
  const labels = ['Identity proof', 'Caregiving qualification', 'Professional registration', 'Address proof', 'Profile photograph'];
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <ProgressRail step={2} />
          <p className="eyebrow">A little paperwork</p>
          <h1 className="display-font">Help us keep this space safe.</h1>
          <p>Upload a few documents for your caregiver profile. This preview accepts filenames only; secure document storage will be connected later.</p>
          <div className="document-list">
            {labels.map((label, index) => (
              <label className="document-field" key={label} htmlFor={`caregiver-document-${index}`}>
                <span className="document-icon"><FileText size={17} /></span>
                <span><strong>{label}</strong><small>Choose a file</small></span>
                <input id={`caregiver-document-${index}`} type="file" onChange={(event) => {
                  const next = [...documents];
                  next[index] = event.target.files?.[0]?.name || '';
                  setDocuments(next);
                }} data-testid={`input-caregiver-document-${index}`} />
                <span className="document-name">{documents[index] || 'Not added'}</span>
              </label>
            ))}
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onBack} data-testid="button-back-caregiver-documents"><ArrowLeft size={15} /> Back</button>
            <PrimaryButton onClick={onNext} testId="button-continue-caregiver-documents">Continue <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}

function CaregiverAvailability({ slot, setSlot, onNext, onBack }: { slot: string; setSlot: (value: string) => void; onNext: () => void; onBack: () => void }) {
  const slots = ['6 am - 12 pm', '12 pm - 4 pm', '4 pm - 8 pm', '8 pm - 12 am'];
  return (
    <main className="flow-screen screen-transition">
      <div className="flow-card">
        <section className="onboarding-panel">
          <ProgressRail step={3} />
          <div className="privacy-icon"><Clock3 size={27} /></div>
          <p className="eyebrow">A flexible way to contribute</p>
          <h1 className="display-font">This is a part-time role.</h1>
          <p>Choose a time that fits your life. You’ll receive student concerns during the hours you select and can make space for thoughtful conversations.</p>
          <div className="slot-grid" role="radiogroup" aria-label="Choose your part-time availability">
            {slots.map((item) => <button key={item} className={`slot-card ${slot === item ? 'selected' : ''}`} onClick={() => setSlot(item)} role="radio" aria-checked={slot === item} data-testid={`button-slot-${item.replaceAll(' ', '-').replaceAll('am', 'am').replaceAll('pm', 'pm')}`}><Clock3 size={18} /><span>{item}</span>{slot === item && <Check size={16} />}</button>)}
          </div>
          <div className="form-actions">
            <button className="button-link" onClick={onBack} data-testid="button-back-caregiver-slots"><ArrowLeft size={15} /> Back</button>
            <PrimaryButton onClick={onNext} testId="button-confirm-caregiver-slot">Confirm availability <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}

function CaregiverDashboard({ name, slot }: { name: string; slot: string }) {
  const [tab, setTab] = useState<'students' | 'credits'>('students');
  const [openStudent, setOpenStudent] = useState<number | null>(0);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [currency, setCurrency] = useState('INR');
  const [redeemed, setRedeemed] = useState(false);
  const students = [
    { name: 'Aarav Mehta', detail: 'Year 2 · AJPS', mood: 'Feeling stretched by exams', feedback: '“I felt heard and less alone after our conversation.”' },
    { name: 'Mira Shah', detail: 'Year 1 · Lakeside College', mood: 'Finding it hard to settle in', feedback: '“The small plan we made helped me take the next step.”' },
    { name: 'Kabir Rao', detail: 'Year 3 · Mitra Institute', mood: 'Looking for a calmer routine', feedback: '“I appreciated having a quiet place to talk.”' },
  ];
  const saveNote = (index: number) => setNotes((current) => ({ ...current, [index]: current[index] || 'Note saved for this student.' }));
  return (
    <div className="app-layout caregiver-app">
      <aside className="app-sidebar">
        <Brand />
        <div className="sidebar-label">Caregiver space</div>
        <div className="caregiver-side-intro"><span className="profile-initial">{(name || 'C').slice(0, 1).toUpperCase()}</span><strong>{name || 'Your profile'}</strong><small>{slot || 'Part-time availability'}</small></div>
        <nav className="nav-list" aria-label="Caregiver dashboard navigation">
          <button className={`nav-item ${tab === 'students' ? 'active' : ''}`} onClick={() => setTab('students')} data-testid="button-caregiver-tab-students"><Users size={17} /><span>My students</span></button>
          <button className={`nav-item ${tab === 'credits' ? 'active' : ''}`} onClick={() => setTab('credits')} data-testid="button-caregiver-tab-credits"><Coins size={17} /><span>Credits</span></button>
        </nav>
        <p className="sidebar-quiet">Thank you for making room for someone else.</p>
      </aside>
      <main className="app-main">
        <div className="app-topbar"><div className="mobile-brand"><Brand compact /></div><div className="profile-chip"><span className="profile-initial">{(name || 'C').slice(0, 1).toUpperCase()}</span><span>{name || 'Caregiver'}</span></div></div>
        {tab === 'students' ? (
          <div className="screen-transition">
            <div className="page-heading"><div><p className="eyebrow">Caregiver dashboard</p><h1 className="display-font">People placed in your care.</h1><p>These students were gently matched to you by Vaani’s support system.</p></div><div className="dashboard-stat"><span>Available today</span><strong>3</strong><small>student concerns</small></div></div>
            <div className="student-list">
              {students.map((student, index) => <article className="student-row" key={student.name}>
                <button className="student-row-head" onClick={() => setOpenStudent(openStudent === index ? null : index)} aria-expanded={openStudent === index} data-testid={`button-student-${index}`}><span className="student-avatar">{student.name.slice(0, 1)}</span><span className="student-summary"><strong>{student.name}</strong><small>{student.detail}</small></span><span className="student-mood">{student.mood}</span><ChevronDown size={18} className={openStudent === index ? 'rotate-180' : ''} /></button>
                {openStudent === index && <div className="student-row-detail">
                  <div className="feedback-block"><span className="eyebrow">Student feedback</span><p>{student.feedback}</p></div>
                  <label className="field-label" htmlFor={`student-note-${index}`}>Your private notes
                    <textarea id={`student-note-${index}`} className="field-input note-input" value={notes[index] || ''} onChange={(event) => setNotes((current) => ({ ...current, [index]: event.target.value }))} placeholder="Add a note after your conversation..." data-testid={`textarea-student-note-${index}`} />
                  </label>
                  <button className="button-link" onClick={() => saveNote(index)} data-testid={`button-save-note-${index}`}><Save size={15} /> Save note</button>
                </div>}
              </article>)}
            </div>
          </div>
        ) : (
          <div className="screen-transition">
            <div className="page-heading"><div><p className="eyebrow">Your contribution</p><h1 className="display-font">Credits that come from care.</h1><p>See what you’ve earned by showing up for student concerns.</p></div><div className="credits-total"><Coins size={20} /><span>Total credits</span><strong>240</strong></div></div>
            <div className="credits-grid">
              <section className="content-card credit-value-card"><div className="card-heading"><h2>Current value</h2><WalletCards size={19} /></div><div className="currency-line"><strong>{currency === 'INR' ? '₹1,920' : currency === 'USD' ? '$23.04' : '€21.42'}</strong><select value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Choose currency" data-testid="select-credit-currency"><option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div><p>1 credit = {currency === 'INR' ? '₹8' : currency === 'USD' ? '$0.096' : '€0.089'}</p><button className="button-primary redeem-button" onClick={() => setRedeemed(true)} data-testid="button-redeem-credits"><CircleDollarSign size={17} /> {redeemed ? 'Redemption requested' : 'Redeem as money'}</button></section>
              <section className="content-card"><div className="card-heading"><h2>Earning history</h2><span>Recent</span></div><div className="earning-history"><div><span>Student concern attended</span><strong>+80 credits</strong><small>Today · Aarav Mehta</small></div><div><span>Student concern attended</span><strong>+80 credits</strong><small>Yesterday · Mira Shah</small></div><div><span>Student concern attended</span><strong>+80 credits</strong><small>18 Mar · Kabir Rao</small></div></div></section>
            </div>
            <div className="demo-note"><Info size={15} /><span>Credits and redemption are demo values for now. Payments will be connected in a later version.</span></div>
          </div>
        )}
      </main>
    </div>
  );
}

function Sidebar({ activeTab, onTab, pet }: { activeTab: Tab; onTab: (tab: Tab) => void; pet: string }) {
  const items: { id: Tab; label: string; icon: typeof CalendarDays }[] = [
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'questionnaire', label: 'Daily questionnaire', icon: CircleHelp },
    { id: 'chat', label: 'Chat with Vaani', icon: MessageCircle },
    { id: 'resources', label: 'Secondary features', icon: BookOpen },
  ];
  return (
    <aside className="app-sidebar">
      <Brand />
      <div className="sidebar-label">Your wellbeing</div>
      <nav className="nav-list" aria-label="Main navigation">
        {items.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${activeTab === id ? 'active' : ''}`} onClick={() => onTab(id)} aria-current={activeTab === id ? 'page' : undefined} data-testid={`button-tab-${id}`}><Icon size={17} /><span>{id === 'chat' ? `Chat with ${pet}` : label}</span></button>)}
      </nav>
      <p className="sidebar-quiet">A private space, held gently.<br />Everything here stays local for now.</p>
    </aside>
  );
}

function CalendarView({ name, pet, onTab }: { name: string; pet: string; onTab: (tab: Tab) => void }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="screen-transition">
      <div className="page-heading">
        <div><p className="eyebrow">Welcome{name ? `, ${name}` : ''}</p><h1 className="display-font">Make room for today.</h1><p>A small check-in can be enough. You do not have to solve everything at once.</p></div>
        <PrimaryButton onClick={() => onTab('questionnaire')} testId="button-start-checkin">Start today’s check-in <ArrowRight size={16} /></PrimaryButton>
      </div>
      <div className="content-grid">
        <section className="content-card" aria-labelledby="calendar-heading">
          <div className="card-heading"><h2 id="calendar-heading">Your gentle rhythm</h2><span>March 2025</span></div>
          <div className="week-row" aria-label="Weekly wellbeing check-ins">
            {days.map((day, index) => <div className={`day-cell ${index < 3 ? 'done' : ''} ${index === 3 ? 'today' : ''}`} key={`${day}-${index}`}><span>{day}</span><strong>{17 + index}</strong><span className="day-orb" aria-label={`${day} ${17 + index} check-in ${index < 3 ? 'complete' : index === 3 ? 'today' : 'not started'}`}>{index < 3 ? <Check size={14} /> : index === 3 ? <Sparkles size={14} /> : ''}</span></div>)}
          </div>
          <div style={{ marginTop: '2.2rem' }}><p className="eyebrow">This week</p><p className="muted-copy" style={{ fontSize: '.82rem', margin: '.45rem 0 0' }}>You have shown up for three quiet moments. That counts.</p></div>
        </section>
        <aside className="content-card ember" aria-label="Current streak">
          <div className="card-heading"><h2>Streak</h2><span>Keep your rhythm</span></div>
          <div className="streak-value"><strong>3</strong><span>days of noticing</span></div>
          <div className="streak-line" aria-label="3 day streak progress"><i /></div>
          <p style={{ fontSize: '.76rem', lineHeight: 1.55, marginTop: '1rem' }}>Your {pet || 'companion'} is proud of the pause you made.</p>
        </aside>
        <section className="content-card tinted quote-card">
          <blockquote>“You can be a work in progress and still be worthy of rest.”</blockquote>
        </section>
        <section className="content-card">
          <div className="card-heading"><h2>Coming up</h2><span>Take it easy</span></div>
          <div className="schedule-list">
            <div className="schedule-item"><span className="schedule-icon"><Moon size={15} /></span><div><strong>Wind down</strong><span>Try a 5-minute breathing guide tonight</span></div><ChevronRight size={15} color="#9a6c2f" /></div>
            <div className="schedule-item"><span className="schedule-icon"><BookOpen size={15} /></span><div><strong>A page for you</strong><span>Read “The pause between things”</span></div><ChevronRight size={15} color="#9a6c2f" /></div>
          </div>
        </section>
      </div>
    </div>
  );
}

function VideoJournal({ pet }: { pet: string }) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => () => {
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoUrl) window.URL.revokeObjectURL(videoUrl);
  }, [videoUrl]);

  const startRecording = async () => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setError('Video recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
      recorder.onstop = () => {
        const nextUrl = window.URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
        setVideoUrl((current) => { if (current) window.URL.revokeObjectURL(current); return nextUrl; });
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
      };
      recorder.start();
      setRecording(true);
    } catch {
      setError('Camera access was not granted. You can try again whenever you feel ready.');
    }
  };

  const stopRecording = () => recorderRef.current?.stop();
  const clearRecording = () => { if (videoUrl) window.URL.revokeObjectURL(videoUrl); setVideoUrl(''); setError(''); };

  return (
    <section className="video-journal content-card" aria-labelledby="video-journal-title">
      <div className="video-journal-art"><Video size={24} /></div>
      <div className="video-journal-copy">
        <span className="eyebrow">A private voice note</span>
        <h2 id="video-journal-title" className="display-font">Tell {pet || 'your companion'} about your day.</h2>
        <p>Tap the box to record a short video of yourself speaking freely. It stays on this device in this demo.</p>
        {error ? <p className="video-error" role="alert">{error}</p> : null}
        {videoUrl ? <div className="video-result"><video src={videoUrl} controls aria-label="Your recorded day reflection" /><button className="button-link" onClick={clearRecording} data-testid="button-retake-video">Record again</button></div> : (
          <button className={`record-box ${recording ? 'recording' : ''}`} onClick={recording ? stopRecording : startRecording} data-testid="button-record-day-video">
            <span className="record-box-icon">{recording ? <Square size={20} /> : <Video size={22} />}</span>
            <span><strong>{recording ? 'Tap to finish recording' : 'Record yourself speaking'}</strong><small>{recording ? 'Your companion is listening' : 'A 2-minute reflection, just for you'}</small></span>
          </button>
        )}
      </div>
    </section>
  );
}

function QuestionnaireView({ answersState, setAnswersState, completed, setCompleted, pet }: { answersState: Record<number, string>; setAnswersState: (next: Record<number, string>) => void; completed: boolean; setCompleted: (value: boolean) => void; pet: string }) {
  const [current, setCurrent] = useState(0);
  if (completed) {
    return <div className="screen-transition"><div className="page-heading"><div><p className="eyebrow">Daily questionnaire</p><h1 className="display-font">You made a little room.</h1></div></div><section className="content-card completion-card"><div className="completion-seal"><Check size={27} /></div><h2 className="display-font">Well noticed.</h2><p>There is no score to this. Just seven moments of checking in with yourself. Your three-day streak is still glowing.</p><PrimaryButton onClick={() => { setCompleted(false); setCurrent(0); }} testId="button-revisit-questionnaire">Revisit my answers <ArrowRight size={16} /></PrimaryButton></section><VideoJournal pet={pet} /></div>;
  }
  const selected = answersState[current];
  const choose = (value: string) => setAnswersState({ ...answersState, [current]: value });
  const next = () => current === questions.length - 1 ? setCompleted(true) : setCurrent(current + 1);
  return (
    <div className="screen-transition">
      <div className="page-heading"><div><p className="eyebrow">Daily questionnaire · 2 minutes</p><h1 className="display-font">A moment to notice.</h1><p>Answer with your first instinct. This is for you, not for a grade.</p></div><div className="content-card ember" style={{ padding: '.8rem 1rem', minWidth: '140px' }}><span style={{ fontSize: '.68rem', display: 'block' }}>Current streak</span><strong style={{ fontFamily: 'var(--app-font-serif)', fontSize: '2rem' }}>3 days</strong></div></div>
      <section className="content-card question-card" aria-labelledby="question-title">
        <span className="question-number">QUESTION {current + 1} OF {questions.length}</span>
        <h2 id="question-title">{questions[current]}</h2>
        <div className="answer-list" role="radiogroup" aria-label="Choose an answer">
          {answers[current].map((answer) => <button key={answer} className={`answer-button ${selected === answer ? 'selected' : ''}`} onClick={() => choose(answer)} role="radio" aria-checked={selected === answer} data-testid={`button-answer-${current}-${answer.toLowerCase().replaceAll(' ', '-')}`}>{answer}<Check size={16} /></button>)}
        </div>
        <div className="question-footer"><div className="question-progress" aria-label={`${current + 1} of ${questions.length} questions`}><i style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div><PrimaryButton onClick={next} testId="button-next-question" disabled={!selected}>{current === questions.length - 1 ? 'Finish check-in' : 'Next'} <ArrowRight size={15} /></PrimaryButton></div>
      </section>
      <VideoJournal pet={pet} />
    </div>
  );
}

function ChatView({ pet }: { pet: string }) {
  const guide = petGuidance[pet] || petGuidance.Baku;
  const [messages, setMessages] = useState<Message[]>([{ id: 1, from: 'vaani', text: `Hi, I’m ${pet}. ${guide.tips.chat}` }]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const send = (text = draft) => {
    const clean = text.trim();
    if (!clean || thinking) return;
    setMessages((current) => [...current, { id: Date.now(), from: 'user', text: clean }]);
    setDraft('');
    setThinking(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, from: 'vaani', text: clean.toLowerCase().includes('overwhelmed') ? `${pet} says: That sounds like a lot to hold. We can take one small piece at a time. What feels most urgent right now?` : `${pet} says: Thank you for putting that into words. Would it help to stay with the feeling, or look for one small next step?` }]);
      setThinking(false);
    }, 650);
  };
  return (
    <div className="screen-transition">
      <div className="page-heading"><div><p className="eyebrow">A quiet conversation with {pet}</p><h1 className="display-font">Talk it through.</h1><p>{pet} listens without rushing you. This is a local demo chat, not a crisis or medical service.</p></div></div>
      <div className="chat-layout">
        <section className="content-card chat-window" aria-label={`Conversation with ${pet}`}>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => <div key={message.id} className={`chat-message ${message.from === 'user' ? 'user' : ''}`} data-testid={`message-${message.from}-${message.id}`}>{message.text}</div>)}
            {thinking ? <div className="chat-message" data-testid="status-vaani-thinking">Taking a breath before I reply...</div> : null}
          </div>
          <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write what’s on your mind" aria-label="Message Vaani" data-testid="input-chat-message" />
            <button className="send-button" type="submit" aria-label="Send message" data-testid="button-send-message"><Send size={16} /></button>
          </form>
        </section>
        <aside className="content-card tinted">
          <div className="card-heading"><h2>Start gently</h2><Sparkles size={17} color="#95605f" /></div>
          <div className="prompt-list">{starterPrompts.map((prompt) => <button className="starter-prompt" key={prompt} onClick={() => send(prompt)} data-testid={`button-starter-${prompt.toLowerCase().replaceAll(' ', '-')}`}>{prompt}<ChevronRight size={14} style={{ float: 'right', marginTop: '2px' }} /></button>)}</div>
          <p className="muted-copy" style={{ fontSize: '.72rem', marginTop: '1.5rem' }}>If you are in immediate danger, contact your local emergency services or a trusted person.</p>
        </aside>
      </div>
    </div>
  );
}

function ResourcesView() {
  const resources = [
    { title: 'The small book of rest', copy: 'Short readings for when your mind needs less noise.', icon: BookOpen, action: 'Open the shelf' },
    { title: 'Five quiet minutes', copy: 'A guided pause to return to your breath and body.', icon: Moon, action: 'Begin meditation' },
    { title: 'Understanding feelings', copy: 'A friendly guide to naming what is moving through you.', icon: Leaf, action: 'Read the guide' },
    { title: 'A kinder inner voice', copy: 'Prompts for loosening the pressure you place on yourself.', icon: Heart, action: 'Explore prompts' },
  ];
  return (
    <div className="screen-transition">
      <div className="page-heading"><div><p className="eyebrow">Secondary features</p><h1 className="display-font">Keep a little light nearby.</h1><p>Browse gentle resources for the spaces between check-ins. Come back whenever you need.</p></div></div>
      <div className="resource-grid">
        {resources.map(({ title, copy, icon: Icon, action }) => <article className="resource-card" key={title}><div><div className="resource-art"><Icon size={27} /></div><h2>{title}</h2><p>{copy}</p></div><button className="button-link" onClick={() => window.alert(`${action} will be available in the next Vaani update.`)} data-testid={`button-resource-${title.toLowerCase().replaceAll(' ', '-')}`}>{action} <ChevronRight size={14} /></button></article>)}
      </div>
    </div>
  );
}

function PetGuide({ pet, activeTab }: { pet: string; activeTab: Tab }) {
  const guide = petGuidance[pet] || petGuidance.Baku;
  return (
    <section className="pet-guide" aria-label={`${pet} feature guide`}>
      <img src={petArtwork[pet]} alt="" className="pet-guide-image" />
      <div className="pet-guide-copy">
        <div className="pet-guide-name"><span className="eyebrow">Your companion</span><strong>{pet}</strong></div>
        <p>{activeTab === 'calendar' ? guide.welcome : guide.tips[activeTab]}</p>
        <span className="pet-guide-caption">A gentle note from {pet}</span>
      </div>
    </section>
  );
}

function WellbeingApp({ name, pet }: { name: string; pet: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('calendar');
  const [answersState, setAnswersState] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const tabContent = activeTab === 'calendar'
    ? <CalendarView name={name} pet={pet} onTab={setActiveTab} />
    : activeTab === 'questionnaire'
      ? <QuestionnaireView answersState={answersState} setAnswersState={setAnswersState} completed={completed} setCompleted={setCompleted} pet={pet} />
      : activeTab === 'chat' ? <ChatView pet={pet} /> : <ResourcesView />;
  return (
    <div className="app-layout vaani-app">
      <Sidebar activeTab={activeTab} onTab={setActiveTab} pet={pet} />
      <main className="app-main">
        <div className="app-topbar"><div className="mobile-brand"><Brand compact /></div><div className="profile-chip"><span className="profile-initial">{(name || 'S').slice(0, 1).toUpperCase()}</span><span>{name || 'Your space'}</span></div></div>
        <PetGuide pet={pet} activeTab={activeTab} />
        {tabContent}
      </main>
    </div>
  );
}

function Home() {
  const [flow, setFlow] = useState<Flow>('welcome');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'caregiver'>('student');
  const [school, setSchool] = useState('');
  const [admission, setAdmission] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [pet, setPet] = useState('Baku');
  const [caregiverName, setCaregiverName] = useState('');
  const [caregiverGender, setCaregiverGender] = useState('');
  const [caregiverAge, setCaregiverAge] = useState('');
  const [caregiverDocuments, setCaregiverDocuments] = useState<string[]>(['', '', '', '', '']);
  const [caregiverSlot, setCaregiverSlot] = useState('');

  if (flow === 'welcome') return <Welcome onContinue={() => setFlow('privacy')} />;
  if (flow === 'privacy') return <Privacy onContinue={() => setFlow('login')} />;
  if (flow === 'login') return <Login phone={loginPhone} setPhone={setLoginPhone} email={loginEmail} setEmail={setLoginEmail} role={loginRole} setRole={setLoginRole} onLogin={() => setFlow(loginRole === 'student' ? 'app' : 'caregiver-dashboard')} onSignUp={() => setFlow('role')} />;
  if (flow === 'role') return <RoleChoice onStudent={() => setFlow('school')} onCaregiver={() => setFlow('caregiver-details')} />;
  if (flow === 'caregiver-details') return <CaregiverDetailsStep name={caregiverName} setName={setCaregiverName} gender={caregiverGender} setGender={setCaregiverGender} age={caregiverAge} setAge={setCaregiverAge} onNext={() => setFlow('caregiver-docs')} onBack={() => setFlow('role')} />;
  if (flow === 'caregiver-docs') return <CaregiverDocuments documents={caregiverDocuments} setDocuments={setCaregiverDocuments} onNext={() => setFlow('caregiver-slots')} onBack={() => setFlow('caregiver-details')} />;
  if (flow === 'caregiver-slots') return <CaregiverAvailability slot={caregiverSlot} setSlot={setCaregiverSlot} onNext={() => setFlow('caregiver-dashboard')} onBack={() => setFlow('caregiver-docs')} />;
  if (flow === 'caregiver-dashboard') return <CaregiverDashboard name={caregiverName} slot={caregiverSlot} />;
  if (flow === 'school') return <SchoolStep school={school} setSchool={setSchool} admission={admission} setAdmission={setAdmission} onNext={() => setFlow('details')} onBack={() => setFlow('role')} onSkip={() => setFlow('details')} />;
  if (flow === 'details') return <DetailsStep name={name} setName={setName} gender={gender} setGender={setGender} age={age} setAge={setAge} onNext={() => setFlow('pet')} onBack={() => setFlow('school')} />;
  if (flow === 'pet') return <PetStep pet={pet} setPet={setPet} onNext={() => setFlow('app')} onBack={() => setFlow('details')} />;
  return <WellbeingApp name={name} pet={pet} />;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;