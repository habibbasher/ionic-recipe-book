import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

// Custom Pages
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController) {}

  onAddNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

}
