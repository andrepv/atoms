import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsComponent } from '@colors/colors.component';
import { SpacingComponent } from '@spacing/spacing.component';
import { TypographyComponent } from '@typography/typography.component';
import { ShadowsComponent } from '@shadows/shadows.component';
import { BordersComponent } from './modules/borders/borders.component';
import { DurationsComponent } from './modules/durations/durations.component';
import { CustomTokensComponent } from './modules/custom-tokens/custom-tokens.component';

const routes: Routes = [
  {path: 'typography', component: TypographyComponent},
  {path: 'spacing', component: SpacingComponent},
  {path: 'colors', component: ColorsComponent},
  {path: 'shadows', component: ShadowsComponent},
  {path: 'borders', component: BordersComponent},
  {path: 'durations', component: DurationsComponent},
  {path: 'custom-tokens', component: CustomTokensComponent},
  {path: '**', redirectTo: 'typography'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,  {
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
