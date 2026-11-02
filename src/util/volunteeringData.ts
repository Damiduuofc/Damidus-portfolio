export interface VolunteerRole {
  title: string;
  period: string;
}

export interface VolunteerOrg {
  id: string;
  name: string;
  logo: string;
  /** Round / square badge: drawn taller so it matches the wide wordmarks visually */
  badge?: boolean;
  roles: VolunteerRole[];
}

// Newest first; an org with several roles shows them all in its hover card
export const volunteeringData: VolunteerOrg[] = [
  {
    id: "cssl-genz-kdu",
    name: "CSSL GenZ Chapter KDU",
    logo: "/volunteering/cssl.webp",
    roles: [
      { title: "Asst. Designing Team Lead", period: "2026 – Present" },
      { title: "Designing Team", period: "2025 – 2026" },
    ],
  },
  {
    id: "ieee-cs-kdu",
    name: "IEEE Computer Society of KDU",
    logo: "/volunteering/ieee-cs-kdu.webp",
    roles: [{ title: "Industry Engagement Team", period: "2026 – Present" }],
  },
  {
    id: "rotaract-kdusc",
    name: "Rotaract Club of KDUSC",
    logo: "/volunteering/rotaract.webp",
    roles: [{ title: "Editor", period: "2025 – 2026" }],
  },
  {
    id: "rajans-photography",
    name: "Rajans Photography",
    logo: "/volunteering/rajans-photography.webp",
    badge: true,
    roles: [
      { title: "President", period: "2022 – 2023" },
      { title: "Editor", period: "2019 – 2022" },
    ],
  },
  {
    id: "interact-dharmaraja",
    name: "Interact Club of Dharmaraja College",
    logo: "/volunteering/interact.webp",
    roles: [{ title: "Editor", period: "2021 – 2022" }],
  },
];
