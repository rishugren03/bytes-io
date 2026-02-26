import { Prisma, Profile } from "@prisma/client";

type ProfilePayload = Prisma.ProfileGetPayload<{}>;

const p: Profile = {
  id: "test",
  username: "test",
  fullName: "test",
  avatarUrl: "test",
  website: "test",
  githubUsername: "test",
  leetcodeUsername: "test",
  techStack: [],
  powerScore: 0,
  bio: "test",
  role: "member",
  updatedAt: new Date()
};

console.log(p);
