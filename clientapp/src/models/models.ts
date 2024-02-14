export interface Tab {
  id: number;
  icon: string;
  component: Component;
  toolTip: string;
}

export interface Chat {
  id: number;
  to: string;
  avatar: string;
  name: string;
  time: string;
}

export interface Group {
  id: number;
  to: string;
  title: string;
  description: string;
}

export interface ContactByLetter {
  letter: string;
  contactItems: { name: string }[];
}
