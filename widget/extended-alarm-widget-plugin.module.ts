import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetPluginComponent } from './extended-alarm-widget-plugin.component';
import { WidgetPluginConfig } from './extended-alarm-widget-plugin-config.component';
import {
  HOOK_COMPONENTS,
  FormsModule,
  DynamicComponentDefinition,
  gettext,
  CoreModule
} from '@c8y/ngx-components';

@NgModule({
  declarations: [WidgetPluginComponent, WidgetPluginConfig],
  entryComponents: [WidgetPluginComponent, WidgetPluginConfig],
  imports: [CommonModule, FormsModule, CoreModule],
  exports: [],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: [
        {
          id: 'angular.widget.plugin',
          label: gettext('Extended Alarm Widget'),
          description: 'Display and comment alarms',
          component: WidgetPluginComponent,
          previewImage: 'c8y-widget-preview-img/widget-plugin-pr.png',
          configComponent: WidgetPluginConfig
        }
      ] as DynamicComponentDefinition[]
    }
  ]
})
export class WidgetPluginModule {}
