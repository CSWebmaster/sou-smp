export type GalleryItem = {
  imageUrl: string;
  caption: string;
  description: string;
};

export type JourneyItem = {
  id: string;
  title: string;
  details: string;
  description: string;
  imageUrl: string;
  year?: string;
  gallery?: GalleryItem[];
};

export const journeyItems: JourneyItem[] = [
  {
    id: "1",
    title: "Foundation",
    details: "IEEE SOUSB was founded with a vision to empower students in systems, operations, and utility management.",
    description: "In 2015, a group of passionate students came together to establish IEEE SOUSB, envisioning a platform where students could collaborate and grow in the fields of systems, operations, and utility management.",
    imageUrl: "/images/journey/foundation.jpg",
    year: "2015",
    gallery: [],
  },
  {
    id: "2",
    title: "First Members",
    details: "Our community grew as more passionate students joined us to share knowledge and experiences.",
    description: "The organization quickly attracted like-minded individuals who shared a passion for learning and innovation. Our first year saw tremendous growth in membership and engagement.",
    imageUrl: "/images/journey/first-members.jpg",
    year: "2016",
    gallery: [],
  },
  {
    id: "3",
    title: "Workshops Begin",
    details: "We started hosting regular workshops to educate and inspire our members on emerging technologies.",
    description: "We launched our flagship workshop series, bringing experts and industry professionals to share insights on cutting-edge technologies and best practices in systems management.",
    imageUrl: "/images/journey/workshops.jpg",
    year: "2017",
    gallery: [],
  },
  {
    id: "4",
    title: "Campus Recognition",
    details: "SOUSB gained official recognition from the university and expanded its initiatives campus-wide.",
    description: "Our dedication and impact led to official university recognition. We expanded our presence across campus and established ourselves as a key student organization.",
    imageUrl: "/images/journey/recognition.jpg",
    year: "2018",
    gallery: [],
  },
  {
    id: "5",
    title: "Regional Events",
    details: "We organized our first regional conference, bringing together professionals and students from multiple institutions.",
    description: "Our first regional conference was a major milestone, attracting participants from universities and companies across the region. This event solidified our position as a thought leader in our field.",
    imageUrl: "/images/journey/regional.jpg",
    year: "2019",
    gallery: [],
  },
  {
    id: "6",
    title: "Digital Transformation",
    details: "We adapted and thrived during challenging times by moving our programs online and reaching a global audience.",
    description: "Despite unforeseen challenges, we rapidly adapted our programs to a digital format, reaching students and professionals globally and expanding our community beyond geographical boundaries.",
    imageUrl: "/images/journey/digital.jpg",
    year: "2021",
    gallery: [],
  },
  {
    id: "7",
    title: "Industry Partnerships",
    details: "We established partnerships with leading tech companies to provide internships and mentorship opportunities.",
    description: "We forged strategic partnerships with industry leaders to create internship and mentorship programs. This opened doors for our members to gain real-world experience and career opportunities.",
    imageUrl: "/images/journey/partnerships.jpg",
    year: "2022",
    gallery: [],
  },
  {
    id: "8",
    title: "Research Initiatives",
    details: "We launched research projects addressing real-world challenges in systems and utility operations.",
    description: "Our members began conducting meaningful research addressing real-world challenges. These projects showcased the practical impact of our community's expertise and innovation.",
    imageUrl: "/images/journey/research.jpg",
    year: "2023",
    gallery: [],
  },
  {
    id: "9",
    title: "Global Community",
    details: "Today, IEEE SOUSB continues to grow, building a global community of innovators and leaders.",
    description: "Today, IEEE SOUSB stands as a thriving global community of students, professionals, and leaders committed to advancing systems, operations, and utility management through collaboration and innovation.",
    imageUrl: "/images/journey/community.jpg",
    year: "2024",
    gallery: [],
  },
];
