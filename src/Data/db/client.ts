import { Collection, Db, Filter, MongoClient, Document, OptionalUnlessRequiredId } from "mongodb";
const { TextEncoder, TextDecoder } = require("util");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://user:pass@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
export default async function find<T extends Document>(col: string, query: Filter<Document>) {
    try {
        const dbClient = await client.connect();
        const db = dbClient.db(dbName);
        const collection = db.collection<T>(col);
        return await collection.find(query).toArray();
    } catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}
export async function insert<T extends Document>(col: string, doc: T): Promise<boolean> {
    try {
        const dbClient = await client.connect();
        const db = dbClient.db(dbName);
        const collection = db.collection<T>(col);
        return (await collection.insertOne(doc as OptionalUnlessRequiredId<T>)).acknowledged;
    } catch (err) {
        console.error(err);
        return false;
    }
    finally {
        await client.close();
    }
}

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());