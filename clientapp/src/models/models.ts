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
  lastMessageDate: number;
  isOnline: boolean;
}

//group chat model
export interface GroupChat {
  id: number;
  title: string;
  imageUrl: string;
  lastMessage: string;
  lastMessageDate: number;
}

export interface Contact {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Notification {
  id: number;
  message: string;
  type: string;
}
