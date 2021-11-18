import { ReactNode } from "react";

export interface TimelineEntryType {
  startDate: Date;
  endDate: Date | "Today";
  position: string;
  companyLogoPath: string;
  description: ReactNode;
  technologies: string[];
}

export const TimelineEntries: TimelineEntryType[] = [
  {
    startDate: new Date("2019-01-06"),
    endDate: "Today",
    position: 'Senior IT Consultant',
    companyLogoPath: "",
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2018-01-04"),
    endDate: new Date("2019-31-05"),
    position: 'Team Leader - Virtual Commissioning',
    companyLogoPath: "",
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2015-01-02"),
    endDate: new Date("2018-30-04"),
    position: 'Virtual Commissioning Engineer',
    companyLogoPath: "",
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2014-01-02"),
    endDate: new Date("2014-30-08"),
    position: 'Intership and Bachelor Thesis',
    companyLogoPath: "",
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
];
