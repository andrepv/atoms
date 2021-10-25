import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsComponent } from './pages/colors.component';
import { SpacingComponent } from './pages/spacing.component';
import { TypographyComponent } from './pages/typography.component';

const routes: Routes = [
  {path: 'typography', component: TypographyComponent},
  {path: 'spacing', component: SpacingComponent},
  {path: 'colors', component: ColorsComponent},
  {path: '**', redirectTo: 'typography'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
