import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { RedisMemoryServer } from "redis-memory-server";
import mongoose from "mongoose";
import app from "../../server";
import { createClient } from "redis";
import DB from "../db";

const mongoServer = new MongoMemoryServer();

const redisServer = new RedisMemoryServer({
  instance: {
    port: 6379,
    ip: "redis"
  },
});

describe("Auth", () => {
  beforeAll(async () => {
    await mongoServer.start();
    await mongoose.connect(mongoServer.getUri());
    // redisServer.start();
    // const host = await redisServer.getHost();
    // const port = await redisServer.getPort();

    // const redis_client = createClient({
    //   legacyMode: true,
    //   socket: {
    //     host: host,
    //     port: port,
    //   },
    // });

    // redis_client.on("error", (error) =>
    //   console.error(`Error from connecting to redis: ${error}`)
    // );

    // try {
    //     await redis_client.connect();
    //     console.log('Successfully connect to Redis');
    // } catch (err) {
    //     console.error(`Redis connection error: ${err}`);
    // }

    // console.log(`redis memory host: ${host}, redis memory port: ${port}`);
    // await DB.caching.connect_redis();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
    // await redisServer.stop();
  });

  const signUpData = {
    firstName: "test",
    lastName: "user",
    username: "testUser",
    email: "testuser@example.com",
    password: "testUser",
  };

  const signInData = {
    usernameOrEmail: "testUser",
    password: "testUser",
  };

  describe("Auth Sign Up Test", () => {
    it("should register a new user", async () => {
      const signUpResponse = await request(app)
        .post("/api/v1/auth/signUp")
        .send(signUpData);
      expect(signUpResponse.status).toBe(201);
    });
  });

    // describe("Auth Log In", () => {
    //   it("should log in user", async () => {
    //     const signInResponse = await request(app)
    //       .post("/api/v1/auth/signIn")
    //       .send(signInData);
    //     expect(signInResponse.status).toBe(200);
    //   });
    // });
});
