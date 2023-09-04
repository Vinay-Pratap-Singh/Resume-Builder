// interface for personal details
export interface IpersonalDetails {
  fullName: string;
  phoneNumber: string;
  city: string;
  state: string;
  languages: {
    language: string;
  }[];
  interests: {
    hobby: string;
  }[];
  skills: {
    name: string;
  }[];
  role: string;
  bio: string;
}

// interface for educational details
export interface IeducationalDetails {
  highSchool: {
    name: string;
    startDate: Date;
    endDate: Date;
  };
  intermediate: {
    name: string;
    startDate: Date;
    endDate: Date;
  };
  graduation?: {
    name: string;
    startDate: Date;
    endDate: Date | string;
  };
  postGraduation?: {
    name: string;
    startDate: Date;
    endDate: Date | string;
  };
}

// interface for individual project
export interface Iproject {
  projectName: string;
  projectTechnology: string;
  projectDescription: string;
}

// interface for individual certificates
export interface Icertificate {
  certificateName: string;
  certificateLink: string;
}

// interface for social links
export interface IsocialLinks {
  github: string;
  linkedin: string;
  email: string;
  portfolio?: string;
}

// interface for preview data
export interface IpreviewData {
  personalDetails: IpersonalDetails;
  educationalDetails: IeducationalDetails;
  projects: Iproject;
  certificate: Icertificate;
  socialLinks: IsocialLinks;
}
