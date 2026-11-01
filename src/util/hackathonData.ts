export interface HackathonPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface HackathonItem {
  id: string;
  event: string;
  fullName: string;
  organizer: string;
  year: string;
  result: string;
  teamName: string;
  teammates: string[];
  description: string;
  tags: string[];
  photos: HackathonPhoto[];
}

export const hackathonData: HackathonItem[] = [
  {
    id: "cre8x-3-2026",
    event: "Cre8X 3.0",
    fullName: "National Level Inter-University UI/UX Designathon 2026",
    organizer: "BCS Student Chapter, General Sir John Kotelawala Defence University",
    year: "2026",
    result: "Finalist · Top 10",
    teamName: "Beyond Interface",
    teammates: ["Dunya Ellegoda", "Sanduni Perera", "Harindu Hansana"],
    description:
      "Competed as team Beyond Interface against universities across Sri Lanka and reached the Grand Finale, placing among the Top 10 teams. Recognised for creativity, innovative design thinking, and dedication throughout the Cre8X 3.0 journey.",
    tags: ["UI/UX Design", "Design Thinking", "Prototyping", "Teamwork"],
    photos: [
      {
        src: "/images/hackathons/cre8x-team.jpg",
        alt: "Team Beyond Interface standing in front of the Cre8X 3.0 banner",
        caption: "Team Beyond Interface",
      },
      {
        src: "/images/hackathons/cre8x-award.jpg",
        alt: "Receiving the finalist recognition on stage at Cre8X 3.0",
        caption: "Recognition of finalist teams",
      },
      {
        src: "/images/hackathons/cre8x-finalists.jpg",
        alt: "Team Beyond Interface on stage holding finalist certificates",
        caption: "Grand Finale — Top 10",
      },
      {
        src: "/images/hackathons/cre8x-certificate.jpg",
        alt: "Cre8X 3.0 certificate of achievement awarded to Damidu Abeysinghe",
        caption: "Certificate of achievement",
      },
      {
        src: "/images/hackathons/cre8x-stage.jpg",
        alt: "The Cre8X 3.0 stage at General Sir John Kotelawala Defence University",
        caption: "The Cre8X 3.0 stage",
      },
      {
        src: "/images/hackathons/cre8x-participants.jpg",
        alt: "Group photo of all Cre8X 3.0 participants on stage",
        caption: "All participants",
      },
    ],
  },
];
