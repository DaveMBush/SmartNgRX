import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { store as storeFunction } from '../selector/store.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { markAndDeleteEffect } from './mark-and-delete.effect';
import { registerMarkAndDeleteInit } from './mark-and-delete-init';
import { registerEntities } from './register-entities.function';

const featureEntity1MarkDirtyActionType = '[featureθentity1] Mark Dirty';
const featureEntity1GarbageCollectActionType =
  '[featureθentity1] Garbage Collect';

interface FeatureEntity1 extends MarkAndDelete {
  id: string;
  name: string;
  isDirty: boolean;
}

// requestIdleCallback is not available in jest/jsdom so we provide it here
window.requestIdleCallback = (
  callback: IdleRequestCallback,
  _?: IdleRequestOptions | undefined,
): number => setTimeout(callback, 0);

describe('markAndDeleteEffect', () => {
  let mockTime = Date.now(); // initialize to a real date.
  let storeDispatch: jest.SpyInstance;
  let zone: NgZone;
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Date, 'now').mockImplementation(() => mockTime);
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    zone = TestBed.inject(NgZone);
    const store = TestBed.inject(Store);
    storeFunction(store);
    storeDispatch = jest.spyOn(store, 'dispatch');
    registerMarkAndDeleteInit('θglobalθ', {
      runInterval: 100,
      removeTime: 1000,
      markDirtyFetchesNew: true,
      markDirtyTime: 500,
    });
  });
  describe('when no features have been registered', () => {
    it('should not dispatch markDirty or garbageCollect actions', () => {
      markAndDeleteEffect(zone).subscribe();
      mockTime += 2000;
      jest.advanceTimersByTime(2000);
      expect(storeDispatch).not.toHaveBeenCalled();
    });
  });
  describe('when features have been registered and elements need to be marked dirty', () => {
    it('should dispatch markDirty actions', () => {
      registerMarkAndDeleteInit('feature', {
        runInterval: 100,
        removeTime: 1000,
        markDirtyFetchesNew: true,
        markDirtyTime: 500,
      });
      registerEntities<FeatureEntity1>('feature', 'entity1', [
        { id: '1', name: 'name1', isDirty: false },
      ]);
      mockTime += 600;
      markAndDeleteEffect(zone).subscribe();
      jest.advanceTimersByTime(600);
      expect(storeDispatch).toHaveBeenCalledWith({
        type: featureEntity1MarkDirtyActionType,
        ids: ['1'],
      });
      expect(storeDispatch).not.toHaveBeenCalledWith({
        type: featureEntity1GarbageCollectActionType,
        ids: ['1'],
      });
    });
  });
  describe('when features have been registered and elements need to be deleted', () => {
    it('should dispatch garbageCollect actions', () => {
      registerMarkAndDeleteInit('feature', {
        runInterval: 100,
        removeTime: 1000,
        markDirtyFetchesNew: true,
        markDirtyTime: 500,
      });
      registerEntities<FeatureEntity1>('feature', 'entity1', [
        { id: '1', name: 'name1', isDirty: false },
      ]);
      mockTime += 1500;
      markAndDeleteEffect(zone).subscribe();
      jest.advanceTimersByTime(600);
      expect(storeDispatch).toHaveBeenCalledWith({
        type: featureEntity1GarbageCollectActionType,
        ids: ['1'],
      });
      expect(storeDispatch).not.toHaveBeenCalledWith({
        type: featureEntity1MarkDirtyActionType,
        ids: ['1'],
      });
    });
  });
  describe("when features have been registered and elements don't need to be marked dirty or deleted", () => {
    it('should not dispatch markDirty or garbage collect actions', () => {
      registerMarkAndDeleteInit('feature', {
        runInterval: 100,
        removeTime: 1000,
        markDirtyFetchesNew: true,
        markDirtyTime: 500,
      });
      registerEntities<FeatureEntity1>('feature', 'entity1', [
        { id: '1', name: 'name1', isDirty: false },
      ]);
      mockTime += 400;
      markAndDeleteEffect(zone).subscribe();
      jest.advanceTimersByTime(600);
      expect(storeDispatch).not.toHaveBeenCalledWith({
        type: featureEntity1GarbageCollectActionType,
        ids: ['1'],
      });
      expect(storeDispatch).not.toHaveBeenCalledWith({
        type: featureEntity1MarkDirtyActionType,
        ids: ['1'],
      });
    });
  });
});
