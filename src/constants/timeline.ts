import { ReactNode } from 'react';

export interface TimelineEntryType {
  startDate: Date;
  endDate: Date | 'Today';
  company: string;
  position: string;
  description: ReactNode;
  technologies: string[];
}

export const timelineEntries: TimelineEntryType[] = [
  {
    startDate: new Date("2019-06-01"),
    endDate: "Today",
    company: "MaibornWolff",
    position: 'Senior IT Consultant',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2018-04-01"),
    endDate: new Date("2019-05-31"),
    company: "KUKA",
    position: 'Team Leader - Virtual Commissioning',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2015-02-01"),
    endDate: new Date("2018-04-30"),
    company: "KUKA",
    position: 'Virtual Commissioning Engineer',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
  {
    startDate: new Date("2014-02-01"),
    endDate: new Date("2014-08-30"),
    company: "Schmalz",
    position: 'Intership and Bachelor Thesis',
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  },
];
