import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { TypographyComponent } from './typography/typography.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { LatesNewsComponent } from './lates-news/lates-news.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ExpertsLawersComponent } from './experts-lawers/experts-lawers.component';
import { ProfileComponent } from './profile/profile.component';
import { LawyerProfileComponent } from './lawyer-profile/lawyer-profile.component';
import { CommentComponent } from './review/comment/comment.component';
import { ListLawyersComponent } from './list-lawyers/list-lawyers.component';
import { StarRatingComponent } from './review/star-rating/star-rating.component';
import { ChangeRatingComponent } from './review/change-rating/change-rating.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ConsultQuestionComponent } from './consult-question/consult-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    TypographyComponent,
    SignUpComponent,
    SignInComponent,
    BannerComponent,
    LatesNewsComponent,
    TestimonialsComponent,
    ExpertsLawersComponent,
    ProfileComponent,
    LawyerProfileComponent,
    CommentComponent,
    ListLawyersComponent,
    StarRatingComponent,
    ChangeRatingComponent,
    ListQuestionsComponent,
    AddQuestionComponent,
    ConsultQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
