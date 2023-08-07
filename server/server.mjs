import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import mongoose from 'mongoose';
import { getAuth } from 'firebase-admin/auth'
import 'dotenv/config';
import './firebaseConfig.js';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';

const app = express();
const httpServer = http.createServer(app);

// Conenct to DB
const URI = `mongodb+srv://${process.env.BD_USERNAME}:${process.env.DB_PASSWORD}@kairangdb.abi3rgw.mongodb.net/`;
const PORT = process.env.PORT || 5000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
        async serverWillStart() {
            return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
            };
        },
    },
    ],
});

await server.start();

// Middleware
const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];

        getAuth().verifyIdToken(accessToken)
            .then(decodedToken => {
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch((err) => {
                return res.status(403).json({ message: 'Forbidden', error: err })
            })
    }
    else return res.status(401).json({ message: 'Unauthorized' });
    // else return next();
}

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
        return { uid: res.locals.uid }
    }
}));

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Conected to DB!');

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log('🚀  Server ready at: http://localhost:5000`');
})
