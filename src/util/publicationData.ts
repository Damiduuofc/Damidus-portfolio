export interface ResearchHighlight {
  title: string;
  description: string;
  metric?: string;
}

export interface PublicationPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface PublicationItem {
  id: string;
  paperId?: string;
  title: string;
  shortTitle?: string;
  publisher: string;
  conferenceName: string;
  publicationDate: string;
  authors: {
    name: string;
    role?: string;
    isMainAuthor?: boolean;
    email?: string;
  }[];
  department: string;
  faculty: string;
  institution: string;
  country: string;
  contactEmail: string;
  abstract: string;
  overview: string;
  keywords: string[];
  highlights: ResearchHighlight[];
  bibtex: string;
  status: string;
  pdfLink?: string;
  doiLink?: string;
  photos?: PublicationPhoto[];
}

export const publicationsData: PublicationItem[] = [
  {
    id: "cctv-pre-crime-2026",
    paperId: "NPAIRC/SL/OP/172",
    title:
      "Artificial Intelligence-Based Violence and Suspicious Human Behaviour Detection in CCTV Surveillance Systems for Pre-Crime Analysis",
    shortTitle: "AI CCTV Pre-Crime Surveillance",
    publisher: "National Police Academy Sri Lanka",
    conferenceName: "International Research Conference of National Police Academy Sri Lanka (NPAIRC)",
    publicationDate: "31 August 2026",
    status: "Conference Paper",
    department: "Department of Information Technology",
    faculty: "Faculty of Computing",
    institution: "General Sir John Kotelawala Defence University",
    country: "Sri Lanka",
    contactEmail: "42-bis-0016@kdu.ac.lk",
    authors: [
      {
        name: "DDT Abeysinghe",
        role: "Primary & Corresponding Author",
        isMainAuthor: true,
        email: "42-bis-0016@kdu.ac.lk",
      },
      {
        name: "DD Ellegooda",
        role: "Co-Author",
        isMainAuthor: false,
      },
      {
        name: "WAAM Waniarachchi",
        role: "Co-Author",
        isMainAuthor: false,
      },
    ],
    overview:
      "Traditional CCTV surveillance remains operator-dependent, slow to respond, and treats weapon detection and violence recognition separately. This research conducts a PRISMA-guided systematic review of 493 studies and establishes a unified conceptual multi-threat framework designed for real-time edge intelligence and bias mitigation in pre-crime analysis.",
    abstract:
      "Traditional CCTV systems remain operator-dependent and are susceptible to operator fatigue and slow response. Existing solutions treat weapon detection and violence recognition separately, reducing performance under challenging conditions such as occlusion, motion blur, dynamic lighting variations, while limiting their ability to handle multiple security threats simultaneously. This study conducted a systematic literature review to identify AI-based CCTV surveillance systems for detecting weapons, violence, and suspicious human behavior and propose a conceptual framework for pre-crime analysis. Following PRISMA guidelines, studies published between 2018 to 2026 on AI-based CCTV surveillance for weapons, violence, and suspicious activities detection were identified, there were 493 documents found from IEEE Xplore, Google Scholar, Scopus, and Springer Link. After duplicates removal and screening, eligible studies were selected for qualitative synthesis. Findings demonstrate the dominant of YOLO-based detectors and CNN models, followed by CNN-BiLSTM, transformer-based architectures, attention mechanisms, and lightweight hardware optimized models. None of the reviewed architectures simultaneously detect weapons and recognize violent behaviour within a unified edge-optimized pipeline for pre-crime analysis. Furthermore, limited research addresses historical biases in predictive policing datasets. Based on these findings, this study proposes a conceptual multi-threat framework comprising lightweight object detection for spatial analysis, temporal behaviour recognition, feature fusion, and urban digital twin-assisted bias mitigation. Finally, the study discusses the practical integration of edge-AI surveillance within available Sri Lankan CCTV and communication infrastructures, considering computational cost, power constraints, and privacy considerations. The research provides a PRISMA-based evidence map and a scalable approach for responsible intelligent surveillance.",
    keywords: [
      "Pre-Crime Analysis",
      "Multi-Threat Detection",
      "CCTV Surveillance",
      "Systematic Literature Review",
      "Edge Intelligence",
      "Bias Mitigation",
    ],
    highlights: [
      {
        title: "PRISMA Literature Review",
        metric: "15 Included (493 Identified)",
        description:
          "Systematic evaluation across IEEE Xplore, Google Scholar, Scopus, and SpringerLink synthesizing state-of-the-art vision models.",
      },
      {
        title: "Unified Multi-Threat Pipeline",
        metric: "Spatial + Temporal",
        description:
          "Fuses lightweight YOLO/CNN spatial detection with temporal CNN-BiLSTM & transformer behaviour analysis into a single edge pipeline.",
      },
      {
        title: "Urban Digital Twin Bias Mitigation",
        metric: "Fairness-Aware",
        description:
          "Tackles historical data disparities and demographic biases in predictive policing through baseline reweighing to prevent over-policing.",
      },
      {
        title: "Edge-AI Feasibility in Sri Lanka",
        metric: "Low-Power Edge",
        description:
          "Optimized for real-world deployment across local CCTV networks, balancing low latency, power constraints, and privacy compliance.",
      },
    ],
    photos: [
      {
        src: "/images/research/npairc-2026-conference.webp",
        alt: "Damidu Abeysinghe at the NPAIRC 2026 International Research Conference, National Police Academy",
        caption: "At NPAIRC 2026, National Police Academy",
      },
      {
        src: "/images/research/npairc-2026-proceedings.webp",
        alt: "The paper's abstract printed in the NPAIRC 2026 conference proceedings, paper NPAIRC/SL/OP/172",
        caption: "Published in the conference proceedings",
      },
    ],
    bibtex: `@inproceedings{abeysinghe2026violence,
  title={Artificial Intelligence-Based Violence and Suspicious Human Behaviour Detection in CCTV Surveillance Systems for Pre-Crime Analysis},
  author={Abeysinghe, D. D. T. and Ellegooda, D. D. and Waniarachchi, W. A. A. M.},
  booktitle={Proceedings of the International Research Conference of National Police Academy Sri Lanka (NPAIRC)},
  year={2026},
  month={August},
  day={31},
  address={Sri Lanka},
  organization={General Sir John Kotelawala Defence University & National Police Academy Sri Lanka}
}`,
  },
];
