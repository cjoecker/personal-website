import { ReactNode } from "react";

export interface TimelineEntryType {
  startDate: Date;
  endDate: Date | "Today";
  company: string;
  position: string;
  description: ReactNode;
  technologies: string[];
}

export const TimelineEntries: TimelineEntryType[] = [
  {
    startDate: new Date("2019-01-06"),
    endDate: "Today",
    company: "MaibornWolff",
    position: 'Senior IT Consultant',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2018-01-04"),
    endDate: new Date("2019-31-05"),
    company: "KUKA",
    position: 'Team Leader - Virtual Commissioning',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2015-01-02"),
    endDate: new Date("2018-30-04"),
    company: "KUKA",
    position: 'Virtual Commissioning Engineer',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2014-01-02"),
    endDate: new Date("2014-30-08"),
    company: "Schmalz",
    position: 'Intership and Bachelor Thesis',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
];
