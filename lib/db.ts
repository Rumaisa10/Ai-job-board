import mongoose from "mongoose";

if (process.env.NEXT_PHASE === 'phase-production-build') {
  module.exports = { connectDB: async () => {} }
}

const MONGODB_URI = process.env.MONGODB_URI!


interface MongooseCache {
    conn : typeof mongoose | null;
    promise : Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

const cached : MongooseCache = global.mongoose || {conn :null , promise : null}

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectDB() : Promise<typeof mongoose> {
  if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}
    if(cached.conn) return cached.conn

    if(!cached.promise)
    {
        cached.promise = mongoose.connect(MONGODB_URI)
    }
    cached.conn = await cached.promise
    return cached.conn
    
}