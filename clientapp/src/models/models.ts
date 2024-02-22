export interface Tab {
  id: number;
  icon: string;
  component: Component;
  toolTip: string;
}

//person to person chat model
export interface P2PChat {
  person: Contact;
  lastMessage: string;
  isOnline: boolean;
}

//group chat model
export interface GroupChat {
  id: number;
  title: string;
  imageUrl: string;
  lastMessage: string;
}

export interface Contact {
  id: number;
  name: string;
  imageUrl: string;
}
