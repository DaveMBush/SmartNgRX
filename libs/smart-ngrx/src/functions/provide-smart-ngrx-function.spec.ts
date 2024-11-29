// create unit tests for provideSmartNgrx()

import { globalMarkAndDeleteInit } from '../mark-and-delete/global-mark-and-delete-init.class';
import { provideSmartNgRX } from './provide-smart-ngrx.function';

describe('provideSmartNgrx', () => {
  describe("when we don't provide any config", () => {
    it('the global init should get set to the defaults', () => {
      provideSmartNgRX();
      expect(globalMarkAndDeleteInit.get()).toEqual({
        markDirtyTime: 15 * 60 * 1000, // 15 minutes
        removeTime: 30 * 60 * 1000, // 30 minutes
        runInterval: 60000, // 1 minute
        markDirtyFetchesNew: true,
      });
    });
  });
  describe('when we provide a config', () => {
    describe('and we only provide the markDirtyTime', () => {
      it('the global init should get set to the markDirtyTime and then expected defaults', () => {
        provideSmartNgRX({
          markDirtyTime: 60000, // 1 minute
        });
        expect(globalMarkAndDeleteInit.get()).toEqual({
          markDirtyTime: 60000, // 1 minute
          removeTime: 120000, // 2 minutes
          runInterval: 60000, // 1 minute
          markDirtyFetchesNew: true,
        });
      });
    });
    describe('and we only provide the removeTime', () => {
      it('the global init should get set to the removeTime and then expected defaults', () => {
        provideSmartNgRX({
          removeTime: 20 * 60 * 1000, // 20 minutes
        });
        expect(globalMarkAndDeleteInit.get()).toEqual({
          markDirtyTime: 15 * 60 * 1000, // 15 minutes
          removeTime: 20 * 60 * 1000, // 20 minutes
          runInterval: 60000, // 1 minute
          markDirtyFetchesNew: true,
        });
      });
      describe('but the removeTime is less than the markDirtyTime', () => {
        it('the global init should get set to the adjusted removeTime and then expected defaults', () => {
          provideSmartNgRX({
            removeTime: 10 * 60 * 1000, // 10 minutes
          });
          expect(globalMarkAndDeleteInit.get()).toEqual({
            markDirtyTime: 15 * 60 * 1000, // 15 minutes
            removeTime: 30 * 60 * 1000, // 30 minutes
            runInterval: 60000, // 1 minute
            markDirtyFetchesNew: true,
          });
        });
      });
    });
    describe('and we only provide the runInterval', () => {
      it('the global init should get set to the runInterval and then expected defaults', () => {
        provideSmartNgRX({
          runInterval: 120000, // 2 minutes
        });
        expect(globalMarkAndDeleteInit.get()).toEqual({
          markDirtyTime: 15 * 60 * 1000, // 15 minutes
          removeTime: 30 * 60 * 1000, // 30 minutes
          runInterval: 120000, // 2 minutes
          markDirtyFetchesNew: true,
        });
      });
      describe('but the runInterval is less than 1', () => {
        it('should reset runInterval to 1 and then expected defaults', () => {
          provideSmartNgRX({ runInterval: 0 });
          expect(globalMarkAndDeleteInit.get()).toEqual({
            markDirtyTime: 15 * 60 * 1000, // 15 minutes
            removeTime: 30 * 60 * 1000, // 30 minutes
            runInterval: 60000, // 1 minute
            markDirtyFetchesNew: true,
          });
        });
      });
    });
    describe('and we only provide the markDirtyFetchesNew', () => {
      it('the global init should get set to the markDirtyFetchesNew and then expected defaults', () => {
        provideSmartNgRX({
          markDirtyFetchesNew: false,
        });
        expect(globalMarkAndDeleteInit.get()).toEqual({
          markDirtyTime: 15 * 60 * 1000, // 15 minutes
          removeTime: 30 * 60 * 1000, // 30 minutes
          runInterval: 60000, // 1 minute
          markDirtyFetchesNew: false,
        });
      });
    });
  });
});
