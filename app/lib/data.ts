
export interface User {
  id: string;
  name: string;
  gender: "male" | "female" | "other";
  avatar: string;
  latitude: number;
  longitude: number;
}

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    gender: "male",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=John",
    latitude: 27.4925,
    longitude: 95.3648,
  },
  {
    id: "2",
    name: "Jane Smith",
    gender: "female",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jane",
    latitude: 27.4926,
    longitude: 95.3649,
  },
  {
    id: "3",
    name: "Peter Jones",
    gender: "male",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Peter",
    latitude: 27.4927,
    longitude: 95.365,
  },
];
