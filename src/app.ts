import cluster from 'cluster';
import os from 'os';
import chalk from 'chalk';
import express from 'express';

import * as identity from './schema/modules/identity';
import * as profile from './schema/modules/profile';
import { ApolloServer } from 'apollo-server-express';

class App {
  public app: express.Application;
  private apollo: ApolloServer;
  private name: string;
  private workers: { [key: string]: cluster.Worker };
  private cpus: number;
  private port: string;

  constructor() {
    this.app = express();
    this.name = 'standard-apollo-graphql';
    this.workers = {};
    this.cpus = os.cpus().length;
    this.port = process.env.PORT || '5000';

    this.apollo = new ApolloServer({ modules: [identity, profile] });
    this.apollo.applyMiddleware({ app: this.app });
  }

  public start(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (cluster.isMaster) {
      console.log(chalk.inverse.cyan.bgBlack('\n****************** CONNECTED TO DATABASE: ' + process.env.DB + '\n'));
      console.log(chalk.inverse.white.bgBlack('************ EXPRESS / APOLLO SERVER START UP *************'));
      if (process.env.NODE_ENV == 'development') {
        console.log(
          chalk.inverse.white.bgBlack(
            `************ http://localhost:${this.port}${this.apollo.graphqlPath} *************`,
          ),
        );
      }

      console.log('                 ' + chalk.underline('MASTER ' + process.pid));
      for (let i = 0; i < this.cpus; i++) {
        this.spawn();
      }
      cluster.on('exit', function (worker: cluster.Worker) {
        console.log(chalk.red('WORKER ' + worker.process.pid + ' died. spawning a new process...'));
        delete self.workers[worker.process.pid];
        self.spawn();
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.app.listen(this.port, () => {});
    }
  }

  private spawn() {
    const worker: cluster.Worker = cluster.fork();
    this.workers[worker.process.pid] = worker;
    console.log(chalk.green('*********** WORKER: ' + worker.process.pid + ' SPAWNED ***********'));
    return worker;
  }
}

export default App;
