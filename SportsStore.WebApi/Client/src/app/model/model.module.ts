import { RestDataSource, REST_URL } from './rest.datasource';
//import { StaticDataSource } from './static.datasource';
import { RepositoryModel } from './repository.model';
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

@NgModule({
  imports:[HttpClientModule, HttpClientJsonpModule],
  providers: [
    RepositoryModel,
    //StaticDataSource
    RestDataSource,
    {provide: REST_URL, useValue:`http://${window.location.hostname}:5000/api/`}
  ]
})
export class RepositoryModelModule{}
