import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { resolveAny } from 'dns';
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://localhost/');
cluster.authenticate('Administrator', 'Password');
var bucket = cluster.openBucket('backlog');
var N1qlQuery = couchbase.N1qlQuery;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    // bucket.manager().createPrimaryIndex(function() {
    //   bucket.upsert('Ghost:7330TEST01', {
    //      'cIds': [310,50,71]
    //   },
    //   function (err, result) {
    //     bucket.get('Ghost:7330TEST01', function (err, result) {
    //       cIds=result.value;
    //       console.log('Got result: %j', cIds);

    //     });
    //   });
    // });

    var cIds = await this.getData();
    console.log(cIds);
    return this.appService.getCIds(cIds);
  }

  async getData() {
    return new Promise((resolve, reject) => {
      bucket.get('Ghost:7330TEST01', function(err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result.value);
      });
    });
  }
}
