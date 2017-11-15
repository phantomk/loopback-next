// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Entity,
  DataObject,
  Options,
  Filter,
  EntityCrudRepository,
} from '@loopback/repository';

import {post, put, patch, get, del, param} from '@loopback/rest';

import {CrudController} from './crud-controller';

/**
 * Base controller class to expose CrudRepository operations to REST
 */
export abstract class EntityCrudController<
  T extends Entity,
  ID
> extends CrudController<T> {
  protected repository: EntityCrudRepository<T, ID>;

  @put(`/save`)
  save(
    @param({name: '', in: 'body'})
    entity: DataObject<T>,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<T | null> {
    return this.repository.save(entity, options);
  }

  @post(`/update`)
  update(
    @param({name: '', in: 'body'})
    entity: DataObject<T>,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<boolean> {
    return this.repository.update(entity, options);
  }

  @post(`/delete`)
  delete(
    @param({name: '', in: 'body'})
    entity: DataObject<T>,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<boolean> {
    return this.repository.update(entity, options);
  }

  @get(`/{id}`)
  findById(
    id: ID,
    filter?: Filter,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<T> {
    return this.repository.findById(id, filter, options);
  }

  @patch(`/{id}`)
  updateById(
    @param({name: 'id', in: 'path'})
    id: ID,
    @param({name: '', in: 'body'})
    data: DataObject<T>,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<boolean> {
    return this.repository.updateById(id, data, options);
  }

  @put(`/{id}`)
  replaceById(
    @param({name: 'id', in: 'path'})
    id: ID,
    @param({name: '', in: 'body'})
    data: DataObject<T>,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<boolean> {
    return this.repository.replaceById(id, data, options);
  }

  @del(`{id}`)
  deleteById(
    @param({name: 'id', in: 'path'})
    id: ID,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<boolean> {
    return this.repository.deleteById(id, options);
  }

  @get(`/{id}/exists`)
  exists(
    @param({name: 'id', in: 'path'})
    id: ID,
    @param({name: 'options', required: false, in: 'query'})
    options?: Options,
  ): Promise<boolean> {
    return this.repository.exists(id, options);
  }
}
