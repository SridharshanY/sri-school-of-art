"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  Eye,
  FileText,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareQuote,
  MoreHorizontal,
  Palette,
  Pencil,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import styles from "@/app/admin/admin.module.css";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "classes", label: "Classes", icon: BookOpen, count: 6 },
  { id: "workshops", label: "Workshops", icon: CalendarDays, count: 3 },
  { id: "gallery", label: "Gallery", icon: Image, count: 24 },
  { id: "registrations", label: "Registrations", icon: FileText, count: 12 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, count: 5 },
  { id: "enquiries", label: "Enquiries", icon: Inbox, count: 8 },
  { id: "announcements", label: "Announcements", icon: Megaphone, count: 2 },
  { id: "settings", label: "Site settings", icon: Settings }
];

const initialClasses = [
  {
    id: 1,
    name: "Drawing Foundations",
    group: "Ages 6–12",
    schedule: "Sat & Sun · 10:00 AM",
    fee: "₹1,800",
    seats: "5 seats",
    state: "Open"
  },
  {
    id: 2,
    name: "Watercolour Explorations",
    group: "Ages 10+",
    schedule: "Sunday · 4:00 PM",
    fee: "₹2,200",
    seats: "2 seats",
    state: "Open"
  },
  {
    id: 3,
    name: "Acrylic & Canvas",
    group: "Ages 13+",
    schedule: "Saturday · 3:00 PM",
    fee: "₹2,800",
    seats: "Full",
    state: "Full"
  },
  {
    id: 4,
    name: "Craft & Clay Studio",
    group: "Ages 6–11",
    schedule: "Saturday · 11:30 AM",
    fee: "₹2,000",
    seats: "8 seats",
    state: "Open"
  },
  {
    id: 5,
    name: "Adult Hobby Art",
    group: "Ages 18+",
    schedule: "Wednesday · 5:00 PM",
    fee: "₹2,400",
    seats: "4 seats",
    state: "Open"
  },
  {
    id: 6,
    name: "Portfolio Development",
    group: "Ages 13+",
    schedule: "By appointment",
    fee: "₹3,600",
    seats: "Draft",
    state: "Draft"
  }
];

const initialWorkshops = [
  {
    id: 1,
    name: "Monsoon Watercolour Landscapes",
    date: "02 Aug 2026",
    group: "Ages 12+",
    fee: "₹750",
    seats: 8,
    state: "Published"
  },
  {
    id: 2,
    name: "Independence Day Paper Craft",
    date: "15 Aug 2026",
    group: "Ages 6–11",
    fee: "₹450",
    seats: 12,
    state: "Published"
  },
  {
    id: 3,
    name: "Palette Knife Painting",
    date: "23 Aug 2026",
    group: "Ages 16+",
    fee: "₹950",
    seats: 6,
    state: "Draft"
  }
];

const galleryItems = [
  { id: 1, title: "Colourful Rainy Day", category: "Kids’ artwork", tone: "yellow" },
  { id: 2, title: "Quiet Afternoon", category: "Paintings", tone: "purple" },
  { id: 3, title: "Botanical Calm", category: "Watercolour", tone: "mint" },
  { id: 4, title: "Clay Garden Friends", category: "Craft projects", tone: "coral" },
  { id: 5, title: "City at Sunset", category: "Paintings", tone: "sky" },
  { id: 6, title: "Festival Lanterns", category: "Workshop photos", tone: "pink" }
];

const initialRegistrations = [
  {
    id: "SSA-1042",
    name: "Aarav K.",
    detail: "Age 9 · Drawing Foundations",
    date: "Today, 10:42 AM",
    status: "New"
  },
  {
    id: "SSA-1041",
    name: "Meera S.",
    detail: "Adult · Watercolour Explorations",
    date: "Today, 9:15 AM",
    status: "Contacted"
  },
  {
    id: "SSA-1040",
    name: "Pranav R.",
    detail: "Age 14 · Portfolio Development",
    date: "Yesterday",
    status: "Trial booked"
  },
  {
    id: "SSA-1039",
    name: "Nila M.",
    detail: "Age 7 · Craft & Clay Studio",
    date: "29 Jul 2026",
    status: "Enrolled"
  }
];

const testimonials = [
  {
    id: 1,
    quote:
      "The classes are patient, joyful and thoughtfully structured. My child looks forward to every weekend.",
    author: "Parent of a young learner",
    state: "Published"
  },
  {
    id: 2,
    quote:
      "I learned how to develop my own ideas instead of simply copying a picture.",
    author: "Teen learner",
    state: "Published"
  },
  {
    id: 3,
    quote:
      "The pace felt comfortable, and finishing my first canvas was genuinely special.",
    author: "Adult beginner",
    state: "Draft"
  }
];

const enquiries = [
  {
    id: 1,
    person: "Kavitha",
    subject: "Weekend batch for an 8-year-old",
    channel: "Google Form",
    time: "18 minutes ago",
    unread: true
  },
  {
    id: 2,
    person: "Rahul",
    subject: "Adult acrylic class availability",
    channel: "WhatsApp",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    person: "Priya",
    subject: "Birthday art workshop enquiry",
    channel: "Google Form",
    time: "Yesterday",
    unread: false
  }
];

const announcements = [
  {
    id: 1,
    title: "New August weekend batches",
    detail: "Shown on the homepage announcement bar.",
    state: "Live"
  },
  {
    id: 2,
    title: "Holiday camp registrations opening soon",
    detail: "Scheduled for 05 August 2026.",
    state: "Scheduled"
  }
];

const viewCopy = {
  dashboard: {
    title: "Good morning, Sri.",
    description: "Here’s what is happening across the school today."
  },
  classes: {
    title: "Classes",
    description: "Manage courses, fees, batches and seat availability."
  },
  workshops: {
    title: "Workshops & events",
    description: "Create and publish camps, workshops and special sessions."
  },
  gallery: {
    title: "Gallery",
    description: "Organise the artwork and activity photos shown publicly."
  },
  registrations: {
    title: "Registrations",
    description: "Review trial-class and course registration requests."
  },
  testimonials: {
    title: "Testimonials",
    description: "Review and publish approved student and parent feedback."
  },
  enquiries: {
    title: "Enquiries",
    description: "Track questions received through forms and WhatsApp."
  },
  announcements: {
    title: "Announcements",
    description: "Control important notices displayed on the public website."
  },
  settings: {
    title: "Site settings",
    description: "Preview the contact, social and general website controls."
  }
};

function StatusPill({ children, state }) {
  const normalized = state.toLowerCase().replaceAll(" ", "-");
  return (
    <span className={`${styles.status} ${styles[`status_${normalized}`] || ""}`}>
      <span />
      {children}
    </span>
  );
}

function EmptyAction({ icon: Icon, title, text, action, onClick }) {
  return (
    <div className={styles.emptyAction}>
      <span className={styles.emptyIcon}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <button type="button" className={styles.secondaryButton} onClick={onClick}>
        {action}
      </button>
    </div>
  );
}

export default function AdminPortal() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [classes, setClasses] = useState(initialClasses);
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [gallery, setGallery] = useState(galleryItems);
  const [toast, setToast] = useState("");

  const currentCopy = viewCopy[activeView];

  const filteredClasses = useMemo(
    () =>
      classes.filter((item) =>
        `${item.name} ${item.group} ${item.schedule}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [classes, query]
  );

  const filteredRegistrations = useMemo(
    () =>
      registrations.filter((item) =>
        `${item.name} ${item.detail} ${item.id}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [registrations, query]
  );

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function changeView(id) {
    setActiveView(id);
    setSidebarOpen(false);
    setQuery("");
  }

  function addClass() {
    setClasses((items) => [
      {
        id: Date.now(),
        name: "New creative course",
        group: "Age group TBD",
        schedule: "Timing TBD",
        fee: "Fee TBD",
        seats: "Draft",
        state: "Draft"
      },
      ...items
    ]);
    notify("Draft class added for this demo session.");
  }

  function toggleClass(id) {
    setClasses((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              state: item.state === "Full" ? "Open" : "Full",
              seats: item.state === "Full" ? "6 seats" : "Full"
            }
          : item
      )
    );
    notify("Batch availability updated locally.");
  }

  function addWorkshop() {
    setWorkshops((items) => [
      ...items,
      {
        id: Date.now(),
        name: "Untitled creative workshop",
        date: "Date TBD",
        group: "All ages",
        fee: "Fee TBD",
        seats: 10,
        state: "Draft"
      }
    ]);
    notify("Draft workshop added for this demo session.");
  }

  function addGalleryItem() {
    const tones = ["yellow", "purple", "mint", "coral", "sky", "pink"];
    setGallery((items) => [
      {
        id: Date.now(),
        title: "New uploaded artwork",
        category: "Uncategorised",
        tone: tones[items.length % tones.length]
      },
      ...items
    ]);
    notify("Placeholder artwork added locally.");
  }

  function updateRegistration(id, status) {
    setRegistrations((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item))
    );
    notify(`Registration ${id} marked “${status}”.`);
  }

  function renderDashboard() {
    return (
      <>
        <section className={styles.metricsGrid} aria-label="School overview">
          {[
            {
              label: "Active learners",
              value: "128",
              note: "+12 this month",
              icon: UsersRound,
              tone: "purple"
            },
            {
              label: "New registrations",
              value: "12",
              note: "4 need a response",
              icon: FileText,
              tone: "coral"
            },
            {
              label: "Available batches",
              value: "9",
              note: "2 almost full",
              icon: Clock3,
              tone: "yellow"
            },
            {
              label: "Monthly fees",
              value: "₹84.6K",
              note: "Placeholder total",
              icon: CircleDollarSign,
              tone: "mint"
            }
          ].map((metric) => (
            <article className={styles.metricCard} key={metric.label}>
              <span className={`${styles.metricIcon} ${styles[metric.tone]}`}>
                <metric.icon size={21} aria-hidden="true" />
              </span>
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </article>
          ))}
        </section>

        <div className={styles.dashboardGrid}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.kicker}>Today</p>
                <h2>Class schedule</h2>
              </div>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => changeView("classes")}
              >
                View all <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.scheduleList}>
              {[
                {
                  time: "10:00",
                  period: "AM",
                  name: "Drawing Foundations",
                  meta: "Kids Studio · 8 learners",
                  tone: "yellow"
                },
                {
                  time: "03:00",
                  period: "PM",
                  name: "Acrylic & Canvas",
                  meta: "Main Studio · Batch full",
                  tone: "coral"
                },
                {
                  time: "05:00",
                  period: "PM",
                  name: "Adult Hobby Art",
                  meta: "Studio 2 · 6 learners",
                  tone: "purple"
                }
              ].map((item) => (
                <article className={styles.scheduleItem} key={item.name}>
                  <div className={styles.scheduleTime}>
                    <strong>{item.time}</strong>
                    <small>{item.period}</small>
                  </div>
                  <span className={`${styles.scheduleMarker} ${styles[item.tone]}`} />
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.meta}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`Options for ${item.name}`}
                    onClick={() => notify("Schedule options are a demo placeholder.")}
                  >
                    <MoreHorizontal size={19} aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.kicker}>Attention</p>
                <h2>Things to review</h2>
              </div>
            </div>
            <div className={styles.reviewList}>
              <EmptyAction
                icon={Inbox}
                title="4 unanswered enquiries"
                text="Oldest received yesterday"
                action="Review"
                onClick={() => changeView("enquiries")}
              />
              <EmptyAction
                icon={MessageSquareQuote}
                title="1 testimonial awaiting approval"
                text="Consent status needs confirmation"
                action="Review"
                onClick={() => changeView("testimonials")}
              />
              <EmptyAction
                icon={BookOpen}
                title="Acrylic batch is full"
                text="Waitlist has 3 learners"
                action="Manage"
                onClick={() => changeView("classes")}
              />
            </div>
          </section>
        </div>

        <section className={styles.panel}>
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.kicker}>Latest activity</p>
              <h2>Recent registrations</h2>
            </div>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => changeView("registrations")}
            >
              View all <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
          {renderRegistrationTable(registrations.slice(0, 4), false)}
        </section>
      </>
    );
  }

  function renderClassTable() {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Course catalogue</p>
            <h2>{classes.length} classes</h2>
          </div>
          <button type="button" className={styles.primaryButton} onClick={addClass}>
            <Plus size={17} aria-hidden="true" /> Add class
          </button>
        </div>
        <div className={styles.tableWrap}>
          <div style={{ padding: "0 0 18px" }}>
            <Link className={styles.primaryButton} href="/admin/classes/">
              Manage live Supabase classes <ExternalLink size={16} aria-hidden="true" />
            </Link>
          </div>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Class</th>
                <th>Schedule</th>
                <th>Fee</th>
                <th>Availability</th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.group}</small>
                  </td>
                  <td>{item.schedule}</td>
                  <td>{item.fee}</td>
                  <td>{item.seats}</td>
                  <td>
                    <StatusPill state={item.state}>{item.state}</StatusPill>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label={`Edit ${item.name}`}
                        onClick={() => notify("Edit form is a demo placeholder.")}
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label={`Toggle availability for ${item.name}`}
                        onClick={() => toggleClass(item.id)}
                      >
                        <Eye size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.iconButton} ${styles.dangerButton}`}
                        aria-label={`Delete ${item.name}`}
                        onClick={() => {
                          setClasses((items) =>
                            items.filter((course) => course.id !== item.id)
                          );
                          notify("Class removed from this demo session.");
                        }}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  function renderWorkshops() {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Events calendar</p>
            <h2>Upcoming workshops</h2>
          </div>
          <button type="button" className={styles.primaryButton} onClick={addWorkshop}>
            <Plus size={17} aria-hidden="true" /> Create workshop
          </button>
        </div>
        <div className={styles.workshopGrid}>
          {workshops.map((item) => (
            <article className={styles.workshopCard} key={item.id}>
              <div className={styles.workshopDate}>
                <CalendarDays size={19} aria-hidden="true" />
                {item.date}
              </div>
              <StatusPill state={item.state}>{item.state}</StatusPill>
              <h3>{item.name}</h3>
              <p>
                {item.group} · {item.fee}
              </p>
              <div className={styles.workshopFooter}>
                <span>
                  <UsersRound size={16} aria-hidden="true" /> {item.seats} seats
                </span>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => notify("Workshop editor is a demo placeholder.")}
                >
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderGallery() {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Media library</p>
            <h2>Student artwork</h2>
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={addGalleryItem}
          >
            <Upload size={17} aria-hidden="true" /> Upload artwork
          </button>
        </div>
        <div className={styles.galleryAdminGrid}>
          {gallery.map((item, index) => (
            <article className={styles.galleryAdminCard} key={item.id}>
              <div
                className={`${styles.galleryPlaceholder} ${styles[item.tone]}`}
              >
                {index % 2 === 0 ? (
                  <Palette size={34} aria-hidden="true" />
                ) : (
                  <Sparkles size={34} aria-hidden="true" />
                )}
              </div>
              <div>
                <strong>{item.title}</strong>
                <p>{item.category}</p>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                aria-label={`Options for ${item.title}`}
                onClick={() => notify("Gallery options are a demo placeholder.")}
              >
                <MoreHorizontal size={18} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderRegistrationTable(items, showHeading = true) {
    return (
      <>
        {showHeading && (
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.kicker}>Enrolment pipeline</p>
              <h2>{registrations.length} registration requests</h2>
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => notify("CSV export is a demo placeholder.")}
            >
              Export CSV
            </button>
          </div>
        )}
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Learner</th>
                <th>Received</th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.id}</strong>
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.detail}</small>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={item.status}
                      onChange={(event) =>
                        updateRegistration(item.id, event.target.value)
                      }
                      aria-label={`Status for ${item.name}`}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Trial booked</option>
                      <option>Enrolled</option>
                      <option>Closed</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.iconButton}
                      aria-label={`View ${item.name} registration`}
                      onClick={() => notify("Registration details are demo data.")}
                    >
                      <ChevronRight size={18} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function renderTestimonials() {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Social proof</p>
            <h2>Student and parent reviews</h2>
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => notify("Testimonial form is a demo placeholder.")}
          >
            <Plus size={17} aria-hidden="true" /> Add testimonial
          </button>
        </div>
        <div className={styles.testimonialAdminGrid}>
          {testimonials.map((item) => (
            <article className={styles.testimonialAdminCard} key={item.id}>
              <MessageSquareQuote size={24} aria-hidden="true" />
              <blockquote>“{item.quote}”</blockquote>
              <div>
                <strong>{item.author}</strong>
                <StatusPill state={item.state}>{item.state}</StatusPill>
              </div>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => notify("Publication status changed locally.")}
              >
                {item.state === "Published" ? "Unpublish" : "Publish"}
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderEnquiries() {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Inbox</p>
            <h2>Recent enquiries</h2>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => notify("All enquiries marked as read locally.")}
          >
            <Check size={16} aria-hidden="true" /> Mark all read
          </button>
        </div>
        <div className={styles.enquiryList}>
          {enquiries.map((item) => (
            <article
              className={`${styles.enquiryItem} ${
                item.unread ? styles.enquiryUnread : ""
              }`}
              key={item.id}
            >
              <span className={styles.avatar}>{item.person.charAt(0)}</span>
              <div>
                <strong>{item.person}</strong>
                <p>{item.subject}</p>
                <small>
                  {item.channel} · {item.time}
                </small>
              </div>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => notify("Reply composer is a demo placeholder.")}
              >
                Reply
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderAnnouncements() {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Public notices</p>
            <h2>Announcements</h2>
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => notify("Announcement composer is a demo placeholder.")}
          >
            <Plus size={17} aria-hidden="true" /> New announcement
          </button>
        </div>
        <div className={styles.announcementList}>
          {announcements.map((item) => (
            <article className={styles.announcementCard} key={item.id}>
              <span className={styles.announcementIcon}>
                <Megaphone size={20} aria-hidden="true" />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
              <StatusPill state={item.state}>{item.state}</StatusPill>
              <button
                type="button"
                className={styles.iconButton}
                aria-label={`Edit ${item.title}`}
                onClick={() => notify("Announcement editor is a demo placeholder.")}
              >
                <Pencil size={16} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderSettings() {
    return (
      <form
        className={styles.settingsGrid}
        onSubmit={(event) => {
          event.preventDefault();
          notify("Settings saved for this demo session.");
        }}
      >
        <section className={styles.panel}>
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.kicker}>School details</p>
              <h2>Public contact information</h2>
            </div>
          </div>
          <div className={styles.formGrid}>
            <label>
              <span>School name</span>
              <input defaultValue="Sri School of Art" />
            </label>
            <label>
              <span>WhatsApp number</span>
              <input defaultValue="+91 99761 46493" />
            </label>
            <label>
              <span>Phone number</span>
              <input placeholder="Add verified phone number" />
            </label>
            <label>
              <span>Email address</span>
              <input type="email" placeholder="Add monitored email address" />
            </label>
            <label className={styles.fullField}>
              <span>Studio address</span>
              <textarea
                rows="3"
                placeholder="Add the complete verified studio address"
              />
            </label>
          </div>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.kicker}>Website controls</p>
              <h2>Visibility and integrations</h2>
            </div>
          </div>
          <div className={styles.settingRows}>
            {[
              ["Show seat availability", "Display remaining seats on course cards"],
              ["Accept trial requests", "Keep registration calls-to-action active"],
              ["Show WhatsApp button", "Display the floating WhatsApp shortcut"],
              ["Publish Google Form", "Embed the connected enquiry form"]
            ].map(([title, detail]) => (
              <label className={styles.toggleRow} key={title}>
                <span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </span>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleTrack} aria-hidden="true" />
              </label>
            ))}
          </div>
          <button type="submit" className={styles.primaryButton}>
            Save demo settings
          </button>
        </section>
      </form>
    );
  }

  function renderActiveView() {
    switch (activeView) {
      case "classes":
        return renderClassTable();
      case "workshops":
        return renderWorkshops();
      case "gallery":
        return renderGallery();
      case "registrations":
        return (
          <section className={styles.panel}>
            {renderRegistrationTable(filteredRegistrations)}
          </section>
        );
      case "testimonials":
        return renderTestimonials();
      case "enquiries":
        return renderEnquiries();
      case "announcements":
        return renderAnnouncements();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  }

  return (
    <div className={styles.adminRoot}>
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <Palette size={23} aria-hidden="true" />
          </span>
          <span>
            <strong>Sri</strong>
            <small>School of Art · Admin</small>
          </span>
          <button
            type="button"
            className={styles.closeSidebar}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close admin navigation"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.demoBadge}>
          <Sparkles size={16} aria-hidden="true" />
          <span>
            <strong>Static demo mode</strong>
            <small>Changes reset on refresh</small>
          </span>
        </div>

        <nav className={styles.adminNav} aria-label="Admin sections">
          {navigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeView === item.id ? styles.navActive : ""}
              onClick={() => changeView(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <item.icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
              {item.count ? <small>{item.count}</small> : null}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank">
            <ExternalLink size={17} aria-hidden="true" />
            View public website
          </Link>
          <div className={styles.adminProfile}>
            <span>
              <UserRound size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>School administrator</strong>
              <small>Demo account</small>
            </div>
          </div>
          <form action="/auth/signout/" method="post">
            <button className={styles.signOutButton} type="submit">
              <LogOut size={17} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className={styles.sidebarBackdrop}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close admin navigation"
        />
      )}

      <div className={styles.adminWorkspace}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open admin navigation"
          >
            <Menu size={21} aria-hidden="true" />
          </button>
          <div className={styles.searchBox}>
            <Search size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this section"
              aria-label="Search current admin section"
            />
          </div>
          <div className={styles.topbarActions}>
            <span className={styles.savedState}>
              <Check size={15} aria-hidden="true" /> Demo ready
            </span>
            <button
              type="button"
              className={styles.notificationButton}
              aria-label="View notifications"
              onClick={() => notify("You have 3 placeholder notifications.")}
            >
              <Bell size={19} aria-hidden="true" />
              <span>3</span>
            </button>
          </div>
        </header>

        <main className={styles.adminMain} id="main-content">
          <div className={styles.pageHeading}>
            <div>
              <p className={styles.breadcrumb}>
                Admin portal <ChevronRight size={14} aria-hidden="true" />{" "}
                {activeView === "dashboard" ? "Overview" : currentCopy.title}
              </p>
              <h1>{currentCopy.title}</h1>
              <p>{currentCopy.description}</p>
            </div>
            {activeView === "dashboard" && (
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => changeView("classes")}
              >
                <Plus size={17} aria-hidden="true" /> Quick add
              </button>
            )}
          </div>
          {renderActiveView()}
        </main>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          <Check size={17} aria-hidden="true" />
          {toast}
        </div>
      )}
    </div>
  );
}
