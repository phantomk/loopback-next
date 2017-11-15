// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {repository, CrudRepository, ValueObject} from '@loopback/repository';
import {api, getControllerSpec, ControllerSpec} from '@loopback/rest';
import {expect} from '@loopback/testlab';

import {CrudController} from '../..';

describe('CrudController', () => {
  class Address extends ValueObject {}

  @api({basePath: '/addresses', paths: {}})
  class AddressController extends CrudController<Address> {
    constructor(@repository('addressRepo') repo: CrudRepository<Address>) {
      super();
      this.repository = repo;
    }
  }

  it('registers CRUD operations', () => {
    const spec = getControllerSpec(AddressController);
    const ops = getOperations(spec);
    expect(ops).to.eql([
      'get /: find',
      'post /: createAll',
      'post /updateAll: updateAll',
      'post /deleteAll: deleteAll',
      'get /count: count',
    ]);
  });

  function getOperations(spec: ControllerSpec) {
    const operations: string[] = [];
    for (const p in spec.paths) {
      const path = spec.paths[p];
      let verb, operationName;
      for (const v of [
        'delete',
        'get',
        'head',
        'options',
        'patch',
        'post',
        'put',
      ]) {
        if (v in path) {
          verb = v;
          operationName = path[v]['x-operation-name'];
          operations.push(`${verb} ${p}: ${operationName}`);
        }
      }
    }
    return operations;
  }
});
