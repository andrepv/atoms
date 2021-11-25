import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsComponent } from '@colors/colors.component';
import { SpacingComponent } from '@spacing/spacing.component';
import { TypographyComponent } from '@typography/typography.component';
import { ShadowsComponent } from '@shadows/shadows.component';

const routes: Routes = [
  {path: 'typography', component: TypographyComponent},
  {path: 'spacing', component: SpacingComponent},
  {path: 'colors', component: ColorsComponent},
  {path: 'shadows', component: ShadowsComponent},
  {path: '**', redirectTo: 'typography'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
