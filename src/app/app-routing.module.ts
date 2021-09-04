import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpacingComponent } from './components/spacing/spacing.component';
import { TypographyComponent } from './components/typography/typography.component';

const routes: Routes = [
  {path: 'typography', component: TypographyComponent},
  {path: 'spacing', component: SpacingComponent},
  {path: '**', redirectTo: 'typography'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
