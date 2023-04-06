import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MyAlarmService } from './alarm.service';
import { IManagedObject } from '@c8y/client';

@Component({
  selector: 'c8y-widget-plugin',
  templateUrl: './alarm-widget.html',
  providers: [MyAlarmService]
})
export class WidgetPluginComponent implements OnInit, OnDestroy {
  @Input() config;

  deviceDetails: IManagedObject;
  
  constructor(private alarmService: MyAlarmService) {}

  ngOnInit() {
    this.initDeviceDetails()
    this.alarmService.startAlarms(this.config.device.id);
  }

  ngOnDestroy(): void {
    this.alarmService.stopAlarms();
  }
  
  private async initDeviceDetails() {
    this.deviceDetails = await this.alarmService.getDeviceDetails(this.config.device.id);
  }

}
