import { Connection } from "mongoose";

declare global {
  type Tab = {
    title: string;
    href: string;
  };

  type FooterTypes = {
    title: string;
    tabs: Tab[];
  };

  type Feature = {
    icon: string
    title: string
    description: string
    className: string
  }

  type Steps = {
    id: string;
    icon: string;
    title: string;
    desc: string;
  }

  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};
