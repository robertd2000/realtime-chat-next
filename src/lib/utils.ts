import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const chatHrefConstructor = (id1: string, id2: string) => {
  const [sortedId1, sortedId2] = [id1, id2].sort();
  return `${sortedId1}--${sortedId2}`;
};

export const formatTimestamp = (titmestamp: number) => {
  return format(titmestamp, "HH:mm");
};

export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}
