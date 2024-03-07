import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { TypographyComponent } from './typography/typography.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LatesNewsComponent } from './lates-news/lates-news.component';
import { ProfileComponent } from './profile/profile.component';
import { LawyerProfileComponent } from './lawyer-profile/lawyer-profile.component';
import { ListLawyersComponent } from './list-lawyers/list-lawyers.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ConsultQuestionComponent } from './consult-question/consult-question.component';

const routes: Routes = [
  {path: "header", component:HeaderComponent},
  {path:"footer", component:FooterComponent},
  {path:"",component:HomeComponent},
  {path:"about", component:AboutUsComponent},
  {path:"contact", component:ContactComponent},
  {path:"typography", component:TypographyComponent},
  {path:"signup",component:SignUpComponent},
  {path:"updateProfile/:id",component:SignUpComponent},

  {path:"signin", component:SignInComponent},
  {path:"latesnews", component:LatesNewsComponent},
  {path:"profile",component:ProfileComponent},
  {path:"lawyerProfile/:id",component:LawyerProfileComponent},
  {path:"lawyerList",component:ListLawyersComponent},
  {path:"questionList",component:ListQuestionsComponent},
  {path:"addQuestion",component:AddQuestionComponent},
  {path:"Question/:id",component:ConsultQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
