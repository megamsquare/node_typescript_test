import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../../server";

const mongoServer = new MongoMemoryServer();

describe("Auth", () => {
  beforeAll(async () => {
    await mongoServer.start();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  const userData = {
    firstName: "Michael",
    lastName: "Mensah",
    username: "megamsquare",
    email: "msquaremega@gmail.com",
    password: "askme1",
  };

  describe("Auth Sign Up Test", () => {
    it("should register a new user", async () => {
      const signUpResponse = await request(app)
        .post("/api/v1/auth/signUp")
        .send(userData);
      expect(signUpResponse.status).toBe(201);
    });
  });
});
