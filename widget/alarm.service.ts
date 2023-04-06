import { Injectable, resolveForwardRef } from '@angular/core';
import { IAlarm, InventoryService, AlarmService, Realtime, IManagedObject, Severity } from '@c8y/client';
//import {AlarmRealtimeService} from '@c8y/ngx-components';

@Injectable()
export class MyAlarmService {
  currentAlarms =  new Map<number | string, IAlarm>();
  private realtimeSubscription: object;


  constructor(
    private inventoryService: InventoryService,
    private realtime: Realtime,
    private alarmService: AlarmService
  ) {}

  async getDeviceDetails(deviceId: string): Promise<IManagedObject> {
    try {
      const response = await this.inventoryService.detail(deviceId);
      const deviceManagedObject = response.data;

      return deviceManagedObject;
    } catch (error) {
      console.error('Error occurred while loading the device description: ', error);

      return undefined;
    }
  }

  startAlarms(deviceId: string): void {
    this.loadLatestAlarm(deviceId);
    this.subscribeForAlarms(deviceId);
  }

  stopAlarms(): void {
    if (!this.realtimeSubscription) {
      return;
    }

    this.realtime.unsubscribe(this.realtimeSubscription);
    this.currentAlarms.clear();
  }

  private async loadLatestAlarm(
    deviceId: string
  ) {
    const filter = {
      source: deviceId,
      pageSize: 100,
      withTotalPages: true
    };

    try {
      const response = await this.alarmService.list(filter);
      response.data.forEach(al => {
        this.currentAlarms.set(al.id,al);
      });
      
    } catch (error) {
      console.error('Error occurred while loading the latest alarm: ', error);
    }
  }

  private subscribeForAlarms(
    deviceId: string,

  ) {
    this.realtimeSubscription = this.realtime.subscribe(
      `/alarms/${deviceId}`,
      (alarmNotification) => {
        const alarm: IAlarm = alarmNotification.data.data;
        this.currentAlarms.set(alarm.id, alarm);
      }
    );
  }
}
