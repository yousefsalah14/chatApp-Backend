import { config } from "dotenv";
import { User } from "../models/user.model.js";
import { connectDB } from "../connection.js";


config();

const seedUsers = [
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "$2a$08$i.9AMlH3upepcvLsmvRRJuOe7d4Gt1LObp0c42UQ8PCoPAcOShmZu",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "$2a$08$i.9AMlH3upepcvLsmvRRJuOe7d4Gt1LObp0c42UQ8PCoPAcOShmZu",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "$2a$08$i.9AMlH3upepcvLsmvRRJuOe7d4Gt1LObp0c42UQ8PCoPAcOShmZu",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "mark@example.com",
    fullName: "mark",
    password: "$2a$08$i.9AMlH3upepcvLsmvRRJuOe7d4Gt1LObp0c42UQ8PCoPAcOShmZu",
    profilePic: "https://tse3.mm.bing.net/th?id=OIP.DmkY_bhMgcSsgcuRSC1_8QHaE7&pid=Api&P=0&h=220",
  },
  {
    email: "elonmusk@example.com",
    fullName: "elon musk",
    password: "$2a$08$i.9AMlH3upepcvLsmvRRJuOe7d4Gt1LObp0c42UQ8PCoPAcOShmZu",
    profilePic: "https://tse3.mm.bing.net/th?id=OIP.tmmxsctQdTCbVCX4LGDIuQHaFj&pid=Api&P=0&h=220",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();